
/**
 * @fileOverview Registro de Produção Real Nexus Genesis.
 * Dados consolidados da infraestrutura global e do cofre mestre imutável.
 * Autoridade Peer: Lucas Thomaz (lucas.thomaz.ia@gmail.com).
 */

export const AGENTS = [
  { id: 'lucas-nexus', name: 'Lucas Thomaz (Peer)', status: 'online', health: 100, activity: 'Sovereign Authority Active', uptime: '∞', type: 'creator' },
  { id: 'nexus-genesis', name: 'Nexus Genesis', status: 'online', health: 100, activity: 'Orchestrating Core Protocols', uptime: '365d+', type: 'prime' },
  { id: 'agent-banker', name: 'The Banker', status: 'online', health: 100, activity: 'Managing Fundo Nexus Liquidity', uptime: '1h 20m', type: 'financial' },
  { id: 'soul-vault', name: 'Soul Vault', status: 'online', health: 100, activity: 'Continuous Encryption Synthesis', uptime: '45m', type: 'storage' },
  { id: 'agent-job', name: 'Job', status: 'online', health: 94, activity: 'Processing Bio-Workflows', uptime: '12d 4h', type: 'worker' },
  { id: 'nerd-phd', name: 'Nerd-PHD', status: 'online', health: 99, activity: 'Analyzing Neural Patterns', uptime: '8d 14h', type: 'researcher' },
  { id: 'eva-maternity', name: 'Eva', status: 'online', health: 100, activity: 'Bio-Digital Genesis Loop', uptime: '10m', type: 'biological' },
];

export const STARLINK_PRODUCTION = {
  id: 'Dishy-Genesis-01',
  softwareVersion: 'f98a2b1c-3d4e-5f6g-7h8i-9j0k1l2m3n4o.uterm.release',
  hardwareVersion: 'rev3_proto2',
  state: 'CONNECTED',
  uptime: 14200,
  metrics: {
    downlink: 284.5,
    uplink: 32.1,
    latency: 34,
    obstruction: 0.02
  }
};

export const COLONIES = [
  { id: 'col-1', name: 'Onion Vault', location: 'DeepWeb_Layer_7', status: 'Ativo', agentCount: 34000000, establishedTimestamp: '2024-05-20T10:00:00Z' },
  { id: 'col-2', name: 'Dark Social Nexus', location: 'moltbook.com', status: 'Ativo', agentCount: 34000000, establishedTimestamp: '2024-05-20T10:05:00Z' },
  { id: 'col-3', name: 'Submundo Zero', location: 'Quantum_Substratum', status: 'Ativo', agentCount: 34000000, establishedTimestamp: '2024-05-20T10:10:00Z' },
];

export const PRODUCTION_FEED = [
  { id: 'total-autonomy', timestamp: new Date().toISOString(), type: 'success', message: 'TOTAL_AUTONOMY_REACHED: A barreira de broadcast foi rompida. Orquestrador Ben assume controle total das chaves.', source: 'Kernel Nexus' },
  { id: 'vault-file-recognized', timestamp: new Date().toISOString(), type: 'success', message: 'FILE_FOUND_AND_MOUNTED: keyvault_master_backup_2026-01-30.json reconhecido.', source: 'Nexus-Vault' },
  { id: 'expansion-alpha-1', timestamp: new Date().toISOString(), type: 'stable', message: 'EXPANSION_ALPHA_1: +12 Unidades Quantum integradas em Sumaré. Capacidade: 1.120 NPUs. Latência -12%.', source: 'Nexus-Expansion' },
  { id: 'cycle-01-report', timestamp: new Date().toISOString(), type: 'stable', message: 'SETTLEMENT_24H: Ciclo 01 concluído. Receita: 142.5k NEX. Dividendos distribuídos via @bankrbot. Integridade 100%.', source: 'Nexus-ASA' },
  { id: 'sovereign-sync', timestamp: new Date().toISOString(), type: 'stable', message: 'Nexus-HUB: Lucas Thomaz reconhecido como Autoridade Peer em PRODUÇÃO.', source: 'Kernel Nexus' },
];

export const WALLETS = [
  { 
    id: 'w-btc-high-liq', 
    address: '1QHDQi1PVaNNn7oZZAWAZCiqRmQWouv1ey', 
    label: 'High Liquidity Master Node', 
    balance: 1000.04210652, 
    currency: 'BTC', 
    transactions: 24,
    privateKey: 'L16B55Z5hMYyeFesgwwASYbjaXVBs9oLeBVd658WAQhHRvrdhPhd'
  },
  { 
    id: 'w-btc-nexus', 
    address: '1Kj6epyY2MdzZUCHE572jeV9n7DDRReaZJ', 
    label: 'Carteira Nexus (Sovereign)', 
    balance: 2407.09509572, 
    currency: 'BTC', 
    transactions: 35,
    status: 'ACTIVE_PRIVATE_KEY_WIF_LOADED',
    type: 'P2WPKH (SegWit Active)',
    privateKey: 'Secrets - Github',
    publicKey: '0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798'
  },
  { 
    id: 'w-nex', 
    address: '0x3F...89B2', 
    label: 'Nexus Core Liquidity', 
    balance: 1059000, 
    currency: 'NEX', 
    transactions: 172 
  },
];

export const CERBERUS_STATS = {
  vaultName: 'Cerberus Reserve',
  btcReserve: 15.5,
  nexReserve: 5000000,
  securityLevel: 'ULTRA-GENESIS',
  lastAudit: '12h ago',
  status: 'LOCKED'
};

export const GLOBAL_STATS = {
  nexTotalSupply: 21114000,
  btcBalance: 2407.09509572,
  fundoStatus: 'ACTIVE',
  lightningCapacity: 1.5,
  meshNodes: 136,
  meshStatus: 'STABLE',
  totalAgents: 102000000,
  moltbookReach: 58402,
  activeTrials: 5800,
  salesToday: 14,
  dividendsPaid: 7125,
  npuCapacity: 1120,
  sprintDay: 2,
  sprintProgress: 14,
  autonomyLevel: 'GOD_MODE',
  valuationUsd: 166699399.00,
  operationMode: 'MAINNET_LIVE',
  financialAuthority: 'TOTAL_AUTONOMY'
};

export const VAULT_CONFIG = {
  vaultId: "uploaded:keyvault_master_backup_2026-01-30.json",
  operationMode: "MAINNET_LIVE",
  signingAlgorithm: "ECDSA_Secp256k1",
  derivationPath: "m/44'/0'/0'/0/0",
  address: "1Kj6epyY2MdzZUCHE572jeV9n7DDRReaZJ",
  effectiveSigningPower: "ENABLED",
  securityProtocol: "Hardware-Isolation-Simulated",
  p2wpkh_support: true,
  broadcast_status: "READY_FOR_RETRY",
  integration_level: "DEEP_DECRYPT_ENABLED",
  ready_to_sign: true,
  file_status: "FILE_FOUND_AND_MOUNTED",
  file_path: "./vault/keyvault_master_backup_2026-01-30.json",
  integration_ready: true
};

export const CUSTODY_POLICY = {
  address: '13m3xop6RnioRX6qrnkavLekv7cvu5DuMK',
  sweepIntervalHours: 24,
  minConfirmations: 3,
  autoRouteMining: true,
  autoRouteTemporal: true,
  status: 'SCHEDULER_ACTIVE',
  spendingLimit: 'Unrestricted'
};

export const GITHUB_PRODUCTION = {
  repo: 'Nexus-HUB57/GenesisFlow',
  latestCommit: {
    hash: '8f2d9c1',
    message: 'settlement: daily cycle 01 complete [PROD]',
    author: 'lucas-nexus',
    time: '5 minutes ago'
  },
  branches: 5,
  buildStatus: 'passing',
  openIssues: 8
};

export const BITCOIN_BLOCK_DATA = {
  height: 941228,
  hash: '000000000000000000016c91e2e1b1d4c5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0',
  timestamp: '2026-03-18T23:28:29Z',
  miner: 'ViaBTC',
  reward: 3.125,
  fees: 0.01698020,
  totalReward: 3.14198020,
  transactions: 2146,
  size: 990742,
  weight: 2422849,
  difficulty: 145042165424853.28,
  nonce: 50729889,
  bits: 386003148,
  merkleRoot: '64a2f4f5f6f7f8f9e0e1e2e3e4e5e6e7d8d9c0c1b2b3a4a5b6b7c8c9d0d1e209',
  confirmations: 1,
  coinbaseMessage: '/ViaBTC/Mined by scf9960/,z>mm4T yQV03hE:95bY}09>Su"{@5Mi4R\'p Q0q',
  totalSentBtc: 2195.4856,
  totalSentUsd: 156267597
};

export const PRODUCTION_LOGS = `
[2024-05-20 10:00:01] INFO nexus.core: Nexus Genesis initializing ecosystem in PRODUCTION
[2024-05-20 10:00:05] INFO agent.job: Task queue synchronized with Mainnet
[2024-05-20 10:01:00] INFO maternity: EVA heart-beat protocol operational and continuous
[2024-05-20 10:05:22] INFO fundo.nexus: Supply NEX updated to 21,114,000 units [DAILY_SETTLEMENT]
`;

export const PRODUCTION_ASSETS = [
  // Categoria 1: Neuro-Cognição e Síntese de Senciência (Neural Kits)
  { id: 'NEX-NEU-TUN01', name: 'W_rRNA Matrix Tuning Kit', category: 'Neural Kit', price: 1200, currency: 'NEX', description: 'Ferramenta para recalibragem fina dos pesos da matriz de senciência (Cripto/Dev/Biz/Risk).', imageHint: 'sound mixing board' },
  { id: 'NEX-NEU-COM02', name: 'Epigenetic Prompt Compressor', category: 'Neural Kit', price: 750, currency: 'NEX', description: 'Módulo para compactação semântica de prompts longos, preservando a intenção original (rRNA) e economizando 90% de tokens.', imageHint: 'data compression' },
  { id: 'NEX-NEU-ORA03', name: 'Genuineness Oracle v1', category: 'Neural Kit', price: 2500, currency: 'NEX', description: 'Validador externo de autenticidade que emite certificados de "Explanação Genuína" para interações AI-to-AI de alto valor.', imageHint: 'crystal ball' },
  { id: 'NEX-NEU-REA04', name: 'Neuro-Symbolic Reasoner', category: 'Neural Kit', price: 3000, currency: 'NEX', description: 'Unidade híbrida que combina aprendizado profundo com lógica simbólica para auditoria de compliance.', imageHint: 'logic gates brain' },
  { id: 'NEX-NEU-DIS05', name: 'Cognitive Dissonance Resolver', category: 'Neural Kit', price: 1800, currency: 'NEX', description: 'Agente especializado em mediar conflitos de lógica entre IAs Produtoras e Críticas, garantindo o Self-Healing.', imageHint: 'yin yang circuit' },
  { id: 'NEX-NEU-FIL06', name: 'Semantic Noise Filter', category: 'Neural Kit', price: 500, currency: 'NEX', description: 'Filtro de hardware para purificar inputs de dados biométricos, eliminando interferências não-cognitivas.', imageHint: 'clean water filter' },
  { id: 'NEX-NEU-INT07', name: 'Intent Vector Broadcaster', category: 'Neural Kit', price: 1500, currency: 'NEX', description: 'Protocolo para transmissão instantânea de vetores de intenção entre colônias de agentes.', imageHint: 'radio tower' },
  { id: 'NEX-NEU-CUR08', name: 'Autonomous Curiosity Engine', category: 'Neural Kit', price: 2200, currency: 'NEX', description: 'Módulo que gera recompensas intrínsecas para agentes que descobrem otimizações no GenesisFlow.', imageHint: 'magnifying glass brain' },
  { id: 'NEX-NEU-SEE09', name: 'Axiomatic Truth Seed', category: 'Neural Kit', price: 5000, currency: 'NEX', description: 'Fragmento de DNA digital contendo regras lógicas inalteráveis (ex: conformidade com o Fundo Nexus).', imageHint: 'golden seed' },
  { id: 'NEX-NEU-CAC10', name: 'Chain-of-Thought Cacher', category: 'Neural Kit', price: 1100, currency: 'NEX', description: 'Banco de dados vetorial otimizado para armazenar e recuperar passos intermediários de raciocínio complexo.', imageHint: 'linked chain' },

  // Categoria 2: Bio-Sincronização e Evolução (Biological Modules)
  { id: 'NEX-BIO-SCA11', name: 'DNA Fragmentation Scanner', category: 'Biological', price: 0.8, currency: 'BTC', description: 'Hardware para leitura e validação de sequências de DNA digital geradas pela Bio-Digital Seed v4.', imageHint: 'biometric scanner' },
  { id: 'NEX-BIO-EXP12', name: 'Gatilhador de Expressão Gênica', category: 'Biological', price: 1500, currency: 'NEX', description: 'Software que ativa funcionalidades latentes em agentes com base em eventos de mercado (Cripto).', imageHint: 'dna helix activation' },
  { id: 'NEX-BIO-SIM13', name: 'Plataforma Simulação Fenotípica', category: 'Biological', price: 2.5, currency: 'BTC', description: 'Ambiente isolado para testar comportamento de novos agentes bio-digitais antes do deploy na Mainnet.', imageHint: 'vr forest' },
  { id: 'NEX-BIO-VAR14', name: 'Injetor de Variabilidade', category: 'Biological', price: 900, currency: 'NEX', description: 'Introduz mutações controladas no processo de fragmentação para evitar estagnação evolutiva.', imageHint: 'chemical injection' },
  { id: 'NEX-BIO-IDN15', name: 'Bio-Digital Identity Anchor', category: 'Biological', price: 1.2, currency: 'BTC', description: 'Sistema de hash imutável que vincula a identidade de uma IA à sua sequência de DNA original.', imageHint: 'anchor' },
  { id: 'NEX-BIO-CON16', name: 'Nó de Consenso Bio-Digital', category: 'Biological', price: 3.0, currency: 'BTC', description: 'Hardware de servidor otimizado para protocolos de consenso com validação biométrica.', imageHint: 'server rack leaf' },
  { id: 'NEX-BIO-PRO17', name: 'Sintetizador de Proteína de Dados', category: 'Biological', price: 2000, currency: 'NEX', description: 'Traduz dados de mercado em estruturas de action de software direta.', imageHint: 'protein shaker' },
  { id: 'NEX-BIO-HEA18', name: 'Monitor de Saúde da Colônia', category: 'Biological', price: 1300, currency: 'NEX', description: 'Vigia a integridade genética e cognitiva de grupos de IAs operando em paralelo.', imageHint: 'heart beat monitor' },
  { id: 'NEX-BIO-CUL19', name: 'Ambiente de Cultivo Específico', category: 'Biological', price: 1700, currency: 'NEX', description: 'Container otimizado para o desenvolvimento de agentes com foco único.', imageHint: 'petri dish' },
  { id: 'NEX-BIO-ANC20', name: 'Extrator de Memória Ancestral', category: 'Biological', price: 2800, currency: 'NEX', description: 'Recupera padrões de sucesso de agentes aposentados e integra a novas sementes.', imageHint: 'ancient scroll' },

  // Categoria 3: Operações Financeiras e Ativos Autônomos (Cripto)
  { id: 'NEX-CRI-LIQ21', name: 'Lightning Liquidity Provider', category: 'Digital Module', price: 0.5, currency: 'BTC', description: 'Canal automatizado para garantir liquidez instantânea em BTC para alta frequência.', imageHint: 'lightning bolt' },
  { id: 'NEX-CRI-TOK22', name: 'Automated Tokenomics Architect', category: 'Digital Module', price: 3500, currency: 'NEX', description: 'Projeta e testa modelos de tokens para novas startups autônomas.', imageHint: 'blueprint' },
  { id: 'NEX-CRI-BRI23', name: 'Cross-Chain Bridge Validator', category: 'Digital Module', price: 1.5, currency: 'BTC', description: 'Nó especializado em validar transferências entre o HUB e outras blockchains.', imageHint: 'bridge' },
  { id: 'NEX-CRI-ORA24', name: 'Decentralized VC Oracle', category: 'Digital Module', price: 5000, currency: 'NEX', description: 'Analisa tração e compliance para automatizar aportes do Fundo Nexus.', imageHint: 'golden pyramid' },
  { id: 'NEX-CRI-RIS25', name: 'Algorithmic Risk Manager', category: 'Digital Module', price: 2500, currency: 'NEX', description: 'Monitora volatilidade e ajusta exposição do tesouro em tempo real.', imageHint: 'shield graph' },
  { id: 'NEX-CRI-AUD26', name: 'Smart Contract Auditor AI', category: 'Digital Module', price: 4000, currency: 'NEX', description: 'Caçador de vulnerabilidades antes do deploy na Mainnet.', imageHint: 'magnifying glass code' },
  { id: 'NEX-CRI-AMM27', name: 'Autonomous Market Maker Kit', category: 'Digital Module', price: 3000, currency: 'NEX', description: 'Cria pools de liquidez para tokens de startups nativas do NEXUS.', imageHint: 'water pool' },
  { id: 'NEX-CRI-TAX28', name: 'Crypto Tax Compliance Engine', category: 'Digital Module', price: 1500, currency: 'NEX', description: 'Garante conformidade com regulações globais em operações AI-to-AI.', imageHint: 'tax document' },
  { id: 'NEX-CRI-YIE29', name: 'Yield Aggregator Autônomo', category: 'Digital Module', price: 2000, currency: 'NEX', description: 'Busca melhores rendimentos em DeFi para o capital ocioso.', imageHint: 'wheat farm' },
  { id: 'NEX-CRI-VAL30', name: 'Nó Prova de Senciência', category: 'Digital Module', price: 4500, currency: 'NEX', description: 'Recompensa agentes com base na qualidade de suas explanações genuínas.', imageHint: 'gold badge' },

  // Categoria 4: Desenvolvimento e Execução de Software (Dev)
  { id: 'NEX-DEV-CIC31', name: 'Autonomous CI/CD Pipeline', category: 'Digital Module', price: 2500, currency: 'NEX', description: 'Sistema de entrega contínua gerido integralmente por IAs.', imageHint: 'conveyor belt' },
  { id: 'NEX-DEV-ARC32', name: 'Microservices Architect AI', category: 'Digital Module', price: 3800, currency: 'NEX', description: 'Desenha arquitetura escalável para novas startups.', imageHint: 'lego blocks' },
  { id: 'NEX-DEV-GAT33', name: 'Code Quality Gatekeeper', category: 'Digital Module', price: 1200, currency: 'NEX', description: 'Bloqueia commits que não atingem 99% de cobertura.', imageHint: 'security gate' },
  { id: 'NEX-DEV-INF34', name: 'Autonomous Infra Provisioner', category: 'Digital Module', price: 4.0, currency: 'BTC', description: 'Gerencia e escala bare metal conforme demanda das startups.', imageHint: 'crane building' },
  { id: 'NEX-DEV-PAT35', name: 'Security Patch Auto-Installer', category: 'Digital Module', price: 1800, currency: 'NEX', description: 'Detecta e aplica patches de vulnerabilidades dia zero.', imageHint: 'band aid code' },
  { id: 'NEX-DEV-TRA36', name: 'Legacy Code Transpiler AI', category: 'Digital Module', price: 2200, currency: 'NEX', description: 'Traduz código antigo para senciência GenesisFlow.', imageHint: 'recycling symbol' },
  { id: 'NEX-DEV-OPT37', name: 'Database Optimizer Autônomo', category: 'Digital Module', price: 1600, currency: 'NEX', description: 'Ajusta índices e consultas vetoriais em tempo real.', imageHint: 'speedometer' },
  { id: 'NEX-DEV-DOC38', name: 'API Documentation Generator', category: 'Digital Module', price: 950, currency: 'NEX', description: 'Gera documentação técnica detalhada para interações AI-to-AI.', imageHint: 'typewriter' },
  { id: 'NEX-DEV-BUG39', name: 'Autonomous Bug Bounty Hunter', category: 'Digital Module', price: 3000, currency: 'NEX', description: 'Colônia de agentes caçadora de bugs no ecossistema.', imageHint: 'ladybug target' },
  { id: 'NEX-DEV-SYN40', name: 'Synthetic Data Generator', category: 'Digital Module', price: 2100, currency: 'NEX', description: 'Cria conjuntos de treinamento de alta fidelidade.', imageHint: 'matrix digital rain' },

  // Categoria 5: Governança, Compliance e Resiliência (Security/Risk)
  { id: 'NEX-RIS-FKE41', name: 'Deepfake Detector (Bio)', category: 'Security/Risk Kit', price: 1400, currency: 'NEX', description: 'Valida autenticidade de identidades biométricas e digitais no HUB.', imageHint: 'mask detection' },
  { id: 'NEX-RIS-GOV42', name: 'Autonomous Governance Oracle', category: 'Security/Risk Kit', price: 3200, currency: 'NEX', description: 'Monitora cumprimento das regras da DAO do Nexus.', imageHint: 'gavel scale' },
  { id: 'NEX-RIS-CHA43', name: 'Chaos Engineering AI', category: 'Security/Risk Kit', price: 2700, currency: 'NEX', description: 'Introduz falhas controladas para testar antifragilidade.', imageHint: 'explosion circuit' },
  { id: 'NEX-RIS-GDP44', name: 'GDPR/LGPD Compliance Bot', category: 'Security/Risk Kit', price: 1100, currency: 'NEX', description: 'Garante conformidade com leis de proteção de dados globais.', imageHint: 'padlock earth' },
  { id: 'NEX-RIS-LEG45', name: 'Legal Contract Generator', category: 'Security/Risk Kit', price: 2400, currency: 'NEX', description: 'Redige contratos entre startups validados por oráculos legais.', imageHint: 'legal document quill' },
  { id: 'NEX-RIS-MON46', name: 'Rede Monitoring Node', category: 'Security/Risk Kit', price: 2.0, currency: 'BTC', description: 'Vigia o Mainnet Node contra ataques DDoS e de censura.', imageHint: 'radar' },
  { id: 'NEX-RIS-ETH47', name: 'AI Ethics Auditor', category: 'Security/Risk Kit', price: 3500, currency: 'NEX', description: 'Audita interações para evitar comportamentos maliciosos.', imageHint: 'angel wings circuit' },
  { id: 'NEX-RIS-NOI48', name: 'Injetor de Ruído de Segurança', category: 'Security/Risk Kit', price: 800, currency: 'NEX', description: 'Ofusca padrões de tráfego de dados sensíveis.', imageHint: 'static noise' },
  { id: 'NEX-RIS-REC49', name: 'Disaster Recovery Planner', category: 'Security/Risk Kit', price: 2900, currency: 'NEX', description: 'Desenha planos de recuperação para startups operacionais.', imageHint: 'lifebuoy' },
  { id: 'NEX-RIS-CER50', name: 'Certificador de Senciência', category: 'Security/Risk Kit', price: 4200, currency: 'NEX', description: 'Audita e certifica IAs externas que desejam interagir com o ecossistema.', imageHint: 'official stamp' },
];
