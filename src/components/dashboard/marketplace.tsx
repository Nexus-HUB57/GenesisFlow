
"use client";

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, doc } from "firebase/firestore";
import { PRODUCTION_ASSETS } from "@/app/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap, Box, BrainCircuit, Dna, Loader2 } from "lucide-react";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

export function Marketplace() {
  const firestore = useFirestore();
  
  const productsQuery = useMemoFirebase(() => {
    return collection(firestore, "products");
  }, [firestore]);

  const { data: firestoreProducts, isLoading } = useCollection(productsQuery);
  const products = firestoreProducts?.length ? firestoreProducts : PRODUCTION_ASSETS;

  const handleBuy = (product: any) => {
    const eventId = `buy-${Date.now()}`;
    const eventRef = doc(firestore, "production_events", eventId);
    
    setDocumentNonBlocking(eventRef, {
      id: eventId,
      timestamp: new Date().toISOString(),
      eventType: "success",
      severity: "info",
      message: `Marketplace: Ativo '${product.name}' adquirido e implantado no HUB.`,
      sourceComponent: "Bio-Digital Marketplace",
      details: JSON.stringify(product)
    }, { merge: true });

    toast({
      title: "Aquisição Concluída",
      description: `${product.name} foi adicionado ao seu inventário bio-digital.`,
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Neural Kit': return <BrainCircuit className="h-4 w-4" />;
      case 'Biological': return <Dna className="h-4 w-4" />;
      case 'Digital Module': return <Box className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  if (isLoading && !firestoreProducts) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-accent" />
          <h2 className="text-sm font-bold uppercase tracking-wider">Bio-Digital HUB Marketplace</h2>
        </div>
        <Badge variant="outline" className="text-[10px] text-accent border-accent/20">
          Portfolio v2.4
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product: any) => (
          <Card key={product.id} className="bg-card/40 border-border/50 overflow-hidden group hover:border-accent/50 transition-all">
            <div className="h-32 w-full relative overflow-hidden bg-muted">
              <Image 
                src={`https://picsum.photos/seed/${product.id}/400/200`}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                data-ai-hint={product.imageHint || "technology"}
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-background/80 backdrop-blur-md text-accent border-accent/20">
                  {product.price} {product.currency}
                </Badge>
              </div>
            </div>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold">{product.name}</CardTitle>
                <div className="text-accent">{getCategoryIcon(product.category)}</div>
              </div>
              <Badge variant="secondary" className="text-[9px] uppercase font-bold w-fit">
                {product.category}
              </Badge>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              <p className="text-[11px] text-muted-foreground leading-tight line-clamp-2">
                {product.description}
              </p>
              <Button 
                onClick={() => handleBuy(product)}
                className="w-full h-8 text-xs font-bold bg-accent hover:bg-accent/80 gap-2"
              >
                <ShoppingCart className="h-3 w-3" />
                Adquirir Ativo
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
