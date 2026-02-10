import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type {
    WisdomBook,
    WisdomExcerpt,
    UserReadingProgress,
    ReadingStats
} from '../types/education';

// ============================================
// WISDOM BOOKS
// ============================================

/**
 * Fetch all wisdom books with optional progress data
 */
export function useWisdomBooks(includeProgress = false) {
    const [books, setBooks] = useState<WisdomBook[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchBooks() {
            try {
                setLoading(true);

                // Fetch all active books
                const { data: booksData, error: booksError } = await supabase
                    .from('wisdom_books')
                    .select('*')
                    .eq('is_active', true)
                    .order('year_published', { ascending: false });

                if (booksError) throw booksError;

                if (!includeProgress) {
                    setBooks(booksData || []);
                    setLoading(false);
                    return;
                }

                // Fetch user progress
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    setBooks(booksData || []);
                    setLoading(false);
                    return;
                }

                const { data: progressData } = await supabase
                    .from('user_reading_progress')
                    .select('*')
                    .eq('user_id', user.id);

                const progressMap = new Map(
                    (progressData || []).map(p => [p.book_key, p])
                );

                const booksWithProgress = (booksData || []).map(book => ({
                    ...book,
                    progress: progressMap.get(book.book_key)
                }));

                setBooks(booksWithProgress);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchBooks();
    }, [includeProgress]);

    return { books, loading, error };
}

/**
 * Fetch excerpts for a specific book with user progress
 */
export function useBookExcerpts(bookKey: string | null) {
    const [excerpts, setExcerpts] = useState<WisdomExcerpt[]>([]);
    const [progress, setProgress] = useState<UserReadingProgress | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!bookKey) {
            setExcerpts([]);
            setProgress(null);
            setLoading(false);
            return;
        }

        async function fetchExcerpts() {
            try {
                setLoading(true);

                // Fetch excerpts
                const { data: excerptsData, error: excerptsError } = await supabase
                    .from('wisdom_excerpts')
                    .select('*')
                    .eq('book_key', bookKey)
                    .order('excerpt_order', { ascending: true });

                if (excerptsError) throw excerptsError;

                setExcerpts(excerptsData || []);

                // Fetch user progress
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    setLoading(false);
                    return;
                }

                const { data: progressData } = await supabase
                    .from('user_reading_progress')
                    .select('*')
                    .eq('user_id', user.id)
                    .eq('book_key', bookKey)
                    .maybeSingle();

                setProgress(progressData);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchExcerpts();
    }, [bookKey]);

    return { excerpts, progress, loading, error };
}

/**
 * Get user's overall reading stats
 */
export function useReadingProgress() {
    const [stats, setStats] = useState<ReadingStats>({
        totalBooks: 0,
        booksStarted: 0,
        booksCompleted: 0,
        totalExcerpts: 0,
        excerptsRead: 0,
        favoriteCount: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    setLoading(false);
                    return;
                }

                // Count total books
                const { count: totalBooks } = await supabase
                    .from('wisdom_books')
                    .select('*', { count: 'exact', head: true })
                    .eq('is_active', true);

                // Count total excerpts
                const { count: totalExcerpts } = await supabase
                    .from('wisdom_excerpts')
                    .select('*', { count: 'exact', head: true });

                // Get user progress
                const { data: progressData } = await supabase
                    .from('user_reading_progress')
                    .select('*')
                    .eq('user_id', user.id);

                const booksStarted = progressData?.length || 0;
                const booksCompleted = progressData?.filter(p => p.completed_at !== null).length || 0;
                const excerptsRead = progressData?.reduce((sum, p) => sum + (p.excerpts_read || 0), 0) || 0;
                const favoriteCount = progressData?.filter(p => p.is_favorite).length || 0;

                setStats({
                    totalBooks: totalBooks || 15,
                    booksStarted,
                    booksCompleted,
                    totalExcerpts: totalExcerpts || 170,
                    excerptsRead,
                    favoriteCount
                });
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    return { stats, loading };
}

/**
 * Mark excerpt as read
 */
export async function markExcerptRead(bookKey: string, excerptOrder: number): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Get current progress
    const { data: progress } = await supabase
        .from('user_reading_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('book_key', bookKey)
        .maybeSingle();

    const newExcerptsRead = Math.max(progress?.excerpts_read || 0, excerptOrder);

    // Get total excerpts for this book
    const { count: totalExcerpts } = await supabase
        .from('wisdom_excerpts')
        .select('*', { count: 'exact', head: true })
        .eq('book_key', bookKey);

    const isCompleted = newExcerptsRead >= (totalExcerpts || 0);

    if (progress) {
        const { error } = await supabase
            .from('user_reading_progress')
            .update({
                excerpts_read: newExcerptsRead,
                last_read_at: new Date().toISOString(),
                completed_at: isCompleted ? new Date().toISOString() : progress.completed_at
            })
            .eq('id', progress.id);

        if (error) throw error;
    } else {
        const { error } = await supabase
            .from('user_reading_progress')
            .insert({
                user_id: user.id,
                book_key: bookKey,
                excerpts_read: newExcerptsRead,
                last_read_at: new Date().toISOString(),
                completed_at: isCompleted ? new Date().toISOString() : null
            });

        if (error) throw error;
    }
}

/**
 * Toggle favorite status for a book
 */
export async function toggleFavorite(bookKey: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data: progress } = await supabase
        .from('user_reading_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('book_key', bookKey)
        .maybeSingle();

    const newFavoriteStatus = !progress?.is_favorite;

    if (progress) {
        const { error } = await supabase
            .from('user_reading_progress')
            .update({ is_favorite: newFavoriteStatus })
            .eq('id', progress.id);

        if (error) throw error;
    } else {
        const { error } = await supabase
            .from('user_reading_progress')
            .insert({
                user_id: user.id,
                book_key: bookKey,
                is_favorite: newFavoriteStatus
            });

        if (error) throw error;
    }

    return newFavoriteStatus;
}

/**
 * Get a random unread excerpt for daily reading
 */
export async function getDailyExcerpt(): Promise<WisdomExcerpt | null> {
    const { data: { user } } = await supabase.auth.getUser();

    // Get all excerpts
    const { data: allExcerpts } = await supabase
        .from('wisdom_excerpts')
        .select('*');

    if (!allExcerpts || allExcerpts.length === 0) return null;

    if (!user) {
        // Return random excerpt if not logged in
        return allExcerpts[Math.floor(Math.random() * allExcerpts.length)];
    }

    // Get user progress
    const { data: progressData } = await supabase
        .from('user_reading_progress')
        .select('*')
        .eq('user_id', user.id);

    const readExcerpts = new Set<string>();
    progressData?.forEach(p => {
        for (let i = 1; i <= (p.excerpts_read || 0); i++) {
            readExcerpts.add(`${p.book_key}-${i}`);
        }
    });

    // Filter unread excerpts
    const unreadExcerpts = allExcerpts.filter(
        e => !readExcerpts.has(`${e.book_key}-${e.excerpt_order}`)
    );

    if (unreadExcerpts.length === 0) {
        // All read, return random
        return allExcerpts[Math.floor(Math.random() * allExcerpts.length)];
    }

    return unreadExcerpts[Math.floor(Math.random() * unreadExcerpts.length)];
}
