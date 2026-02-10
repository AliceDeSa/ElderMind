-- Seed Data: Taxes and Fixed Income Intro
-- Description: fund_taxes + rf_intro + rf_savings + rf_treasury nodes
-- Date: 2026-02-08

-- ============================================
-- NODE: fund_taxes (Taxas e Impostos)
-- ============================================

INSERT INTO tree_lessons (node_key, lesson_order, title_pt, title_en, content_pt, content_en) VALUES
('fund_taxes', 1, 'Imposto de Renda sobre Investimentos', 'Income Tax on Investments',
'## Como Funciona o IR em Investimentos

O governo cobra imposto sobre os **ganhos** (lucros) dos seus investimentos, não sobre o valor total.

### Tabela Regressiva (Renda Fixa)

Quanto mais tempo fica investido, **menos** imposto paga:

| Prazo | Alíquota de IR |
|-------|----------------|
| Até 180 dias | 22,5% |
| 181 a 360 dias | 20% |
| 361 a 720 dias | 17,5% |
| Acima de 720 dias | 15% |

### Exemplo Prático

Você investiu R$ 10.000 em CDB por 2 anos (rendeu R$ 3.000):

- Ganho: R$ 3.000
- IR (15% após 720 dias): R$ 450
- **Líquido no bolso: R$ 2.550**

### Investimentos ISENTOS de IR ✅

- LCI/LCA (Letras de Crédito)
- CRI/CRA (Recebíveis Imobiliários/Agrícolas)
- Debêntures Incentivadas
- Poupança
- **FIIs** (renda dos aluguéis para PF)

### Ações e FIIs

**Dividendos:** ISENTOS de IR  
**Venda de ações/FIIs:** 15-20% de IR sobre o lucro

**Isenção:** Vendas até R$ 20.000/mês em ações = ISENTO

### Declaração Anual

Você deve declarar no IR anual se:
- Vendeu ações (qualquer valor)
- Tem mais de R$ 1.000 em FIIs
- Ganhos totais > R$ 40.000

**Dica:** Corretoras enviam informes de rendimentos!',

'## How Income Tax Works on Investments

Government taxes **gains** (profits) from investments, not total value.

### Progressive Tax (Fixed Income)

Longer investment = **less** tax:

| Period | Tax Rate |
|--------|----------|
| Up to 180 days | 22.5% |
| 181 to 360 days | 20% |
| 361 to 720 days | 17.5% |
| Over 720 days | 15% |

### Practical Example

Invested $2,000 in CD for 2 years (earned $600):

- Gain: $600
- Tax (15% after 720 days): $90
- **Net profit: $510**

### TAX-FREE Investments ✅

- Municipal bonds
- Certain infrastructure bonds
- Savings accounts
- **REITs** (rental income for individuals)

### Stocks and REITs

**Dividends:** TAX-FREE  
**Sale of stocks/REITs:** 15-20% tax on profit

**Exemption:** Sales under $400/month = TAX-FREE

### Annual Declaration

You must declare if:
- Sold stocks (any amount)
- Have more than certain amount in REITs
- Total gains > threshold

**Tip:** Brokers send tax forms!'),

('fund_taxes', 2, 'Come-Cotas e IOF', 'Fund Fees and Early Withdrawal Tax',
'## Come-Cotas: O "Imposto Antecipado"

Fundos de investimento têm um mecanismo chamado **come-cotas**: IR cobrado semestralmente (maio e novembro).

### Como Funciona

O governo "come" (desconta) parte das suas cotas do fundo:

- **Fundos de Renda Fixa:** 15%
- **Fundos Multimercado:** 15%

**Importante:** Não é dinheiro que sai da conta, são cotas descontadas.

### Exemplo

- Você tem 1.000 cotas de R$ 10 cada = R$ 10.000
- Rendimento semestre: R$ 500
- Come-cotas (15%): 7,5 cotas
- **Você fica com:** 992,5 cotas de ~R$ 10,05

### IOF (Imposto sobre Operações Financeiras)

**Resgates em menos de 30 dias** pagam IOF regressivo:

| Dias | IOF |
|------|-----|
| 1 dia | 96% |
| 2 dias | 93% |
| 3 dias | 90% |
| ... | ... |
| 29 dias | 3% |
| 30+ dias | 0% |

### Exemplo IOF

Investiu R$ 10.000, resgatou em 5 dias com lucro de R$ 100:

- IOF de 5 dias: 83%
- **IOF a pagar:** R$ 83 (quase TODO o lucro!)
- Sobra: R$ 17

**Lição:** Investimentos são para **médio/longo prazo**!

### Como Evitar

✅ Deixe investimento por pelo menos 30 dias  
✅ Use reserva de emergência para imprevistos  
✅ Não tire dinheiro de investimentos constantemente',

'## Fund Fees: "Upfront Tax"

Investment funds have a mechanism called **come-cotas** (in Brazil): semi-annual tax (May/November).

### How It Works

Government deducts part of your fund shares:

- **Fixed Income Funds:** 15%
- **Multimarket Funds:** 15%

**Important:** Not cash withdrawn, shares are discounted.

### Example

- You have 1,000 shares at $10 each = $10,000
- Semester return: $500
- Fee (15%): 7.5 shares
- **You keep:** 992.5 shares at ~$10.05

### Early Withdrawal Tax

**Withdrawals under 30 days** pay progressive tax:

| Days | Tax |
|------|-----|
| 1 day | 96% |
| 2 days | 93% |
| 3 days | 90% |
| ... | ... |
| 29 days | 3% |
| 30+ days | 0% |

### Tax Example

Invested $2,000, withdrew in 5 days with $20 profit:

- 5-day tax: 83%
- **Tax to pay:** $16.60 (almost ALL profit!)
- Remains: $3.40

**Lesson:** Investments are for **medium/long term**!

### How to Avoid

✅ Keep investment for at least 30 days  
✅ Use emergency fund for emergencies  
✅ Don''t withdraw from investments constantly'),

('fund_taxes', 3, 'Outras Taxas de Investimento', 'Other Investment Fees',
'## Taxas que Reduzem sua Rentabilidade

Além do IR, existem outras taxas que "comem" seus ganhos.

### Taxa de Administração (Fundos)

Cobrada anualmente pelo gestor do fundo:

| Tipo de Fundo | Taxa Típica |
|---------------|-------------|
| Renda Fixa | 0,5% - 2% |
| Multimercado | 1,5% - 3% |
| Ações | 2% - 4% |
| **ETFs** | **0,2% - 0,5%** ✅ |

**Dica:** ETFs são mais baratos!

### Taxa de Performance

Cobrada quando fundo supera benchmark:

- Geralmente **20% do que exceder** o índice
- Exemplo: Fundo rendeu 25%, CDI foi 20%
  - Excedeu: 5%
  - Taxa: 20% de 5% = 1%

### Taxa de Custódia (Ações/FIIs)

Algumas corretoras cobram para "guardar" suas ações:

- **R$ 10-30/mês** ou
- **Grátis** (maioria das corretoras hoje)

✅ **Escolha corretora sem custódia!**

### Corretagem (Compra/Venda)

Taxa por cada operação:

- **Ações:** R$ 0 - R$ 20 por operação
- **FIIs:** R$ 0 - R$ 20 por operação
- **Tesouro:** Grátis (algumas)

**Melhores:** Clear, Rico, Nu Invest (corretagem zero)

### Emolumentos B3

Taxa da Bolsa de Valores:

- Ações: 0,03% do valor negociado
- FIIs: 0,03% do valor negociado

**Automático**, já incluído na compra.

### Como Minimizar Taxas

1. ✅ Use corretoras **sem custódia**
2. ✅ Prefira **ETFs** a fundos ativos
3. ✅ Compre **direto** Tesouro/CDB  
4. ✅ Evite operar demais (buy & hold)
5. ✅ Compare taxas entre corretoras

**Exemplo:** Taxa de 2% ao ano pode reduzir seu patrimônio em 40% ao longo de 30 anos!',

'## Fees That Reduce Your Returns

Besides taxes, there are other fees that "eat" your gains.

### Management Fee (Funds)

Charged annually by fund manager:

| Fund Type | Typical Fee |
|-----------|-------------|
| Fixed Income | 0.5% - 2% |
| Multimarket | 1.5% - 3% |
| Stock Funds | 2% - 4% |
| **ETFs** | **0.2% - 0.5%** ✅ |

**Tip:** ETFs are cheaper!

### Performance Fee

Charged when fund beats benchmark:

- Usually **20% of excess** return
- Example: Fund returned 25%, index was 20%
  - Exceeded: 5%
  - Fee: 20% of 5% = 1%

### Custody Fee (Stocks/REITs)

Some brokers charge to "keep" your stocks:

- **$5-15/month** or
- **Free** (most brokers today)

✅ **Choose broker without custody fee!**

### Brokerage (Buy/Sell)

Fee per transaction:

- **Stocks:** $0 - $10 per trade
- **REITs:** $0 - $10 per trade
- **Bonds:** Free (some)

**Best:** Zero-commission brokers

### Exchange Fees

Stock exchange fee:

- Stocks: 0.03% of traded value
- REITs: 0.03% of traded value

**Automatic**, already included in purchase.

### How to Minimize Fees

1. ✅ Use brokers **without custody fees**
2. ✅ Prefer **ETFs** to active funds
3. ✅ Buy **directly** bonds/CDs
4. ✅ Avoid overtrading (buy & hold)
5. ✅ Compare fees between brokers

**Example:** 2% annual fee can reduce your wealth by 40% over 30 years!');

-- Quizzes for fund_taxes
INSERT INTO tree_quizzes (node_key, question_order, question_pt, question_en, options_pt, options_en, correct_index, explanation_pt, explanation_en) VALUES
('fund_taxes', 1,
'Qual a alíquota de IR em renda fixa para investimentos acima de 720 dias?',
'What is the tax rate on fixed income for investments over 720 days?',
'["22,5%", "20%", "17,5%", "15%"]'::jsonb,
'["22.5%", "20%", "17.5%", "15%"]'::jsonb,
3,
'Para investimentos em renda fixa acima de 720 dias (2 anos), a alíquota é de 15% - a menor da tabela regressiva.',
'For fixed income investments over 720 days (2 years), the rate is 15% - the lowest in the progressive table.'),

('fund_taxes', 2,
'Qual investimento é ISENTO de IR?',
'Which investment is TAX-FREE?',
'["CDB", "LCI/LCA", "Fundo de Renda Fixa", "Tesouro Selic"]'::jsonb,
'["Bank CD", "Mortgage/Agribusiness bonds", "Fixed Income Fund", "Government bonds"]'::jsonb,
1,
'LCI (Letra de Crédito Imobiliário) e LCA (Letra de Crédito do Agronegócio) são isentas de Imposto de Renda.',
'LCI (Real Estate Credit Letter) and LCA (Agribusiness Credit Letter) are income tax exempt.'),

('fund_taxes', 3,
'O que é "come-cotas"?',
'What is "come-cotas" (fund fee)?',
'["Taxa de corretagem", "Desconto semestral de IR em fundos", "Taxa de performance", "IOF"]'::jsonb,
'["Brokerage fee", "Semi-annual tax discount on funds", "Performance fee", "Early withdrawal tax"]'::jsonb,
1,
'Come-cotas é o desconto semestral (maio e novembro) de Imposto de Renda que ocorre em fundos de investimento.',
'Come-cotas is the semi-annual (May and November) income tax discount that occurs in investment funds.'),

('fund_taxes', 4,
'Resgatar investimento em 5 dias paga quanto de IOF?',
'Withdrawing investment in 5 days pays how much early tax?',
'["0%", "15%", "83%", "100%"]'::jsonb,
'["0%", "15%", "83%", "100%"]'::jsonb,
2,
'IOF é regressivo até 30 dias. Em 5 dias, a alíquota é de 83% sobre os rendimentos - quase todo o lucro!',
'Early withdrawal tax is progressive up to 30 days. At 5 days, the rate is 83% on earnings - almost all profit!'),

('fund_taxes', 5,
'Qual a melhor forma de reduzir taxas em investimentos?',
'What is the best way to reduce investment fees?',
'["Comprar ações todos os dias", "Usar corretora sem custódia e preferir ETFs", "Investir apenas em poupança", "Trocar de fundo mensalmente"]'::jsonb,
'["Buy stocks every day", "Use broker without custody fees and prefer ETFs", "Invest only in savings", "Change funds monthly"]'::jsonb,
1,
'Escolher corretora sem taxa de custódia e preferir ETFs (taxas menores) a fundos ativos reduz significativamente os custos.',
'Choosing broker without custody fees and preferring ETFs (lower fees) to active funds significantly reduces costs.');

-- ============================================
-- NODE: rf_intro (Introdução à Renda Fixa)
-- ============================================

INSERT INTO tree_lessons (node_key, lesson_order, title_pt, title_en, content_pt, content_en) VALUES
('rf_intro', 1, 'O Que é Renda Fixa?', 'What is Fixed Income?',
'## Renda Fixa: Emprestar Dinheiro para Receber de Volta com Juros

Quando você investe em renda fixa, você está **emprestando dinheiro** para alguém (banco, governo, empresa) que promete devolver com juros.

### Como Funciona

1. **Você empresta:** R$ 10.000
2. **Banco/Governo promete:** Devolver em 2 anos com 10% ao ano
3. **Você recebe de volta:** R$ 12.100

### Por Que "Fixa"?

Porque você **já sabe no momento da aplicação**:
- ✅ Quanto vai render
- ✅ Quando vai receber
- ✅ Qual o prazo

**Previsibilidade é a vantagem!**

### Tipos de Rendimento

**1. Prefixado**
- Taxa fixa (ex: 12% ao ano)
- Você sabe EXATAMENTE quanto vai receber

**2. Pós-fixado**
- Acompanha um índice (CDI, Selic)
- Exemplo: 100% do CDI
- Varia conforme taxa básica de juros

**3. Híbrido (Inflação +)**
- IPCA + taxa fixa
- Exemplo: IPCA + 5% ao ano
- Protege da inflação!

### Para Quem é Indicado?

✅ Reserva de emergência  
✅ Objetivos de curto/médio prazo  
✅ Perfil conservador  
✅ Aposentados que querem renda previsível  
✅ Diversificação (parte da carteira)

**Renda fixa é a BASE de qualquer carteira!**',

'## Fixed Income: Lending Money to Get It Back with Interest

When you invest in fixed income, you''re **lending money** to someone (bank, government, company) who promises to return it with interest.

### How It Works

1. **You lend:** $2,000
2. **Bank/Government promises:** Return in 2 years at 10% per year
3. **You receive back:** $2,420

### Why "Fixed"?

Because you **already know at application time**:
- ✅ How much it will yield
- ✅ When you''ll receive
- ✅ What''s the term

**Predictability is the advantage!**

### Types of Returns

**1. Fixed Rate**
- Fixed rate (ex: 12% per year)
- You know EXACTLY what you''ll receive

**2. Floating Rate**
- Follows an index (prime rate)
- Example: Prime rate + 1%
- Varies with base interest rate

**3. Inflation-Indexed**
- Inflation + fixed rate
- Example: CPI + 5% per year
- Protects from inflation!

### Who Is It For?

✅ Emergency fund  
✅ Short/medium term goals  
✅ Conservative profile  
✅ Retirees wanting predictable income  
✅ Diversification (part of portfolio)

**Fixed income is the BASE of any portfolio!**'),

('rf_intro', 2, 'Risco de Crédito', 'Credit Risk',
'## Nem Toda Renda Fixa é Igual em Segurança

**Risco de crédito** é o risco de quem te deve **não pagar**.

### Hierarquia de Segurança

**Mais Seguro ⬇️**

1. **Tesouro Direto** (Governo Federal)
   - Risco praticamente ZERO
   - Governo pode imprimir dinheiro

2. **Grandes Bancos** (Itaú, Bradesco, BB)
   - FGC protege até R$ 250 mil
   - Risco muito baixo

3. **Bancos Médios** (Inter, Sofisa, etc)
   - FGC protege até R$ 250 mil
   - Risco baixo

4. **Empresas Grande Porte** (Debêntures)
   - Rating AAA, AA
   - Risco médio-baixo

5. **Empresas Pequeno Porte**
   - Rating B, C
   - Risco ALTO ⚠️

**Mais Arriscado ⬆️**

### FGC: Seu Seguro

**Fundo Garantidor de Créditos** protege até:
- R$ 250.000 por CPF por instituição
- R$ 1.000.000 por CPF no total (limite global)

**Cobertos pelo FGC:**
- CDB
- LCI/LCA
- Poupança

**NÃO cobertos:**
- Tesouro (não precisa, é governo)
- Debêntures (risco próprio)
- Fundos de investimento

### Rentabilidade x Risco

| Investimento | Risco | Rentabilidade |
|--------------|-------|---------------|
| Tesouro | Mínimo | 100% Selic |
| CDB Itaú | Baixo | 90-100% CDI |
| CDB Banco Médio | Baixo | 110-130% CDI |
| Debênture AAA | Médio | IPCA + 6-8% |
| Debênture B | **ALTO** | IPCA + 10-15% |

**Regra:** Mais rentabilidade = mais risco!',

'## Not All Fixed Income Is Equal in Safety

**Credit risk** is the risk of the borrower **not paying**.

### Safety Hierarchy

**Safest ⬇️**

1. **Government Bonds**
   - Virtually ZERO risk
   - Government can print money

2. **Major Banks**
   - FDIC protects up to $250k
   - Very low risk

3. **Medium Banks**
   - FDIC protects up to $250k
   - Low risk

4. **Large Corporations** (Bonds)
   - Rating AAA, AA
   - Medium-low risk

5. **Small Companies**
   - Rating B, C
   - HIGH risk ⚠️

**Riskiest ⬆️**

### FDIC: Your Insurance

**Federal Deposit Insurance** protects up to:
- $250,000 per person per institution
- $500,000 per person total (global limit)

**Covered by FDIC:**
- Bank CDs
- Savings accounts

**NOT covered:**
- Government bonds (don''t need it)
- Corporate bonds (own risk)
- Investment funds

### Return x Risk

| Investment | Risk | Return |
|------------|------|--------|
| Gov Bonds | Minimum | 4-5% |
| Major Bank CD | Low | 4-5% |
| Medium Bank CD | Low | 5-6% |
| AAA Corporate | Medium | 6-8% |
| B Corporate | **HIGH** | 10-15% |

**Rule:** More return = more risk!'),

('rf_intro', 3, 'Marcação a Mercado', 'Mark-to-Market',
'## O "Preço" Dos Títulos Pode Mudar

Mesmo em renda fixa, o **valor de mercado** do título pode oscilar.

### O Que é Marcação a Mercado?

É o valor pelo qual você consegue **vender o título hoje**, antes do vencimento.

### Por Que Isso Acontece?

**Juros sobem** → Títulos antigos valem menos  
**Juros caem** → Títulos antigos valem mais

### Exemplo Prático

Você comprou **Tesouro Prefixado 2028** a 12% ao ano:

**Cenário 1: Juros caem para 10%**
- Seu título de 12% vale MAIS ✅
- Se vender antes, tem LUCRO extra

**Cenário 2: Juros sobem para 14%**
- Seu título de 12% vale MENOS ❌
- Se vender antes, tem PREJUÍZO

**MAS:** Se segurar até o vencimento, recebe os 12% prometidos!

### Como Evitar Marcação a Mercado?

1. ✅ **Segure até o vencimento**
2. ✅ Invista em **Tesouro Selic** (sem marcação)
3. ✅ Invista em **CDB com vencimento próximo**
4. ✅ Não resgate antecipadamente

### Quando Aproveitar?

Se juros CAEM:
- ✅ Venda títulos prefixados (lucro extra)
- ✅ Compre mais títulos (taxa mais baixa)

Se juros SOBEM:
- ✅ Segure títulos antigos
- ✅ Compre novos títulos (taxa mais alta)

**Resumo:** Marcação a mercado só afeta quem vende antes do prazo!',

'## Bond "Prices" Can Change

Even in fixed income, the **market value** of bonds can fluctuate.

### What is Mark-to-Market?

It''s the value you''d get if you **sell the bond today**, before maturity.

### Why Does This Happen?

**Interest rates rise** → Old bonds worth less  
**Interest rates fall** → Old bonds worth more

### Practical Example

You bought **10-year bond** at 5% per year:

**Scenario 1: Rates drop to 3%**
- Your 5% bond is worth MORE ✅
- If you sell early, you profit extra

**Scenario 2: Rates rise to 7%**
- Your 5% bond is worth LESS ❌
- If you sell early, you lose

**BUT:** If you hold until maturity, you get the promised 5%!

### How to Avoid Mark-to-Market?

1. ✅ **Hold until maturity**
2. ✅ Invest in **floating rate bonds**
3. ✅ Invest in **short-term CDs**
4. ✅ Don''t redeem early

### When to Take Advantage?

If rates FALL:
- ✅ Sell fixed bonds (extra profit)
- ✅ Buy more bonds (lower rate)

If rates RISE:
- ✅ Hold old bonds
- ✅ Buy new bonds (higher rate)

**Summary:** Mark-to-market only affects early sellers!');

-- Quizzes for rf_intro
INSERT INTO tree_quizzes (node_key, question_order, question_pt, question_en, options_pt, options_en, correct_index, explanation_pt, explanation_en) VALUES
('rf_intro', 1,
'O que você faz ao investir em renda fixa?',
'What do you do when investing in fixed income?',
'["Compra ações", "Empresta dinheiro", "Compra imóveis", "Compra ouro"]'::jsonb,
'["Buy stocks", "Lend money", "Buy real estate", "Buy gold"]'::jsonb,
1,
'Em renda fixa, você empresta dinheiro para o governo, bancos ou empresas, que prometem devolver com juros.',
'In fixed income, you lend money to government, banks, or companies, who promise to return it with interest.'),

('rf_intro', 2,
'Qual tipo de renda fixa protege contra inflação?',
'Which type of fixed income protects against inflation?',
'["Prefixado", "Pós-fixado CDI", "IPCA+", "Poupança"]'::jsonb,
'["Fixed rate", "Floating prime rate", "Inflation-indexed", "Savings"]'::jsonb,
2,
'Títulos IPCA+ rendem inflação + taxa fixa, garantindo ganho real acima da inflação.',
'Inflation-indexed bonds yield inflation + fixed rate, guaranteeing real gains above inflation.'),

('rf_intro', 3,
'Qual investimento tem MENOR risco de crédito?',
'Which investment has LOWEST credit risk?',
'["Debênture", "CDB banco pequeno", "Tesouro Direto", "LCI"]'::jsonb,
'["Corporate bond", "Small bank CD", "Government bonds", "Mortgage bond"]'::jsonb,
2,
'Tesouro Direto é emitido pelo Governo Federal, que tem poder de imprimir moeda - risco praticamente zero.',
'Government bonds are issued by the Federal Government, which has power to print money - virtually zero risk.'),

('rf_intro', 4,
'Até quanto o FGC garante por CPF por instituição?',
'How much does FDIC guarantee per person per institution?',
'["R$ 100.000", "R$ 250.000", "R$ 500.000", "R$ 1.000.000"]'::jsonb,
'["$100,000", "$250,000", "$500,000", "$1,000,000"]'::jsonb,
1,
'O FGC (Fundo Garantidor de Créditos) garante até R$ 250.000 por CPF por instituição financeira.',
'FDIC (Federal Deposit Insurance Corporation) guarantees up to $250,000 per person per financial institution.'),

('rf_intro', 5,
'Marcação a mercado afeta quem?',
'Mark-to-market affects whom?',
'["Todos sempre", "Quem vende antes do vencimento", "Apenas fundos", "Ninguém"]'::jsonb,
'["Everyone always", "Those who sell before maturity", "Only funds", "Nobody"]'::jsonb,
1,
'Marcação a mercado só afeta quem vende o título antes do vencimento. Se segurar até o fim, recebe o rendimento prometido.',
'Mark-to-market only affects those who sell before maturity. If held until maturity, you receive the promised yield.');

-- Log completion
DO $$
BEGIN
    RAISE NOTICE 'Completed: fund_taxes, rf_intro';
    RAISE NOTICE 'Progress: 18 lessons, 25 quizzes';
END $$;
