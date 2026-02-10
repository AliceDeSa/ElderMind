-- Seed Data: Fundamental Concepts Lessons & Quizzes
-- Description: Complete content for fundamental nodes (fund_concepts, fund_before, fund_taxes)
-- Date: 2026-02-08

-- ============================================
-- NODE: fund_concepts (Conceitos Básicos)
-- ============================================

-- Lessons
INSERT INTO tree_lessons (node_key, lesson_order, title_pt, title_en, content_pt, content_en) VALUES
('fund_concepts', 1, 'Liquidez', 'Liquidity',
'## O Que é Liquidez?

Liquidez é a **facilidade de transformar um investimento em dinheiro** sem perder valor.

### Alta Liquidez ✅
- Poupança: saque imediato
- Tesouro Selic: resgate D+1
- CDB com liquidez diária

### Baixa Liquidez ⚠️
- CDB travado por 2 anos
- Imóveis (demora meses para vender)
- Previdência privada (carência + IR)

### Exemplo Prático

**Situação:** Você precisa de R$ 5.000 amanhã para uma emergência

| Investimento | Liquidez | Consegue o dinheiro? |
|--------------|----------|----------------------|
| Poupança | Imediata | ✅ Sim |
| Tesouro Selic | D+1 | ✅ Sim (1 dia) |
| CDB 2 anos | Travado | ❌ Não (perde dinheiro) |
| Imóvel | Meses | ❌ Não |

**Regra de Ouro:** Reserva de emergência deve ter ALTA liquidez!',

'## What is Liquidity?

Liquidity is the **ease of converting an investment into cash** without losing value.

### High Liquidity ✅
- Savings: immediate withdrawal
- Government bonds: D+1 redemption
- Daily liquidity CDs

### Low Liquidity ⚠️
- 2-year locked CD
- Real estate (takes months to sell)
- Retirement accounts (waiting period + penalties)

### Practical Example

**Situation:** You need $1,000 tomorrow for an emergency

| Investment | Liquidity | Can get money? |
|------------|-----------|----------------|
| Savings | Immediate | ✅ Yes |
| Bond | D+1 | ✅ Yes (1 day) |
| 2-year CD | Locked | ❌ No (lose money) |
| Real estate | Months | ❌ No |

**Golden Rule:** Emergency fund must have HIGH liquidity!'),

('fund_concepts', 2, 'Rentabilidade e Risco', 'Returns and Risk',
'## A Relação Fundamental

**Maior rentabilidade = Maior risco**

Não existe almoço grátis no mercado financeiro!

### Pirâmide de Risco x Retorno

```
         🔺 CRIPTO (Alto risco, Alto retorno)
        🔺 AÇÕES (Risco médio-alto)
       🔺 FIIs (Risco médio)
      🔺 FUNDOS (Risco médio-baixo)
     🔺 CDB/LCI (Risco baixo)
    🔺 TESOURO (Risco muito baixo)
   🔺 POUPANÇA (Risco mínimo, Retorno mínimo)
```

### Rentabilidade

| Investimento | Retorno Anual (aprox) |
|--------------|----------------------|
| Poupança | 6% |
| Tesouro Selic | 100% CDI (~13%) |
| CDB | 100-120% CDI |
| Ações | 10-20%+ (volátil) |
| Cripto | -50% a +500% (altíssimo risco) |

### Diversificação é a Chave

Não coloque todos os ovos na mesma cesta:
- 30% renda fixa (segurança)
- 50% ações (crescimento)
- 20% FIIs (renda passiva)

**Objetivo:** Maximizar retorno dentro do seu limite de risco!',

'## The Fundamental Relationship

**Higher returns = Higher risk**

There''s no free lunch in financial markets!

### Risk x Return Pyramid

```
         🔺 CRYPTO (High risk, High return)
        🔺 STOCKS (Medium-high risk)
       🔺 REITs (Medium risk)
      🔺 FUNDS (Medium-low risk)
     🔺 CDs/BONDS (Low risk)
    🔺 TREASURY (Very low risk)
   🔺 SAVINGS (Minimum risk, Minimum return)
```

### Returns

| Investment | Annual Return (approx) |
|------------|------------------------|
| Savings | 2-3% |
| Bonds | 4-5% |
| CDs | 4-6% |
| Stocks | 8-12%+ (volatile) |
| Crypto | -50% to +500% (very high risk) |

### Diversification is Key

Don''t put all eggs in one basket:
- 30% fixed income (safety)
- 50% stocks (growth)
- 20% REITs (passive income)

**Goal:** Maximize return within your risk tolerance!'),

('fund_concepts', 3, 'Diversificação', 'Diversification',
'## "Não Coloque Todos os Ovos na Mesma Cesta"

Diversificação é espalhar seus investimentos em diferentes ativos para **reduzir risco**.

### Por Que Diversificar?

Se você tem R$ 10.000 só em ações da Petrobras:
- ❌ Se Petrobras cair 30%, você perde 30%
- ❌ Um só risco: petróleo e governo

Se você diversifica em 10 empresas de setores diferentes:
- ✅ Se uma cair 30%, você perde apenas 3%
- ✅ Riscos diluídos em vários setores

### Tipos de Diversificação

**1. Por Classe de Ativos**
- Renda fixa
- Ações
- FIIs
- Internacional
- Cripto (pequena %)

**2. Por Setores (Ações)**
- Bancos
- Energia
- Tecnologia
- Saúde
- Consumo

**3. Geográfica**
- Brasil
- Estados Unidos
- Europa
- Emergentes

### Carteira Diversificada Exemplo

| Ativo | % | Objetivo |
|-------|---|----------|
| Tesouro Selic | 20% | Emergência |
| Tesouro IPCA+ | 10% | Aposentadoria |
| CDB | 10% | Segurança |
| Ações Brasil | 30% | Crescimento |
| FIIs | 20% | Renda mensal |
| Internacional | 10% | Proteção cambial |

**Resultado:** Se um cai, outros compensam!',

'## "Don''t Put All Eggs in One Basket"

Diversification is spreading your investments across different assets to **reduce risk**.

### Why Diversify?

If you have $10,000 only in one oil company:
- ❌ If it drops 30%, you lose 30%
- ❌ Single risk: oil prices

If you diversify across 10 different sector companies:
- ✅ If one drops 30%, you lose only 3%
- ✅ Risks diluted across sectors

### Types of Diversification

**1. By Asset Class**
- Fixed income
- Stocks
- REITs
- International
- Crypto (small %)

**2. By Sectors (Stocks)**
- Banks
- Energy
- Technology
- Healthcare
- Consumer goods

**3. Geographic**
- Domestic
- United States
- Europe
- Emerging markets

### Diversified Portfolio Example

| Asset | % | Purpose |
|-------|---|---------|
| Bonds | 20% | Emergency |
| Inflation bonds | 10% | Retirement |
| CDs | 10% | Safety |
| Domestic stocks | 30% | Growth |
| REITs | 20% | Monthly income |
| International | 10% | Currency protection |

**Result:** If one falls, others compensate!');

-- Quizzes for fund_concepts
INSERT INTO tree_quizzes (node_key, question_order, question_pt, question_en, options_pt, options_en, correct_index, explanation_pt, explanation_en) VALUES
('fund_concepts', 1,
'O que é liquidez?',
'What is liquidity?',
'["Taxa de retorno de um investimento", "Facilidade de transformar investimento em dinheiro", "Risco de perder dinheiro", "Imposto sobre investimentos"]'::jsonb,
'["Rate of return on investment", "Ease of converting investment to cash", "Risk of losing money", "Tax on investments"]'::jsonb,
1,
'Liquidez é a facilidade e rapidez de converter um ativo em dinheiro sem perder valor significativo.',
'Liquidity is the ease and speed of converting an asset to cash without significant value loss.'),

('fund_concepts', 2,
'Qual investimento tem MAIOR liquidez?',
'Which investment has HIGHER liquidity?',
'["Imóvel", "Poupança", "CDB 2 anos travado", "Previdência privada"]'::jsonb,
'["Real estate", "Savings account", "2-year locked CD", "Retirement account"]'::jsonb,
1,
'Poupança tem liquidez imediata - você pode sacar a qualquer momento sem penalidades.',
'Savings has immediate liquidity - you can withdraw anytime without penalties.'),

('fund_concepts', 3,
'Qual a relação entre risco e rentabilidade?',
'What is the relationship between risk and returns?',
'["Maior risco = Menor retorno", "Maior risco = Maior retorno potencial", "Não há relação", "Risco não importa"]'::jsonb,
'["Higher risk = Lower return", "Higher risk = Higher potential return", "No relationship", "Risk doesn''t matter"]'::jsonb,
1,
'No mercado financeiro, investimentos com maior risco tendem a oferecer maior retorno potencial para compensar o risco assumido.',
'In financial markets, higher-risk investments tend to offer higher potential returns to compensate for the risk taken.'),

('fund_concepts', 4,
'Por que diversificar investimentos?',
'Why diversify investments?',
'["Para ganhar mais dinheiro", "Para reduzir riscos", "Para pagar menos impostos", "Não é necessário diversificar"]'::jsonb,
'["To earn more money", "To reduce risks", "To pay less taxes", "Diversification is not necessary"]'::jsonb,
1,
'Diversificação reduz riscos ao distribuir investimentos em diferentes ativos. Se um cai, outros podem compensar.',
'Diversification reduces risks by distributing investments across different assets. If one falls, others can compensate.'),

('fund_concepts', 5,
'Qual NÃO é um tipo de diversificação?',
'Which is NOT a type of diversification?',
'["Por classe de ativos", "Por setores", "Geográfica", "Por cor favorita"]'::jsonb,
'["By asset class", "By sectors", "Geographic", "By favorite color"]'::jsonb,
3,
'Diversificação deve ser baseada em critérios financeiros racionais como classe de ativos, setores econômicos e geografia - não preferências pessoais arbitrárias.',
'Diversification should be based on rational financial criteria like asset classes, economic sectors, and geography - not arbitrary personal preferences.');

-- ============================================
-- NODE: fund_before (Antes de Investir)
-- ============================================

INSERT INTO tree_lessons (node_key, lesson_order, title_pt, title_en, content_pt, content_en) VALUES
('fund_before', 1, 'Reserva de Emergência', 'Emergency Fund',
'## A Base de Tudo: Reserva de Emergência

**ANTES** de investir em qualquer coisa, você PRECISA de uma reserva de emergência!

### O Que É?

Dinheiro guardado para **imprevistos**:
- Perda de emprego
- Doença
- Conserto do carro
- Emergências médicas
- Eletrodoméstico quebrou

### Quanto Guardar?

**Regra Geral: 6 meses de despesas**

Exemplo:
- Suas despesas mensais: R$ 3.000
- Reserva necessária: R$ 18.000

Se você é autônomo ou tem renda variável: **12 meses**

### Onde Guardar?

✅ **ALTA LIQUIDEZ** (acesso rápido)

Opções ideais:
1. **Tesouro Selic** (melhor opção)
2. **CDB com liquidez diária** (acima de 100% CDI)
3. **Poupança** (última opção, rende pouco)

❌ **NÃO guardar em:**
- Ações (oscila muito)
- CDB travado
- Fundos imobiliários
- Imóveis

### Por Que é Importante?

**Sem reserva:**
- Emergência → Vende ações no prejuízo 😞
- Ou pega empréstimo com juros altos 😢

**Com reserva:**
- Emergência → Usa reserva 😌
- Investimentos continuam crescendo 📈

**Primeiro passo:** Monte sua reserva. Depois invista!',

'## The Foundation: Emergency Fund

**BEFORE** investing in anything, you NEED an emergency fund!

### What Is It?

Money saved for **unexpected events**:
- Job loss
- Illness
- Car repairs
- Medical emergencies
- Appliance breakdown

### How Much to Save?

**General Rule: 6 months of expenses**

Example:
- Your monthly expenses: $1,500
- Necessary reserve: $9,000

If self-employed or variable income: **12 months**

### Where to Keep It?

✅ **HIGH LIQUIDITY** (quick access)

Ideal options:
1. **Government bonds** (best option)
2. **Daily liquidity CDs** (good rates)
3. **Savings** (last resort, low yield)

❌ **DON''T keep in:**
- Stocks (too volatile)
- Locked CDs
- REITs
- Real estate

### Why Is It Important?

**Without reserve:**
- Emergency → Sell stocks at loss 😞
- Or take high-interest loan 😢

**With reserve:**
- Emergency → Use reserve 😌
- Investments keep growing 📈

**First step:** Build your reserve. Then invest!'),

('fund_before', 2, 'Quitar Dívidas Caras', 'Pay Off Expensive Debts',
'## Dívida vs Investimento: A Matemática

**Regra de Ouro:** Se a taxa de juros da dívida é maior que o retorno dos investimentos, **PAGUE A DÍVIDA PRIMEIRO**!

### Exemplo Real

Você tem:
- R$ 10.000 disponível
- Dívida no cartão: 15% ao mês (sim, ao MÊS!)
- Investimento rende: 1% ao mês

**Opção 1: Investir os R$ 10.000**
- Ganho: R$ 100/mês (1%)
- Perde: R$ 1.500/mês (juros da dívida)
- **Prejuízo líquido: -R$ 1.400/mês** 😱

**Opção 2: Quitar a dívida**
- Ganho: R$ 0
- Economiza: R$ 1.500/mês (não paga mais juros)
- **Lucro líquido: +R$ 1.500/mês** 🎉

### Ordem de Prioridades

1. **Emergência básica** (R$ 5.000-10.000)
2. **Dívidas caras** (cartão, cheque especial, empréstimos pessoais)
3. **Reserva completa** (6 meses)
4. **Dívidas baratas** (financiamentos < 1% mês)
5. **Investimentos agressivos** (ações, FIIs, etc)

### Dívidas Caras (PAGUE URGENTE)

| Tipo | Juros Mensais |
|------|---------------|
| Cartão rotativo | 10-15% 🔴 |
| Cheque especial | 8-12% 🔴 |
| Empréstimo pessoal | 3-8% 🟡 |

### Dívidas "Baratas" (OK manter)

| Tipo | Juros Mensais |
|------|---------------|
| Financiamento imobiliário | 0,6-0,9% 🟢 |
| Financiamento carro | 1-2% 🟡 |

**Ação:** Quite dívidas caras ANTES de investir!',

'## Debt vs Investment: The Math

**Golden Rule:** If debt interest is higher than investment return, **PAY THE DEBT FIRST**!

### Real Example

You have:
- $2,000 available
- Credit card debt: 20% per year
- Investment yields: 8% per year

**Option 1: Invest the $2,000**
- Gain: $160/year (8%)
- Lose: $400/year (debt interest)
- **Net loss: -$240/year** 😱

**Option 2: Pay off debt**
- Gain: $0
- Save: $400/year (no more interest)
- **Net profit: +$400/year** 🎉

### Priority Order

1. **Basic emergency** ($2,000-3,000)
2. **Expensive debts** (credit cards, personal loans)
3. **Complete reserve** (6 months)
4. **Cheap debts** (mortgage < 5% year)
5. **Aggressive investments** (stocks, REITs)

### Expensive Debts (PAY URGENTLY)

| Type | Annual Interest |
|------|-----------------|
| Credit card | 15-25% 🔴 |
| Personal loan | 12-18% 🔴 |
| Car loan | 6-12% 🟡 |

### "Cheap" Debts (OK to keep)

| Type | Annual Interest |
|------|-----------------|
| Mortgage | 3-6% 🟢 |
| Student loan | 4-7% 🟡 |

**Action:** Pay off expensive debts BEFORE investing!'),

('fund_before', 3, 'Definir Objetivos Financeiros', 'Define Financial Goals',
'## Investir SEM Objetivo = Viajar SEM Destino

Você precisa saber **POR QUE** está investindo e **QUANDO** vai precisar do dinheiro.

### Prazos de Investimento

**Curto Prazo (< 2 anos)**
- Casamento
- Viagem
- Trocar de carro
- **Investir em:** Renda fixa, Tesouro Selic, CDB

**Médio Prazo (2-7 anos)**
- Entrada de imóvel
- Faculdade dos filhos
- Abrir um negócio
- **Investir em:** Mix de renda fixa + ações

**Longo Prazo (> 10 anos)**
- Aposentadoria
- Independência financeira
- **Investir em:** Ações, FIIs, Internacional

### Método SMART para Objetivos

Objetivos devem ser:
- **S**pecific (Específico)
- **M**easurable (Mensurável)
- **A**ttainable (Atingível)
- **R**elevant (Relevante)
- **T**ime-bound (Prazo definido)

### Exemplo Ruim ❌
"Quero ficar rico"

### Exemplo BOM ✅
"Quero juntar R$ 50.000 em 3 anos para dar entrada em um imóvel"

### Planeje Seus Objetivos

| Objetivo | Valor | Prazo | Aporte Mensal | Investimento |
|----------|-------|-------|---------------|--------------|
| Reserva | R$ 18.000 | 12 meses | R$ 1.500 | Tesouro Selic |
| Viagem | R$ 10.000 | 18 meses | R$ 556 | CDB |
| Carro | R$ 30.000 | 4 anos | R$ 580 | Mix RF + Ações |
| Aposentadoria | R$ 1.000.000 | 30 anos | R$ 800 | Ações + FIIs |

**Ferramenta:** Use calculadoras de juros compostos!',

'## Investing WITHOUT Goals = Traveling WITHOUT Destination

You need to know **WHY** you''re investing and **WHEN** you''ll need the money.

### Investment Time Horizons

**Short Term (< 2 years)**
- Wedding
- Trip
- New car
- **Invest in:** Bonds, CDs

**Medium Term (2-7 years)**
- Home down payment
- Children''s college
- Start business
- **Invest in:** Mix of bonds + stocks

**Long Term (> 10 years)**
- Retirement
- Financial independence
- **Invest in:** Stocks, REITs, International

### SMART Goals Method

Goals should be:
- **S**pecific
- **M**easurable
- **A**ttainable
- **R**elevant
- **T**ime-bound

### Bad Example ❌
"I want to be rich"

### GOOD Example ✅
"I want to save $20,000 in 3 years for home down payment"

### Plan Your Goals

| Goal | Amount | Timeline | Monthly | Investment |
|------|--------|----------|---------|------------|
| Emergency | $9,000 | 12 months | $750 | Bonds |
| Trip | $5,000 | 18 months | $278 | CDs |
| Car | $15,000 | 4 years | $290 | Mix Bonds + Stocks |
| Retirement | $500,000 | 30 years | $400 | Stocks + REITs |

**Tool:** Use compound interest calculators!');

-- Quizzes for fund_before
INSERT INTO tree_quizzes (node_key, question_order, question_pt, question_en, options_pt, options_en, correct_index, explanation_pt, explanation_en) VALUES
('fund_before', 1,
'Quantos meses de despesas deve ter na reserva de emergência?',
'How many months of expenses should be in emergency fund?',
'["3 meses", "6 meses", "12 meses", "Não precisa de reserva"]'::jsonb,
'["3 months", "6 months", "12 months", "No need for reserve"]'::jsonb,
1,
'A regra geral é 6 meses de despesas. Se você é autônomo ou tem renda variável, considere 12 meses.',
'The general rule is 6 months of expenses. If self-employed or variable income, consider 12 months.'),

('fund_before', 2,
'Onde NÃO deve ficar a reserva de emergência?',
'Where should emergency fund NOT be kept?',
'["Tesouro Selic", "CDB liquidez diária", "Ações", "Poupança"]'::jsonb,
'["Government bonds", "Daily liquidity CD", "Stocks", "Savings"]'::jsonb,
2,
'Ações são voláteis e podem cair 30-50% em crises. Reserva de emergência precisa de alta liquidez e baixo risco.',
'Stocks are volatile and can drop 30-50% in crises. Emergency fund needs high liquidity and low risk.'),

('fund_before', 3,
'Você tem R$ 10.000 e uma dívida de cartão (15% mês). O que fazer?',
'You have $2,000 and credit card debt (20% year). What to do?',
'["Investir em ações", "Quitar a dívida", "Comprar cripto", "Guardar na poupança"]'::jsonb,
'["Invest in stocks", "Pay off the debt", "Buy crypto", "Keep in savings"]'::jsonb,
1,
'Dívidas de cartão têm juros muito altos. É matematicamente melhor quitar a dívida primeiro.',
'Credit card debts have very high interest. It''s mathematically better to pay off debt first.'),

('fund_before', 4,
'Qual investimento para objetivo de curto prazo (< 2 anos)?',
'Which investment for short-term goal (< 2 years)?',
'["Ações", "Renda fixa (Tesouro, CDB)", "Fundos imobiliários", "Cripto"]'::jsonb,
'["Stocks", "Fixed income (Bonds, CDs)", "REITs", "Crypto"]'::jsonb,
1,
'Curto prazo requer baixo risco e liquidez. Renda fixa é ideal. Ações podem cair no curto prazo.',
'Short term requires low risk and liquidity. Fixed income is ideal. Stocks can drop in short term.'),

('fund_before', 5,
'O que significa um objetivo SMART?',
'What does SMART goal mean?',
'["Inteligente e rápido", "Específico, Mensurável, Atingível, Relevante, com Prazo", "Sempre em dólar", "Só para milionários"]'::jsonb,
'["Smart and fast", "Specific, Measurable, Attainable, Relevant, Time-bound", "Always in dollars", "Only for millionaires"]'::jsonb,
1,
'SMART é um acrônimo que define características de objetivos bem formulados: Específico, Mensurável, Atingível, Relevante e com Prazo definido.',
'SMART is an acronym defining well-formulated goal characteristics: Specific, Measurable, Attainable, Relevant, Time-bound.');

-- Log completion
DO $$
BEGIN
    RAISE NOTICE 'Added lessons and quizzes for: fund_concepts, fund_before';
    RAISE NOTICE 'Total progress: 12 lessons, 15 quizzes';
END $$;
