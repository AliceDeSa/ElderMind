/**
 * Hook para gerenciar progresso educacional
 */

import { useState } from 'react';
import type { EducationProgress } from '../types/models';
import Logger from '../core/Logger';
import EventBus from '../core/EventBus';
import { EVENTS } from '../core/constants';

interface UseEducationReturn {
    educationProgress: EducationProgress;
    completeLesson: (lessonId: string) => void;
    submitQuizScore: (quizId: string, score: number) => void;
}

export function useEducation(): UseEducationReturn {
    const [educationProgress, setEducationProgress] = useState<EducationProgress>({
        lessonsCompleted: [],
        quizzesCompleted: []
    });

    const completeLesson = (lessonId: string): void => {
        if (!educationProgress.lessonsCompleted.includes(lessonId)) {
            Logger.edu(`Completando lição: ${lessonId}`);
            setEducationProgress(prev => ({
                ...prev,
                lessonsCompleted: [...prev.lessonsCompleted, lessonId]
            }));
            EventBus.emit(EVENTS.EDU_LESSON_COMPLETED, lessonId);
            Logger.edu('Lição completada com sucesso');
        }
    };

    const submitQuizScore = (quizId: string, score: number): void => {
        Logger.edu(`Submetendo quiz ${quizId} com score ${score}`);
        setEducationProgress(prev => {
            const otherQuizzes = prev.quizzesCompleted.filter(q => q.quizId !== quizId);
            return {
                ...prev,
                quizzesCompleted: [...otherQuizzes, { quizId, score }]
            };
        });
        EventBus.emit(EVENTS.EDU_QUIZ_COMPLETED, { quizId, score });
        Logger.edu('Quiz completado com sucesso');
    };

    return {
        educationProgress,
        completeLesson,
        submitQuizScore
    };
}
