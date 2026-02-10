-- Seed Data: Savings, Treasury, and Selic Bond Content
-- Description: rf_savings, rf_treasury, rf_selic nodes
-- Date: 2026-02-08

-- ============================================
-- NODE: rf_savings (Poupança)
-- ============================================

INSERT INTO tree_lessons (node_key, lesson_order, title_pt, title_en, content_pt, content_en) VALUES
('rf_savings', 1, 'Como Funciona a Poupança', 'How Savings Works',
'## A Poupança: O Investimento Mais Popular do Brasil

**70% dos brasileiros** usam poupança, mas será que é a melhor opção?

### Rentabilidade

**Quando Selic > 8,5% ao ano:**
- 0,5% ao mês + TR (Taxa Referencial)

**Quando Selic ≤ 8,5% ao ano:**
- 70% da Selic + TR

**TR hoje:** Praticamente ZERO (0,00%)

### Exemplo Prático

Com Selic a 13% ao ano:
- Poupança rende: 0,5% ao mês = **~6,17% ao ano**
- Tesouro Selic rende: **~13% ao ano**

**Diferença:** Você perde 6,83% por ano na poupança!

### Em R$ 10.000 por 1 ano:

| Investimento | Rendimento |
|--------------|------------|
| Poupança | R$ 617 |
| Tesouro Selic | R$ 1.300 |
| **Diferença** | **R$ 683 perdidos!** |

### Vantagens da Poupança ✅

1. **Liquidez imediata** (saque a qualquer hora)
2. **Isento de IR**
3. **FGC até R$ 250k** (protegido)
4. **Simplicidade** (todo mundo conhece)

### Desvantagens da Poupança ❌

1. **Baixíssima rentabilidade**
2. **Perde para inflação** facilmente
3. **Aniversário** (só conta no dia do mês)
4. **Perde para qualquer outra renda fixa**

### Aniversário da Poupança

Se você deposita R$ 1.000 dia 10:
- Rendimento conta apenas dia 10 de cada mês
- Se sacar dia 9: perde TODO o rendimento do mês!

**Tesouro Selic:** Rende TODOS os dias!

### Quando Usar Poupança?

✅ Você tem MUITO pouco dinheiro (< R$ 500)  
✅ Não sabe usar internet  
✅ Quer acesso pelo caixa eletrônico

**Para todos os outros:** Tesouro Selic é melhor!',

'## Savings: Brazil''s Most Popular Investment

**70% of Brazilians** use savings accounts, but is it the best option?

### Returns

**When prime > 8.5% per year:**
- 0.5% per month + ref rate

**When prime ≤ 8.5% per year:**
- 70% of prime + ref rate

**Ref rate today:** Practically ZERO (0.00%)

### Practical Example

With prime at 13% per year:
- Savings yields: 0.5% per month = **~6.17% per year**
- Treasury yields: **~13% per year**

**Difference:** You lose 6.83% per year in savings!

### With $2,000 for 1 year:

| Investment | Return |
|------------|--------|
| Savings | $123 |
| Treasury bonds | $260 |
| **Difference** | **$137 lost!** |

### Savings Advantages ✅

1. **Immediate liquidity** (withdraw anytime)
2. **Tax-free**
3. **FDIC up to $250k** (insured)
4. **Simplicity** (everyone knows it)

### Savings Disadvantages ❌

1. **Very low returns**
2. **Loses to inflation** easily
3. **Anniversary** (counts only on month day)
4. **Loses to any other fixed income**

### Savings Anniversary

If you deposit $1,000 on the 10th:
- Return counts only on 10th of each month
- If withdraw on 9th: lose ALL month''s return!

**Treasury bonds:** Yield EVERY day!

### When to Use Savings?

✅ You have VERY little money (< $100)  
✅ Don''t know how to use internet  
✅ Want ATM access

**For everyone else:** Treasury bonds are better!'),

('rf_savings', 2, 'Poupança vs Tesouro Selic', 'Savings vs Treasury Bonds',
'## A Batalha dos Investimentos Seguros

Ambos têm liquidez e segurança, mas um é MUITO superior!

### Comparação Direta

| Aspecto | Poupança | Tesouro Selic |
|---------|----------|---------------|
| **Rentabilidade** | ~6% ao ano | ~13% ao ano ✅ |
| **Segurança** | FGC R$ 250k | Governo (máxima) ✅ |
| **Liquidez** | Imediata | D+1 (1 dia) ✅ |
| **IR** | Isento ✅ | 15-22,5% |
| **Começo** | R$ 1 | R$ 30 |
| **Rende todo dia** | ❌ Só aniversário | ✅ Todos os dias |
| **Facilidade** | Muito fácil | Fácil |

### Cálculo com IR do Tesouro

R$ 10.000 por 2 anos:

**Poupança:**
- Rendimento bruto: R$ 1.268
- IR: R$ 0 (isento)
- **Líquido: R$ 1.268**

**Tesouro Selic:**
- Rendimento bruto: R$ 2.769
- IR (15% após 2 anos): R$ 415
- **Líquido: R$ 2.354**

**Tesouro ganha por R$ 1.086!** (85% a mais) 🎉

### Por que 85% a mais?

Mesmo pagando IR, Tesouro:
- Rende MUITO mais
- Rende todos os dias
- Acompanha a Selic 100%

### Mito: "Poupança é isenta, logo melhor"

**Falso!** Isenção de nada não vale nada.

Prefere:
- R$ 1.000 isento, ou
- R$ 2.000 com 15% IR (= R$ 1.700)?

**Óbvio:** R$ 1.700 > R$ 1.000!

### Quando Poupança Empata?

Só se Selic cair para ~4-5% ao ano (improvável).

Mesmo assim, Tesouro ainda seria melhor por render todo dia!

**Conclusão:** Tesouro Selic > Poupança em 99% dos casos!',

'## The Battle of Safe Investments

Both have liquidity and safety, but one is MUCH superior!

### Direct Comparison

| Aspect | Savings | Treasury Bonds |
|--------|---------|----------------|
| **Returns** | ~2-3% year | ~5% year ✅ |
| **Safety** | FDIC $250k | Government (maximum) ✅ |
| **Liquidity** | Immediate | T+1 (1 day) ✅ |
| **Tax** | Free ✅ | 10-15% |
| **Start** | $1 | $25 |
| **Yields daily** | ❌ Monthly | ✅ Every day |
| **Ease** | Very easy | Easy |

### Calculation with Treasury Tax

$2,000 for 2 years:

**Savings:**
- Gross return: $120
- Tax: $0 (exempt)
- **Net: $120**

**Treasury:**
- Gross return: $205
- Tax (15% after 2 years): $31
- **Net: $174**

**Treasury wins by $54!** (45% more) 🎉

### Why 45% more?

Even paying tax, Treasury:
- Yields MUCH more
- Yields every day
- Follows prime 100%

### Myth: "Savings is tax-free, so better"

**False!** Exemption on nothing is worth nothing.

Prefer:
- $100 tax-free, or
- $200 with 15% tax (= $170)?

**Obviously:** $170 > $100!

### When Does Savings Tie?

Only if prime drops to ~2% per year (unlikely).

Even then, Treasury still better for daily yields!

**Conclusion:** Treasury > Savings in 99% of cases!'),

('rf_savings', 3, 'Alternativas Melhores que Poupança', 'Better Alternatives to Savings',
'## Se Você Ainda Usa Poupança, Migre Agora!

Existem opções **tão seguras quanto** e que rendem **2x mais**!

### Reserva de Emergência

**❌ Ruim: Poupança** (6% ao ano)

**✅ BOM:**
1. **Tesouro Selic** (13% ao ano, D+1)
2. **Nubank CDB 100% CDI** (13% ao ano, liquidez diária)
3. **Banco Inter CDB 100% CDI** (13% ao ano)

### Guardando para Viagem (6-12 meses)

**❌ Ruim: Poupança**

**✅ BOM:**
1. **CDB 110-120% CDI** (corretoras)
2. **Tesouro Prefixado** (se taxa boa)
3. **LCI/LCA** (isento + rende mais)

### Aposentadoria dos Pais

**❌ Ruim: Poupança**

**✅ BOM:**
1. **Tesouro IPCA+** (protege da inflação)
2. **CDB longo prazo** (120% CDI+)
3. **Previdência VGBL** (se deduz IR)

### Como Migrar da Poupança?

**Passo 1:** Abra conta em corretora gratuita
- Nu Invest
- Clear
- Rico
- XP

**Passo 2:** Transfira da poupança para conta corrente

**Passo 3:** Da conta corrente para corretora (TED)

**Passo 4:** Invista em Tesouro Selic

**Tempo total:** 30 minutos 

**Ganho extra:** +R$ 700/ano para cada R$ 10.000

**Por ano:** Se tem R$ 50.000 = **+R$ 3.500/ano** só mudando!

### Não Tenha Medo!

✅ Tesouro é TÃO seguro quanto poupança  
✅ Liquidez é praticamente igual (D+1 vs imediata)  
✅ FGC também protege CDB  
✅ Corretoras são reguladas pela CVM

**Única diferença:** Você ganha MUITO mais!',

'## If You Still Use Savings, Switch Now!

There are options **just as safe** that yield **2x more**!

### Emergency Fund

**❌ Bad: Savings** (2-3% per year)

**✅ GOOD:**
1. **Treasury bonds** (5% per year, T+1)
2. **High-yield savings** (4-5% per year)
3. **Money market funds** (4-5%)

### Saving for Trip (6-12 months)

**❌ Bad: Regular savings**

**✅ GOOD:**
1. **CDs 5-6%** (banks)
2. **Short-term bonds**
3. **Tax-free municipal bonds**

### Retirement

**❌ Bad: Savings**

**✅ GOOD:**
1. **Inflation-protected bonds** 
2. **Long-term CDs** (better rates)
3. **401k/IRA** (tax advantages)

### How to Switch from Savings?

**Step 1:** Open account in brokerage
- Low-fee brokers
- Online brokers
- Discount brokers

**Step 2:** Transfer from savings to checking

**Step 3:** From checking to brokerage (wire)

**Step 4:** Invest in treasury bonds

**Total time:** 30 minutes 

**Extra gain:** +$140/year per $2,000

**Per year:** If you have $10,000 = **+$700/year** just by switching!

### Don''t Be Afraid!

✅ Treasury is AS safe as savings  
✅ Liquidity is virtually same (T+1 vs immediate)  
✅ FDIC also protects CDs  
✅ Brokerages are regulated

**Only difference:** You earn MUCH more!');

-- Quizzes for rf_savings
INSERT INTO tree_quizzes (node_key, question_order, question_pt, question_en, options_pt, options_en, correct_index, explanation_pt, explanation_en) VALUES
('rf_savings', 1,
'Quanto rende a poupança quando Selic > 8,5%?',
'How much does savings yield when prime > 8.5%?',
'["1% ao mês", "0,5% ao mês + TR", "100% da Selic", "70% da Selic"]'::jsonb,
'["1% per month", "0.5% per month + ref rate", "100% of prime", "70% of prime"]'::jsonb,
1,
'Quando Selic está acima de 8,5% ao ano, a poupança rende 0,5% ao mês + TR (que hoje é praticamente zero).',
'When prime is above 8.5% per year, savings yields 0.5% per month + ref rate (which today is practically zero).'),

('rf_savings', 2,
'O que é "aniversário da poupança"?',
'What is savings "anniversary"?',
'["Festa do banco", "Rendimento só conta no dia do mês do depósito", "Bonus anual", "Não existe"]'::jsonb,
'["Bank party", "Yield only counts on deposit day of month", "Annual bonus", "It doesn''t exist"]'::jsonb,
1,
'Aniversário da poupança significa que o rendimento só é creditado no mesmo dia do mês em que foi feito o depósito. Se sacar antes, perde o rendimento.',
'Savings anniversary means yield is only credited on the same day of the month the deposit was made. If withdrawn before, you lose the yield.'),

('rf_savings', 3,
'Por que Tesouro Selic é melhor que poupança?',
'Why is Treasury better than savings?',
'["Rende mais e todos os dias", "É internacional", "Paga dividendos", "Não paga imposto"]'::jsonb,
'["Yields more and every day", "It''s international", "Pays dividends", "No tax"]'::jsonb,
0,
'Tesouro Selic rende aproximadamente o dobro da poupança e credita rendimentos TODOS os dias, não apenas no aniversário.',
'Treasury bonds yield approximately double savings and credit yields EVERY day, not just on anniversary.'),

('rf_savings', 4,
'Qual a principal vantagem da poupança?',
'What is the main advantage of savings?',
'["Alta rentabilidade", "Proteção contra inflação", "Simplicidade e conhecimento popular", "Rende mais que Tesouro"]'::jsonb,
'["High returns", "Inflation protection", "Simplicity and popular knowledge", "Yields more than Treasury"]'::jsonb,
2,
'A principal vantagem da poupança é a simplicidade - todo mundo conhece e sabe usar. Mas em termos de rentabilidade, está longe de ser a melhor opção.',
'The main advantage of savings is simplicity - everyone knows and can use it. But in terms of returns, it''s far from the best option.'),

('rf_savings', 5,
'Com R$ 10.000 por 2 anos, Tesouro Selic rende quanto a mais que poupança?',
'With $2,000 for 2 years, how much more does Treasury yield than savings?',
'["Igual", "R$ 500 a mais", "R$ 1.000+ a mais", "Poupança rende mais"]'::jsonb,
'["Same", "$100 more", "$200+ more", "Savings yields more"]'::jsonb,
2,
'Mesmo descontando o IR, Tesouro Selic rende aproximadamente R$ 1.000 a mais que a poupança em 2 anos com R$ 10.000 investidos.',
'Even discounting tax, Treasury yields approximately $200 more than savings in 2 years with $2,000 invested.');

-- ============================================
-- NODE: rf_treasury (Tesouro Direto)
-- ============================================

INSERT INTO tree_lessons (node_key, lesson_order, title_pt, title_en, content_pt, content_en) VALUES
('rf_treasury', 1, 'O Que é Tesouro Direto', 'What is Direct Treasury',
'## Empreste para Quem Nunca Quebra: O Governo

Tesouro Direto é um programa do Tesouro Nacional que permite você **emprestar dinheiro para o governo brasileiro**.

### Como Funciona

1. Governo precisa de dinheiro (obras, educação, saúde)
2. Emite títulos públicos
3. Você compra esses títulos
4. Governo promete devolver com juros

### Por Que é Tão Seguro?

Governo Federal:
- ✅ Pode criar leis
- ✅ Pode aumentar impostos
- ✅ Pode emitir moeda (em último caso)
- ✅ Nunca deu calote em Reais

**Risco:** Praticamente ZERO!

### Tipos de Tesouro

| Título | Rendimento | Indicado Para |
|--------|------------|---------------|
| **Tesouro Selic** | 100% da Selic | Emergência, curto prazo |
| **Tesouro Prefixado** | Taxa fixa (ex: 12% aa) | Médio prazo, certeza |
| **Tesouro IPCA+** | Inflação + taxa | Longo prazo, aposentadoria |

### Quanto Custa?

**Mínimo:** R$ 30 (0,01 título) ✅  
**Máximo:** R$ 1 milhão por mês

Acessível para QUALQUER pessoa!

### Taxas

1. **Taxa da B3:** 0,20% ao ano sobre saldo
   - Cobrada semestralmente
   - Isenta para Tesouro Selic até R$ 10.000

2. **Corretagem:** R$ 0 (maioria das corretoras)

3. **IR:** Tabela regressiva (15-22,5%)

### Liquidez

✅ **D+1:** Dinheiro cai na conta em 1 dia útil  
✅ **Sem penalty:** Governo sempre recompra  
✅ **Qualquer dia:** Pode vender quando quiser

Quase tão líquido quanto poupança!

### Como Investir?

**Passo 1:** Ter CPF e conta em banco

**Passo 2:** Abrir conta em corretora (grátis)

**Passo 3:** Cadastro no Tesouro (automático)

**Passo 4:** Transferir dinheiro e comprar

**Tempo:** 15 minutos no total!

**Sites:**
- www.tesourodireto.com.br
- Ou direto pela corretora',

'## Lend to Who Never Defaults: The Government

Direct Treasury is a program that allows you to **lend money to the government**.

### How It Works

1. Government needs money (infrastructure, education, health)
2. Issues public bonds
3. You buy those bonds
4. Government promises to return with interest

### Why Is It So Safe?

Federal Government:
- ✅ Can create laws
- ✅ Can raise taxes
- ✅ Can issue currency (last resort)
- ✅ Never defaulted on local currency

**Risk:** Practically ZERO!

### Types of Bonds

| Bond | Yield | Recommended For |
|------|-------|-----------------|
| **Floating Rate** | 100% of prime | Emergency, short-term |
| **Fixed Rate** | Fixed (ex: 5% pa) | Medium-term, certainty |
| **Inflation-Protected** | Inflation + rate | Long-term, retirement |

### How Much Does It Cost?

**Minimum:** $25 (0.01 bond) ✅  
**Maximum:** $200k per month

Accessible for ANYONE!

### Fees

1. **Exchange fee:** 0.20% per year on balance
   - Charged semi-annually
   - Exempt for some bonds up to $2k

2. **Brokerage:** $0 (most brokers)

3. **Tax:** Progressive table (10-15%)

### Liquidity

✅ **T+1:** Money in account in 1 business day  
✅ **No penalty:** Government always rebuys  
✅ **Any day:** Can sell anytime

Almost as liquid as savings!

### How to Invest?

**Step 1:** Have SSN and bank account

**Step 2:** Open brokerage account (free)

**Step 3:** Treasury registration (automatic)

**Step 4:** Transfer money and buy

**Time:** 15 minutes total!

**Sites:**
- www.treasurydirect.gov
- Or directly through broker'),

('rf_treasury', 2, 'Vantagens do Tesouro Direto', 'Treasury Advantages',
'## Por Que TODO Investidor Deveria Ter Tesouro

Tesouro Direto é a BASE de qualquer carteira de investimentos!

### 1. Segurança Máxima 🛡️

**Mais seguro que:**
- Poupança (FGC até R$ 250k)
- CDB (FGC até R$ 250k)
- Debêntures (risco corporativo)

**Tesouro:** Garantido pelo Governo Federal!

### 2. Rentabilidade Superior 📈

**Comparação 10 anos:**

| Investimento | R$ 10.000 vira... |
|--------------|-------------------|
| Poupança (6% aa) | R$ 17.908 |
| Tesouro Selic (13% aa) | R$ 33.946 |
| **Diferença** | **R$ 16.038!** |

### 3. Acessibilidade 💰

- Começa com R$ 30
- Não precisa ser rico
- Qualquer pessoa pode investir

### 4. Liquidez Excelente 💧

- Venda a qualquer momento
- Dinheiro em D+1
- Sem penalidades

### 5. Variedade de Opções 🎯

**Curto prazo:**
- Tesouro Selic

**Médio prazo:**
- Tesouro Prefixado

**Longo prazo:**
- Tesouro IPCA+

### 6. Transparência 📊

- Preços atualizados diariamente
- Site oficial do governo
- Sem surpresas

### 7. Sem Conflito de Interesses ❤️

**Banco vendendo CDB:**
- ❌ Quer vender o dele (mais taxa)

**Corretora vendendo Tesouro:**
- ✅ Produto do governo (sem viés)

### 8. Proteção Contra Inflação

**Tesouro IPCA+:**
- Garante ganho REAL
- Seu dinheiro sempre compra mais
- Ideal para aposentadoria

### 9. Simplicidade 🎈

- Compra em 3 cliques
- Não precisa acompanhar mercado
- Set and forget

### 10. Complementa Qualquer Estratégia

**Conservador:** 80% Tesouro  
**Moderado:** 40% Tesouro  
**Arrojado:** 20% Tesouro (emergência)

**Todo mundo** precisa de Tesouro!

### Desvantagens?

Poucas, mas existem:

❌ IR (mas rentabilidade compensa)  
❌ Taxa B3 0,20% (mas mínima)  
❌ Requer internet (maioria tem)

**Vantagens >>> Desvantagens**',

'## Why EVERY Investor Should Have Treasury Bonds

Direct Treasury is the BASE of any investment portfolio!

### 1. Maximum Safety 🛡️

**Safer than:**
- Savings (FDIC up to $250k)
- Bank CDs (FDIC up to $250k)
- Corporate bonds (company risk)

**Treasury:** Guaranteed by Federal Government!

### 2. Superior Returns 📈

**10-year comparison:**

| Investment | $2,000 becomes... |
|------------|-------------------|
| Savings (3% pa) | $2,688 |
| Treasury (5% pa) | $3,258 |
| **Difference** | **$570!** |

### 3. Accessibility 💰

- Starts at $25
- Don''t need to be rich
- Anyone can invest

### 4. Excellent Liquidity 💧

- Sell anytime
- Money in T+1
- No penalties

### 5. Variety of Options 🎯

**Short-term:**
- Floating rate bonds

**Medium-term:**
- Fixed rate bonds

**Long-term:**
- Inflation-protected bonds

### 6. Transparency 📊

- Prices updated daily
- Official government site
- No surprises

### 7. No Conflict of Interest ❤️

**Bank selling CDs:**
- ❌ Wants to sell theirs (more fees)

**Broker selling Treasury:**
- ✅ Government product (unbiased)

### 8. Inflation Protection

**Inflation bonds:**
- Guarantee REAL gain
- Your money always buys more
- Ideal for retirement

### 9. Simplicity 🎈

- Buy in 3 clicks
- Don''t need to follow market
- Set and forget

### 10. Complements Any Strategy

**Conservative:** 80% Treasury  
**Moderate:** 40% Treasury  
**Aggressive:** 20% Treasury (emergency)

**Everyone** needs Treasury!

### Disadvantages?

Few, but exist:

❌ Tax (but yield compensates)  
❌ Exchange fee 0.20% (but minimal)  
❌ Requires internet (most have)

**Advantages >>> Disadvantages**'),

('rf_treasury', 3, 'Como Escolher o Tesouro Certo', 'How to Choose the Right Treasury',
'## Cada Objetivo, Um Tesouro Diferente

Não existe "melhor Tesouro" - existe o **certo para você**!

### Decisão 1: Qual o Prazo?

**Curto Prazo (< 2 anos):**  
→ **Tesouro Selic**

**Médio Prazo (2-5 anos):**  
→ **Tesouro Prefixado** ou **IPCA+**

**Longo Prazo (> 5 anos):**  
→ **Tesouro IPCA+**

### Decisão 2: Pode Perder Valor Temporariamente?

**NÃO, preciso do dinheiro certinho:**  
→ **Tesouro Selic**

**SIM, só vou resgatar no vencimento:**  
→ **Tesouro Prefixado** ou **IPCA+**

### Decisão 3: Que Tipo de Proteção Quer?

**Juros altos hoje:**  
→ **Tesouro Prefixado** (trava taxa boa)

**Inflação alta:**  
→ **Tesouro IPCA+** (protege)

**Tanto faz:**  
→ **Tesouro Selic** (acompanha tudo)

### Exemplos Práticos

**Reserva de Emergência:**
- **Escolha:** Tesouro Selic 2029
- **Por quê:** Liquidez D+1, sem marcação

**Casamento em 3 anos:**
- **Escolha:** Tesouro Prefixado 2027
- **Por quê:** Sabe exatamente quanto terá

**Aposentadoria em 20 anos:**
- **Escolha:** Tesouro IPCA+ 2045
- **Por quê:** Protege da inflação no longo prazo

**Meta de R$ 50k em 5 anos:**
- **Escolha:** Tesouro IPCA+ 2029
- **Por quê:** Garante ganho real

### Estratégia Híbrida

**Carteira Ideal de Tesouro:**

| Objetivo | Título | % |
|----------|--------|---|
| Emergência | Tesouro Selic | 30% |
| Médio prazo | Prefixado | 30% |
| Aposentadoria | IPCA+ | 40% |

**Diversificação** dentro da própria renda fixa!

### Erros Comuns

❌ **Erro 1:** Só Tesouro Selic  
- Perde ganhos maiores do prefixado

❌ **Erro 2:** Só Tesouro Prefixado  
- Risco de marcação se precisar sacar

❌ **Erro 3:** Ignorar o prazo  
- Comprar IPCA+ 2045 para usar em 2 anos

✅ **CERTO:** Diversificar conforme objetivos!',

'## Each Goal, A Different Bond

There''s no "best Treasury" - there''s the **right one for you**!

### Decision 1: What''s the Timeline?

**Short Term (< 2 years):**  
→ **Floating Rate Bonds**

**Medium Term (2-5 years):**  
→ **Fixed Rate** or **Inflation Bonds**

**Long Term (> 5 years):**  
→ **Inflation-Protected Bonds**

### Decision 2: Can You Lose Value Temporarily?

**NO, need guaranteed amount:**  
→ **Floating Rate Bonds**

**YES, will only redeem at maturity:**  
→ **Fixed Rate** or **Inflation Bonds**

### Decision 3: What Protection Do You Want?

**High rates today:**  
→ **Fixed Rate** (lock good rate)

**High inflation:**  
→ **Inflation Bonds** (protect)

**Either way:**  
→ **Floating Rate** (follows everything)

### Practical Examples

**Emergency Fund:**
- **Choice:** Short-term floating bonds
- **Why:** T+1 liquidity, no mark-to-market

**Wedding in 3 years:**
- **Choice:** 3-year fixed bond
- **Why:** Know exactly what you''ll have

**Retirement in 20 years:**
- **Choice:** 20-year inflation bond
- **Why:** Protects from long-term inflation

**Goal of $10k in 5 years:**
- **Choice:** 5-year inflation bond
- **Why:** Guarantees real gain

### Hybrid Strategy

**Ideal Treasury Portfolio:**

| Goal | Bond | % |
|------|------|---|
| Emergency | Floating | 30% |
| Medium-term | Fixed | 30% |
| Retirement | Inflation | 40% |

**Diversification** within fixed income itself!

### Common Mistakes

❌ **Mistake 1:** Only floating bonds  
- Miss higher fixed gains

❌ **Mistake 2:** Only fixed bonds  
- Mark-to-market risk if need to withdraw

❌ **Mistake 3:** Ignore timeline  
- Buy 20-year bond to use in 2 years

✅ **RIGHT:** Diversify by goals!');

-- Log completion
DO $$
BEGIN
    RAISE NOTICE 'Completed: rf_savings, rf_treasury (partial - need rf_selic, rf_prefixed, rf_ipca)';
    RAISE NOTICE 'Progress: 24 lessons, 30 quizzes';
END $$;
