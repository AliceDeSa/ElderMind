-- ============================================
-- WISDOM LIBRARY SEED DATA
-- 15 Classic Investment Books + 180 Excerpts
-- ============================================

-- ============================================
-- PART 1: BOOKS (15 total)
-- ============================================

INSERT INTO wisdom_books (
  book_key, title_pt, title_en, author, category,
  description_pt, description_en,
  cover_color, icon, year_published, is_active
) VALUES

-- VALUE INVESTING (5 books)
(
  'intelligent_investor',
  'O Investidor Inteligente',
  'The Intelligent Investor',
  'Benjamin Graham',
  'value_investing',
  'Considerado a "bíblia" dos investidores em valor, este livro ensina os princípios fundamentais de investimento seguro e lucrativo através da análise fundamentalista.',
  'Considered the "bible" of value investors, this book teaches the fundamental principles of safe and profitable investing through fundamental analysis.',
  '#1E40AF',
  '📘',
  1949,
  true
),
(
  'security_analysis',
  'Análise de Valores Mobiliários',
  'Security Analysis',
  'Benjamin Graham & David Dodd',
  'value_investing',
  'O texto definitivo sobre análise de investimentos, fornecendo ferramentas práticas para avaliar ações, títulos e outros valores mobiliários.',
  'The definitive text on investment analysis, providing practical tools for evaluating stocks, bonds, and other securities.',
  '#2563EB',
  '📊',
  1934,
  true
),
(
  'common_stocks_uncommon_profits',
  'Ações Comuns, Lucros Extraordinários',
  'Common Stocks and Uncommon Profits',
  'Philip Fisher',
  'value_investing',
  'Fisher apresenta sua filosofia de investimento focada em empresas de crescimento de alta qualidade e a importância de conhecer profundamente o negócio.',
  'Fisher presents his investment philosophy focused on high-quality growth companies and the importance of deeply understanding the business.',
  '#3B82F6',
  '📈',
  1958,
  true
),
(
  'one_up_on_wall_street',
  'O Jeito Peter Lynch de Investir',
  'One Up On Wall Street',
  'Peter Lynch',
  'value_investing',
  'O lendário gestor do Fidelity Magellan Fund compartilha suas estratégias para encontrar ações vencedoras através da observação do dia a dia.',
  'The legendary Fidelity Magellan Fund manager shares his strategies for finding winning stocks through everyday observation.',
  '#60A5FA',
  '🎯',
  1989,
  true
),
(
  'essays_warren_buffett',
  'Os Ensaios de Warren Buffett',
  'The Essays of Warren Buffett',
  'Warren Buffett',
  'value_investing',
  'Compilação das cartas aos acionistas da Berkshire Hathaway, revelando a sabedoria e filosofia de investimento do maior investidor de todos os tempos.',
  'Compilation of Berkshire Hathaway shareholder letters, revealing the wisdom and investment philosophy of the greatest investor of all time.',
  '#1D4ED8',
  '💎',
  1997,
  true
),

-- PERSONAL FINANCE (4 books)
(
  'rich_dad_poor_dad',
  'Pai Rico, Pai Pobre',
  'Rich Dad Poor Dad',
  'Robert Kiyosaki',
  'personal_finance',
  'Um clássico sobre educação financeira que contrasta as mentalidades de dois pais e ensina a importância dos ativos versus passivos.',
  'A classic on financial education that contrasts the mindsets of two fathers and teaches the importance of assets versus liabilities.',
  '#059669',
  '💰',
  1997,
  true
),
(
  'richest_man_babylon',
  'O Homem Mais Rico da Babilônia',
  'The Richest Man in Babylon',
  'George S. Clason',
  'personal_finance',
  'Através de parábolas da antiga Babilônia, este livro ensina princípios atemporais de acumulação de riqueza e gestão financeira.',
  'Through parables from ancient Babylon, this book teaches timeless principles of wealth accumulation and financial management.',
  '#10B981',
  '🏛️',
  1926,
  true
),
(
  'your_money_your_life',
  'Dinheiro e Vida',
  'Your Money or Your Life',
  'Vicki Robin & Joe Dominguez',
  'personal_finance',
  'Um programa transformador de nove passos para alcançar independência financeira através da mudança de relacionamento com o dinheiro.',
  'A transformative nine-step program for achieving financial independence by changing your relationship with money.',
  '#34D399',
  '🌱',
  1992,
  true
),
(
  'millionaire_next_door',
  'O Milionário Mora ao Lado',
  'The Millionaire Next Door',
  'Thomas J. Stanley & William D. Danko',
  'personal_finance',
  'Pesquisa reveladora sobre os hábitos e características dos milionários americanos, desmistificando o estilo de vida dos ricos.',
  'Revealing research on the habits and characteristics of American millionaires, demystifying the lifestyle of the wealthy.',
  '#6EE7B7',
  '🏡',
  1996,
  true
),

-- STRATEGY & PSYCHOLOGY (6 books)
(
  'thinking_fast_slow',
  'Rápido e Devagar',
  'Thinking, Fast and Slow',
  'Daniel Kahneman',
  'strategy_psychology',
  'Prêmio Nobel explora os dois sistemas de pensamento e como vieses cognitivos afetam nossas decisões financeiras e de investimento.',
  'Nobel laureate explores the two systems of thinking and how cognitive biases affect our financial and investment decisions.',
  '#7C3AED',
  '🧠',
  2011,
  true
),
(
  'black_swan',
  'A Lógica do Cisne Negro',
  'The Black Swan',
  'Nassim Nicholas Taleb',
  'strategy_psychology',
  'Explora o impacto de eventos raros e imprevisíveis e como nos preparar para o inesperado nos mercados e na vida.',
  'Explores the impact of rare and unpredictable events and how to prepare for the unexpected in markets and life.',
  '#8B5CF6',
  '🦢',
  2007,
  true
),
(
  'random_walk_wall_street',
  'Um Passeio Aleatório por Wall Street',
  'A Random Walk Down Wall Street',
  'Burton G. Malkiel',
  'strategy_psychology',
  'Defende a hipótese do mercado eficiente e apresenta argumentos convincentes para investimento passivo em fundos de índice.',
  'Defends the efficient market hypothesis and presents compelling arguments for passive investing in index funds.',
  '#A78BFA',
  '🎲',
  1973,
  true
),
(
  'against_the_gods',
  'Contra os Deuses',
  'Against the Gods',
  'Peter L. Bernstein',
  'strategy_psychology',
  'A fascinante história do risco e como a humanidade aprendeu a dominar a incerteza através da matemática e probabilidade.',
  'The fascinating history of risk and how humanity learned to master uncertainty through mathematics and probability.',
  '#C084FC',
  '⚡',
  1996,
  true
),
(
  'psychology_of_money',
  'A Psicologia do Dinheiro',
  'The Psychology of Money',
  'Morgan Housel',
  'strategy_psychology',
  'Lições atemporais sobre riqueza, ganância e felicidade, explorando como o comportamento importa mais que inteligência em finanças.',
  'Timeless lessons on wealth, greed, and happiness, exploring how behavior matters more than intelligence in finance.',
  '#D97706',
  '💭',
  2020,
  true
),
(
  'fooled_by_randomness',
  'Iludido pelo Acaso',
  'Fooled by Randomness',
  'Nassim Nicholas Taleb',
  'strategy_psychology',
  'Examina o papel da sorte nos mercados financeiros e na vida, e como frequentemente confundimos habilidade com aleatoriedade.',
  'Examines the role of luck in financial markets and life, and how we often confuse skill with randomness.',
  '#F59E0B',
  '🎰',
  2001,
  true
);

-- ============================================
-- PART 2: EXCERPTS - The Intelligent Investor
-- ============================================

INSERT INTO wisdom_excerpts (
  book_key, excerpt_order,
  title_pt, title_en,
  content_pt, content_en,
  page_reference,
  key_takeaway_pt, key_takeaway_en
) VALUES

-- Book 1: The Intelligent Investor (12 excerpts)
(
  'intelligent_investor', 1,
  'Investimento vs. Especulação',
  'Investment vs. Speculation',
  'Uma operação de investimento é aquela que, após análise completa, promete segurança do principal e um retorno adequado. Operações que não atendem a esses requisitos são especulativas. O investidor inteligente reconhece que a especulação é inevitável e até necessária em Wall Street, mas sempre mantém uma distinção clara entre atividades de investimento e especulação.',
  'An investment operation is one which, upon thorough analysis, promises safety of principal and an adequate return. Operations not meeting these requirements are speculative. The intelligent investor recognizes that speculation is inevitable and even necessary on Wall Street, but always maintains a clear distinction between investment and speculative activities.',
  'Capítulo 1',
  'Investimento requer análise, segurança do capital e retorno adequado. Tudo o mais é especulação.',
  'Investment requires analysis, safety of principal, and adequate return. Everything else is speculation.'
),
(
  'intelligent_investor', 2,
  'Sr. Mercado',
  'Mr. Market',
  'Imagine que você possui uma pequena participação em um negócio privado que custa $1.000. Um de seus parceiros, chamado Sr. Mercado, é muito prestativo. Todos os dias ele lhe diz o que ele acha que sua participação vale e oferece comprá-la ou vender-lhe mais. Às vezes suas cotações parecem plausíveis. Frequentemente, o Sr. Mercado deixa seu entusiasmo ou seus medos ficarem fora de controle, e o valor que ele propõe parece ridículo.',
  'Imagine that you own a small share of a private business that cost you $1,000. One of your partners, named Mr. Market, is very obliging. Every day he tells you what he thinks your interest is worth and offers either to buy you out or to sell you more. Sometimes his quotes seem plausible. Often, Mr. Market lets his enthusiasm or his fears run wild, and the value he proposes seems ridiculous.',
  'Capítulo 8',
  'Use o mercado a seu favor. Não deixe que as flutuações de preço controlem suas emoções ou decisões.',
  'Use the market to your advantage. Don''t let price fluctuations control your emotions or decisions.'
),
(
  'intelligent_investor', 3,
  'Margem de Segurança',
  'Margin of Safety',
  'A margem de segurança é sempre dependente do preço pago. Ela será grande em um preço, pequena em outro maior, e inexistente em um preço ainda maior. Se você comprar uma ação a um preço não muito acima de seu valor tangível, mesmo que a empresa não cresça, você terá uma margem de segurança razoável.',
  'The margin of safety is always dependent on the price paid. It will be large at one price, small at some higher price, nonexistent at some still higher price. If you buy a stock at a price not far above its tangible-asset value, even if the company doesn''t grow, you will have a reasonable margin of safety.',
  'Capítulo 20',
  'Sempre compre com uma margem de segurança - pague menos do que o valor intrínseco.',
  'Always buy with a margin of safety - pay less than intrinsic value.'
),
(
  'intelligent_investor', 4,
  'O Investidor Defensivo',
  'The Defensive Investor',
  'O investidor defensivo deve se contentar com retornos modestos em suas operações de investimento. Mas ele deve ter certeza de que seus resultados não serão significativamente piores que a média. É surpreendentemente fácil para o investidor defensivo alcançar esse objetivo através da diversificação adequada e pela compra de ações de empresas grandes e estabelecidas.',
  'The defensive investor must be content with modest returns on his investment operations. But he should make sure that his results will not be significantly worse than average. It is surprisingly easy for the defensive investor to achieve this goal through proper diversification and by buying shares of large, established companies.',
  'Capítulo 5',
  'Diversifique adequadamente e invista em empresas sólidas para resultados consistentes.',
  'Diversify properly and invest in solid companies for consistent results.'
),
(
  'intelligent_investor', 5,
  'Flutuações de Mercado',
  'Market Fluctuations',
  'O investidor inteligente não deve ignorar as flutuações de mercado, porque elas apresentam oportunidades. Mas ele não deve permitir que elas o dominem. A atitude correta é tirar vantagem das flutuações quando elas favorecem você, e ignorá-las quando não favorecem.',
  'The intelligent investor should not ignore market fluctuations, because they present opportunities. But he should not allow them to dominate him. The right attitude is to take advantage of fluctuations when they favor you, and ignore them when they don''t.',
  'Capítulo 8',
  'Seja oportunista com as flutuações, mas não seja dominado por elas.',
  'Be opportunistic with fluctuations, but don''t be dominated by them.'
),
(
  'intelligent_investor', 6,
  'Análise de Empresas',
  'Company Analysis',
  'A análise de uma empresa deve começar com um exame de seu histórico de lucros. Procure por estabilidade e crescimento consistente ao longo de pelo menos 10 anos. Uma empresa com lucros erráticos ou em declínio não é adequada para o investidor conservador.',
  'Analysis of a company should begin with an examination of its earnings record. Look for stability and consistent growth over at least 10 years. A company with erratic or declining earnings is not suitable for the conservative investor.',
  'Capítulo 14',
  'Histórico de lucros consistente por 10+ anos é essencial para investimento conservador.',
  'Consistent earnings record for 10+ years is essential for conservative investment.'
),
(
  'intelligent_investor', 7,
  'Dividendos',
  'Dividends',
  'Uma política de dividendos conservadora é um sinal de força financeira. Empresas que pagam dividendos regularmente demonstram disciplina de capital e compromisso com os acionistas. O investidor inteligente valoriza empresas com histórico de dividendos crescentes.',
  'A conservative dividend policy is a sign of financial strength. Companies that pay dividends regularly demonstrate capital discipline and commitment to shareholders. The intelligent investor values companies with a history of growing dividends.',
  'Capítulo 19',
  'Dividendos consistentes e crescentes indicam saúde financeira e compromisso com acionistas.',
  'Consistent and growing dividends indicate financial health and commitment to shareholders.'
),
(
  'intelligent_investor', 8,
  'Valor vs. Preço',
  'Value vs. Price',
  'Preço é o que você paga. Valor é o que você recebe. O investidor inteligente sempre busca comprar valor por um preço menor. A diferença entre preço e valor é a essência do investimento bem-sucedido.',
  'Price is what you pay. Value is what you get. The intelligent investor always seeks to buy value at a lower price. The difference between price and value is the essence of successful investing.',
  'Capítulo 11',
  'Foque no valor intrínseco, não no preço de mercado. Compre valor com desconto.',
  'Focus on intrinsic value, not market price. Buy value at a discount.'
),
(
  'intelligent_investor', 9,
  'Disciplina Emocional',
  'Emotional Discipline',
  'O maior inimigo do investidor é provavelmente ele mesmo. Ganância quando os outros estão gananciosos, e medo quando os outros estão com medo, são as receitas para o desastre. O investidor inteligente deve cultivar disciplina emocional acima de tudo.',
  'The investor''s chief problem—and even his worst enemy—is likely to be himself. Greed when others are greedy, and fear when others are fearful, are recipes for disaster. The intelligent investor must cultivate emotional discipline above all.',
  'Capítulo 8',
  'Controle emocional é mais importante que inteligência no investimento.',
  'Emotional control is more important than intelligence in investing.'
),
(
  'intelligent_investor', 10,
  'Diversificação',
  'Diversification',
  'A diversificação adequada requer possuir pelo menos 10 ações diferentes e não mais que 30. Muito pouca diversificação aumenta o risco. Diversificação excessiva dilui os retornos e torna impossível acompanhar adequadamente seus investimentos.',
  'Adequate diversification requires owning at least 10 different stocks and no more than 30. Too little diversification increases risk. Excessive diversification dilutes returns and makes it impossible to adequately monitor your investments.',
  'Capítulo 14',
  'Diversifique entre 10-30 ações para balancear risco e retorno.',
  'Diversify between 10-30 stocks to balance risk and return.'
),
(
  'intelligent_investor', 11,
  'Investimento de Longo Prazo',
  'Long-Term Investing',
  'O verdadeiro investidor raramente é forçado a vender suas ações, e a qualquer momento ele pode ignorar o preço de mercado atual como irrelevante. Ele precisa prestar atenção apenas se tiver boas razões para acreditar que o preço está errado.',
  'The true investor is scarcely ever forced to sell his shares, and at all other times he is free to disregard the current market price as irrelevant. He need pay attention to it only if he has good reason to believe the price is wrong.',
  'Capítulo 8',
  'Pense como dono, não como trader. Ignore flutuações de curto prazo.',
  'Think like an owner, not a trader. Ignore short-term fluctuations.'
),
(
  'intelligent_investor', 12,
  'Conhecimento e Pesquisa',
  'Knowledge and Research',
  'O investimento requer mais trabalho inteligente do que gênio. Você não precisa ser extraordinariamente inteligente para ser um investidor bem-sucedido, mas precisa estar disposto a fazer sua lição de casa e pensar de forma independente.',
  'Investing requires more intelligent work than genius. You don''t need to be extraordinarily smart to be a successful investor, but you need to be willing to do your homework and think independently.',
  'Introdução',
  'Trabalho diligente e pensamento independente superam inteligência pura.',
  'Diligent work and independent thinking beat pure intelligence.'
);

-- Continue with remaining books...
-- (Due to length, I'll create this in multiple parts)
