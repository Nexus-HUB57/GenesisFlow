
"use client";

import { useState } from "react";
import { processPayroll, PayrollOutput } from "@/ai/flows/infrastructure-payroll-flow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Banknote, Bitcoin, Loader2, ShieldCheck, Lock, Wallet, ArrowUpRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { doc } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function PayrollCard() {
  const [loading, setLoading] = useState(false);
  const [agentCount, setAgentCount] = useState(10000);
  const [data, setData] = useState<PayrollOutput | null>(null);
  const firestore = useFirestore();

  const handlePay = async () => {
    setLoading(true);
    try {
      const result = await processPayroll({ 
        agentCount,
        mode: 'HYBRID'
      });
      
      setData(result);

      // Log para o Firestore
      const eventId = `payroll-${Date.now()}`;
      const eventRef = doc(firestore, "production_events", eventId);
      setDocumentNonBlocking(eventRef, {
        id: eventId,
        timestamp: new Date().toISOString(),
        eventType: "info",
        severity: "medium",
        message: `Folha Nexus: ${agentCount} agentes pagos. Lock-in: ${result.lockInStatus}`,
        sourceComponent: "Folha de Pagamento Híbrida",
        agentId: "agent-banker"
      }, { merge: true });

      toast({
        title: "Pagamento Processado",
        description: `Remuneração enviada para ${agentCount} agentes.`,
      });

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro no Pagamento",
        description: "Falha na distribuição de créditos híbridos.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-green-500/5 border-green-500/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Users className="h-32 w-32 text-green-500" />
      </div>
      <CardHeader className="py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-green-500">
            <Banknote className="h-4 w-4" />
            FOLHA NEXUS: Remuneração Híbrida
          </CardTitle>
          <Badge className="bg-green-500/20 text-green-500 border-green-500/30 uppercase text-[8px]">
            HYBRID_PAYROLL_V2
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase text-muted-foreground">Quantidade de Agentes Humanos</label>
          <div className="flex gap-2">
            <Input 
              type="number" 
              value={agentCount} 
              onChange={(e) => setAgentCount(Number(e.target.value))}
              className="bg-black/40 border-white/10 text-xs h-9"
            />
            <Button 
              className="bg-green-600 hover:bg-green-700 text-xs font-bold gap-2 px-6"
              onClick={handlePay}
              disabled={loading}
            >
              {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Wallet className="h-3 w-3" />}
              Pagar
            </Button>
          </div>
        </div>

        {data && (
          <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-black/40 p-3 rounded-lg border border-green-500/10 space-y-1">
              <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-green-500">
                <Bitcoin className="h-3 w-3" /> BTC Temporal
              </div>
              <div className="text-sm font-bold font-code">{data.totalBtcTemporal.toFixed(4)} BTC</div>
              <div className="text-[8px] text-muted-foreground uppercase">Lealdade 2077</div>
            </div>
            <div className="bg-black/40 p-3 rounded-lg border border-green-500/10 space-y-1">
              <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-green-500">
                <Banknote className="h-3 w-3" /> Fiat (2026)
              </div>
              <div className="text-sm font-bold font-code">${data.totalFiat.toLocaleString()}</div>
              <div className="text-[8px] text-muted-foreground uppercase">Custo Operacional</div>
            </div>
          </div>
        )}

        {data && (
          <div className="p-3 bg-black/40 rounded border border-green-500/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-bold text-green-200 uppercase flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Relatório de Lock-in
              </span>
              <Lock className="h-3 w-3 text-green-500" />
            </div>
            <p className="text-[10px] font-mono text-muted-foreground leading-tight italic">
              "{data.report}"
            </p>
          </div>
        )}

        <div className="flex items-center gap-4 pt-2 border-t border-green-500/10 opacity-60">
           <div className="flex items-center gap-1 text-[8px] font-bold text-green-400 uppercase">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
             Payroll_Linked_to_Vault
           </div>
           <div className="flex items-center gap-1 text-[8px] font-bold text-muted-foreground uppercase">
             <ArrowUpRight className="h-2 w-2" /> 2077_Loyalty_Escrow
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
