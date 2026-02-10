import React from 'react';
import { Lock, Check } from 'lucide-react';
import type { AchievementWithStatus } from '../../types/achievements';
import { useTranslation } from 'react-i18next';

interface Props {
    achievement: AchievementWithStatus;
    size?: 'small' | 'medium' | 'large';
    showTitle?: boolean;
}

const AchievementBadge: React.FC<Props> = ({ achievement, size = 'medium', showTitle = true }) => {
    const { icon, isUnlocked, progress, category } = achievement;
    const { i18n } = useTranslation('education');
    const isPt = i18n.language.startsWith('pt');
    const title = isPt ? achievement.title_pt : achievement.title_en;

    const sizeClasses = {
        small: 'w-10 h-10 text-xl',
        medium: 'w-16 h-16 text-3xl',
        large: 'w-24 h-24 text-5xl',
    };

    const bgColors = {
        milestone: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
        streak: 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
        mastery: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
        special: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
    };

    const glowColors = {
        milestone: 'group-hover:shadow-blue-500/30',
        streak: 'group-hover:shadow-orange-500/30',
        mastery: 'group-hover:shadow-purple-500/30',
        special: 'group-hover:shadow-yellow-500/30',
    };

    return (
        <div className={`group flex flex-col items-center gap-2 ${!isUnlocked ? 'opacity-50 grayscale' : ''}`}>
            <div className={`
                relative flex items-center justify-center rounded-full
                bg-gradient-to-br border backdrop-blur-sm
                transition-all duration-300 transform group-hover:scale-110
                ${isUnlocked ? 'shadow-lg' : ''}
                ${isUnlocked ? glowColors[category] : ''}
                ${isUnlocked ? bgColors[category] : 'bg-gray-800/50 border-gray-700'}
                ${sizeClasses[size]}
            `}>
                <span className="transform group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </span>

                {/* Lock Overlay */}
                {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                        <Lock className="w-1/3 h-1/3 text-gray-400" />
                    </div>
                )}

                {/* Progress Ring (for unlocked or partially unlocked) */}
                {!isUnlocked && progress > 0 && (
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                        <circle
                            cx="50%" cy="50%" r="48%"
                            fill="none" stroke="currentColor" strokeWidth="2"
                            className="text-gray-700"
                        />
                        <circle
                            cx="50%" cy="50%" r="48%"
                            fill="none" stroke="currentColor" strokeWidth="2"
                            strokeDasharray={`${2 * Math.PI * 48}`}
                            strokeDashoffset={`${2 * Math.PI * 48 * (1 - progress / 100)}`}
                            className="text-white opacity-50 transition-all duration-500"
                        />
                    </svg>
                )}

                {/* Completed Checkmark */}
                {isUnlocked && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-gray-900">
                        <Check className="w-3 h-3 text-white" />
                    </div>
                )}
            </div>

            {showTitle && (
                <div className="text-center">
                    <span className={`text-xs font-medium block ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                        {title}
                    </span>
                    {!isUnlocked && progress > 0 && (
                        <span className="text-[10px] text-gray-500">
                            {progress}%
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default AchievementBadge;
