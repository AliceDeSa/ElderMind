import React, { useState } from 'react';
import { useNodeContent } from '../../../hooks/useEducationHub';
import LessonView from './LessonView.tsx';
import QuizView from './QuizView.tsx';
import { X, BookOpen, Brain, CheckCircle } from 'lucide-react';

interface NodeDetailProps {
    nodeKey: string;
    onClose: () => void;
}

type ViewMode = 'overview' | 'lesson' | 'quiz';

const NodeDetail: React.FC<NodeDetailProps> = ({ nodeKey, onClose }) => {
    const { content, loading, error } = useNodeContent(nodeKey);
    const [viewMode, setViewMode] = useState<ViewMode>('overview');
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                </div>
            </div>
        );
    }

    if (error || !content) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 max-w-md">
                    <h3 className="text-red-600 font-semibold mb-2">Erro ao carregar conteúdo</h3>
                    <p className="text-gray-600 mb-4">{error?.message || 'Conteúdo não encontrado'}</p>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        );
    }

    const { node, lessons, quizzes, progress } = content;
    const lessonsCompleted = progress?.lessons_completed || 0;
    const allLessonsComplete = lessonsCompleted >= lessons.length;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex items-start justify-between">
                    <div className="flex-1">
                        <div className="text-4xl mb-2">{node.icon || '📊'}</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                            {node.title_pt}
                        </h2>
                        {node.description_pt && (
                            <p className="text-gray-600">{node.description_pt}</p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {viewMode === 'overview' && (
                        <div className="space-y-6">
                            {/* Progress Summary */}
                            <div className="bg-blue-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-2">Seu Progresso</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Lições completadas</span>
                                        <span className="font-medium">{lessonsCompleted}/{lessons.length}</span>
                                    </div>
                                    {progress?.quiz_score !== null && progress?.quiz_score !== undefined && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Pontuação no quiz</span>
                                            <span className={`font-medium ${progress.quiz_score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                                                {progress.quiz_score}%
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Lessons List */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5" />
                                    Lições ({lessons.length})
                                </h3>
                                <div className="space-y-2">
                                    {lessons.map((lesson, index) => (
                                        <button
                                            key={lesson.id}
                                            onClick={() => {
                                                setCurrentLessonIndex(index);
                                                setViewMode('lesson');
                                            }}
                                            className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                                    {index + 1}
                                                </div>
                                                <span className="font-medium">{lesson.title_pt}</span>
                                            </div>
                                            {index < lessonsCompleted && (
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quiz Button */}
                            {quizzes.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <Brain className="w-5 h-5" />
                                        Quiz Final
                                    </h3>
                                    <button
                                        onClick={() => setViewMode('quiz')}
                                        disabled={!allLessonsComplete}
                                        className={`
                      w-full p-4 rounded-lg font-medium transition-colors
                      ${allLessonsComplete
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            }
                    `}
                                    >
                                        {allLessonsComplete
                                            ? `Fazer Quiz (${quizzes.length} questões)`
                                            : 'Complete todas as lições para desbloquear'
                                        }
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {viewMode === 'lesson' && (
                        <LessonView
                            nodeKey={nodeKey}
                            lessons={lessons}
                            onComplete={() => setViewMode('overview')}
                            onClose={() => setViewMode('overview')}
                        />
                    )}

                    {viewMode === 'quiz' && (
                        <QuizView
                            quizzes={quizzes}
                            nodeKey={nodeKey}
                            onComplete={() => setViewMode('overview')}
                            onBack={() => setViewMode('overview')}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default NodeDetail;
