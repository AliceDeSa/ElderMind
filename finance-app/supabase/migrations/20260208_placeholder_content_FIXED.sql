-- Seed Data: Placeholder Content for Remaining Nodes
-- Description: Basic lessons (3) and quizzes (5) for all nodes without complete content
-- Date: 2026-02-08
-- Note: This provides a complete tree structure. Each node can be expanded with detailed content later.

-- ============================================
-- PLACEHOLDER TEMPLATE GENERATION
-- ============================================

-- For nodes: fund_profile (already done - skip quizzes)
INSERT INTO tree_quizzes (node_key, question_order, question_pt, question_en, options_pt, options_en, correct_index, explanation_pt, explanation_en) VALUES
('fund_profile', 1, 'Qual perfil prioriza segurança acima de tudo?', 'Which profile prioritizes safety above all?', '["Arrojado", "Conservador", "Moderado", "Todos"]'::jsonb, '["Aggressive", "Conservative", "Moderate", "All"]'::jsonb, 1, 'O perfil conservador prioriza a preservação do capital e segurança, aceitando menores retornos.', 'Conservative profile prioritizes capital preservation and safety, accepting lower returns.'),
('fund_profile', 2, 'Qual a alocação típica do perfil moderado?', 'What is the typical allocation for moderate profile?', '["100% RF", "60% RF + 40% RV", "20% RF + 80% RV", "100% RV"]'::jsonb, '["100% FI", "60% FI + 40% Stocks", "20% FI + 80% Stocks", "100% Stocks"]'::jsonb, 1, 'Perfil moderado geralmente tem 60% em renda fixa e 40% em renda variável, balanceando segurança e rentabilidade.', 'Moderate profile typically has 60% in fixed income and 40% in stocks, balancing safety and returns.'),
('fund_profile', 3, 'Perfil arrojado é indicado para quem?', 'Aggressive profile is recommended for whom?', '["Aposentados", "Curto prazo", "Jovens com horizonte de 10+ anos", "Todos"]'::jsonb, '["Retirees", "Short-term", "Young with 10+ year horizon", "Everyone"]'::jsonb, 2, 'Perfil arrojado é indicado para jovens com longo prazo (10+ anos) que podem tolerar alta volatilidade.', 'Aggressive profile is recommended for young investors with long-term (10+ years) who can tolerate high volatility.'),
('fund_profile', 4, 'Qual perfil tolera alta volatilidade?', 'Which profile tolerates high volatility?', '["Conservador", "Moderado", "Arrojado", "Nenhum"]'::jsonb, '["Conservative", "Moderate", "Aggressive", "None"]'::jsonb, 2, 'O perfil arrojado tolera alta volatilidade em busca de maiores retornos no longo prazo.', 'Aggressive profile tolerates high volatility seeking higher long-term returns.'),
('fund_profile', 5, 'É possível mudar de perfil?', 'Is it possible to change profile?', '["Não, é fixo", "Sim, conforme objetivos mudam", "Só uma vez na vida", "Apenas com autorização"]'::jsonb, '["No, it''s fixed", "Yes, as goals change", "Only once in life", "Only with authorization"]'::jsonb, 1, 'Sim! Seu perfil pode mudar com idade, objetivos, conhecimento e situação financeira.', 'Yes! Your profile can change with age, goals, knowledge, and financial situation.');

-- For rf_treasury (need quizzes)
INSERT INTO tree_quizzes (node_key, question_order, question_pt, question_en, options_pt, options_en, correct_index, explanation_pt, explanation_en) VALUES
('rf_treasury', 1, 'Qual a taxa de custódia B3 do Tesouro?', 'What is the B3 custody fee for Treasury?', '["0%", "0,20% ao ano", "0,50% ao ano", "1% ao ano"]'::jsonb, '["0%", "0.20% per year", "0.50% per year", "1% per year"]'::jsonb, 1, 'A taxa de custódia da B3 é de 0,20% ao ano sobre o valor dos títulos, cobrada semestralmente.', 'B3 custody fee is 0.20% per year on bond value, charged semi-annually.'),
('rf_treasury', 2, 'Qual o investimento mínimo no Tesouro?', 'What is the minimum investment in Treasury?', '["R$ 1", "R$ 30", "R$ 100", "R$ 1.000"]'::jsonb, '["$1", "$25", "$100", "$1,000"]'::jsonb, 1, 'O investimento mínimo é de R$ 30 (equivalente a 0,01 título), tornando o Tesouro acessível a todos.', 'Minimum investment is $25 (equivalent to 0.01 bond), making Treasury accessible to all.'),
('rf_treasury', 3, 'Quanto tempo para resgatar Tesouro?', 'How long to redeem Treasury?', '["Imediato", "D+1", "D+7", "Só no vencimento"]'::jsonb, '["Immediate", "T+1", "T+7", "Only at maturity"]'::jsonb, 1, 'O dinheiro da venda do Tesouro cai na conta em D+1 (1 dia útil após a venda).', 'Treasury sale proceeds are deposited in T+1 (1 business day after sale).'),
('rf_treasury', 4, 'Tesouro é mais seguro que CDB?', 'Is Treasury safer than bank CDs?', '["Não", "Igual", "Sim", "Depende do banco"]'::jsonb, '["No", "Same", "Yes", "Depends on bank"]'::jsonb, 2, 'Sim, Tesouro é garantido pelo Governo Federal, enquanto CDB depende do FGC (até R$ 250k).', 'Yes, Treasury is guaranteed by Federal Government, while CDs depend on FDIC (up to $250k).'),
('rf_treasury', 5, 'Quantos tipos principais de Tesouro existem?', 'How many main types of Treasury exist?', '["1", "2", "3", "5"]'::jsonb, '["1", "2", "3", "5"]'::jsonb, 2, 'Existem 3 tipos principais: Tesouro Selic, Tesouro Prefixado e Tesouro IPCA+.', 'There are 3 main types: Floating Rate, Fixed Rate, and Inflation-Protected bonds.');

-- ============================================
-- REMAINING NODES PLACEHOLDER CONTENT
-- ============================================

-- Generate placeholder content for ALL remaining 52 nodes
DO $$
DECLARE
    remaining_nodes TEXT[] := ARRAY[
        'rf_selic', 'rf_prefixed', 'rf_ipca', 'rf_cdb', 'rf_lci_lca', 'rf_debentures', 'rf_cri_cra',
        'stocks_intro', 'stocks_how', 'stocks_dividends', 'stocks_fundamental', 'stocks_indicators', 
        'stocks_technical', 'stocks_sectors', 'stocks_strategies',
        'funds_fixed', 'funds_multi', 'funds_stocks', 'funds_etf',
        'fiis_intro', 'fiis_types', 'fiis_indicators', 'fiis_analysis', 'fiis_taxes',
        'pension_pgbl_vgbl', 'pension_choose',
        'intl_why', 'intl_bdrs', 'intl_etfs', 'intl_currency', 'intl_account', 'intl_reits',
        'crypto_blockchain', 'crypto_bitcoin', 'crypto_ethereum', 'crypto_stables', 'crypto_altcoins', 'crypto_how', 'crypto_risks',
        'alt_commodities', 'alt_metals', 'alt_collectibles',
        'adv_allocation', 'adv_rebalance', 'adv_dca', 'adv_hedge', 'adv_tax', 
        'adv_value', 'adv_growth', 'adv_dividends', 'adv_smallcaps', 'adv_fire'
    ];
    node TEXT;
    node_title TEXT;
BEGIN
    FOREACH node IN ARRAY remaining_nodes LOOP
        -- Get node title from tree_nodes
        SELECT title_pt INTO node_title FROM tree_nodes WHERE node_key = node LIMIT 1;
        
        -- Insert 3 placeholder lessons
        FOR i IN 1..3 LOOP
            INSERT INTO tree_lessons (node_key, lesson_order, title_pt, title_en, content_pt, content_en)
            VALUES (
                node,
                i,
                'Lição ' || i || ': ' || node_title,
                'Lesson ' || i || ': ' || node_title,
                '## ' || node_title || E'\n\nConteúdo em desenvolvimento.\n\nEste node faz parte da árvore de investimentos e terá conteúdo detalhado em breve.\n\n### Tópicos Abordados\n- Conceitos fundamentais\n- Exemplos práticos\n- Estratégias recomendadas',
                '## ' || node_title || E'\n\nContent under development.\n\nThis node is part of the investment tree and will have detailed content soon.\n\n### Topics Covered\n- Fundamental concepts\n- Practical examples\n- Recommended strategies'
            );
        END LOOP;
        
        -- Insert 5 placeholder quizzes
        FOR i IN 1..5 LOOP
            INSERT INTO tree_quizzes (node_key, question_order, question_pt, question_en, options_pt, options_en, correct_index, explanation_pt, explanation_en)
            VALUES (
                node,
                i,
                'Questão ' || i || ' sobre ' || node_title,
                'Question ' || i || ' about ' || node_title,
                '["Opção A", "Opção B", "Opção C", "Opção D"]'::jsonb,
                '["Option A", "Option B", "Option C", "Option D"]'::jsonb,
                1,
                'Explicação da resposta correta. Conteúdo detalhado será adicionado em breve.',
                'Explanation of correct answer. Detailed content will be added soon.'
            );
        END LOOP;
        
        RAISE NOTICE 'Created placeholder content for node: %', node;
    END LOOP;
    
    RAISE NOTICE 'Successfully created placeholder content for all remaining nodes!';
    RAISE NOTICE 'Total: 52 nodes x (3 lessons + 5 quizzes) = 156 lessons + 260 quizzes';
END $$;
