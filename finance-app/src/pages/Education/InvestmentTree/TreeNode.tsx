import React from 'react';
import type { NodeWithProgress } from '../../../types/education';
import { Lock, CheckCircle, PlayCircle, Clock } from 'lucide-react';

interface TreeNodeProps {
    node: NodeWithProgress;
    onClick: () => void;
    isSelected: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onClick, isSelected }) => {
    const getStatusIcon = () => {
        if (node.isCompleted) {
            return <CheckCircle className="w-5 h-5 text-green-500" />;
        }
        if (node.progress?.status === 'in_progress') {
            return <PlayCircle className="w-5 h-5 text-blue-500" />;
        }
        if (node.isLocked) {
            return <Lock className="w-5 h-5 text-gray-400" />;
        }
        return <Clock className="w-5 h-5 text-yellow-500" />;
    };

    const getStatusColor = () => {
        if (node.isCompleted) return 'border-green-500/50 bg-green-500/10 shadow-green-500/20';
        if (node.progress?.status === 'in_progress') return 'border-blue-500/50 bg-blue-500/10 shadow-blue-500/20';
        if (node.isLocked) return 'border-gray-600/50 bg-gray-800/30 shadow-none';
        return 'border-yellow-500/50 bg-yellow-500/10 shadow-yellow-500/20';
    };

    const getStatusText = () => {
        if (node.isCompleted) return 'Completo';
        if (node.progress?.status === 'in_progress') return 'Em Progresso';
        if (node.isLocked) return 'Bloqueado';
        return 'Disponível';
    };

    return (
        <button
            onClick={onClick}
            disabled={node.isLocked}
            className={`
        relative p-4 rounded-2xl border-2 transition-all duration-300 w-56
        ${getStatusColor()}
        ${isSelected ? 'ring-4 ring-purple-500/50 scale-110 shadow-2xl' : 'shadow-lg'}
        ${node.isLocked ? 'cursor-not-allowed opacity-50' : 'hover:scale-105 hover:shadow-2xl cursor-pointer'}
      `}
        >
            {/* Leaf/Fruit decoration for completed nodes */}
            {node.isCompleted && (
                <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                    🍎
                </div>
            )}

            {/* Flower decoration for in-progress nodes */}
            {node.progress?.status === 'in_progress' && (
                <div className="absolute -top-2 -right-2 text-2xl">
                    🌸
                </div>
            )}

            {/* Icon/Emoji */}
            <div className="text-4xl mb-3 text-center">{node.icon || '📊'}</div>

            {/* Title */}
            <h3 className="font-bold text-white mb-2 text-center text-sm leading-tight min-h-[2.5rem] flex items-center justify-center">
                {node.title_pt}
            </h3>

            {/* Status Badge */}
            <div className="flex items-center justify-center mb-2">
                <div className="flex items-center gap-1 text-xs font-medium text-gray-300 bg-gray-900/50 px-2 py-1 rounded-full">
                    {getStatusIcon()}
                    <span>{getStatusText()}</span>
                </div>
            </div>

            {/* Progress Bar */}
            {node.progress && node.progress.lessons_completed > 0 && (
                <div className="mt-3">
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                            style={{
                                width: `${(node.progress.lessons_completed / 3) * 100}%`,
                            }}
                        />
                    </div>
                    <div className="text-xs text-gray-400 mt-1 text-center">
                        {node.progress.lessons_completed}/3 lições
                    </div>
                </div>
            )}

            {/* Quiz Score */}
            {node.progress && node.progress.quiz_score !== null && node.progress.quiz_score !== undefined && (
                <div className="mt-2 text-center">
                    <span className="text-xs font-medium text-gray-400">Quiz: </span>
                    <span className={`text-xs font-bold ${node.progress.quiz_score >= 70 ? 'text-green-400' : 'text-red-400'}`}>
                        {node.progress.quiz_score}%
                    </span>
                </div>
            )}

            {/* Time Estimate */}
            {node.estimated_minutes && (
                <div className="text-xs text-gray-500 mt-2 text-center">
                    ⏱️ {node.estimated_minutes} min
                </div>
            )}
        </button>
    );
};

export default TreeNode;
