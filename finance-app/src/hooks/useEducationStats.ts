import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useTreeNodes } from './useEducationHub';
import { useWisdomBooks, useReadingProgress } from './useWisdomLibrary';

export interface TreeStats {
    totalNodes: number;
    completedNodes: number;
    inProgressNodes: number;
    lockedNodes: number;
    progressPercentage: number;
}

export interface LibraryStats {
    totalBooks: number;
    totalExcerpts: number;
    booksStarted: number;
    booksCompleted: number;
    excerptsRead: number;
    favoriteBooks: number;
    progressPercentage: number;
}

export interface OverallStats {
    overallProgress: number;
    totalTimeMinutes: number;
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: Date | null;
    totalActivities: number;
}

export interface EducationStats {
    tree: TreeStats;
    library: LibraryStats;
    overall: OverallStats;
    loading: boolean;
    error: Error | null;
}

/**
 * Aggregates statistics from both Investment Tree and Wisdom Library
 */
export function useEducationStats(): EducationStats {
    const { nodes, loading: treeLoading } = useTreeNodes(true);
    const { books, loading: booksLoading } = useWisdomBooks(true);
    const { stats: libraryStats, loading: libraryStatsLoading } = useReadingProgress();

    const [overallStats, setOverallStats] = useState<OverallStats>({
        overallProgress: 0,
        totalTimeMinutes: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: null,
        totalActivities: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Calculate tree stats
    const treeStats: TreeStats = {
        totalNodes: nodes.length,
        completedNodes: nodes.filter(n => n.isCompleted).length,
        inProgressNodes: nodes.filter(n => n.progress?.status === 'in_progress').length,
        lockedNodes: nodes.filter(n => n.isLocked).length,
        progressPercentage: nodes.length > 0
            ? Math.round((nodes.filter(n => n.isCompleted).length / nodes.length) * 100)
            : 0,
    };

    // Calculate library stats from reading progress
    const calculatedLibraryStats: LibraryStats = {
        totalBooks: books.length,
        totalExcerpts: 180, // 15 books * 12 excerpts
        booksStarted: libraryStats.booksStarted || 0,
        booksCompleted: libraryStats.booksCompleted || 0,
        excerptsRead: libraryStats.excerptsRead || 0,
        favoriteBooks: libraryStats.favoriteCount || 0,
        progressPercentage: libraryStats.excerptsRead > 0
            ? Math.round((libraryStats.excerptsRead / 180) * 100)
            : 0,
    };

    // Fetch overall stats (activity tracking)
    useEffect(() => {
        async function fetchOverallStats() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    setLoading(false);
                    return;
                }

                // Calculate overall progress (weighted average)
                const treeWeight = 0.5;
                const libraryWeight = 0.5;
                const overall = Math.round(
                    (treeStats.progressPercentage * treeWeight) +
                    (calculatedLibraryStats.progressPercentage * libraryWeight)
                );

                // Estimate total time (rough calculation)
                const estimatedTreeTime = treeStats.completedNodes * 15; // 15 min per node
                const estimatedLibraryTime = calculatedLibraryStats.excerptsRead * 3; // 3 min per excerpt
                const totalTime = estimatedTreeTime + estimatedLibraryTime;

                // Get last activity from both sources
                const { data: treeProgress } = await supabase
                    .from('user_tree_progress')
                    .select('updated_at')
                    .eq('user_id', user.id)
                    .order('updated_at', { ascending: false })
                    .limit(1)
                    .single();

                const { data: readingProgress } = await supabase
                    .from('user_reading_progress')
                    .select('last_read_at')
                    .eq('user_id', user.id)
                    .order('last_read_at', { ascending: false })
                    .limit(1)
                    .single();

                const treeDate = treeProgress?.updated_at ? new Date(treeProgress.updated_at) : null;
                const libraryDate = readingProgress?.last_read_at ? new Date(readingProgress.last_read_at) : null;

                let lastActivity: Date | null = null;
                if (treeDate && libraryDate) {
                    lastActivity = treeDate > libraryDate ? treeDate : libraryDate;
                } else {
                    lastActivity = treeDate || libraryDate;
                }

                // Calculate streak (simplified - days with activity)
                const currentStreak = await calculateStreak(user.id);

                setOverallStats({
                    overallProgress: overall,
                    totalTimeMinutes: totalTime,
                    currentStreak: currentStreak,
                    longestStreak: currentStreak, // Simplified for now
                    lastActivityDate: lastActivity,
                    totalActivities: treeStats.completedNodes + calculatedLibraryStats.excerptsRead,
                });

            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        if (!treeLoading && !booksLoading && !libraryStatsLoading) {
            fetchOverallStats();
        }
    }, [treeLoading, booksLoading, libraryStatsLoading, treeStats.completedNodes, calculatedLibraryStats.excerptsRead]);

    return {
        tree: treeStats,
        library: calculatedLibraryStats,
        overall: overallStats,
        loading: treeLoading || booksLoading || libraryStatsLoading || loading,
        error,
    };
}

/**
 * Calculate current learning streak (consecutive days with activity)
 */
async function calculateStreak(userId: string): Promise<number> {
    try {
        // Get all activity dates from both sources
        const { data: treeActivities } = await supabase
            .from('user_tree_progress')
            .select('updated_at')
            .eq('user_id', userId)
            .order('updated_at', { ascending: false });

        const { data: readingActivities } = await supabase
            .from('user_reading_progress')
            .select('last_read_at')
            .eq('user_id', userId)
            .order('last_read_at', { ascending: false });

        // Combine and get unique dates
        const allDates: Date[] = [];

        treeActivities?.forEach(a => {
            if (a.updated_at) allDates.push(new Date(a.updated_at));
        });

        readingActivities?.forEach(a => {
            if (a.last_read_at) allDates.push(new Date(a.last_read_at));
        });

        if (allDates.length === 0) return 0;

        // Sort dates descending
        allDates.sort((a, b) => b.getTime() - a.getTime());

        // Get unique days (YYYY-MM-DD)
        const uniqueDays = new Set(
            allDates.map(d => d.toISOString().split('T')[0])
        );

        const sortedDays = Array.from(uniqueDays).sort().reverse();

        // Calculate streak
        let streak = 0;
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        // Check if there's activity today or yesterday
        if (sortedDays[0] !== today && sortedDays[0] !== yesterday) {
            return 0; // Streak broken
        }

        // Count consecutive days
        let currentDate = new Date(sortedDays[0]);
        for (let i = 0; i < sortedDays.length; i++) {
            const expectedDate = new Date(currentDate);
            expectedDate.setDate(expectedDate.getDate() - i);
            const expectedDateStr = expectedDate.toISOString().split('T')[0];

            if (sortedDays[i] === expectedDateStr) {
                streak++;
            } else {
                break;
            }
        }

        return streak;
    } catch (error) {
        console.error('Error calculating streak:', error);
        return 0;
    }
}

/**
 * Get next recommended action for the user
 */
export function useNextRecommendation() {
    const { nodes } = useTreeNodes(true);
    const { books } = useWisdomBooks(true);
    const [recommendation, setRecommendation] = useState<{
        type: 'tree' | 'library';
        title: string;
        description: string;
        action: string;
        nodeKey?: string;
        bookKey?: string;
    } | null>(null);

    useEffect(() => {
        // Find next unlocked tree node
        const nextNode = nodes.find(n =>
            !n.isLocked &&
            !n.isCompleted &&
            n.progress?.status !== 'in_progress'
        );

        // Find a book that's started but not completed
        const inProgressBook = books.find(b =>
            b.progress &&
            b.progress.excerpts_read > 0 &&
            b.progress.excerpts_read < 12
        );

        // Prioritize in-progress items
        if (inProgressBook) {
            setRecommendation({
                type: 'library',
                title: `Continue lendo: ${inProgressBook.title_pt}`,
                description: `Você leu ${inProgressBook.progress?.excerpts_read}/12 trechos`,
                action: 'Continuar leitura',
                bookKey: inProgressBook.book_key,
            });
        } else if (nextNode) {
            setRecommendation({
                type: 'tree',
                title: `Próximo tópico: ${nextNode.title_pt}`,
                description: nextNode.description_pt || 'Aprenda sobre este conceito importante',
                action: 'Começar lição',
                nodeKey: nextNode.node_key,
            });
        } else {
            // Random book suggestion
            const randomBook = books[Math.floor(Math.random() * books.length)];
            if (randomBook) {
                setRecommendation({
                    type: 'library',
                    title: `Sugestão: ${randomBook.title_pt}`,
                    description: `Por ${randomBook.author}`,
                    action: 'Começar a ler',
                    bookKey: randomBook.book_key,
                });
            }
        }
    }, [nodes, books]);

    return recommendation;
}
