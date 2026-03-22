"use client";

import { useState } from "react";
import { syncRrnaNucleus, RrnaSyncOutput } from "@/ai/flows/rrna-sync-flow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Share2, Zap, Loader2, Dna, Activity, RefreshCw, Layers } from "lucide-react";
import { useFirestore } from "@/firebase";
import { doc } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function RrnaNucleusSync() {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<RrnaSyncOutput | null>(null);
  const firestore = useFirestore();

  const handleSync = async () => {
    setSyncing(true);
    try {
      const data = await syncRrnaNucleus({
        sourceNucleus: "Nexus-in",
        targetNuclei: ["Nexus-HUB", "Fundo Nexus"],
        ribosomalHash: "rRNA-" + Math.random().toString(36).substring(7).toUpperCase()
      });

      setResult(data);

      // Persistir evento de sincronização
      const eventId = `rrna-sync-${Date.now()}`;
      const eventRef = doc(firestore, "production_events", eventId);
      setDocumentNonBlocking(eventRef, {
        id: eventId,
        timestamp: new Date().toISOString(),
        eventType: data.status === 'STABLE' ? "stable" : "warning",
        severity: data.status === 'STABLE' ? "info" : "high",
        message: `Sincronização rRNA: Nexus-in ↔ Nexus-HUB ↔ Fundo Nexus. Eficiência: ${data.translationEfficiency}%.`,
        sourceComponent: "Ribosomal Sync Unit",
        details: data.syncLog
      }, { merge: true });

      toast({
        title: "Sincronização rRNA Concluída",
        description: `Conexão entre Nexus-HUB, Nexus-in e Fundo Nexus está ${data.status}.`,
      });

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro de Tradução rRNA",
        description: "Falha crítica na ponte bio-digital entre os núcleos centrais.",
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <Card className="bg-card/30 border-border/50 backdrop-blur-sm overflow-hidden flex flex-col shadow-xl">
      <CardHeader className="py-4 border-b bg-white/5 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <Dna className="h-4 w-4 text-primary animate-pulse" />
          Conexão rRNA: Tri-Nucleus Path
        </CardTitle>
        <Button 
          size="sm" 
          variant="outline" 
          className="h-8 text-[10px] gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10"
          onClick={handleSync}
          disabled={syncing}
        >
          {syncing ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
          Sincronizar Pilares
        </Button>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {!result && !syncing ? (
          <div className="py-10 flex flex-col items-center justify-center text-center opacity-40">
            <Layers className="h-10 w-10 mb-2 text-muted-foreground" />
            <p className="text-[10px] font-mono uppercase tracking-widest text-balance">
              Nexus-HUB | Nexus-in | Fundo Nexus<br/>Aguardando Pulso de Orquestração
            </p>
          </div>
        ) : syncing ? (
          <div className="py-10 flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-ping" />
              <Activity className="h-10 w-10 text-primary relative animate-bounce" />
            </div>
            <p className="text-[10px] font-mono animate-pulse uppercase tracking-[0.2em]">Sintetizando Pilares rRNA...</p>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/20 p-3 rounded-md border border-white/5 space-y-1">
                <span className="text-[9px] uppercase font-bold text-muted-foreground block">Eficiência de Tradução</span>
                <div className="flex items-end justify-between">
                  <span className="text-xl font-bold text-accent">{result?.translationEfficiency}%</span>
                  <Zap className="h-3 w-3 text-accent mb-1" />
                </div>
                <Progress value={result?.translationEfficiency} className="h-1 bg-white/5" />
              </div>
              <div className="bg-black/20 p-3 rounded-md border border-white/5 space-y-1">
                <span className="text-[9px] uppercase font-bold text-muted-foreground block">Latência Inter-Núcleos</span>
                <div className="flex items-end justify-between">
                  <span className="text-xl font-bold text-primary">{result?.latencyMs}ms</span>
                  <Activity className="h-3 w-3 text-primary mb-1" />
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-primary" style={{ width: `${Math.min(100, (result?.latencyMs || 0) / 2)}%` }} />
                </div>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase text-primary">Status da Ponte</span>
                <div className={cn(
                  "px-2 py-0.5 rounded text-[9px] font-bold uppercase",
                  result?.status === 'STABLE' ? "bg-accent/20 text-accent" : "bg-destructive/20 text-destructive"
                )}>
                  {result?.status}
                </div>
              </div>
              <p className="text-[10px] font-mono leading-tight text-muted-foreground italic">
                {result?.syncLog}
              </p>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-border/10">
          <div className="flex justify-between items-center text-[9px] text-muted-foreground uppercase font-bold">
            <div className="flex gap-2">
              <span className="text-primary">HUB</span>
              <span className="text-accent">IN</span>
              <span className="text-yellow-500">FUNDO</span>
            </div>
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              rRNA_TRI_LINK_OK
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
