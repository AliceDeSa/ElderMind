import React, { useState } from 'react';
import { submitQuiz } from '../../../hooks/useEducationHub';
import type { TreeQuiz, QuizResult, QuizAttempt } from '../../../types/education';
import { ChevronLeft, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface QuizViewProps {
    quizzes: TreeQuiz[];
    nodeKey: string;
    onComplete: () => void;
    onBack: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ quizzes, nodeKey, onComplete, onBack }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
    const { t, i18n } = useTranslation('education');
    const isPt = i18n.language.startsWith('pt');

    const handleSelectAnswer = (index: number) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestion] = index;
        setSelectedAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < quizzes.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            calculateResults();
        }
    };

    const calculateResults = async () => {
        const attempts: QuizAttempt[] = quizzes.map((quiz, index) => ({
            questionId: quiz.id,
            selectedIndex: selectedAnswers[index] ?? -1,
            isCorrect: selectedAnswers[index] === quiz.correct_index,
        }));

        const correctCount = attempts.filter(a => a.isCorrect).length;
        const score = Math.round((correctCount / quizzes.length) * 100);
        const passed = score >= 70;

        const result: QuizResult = {
            score,
            correctCount,
            totalQuestions: quizzes.length,
            passed,
            attempts,
        };

        setQuizResult(result);
        setShowResults(true);

        // Submit to database
        try {
            await submitQuiz(nodeKey, result);
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    const handleRetry = () => {
        setCurrentQuestion(0);
        setSelectedAnswers([]);
        setShowResults(false);
        setQuizResult(null);
    };

    if (showResults && quizResult) {
        return (
            <div className="quiz-results text-center">
                {/* Result Icon */}
                <div className="mb-6">
                    {quizResult.passed ? (
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-4">
                            <Trophy className="w-12 h-12 text-green-600" />
                        </div>
                    ) : (
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-4">
                            <XCircle className="w-12 h-12 text-red-600" />
                        </div>
                    )}
                </div>

                {/* Score */}
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {quizResult.score}%
                </h2>
                <p className="text-gray-600 mb-8">
                    {t('quiz.results.score', { correct: quizResult.correctCount, total: quizResult.totalQuestions })}
                </p>

                {/* Message */}
                {quizResult.passed ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                        <h3 className="text-green-800 font-semibold mb-2">{t('quiz.results.success.title')}</h3>
                        <p className="text-green-700">
                            {t('quiz.results.success.message')}
                        </p>
                    </div>
                ) : (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                        <h3 className="text-red-800 font-semibold mb-2">{t('quiz.results.failure.title')}</h3>
                        <p className="text-red-700">
                            {t('quiz.results.failure.message')}
                        </p>
                    </div>
                )}

                {/* Review Answers */}
                <div className="text-left space-y-4 mb-8">
                    <h3 className="font-semibold text-gray-900 mb-4">{t('quiz.review.title')}</h3>
                    {quizzes.map((quiz, index) => {
                        const attempt = quizResult.attempts[index];
                        const question = isPt ? quiz.question_pt : quiz.question_en;
                        const options = isPt ? quiz.options_pt : quiz.options_en;
                        const explanation = isPt ? quiz.explanation_pt : quiz.explanation_en;

                        return (
                            <div
                                key={quiz.id}
                                className={`p-4 rounded-lg border-2 ${attempt.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                                    }`}
                            >
                                <div className="flex items-start gap-3 mb-2">
                                    {attempt.isCorrect ? (
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    )}
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900 mb-2">{question}</p>
                                        <p className="text-sm text-gray-600 mb-1">
                                            {t('quiz.review.yourAnswer')} <span className={attempt.isCorrect ? 'text-green-700' : 'text-red-700'}>
                                                {options[attempt.selectedIndex]}
                                            </span>
                                        </p>
                                        {!attempt.isCorrect && (
                                            <p className="text-sm text-gray-600 mb-2">
                                                {t('quiz.review.correctAnswer')} <span className="text-green-700">
                                                    {options[quiz.correct_index]}
                                                </span>
                                            </p>
                                        )}
                                        {explanation && (
                                            <p className="text-sm text-gray-700 mt-2 italic">
                                                {explanation}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {quizResult.passed ? (
                        <button
                            onClick={onComplete}
                            className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                        >
                            {t('quiz.continueButton')}
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={onBack}
                                className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                            >
                                {t('quiz.reviewButton')}
                            </button>
                            <button
                                onClick={handleRetry}
                                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                            >
                                {t('quiz.retryButton')}
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    }

    const quiz = quizzes[currentQuestion];
    const selectedAnswer = selectedAnswers[currentQuestion];
    const question = isPt ? quiz.question_pt : quiz.question_en;
    const options = isPt ? quiz.options_pt : quiz.options_en;

    return (
        <div className="quiz-view">
            {/* Progress */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">
                        {t('quiz.progress', { current: currentQuestion + 1, total: quizzes.length })}
                    </span>
                    <span className="text-sm font-medium text-blue-600">
                        {t('quiz.answered', { count: selectedAnswers.filter(a => a !== undefined).length, total: quizzes.length })}
                    </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / quizzes.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    {question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelectAnswer(index)}
                            className={`
                w-full p-4 rounded-lg border-2 text-left transition-all
                ${selectedAnswer === index
                                    ? 'border-blue-600 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }
              `}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${selectedAnswer === index
                                        ? 'border-blue-600 bg-blue-600'
                                        : 'border-gray-300'
                                    }
                `}>
                                    {selectedAnswer === index && (
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    )}
                                </div>
                                <span className="font-medium text-gray-900">{option}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between pt-6 border-t border-gray-200 gap-4 sm:gap-0">
                <button
                    onClick={currentQuestion > 0 ? () => setCurrentQuestion(currentQuestion - 1) : onBack}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                    {currentQuestion > 0 ? t('quiz.previousButton') : t('quiz.backButton')}
                </button>

                <button
                    onClick={handleNext}
                    disabled={selectedAnswer === undefined}
                    className={`
            w-full sm:w-auto px-6 py-2 rounded-lg font-medium transition-colors
            ${selectedAnswer !== undefined
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }
          `}
                >
                    {currentQuestion < quizzes.length - 1 ? t('quiz.nextButton') : t('quiz.finishButton')}
                </button>
            </div>
        </div>
    );
};

export default QuizView;
