import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { LESSONS, QUIZZES } from '../data/educationData';
import { BookOpen, Award, CheckCircle, Play, ChevronLeft, HelpCircle } from 'lucide-react';

export default function Education() {
    const { educationProgress, completeLesson, submitQuizScore } = useFinance();
    const [activeTab, setActiveTab] = useState('lessons'); // 'lessons' | 'quizzes'
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'lesson' | 'quiz'
    const [selectedItem, setSelectedItem] = useState(null);

    // --- Stats Calculation ---
    const lessonsCount = LESSONS.length;
    const completedLessonsCount = educationProgress.lessonsCompleted.length;

    const quizzesCount = QUIZZES.length;
    const completedQuizzesCount = educationProgress.quizzesCompleted.length;
    const averageScore = completedQuizzesCount > 0
        ? Math.round(educationProgress.quizzesCompleted.reduce((acc, curr) => acc + curr.score, 0) / completedQuizzesCount)
        : 0;

    const totalProgress = Math.round(((completedLessonsCount + completedQuizzesCount) / (lessonsCount + quizzesCount)) * 100);

    const handleStartLesson = (lesson) => {
        setSelectedItem(lesson);
        setViewMode('lesson');
    };

    const handleStartQuiz = (quiz) => {
        setSelectedItem(quiz);
        setViewMode('quiz');
    };

    const handleClose = () => {
        setViewMode('list');
        setSelectedItem(null);
    };

    // --- Sub-Components ---

    const LessonReader = ({ lesson, onComplete, onClose }) => {
        return (
            <div className="animate-fade-in space-y-6 max-w-4xl mx-auto">
                <button onClick={onClose} className="flex items-center text-textSecondary hover:text-white transition-colors mb-4">
                    <ChevronLeft size={20} /> Voltar
                </button>

                <div className="bg-surfaceCard border border-border/50 rounded-2xl p-8">
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${lesson.bgColor} ${lesson.color} mb-3 inline-block`}>
                                {lesson.tag}
                            </span>
                            <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
                            <p className="text-textSecondary">{lesson.subtitle}</p>
                        </div>
                        <div className="bg-background/50 p-3 rounded-xl">
                            <lesson.icon size={32} className={lesson.color} />
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none mb-8" dangerouslySetInnerHTML={{ __html: lesson.content }} />

                    <button
                        onClick={() => { onComplete(lesson.id); onClose(); }}
                        className="w-full py-4 bg-primary hover:bg-primaryHover text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 flex justify-center items-center gap-2"
                    >
                        <CheckCircle size={20} />
                        Concluir Aula
                    </button>
                </div>
            </div>
        );
    };

    const QuizPlayer = ({ quiz, onSubmit, onClose }) => {
        const [currentQuestion, setCurrentQuestion] = useState(0);
        const [answers, setAnswers] = useState({});
        const [showResult, setShowResult] = useState(false);
        const [score, setScore] = useState(0);

        const handleAnswer = (optionIndex) => {
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
    };

    // --- Main Render ---

    if (viewMode === 'lesson') return <LessonReader lesson={selectedItem} onComplete={completeLesson} onClose={handleClose} />;
    if (viewMode === 'quiz') return <QuizPlayer quiz={selectedItem} onSubmit={submitQuizScore} onClose={handleClose} />;

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header / Stats */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <BookOpen className="text-primary" /> Educação Financeira
                </h1>
                <p className="text-textSecondary mb-6">Aprenda conceitos financeiros através de aulas e quizzes interativos</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-textSecondary text-sm font-medium mb-1">Aulas</h3>
                                <p className="text-3xl font-bold text-white">{completedLessonsCount} <span className="text-textSecondary text-lg font-normal">/ {lessonsCount}</span></p>
                            </div>
                            <BookOpen className="text-blue-500" size={24} />
                        </div>
                        <div className="w-full bg-background rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${(completedLessonsCount / lessonsCount) * 100}%` }} />
                        </div>
                    </div>

                    <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-textSecondary text-sm font-medium mb-1">Questionários</h3>
                                <p className="text-3xl font-bold text-white">{completedQuizzesCount} <span className="text-textSecondary text-lg font-normal">/ {quizzesCount}</span></p>
                            </div>
                            <HelpCircle className="text-purple-500" size={24} />
                        </div>
                        <div className="w-full bg-background rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full transition-all" style={{ width: `${(completedQuizzesCount / quizzesCount) * 100}%` }} />
                        </div>
                    </div>

                    <div className="bg-surfaceCard p-6 rounded-2xl border border-border/50">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-textSecondary text-sm font-medium mb-1">Pontuação Média</h3>
                                <p className="text-3xl font-bold text-white">{averageScore}%</p>
                            </div>
                            <Award className="text-yellow-500" size={24} />
                        </div>
                        <div className="w-full bg-background rounded-full h-2 mb-2">
                            <div className="bg-yellow-500 h-2 rounded-full transition-all" style={{ width: `${averageScore}%` }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-surfaceCard p-1 rounded-xl w-full md:w-fit border border-border/50">
                <button
                    onClick={() => setActiveTab('lessons')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex-1 md:flex-none ${activeTab === 'lessons' ? 'bg-background text-white shadow-sm' : 'text-textSecondary hover:text-white'
                        }`}
                >
                    <BookOpen size={16} className="inline mr-2" /> Aulas
                </button>
                <button
                    onClick={() => setActiveTab('quizzes')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex-1 md:flex-none ${activeTab === 'quizzes' ? 'bg-background text-white shadow-sm' : 'text-textSecondary hover:text-white'
                        }`}
                >
                    <HelpCircle size={16} className="inline mr-2" /> Questionários
                </button>
            </div>

            {/* Content List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTab === 'lessons' ? (
                    LESSONS.map(lesson => {
                        const isCompleted = educationProgress.lessonsCompleted.includes(lesson.id);
                        return (
                            <div key={lesson.id} className="bg-surfaceCard p-6 rounded-2xl border border-border/50 hover:border-primary/50 transition-all group flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${lesson.bgColor} ${lesson.color}`}>
                                        {lesson.level}
                                    </span>
                                    {isCompleted && <CheckCircle className="text-emerald-500" size={20} />}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{lesson.title}</h3>
                                <p className="text-textSecondary text-sm mb-6 flex-1">{lesson.description}</p>

                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xs text-textSecondary">{lesson.duration}</span>
                                    <button
                                        onClick={() => handleStartLesson(lesson)}
                                        className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                                    >
                                        <Play size={14} fill="currentColor" /> {isCompleted ? 'Rever' : 'Iniciar Aula'}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    QUIZZES.map(quiz => {
                        const scoreData = educationProgress.quizzesCompleted.find(q => q.quizId === quiz.id);
                        return (
                            <div key={quiz.id} className="bg-surfaceCard p-6 rounded-2xl border border-border/50 hover:border-purple-500/50 transition-all group flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-purple-500/10 text-purple-500 px-2 py-1 rounded-md text-xs font-bold">Quiz</span>
                                    {scoreData && <span className="text-emerald-500 font-bold text-sm">Nota: {scoreData.score}</span>}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-500 transition-colors">{quiz.title}</h3>
                                <p className="text-textSecondary text-sm mb-6 flex-1">{quiz.description}</p>

                                <div className="mt-auto flex justify-end">
                                    <button
                                        onClick={() => handleStartQuiz(quiz)}
                                        className="px-4 py-2 bg-purple-500/10 text-purple-500 hover:bg-purple-500 hover:text-white rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                                    >
                                        <Play size={14} fill="currentColor" /> {scoreData ? 'Tentar Novamente' : 'Iniciar Quiz'}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
