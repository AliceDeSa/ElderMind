-- TABELA DE CARTÕES
CREATE TABLE IF NOT EXISTS cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    limit_val DECIMAL(12,2) NOT NULL DEFAULT 0,
    due_date TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- TABELA DE DESPESAS
CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id UUID REFERENCES cards(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    installments TEXT,
    category TEXT,
    budget_id TEXT,
    tag TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- TABELA DE RENDAS
CREATE TABLE IF NOT EXISTS incomes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    recurring BOOLEAN DEFAULT false,
    month INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- TABELA DE METAS (ALOCAÇÃO)
CREATE TABLE IF NOT EXISTS budget_allocation (
    id TEXT PRIMARY KEY, -- ex: 'fixed', 'pleasure'
    name TEXT NOT NULL,
    value INTEGER NOT NULL DEFAULT 0,
    color TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- INSERIR METAS INICIAIS
INSERT INTO budget_allocation (id, name, value, color) VALUES
('fixed', 'Custos Fixos', 30, '#3b82f6'),
('freedom', 'Liberdade Financeira', 25, '#818cf8'),
('comfort', 'Conforto', 15, '#f472b6'),
('goals', 'Metas', 15, '#7c3aed'),
('pleasure', 'Prazeres', 10, '#f97316'),
('knowledge', 'Conhecimento', 5, '#fbbf24')
ON CONFLICT (id) DO NOTHING;
