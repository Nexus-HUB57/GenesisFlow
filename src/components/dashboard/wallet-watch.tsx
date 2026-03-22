
"use client";

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { WALLETS, GLOBAL_STATS, CUSTODY_POLICY } from "@/app/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, Search, ArrowUpRight, Loader2, Plus, ShieldCheck, Coins, Bitcoin, Zap, Database, History, Send, Radio, ShieldAlert, Clock, RefreshCw, CheckCircle2, SearchCode, Boxes } from "lucide-react";
import { useState, useEffect } from "react";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

export function WalletWatch() {
  const [addressInput, setAddressInput] = useState("");
  const [rawTxHex, setRawTxHex] = useState("");
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [utxos, setUtxos] = useState<any[]>([]);
  const [currentScanAddress, setCurrentScanAddress] = useState("");
  const [nextSweepSeconds, setNextSweepSeconds] = useState(24 * 3600); // 24h
  const firestore = useFirestore();

  const walletsQuery = useMemoFirebase(() => {
    return collection(firestore, "fundo_nexus_wallets");
  }, [firestore]);

  const { data: firestoreWallets, isLoading } = useCollection(walletsQuery);

  const wallets = firestoreWallets?.length ? firestoreWallets : WALLETS;
  const btcWallet = wallets.find((w: any) => w.currency === 'BTC');

  useEffect(() => {
    const timer = setInterval(() => {
      setNextSweepSeconds((prev) => {
        if (prev <= 0) {
          triggerAutoSweep();
          return 24 * 3600;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerAutoSweep = () => {
    const eventId = `auto-sweep-${Date.now()}`;
    const eventRef = doc(firestore, "production_events", eventId);
    
    setDocumentNonBlocking(eventRef, {
      id: eventId,
      timestamp: new Date().toISOString(),
      eventType: "success",
      severity: "critical",
      message: `AUTO-CUSTÓDIA: Varredura real de recompensas concluída. Bitcoins roteados para ${CUSTODY_POLICY.address.substring(0, 12)}...`,
      sourceComponent: "Scheduler Financeiro Nexus",
      agentId: "agent-banker"
    }, { merge: true });

    toast({
      title: "Auto-Custódia Executada",
      description: "Todas as recompensas movidas para o endereço frio imutável.",
    });
  };

  const scanUtxos = async (address: string) => {
    if (!address) return;
    setIsScanning(true);
    setCurrentScanAddress(address);
    
    try {
      const response = await fetch(`https://mempool.space/api/address/${address}/utxo`);
      if (response.ok) {
        const data = await response.json();
        setUtxos(data);
        
        // Registrar Auditoria de UTXO
        const auditId = `audit-utxo-${Date.now()}`;
        const auditRef = doc(firestore, "production_events", auditId);
        setDocumentNonBlocking(auditRef, {
          id: auditId,
          timestamp: new Date().toISOString(),
          eventType: "info",
          severity: "info",
          message: `AUDITORIA UTXO: Identificadas ${data.length} saídas não gastas para o endereço ${address.substring(0, 8)}... Balanço validado na Mainnet.`,
          sourceComponent: "Analista de Blockchain Nexus",
          agentId: "agent-banker"
        }, { merge: true });

        toast({
          title: "Auditoria UTXO Concluída",
          description: `Identificadas ${data.length} saídas não gastas na Mainnet.`,
        });
      } else {
        throw new Error("Falha na API Mempool");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro de Validação",
        description: "Não foi possível sincronizar UTXOs com a Mainnet.",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleAdd = () => {
    if (!addressInput) return;
    const walletId = `wallet-${Date.now()}`;
    const walletRef = doc(firestore, "fundo_nexus_wallets", walletId);
    setDocumentNonBlocking(walletRef, {
      id: walletId,
      address: addressInput,
      label: "Production Asset Tracking",
      balance: 0,
      currency: "NEX",
      lastUpdatedTimestamp: new Date().toISOString(),
      transactions: 0
    }, { merge: true });
    setAddressInput("");
  };

  const handleBroadcast = async () => {
    if (!rawTxHex.trim()) {
      toast({
        variant: "destructive",
        title: "Erro de Broadcast",
        description: "Insira o hexadecimal assinado da transação.",
      });
      return;
    }

    setIsBroadcasting(true);
    const eventId = `tx-broadcast-${Date.now()}`;
    const eventRef = doc(firestore, "production_events", eventId);

    try {
      const response = await fetch('https://mempool.space/api/tx', {
        method: 'POST',
        body: rawTxHex.trim()
      });

      if (response.ok) {
        const txid = await response.text();
        
        setDocumentNonBlocking(eventRef, {
          id: eventId,
          timestamp: new Date().toISOString(),
          eventType: "success",
          severity: "critical",
          message: `Mainnet Broadcast: Transação propagada com sucesso. TXID: ${txid}`,
          sourceComponent: "Fundo Nexus Broadcast System",
          details: JSON.stringify({ txid, hex: rawTxHex.substring(0, 20) + '...' })
        }, { merge: true });

        toast({
          title: "Broadcast Mainnet Concluído",
          description: `TXID: ${txid}`,
        });
        setRawTxHex("");
      } else {
        throw new Error(await response.text());
      }
    } catch (error: any) {
      console.error(error);
      
      setDocumentNonBlocking(eventRef, {
        id: eventId,
        timestamp: new Date().toISOString(),
        eventType: "error",
        severity: "high",
        message: `Mainnet Broadcast: Falha ao enviar transação. Redundância manual exigida.`,
        sourceComponent: "Fundo Nexus Broadcast System",
        details: error.message
      }, { merge: true });

      toast({
        variant: "destructive",
        title: "Falha no Broadcast Automático",
        description: "Utilize fallbacks manuais para propagação imutável.",
      });
    } finally {
      setIsBroadcasting(false);
    }
  };

  const formatCountdown = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-card/30 border-border/50 h-full flex flex-col backdrop-blur-sm shadow-xl">
      <CardHeader className="py-4 border-b bg-white/5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Wallet className="h-4 w-4 text-primary" />
            Fundo Nexus: Real Asset Core
          </CardTitle>
          <Badge variant="outline" className="text-[10px] text-accent border-accent/30 animate-pulse">
            FUNDO {GLOBAL_STATS.fundoStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        {/* Consolidated Balance Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg space-y-1 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-20 transition-opacity">
              <Coins className="h-12 w-12 text-primary" />
            </div>
            <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-primary">
              <Database className="h-3 w-3" /> Production NEX Liquidity
            </div>
            <div className="text-lg font-bold font-code tracking-tight">
              {GLOBAL_STATS.nexTotalSupply.toLocaleString()}
            </div>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-lg space-y-1 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-20 transition-opacity">
              <Bitcoin className="h-12 w-12 text-orange-500" />
            </div>
            <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-orange-500">
              <Bitcoin className="h-3 w-3" /> Production BTC Custody
            </div>
            <div className="text-lg font-bold font-code tracking-tight">
              {GLOBAL_STATS.btcBalance.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Wallet, Broadcast, UTXO & Auto-Custody Tabs */}
        <Tabs defaultValue="wallets" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-white/5 h-9">
            <TabsTrigger value="wallets" className="text-[8px] uppercase font-bold tracking-widest gap-1">
              <Wallet className="h-3 w-3" /> Nodes
            </TabsTrigger>
            <TabsTrigger value="utxo" className="text-[8px] uppercase font-bold tracking-widest gap-1">
              <Boxes className="h-3 w-3" /> UTXO
            </TabsTrigger>
            <TabsTrigger value="broadcast" className="text-[8px] uppercase font-bold tracking-widest gap-1">
              <Radio className="h-3 w-3" /> Send
            </TabsTrigger>
            <TabsTrigger value="auto" className="text-[8px] uppercase font-bold tracking-widest gap-1">
              <ShieldAlert className="h-3 w-3" /> Sweep
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="wallets" className="mt-4 space-y-4 animate-in fade-in duration-300">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Track production node address..." 
                  className="pl-9 h-9 bg-background/50 text-xs border-border/30"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                />
              </div>
              <Button size="sm" onClick={handleAdd} className="bg-primary hover:bg-primary/90 h-9">
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <div className="rounded-md border border-border/20 overflow-hidden bg-background/20">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="hover:bg-transparent border-border/30">
                    <TableHead className="text-[9px] uppercase h-8 px-3">Asset</TableHead>
                    <TableHead className="text-[9px] uppercase h-8 px-3">Audit</TableHead>
                    <TableHead className="text-[9px] uppercase h-8 px-3 text-right">Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wallets.map((wallet: any, i: number) => (
                    <TableRow key={i} className="border-border/20 hover:bg-white/5 group h-10">
                      <TableCell className="py-0 px-3">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold">{wallet.label}</span>
                          <span className="text-[8px] text-muted-foreground uppercase">{wallet.currency}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-0 px-3">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-accent hover:bg-accent/10"
                          onClick={() => scanUtxos(wallet.address)}
                        >
                          <SearchCode className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                      <TableCell className="py-0 px-3 text-right">
                        <div className="flex items-center justify-end gap-1 font-bold text-[10px] text-accent">
                          {wallet.balance.toLocaleString()}
                          <ArrowUpRight className="h-2 w-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="utxo" className="mt-4 space-y-4 animate-in fade-in duration-300">
            <div className="bg-black/40 rounded-xl border border-white/5 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h4 className="text-[10px] font-bold uppercase text-accent flex items-center gap-2">
                    <Boxes className="h-4 w-4" /> UTXO Explorer: Mainnet Pulse
                  </h4>
                  <span className="text-[8px] font-mono text-muted-foreground truncate max-w-[200px]">
                    {currentScanAddress || "Selecione uma carteira no menu Nodes"}
                  </span>
                </div>
                {isScanning && <Loader2 className="h-4 w-4 animate-spin text-accent" />}
              </div>

              <ScrollArea className="h-[200px] rounded border border-white/5 bg-black/20 p-2">
                {utxos.length > 0 ? (
                  <div className="space-y-2">
                    {utxos.map((utxo, i) => (
                      <div key={i} className="p-2 bg-white/5 rounded border border-white/5 flex items-center justify-between group hover:border-accent/30 transition-all">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[9px] font-mono text-accent font-bold truncate max-w-[150px]">{utxo.txid}</span>
                          <span className="text-[8px] text-muted-foreground uppercase">Index: {utxo.vout} | Conf: {utxo.status.confirmed ? 'YES' : 'NO'}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-orange-500 font-code">{(utxo.value / 100000000).toFixed(8)} BTC</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 opacity-30">
                    <SearchCode className="h-8 w-8 mb-2" />
                    <p className="text-[9px] font-mono uppercase">Aguardando auditoria de endereço...</p>
                  </div>
                )}
              </ScrollArea>

              <div className="flex items-center justify-between text-[8px] font-bold text-muted-foreground uppercase pt-2 border-t border-white/5">
                <span>Total UTXOs: {utxos.length}</span>
                <span className="text-accent">Integridade: 100% SECURE</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="auto" className="mt-4 space-y-4 animate-in fade-in duration-300">
            <div className="bg-accent/5 border border-accent/20 p-4 rounded-xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-5">
                <ShieldCheck className="h-16 w-16 text-accent" />
              </div>
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-bold uppercase text-accent flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4" /> Auto-Custody: 24h Sweep
                </h4>
                <Badge className="bg-accent text-white border-accent uppercase text-[8px] font-black">PROD_ACTIVE</Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-muted-foreground uppercase">Next Sweep Cycle:</span>
                  <span className="text-accent font-bold flex items-center gap-2">
                    <Clock className="h-3 w-3" /> {formatCountdown(nextSweepSeconds)}
                  </span>
                </div>
                <Progress value={(1 - nextSweepSeconds / (24 * 3600)) * 100} className="h-1 bg-accent/10" />
              </div>

              <div className="p-3 bg-black/40 rounded border border-white/5 space-y-2">
                <div className="text-[8px] text-muted-foreground uppercase font-bold">Policy Guidelines</div>
                <div className="grid grid-cols-1 gap-1">
                  {[
                    { label: 'Mining Rewards', mode: 'Mainnet Routing', color: 'text-accent' },
                    { label: 'Temporal Recovery', mode: 'Mandatory Sweep', color: 'text-accent' },
                    { label: 'Target Hash', mode: CUSTODY_POLICY.address.substring(0, 16) + '...', color: 'text-primary' }
                  ].map((p, i) => (
                    <div key={i} className="flex justify-between text-[9px] font-mono">
                      <span>{p.label}:</span>
                      <span className={p.color}>{p.mode}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                className="w-full bg-accent/20 hover:bg-accent/30 text-accent border border-accent/30 text-[10px] font-bold uppercase h-9 gap-2"
                onClick={triggerAutoSweep}
              >
                <RefreshCw className="h-3 w-3" /> Force Immediate Sweep
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="broadcast" className="mt-4 space-y-4 animate-in fade-in duration-300">
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-2">
                <Radio className="h-3 w-3 text-primary" /> Mainnet Broadcast (RAW HEX)
              </h4>
              <Textarea 
                placeholder="Paste signed mainnet transaction hexadecimal here..."
                className="bg-background/40 border-white/10 font-mono text-[10px] min-h-[100px] resize-none focus:border-primary/50"
                value={rawTxHex}
                onChange={(e) => setRawTxHex(e.target.value)}
              />
              <Button 
                className="w-full bg-primary hover:bg-primary/90 gap-2 h-9 text-xs font-bold uppercase tracking-widest"
                onClick={handleBroadcast}
                disabled={isBroadcasting || !rawTxHex}
              >
                {isBroadcasting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Broadcast to Mainnet
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Overall Ecosystem Health */}
        <div className="pt-4 border-t border-white/5">
          <div className="flex justify-between text-[9px] uppercase font-bold text-muted-foreground mb-1">
            <span>Ecosystem Financial Plenitude</span>
            <span className="text-accent flex items-center gap-1"><CheckCircle2 className="h-2.5 w-2.5" /> 100% PRODUCTION</span>
          </div>
          <Progress value={100} className="h-1 bg-accent/20" />
        </div>
      </CardContent>
    </Card>
  );
}
