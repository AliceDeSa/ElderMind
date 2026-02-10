import React, { useState } from 'react';
import { markLessonComplete } from '../../../hooks/useEducationHub';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import type { TreeLesson } from '../../../types/education';
import ReactMarkdown from 'react-markdown';
import { useAchievements } from '../../../hooks/useAchievements';
import { useTranslation } from 'react-i18next';

interface LessonViewProps {
    nodeKey: string;
    lessons: TreeLesson[];
    onComplete: () => void;
    onClose: () => void;
}

const LessonView: React.FC<LessonViewProps> = ({
    nodeKey,
    lessons,
    onComplete,
    onClose,
}) => {
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [completing, setCompleting] = useState(false);
    const { checkAchievements } = useAchievements();
    const { t, i18n } = useTranslation('education');

    const lesson = lessons[currentLessonIndex];
    const lessonNumber = currentLessonIndex + 1;
    const totalLessons = lessons.length;

    const isPt = i18n.language.startsWith('pt');
    const content = isPt ? lesson?.content_pt : lesson?.content_en;
    const title = isPt ? lesson?.title_pt : lesson?.title_en;

    // Track if the current lesson is completed in the UI state
    const [completedMap, setCompletedMap] = useState<Record<number, boolean>>({});

    const handleNext = () => {
        if (currentLessonIndex < totalLessons - 1) {
            setCurrentLessonIndex(prev => prev + 1);
        } else {
            onComplete(); // All lessons finished
        }
    };

    const handleBack = () => {
        if (currentLessonIndex > 0) {
            setCurrentLessonIndex(prev => prev - 1);
        } else {
            onClose(); // Exit to tree
        }
    };

    const handleComplete = async () => {
        try {
            setCompleting(true);
            await markLessonComplete(nodeKey, lessonNumber);

            // Mark locally as complete
            setCompletedMap(prev => ({ ...prev, [lessonNumber]: true }));

            // Trigger achievement check
            checkAchievements();

            // Auto-advance after 1 second if not the last lesson
            setTimeout(() => {
                if (currentLessonIndex < totalLessons - 1) {
                    handleNext();
                } else {
                    onComplete();
                }
            }, 1000);
        } catch (error) {
            console.error('Error marking lesson complete:', error);
        } finally {
            setCompleting(false);
        }
    };

    const isCompleted = completedMap[lessonNumber];

    return (
        <div className="lesson-view">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">
                        {t('lesson.progress', { current: lessonNumber, total: totalLessons })}
                    </span>
                    <div className="flex gap-1">
                        {Array.from({ length: totalLessons }).map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 w-8 rounded-full ${i < lessonNumber ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            </div>

            {/* Content */}
            <div className="prose prose-blue max-w-none mb-8">
                <ReactMarkdown>{content || ''}</ReactMarkdown>
            </div>

            {/* Media */}
            {lesson?.media_url && (
                <div className="mb-8">
                    {lesson.media_type === 'video' && (
                        <video
                            src={lesson.media_url}
                            controls
                            className="w-full rounded-lg"
                        />
                    )}
                    {lesson.media_type === 'image' && (
                        <img
                            src={lesson.media_url}
                            alt={title}
                            className="w-full rounded-lg"
                        />
                    )}
                </div>
            )}

            {/* Navigation */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between pt-6 border-t border-gray-200 gap-4 sm:gap-0">
                <button
                    onClick={handleBack}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                    {currentLessonIndex > 0 ? t('lesson.previousButton') : t('lesson.backButton')}
                </button>

                {isCompleted ? (
                    <div className="flex items-center gap-2 text-green-600 font-medium">
                        <CheckCircle className="w-5 h-5" />
                        {t('lesson.completed')}
                    </div>
                ) : (
                    <button
                        onClick={handleComplete}
                        disabled={completing}
                        className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium ${completing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {completing ? t('lesson.completing') : t('lesson.markComplete')}
                        <ChevronRight className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default LessonView;
