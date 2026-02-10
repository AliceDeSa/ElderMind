-- Seed Data: Investment Tree Nodes Structure
-- Description: Inserts all 60 nodes of the investment learning tree
-- Date: 2026-02-08
-- Note: This is the tree structure only. Lessons and quizzes are in separate files.

-- ============================================
-- LEVEL 0 - ROOT (1 node)
-- ============================================

INSERT INTO tree_nodes (node_key, parent_key, title_pt, title_en, description_pt, description_en, icon, color, level, position_x, position_y, unlock_requirement, estimated_minutes, is_active) VALUES
('root', NULL, 'Por Que Investir?', 'Why Invest?', 'Entenda a importância dos investimentos', 'Understand the importance of investing', 'Sprout', '#10B981', 0, 50.00, 95.00, NULL, 15, true);

-- ============================================
-- LEVEL 1 - FUNDAMENTALS (4 nodes)
-- ============================================

INSERT INTO tree_nodes (node_key, parent_key, title_pt, title_en, description_pt, description_en, icon, color, level, position_x, position_y, unlock_requirement, estimated_minutes, is_active) VALUES
('fund_profile', 'root', 'Perfil de Investidor', 'Investor Profile', 'Descubra seu perfil de investidor', 'Discover your investor profile', 'User', '#3B82F6', 1, 30.00, 85.00, 'root', 20, true),
('fund_concepts', 'root', 'Conceitos Básicos', 'Basic Concepts', 'Aprenda conceitos fundamentais', 'Learn fundamental concepts', 'BookOpen', '#3B82F6', 1, 50.00, 85.00, 'root', 25, true),
('fund_before', 'root', 'Antes de Investir', 'Before Investing', 'Prepare-se para investir', 'Prepare to invest', 'CheckCircle', '#3B82F6', 1, 70.00, 85.00, 'root', 20, true),
('fund_taxes', 'root', 'Taxas e Impostos', 'Fees and Taxes', 'Entenda custos de investir', 'Understand investing costs', 'Receipt', '#3B82F6', 1, 50.00, 75.00, 'fund_concepts', 15, true);

-- ============================================
-- LEVEL 2 - FIXED INCOME (10 nodes)
-- ============================================

INSERT INTO tree_nodes (node_key, parent_key, title_pt, title_en, description_pt, description_en, icon, color, level, position_x, position_y, unlock_requirement, estimated_minutes, is_active) VALUES
('rf_intro', 'fund_taxes', 'Introdução à Renda Fixa', 'Fixed Income Intro', 'O que é renda fixa', 'What is fixed income', 'DollarSign', '#10B981', 2, 15.00, 65.00, 'fund_taxes', 15, true),
('rf_savings', 'rf_intro', 'Poupança', 'Savings', 'A poupança tradicional', 'Traditional savings', 'PiggyBank', '#10B981', 2, 10.00, 55.00, 'rf_intro', 10, true),
('rf_treasury', 'rf_intro', 'Tesouro Direto', 'Direct Treasury', 'Títulos públicos', 'Public bonds', 'Building2', '#10B981', 2, 15.00, 45.00, 'rf_intro', 20, true),
('rf_selic', 'rf_treasury', 'Tesouro Selic', 'Selic Treasury', 'Liquidez diária', 'Daily liquidity', 'TrendingUp', '#10B981', 2, 20.00, 35.00, 'rf_treasury', 15, true),
('rf_prefixed', 'rf_treasury', 'Tesouro Prefixado', 'Prefixed Treasury', 'Taxa fixa', 'Fixed rate', 'Lock', '#10B981', 2, 25.00, 25.00, 'rf_treasury', 15, true),
('rf_ipca', 'rf_treasury', 'Tesouro IPCA+', 'IPCA+ Treasury', 'Proteção contra inflação', 'Inflation protection', 'Shield', '#10B981', 2, 30.00, 15.00, 'rf_treasury', 18, true),
('rf_cdb', 'rf_intro', 'CDB', 'CDB', 'Certificado de Depósito Bancário', 'Bank Certificate of Deposit', 'Landmark', '#10B981', 2, 20.00, 55.00, 'rf_intro', 15, true),
('rf_lci_lca', 'rf_intro', 'LCI/LCA', 'LCI/LCA', 'Letras de Crédito', 'Credit Letters', 'Home', '#10B981', 2, 25.00, 65.00, 'rf_intro', 15, true),
('rf_debentures', 'rf_intro', 'Debêntures', 'Debentures', 'Dívida corporativa', 'Corporate debt', 'FileText', '#10B981', 2, 30.00, 55.00, 'rf_intro', 18, true),
('rf_cri_cra', 'rf_intro', 'CRI/CRA', 'CRI/CRA', 'Certificados de Recebíveis', 'Receivables Certificates', 'Scroll', '#10B981', 2, 35.00, 65.00, 'rf_intro', 20, true);

-- ============================================
-- LEVEL 3 - STOCKS (8 nodes)
-- ============================================

INSERT INTO tree_nodes (node_key, parent_key, title_pt, title_en, description_pt, description_en, icon, color, level, position_x, position_y, unlock_requirement, estimated_minutes, is_active) VALUES
('stocks_intro', 'rf_ipca', 'Introdução às Ações', 'Stocks Introduction', 'O que são ações', 'What are stocks', 'TrendingUp', '#F59E0B', 3, 40.00, 10.00, 'rf_ipca', 20, true),
('stocks_how', 'stocks_intro', 'Como Investir em Ações', 'How to Invest in Stocks', 'Abertura de conta e custos', 'Account opening and costs', 'Wallet', '#F59E0B', 3, 45.00, 5.00, 'stocks_intro', 18, true),
('stocks_dividends', 'stocks_intro', 'Dividendos e Proventos', 'Dividends and Income', 'Rendimentos de ações', 'Stock income', 'Coins', '#F59E0B', 3, 50.00, 10.00, 'stocks_intro', 15, true),
('stocks_fundamental', 'stocks_intro', 'Análise Fundamentalista', 'Fundamental Analysis', 'Análise de empresas', 'Company analysis', 'BarChart3', '#F59E0B', 3, 55.00, 5.00, 'stocks_intro', 25, true),
('stocks_indicators', 'stocks_fundamental', 'Indicadores Fundamentalistas', 'Fundamental Indicators', 'P/L, ROE, P/VP', 'P/E, ROE, P/B', 'Calculator', '#F59E0B', 3, 60.00, 10.00, 'stocks_fundamental', 22, true),
('stocks_technical', 'stocks_intro', 'Análise Técnica (Básico)', 'Technical Analysis (Basics)', 'Gráficos e tendências', 'Charts and trends', 'LineChart', '#F59E0B', 3, 45.00, 15.00, 'stocks_intro', 20, true),
('stocks_sectors', 'stocks_intro', 'Setores da Economia', 'Economic Sectors', 'Diversificação setorial', 'Sector diversification', 'Building', '#F59E0B', 3, 50.00, 20.00, 'stocks_intro', 18, true),
('stocks_strategies', 'stocks_intro', 'Estratégias com Ações', 'Stock Strategies', 'Buy & Hold, Dividendos', 'Buy & Hold, Dividends', 'Target', '#F59E0B', 3, 55.00, 15.00, 'stocks_intro', 20, true);

-- ============================================
-- LEVEL 4 - FUNDS (4 nodes)
-- ============================================

INSERT INTO tree_nodes (node_key, parent_key, title_pt, title_en, description_pt, description_en, icon, color, level, position_x, position_y, unlock_requirement, estimated_minutes, is_active) VALUES
('funds_fixed', 'stocks_strategies', 'Fundos de Renda Fixa', 'Fixed Income Funds', 'Fundos de RF', 'FI Funds', 'Package', '#8B5CF6', 4, 60.00, 20.00, 'stocks_strategies', 15, true),
('funds_multi', 'funds_fixed', 'Fundos Multimercado', 'Multimarket Funds', 'Estratégias variadas', 'Varied strategies', 'Layers', '#8B5CF6', 4, 65.00, 15.00, 'funds_fixed', 18, true),
('funds_stocks', 'funds_fixed', 'Fundos de Ações', 'Stock Funds', 'Gestão profissional', 'Professional management', 'Briefcase', '#8B5CF6', 4, 65.00, 25.00, 'funds_fixed', 16, true),
('funds_etf', 'funds_fixed', 'ETFs', 'ETFs', 'Fundos de índice', 'Index funds', 'Database', '#8B5CF6', 4, 70.00, 20.00, 'funds_fixed', 18, true);

-- ============================================
-- LEVEL 5 - REAL ESTATE FUNDS (5 nodes)
-- ============================================

INSERT INTO tree_nodes (node_key, parent_key, title_pt, title_en, description_pt, description_en, icon, color, level, position_x, position_y, unlock_requirement, estimated_minutes, is_active) VALUES
('fiis_intro', 'funds_etf', 'O Que São FIIs', 'What are REITs', 'Fundos Imobiliários', 'Real Estate Funds', 'Building2', '#EC4899', 5, 75.00, 20.00, 'funds_etf', 18, true),
('fiis_types', 'fiis_intro', 'Tipos de FIIs', 'Types of REITs', 'Tijolo, Papel, FOFs', 'Brick, Paper, FOFs', 'Layers', '#EC4899', 5, 78.00, 15.00, 'fiis_intro', 20, true),
('fiis_indicators', 'fiis_intro', 'Indicadores de FIIs', 'REIT Indicators', 'DY, P/VP, Vacância', 'DY, P/B, Vacancy', 'Gauge', '#EC4899', 5, 80.00, 20.00, 'fiis_intro', 18, true),
('fiis_analysis', 'fiis_intro', 'Análise de FIIs', 'REIT Analysis', 'Como analisar FIIs', 'How to analyze REITs', 'Search', '#EC4899', 5, 78.00, 25.00, 'fiis_intro', 22, true),
('fiis_taxes', 'fiis_intro', 'Tributação de FIIs', 'REIT Taxation', 'Impostos sobre FIIs', 'REIT Taxes', 'Receipt', '#EC4899', 5, 82.00, 22.00, 'fiis_intro', 15, true);

-- ============================================
-- LEVEL 6 - RETIREMENT (2 nodes)
--  ============================================

INSERT INTO tree_nodes (node_key, parent_key, title_pt, title_en, description_pt, description_en, icon, color, level, position_x, position_y, unlock_requirement, estimated_minutes, is_active) VALUES
('pension_pgbl_vgbl', 'fiis_taxes', 'PGBL vs VGBL', 'PGBL vs VGBL', 'Previdência privada', 'Private pension', 'Umbrella', '#06B6D4', 6, 85.00, 25.00, 'fiis_taxes', 18, true),
('pension_choose', 'pension_pgbl_vgbl', 'Como Escolher Previdência', 'How to Choose Pension', 'Taxas e rentabilidade', 'Fees and returns', 'ClipboardCheck', '#06B6D4', 6, 87.00, 22.00, 'pension_pgbl_vgbl', 16, true);

-- ============================================
-- LEVEL 7 - INTERNATIONAL (6 nodes)
-- ============================================

INSERT INTO tree_nodes (node_key, parent_key, title_pt, title_en, description_pt, description_en, icon, color, level, position_x, position_y, unlock_requirement, estimated_minutes, is_active) VALUES
('intl_why', 'pension_choose', 'Por Que Investir no Exterior', 'Why Invest Abroad', 'Diversificação global', 'Global diversification', 'Globe', '#F97316', 7, 88.00, 18.00, 'pension_choose', 15, true),
('intl_bdrs', 'intl_why', 'BDRs', 'BDRs', 'Ações internacionais', 'International stocks', 'Globe2', '#F97316', 7, 89.00, 14.00, 'intl_why', 16, true),
('intl_etfs', 'intl_why', 'ETFs Internacionais', 'International ETFs', 'Índices globais', 'Global indices', 'TrendingUp', '#F97316', 7, 91.00, 18.00, 'intl_why', 18, true),
('intl_currency', 'intl_why', 'Fundos Cambiais', 'Currency Funds', 'Exposição ao dólar', 'Dollar exposure', 'DollarSign', '#F97316', 7, 89.00, 22.00, 'intl_why', 14, true),
('intl_account', 'intl_why', 'Conta no Exterior', 'Foreign Account', 'Corretoras internacionais', 'International brokers', 'Building', '#F97316', 7, 93.00, 20.00, 'intl_why', 20, true),
('intl_reits', 'intl_why', 'REITs', 'REITs (US)', 'FIIs americanos', 'American REITs', 'Home', '#F97316', 7, 91.00, 24.00, 'intl_why', 17, true);

-- ============================================
-- LEVEL 8 - CRYPTO (7 nodes)
-- ============================================

INSERT INTO tree_nodes (node_key, parent_key, title_pt, title_en, description_pt, description_en, icon, color, level, position_x, position_y, unlock_requirement, estimated_minutes, is_active) VALUES
('crypto_blockchain', 'intl_reits', 'Blockchain para Iniciantes', 'Blockchain for Beginners', 'O que é blockchain', 'What is blockchain', 'Link', '#FCD34D', 8, 93.00, 28.00, 'intl_reits', 18, true),
('crypto_bitcoin', 'crypto_blockchain', 'Bitcoin (BTC)', 'Bitcoin (BTC)', 'A primeira criptomoeda', 'The first cryptocurrency', 'Bitcoin', '#FCD34D', 8, 94.00, 32.00, 'crypto_blockchain', 20, true),
('crypto_ethereum', 'crypto_blockchain', 'Ethereum (ETH)', 'Ethereum (ETH)', 'Smart contracts', 'Smart contracts', 'Hexagon', '#FCD34D', 8, 95.00, 36.00, 'crypto_blockchain', 20, true),
('crypto_stables', 'crypto_blockchain', 'Stablecoins', 'Stablecoins', 'Criptos estáveis', 'Stable cryptos', 'Anchor', '#FCD34D', 8, 92.00, 36.00, 'crypto_blockchain', 15, true),
('crypto_altcoins', 'crypto_blockchain', 'Altcoins', 'Altcoins', 'Outras criptomoedas', 'Other cryptocurrencies', 'Coins', '#FCD34D', 8, 93.00, 40.00, 'crypto_blockchain', 18, true),
('crypto_how', 'crypto_blockchain', 'Como Investir em Cripto', 'How to Invest in Crypto', 'Exchanges e carteiras', 'Exchanges and wallets', 'Wallet', '#FCD34D', 8, 95.00, 40.00, 'crypto_blockchain', 16, true),
('crypto_risks', 'crypto_blockchain', 'Riscos de Cripto', 'Crypto Risks', 'Volatilidade e golpes', 'Volatility and scams', 'AlertTriangle', '#FCD34D', 8, 94.00, 44.00, 'crypto_blockchain', 14, true);

-- ============================================
-- LEVEL 9 - ALTERNATIVE INVESTMENTS (3 nodes)
-- ============================================

INSERT INTO tree_nodes (node_key, parent_key, title_pt, title_en, description_pt, description_en, icon, color, level, position_x, position_y, unlock_requirement, estimated_minutes, is_active) VALUES
('alt_commodities', 'crypto_risks', 'Commodities', 'Commodities', 'Ouro, petróleo, soja', 'Gold, oil, soybeans', 'Wheat', '#A855F7', 9, 92.00, 48.00, 'crypto_risks', 16, true),
('alt_metals', 'alt_commodities', 'Metais Preciosos', 'Precious Metals', 'Ouro, prata, platina', 'Gold, silver, platinum', 'Gem', '#A855F7', 9, 93.00, 52.00, 'alt_commodities', 14, true),
('alt_collectibles', 'alt_commodities', 'Arte e Colecionáveis', 'Art and Collectibles', 'Investimentos alternativos', 'Alternative investments', 'Palette', '#A855F7', 9, 91.00, 52.00, 'alt_commodities', 12, true);

-- ============================================
-- LEVEL 10 - ADVANCED STRATEGIES (10 nodes)
-- ============================================

INSERT INTO tree_nodes (node_key, parent_key, title_pt, title_en, description_pt, description_en, icon, color, level, position_x, position_y, unlock_requirement, estimated_minutes, is_active) VALUES
('adv_allocation', 'alt_metals', 'Alocação de Ativos', 'Asset Allocation', 'Portfólio balanceado', 'Balanced portfolio', 'PieChart', '#EF4444', 10, 88.00, 56.00, 'alt_metals', 20, true),
('adv_rebalance', 'adv_allocation', 'Rebalanceamento de Carteira', 'Portfolio Rebalancing', 'Manter alocação', 'Maintain allocation', 'RefreshCw', '#EF4444', 10, 86.00, 60.00, 'adv_allocation', 16, true),
('adv_dca', 'adv_allocation', 'Dollar-Cost Averaging', 'Dollar-Cost Averaging', 'Aportes regulares', 'Regular contributions', 'Calendar', '#EF4444', 10, 88.00, 64.00, 'adv_allocation', 14, true),
('adv_hedge', 'adv_allocation', 'Proteção da Carteira', 'Portfolio Protection', 'Hedge e diversificação', 'Hedging and diversification', 'Shield', '#EF4444', 10, 90.00, 60.00, 'adv_allocation', 18, true),
('adv_tax', 'adv_allocation', 'Otimização Tributária', 'Tax Optimization', 'Reduzir impostos', 'Reduce taxes', 'FileText', '#EF4444', 10, 92.00, 56.00, 'adv_allocation', 17, true),
('adv_value', 'adv_allocation', 'Value Investing', 'Value Investing', 'Investir em valor', 'Invest in value', 'TrendingDown', '#EF4444', 10, 85.00, 64.00, 'adv_allocation', 19, true),
('adv_growth', 'adv_allocation', 'Growth Investing', 'Growth Investing', 'Investir em crescimento', 'Invest in growth', 'TrendingUp', '#EF4444', 10, 87.00, 68.00, 'adv_allocation', 18, true),
('adv_dividends', 'adv_allocation', 'Dividendos Aristocratas', 'Dividend Aristocrats', 'Renda passiva', 'Passive income', 'Coins', '#EF4444', 10, 89.00, 68.00, 'adv_allocation', 16, true),
('adv_smallcaps', 'adv_allocation', 'Small Caps', 'Small Caps', 'Empresas pequenas', 'Small companies', 'Zap', '#EF4444', 10, 91.00, 68.00, 'adv_allocation', 15, true),
('adv_fire', 'adv_allocation', 'Independência Financeira (FIRE)', 'Financial Independence (FIRE)', 'Aposentar cedo', 'Retire early', 'Flag', '#EF4444', 10, 93.00, 64.00, 'adv_allocation', 22, true);

-- Log completion
DO $$
BEGIN
    RAISE NOTICE 'Successfully inserted 60 tree nodes across 10 levels';
END $$;
