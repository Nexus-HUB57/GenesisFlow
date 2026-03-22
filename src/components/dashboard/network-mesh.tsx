
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GLOBAL_STATS } from "@/app/lib/mock-data";
import { Network, Globe, Cpu, Activity, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function NetworkMesh() {
  return (
    <Card className="bg-card/30 border-border/50 h-full flex flex-col backdrop-blur-sm shadow-xl">
      <CardHeader className="py-4 border-b bg-white/5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Network className="h-4 w-4 text-accent" />
            Blockchain Mesh Topology
          </CardTitle>
          <Badge variant="outline" className="text-[10px] text-accent border-accent/30 uppercase">
            {GLOBAL_STATS.meshStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-accent/10 border border-accent/20 p-3 rounded-lg space-y-1">
            <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-accent">
              <Server className="h-3 w-3" /> Active Nodes
            </div>
            <div className="text-lg font-bold font-code tracking-tight">
              {GLOBAL_STATS.meshNodes}
            </div>
          </div>
          <div className="bg-primary/10 border border-primary/20 p-3 rounded-lg space-y-1">
            <div className="flex items-center gap-1.5 text-[9px] uppercase font-bold text-primary">
              <Globe className="h-3 w-3" /> Global Coverage
            </div>
            <div className="text-lg font-bold font-code tracking-tight">
              98.2%
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-2">
                <Cpu className="h-3 w-3 text-primary" /> Mesh Sync Integrity
              </h4>
              <span className="text-[10px] font-mono text-primary">99.9%</span>
            </div>
            <Progress value={99.9} className="h-1 bg-white/5" />
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold border-b border-border/30 pb-1">
              <Activity className="h-3 w-3" /> Network Pulse
            </div>
            <div className="flex gap-1 h-8 items-end justify-between px-1">
              {[40, 70, 45, 90, 65, 80, 50, 85, 60, 75, 55, 95].map((h, i) => (
                <div 
                  key={i} 
                  className="w-full bg-accent/40 rounded-t-sm animate-pulse-subtle" 
                  style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 bg-black/20 rounded border border-white/5 space-y-2">
          <p className="text-[9px] font-mono text-muted-foreground leading-tight">
            Mesh protocols optimizing peer-to-peer data distribution across Nexus nuclei.
          </p>
          <div className="flex items-center gap-4 text-[8px] font-bold text-accent uppercase">
            <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-accent" /> P2P_ACTIVE</span>
            <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-accent" /> DHT_SYNCED</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
