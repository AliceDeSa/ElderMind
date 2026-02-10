/**
 * Componente para execução de quizzes educacionais
 */

import { useState } from 'react';
import { Award, ChevronLeft, HelpCircle } from 'lucide-react';

interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

interface QuizPlayerProps {
    quiz: {
        id: string;
        questions: QuizQuestion[];
    };
    onSubmit: (quizId: string, score: number) => void;
    onClose: () => void;
}

export default function QuizPlayer({ quiz, onSubmit, onClose }: QuizPlayerProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswer = (optionIndex: number) => {
        setAnswers({ ...answers, [currentQuestion]: optionIndex });
    };

    const handleFinish = () => {
        let correctCount = 0;
        quiz.questions.forEach((q, idx) => {
            if (answers[idx] === q.correctAnswer) correctCount++;
        });
        const finalScore = Math.round((correctCount / quiz.questions.length) * 100);
        setScore(finalScore);
        setShowResult(true);
        onSubmit(quiz.id, finalScore);
    };

    if (showResult) {
        return (
            <div className="animate-fade-in max-w-2xl mx-auto text-center space-y-6 bg-surfaceCard border border-border/50 rounded-2xl p-12">
                <div className="mb-4 flex justify-center">
                    {score >= 70 ? <Award size={64} className="text-yellow-500" /> : <HelpCircle size={64} className="text-textSecondary" />}
                </div>
                <h2 className="text-3xl font-bold text-white">
                    {score >= 70 ? 'Parabéns!' : 'Quase lá!'}
                </h2>
                <p className="text-textSecondary text-lg">
                    Você acertou {score}% das perguntas.
                </p>
                <button onClick={onClose} className="px-8 py-3 bg-primary hover:bg-primaryHover text-white rounded-xl font-bold transition-all">
                    Voltar para lista
                </button>
            </div>
        );
    }

    const question = quiz.questions[currentQuestion];

    return (
        <div className="animate-fade-in max-w-3xl mx-auto space-y-6">
            <button onClick={onClose} className="flex items-center text-textSecondary hover:text-white transition-colors">
                <ChevronLeft size={20} /> Cancelar
            </button>

            <div className="bg-surfaceCard border border-border/50 rounded-2xl p-8">
                <div className="flex justify-between items-center mb-8">
                    <span className="text-textSecondary text-sm">Questão {currentQuestion + 1} de {quiz.questions.length}</span>
                    <div className="h-2 w-32 bg-background rounded-full">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }} />
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-6">{question.question}</h3>

                <div className="space-y-3 mb-8">
                    {question.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${answers[currentQuestion] === idx
                                    ? 'border-primary bg-primary/10 text-white'
                                    : 'border-border/50 hover:border-textSecondary text-textSecondary hover:text-textMain'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                <div className="flex justify-between">
                    <button
                        disabled={currentQuestion === 0}
                        onClick={() => setCurrentQuestion(curr => curr - 1)}
                        className="text-textSecondary hover:text-white disabled:opacity-50"
                    >
                        Anterior
                    </button>

                    {currentQuestion < quiz.questions.length - 1 ? (
                        <button
                            onClick={() => setCurrentQuestion(curr => curr + 1)}
                            disabled={answers[currentQuestion] === undefined}
                            className="px-6 py-2 bg-white text-black font-bold rounded-lg disabled:opacity-50 hover:bg-gray-200 transition-colors"
                        >
                            Próxima
                        </button>
                    ) : (
                        <button
                            onClick={handleFinish}
                            disabled={answers[currentQuestion] === undefined}
                            className="px-6 py-2 bg-primary text-white font-bold rounded-lg disabled:opacity-50 hover:bg-primaryHover transition-colors"
                        >
                            Finalizar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
