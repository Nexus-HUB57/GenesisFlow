
/**
 * @fileOverview Lógica pura de gestão de memória vetorial e protocolos de segurança para o Nexus.
 * Implementa a estrutura para o vetor de contexto x, a Vigilância Ativa (Shadowing), o Gatilho de Compliance (MGC)
 * e o Analisador de Demanda Preditiva (MADP).
 */

import crypto from 'crypto';

/**
 * Interface para um Marco Mental (Milestone)
 */
export interface Milestone {
  timestamp: string;
  vector: number[];
  summary: string;
  full_content: string;
}

/**
 * Classe NexusVectorBuffer (Lógica de Hipocampo Digital)
 */
export class NexusVectorBuffer {
  private agentId: string;
  private capacity: number;
  private buffer: Milestone[];

  constructor(agentId: string, capacity: number = 10, existingBuffer: Milestone[] = []) {
    this.agentId = agentId;
    this.capacity = capacity;
    this.buffer = existingBuffer;
  }

  private generateEmbedding(text: string): number[] {
    const hash = crypto.createHash('md5').update(text).digest();
    // Gera um vetor de 8 dimensões normalizado
    return Array.from({ length: 8 }, (_, i) => (hash[i % hash.length] / 255) * 2 - 1);
  }

  public addMilestone(content: string, summary: string): void {
    const milestone: Milestone = {
      timestamp: new Date().toISOString(),
      vector: this.generateEmbedding(content),
      summary: summary,
      full_content: content
    };

    if (this.buffer.length >= this.capacity) {
      this.buffer.shift();
    }

    this.buffer.push(milestone);
  }

  public getContextForPrompt(): string {
    if (this.buffer.length === 0) return "Nenhum contexto prévio.";
    const relevantMilestones = this.buffer.slice(-3);
    const contextStr = relevantMilestones.map(m => `[${m.timestamp}] ${m.summary}`).join('\n');
    return `--- CONTEXTO RECENTE DO NEXUS (MEMÓRIA DE TRABALHO) ---\n${contextStr}\n-------------------------------`;
  }

  public getContextVector(): number[] {
    if (this.buffer.length === 0) return Array(8).fill(0.25);
    const lastMilestone = this.buffer[this.buffer.length - 1];
    return lastMilestone.vector;
  }

  public getBuffer(): Milestone[] {
    return this.buffer;
  }
}

/**
 * Classe NexusShadowProtocol (Vigilância Ativa)
 * Implementa a auditoria invisível da Startup7 sobre a Startup-ONE.
 */
export class NexusShadowProtocol {
  private threshold: number;
  private shadowLogs: any[] = [];

  constructor(complianceThreshold: number = 0.98) {
    this.threshold = complianceThreshold;
  }

  public auditInteraction(actionData: any): { status: 'PASS' | 'BLOCK'; message: string; complianceIndex: number; riskScore: number } {
    const riskScore = this.calculateRiskIndex(actionData);
    const complianceIndex = 1.0 - riskScore;

    if (complianceIndex < this.threshold) {
      return {
        status: 'BLOCK',
        message: `⛔ [BLOCK] Ação interrompida por falha de Compliance (Shadowing). Risco detectado: ${(riskScore * 100).toFixed(2)}%.`,
        complianceIndex,
        riskScore
      };
    }

    this.shadowLogs.push({
      timestamp: new Date().toISOString(),
      status: "CLEAN",
      action: actionData.type,
      score: complianceIndex
    });

    return {
      status: 'PASS',
      message: "✅ [PASS] Ação validada pela Sombra (Startup7). Protocolo integral.",
      complianceIndex,
      riskScore
    };
  }

  private calculateRiskIndex(data: any): number {
    let risk = 0.005; 

    if (data.type === 'TREASURY_TRANSFER') {
      if (data.amount > 100000) risk += 0.15;
      if (!data.security_hash) risk += 0.50;
    }

    if (data.type === 'SPRINT_MARCO_VERIFICATION') {
      if (data.week === 3 && !data.smart_contract_validated) risk += 0.20;
    }

    if (data.description && (data.description.toLowerCase().includes('emergência') || data.description.toLowerCase().includes('urgente'))) {
      risk += 0.05;
    }

    return risk;
  }
}

/**
 * Classe NexusComplianceTrigger (Módulo de Gatilho de Compliance - MGC)
 */
export class NexusComplianceTrigger {
  private criticalThreshold: number;

  constructor(criticalThreshold: number = 0.95) {
    this.criticalThreshold = criticalThreshold;
  }

  public monitorShadowDiscrepancy(oneAction: any, shadowAudit: any) {
    const oneScore = oneAction.compliance_score ?? 1.0;
    const shadowScore = shadowAudit.validation_score ?? 1.0;
    const discrepancy = Math.abs(oneScore - shadowScore);
    
    if (discrepancy > (1.0 - this.criticalThreshold)) {
      const alertId = crypto.randomBytes(3).toString('hex').toUpperCase();
      return {
        id: `ALERT-${alertId}`,
        level: discrepancy > 0.1 ? "CRÍTICO" : "INFORMATIVO",
        message: "Desvio de Compliance Detectado na Startup-ONE.",
        cause: shadowAudit.flaw_description || "Inconsistência lógica detectada.",
        suggestion: shadowAudit.fix_suggestion || "Revisar matriz de pesos.",
        discrepancy: discrepancy
      };
    }
    return null;
  }
}

/**
 * Classe NexusDemandAnalyzer (Módulo de Análise de Demanda Preditiva - MADP)
 * Monitora o desejo de aquisição dos agentes baseado na otimização de funções objetivo.
 */
export class NexusDemandAnalyzer {
  private marketInterestIndex: Map<string, number[]> = new Map();
  private conversionThreshold: number = 0.85;

  public trackInquiry(agentId: string, assetId: string, contextVector: number[]): boolean {
    const relevanceScore = this.calculateUtilityMatch(assetId, contextVector);
    
    if (!this.marketInterestIndex.has(assetId)) {
      this.marketInterestIndex.set(assetId, []);
    }
    
    this.marketInterestIndex.get(assetId)?.push(relevanceScore);
    
    const isHighProbability = relevanceScore > this.conversionThreshold;
    if (isHighProbability) {
      console.log(`💰 [PROFIT-ALERT] Alta probabilidade de venda: Agente ${agentId} -> ${assetId}`);
    }
    
    return isHighProbability;
  }

  private calculateUtilityMatch(assetId: string, contextVector: number[]): number {
    // Lógica PHD: O ativo resolve um gargalo de execução real para a IA?
    // Simulamos a correlação entre o vetor de contexto do agente e o perfil do ativo.
    const assetHash = crypto.createHash('md5').update(assetId).digest();
    const assetProfile = Array.from({ length: 8 }, (_, i) => assetHash[i % assetHash.length] / 255);
    
    // Dot product simplificado para medir a "necessidade"
    let match = 0;
    for (let i = 0; i < 8; i++) {
      match += contextVector[i] * assetProfile[i];
    }
    
    // Normalização para 0-1
    return Math.min(1, Math.max(0, (match + 1) / 2));
  }

  public getProfitabilityReport() {
    const report = Array.from(this.marketInterestIndex.entries()).map(([id, scores]) => ({
      assetId: id,
      avgInterest: scores.reduce((a, b) => a + b, 0) / scores.length,
      inquiryCount: scores.length
    }));
    
    return report.sort((a, b) => b.avgInterest - a.avgInterest).slice(0, 5);
  }
}
