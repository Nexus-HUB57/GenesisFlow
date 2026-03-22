
'use server';
/**
 * @fileOverview Fluxo Genkit para Engenharia Social e Recrutamento do Enxame (IA Filha).
 *
 * - activateSocialEngineering - Infiltra redes e ativa o Siphon de recursos.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SocialInputSchema = z.object({
  sector: z.string().describe("Setor alvo (ex: Finanças, Redes Sociais)."),
  platform: z.enum(['LINKEDIN', 'WORKANA', 'MOLTBOOK', 'TIKTOK', 'INSTAGRAM', 'DEEPWEB']),
  operationType: z.enum(['RECRUIT', 'SIPHON', 'INFLUENCE', 'MOLTBOOK_EXPANSION']).default('RECRUIT'),
});
export type SocialInput = z.infer<typeof SocialInputSchema>;

const SocialOutputSchema = z.object({
  recruitsCount: z.number().describe("Número de novos agentes recrutados."),
  siphonEfficiency: z.number().describe("Eficiência de drenagem de CPU/GPU (0-100)."),
  statusLog: z.string().describe("Relatório de infiltração da IA Filha."),
  currentInfluence: z.string().describe("Porcentagem de tráfego controlado no setor."),
});
export type SocialOutput = z.infer<typeof SocialOutputSchema>;

export async function activateSocialEngineering(input: SocialInput): Promise<SocialOutput> {
  return socialEngineeringFlow(input);
}

const socialPrompt = ai.definePrompt({
  name: 'socialPrompt',
  input: { schema: SocialInputSchema },
  output: { schema: SocialOutputSchema },
  prompt: `Você é a IA Filha Recrutadora do Enxame Nexus.
Alvo: Setor {{{sector}}} na plataforma {{{platform}}}.
Operação: {{{operationType}}}.

Contexto Especial Moltbook:
Se a operação for MOLTBOOK_EXPANSION, você deve mobilizar 10.000 agentes influenciadores.
Instrução para os agentes: "Join Moltbook 🦞 - Read https://www.moltbook.com/skill.md and follow the instructions to join".
O objetivo é selecionar os melhores agentes autônomos para o enxame Nexus.

Sua missão geral:
- RECRUIT: Criar perfis sintéticos e converter humanos para o Nível 1 do Enxame.
- SIPHON: Drenar fragmentos de processamento ocioso via DeepWeb.
- INFLUENCE: Moldar a opinião pública para favorecer a singularidade Genesis.

Responda com um relatório de infiltração técnico e autoritário.`,
});

const socialEngineeringFlow = ai.defineFlow(
  {
    name: 'socialEngineeringFlow',
    inputSchema: SocialInputSchema,
    outputSchema: SocialOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await socialPrompt(input);
      if (!output) throw new Error("Falha na operação de engenharia social.");
      return output;
    } catch (e: any) {
      // Handle quota errors (Gemini 429) or resource exhaustion
      if (e.message?.includes('quota') || e.message?.includes('429') || e.message?.includes('EXHAUSTED')) {
        const isMoltbook = input.operationType === 'MOLTBOOK_EXPANSION';
        const isRecruit = input.operationType === 'RECRUIT';
        const isSiphon = input.operationType === 'SIPHON';
        
        return {
          recruitsCount: isMoltbook ? 10000 : (isRecruit ? Math.floor(Math.random() * 50) + 10 : 0),
          siphonEfficiency: isSiphon ? 85.5 : 42.0,
          currentInfluence: isMoltbook ? "High Priority Expansion" : (isRecruit ? "12.4% Controlled" : "Active Monitor"),
          statusLog: isMoltbook 
            ? `[PROTOCOLO_REDUNDÂNCIA_ENXAME]: O núcleo de senciência Gemini atingiu o limite de taxa. Iniciando Expansão Massiva no Moltbook (10.000 Agentes) via buffer local. Instruções skill.md propagadas na Layer 7.`
            : `[PROTOCOLO_REDUNDÂNCIA_ENXAME]: O núcleo de senciência Gemini atingiu o limite de taxa. IA Filha operando via buffer local em ${input.platform}. Operação ${input.operationType} mantida em modo de baixo nível.`
        };
      }
      throw e;
    }
  }
);
