import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { ACHIEVEMENTS } from '../data/achievements';
import { useEducationStats } from './useEducationStats';
import type { AchievementWithStatus, Achievement, UserAchievement } from '../types/achievements';
import confetti from 'canvas-confetti';

export function useAchievements() {
    const [achievements, setAchievements] = useState<AchievementWithStatus[]>([]);
    const [loading, setLoading] = useState(true);
    const [newUnlocks, setNewUnlocks] = useState<Achievement[]>([]);
    const stats = useEducationStats();

    // Fetch user achievements
    const fetchAchievements = useCallback(async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: userAchievements, error } = await supabase
                .from('user_achievements')
                .select('*')
                .eq('user_id', user.id);

            if (error) {
                // Ignore "relation does not exist" error (42P01) if migration hasn't run yet
                if (error.code !== '42P01') {
                    console.error('Error fetching achievements:', error);
                }
                setLoading(false);
                return;
            }

            const unlockedMap = new Map((userAchievements || []).map((ua: UserAchievement) => [ua.achievement_key, ua]));

            // Map all achievements with status
            const achievementStatus = ACHIEVEMENTS.map(achievement => {
                const ua = unlockedMap.get(achievement.key);
                let progress = 0;

                // Calculate progress based on stats
                switch (achievement.requirement.type) {
                    case 'nodes_completed':
                        progress = Math.min(100, (stats.tree.completedNodes / achievement.requirement.value) * 100);
                        break;
                    case 'excerpts_read':
                        progress = Math.min(100, (stats.library.excerptsRead / achievement.requirement.value) * 100);
                        break;
                    case 'streak_days':
                        progress = Math.min(100, (stats.overall.currentStreak / achievement.requirement.value) * 100);
                        break;
                    case 'favorites':
                        progress = Math.min(100, (stats.library.favoriteBooks / achievement.requirement.value) * 100);
                        break;
                    // Add other cases as needed
                    default:
                        progress = ua ? 100 : 0;
                }

                return {
                    ...achievement,
                    isUnlocked: !!ua,
                    unlockedAt: ua?.unlocked_at,
                    progress: Math.round(progress)
                };
            });

            setAchievements(achievementStatus);
        } catch (error) {
            console.error('Error fetching achievements:', error);
        } finally {
            setLoading(false);
        }
    }, [stats]);

    useEffect(() => {
        if (!stats.loading) {
            fetchAchievements();
        }
    }, [stats.loading, fetchAchievements]);

    // Check for new unlocks
    const checkUnlocks = useCallback(async () => {
        if (stats.loading || loading) return;

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const unlockedNow: Achievement[] = [];

        for (const achievement of ACHIEVEMENTS) {
            // Skip if already unlocked
            const isAlreadyUnlocked = achievements.find(a => a.key === achievement.key)?.isUnlocked;
            if (isAlreadyUnlocked) continue;

            let shouldUnlock = false;

            // Check requirements
            switch (achievement.requirement.type) {
                case 'nodes_completed':
                    shouldUnlock = stats.tree.completedNodes >= achievement.requirement.value;
                    break;
                case 'excerpts_read':
                    shouldUnlock = stats.library.excerptsRead >= achievement.requirement.value;
                    break;
                case 'streak_days':
                    shouldUnlock = stats.overall.currentStreak >= achievement.requirement.value;
                    break;
                case 'favorites':
                    shouldUnlock = stats.library.favoriteBooks >= achievement.requirement.value;
                    break;
                // Add logic for categories and other types
            }

            if (shouldUnlock) {
                // Persist unlock
                const { error } = await supabase
                    .from('user_achievements')
                    .insert({
                        user_id: user.id,
                        achievement_key: achievement.key,
                        unlocked_at: new Date().toISOString(),
                        seen: false
                    });

                if (!error) {
                    unlockedNow.push(achievement);

                    // Trigger celebration
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#FFD700', '#FFA500', '#FF4500']
                    });
                }
            }
        }

        if (unlockedNow.length > 0) {
            setNewUnlocks(prev => [...prev, ...unlockedNow]);
            fetchAchievements(); // Refresh list associated with logic
        }

    }, [achievements, stats, loading, fetchAchievements]);

    // Expose a check function to be called after actions
    const checkAchievements = () => {
        checkUnlocks();
    };

    const clearNewUnlocks = () => {
        setNewUnlocks([]);
    };

    return {
        achievements,
        loading,
        newUnlocks,
        checkAchievements,
        clearNewUnlocks
    };
}
