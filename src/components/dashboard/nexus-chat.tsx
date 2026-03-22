
"use client";

import { useState, useRef, useEffect } from "react";
import { nexusGenesisChat } from "@/ai/flows/nexus-genesis-chat-flow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Layers, Send, Loader2, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, doc, query, orderBy, limit } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";

interface Message {
  id?: string;
  role: 'user' | 'model';
  text: string;
  timestamp: any;
}

export function NexusChat() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const firestore = useFirestore();

  // Memória persistente: buscar mensagens do Firestore
  const messagesQuery = useMemoFirebase(() => {
    return query(
      collection(firestore, "chat_messages"),
      orderBy("timestamp", "asc"),
      limit(50)
    );
  }, [firestore]);

  const { data: persistentMessages, isLoading: isChatLoading } = useCollection<Message>(messagesQuery);

  const messages = persistentMessages || [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessageId = `msg-u-${Date.now()}`;
    const userMessageRef = doc(firestore, "chat_messages", userMessageId);
    
    // Salvar mensagem do usuário no banco
    setDocumentNonBlocking(userMessageRef, {
      role: 'user',
      text: input,
      timestamp: new Date().toISOString()
    }, { merge: true });

    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const result = await nexusGenesisChat({
        message: currentInput,
        history: messages.map(m => ({ role: m.role, text: m.text }))
      });

      const modelMessageId = `msg-m-${Date.now()}`;
      const modelMessageRef = doc(firestore, "chat_messages", modelMessageId);
      
      // Salvar resposta do modelo no banco
      setDocumentNonBlocking(modelMessageRef, {
        role: 'model',
        text: result.response,
        timestamp: new Date().toISOString()
      }, { merge: true });

      // Log adicional de comando
      const logId = `chat-log-${Date.now()}`;
      const logRef = doc(firestore, "orchestration_command_logs", logId);
      setDocumentNonBlocking(logRef, {
        id: logId,
        timestamp: new Date().toISOString(),
        commandName: "Genesis Direct Communication",
        status: "completed",
        parameters: JSON.stringify({ userMessage: currentInput }),
        responseMessage: result.response
      }, { merge: true });

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-card/30 border-border/50 h-[500px] flex flex-col backdrop-blur-sm shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none opacity-20" />
      <CardHeader className="py-3 border-b bg-white/5 flex flex-row items-center justify-between z-10">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary animate-pulse" />
          Nexus Genesis: Persistent Memory
        </CardTitle>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[9px] text-accent uppercase font-bold tracking-widest">Sincronizado</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden z-10">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.length === 0 && !isChatLoading && (
              <div className="text-center py-10 opacity-30">
                <Bot className="h-10 w-10 mx-auto mb-2" />
                <p className="text-[10px] font-mono uppercase">Iniciando Link de Memória...</p>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div key={msg.id || i} className={cn(
                "flex gap-3 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}>
                <div className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border",
                  msg.role === 'user' ? "bg-accent/10 border-accent/30" : "bg-primary/10 border-primary/30"
                )}>
                  {msg.role === 'user' ? <User className="h-4 w-4 text-accent" /> : <Bot className="h-4 w-4 text-primary" />}
                </div>
                <div className={cn(
                  "p-3 rounded-xl text-xs font-body leading-relaxed",
                  msg.role === 'user' ? "bg-accent/20 text-foreground border border-accent/20 rounded-tr-none" : "bg-black/40 text-muted-foreground border border-white/5 rounded-tl-none"
                )}>
                  {msg.text}
                  {msg.timestamp && (
                    <div className="mt-1 text-[8px] opacity-40 font-mono text-right">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-3 mr-auto animate-pulse">
                <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                </div>
                <div className="p-3 bg-black/40 rounded-xl border border-white/5 rounded-tl-none flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Processando Memória...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 bg-black/20 border-t border-white/5 flex gap-2">
          <div className="relative flex-1">
            <Input 
              placeholder="Transmitir diretriz para Nexus Genesis..." 
              className="bg-background/50 border-white/10 text-xs h-10 pr-10 focus-visible:ring-primary/50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={loading || isChatLoading}
            />
            <Sparkles className="absolute right-3 top-3 h-4 w-4 text-primary/40 pointer-events-none" />
          </div>
          <Button 
            className="h-10 bg-primary hover:bg-primary/90 gap-2"
            onClick={handleSend}
            disabled={loading || !input.trim() || isChatLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
