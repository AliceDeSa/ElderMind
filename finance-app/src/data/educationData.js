import { BookOpen, TrendingUp, ShieldCheck, DollarSign } from 'lucide-react';

export const LESSONS = [
    {
        id: 'babylon',
        title: 'Sabedoria da Babilônia',
        subtitle: 'Os princípios atemporais de riqueza',
        description: 'Baseado no livro "O Homem Mais Rico da Babilônia", aprenda as leis fundamentais para acumular e manter riqueza.',
        icon: BookOpen,
        level: 'Iniciante',
        tag: 'História Financeira',
        duration: '15 minutos',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/10',
        content: `
            <h3>Introdução</h3>
            <p>"O Homem Mais Rico da Babilônia", de George S. Clason, usa parábolas da antiga Babilônia para ensinar lições financeiras que funcionam até hoje. A premissa básica é simples: comece a encher sua bolsa.</p>

            <h3>Lição 1: Pague-se Primeiro</h3>
            <p>A regra de ouro é: <strong>"De cada dez moedas que ganhar, gaste apenas nove."</strong></p>
            <p>Isso significa que você deve guardar pelo menos 10% de tudo o que ganha <em>antes</em> de pagar qualquer conta. Esse dinheiro é a semente da sua futura árvore de riqueza.</p>

            <h3>Lição 2: Controle seus Gastos</h3>
            <p>Não confunda despesas necessárias com desejos. Todos nós temos mais desejos do que nossos ganhos podem satisfazer. Examine seus hábitos e corte gastos que não agregam valor real à sua vida.</p>

            <h3>Lição 3: Faça seu Ouro Multiplicar</h3>
            <p>O dinheiro guardado não deve ficar parado. Ele deve trabalhar para você. Invista suas economias de forma sábia para que elas gerem "filhos" (juros/rendimentos), e os filhos gerem mais filhos.</p>

            <h3>Lição 4: Proteja seu Tesouro</h3>
            <p>O primeiro princípio do investimento é a segurança do capital. Não busque lucros irreais com pessoas inexperientes ou em negócios que você não entende. Busque conselhos de quem entende de multiplicar ouro.</p>
        `
    },
    {
        id: 'rich-dad',
        title: 'Pai Rico, Pai Pobre',
        subtitle: 'A mentalidade dos ricos',
        description: 'Entenda a diferença crucial entre ativos e passivos e por que você não deve trabalhar pelo dinheiro.',
        icon: DollarSign,
        level: 'Intermediário',
        tag: 'Mentalidade',
        duration: '20 minutos',
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
        content: `
            <h3>Introdução</h3>
            <p>Robert Kiyosaki contrasta dois tipos de mentalidade: a de seu "Pai Pobre" (instruído, mas financeiramente analfabeto) e a de seu "Pai Rico" (sem diploma, mas mestre do dinheiro).</p>

            <h3>O Conceito Chave: Ativos vs Passivos</h3>
            <p>A maioria das pessoas falha financeiramente porque não sabe a diferença:</p>
            <ul>
                <li><strong>Ativo:</strong> É tudo aquilo que <em>põe dinheiro</em> no seu bolso (Ex: Imóveis de aluguel, ações, negócios).</li>
                <li><strong>Passivo:</strong> É tudo aquilo que <em>tira dinheiro</em> do seu bolso (Ex: Casa própria cara, carro novo, dívidas de consumo).</li>
            </ul>
            <p>Os ricos compram ativos. Os pobres e a classe média compram passivos pensando que são ativos.</p>

            <h3>A Corrida dos Ratos</h3>
            <p>É o ciclo vicioso onde você trabalha duro para ganhar dinheiro, gasta tudo pagando contas e passivos, e então precisa trabalhar ainda mais duro, sem nunca sair do lugar. A única saída é aumentar sua coluna de ativos até que sua renda passiva supere suas despesas.</p>
        `
    },
    {
        id: 'compound-interest',
        title: 'O Poder dos Juros Compostos',
        subtitle: 'A oitava maravilha do mundo',
        description: 'Descubra como o tempo é seu maior aliado e como pequenas quantias podem se tornar fortunas.',
        icon: TrendingUp,
        level: 'Iniciante',
        tag: 'Conceitos Básicos',
        duration: '10 minutos',
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-500/10',
        content: `
            <h3>O que são?</h3>
            <p>Juros compostos são "juros sobre juros". Diferente dos juros simples (calculados apenas sobre o valor principal), aqui os rendimentos de um mês rendem mais juros no mês seguinte.</p>

            <h3>O Efeito Bola de Neve</h3>
            <p>No início, a diferença parece pequena. Mas com o tempo, o crescimento torna-se exponencial. É por isso que começar cedo é mais importante do que começar com muito dinheiro.</p>
            <p><em>Exemplo:</em> Se você dobrar uma folha de papel 42 vezes, ela alcançaria a Lua. Esse é o poder do crescimento exponencial.</p>

            <h3>A Fórmula Mágica</h3>
            <p><strong>M = C (1 + i)^t</strong></p>
            <ul>
                <li>M = Montante Final</li>
                <li>C = Capital Inicial</li>
                <li>i = Taxa de juros</li>
                <li>t = Tempo (exponente)</li>
            </ul>
            <p>Note que o "t" (tempo) é uma potência. Ele é o fator mais poderoso da equação!</p>
        `
    },
    {
        id: 'emergency-fund',
        title: 'Reserva de Emergência',
        subtitle: 'Sua rede de segurança',
        description: 'O primeiro passo prático para a tranquilidade financeira. Quanto guardar e onde investir.',
        icon: ShieldCheck,
        level: 'Iniciante',
        tag: 'Planejamento',
        duration: '12 minutos',
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        content: `
            <h3>O que é?</h3>
            <p>É um dinheiro guardado especificamente para cobrir imprevistos: perda de emprego, problemas de saúde, conserto do carro, etc. Não é para viagens ou compras!</p>

            <h3>Quanto guardar?</h3>
            <p>A recomendação geral é ter entre <strong>6 a 12 meses</strong> do seu custo de vida mensal (não do seu salário) guardados.</p>
            <ul>
                <li>Se você é funcionário público ou tem renda muito estável: 6 meses pode bastar.</li>
                <li>Se é autônomo ou empreendedor: mire em 12 meses para maior segurança.</li>
            </ul>

            <h3>Onde investir?</h3>
            <p>A prioridade aqui é <strong>Liquidez</strong> (poder sacar rápido) e <strong>Segurança</strong>. Rentabilidade é secundária.</p>
            <p>Bons lugares: Tesouro Selic, CDBs com liquidez diária de grandes bancos ou Caixinhas de bancos digitais (que rendam 100% do CDI).</p>
        `
    }
];

export const QUIZZES = [
    {
        id: 'quiz-concepts',
        title: 'Conceitos Básicos',
        description: 'Teste o que você aprendeu sobre ativos, passivos e juros.',
        questions: [
            {
                id: 1,
                question: 'Qual a principal diferença entre um Ativo e um Passivo segundo Robert Kiyosaki?',
                options: [
                    'Ativos são bens físicos, passivos são dívidas.',
                    'Ativos colocam dinheiro no bolso, passivos tiram dinheiro do bolso.',
                    'Ativos são caros, passivos são baratos.',
                    'Não há diferença, são termos contábeis iguais.'
                ],
                correctAnswer: 1 // Index based (0, 1, 2, 3)
            },
            {
                id: 2,
                question: 'O que caracteriza os juros compostos?',
                options: [
                    'A taxa de juros diminui com o tempo.',
                    'Os juros são calculados apenas sobre o valor inicial.',
                    'Os juros são calculados sobre o valor inicial + juros acumulados.',
                    'É uma taxa fixa cobrada pelo banco.'
                ],
                correctAnswer: 2
            },
            {
                id: 3,
                question: 'Segundo "O Homem Mais Rico da Babilônia", qual % mínima da renda deve ser poupada?',
                options: [
                    '1%',
                    '5%',
                    '10%',
                    '50%'
                ],
                correctAnswer: 2
            }
        ]
    },
    {
        id: 'quiz-planning',
        title: 'Planejamento e Reserva',
        description: 'Verifique seu entendimento sobre segurança financeira.',
        questions: [
            {
                id: 1,
                question: 'Qual o objetivo principal da Reserva de Emergência?',
                options: [
                    'Investir em ações para ficar rico rápido.',
                    'Cobrir gastos imprevistos e trazer segurança.',
                    'Juntar dinheiro para comprar um carro de luxo.',
                    'Pagar a fatura do cartão de crédito.'
                ],
                correctAnswer: 1
            },
            {
                id: 2,
                question: 'Qual característica é mais importante para o investimento da Reserva de Emergência?',
                options: [
                    'Alta rentabilidade (render muito).',
                    'Alto risco.',
                    'Alta Liquidez (poder sacar a qualquer momento).',
                    'Estar bloqueado por 2 anos.'
                ],
                correctAnswer: 2
            },
            {
                id: 3,
                question: 'Se seu custo de vida é R$ 2.000, quanto você deve ter na reserva (mínimo de 6 meses)?',
                options: [
                    'R$ 2.000',
                    'R$ 6.000',
                    'R$ 12.000',
                    'R$ 24.000'
                ],
                correctAnswer: 2
            }
        ]
    }
];
