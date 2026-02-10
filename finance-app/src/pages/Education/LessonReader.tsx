/**
 * Componente para leitura de aulas educacionais
 */

import { CheckCircle, ChevronLeft } from 'lucide-react';

interface LessonReaderProps {
    lesson: {
        id: string;
        title: string;
        subtitle: string;
        tag: string;
        color: string;
        bgColor: string;
        icon: React.ComponentType<{ size: number; className?: string }>;
        content: string;
    };
    onComplete: (lessonId: string) => void;
    onClose: () => void;
}

export default function LessonReader({ lesson, onComplete, onClose }: LessonReaderProps) {
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
}
