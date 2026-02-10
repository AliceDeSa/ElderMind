import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type {
    TreeNode,
    TreeLesson,
    TreeQuiz,
    UserTreeProgress,
    NodeWithProgress,
    NodeContent,
    QuizResult,
    ProgressStatus
} from '../types/education';

// ============================================
// TREE NODES
// ============================================

/**
 * Fetch all tree nodes with optional progress data
 */
export function useTreeNodes(includeProgress = false) {
    const [nodes, setNodes] = useState<NodeWithProgress[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchNodes() {
            try {
                setLoading(true);

                // Fetch all active nodes
                const { data: nodesData, error: nodesError } = await supabase
                    .from('tree_nodes')
                    .select('*')
                    .eq('is_active', true)
                    .order('level', { ascending: true })
                    .order('position_x', { ascending: true });

                if (nodesError) throw nodesError;

                if (!includeProgress) {
                    const nodesWithMeta = (nodesData || []).map(node => ({
                        ...node,
                        isLocked: node.unlock_requirement !== null,
                        isCompleted: false,
                    }));
                    setNodes(nodesWithMeta);
                    setLoading(false);
                    return;
                }

                // Fetch user progress
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    const nodesWithMeta = (nodesData || []).map(node => ({
                        ...node,
                        isLocked: node.node_key !== 'root',
                        isCompleted: false,
                    }));
                    setNodes(nodesWithMeta);
                    setLoading(false);
                    return;
                }

                const { data: progressData } = await supabase
                    .from('user_tree_progress')
                    .select('*')
                    .eq('user_id', user.id);

                const progressMap = new Map(
                    (progressData || []).map(p => [p.node_key, p])
                );

                const nodesWithProgress = (nodesData || []).map(node => ({
                    ...node,
                    progress: progressMap.get(node.node_key),
                    isLocked: !progressMap.get(node.node_key) && node.node_key !== 'root',
                    isCompleted: progressMap.get(node.node_key)?.status === 'completed',
                }));

                setNodes(nodesWithProgress);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchNodes();
    }, [includeProgress]);

    return { nodes, loading, error };
}

/**
 * Fetch complete node content: lessons + quizzes + progress
 */
export function useNodeContent(nodeKey: string | null) {
    const [content, setContent] = useState<NodeContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!nodeKey) {
            setContent(null);
            setLoading(false);
            return;
        }

        async function fetchContent() {
            try {
                setLoading(true);

                // Fetch node
                const { data: nodeData, error: nodeError } = await supabase
                    .from('tree_nodes')
                    .select('*')
                    .eq('node_key', nodeKey)
                    .single();

                if (nodeError) throw nodeError;

                // Fetch lessons
                const { data: lessonsData, error: lessonsError } = await supabase
                    .from('tree_lessons')
                    .select('*')
                    .eq('node_key', nodeKey)
                    .order('lesson_order', { ascending: true });

                if (lessonsError) throw lessonsError;

                // Fetch quizzes
                const { data: quizzesData, error: quizzesError } = await supabase
                    .from('tree_quizzes')
                    .select('*')
                    .eq('node_key', nodeKey)
                    .order('question_order', { ascending: true });

                if (quizzesError) throw quizzesError;

                // Fetch user progress
                const { data: { user } } = await supabase.auth.getUser();
                let progressData = null;

                if (user) {
                    const { data } = await supabase
                        .from('user_tree_progress')
                        .select('*')
                        .eq('user_id', user.id)
                        .eq('node_key', nodeKey)
                        .maybeSingle();

                    progressData = data;
                }

                setContent({
                    node: nodeData,
                    lessons: lessonsData || [],
                    quizzes: quizzesData || [],
                    progress: progressData || undefined,
                });
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchContent();
    }, [nodeKey]);

    return { content, loading, error };
}

/**
 * Get user's overall progress stats
 */
export function useUserProgress() {
    const [stats, setStats] = useState({
        totalNodes: 0,
        completedNodes: 0,
        inProgressNodes: 0,
        percentComplete: 0,
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

                const { count: totalCount } = await supabase
                    .from('tree_nodes')
                    .select('*', { count: 'exact', head: true })
                    .eq('is_active', true);

                const { data: progressData } = await supabase
                    .from('user_tree_progress')
                    .select('status')
                    .eq('user_id', user.id);

                const completed = progressData?.filter(p => p.status === 'completed').length || 0;
                const inProgress = progressData?.filter(p => p.status === 'in_progress').length || 0;
                const total = totalCount || 60;

                setStats({
                    totalNodes: total,
                    completedNodes: completed,
                    inProgressNodes: inProgress,
                    percentComplete: Math.round((completed / total) * 100),
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
 * Mark lesson as completed
 */
export async function markLessonComplete(nodeKey: string, lessonOrder: number) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data: progress } = await supabase
        .from('user_tree_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('node_key', nodeKey)
        .maybeSingle();

    const newLessonsCompleted = Math.max(progress?.lessons_completed || 0, lessonOrder);

    if (progress) {
        const { error } = await supabase
            .from('user_tree_progress')
            .update({
                lessons_completed: newLessonsCompleted,
                status: 'in_progress',
            })
            .eq('id', progress.id);

        if (error) throw error;
    } else {
        const { error } = await supabase
            .from('user_tree_progress')
            .insert({
                user_id: user.id,
                node_key: nodeKey,
                lessons_completed: newLessonsCompleted,
                status: 'in_progress',
            });

        if (error) throw error;
    }
}

/**
 * Submit quiz and update progress
 */
export async function submitQuiz(
    nodeKey: string,
    result: QuizResult
): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data: progress } = await supabase
        .from('user_tree_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('node_key', nodeKey)
        .maybeSingle();

    const newAttempts = (progress?.quiz_attempts || 0) + 1;
    const newStatus: ProgressStatus = result.passed ? 'completed' : 'in_progress';

    if (progress) {
        const { error } = await supabase
            .from('user_tree_progress')
            .update({
                quiz_score: result.score,
                quiz_attempts: newAttempts,
                status: newStatus,
                completed_at: result.passed ? new Date().toISOString() : null,
            })
            .eq('id', progress.id);

        if (error) throw error;
    } else {
        const { error } = await supabase
            .from('user_tree_progress')
            .insert({
                user_id: user.id,
                node_key: nodeKey,
                quiz_score: result.score,
                quiz_attempts: newAttempts,
                status: newStatus,
                completed_at: result.passed ? new Date().toISOString() : null,
            });

        if (error) throw error;
    }

    // Unlock next node if completed
    if (result.passed) {
        await unlockNextNode(nodeKey);
    }
}

/**
 * Unlock the next node in sequence
 */
async function unlockNextNode(currentNodeKey: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: nextNodes } = await supabase
        .from('tree_nodes')
        .select('node_key')
        .eq('unlock_requirement', currentNodeKey);

    if (!nextNodes || nextNodes.length === 0) return;

    const unlockEntries = nextNodes.map(node => ({
        user_id: user.id,
        node_key: node.node_key,
        status: 'unlocked' as ProgressStatus,
    }));

    await supabase
        .from('user_tree_progress')
        .insert(unlockEntries);
}
