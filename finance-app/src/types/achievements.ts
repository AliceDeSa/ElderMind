export type AchievementCategory = 'milestone' | 'streak' | 'mastery' | 'special';

export type AchievementRequirementType =
    | 'nodes_completed'
    | 'excerpts_read'
    | 'streak_days'
    | 'quiz_perfect'
    | 'favorites'
    | 'category_complete';

export interface AchievementRequirement {
    type: AchievementRequirementType;
    value: number;
    category?: string; // For category mastery
}

export interface Achievement {
    key: string;
    title_pt: string;
    title_en: string;
    description_pt: string;
    description_en: string;
    icon: string; // emoji or icon name
    category: AchievementCategory;
    requirement: AchievementRequirement;
}

export interface UserAchievement {
    id: string;
    user_id: string;
    achievement_key: string;
    unlocked_at: string;
    seen: boolean;
}

export interface AchievementWithStatus extends Achievement {
    isUnlocked: boolean;
    unlockedAt?: string;
    progress: number; // 0 to 100
}
