-- ============================================
-- WISDOM LIBRARY SCHEMA UPDATE
-- Adds missing columns to wisdom_books table
-- Run this BEFORE the seed data migrations
-- ============================================

-- Add missing columns to wisdom_books
ALTER TABLE wisdom_books 
ADD COLUMN IF NOT EXISTS description_pt TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT,
ADD COLUMN IF NOT EXISTS icon VARCHAR(10),
ADD COLUMN IF NOT EXISTS year_published INTEGER,
ADD COLUMN IF NOT EXISTS cover_color VARCHAR(20);

-- Update category constraint to match new categories
ALTER TABLE wisdom_books 
DROP CONSTRAINT IF EXISTS wisdom_books_category_check;

ALTER TABLE wisdom_books
ADD CONSTRAINT wisdom_books_category_check 
CHECK (category IN ('value_investing', 'personal_finance', 'strategy_psychology'));

-- Add key_takeaway columns to wisdom_excerpts
ALTER TABLE wisdom_excerpts
ADD COLUMN IF NOT EXISTS key_takeaway_pt TEXT,
ADD COLUMN IF NOT EXISTS key_takeaway_en TEXT;

-- Update user_reading_progress to track by book_key instead of excerpt_id
-- First, check if we need to recreate the table
DO $$
BEGIN
    -- Check if the table has the old structure
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_reading_progress' 
        AND column_name = 'excerpt_id'
    ) THEN
        -- Drop old table and recreate with new structure
        DROP TABLE IF EXISTS user_reading_progress CASCADE;
        
        CREATE TABLE user_reading_progress (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
            book_key VARCHAR(100) NOT NULL,
            excerpts_read INTEGER DEFAULT 0,
            is_favorite BOOLEAN DEFAULT false,
            last_read_at TIMESTAMP WITH TIME ZONE,
            completed_at TIMESTAMP WITH TIME ZONE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            
            UNIQUE(user_id, book_key),
            FOREIGN KEY (book_key) REFERENCES wisdom_books(book_key) ON DELETE CASCADE
        );
        
        -- Re-enable RLS
        ALTER TABLE user_reading_progress ENABLE ROW LEVEL SECURITY;
        
        -- Recreate policies
        CREATE POLICY "Users can view own reading progress"
            ON user_reading_progress FOR SELECT
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can insert own reading progress"
            ON user_reading_progress FOR INSERT
            WITH CHECK (auth.uid() = user_id);
        
        CREATE POLICY "Users can update own reading progress"
            ON user_reading_progress FOR UPDATE
            USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can delete own reading progress"
            ON user_reading_progress FOR DELETE
            USING (auth.uid() = user_id);
            
        -- Recreate index
        CREATE INDEX IF NOT EXISTS idx_user_reading_user ON user_reading_progress(user_id);
        CREATE INDEX IF NOT EXISTS idx_user_reading_favorites ON user_reading_progress(user_id, is_favorite) WHERE is_favorite = true;
        
        -- Recreate trigger
        CREATE TRIGGER update_user_reading_progress_updated_at
            BEFORE UPDATE ON user_reading_progress
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Add comment
COMMENT ON TABLE user_reading_progress IS 'Tracks user reading progress per book (not per excerpt)';
