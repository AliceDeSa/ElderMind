-- Seed Data: Sample Lessons and Quizzes
-- Description: Example lessons (3 per node) and quizzes (5 per node) for first nodes
-- Date: 2026-02-08
-- Note: This shows the pattern. Full 180 lessons + 300 quizzes will be generated progressively

-- ============================================
-- LESSONS FOR NODE: root (Por Que Investir?)
-- ============================================

INSERT INTO tree_lessons (node_key, lesson_order, title_pt, title_en, content_pt, content_en, media_type, media_url) VALUES
('root', 1, 'O Poder do Tempo', 'The Power of Time', 
'## O Tempo é seu Maior Aliado

Quanto mais cedo você começar a investir, mais tempo seu dinheiro terá para crescer. Este é o conceito de **juros compostos**.

### Exemplo Prático

Imagine duas pessoas:
- **Ana** começa a investir R$ 500/mês aos 25 anos
- **Bruno** começa a investir R$ 500/mês aos 35 anos

Aos 65 anos, com rentabilidade de 10% ao ano:
- Ana terá aproximadamente: **R$ 3.164.000**
- Bruno terá aproximadamente: **R$ 1.116.000**

Ana investiu apenas R$ 60.000 a mais que Bruno, mas terminou com R$ 2 milhões a mais!

**Conclusão:** O tempo transforma pequenos aportes em grandes fortunas.',

'## Time is Your Greatest Ally

The earlier you start investing, the more time your money has to grow. This is the concept of **compound interest**.

### Practical Example

Imagine two people:
- **Ana** starts investing $100/month at age 25
- **Bruno** starts investing $100/month at age 35

At age 65, with 10% annual return:
- Ana will have approximately: **$632,000**
- Bruno will have approximately: **$223,000**

Ana invested only $12,000 more than Bruno, but ended up with $409,000 more!

**Conclusion:** Time transforms small contributions into large fortunes.', 
NULL, NULL),

('root', 2, 'Inflação: O Ladrão Silencioso', 'Inflation: The Silent Thief',
'## Por Que a Poupança Não é Suficiente

A inflação corrói o poder de compra do seu dinheiro ao longo do tempo. Se seu dinheiro não está crescendo mais rápido que a inflação, você está **perdendo dinheiro**.

### Exemplo Real

- R$ 100 hoje = R$ 100 em poder de compra
- R$ 100 daqui a 10 anos (inflação de 4% ao ano) = apenas R$ 67,56 em poder de compra atual

Você ainda tem R$ 100, mas ele compra 32% menos coisas!

### Poupança vs Inflação

A poupança rende em média 0,5% ao mês (6% ao ano), mas a inflação pode ser de 4-6% ou mais. Conclusão:

**Deixar dinheiro parado = perder dinheiro**

### Solução

Investir em ativos que rendem acima da inflação:
- Tesouro IPCA+
- Ações de boas empresas
- Fundos Imobiliários
- Títulos privados (CDB, LCI/LCA)',

'## Why Savings Isn''t Enough

Inflation erodes your money''s purchasing power over time. If your money isn''t growing faster than inflation, you''re **losing money**.

### Real Example

- $100 today = $100 in purchasing power
- $100 in 10 years (4% inflation) = only $67.56 in current purchasing power

You still have $100, but it buys 32% less!

### Savings vs Inflation

Savings accounts yield ~2% per year, but inflation can be 3-6% or more. Conclusion:

**Leaving money idle = losing money**

### Solution

Invest in assets that yield above inflation:
- Inflation-protected bonds
- Good company stocks
- Real estate funds
- Private bonds',
NULL, NULL),

('root', 3, 'Juros Compostos: A 8ª Maravilha', 'Compound Interest: The 8th Wonder',
'## "Os juros compostos são a força mais poderosa do universo" - Albert Einstein

Juros compostos é quando você ganha juros sobre os juros que já ganhou. É o crescimento exponencial do seu dinheiro.

### Juros Simples vs Compostos

**Juros Simples (Linear):**
- R$ 1.000 a 10% ao ano por 10 anos = R$ 2.000

**Juros Compostos (Exponencial):**
- R$ 1.000 a 10% ao ano por 10 anos = R$ 2.594

Diferença: **R$ 594** apenas por reinvestir os ganhos!

### A Bola de Neve

Quanto mais tempo passa, maior a diferença:

| Anos | Juros Simples | Juros Compostos |
|------|---------------|------------------|
| 10   | R$ 2.000      | R$ 2.594         |
| 20   | R$ 3.000      | R$ 6.727         |
| 30   | R$ 4.000      | R$ 17.449        |

**O segredo:** Reinvestir os ganhos e dar tempo ao tempo!',

'## "Compound interest is the most powerful force in the universe" - Albert Einstein

Compound interest is when you earn interest on the interest you''ve already earned. It''s exponential money growth.

### Simple vs Compound Interest

**Simple Interest (Linear):**
- $1,000 at 10% per year for 10 years = $2,000

**Compound Interest (Exponential):**
- $1,000 at 10% per year for 10 years = $2,594

Difference: **$594** just by reinvesting earnings!

### The Snowball Effect

The longer time passes, the bigger the difference:

| Years | Simple Interest | Compound Interest |
|-------|----------------|-------------------|
| 10    | $2,000         | $2,594            |
| 20    | $3,000         | $6,727            |
| 30    | $4,000         | $17,449           |

**The secret:** Reinvest gains and give it time!',
NULL, NULL);

-- ============================================
-- QUIZZES FOR NODE: root (Por Que Investir?)
-- ============================================

INSERT INTO tree_quizzes (node_key, question_order, question_pt, question_en, options_pt, options_en, correct_index, explanation_pt, explanation_en) VALUES
('root', 1, 
'Qual é o principal benefício de começar a investir cedo?',
'What is the main benefit of starting to invest early?',
'["Pagar menos impostos", "Aproveitar o poder dos juros compostos ao longo do tempo", "Ter mais dinheiro para gastar agora", "Evitar riscos de mercado"]'::jsonb,
'["Pay less taxes", "Leverage the power of compound interest over time", "Have more money to spend now", "Avoid market risks"]'::jsonb,
1,
'Começar cedo permite que os juros compostos trabalhem a seu favor por mais tempo, multiplicando exponencialmente seu patrimônio.',
'Starting early allows compound interest to work in your favor for longer, exponentially multiplying your wealth.'),

('root', 2,
'Se a inflação for de 5% ao ano e sua poupança render 4% ao ano, o que acontece com seu poder de compra?',
'If inflation is 5% per year and your savings yield 4% per year, what happens to your purchasing power?',
'["Aumenta 1%", "Diminui 1%", "Permanece o mesmo", "Aumenta 9%"]'::jsonb,
'["Increases 1%", "Decreases 1%", "Stays the same", "Increases 9%"]'::jsonb,
1,
'Seu poder de compra diminui 1% ao ano porque a inflação (5%) está maior que o rendimento da poupança (4%). Você perde 1% de poder de compra por ano.',
'Your purchasing power decreases 1% per year because inflation (5%) is higher than savings yield (4%). You lose 1% of purchasing power per year.'),

('root', 3,
'O que são juros compostos?',
'What is compound interest?',
'["Juros calculados apenas sobre o valor inicial", "Juros sobre juros, crescimento exponencial", "Taxa fixa que nunca muda", "Juros que só bancos pagam"]'::jsonb,
'["Interest calculated only on initial amount", "Interest on interest, exponential growth", "Fixed rate that never changes", "Interest only banks pay"]'::jsonb,
1,
'Juros compostos são juros calculados sobre o capital inicial mais os juros acumulados, gerando crescimento exponencial ao longo do tempo.',
'Compound interest is interest calculated on the initial capital plus accumulated interest, generating exponential growth over time.'),

('root', 4,
'Por quanto tempo Ana (25 anos) e Bruno (35 anos) investiram no exemplo da aula?',
'For how long did Ana (25 years) and Bruno (35 years) invest in the lesson example?',
'["Ana: 30 anos, Bruno: 20 anos", "Ana: 40 anos, Bruno: 30 anos", "Ana: 35 anos, Bruno: 25 anos", "Ambos: 30 anos"]'::jsonb,
'["Ana: 30 years, Bruno: 20 years", "Ana: 40 years, Bruno: 30 years", "Ana: 35 years, Bruno: 25 years", "Both: 30 years"]'::jsonb,
1,
'Ana começou aos 25 e investiu até 65 anos = 40 anos. Bruno começou aos 35 e investiu até 65 anos = 30 anos. 10 anos de diferença fizeram Ana ter R$ 2 milhões a mais!',
'Ana started at 25 and invested until 65 = 40 years. Bruno started at 35 and invested until 65 = 30 years. 10 years difference made Ana have $409,000 more!'),

('root', 5,
'Qual é a principal lição sobre investir x deixar dinheiro parado?',
'What is the main lesson about investing vs leaving money idle?',
'["Dinheiro parado está seguro", "Dinheiro parado perde valor pela inflação", "Investir é sempre arriscado", "Poupança é o melhor investimento"]'::jsonb,
'["Idle money is safe", "Idle money loses value due to inflation", "Investing is always risky", "Savings is the best investment"]'::jsonb,
1,
'Dinheiro parado perde poder de compra devido à inflação. Investir em ativos que rendem acima da inflação é essencial para preservar e aumentar seu patrimônio.',
'Idle money loses purchasing power due to inflation. Investing in assets that yield above inflation is essential to preserve and grow your wealth.');

-- ============================================
-- LESSONS FOR NODE: fund_profile (Perfil de Investidor)
-- ============================================

INSERT INTO tree_lessons (node_key, lesson_order, title_pt, title_en, content_pt, content_en, media_type, media_url) VALUES
('fund_profile', 1, 'Perfil Conservador', 'Conservative Profile',
'## O Investidor Conservador

O perfil conservador prioriza a **segurança** acima da rentabilidade. Aceita ganhos menores em troca de baixo risco.

### Características

✅ Prioriza preservação do capital  
✅ Não gosta de ver o patrimônio oscilar  
✅ Prefere investimentos previsíveis  
✅ Quer liquidez (acesso rápido ao dinheiro)

### Investimentos Típicos

- Poupança (mínimo risco)
- Tesouro Selic (baixíssimo risco)
- CDB (baixo risco, FGC até 250k)
- LCI/LCA (baixo risco, isento IR)

### Rentabilidade Esperada

**5-8% ao ano** (acima da inflação, mas abaixo da bolsa)

### Quando é Indicado?

- Reserva de emergência
- Objetivos de curto prazo (< 2 anos)
- Pessoas próximas a aposentar
- Quem não tolera perder dinheiro temporariamente',

'## The Conservative Investor

Conservative profile prioritizes **safety** over returns. Accepts lower gains in exchange for low risk.

### Characteristics

✅ Prioritizes capital preservation  
✅ Dislikes seeing wealth fluctuate  
✅ Prefers predictable investments  
✅ Wants liquidity (quick money access)

### Typical Investments

- Savings accounts (minimum risk)
- Government bonds (very low risk)
- Bank CDs (low risk, insured up to $250k)
- Tax-free bonds (low risk)

### Expected Returns

**5-8% per year** (above inflation, below stocks)

### When is it Suitable?

- Emergency fund
- Short-term goals (< 2 years)
- People close to retirement
- Those who can''t tolerate temporary losses',
NULL, NULL),

('fund_profile', 2, 'Perfil Moderado', 'Moderate Profile',
'## O Investidor Moderado

Busca **equilíbrio** entre segurança e rentabilidade. Aceita algum risco para ganhos maiores.

### Características

✅ Mix de renda fixa e variável  
✅ Tolera oscilações moderadas  
✅ Pensa no médio prazo (3-7 anos)  
✅ Quer crescimento acima da inflação

### Carteira Típica

**60% Renda Fixa:**
- Tesouro IPCA+
- CDB
- LCI/LCA

**40% Renda Variável:**
- Ações de boas empresas
- Fundos Imobiliários
- ETFs

### Rentabilidade Esperada

**10-14% ao ano** (acima da renda fixa, menos volátil que 100% ações)

### Quando é Indicado?

- Objetivos de médio prazo
- Primeira carteira de ações
- Quem quer diversificar
- Acumulação de patrimônio',

'## The Moderate Investor

Seeks **balance** between safety and returns. Accepts some risk for higher gains.

### Characteristics

✅ Mix of fixed income and stocks  
✅ Tolerates moderate fluctuations  
✅ Thinks medium-term (3-7 years)  
✅ Wants growth above inflation

### Typical Portfolio

**60% Fixed Income:**
- Inflation-protected bonds
- Bank CDs
- Tax-free bonds

**40% Variable Income:**
- Good company stocks
- REITs
- ETFs

### Expected Returns

**10-14% per year** (above fixed income, less volatile than 100% stocks)

### When is it Suitable?

- Medium-term goals
- First stock portfolio
- Those wanting diversification
- Wealth accumulation',
NULL, NULL),

('fund_profile', 3, 'Perfil Arrojado', 'Aggressive Profile',
'## O Investidor Arrojado

Busca **máxima rentabilidade** e aceita alto risco. Foco no longo prazo.

### Características

✅ Tolera alta volatilidade  
✅ Pensa em 10+ anos  
✅ Quer bater qualquer índice  
✅ Estuda investimentos ativamente

### Carteira Típica

**20% Renda Fixa:**
- Reserva de emergência

**80% Renda Variável:**
- Ações (50%)
- FIIs (15%)
- Internacional (10%)
- Cripto (5%)

### Rentabilidade Esperada

**15-25%+ ao ano** (com alta volatilidade)

### Riscos

⚠️ Pode perder 30-50% em crises  
⚠️ Requer disciplina emocional  
⚠️ Precisa de conhecimento  
⚠️ Apenas para longo prazo

### Quando é Indicado?

- Jovens (20-40 anos)
- Objetivos de 10+ anos
- Quem estuda investimentos
- Aceita perdas temporárias',

'## The Aggressive Investor

Seeks **maximum returns** and accepts high risk. Long-term focus.

### Characteristics

✅ Tolerates high volatility  
✅ Thinks 10+ years  
✅ Wants to beat any index  
✅ Actively studies investments

### Typical Portfolio

**20% Fixed Income:**
- Emergency fund

**80% Variable Income:**
- Stocks (50%)
- REITs (15%)
- International (10%)
- Crypto (5%)

### Expected Returns

**15-25%+ per year** (with high volatility)

### Risks

⚠️ Can lose 30-50% in crises  
⚠️ Requires emotional discipline  
⚠️ Needs knowledge  
⚠️ Only for long-term

### When is it Suitable?

- Young investors (20-40 years)
- 10+ year goals
- Those who study investments
- Accept temporary losses',
NULL, NULL);

-- Log completion
DO $$
BEGIN
    RAISE NOTICE 'Successfully inserted sample lessons and quizzes for nodes: root, fund_profile';
    RAISE NOTICE 'Pattern established for remaining 58 nodes';
END $$;
