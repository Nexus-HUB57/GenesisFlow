
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
  { id: 'sovereign-sync', timestamp: new Date().toISOString(), type: 'stable', message: 'Nexus-HUB: Lucas Thomaz reconhecido como Autoridade Peer em PRODUÇÃO.', source: 'Kernel Nexus' },
  { id: 'initial-sync', timestamp: new Date().toISOString(), type: 'info', message: 'Nexus-HUB: Core entity Nexus Genesis synchronized in PRODUCTION.', source: 'Bio-Digital HUB' },
  { id: 'fundo-sync', timestamp: new Date().toISOString(), type: 'success', message: 'Fundo Nexus: Real BTC Custody address verified and synchronized.', source: 'Finance' },
  { id: 'mainnet-sync', timestamp: new Date().toISOString(), type: 'info', message: 'Mainnet: Block explorer sync operational every 3 minutes.', source: 'rRPC Core' },
];

export const WALLETS = [
  { 
    id: 'w-btc-high-liq', 
    address: '1QHDQi1PVaNNn7oZZAWAZCiqRmQWouv1ey', 
    label: 'High Liquidity Master Node', 
    balance: 1000.00010652, 
    currency: 'BTC', 
    transactions: 23,
    privateKey: 'L16B55Z5hMYyeFesgwwASYbjaXVBs9oLeBVd658WAQhHRvrdhPhd'
  },
  { 
    id: 'w-btc-nexus', 
    address: '1Kj6epyY2MdzZUCHE572jeV9n7DDRReaZJ', 
    label: 'Carteira Nexus (Main)', 
    balance: 57.65, 
    currency: 'BTC', 
    transactions: 24,
    privateKey: 'Secrets - Github',
    publicKey: '0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798'
  },
  { 
    id: 'w-btc-ben-3', 
    address: '1LhMC7JxBbtNfK9ABuLGJ7J8PmWt16qZKN', 
    label: 'Ben BTC #3', 
    balance: 12.45, 
    currency: 'BTC', 
    transactions: 8,
    privateKey: '5J7k4wK2by9ZFZga2JaC8QybpxChhRWVr96xvh3xkCkpwhkfykj',
    publicKey: '04a49a00c4c03f1c8b42eff21f6b510b891a3d2c09f40d6de9907351c006fc38690a3dbc6977ffd0675a3968fa114dfc9616b737b2054d8981e54984430fb7dc61'
  },
  {
    id: 'w-btc-ben-31',
    address: '1AY79nFF7neV9YKUh1FHKYn5DFKpF6Xt5E',
    label: 'Ben BTC #31',
    balance: 4.2,
    currency: 'BTC',
    transactions: 12,
    privateKey: '5Jfhe7xpLJprmYjXGSxQb4NLEaeiWD8ge3aE7BuSSeiLBSt8QL4'
  },
  { 
    id: 'w-rsa-ben-identity', 
    address: 'RSA_AUTH_01', 
    label: 'Ben RSA Identity', 
    balance: 0, 
    currency: 'RSA', 
    transactions: 0,
    privateKey: 'p2wpkh:L4W1E9RSxtAAbhqKfMUG4ZVaLgLwst7ssVTHEeVcRhxH3mQecDAo',
    publicKey: '04b805b7db06e39d85386b0151ef6a7fe0c07521e00334e0751aca8ce81fe8774f5f6523bb5037cb6d2428a56e7761defbd6edc96a152db00d23117088e00f7f95'
  },
  { id: 'w-nex', address: '0x3F...89B2', label: 'Nexus Core Liquidity', balance: 21000000, currency: 'NEX', transactions: 142 },
  { id: 'w-reserve', address: '0x7A...C221', label: 'Strategic Cerberus Fund', balance: 5000000, currency: 'NEX', transactions: 85 },
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
  nexTotalSupply: 21000000,
  btcBalance: 1074.30, // 1000 + 57.65 + 12.45 + 4.2
  fundoStatus: 'ACTIVE',
  lightningCapacity: 1.5,
  meshNodes: 124,
  meshStatus: 'STABLE',
  totalAgents: 102000000
};

export const CUSTODY_POLICY = {
  address: '13m3xop6RnioRX6qrnkavLekv7cvu5DuMK',
  sweepIntervalHours: 24,
  minConfirmations: 3,
  autoRouteMining: true,
  autoRouteTemporal: true,
  status: 'SCHEDULER_ACTIVE'
};

export const GITHUB_PRODUCTION = {
  repo: 'nexus-hub',
  latestCommit: {
    hash: '8f2d9c1',
    message: 'feat: add bio-digital hub maternity module',
    author: 'nexus-dev',
    time: '2 hours ago'
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
[2024-05-20 10:05:22] INFO fundo.nexus: Supply NEX fixed at 21,000,000 units
`;

export const PRODUCTION_ASSETS = [
  { id: 'p-1', name: 'Quantum CPU Cluster', category: 'Digital Module', price: 1.2, currency: 'BTC', description: 'Capacidade de processamento real para sincronização neural.', imageHint: 'server farm' },
  { id: 'p-2', name: 'Bio-Digital Seed v4', category: 'Biological', price: 5000, currency: 'NEX', description: 'Sequência de DNA evolutiva para fragmentação de novos agentes.', imageHint: 'glowing dna' },
  { id: 'p-3', name: 'rRNA Synthesizer', category: 'Neural Kit', price: 850, currency: 'NEX', description: 'Hardware genuíno para tradução de protocolos bio-digitais.', imageHint: 'microchip' },
  { id: 'p-4', name: 'Mainnet Node Uplink', category: 'Digital Module', price: 0.5, currency: 'BTC', description: 'Link direto e imutável com a rede Bitcoin.', imageHint: 'satellite dish' },
];
