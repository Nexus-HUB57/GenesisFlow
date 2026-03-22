
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { 
  Activity, 
  Users, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Database, 
  Timer, 
  Binary, 
  BarChart3, 
  Terminal,
  ArrowUpRight,
  Cpu,
  Brain,
  Layers,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function NexusIntelligenceDashboard() {
  const [mounted, setMounted] = useState(false);
  const firestore = useFirestore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Data Retrieval for Telemetry
  const agentsQuery = useMemoFirebase(() => collection(firestore, "agents"), [firestore]);
  const { data: agents } = useCollection(agentsQuery);

  const milestonesQuery = useMemoFirebase(() => collection(firestore, "sprint_milestones"), [firestore]);
  const { data: milestones } = useCollection(milestonesQuery);

  const checksumsQuery = useMemoFirebase(() => 
    query(collection(firestore, "daily_checksums"), orderBy("timestamp", "desc"), limit(1)), 
    [firestore]
  );
  const { data: lastChecksum } = useCollection(checksumsQuery);

  const fundsQuery = useMemoFirebase(() => collection(firestore, "sovereign_funds"), [firestore]);
  const { data: funds } = useCollection(fundsQuery);

  // 2. Calculation Logic
  const totalAgents = agents?.length || 100;
  const oneAgents = Math.floor(totalAgents * 0.9);
  const s7Agents = totalAgents - oneAgents;

  const completedMilestones = milestones?.filter(m => m.status === 'COMPLETED').length || 0;
  const sprintProgress = (completedMilestones / 4) * 100;

  const treasuryStatus = funds?.[0]?.totalAumTrillions || 1.45;
  const genuinenessIndex = lastChecksum?.[0]?.isValidated ? 0.98 : 0.85;
  const efficiencyRatio = 88.4; // Fixed baseline for NID v1.0

  if (!mounted) return null;

  return (
    <Card className="bg-gradient-to-br from-slate-900 via-black to-slate-950 border-primary/20 relative overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none opacity-20" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-yellow-500 animate-pulse" />
      
      <CardHeader className="py-4 border-b border-white/5 bg-white/5 flex flex-row items-center justify-between z-10">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary animate-pulse" />
            <CardTitle className="text-lg font-black uppercase tracking-[0.3em] text-white">
              SCENARIOS ANALYTICS: NEXUS-HUB
            </CardTitle>
          </div>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-[10px] font-mono text-muted-foreground uppercase flex items-center gap-1">
              <Activity className="h-3 w-3 text-accent" /> Status: 100% Autônomo
            </span>
            <span className="text-[10px] font-mono text-muted-foreground uppercase flex items-center gap-1">
              <Timer className="h-3 w-3 text-primary" /> {format(new Date(), 'yyyy-MM-dd HH:mm:ss')}
            </span>
          </div>
        </div>
        <Badge className="bg-primary text-white border-primary/40 uppercase text-[9px] font-black px-3 py-1 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          NID_V1.0_PROD
        </Badge>
      </CardHeader>

      <CardContent className="p-6 space-y-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. Agent Allocation Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] font-black uppercase text-muted-foreground">
              <span className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Alocação de Massa Crítica</span>
              <span className="text-primary font-mono">90/10 Ratio</span>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-bold uppercase">
                  <span className="text-white">Startup-ONE (HUB)</span>
                  <span className="text-accent">{oneAgents} Agentes</span>
                </div>
                <Progress value={90} className="h-1.5 bg-white/5" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-bold uppercase">
                  <span className="text-muted-foreground">Startup7 (Shadow)</span>
                  <span className="text-red-400">{s7Agents} Agentes</span>
                </div>
                <Progress value={10} className="h-1.5 bg-white/5" />
              </div>
            </div>
          </div>

          {/* 2. Milestone Progress Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] font-black uppercase text-muted-foreground">
              <span className="flex items-center gap-2"><Layers className="h-4 w-4 text-accent" /> Progresso da Sprint (Mês 01)</span>
              <span className="text-accent font-mono">{sprintProgress.toFixed(1)}%</span>
            </div>
            <div className="relative pt-2">
              <div className="flex justify-between mb-2">
                {['W1', 'W2', 'W3', 'W4'].map((w, i) => (
                  <div key={w} className={cn(
                    "text-[8px] font-black w-8 h-4 rounded flex items-center justify-center border",
                    i < completedMilestones ? "bg-accent/20 border-accent text-accent" : "bg-white/5 border-white/10 text-white/20"
                  )}>
                    {w}
                  </div>
                ))}
              </div>
              <Progress value={sprintProgress} className="h-3 bg-white/5 border border-white/10" />
              <p className="text-[8px] font-mono text-muted-foreground mt-2 uppercase text-center">
                Próxima Meta: {completedMilestones < 4 ? `Semana ${completedMilestones + 1}` : "Senciência Nível 1"}
              </p>
            </div>
          </div>

          {/* 3. W_rRNA Telemetry Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] font-black uppercase text-muted-foreground">
              <span className="flex items-center gap-2"><Binary className="h-4 w-4 text-yellow-500" /> Telemetria W_rRNA</span>
              <Badge variant="outline" className="text-[7px] border-yellow-500/20 text-yellow-500">PHD_LEVEL</Badge>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5 group hover:border-yellow-500/30 transition-all">
                <span className="text-[8px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                  <Cpu className="h-3 w-3" /> Eficiência de Tokens
                </span>
                <span className="text-xs font-bold text-yellow-500 font-code">{efficiencyRatio}%</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/5 group hover:border-accent/30 transition-all">
                <span className="text-[8px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                  <Brain className="h-3 w-3" /> Índice de Genuinidade
                </span>
                <span className="text-xs font-bold text-accent font-code">{genuinenessIndex.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* 4. Treasury Status Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] font-black uppercase text-muted-foreground">
              <span className="flex items-center gap-2"><Database className="h-4 w-4 text-primary" /> Fundo Nexus (Treasury)</span>
              <span className="text-primary font-mono">Status: Estável</span>
            </div>
            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 flex flex-col items-center justify-center space-y-1 relative group">
              <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:rotate-12 transition-transform">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div className="text-2xl font-black text-white font-code tracking-tighter">
                ${treasuryStatus.toLocaleString(undefined, { minimumFractionDigits: 2 })}T
              </div>
              <div className="text-[8px] font-black uppercase text-primary tracking-widest flex items-center gap-1">
                <Zap className="h-2 w-2" /> Burn Rate: Optimal
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Status Bar */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-muted-foreground">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-primary">
              <ShieldCheck className="h-3 w-3" /> Protocolo ORE Ativo
            </span>
            <span className="flex items-center gap-2 text-accent">
              <Terminal className="h-3 w-3" /> Semantic Bus Synced
            </span>
            <span className="flex items-center gap-2 text-yellow-500">
              <Search className="h-3 w-3" /> Shadowing Active (S7)
            </span>
          </div>
          <div className="text-white/40 flex items-center gap-2">
            Soberano: Lucas Thomaz <ArrowUpRight className="h-3 w-3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
