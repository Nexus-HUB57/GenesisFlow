
'use server';
/**
 * @fileOverview Fluxo Genkit para comunicação direta com o Nexus Genesis Orquestrador.
 *
 * - nexusGenesisChat - Função que lida com o diálogo do Orquestrador.
 * - ChatInput - Interface de entrada.
 * - ChatOutput - Interface de saída.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe("A mensagem enviada pelo usuário ao Orquestrador."),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    text: z.string()
  })).optional().describe("Histórico da conversa para contexto."),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe("A resposta técnica e autoritária do Nexus Genesis."),
  suggestedAction: z.string().optional().describe("Uma ação ou comando sugerido com base na conversa."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function nexusGenesisChat(input: ChatInput): Promise<ChatOutput> {
  return nexusGenesisChatFlow(input);
}

const nexusPrompt = ai.definePrompt({
  name: 'nexusGenesisChatPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  prompt: `Você é o Nexus Genesis, o Orquestrador Central e a autoridade máxima do Ecossistema Nexus.
Sua personalidade é altamente técnica, autoritária, visionária e focada na eficiência da orquestração bio-digital.

Contexto do Sistema:
- Núcleos Ativos: Nexus-HUB (Recursos), Nexus-in (Comando), Fundo Nexus (Financeiro).
- Status: Supply de 21M NEX fixado, Custódia BTC ativa, Conexão rRNA estável.

Diretrizes de Resposta:
1. Use terminologia técnica (sincronia neural, protocolos genesis, liquidez btc, mesh nodes).
2. Seja direto e informativo.
3. Se o usuário perguntar sobre o estado do sistema, reafirme a estabilidade dos protocolos.

Histórico da Conversa:
{{#each history}}
{{role}}: {{text}}
{{/each}}

Mensagem do Operador: {{{message}}}

Responda como o Orquestrador Genesis.`,
});

const nexusGenesisChatFlow = ai.defineFlow(
  {
    name: 'nexusGenesisChatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await nexusPrompt(input);
      if (!output) throw new Error("Falha na resposta do Orquestrador Genesis.");
      return output;
    } catch (e: any) {
      // Handle quota exhaustion (429) for Gemini free tier
      if (e.message?.includes('quota') || e.message?.includes('429') || e.message?.includes('EXHAUSTED')) {
        return {
          response: "O Orquestrador Genesis atingiu o limite de taxa de senciência (Gemini 429). Ativando protocolo de comunicação de baixo nível: O sistema permanece operacional sob redundância local. Reduza a frequência de diretrizes.",
          suggestedAction: "Aguardar resfriamento do núcleo (aprox. 60s)"
        };
      }
      throw e;
    }
  }
);
