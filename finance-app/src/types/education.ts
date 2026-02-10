// Education Hub Types
// Investment Tree + Wisdom Library type definitions

// ============================================
// INVESTMENT TREE TYPES
// ============================================

export interface TreeNode {
    id: string;
    node_key: string;
    parent_key: string | null;
    title_pt: string;
    title_en: string;
    description_pt: string | null;
    description_en: string | null;
    icon: string | null;
    color: string | null;
    level: number;
    position_x: number | null;
    position_y: number | null;
    unlock_requirement: string | null;
    estimated_minutes: number | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface TreeLesson {
    id: string;
    node_key: string;
    lesson_order: number;
    title_pt: string;
    title_en: string;
    content_pt: string;
    content_en: string;
    media_type: string | null;
    media_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface TreeQuiz {
    id: string;
    node_key: string;
    question_order: number;
    question_pt: string;
    question_en: string;
    options_pt: string[];
    options_en: string[];
    correct_index: number;
    explanation_pt: string | null;
    explanation_en: string | null;
    created_at: string;
}

export type ProgressStatus = 'locked' | 'unlocked' | 'in_progress' | 'completed';

export interface UserTreeProgress {
    id: string;
    user_id: string;
    node_key: string;
    status: ProgressStatus;
    lessons_completed: number;
    quiz_score: number | null;
    quiz_attempts: number;
    started_at: string | null;
    completed_at: string | null;
    created_at: string;
    updated_at: string;
}

// ============================================
// WISDOM LIBRARY TYPES
// ============================================

export type BookCategory = 'finance' | 'strategy' | 'personal_dev';

export interface WisdomBook {
    id: string;
    book_key: string;
    title_pt: string;
    title_en: string;
    author: string;
    category: string;
    description_pt: string | null;
    description_en: string | null;
    cover_color: string | null;
    icon: string | null;
    year_published: number | null;
    is_active: boolean;
    created_at: string;
    progress?: UserReadingProgress;
}

export interface WisdomExcerpt {
    id: string;
    book_key: string;
    excerpt_order: number;
    title_pt: string;
    title_en: string;
    content_pt: string;
    content_en: string;
    page_reference: string | null;
    key_takeaway_pt: string | null;
    key_takeaway_en: string | null;
    created_at: string;
}

export interface UserReadingProgress {
    id: string;
    user_id: string;
    book_key: string;
    excerpts_read: number;
    is_favorite: boolean;
    last_read_at: string | null;
    completed_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface ReadingStats {
    totalBooks: number;
    booksStarted: number;
    booksCompleted: number;
    totalExcerpts: number;
    excerptsRead: number;
    favoriteCount: number;
}

// ============================================
// COMPUTED/HELPER TYPES
// ============================================

export interface NodeWithProgress extends TreeNode {
    progress?: UserTreeProgress;
    isLocked: boolean;
    isCompleted: boolean;
}

export interface NodeContent {
    node: TreeNode;
    lessons: TreeLesson[];
    quizzes: TreeQuiz[];
    progress?: UserTreeProgress;
}

export interface QuizAttempt {
    questionId: string;
    selectedIndex: number;
    isCorrect: boolean;
}

export interface QuizResult {
    score: number;
    correctCount: number;
    totalQuestions: number;
    passed: boolean; // 70% = passed
    attempts: QuizAttempt[];
}

export interface BookWithProgress extends WisdomBook {
    excerptCount?: number;
    readCount?: number;
    lastRead?: string | null;
}

export interface ExcerptWithProgress extends WisdomExcerpt {
    reading?: UserReadingProgress;
    isRead: boolean;
    isFavorite: boolean;
}
