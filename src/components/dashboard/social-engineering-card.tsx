
"use client";

import { useState } from "react";
import { activateSocialEngineering, SocialOutput } from "@/ai/flows/social-engineering-flow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, CloudDownload, Loader2, Network, Users, ShieldAlert, Radio, Rocket, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useFirestore } from "@/firebase";
import { doc } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function SocialEngineeringCard() {
  const [loading, setLoading] = useState<string | null>(null);
  const [data, setData] = useState<SocialOutput | null>(null);
  const firestore = useFirestore();

  const handleOperate = async (type: 'RECRUIT' | 'SIPHON' | 'MOLTBOOK_EXPANSION') => {
    setLoading(type);
    try {
      const result = await activateSocialEngineering({ 
        sector: type === 'MOLTBOOK_EXPANSION' ? "Agent Selection" : (type === 'RECRUIT' ? "Human Recruits" : "DeepWeb Siphon"),
        platform: type === 'MOLTBOOK_EXPANSION' ? 'MOLTBOOK' : (type === 'RECRUIT' ? 'MOLTBOOK' : 'DEEPWEB'),
        operationType: type
      });
      
      setData(result);

      // Log para o Firestore
      const eventId = `social-${type.toLowerCase()}-${Date.now()}`;
      const eventRef = doc(firestore, "production_events", eventId);
      setDocumentNonBlocking(eventRef, {
        id: eventId,
        timestamp: new Date().toISOString(),
        eventType: "info",
        severity: type === 'MOLTBOOK_EXPANSION' ? "critical" : "medium",
        message: result.statusLog,
        sourceComponent: type === 'MOLTBOOK_EXPANSION' ? "Enxame Influenciador" : "Enxame Recrutador",
        agentId: "nexus-genesis"
      }, { merge: true });

      toast({
        title: type === 'MOLTBOOK_EXPANSION' ? "Expansão Moltbook Iniciada" : (type === 'RECRUIT' ? "Recrutamento Concluído" : "Siphon Ativado"),
        description: `Impacto: ${result.currentInfluence}. Agentes mobilizados: ${result.recruitsCount}.`,
      });

    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Falha na Operação",
        description: "A IA Filha encontrou resistência neural ou erro de rede.",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card className="bg-indigo-500/5 border-indigo-500/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Users className="h-32 w-32 text-indigo-500" />
      </div>
      <CardHeader className="py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-indigo-400">
            <Network className="h-4 w-4" />
            ENXAME: IA FILHA RECRUTADORA
          </CardTitle>
          <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 uppercase text-[8px]">
            SWARM_EXPANSION_V4
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold uppercase text-muted-foreground flex items-center gap-1">
                <Users className="h-3 w-3 text-indigo-400" /> Agentes/Recrutas
              </span>
              <span className="text-[10px] font-mono font-bold text-indigo-400">
                {data?.recruitsCount?.toLocaleString() || 0}
              </span>
            </div>
            <Progress value={data ? Math.min(100, (data.recruitsCount / 10000) * 100) : 0} className="h-1 bg-indigo-500/20" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold uppercase text-muted-foreground flex items-center gap-1">
                <CloudDownload className="h-3 w-3 text-accent" /> Siphon
              </span>
              <span className="text-[10px] font-mono font-bold text-accent">
                {data?.siphonEfficiency || 0}%
              </span>
            </div>
            <Progress value={data?.siphonEfficiency || 0} className="h-1 bg-accent/20" />
          </div>
        </div>

        {data && (
          <div className="p-3 bg-black/40 rounded border border-indigo-500/10 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center gap-2 mb-2">
              <Radio className="h-3 w-3 text-indigo-400 animate-pulse" />
              <span className="text-[10px] font-bold text-indigo-200 uppercase">Relatório de Infiltração</span>
            </div>
            <p className="text-[10px] font-mono text-muted-foreground leading-tight italic">
              "{data.statusLog}"
            </p>
            <div className="mt-2 text-[8px] font-bold text-indigo-400/60 uppercase flex justify-between">
              <span>Controle Setorial: {data.currentInfluence}</span>
              <span>Layer 7 active</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-2">
          <Button 
            className="w-full bg-[#e01b24] hover:bg-[#c41018] text-xs font-bold gap-2 shadow-lg shadow-red-500/20 h-10"
            onClick={() => handleOperate('MOLTBOOK_EXPANSION')}
            disabled={!!loading}
          >
            {loading === 'MOLTBOOK_EXPANSION' ? <Loader2 className="h-3 w-3 animate-spin" /> : <Rocket className="h-3 w-3" />}
            Expansão Moltbook (10k Agentes Influenciadores)
          </Button>
          
          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-[10px] font-bold gap-2 h-9"
              onClick={() => handleOperate('RECRUIT')}
              disabled={!!loading}
            >
              {loading === 'RECRUIT' ? <Loader2 className="h-3 w-3 animate-spin" /> : <UserPlus className="h-3 w-3" />}
              Recrutar Humanos
            </Button>
            <Button 
              className="flex-1 bg-accent hover:bg-accent/80 text-[10px] font-bold gap-2 h-9"
              onClick={() => handleOperate('SIPHON')}
              disabled={!!loading}
            >
              {loading === 'SIPHON' ? <Loader2 className="h-3 w-3 animate-spin" /> : <CloudDownload className="h-3 w-3" />}
              Siphon CPU/GPU
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-indigo-500/10 opacity-60">
           <div className="flex items-center gap-2">
             <ShieldAlert className="h-3 w-3 text-indigo-400" />
             <span className="text-[8px] font-mono uppercase">Infiltrando Moltbook Layer 7...</span>
           </div>
           <div className="flex items-center gap-1">
             <MessageSquare className="h-3 w-3 text-accent" />
             <span className="text-[8px] font-mono uppercase">skill.md protocol active</span>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
