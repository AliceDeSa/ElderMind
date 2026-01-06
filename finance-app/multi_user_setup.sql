-- 1. ADD USER_ID COLUMN TO ALL TABLES
-- Note: auth.uid() is a special Supabase function that returns the ID of the authenticated user

ALTER TABLE cards ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid();
ALTER TABLE expenses ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid();
ALTER TABLE incomes ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid();
ALTER TABLE budget_allocation ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid();

-- If financial_goals doesn't exist yet, create it with user_id
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

-- 2. ENABLE ROW LEVEL SECURITY
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE incomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_allocation ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_goals ENABLE ROW LEVEL SECURITY;

-- 3. CREATE POLICIES (Allow users to see/edit ONLY their own data)

-- Cards
CREATE POLICY "Users can manage their own cards" ON cards
    FOR ALL USING (auth.uid() = user_id);

-- Expenses
CREATE POLICY "Users can manage their own expenses" ON expenses
    FOR ALL USING (auth.uid() = user_id);

-- Incomes
CREATE POLICY "Users can manage their own incomes" ON incomes
    FOR ALL USING (auth.uid() = user_id);

-- Budget Allocation
CREATE POLICY "Users can manage their own budget allocation" ON budget_allocation
    FOR ALL USING (auth.uid() = user_id);

-- Financial Goals
CREATE POLICY "Users can manage their own financial goals" ON financial_goals
    FOR ALL USING (auth.uid() = user_id);

-- 4. CLEANUP (Optional: If you had data before, you might want to assign it to your user)
-- UPDATE cards SET user_id = 'YOUR-USER-ID-HERE' WHERE user_id IS NULL;
