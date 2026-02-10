import React, { useEffect, useState } from 'react';
import { X, Trophy } from 'lucide-react';
import { Achievement } from '../../types/achievements';
import { useTranslation } from 'react-i18next';

interface Props {
    achievement: Achievement;
    onDismiss: () => void;
}

const AchievementNotification: React.FC<Props> = ({ achievement, onDismiss }) => {
    const [isVisible, setIsVisible] = useState(false);
    const { t, i18n } = useTranslation('education');
    const isPt = i18n.language.startsWith('pt');

    const title = isPt ? achievement.title_pt : achievement.title_en;
    const description = isPt ? achievement.description_pt : achievement.description_en;

    useEffect(() => {
        // Slide in
        const timerIn = setTimeout(() => setIsVisible(true), 100);

        // Auto dismiss
        const timerOut = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onDismiss, 500); // Wait for exit animation
        }, 5000);

        return () => {
            clearTimeout(timerIn);
            clearTimeout(timerOut);
        };
    }, [onDismiss]);

    return (
        <div
            className={`
                fixed top-24 right-4 z-50
                flex items-center gap-4
                bg-gray-800/90 backdrop-blur-md border border-yellow-500/30
                p-4 rounded-xl shadow-2xl shadow-yellow-500/10
                transform transition-all duration-500
                ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
            `}
        >
            <div className="relative">
                <div className="absolute inset-0 bg-yellow-500 blur-lg opacity-20 animate-pulse"></div>
                <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-full text-2xl">
                    {achievement.icon}
                </div>
                <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1 animate-bounce">
                    <Trophy className="w-3 h-3 text-black" />
                </div>
            </div>

            <div className="flex-1 min-w-[200px]">
                <div className="text-yellow-500 text-xs font-bold uppercase tracking-wider mb-0.5">
                    {t('achievements.unlockedNotification')}
                </div>
                <h3 className="text-white font-bold">{title}</h3>
                <p className="text-gray-400 text-xs">{description}</p>
            </div>

            <button
                onClick={() => {
                    setIsVisible(false);
                    setTimeout(onDismiss, 300);
                }}
                className="text-gray-500 hover:text-white transition-colors"
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default AchievementNotification;
