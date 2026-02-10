-- Migration: Education Hub Complete Schema
-- Description: Creates all tables for Investment Tree (60 nodes) and Wisdom Library (15 books)
-- Date: 2026-02-08

-- ============================================
-- INVESTMENT TREE TABLES
-- ============================================

-- Table: tree_nodes
-- Stores the structure of the investment learning tree
CREATE TABLE IF NOT EXISTS tree_nodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    node_key VARCHAR(100) UNIQUE NOT NULL,
    parent_key VARCHAR(100),
    title_pt VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    description_pt TEXT,
    description_en TEXT,
    icon VARCHAR(50),
    color VARCHAR(20),
    level INTEGER NOT NULL CHECK (level >= 0 AND level <= 10),
    position_x DECIMAL(5,2),
    position_y DECIMAL(5,2),
    unlock_requirement VARCHAR(100),
    estimated_minutes INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    FOREIGN KEY (parent_key) REFERENCES tree_nodes(node_key) ON DELETE CASCADE
);

-- Table: tree_lessons
-- Stores lesson content for each node
CREATE TABLE IF NOT EXISTS tree_lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    node_key VARCHAR(100) NOT NULL,
    lesson_order INTEGER NOT NULL,
    title_pt VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    content_pt TEXT NOT NULL,
    content_en TEXT NOT NULL,
    media_type VARCHAR(50),
    media_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    FOREIGN KEY (node_key) REFERENCES tree_nodes(node_key) ON DELETE CASCADE,
    UNIQUE(node_key, lesson_order)
);

-- Table: tree_quizzes
-- Stores quiz questions for each node
CREATE TABLE IF NOT EXISTS tree_quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    node_key VARCHAR(100) NOT NULL,
    question_order INTEGER NOT NULL,
    question_pt TEXT NOT NULL,
    question_en TEXT NOT NULL,
    options_pt JSONB NOT NULL,
    options_en JSONB NOT NULL,
    correct_index INTEGER NOT NULL CHECK (correct_index >= 0),
    explanation_pt TEXT,
    explanation_en TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    FOREIGN KEY (node_key) REFERENCES tree_nodes(node_key) ON DELETE CASCADE,
    UNIQUE(node_key, question_order)
);

-- Table: user_tree_progress
-- Tracks user progress through the tree
CREATE TABLE IF NOT EXISTS user_tree_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    node_key VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'locked' CHECK (status IN ('locked', 'unlocked', 'in_progress', 'completed')),
    lessons_completed INTEGER DEFAULT 0,
    quiz_score INTEGER CHECK (quiz_score >= 0 AND quiz_score <= 100),
    quiz_attempts INTEGER DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, node_key),
    FOREIGN KEY (node_key) REFERENCES tree_nodes(node_key) ON DELETE CASCADE
);

-- ============================================
-- WISDOM LIBRARY TABLES
-- ============================================

-- Table: wisdom_books
-- Stores information about classic books
CREATE TABLE IF NOT EXISTS wisdom_books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_key VARCHAR(100) UNIQUE NOT NULL,
    title_pt VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    cover_url VARCHAR(500),
    category VARCHAR(100) CHECK (category IN ('finance', 'strategy', 'personal_dev')),
    color VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: wisdom_excerpts
-- Stores book excerpts/trechos
CREATE TABLE IF NOT EXISTS wisdom_excerpts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_key VARCHAR(100) NOT NULL,
    excerpt_order INTEGER NOT NULL,
    title_pt VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    content_pt TEXT NOT NULL,
    content_en TEXT NOT NULL,
    chapter VARCHAR(100),
    page_reference VARCHAR(50),
    reading_time INTEGER,
    tags JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    FOREIGN KEY (book_key) REFERENCES wisdom_books(book_key) ON DELETE CASCADE,
    UNIQUE(book_key, excerpt_order)
);

-- Table: user_reading_progress
-- Tracks user reading history and favorites
CREATE TABLE IF NOT EXISTS user_reading_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    excerpt_id UUID NOT NULL,
    read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    favorite BOOLEAN DEFAULT false,
    notes TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, excerpt_id),
    FOREIGN KEY (excerpt_id) REFERENCES wisdom_excerpts(id) ON DELETE CASCADE
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Tree nodes indexes
CREATE INDEX IF NOT EXISTS idx_tree_nodes_level ON tree_nodes(level);
CREATE INDEX IF NOT EXISTS idx_tree_nodes_parent ON tree_nodes(parent_key);
CREATE INDEX IF NOT EXISTS idx_tree_nodes_active ON tree_nodes(is_active);

-- Tree lessons indexes
CREATE INDEX IF NOT EXISTS idx_tree_lessons_node ON tree_lessons(node_key);

-- Tree quizzes indexes
CREATE INDEX IF NOT EXISTS idx_tree_quizzes_node ON tree_quizzes(node_key);

-- User progress indexes
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_tree_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_status ON user_tree_progress(status);
CREATE INDEX IF NOT EXISTS idx_user_progress_completed ON user_tree_progress(user_id, status) WHERE status = 'completed';

-- Wisdom books indexes
CREATE INDEX IF NOT EXISTS idx_wisdom_books_category ON wisdom_books(category);
CREATE INDEX IF NOT EXISTS idx_wisdom_books_active ON wisdom_books(is_active);

-- Wisdom excerpts indexes
CREATE INDEX IF NOT EXISTS idx_wisdom_excerpts_book ON wisdom_excerpts(book_key);

-- User reading indexes
CREATE INDEX IF NOT EXISTS idx_user_reading_user ON user_reading_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_reading_favorites ON user_reading_progress(user_id, favorite) WHERE favorite = true;

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on user-specific tables
ALTER TABLE user_tree_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reading_progress ENABLE ROW LEVEL SECURITY;

-- Policies for user_tree_progress
CREATE POLICY "Users can view own tree progress"
    ON user_tree_progress FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tree progress"
    ON user_tree_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tree progress"
    ON user_tree_progress FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tree progress"
    ON user_tree_progress FOR DELETE
    USING (auth.uid() = user_id);

-- Policies for user_reading_progress
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

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_tree_nodes_updated_at
    BEFORE UPDATE ON tree_nodes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tree_lessons_updated_at
    BEFORE UPDATE ON tree_lessons
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_tree_progress_updated_at
    BEFORE UPDATE ON user_tree_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wisdom_books_updated_at
    BEFORE UPDATE ON wisdom_books
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wisdom_excerpts_updated_at
    BEFORE UPDATE ON wisdom_excerpts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_reading_progress_updated_at
    BEFORE UPDATE ON user_reading_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE tree_nodes IS 'Investment learning tree structure with 60 nodes across 10 levels';
COMMENT ON TABLE tree_lessons IS 'Lesson content for each tree node (3 lessons per node ≈ 180 total)';
COMMENT ON TABLE tree_quizzes IS 'Quiz questions for each node (5 questions per node ≈ 300 total)';
COMMENT ON TABLE user_tree_progress IS 'Tracks user progress through the investment tree';
COMMENT ON TABLE wisdom_books IS 'Classic business and self-development books (15 books)';
COMMENT ON TABLE wisdom_excerpts IS 'Book excerpts/trechos (170+ excerpts)';
COMMENT ON TABLE user_reading_progress IS 'Tracks user reading history and favorites';
