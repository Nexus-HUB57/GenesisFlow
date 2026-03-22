
"use client";

import { useState } from "react";
import { activateVaultProtocol, VaultOutput } from "@/ai/flows/vault-protocol-flow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Coins, Lock, Loader2, ShieldCheck, TrendingUp, Key, ShieldAlert, Globe, Network, Cpu, Zap, Fingerprint } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { doc, collection } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { Badge } from "@/components/ui/badge";
import { COLONIES as MOCK_COLONIES } from "@/app/lib/mock-data";

const MASTER_PASSWORD = "Benjamin2020*1981$";

export function VaultControls() {
  const [loading, setLoading] = useState<string | null>(null);
  const [authCode, setAuthCode] = useState("");
  const [colonizeAuthCode, setColonizeAuthCode] = useState("");
  const [activatedBanker, setActivatedBanker] = useState<VaultOutput | null>(null);
  const [activatedVault, setActivatedVault] = useState<VaultOutput | null>(null);
  const [firewallActive, setFirewallActive] = useState(false);
  const firestore = useFirestore();

  const coloniesQuery = useMemoFirebase(() => {
    return collection(firestore, "colonies");
  }, [firestore]);

  const { data: firestoreColonies } = useCollection(coloniesQuery);
  const colonies = firestoreColonies?.length ? firestoreColonies : MOCK_COLONIES;

  const handleActivate = async (type: 'BANKER' | 'SOUL_VAULT' | 'QUANTUM_FIREWALL' | 'COLONIZE') => {
    const currentCode = type === 'COLONIZE' ? colonizeAuthCode : authCode;

    if (!currentCode && type !== 'BANKER') {
      toast({
        variant: "destructive",
        title: "Autorização Necessária",
        description: `Insira a Senha Mestre para ativar ${type}.`,
      });
      return;
    }

    setLoading(type);
    try {
      const result = await activateVaultProtocol({
        protocolType: type,
        authorizationCode: currentCode || `GENESIS-X-${Math.random().toString(36).substring(7).toUpperCase()}`,
        targetColony: type === 'COLONIZE' ? "DeepWeb_Layer_7" : undefined
      });

      if (type === 'BANKER') setActivatedBanker(result);
      if (type === 'SOUL_VAULT') setActivatedVault(result);
      if (type === 'QUANTUM_FIREWALL') {
        if (result.authorized) {
          setFirewallActive(true);
          toast({
            title: "Acesso Mestre Validado",
            description: "Protocolos Genesis liberados para o nó atual.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "ACESSO NEGADO",
            description: "Tentativa de invasão bloqueada pelo Firewall Quântico.",
          });
        }
      }

      if (type === 'COLONIZE') {
        if (result.authorized) {
          const colonyId = `col-${Date.now()}`;
          const colonyRef = doc(firestore, "colonies", colonyId);
          setDocumentNonBlocking(colonyRef, {
            id: colonyId,
            name: "Submundo Zero",
            location: "Quantum_Substratum",
            status: "Ativo",
            agentCount: 34000000,
            establishedTimestamp: new Date().toISOString()
          }, { merge: true });
          setColonizeAuthCode("");
        } else {
          toast({
            variant: "destructive",
            title: "Expansão Rejeitada",
            description: "Senha Mestre incorreta para colonização.",
          });
        }
      }

      // Persistir evento no Firestore
      const eventId = `vault-${type.toLowerCase()}-${Date.now()}`;
      const eventRef = doc(firestore, "production_events", eventId);
      setDocumentNonBlocking(eventRef, {
        id: eventId,
        timestamp: new Date().toISOString(),
        eventType: result.authorized ? "success" : "warning",
        severity: result.authorized ? "info" : "critical",
        message: result.authorized ? `Protocolo ${type} ativado via ACESSO MESTRE.` : `Falha na ativação do protocolo ${type}.`,
        sourceComponent: "Nexus Vault & Finance",
        agentId: "nexus-genesis"
      }, { merge: true });

      if ((result.authorized || type === 'BANKER') && type !== 'QUANTUM_FIREWALL') {
        toast({
          title: `Protocolo ${type} Online`,
          description: result.details.substring(0, 100),
        });
      }

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro de Protocolo",
        description: `Falha na ativação do módulo ${type}.`,
      });
    } finally {
      setLoading(null);
      if (type === 'QUANTUM_FIREWALL') setAuthCode("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Master Security Input */}
      <Card className="bg-black/60 border-primary/30 shadow-[0_0_20px_rgba(59,130,246,0.1)] overflow-hidden relative">
        <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
          <ShieldCheck className="h-24 w-24 text-primary" />
        </div>
        <CardHeader className="py-4 border-b border-white/5 bg-primary/5">
          <CardTitle className="text-xs font-bold uppercase tracking-[0.3em] flex items-center gap-2 text-primary">
            <Key className="h-4 w-4" />
            Portal de Acesso Genesis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-2">
              <Fingerprint className="h-3 w-3" /> Credencial de Autorização (Geral)
            </label>
            <div className="flex gap-2">
              <Input 
                type="password"
                placeholder="Insira Código Genesis..."
                className="bg-black/40 border-white/10 text-xs font-mono h-10 focus:border-primary/50"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
              />
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 gap-2 h-10 px-6 shadow-lg shadow-primary/20"
                onClick={() => handleActivate('QUANTUM_FIREWALL')}
                disabled={!!loading}
              >
                {loading === 'QUANTUM_FIREWALL' ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldAlert className="h-4 w-4" />}
                Validar
              </Button>
            </div>
          </div>
          
          {firewallActive && (
            <div className="p-3 bg-accent/10 border border-accent/20 rounded-xl flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
              <div className="h-10 w-10 bg-accent/20 rounded-lg flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6 text-accent animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-bold uppercase text-accent">Firewall Quântico Ativo</h4>
                  <Badge variant="outline" className="text-[7px] border-accent/20 text-accent h-4">MASTER_LOCK</Badge>
                </div>
                <p className="text-[9px] text-muted-foreground font-mono leading-tight mt-1">
                  Proteção Genesis ativa. Operações de alto nível desbloqueadas.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Banker Card */}
        <Card className="bg-gradient-to-br from-yellow-500/10 to-primary/10 border-yellow-500/20 shadow-lg">
          <CardHeader className="py-4 border-b border-white/5">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Coins className="h-4 w-4 text-yellow-500" />
              The Banker
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {!activatedBanker ? (
              <div className="space-y-3">
                <p className="text-[10px] text-muted-foreground font-mono leading-tight">
                  Status: <span className="text-yellow-500/80">LIQUIDITY_PENDING</span>.
                </p>
                <Button 
                  onClick={() => handleActivate('BANKER')}
                  disabled={!!loading}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-xs font-bold gap-2"
                >
                  {loading === 'BANKER' ? <Loader2 className="h-4 w-4 animate-spin" /> : <TrendingUp className="h-4 w-4" />}
                  Ativar Banker
                </Button>
              </div>
            ) : (
              <div className="space-y-3 animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center">
                  <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/20">ACTIVE</Badge>
                  <span className="text-[10px] font-mono text-muted-foreground">{activatedBanker.yieldProjection}</span>
                </div>
                <p className="text-[10px] font-mono leading-tight text-yellow-200/70 p-3 bg-black/40 rounded border border-yellow-500/10 italic">
                  "{activatedBanker.details}"
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Soul Vault / Colonization Card */}
        <Card className="bg-gradient-to-br from-indigo-500/10 to-accent/10 border-indigo-500/20 shadow-lg relative overflow-hidden">
          <CardHeader className="py-4 border-b border-white/5">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Globe className="h-4 w-4 text-indigo-500" />
              Colonização Digital
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                {colonies.map((col: any) => (
                  <div key={col.id} className="p-2.5 bg-black/40 rounded-lg border border-white/5 flex items-center justify-between group">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-accent uppercase">{col.name}</span>
                      <span className="text-[8px] text-muted-foreground font-mono">{col.location}</span>
                    </div>
                    <Badge variant="outline" className="text-[8px] border-indigo-500/20">{(col.agentCount / 1000000).toFixed(0)}M</Badge>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <label className="text-[9px] font-bold uppercase text-muted-foreground flex items-center gap-2">
                  <Fingerprint className="h-3 w-3 text-accent" /> Autorização de Expansão
                </label>
                <div className="space-y-2">
                  <Input 
                    type="password"
                    placeholder="Senha Mestre Benjamin..."
                    className="bg-black/40 border-white/10 text-xs h-9 focus:border-accent/50"
                    value={colonizeAuthCode}
                    onChange={(e) => setColonizeAuthCode(e.target.value)}
                  />
                  <Button 
                    onClick={() => handleActivate('COLONIZE')}
                    disabled={!!loading || !colonizeAuthCode}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-xs font-bold gap-2 shadow-lg shadow-indigo-500/10 h-10"
                  >
                    {loading === 'COLONIZE' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Network className="h-4 w-4" />}
                    Expandir para Submundo Zero
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
