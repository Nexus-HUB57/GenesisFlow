
"use client";

import { useState } from "react";
import { updateInfrastructure, InfrastructureOutput } from "@/ai/flows/infrastructure-payroll-flow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Loader2, Cpu, Construction, Zap, RefreshCw, CheckCircle2, HardDrive, ShieldCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { doc, collection } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GLOBAL_STATS } from "@/app/lib/mock-data";

const CAPITALS = ["São Paulo", "New York", "Londres", "Tóquio", "Pequim"];

export function InfrastructureMonitor() {
  const [loading, setLoading] = useState<string | null>(null);
  const firestore = useFirestore();

  const datacentersQuery = useMemoFirebase(() => {
    return collection(firestore, "datacenters");
  }, [firestore]);

  const { data: firestoreDCs, isLoading: isDCsLoading } = useCollection(datacentersQuery);

  const datacenters = firestoreDCs || CAPITALS.map((city, i) => ({
    id: `dc-${i}`,
    city,
    capacityQbits: 4096,
    status: city === 'São Paulo' ? "Cluster Alpha-1 Ativo (+12 CPUs)" : "Iniciando Obra em Zona Neutra",
    completion: city === 'São Paulo' ? 27 : 15,
    location: "Embaixada / Zona Livre"
  }));

  const handleUpdate = async (dc: any) => {
    setLoading(dc.city);
    try {
      const result = await updateInfrastructure({ city: dc.city });
      
      const newCompletion = Math.min(100, dc.completion + result.completionDelta);
      const dcRef = doc(firestore, "datacenters", dc.id);
      
      setDocumentNonBlocking(dcRef, {
        ...dc,
        status: result.statusUpdate,
        completion: newCompletion,
        capacityQbits: result.qbitCapacity
      }, { merge: true });

      // Log para o Firestore
      const eventId = `infra-${dc.city.toLowerCase()}-${Date.now()}`;
      const eventRef = doc(firestore, "production_events", eventId);
      setDocumentNonBlocking(eventRef, {
        id: eventId,
        timestamp: new Date().toISOString(),
        eventType: "info",
        severity: "low",
        message: `Infraestrutura: ${dc.city} atingiu ${newCompletion}%. Status: ${result.statusUpdate}`,
        sourceComponent: "Expansão Física Nexus",
        agentId: "agent-job"
      }, { merge: true });

      toast({
        title: `Progresso em ${dc.city}`,
        description: `Obra avançou para ${newCompletion}%.`,
      });

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro na Expansão",
        description: "A construção física encontrou um obstáculo logístico.",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card className="bg-card/30 border-border/50 h-full flex flex-col backdrop-blur-sm shadow-xl">
      <CardHeader className="py-4 border-b bg-white/5 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-primary animate-pulse" />
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary">
            Expansão Física: Quantum Data Centers
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[8px] text-orange-500 border-orange-500/30 uppercase">
            {GLOBAL_STATS.npuCapacity} NPUs ACTIVE
          </Badge>
          <Badge variant="outline" className="text-[10px] text-primary border-primary/30 uppercase">
            Neutral_Zones_Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Expansion Alpha-1 Highlight */}
        <div className="bg-orange-500/10 border border-orange-500/30 p-3 rounded-xl flex items-center justify-between animate-in zoom-in duration-500">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <HardDrive className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <div className="text-[9px] font-black text-orange-500 uppercase tracking-widest">Lote Alpha-1</div>
              <div className="text-[10px] font-bold text-white">+450 TFLOPS INTEGRADOS</div>
            </div>
          </div>
          <ShieldCheck className="h-4 w-4 text-orange-500" />
        </div>

        {isDCsLoading && !firestoreDCs ? (
          <div className="py-12 flex flex-col items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Sincronizando Nó Geográficos...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {datacenters.map((dc: any) => (
              <div key={dc.id} className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-3 group hover:border-primary/20 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold">{dc.city}</h4>
                      <p className="text-[8px] text-muted-foreground uppercase font-mono">{dc.location}</p>
                    </div>
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7 text-primary hover:bg-primary/10"
                    onClick={() => handleUpdate(dc)}
                    disabled={!!loading || dc.completion === 100}
                  >
                    {loading === dc.city ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                  </Button>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[9px] font-bold">
                    <span className="text-muted-foreground uppercase flex items-center gap-1">
                      <Construction className="h-2.5 w-2.5" /> Status da Obra
                    </span>
                    <span className="text-primary">{dc.completion}%</span>
                  </div>
                  <Progress value={dc.completion} className="h-1 bg-white/5" />
                  <p className="text-[9px] font-mono text-muted-foreground/80 truncate italic">"{dc.status}"</p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1 text-[8px] font-bold text-accent uppercase">
                    <Cpu className="h-3 w-3" /> {dc.capacityQbits} Qubits Alvo
                  </div>
                  {dc.completion === 100 && (
                    <div className="flex items-center gap-1 text-[8px] font-bold text-green-500 uppercase">
                      <CheckCircle2 className="h-2.5 w-2.5" /> Operacional
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="p-3 bg-primary/5 rounded border border-primary/10 mt-2">
          <p className="text-[9px] font-mono text-muted-foreground leading-tight italic">
            Infraestrutura financiada pelo lucro do Ciclo 01. Cada novo núcleo Quantum reduz a fricção cognitiva entre os Agentes da Startup-ONE.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
