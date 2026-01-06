-- EXECUTAR ESTE SCRIPT NO SQL EDITOR DO SUPABASE

-- 1. PREPARAÇÃO: Permitir que cada usuário tenha suas próprias categorias
ALTER TABLE budget_allocation DROP CONSTRAINT IF EXISTS budget_allocation_pkey;

-- 2. ADICIONAR COLUNA user_id (caso não exista)
ALTER TABLE cards ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE expenses ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE incomes ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);
ALTER TABLE budget_allocation ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- 3. RECUPERAÇÃO DE DADOS (IMPORTANTE!)
-- Como o SQL Editor não sabe quem você é (auth.uid() é nulo aqui), 
-- vamos pegar o primeiro usuário cadastrado no sistema para ser o "dono" dos dados órfãos.
DO $$
DECLARE
    v_user_id UUID;
BEGIN
    SELECT id INTO v_user_id FROM auth.users LIMIT 1;
    
    IF v_user_id IS NULL THEN
        RAISE NOTICE 'Nenhum usuário encontrado em auth.users. Faça login no app primeiro!';
    ELSE
        UPDATE cards SET user_id = v_user_id WHERE user_id IS NULL;
        UPDATE expenses SET user_id = v_user_id WHERE user_id IS NULL;
        UPDATE incomes SET user_id = v_user_id WHERE user_id IS NULL;
        UPDATE budget_allocation SET user_id = v_user_id WHERE user_id IS NULL;
        RAISE NOTICE 'Dados vinculados ao usuário: %', v_user_id;
    END IF;
END $$;

-- 4. GARANTIR QUE user_id NÃO É NULO (Requisito para Primary Key)
-- Se ainda houver nulos (caso não tenha usuários), o comando abaixo vai falhar e avisar.
ALTER TABLE budget_allocation ALTER COLUMN user_id SET NOT NULL;

-- 5. DEFINIR NOVA CHAVE PRIMÁRIA COMPOSTA
ALTER TABLE budget_allocation ADD PRIMARY KEY (id, user_id);

-- 6. CRIAR TABELA DE METAS FINANCEIRAS (se não existir)
CREATE TABLE IF NOT EXISTS financial_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
    title TEXT NOT NULL,
    target_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    current_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    deadline DATE,
    category TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. ATIVAR SEGURANÇA (RLS)
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE incomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_allocation ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_goals ENABLE ROW LEVEL SECURITY;

-- 8. CRIAR POLÍTICAS DE ACESSO
DROP POLICY IF EXISTS "Users can manage their own cards" ON cards;
DROP POLICY IF EXISTS "Users can manage their own expenses" ON expenses;
DROP POLICY IF EXISTS "Users can manage their own incomes" ON incomes;
DROP POLICY IF EXISTS "Users can manage their own budget allocation" ON budget_allocation;
DROP POLICY IF EXISTS "Users can manage their own financial goals" ON financial_goals;

CREATE POLICY "Users can manage their own cards" ON cards FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own expenses" ON expenses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own incomes" ON incomes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own budget allocation" ON budget_allocation FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own financial goals" ON financial_goals FOR ALL USING (auth.uid() = user_id);
