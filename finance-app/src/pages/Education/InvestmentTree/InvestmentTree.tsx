import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useTreeNodes } from '../../../hooks/useEducationHub';
import TreeNode from './TreeNode.tsx';
import NodeDetail from './NodeDetail.tsx';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import type { NodeWithProgress } from '../../../types/education';

const InvestmentTree: React.FC = () => {
    const { nodes, loading, error } = useTreeNodes(true);
    const [selectedNode, setSelectedNode] = useState<string | null>(null);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Carregando árvore de investimentos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                <h3 className="text-red-400 font-semibold mb-2">Erro ao carregar árvore</h3>
                <p className="text-red-300">{error.message}</p>
            </div>
        );
    }

    // Group nodes by level
    const nodesByLevel = nodes.reduce((acc, node) => {
        if (!acc[node.level]) acc[node.level] = [];
        acc[node.level].push(node);
        return acc;
    }, {} as Record<number, NodeWithProgress[]>);

    const levels = Object.keys(nodesByLevel).map(Number).sort((a, b) => b - a); // REVERSED: highest to lowest
    const maxLevel = Math.max(...levels);

    // Calculate tree dimensions with more spacing
    const maxNodesPerLevel = Math.max(...levels.map(l => nodesByLevel[l].length));
    const treeWidth = Math.max(2000, maxNodesPerLevel * 400); // Increased spacing
    const treeHeight = (maxLevel + 1) * 450; // Increased vertical spacing

    // Calculate node positions (bottom-up tree layout)
    const calculateNodePosition = (level: number, nodeIndex: number, totalInLevel: number) => {
        // Invert Y: higher levels = lower on screen (tree grows upward)
        const levelY = treeHeight - (level * 450) - 150;
        const centerX = treeWidth / 2;

        if (totalInLevel === 1) {
            return { x: centerX, y: levelY };
        }

        // Spread nodes horizontally with generous spacing
        const spread = Math.min(1200, totalInLevel * 350);
        const step = spread / (totalInLevel - 1);
        const x = centerX - (spread / 2) + (nodeIndex * step);

        return { x, y: levelY };
    };

    return (
        <div className="investment-tree-container relative h-[calc(100vh-180px)]">
            {/* Header */}
            <div className="mb-3 text-center">
                <h1 className="text-3xl font-bold text-white mb-1">
                    🌳 Árvore de Investimentos
                </h1>
                <p className="text-gray-400 text-sm">
                    🖱️ Scroll = Zoom • ✋ Arraste = Navegar • 👆 Clique nos nodes
                </p>
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-3 gap-3 mb-3 max-w-2xl mx-auto">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 text-center">
                    <div className="text-xl font-bold text-blue-400">
                        {nodes.filter(n => n.isCompleted).length}
                    </div>
                    <div className="text-xs text-gray-400">Completos</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-2 text-center">
                    <div className="text-xl font-bold text-green-400">
                        {nodes.filter(n => n.progress?.status === 'in_progress').length}
                    </div>
                    <div className="text-xs text-gray-400">Em Progresso</div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-2 text-center">
                    <div className="text-xl font-bold text-purple-400">
                        {nodes.length}
                    </div>
                    <div className="text-xs text-gray-400">Total</div>
                </div>
            </div>

            {/* Interactive Tree Canvas */}
            <TransformWrapper
                initialScale={0.5}
                minScale={0.2}
                maxScale={1.5}
                centerOnInit={true}
                wheel={{
                    step: 0.05,
                    smoothStep: 0.01
                }}
                panning={{
                    disabled: false,
                    velocityDisabled: false
                }}
                doubleClick={{ disabled: false, mode: 'zoomIn' }}
            >
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                        {/* Zoom Controls */}
                        <div className="absolute top-2 right-2 z-20 flex flex-col gap-2">
                            <button
                                onClick={() => zoomIn(0.2)}
                                className="p-3 bg-gray-800/95 hover:bg-purple-600 border border-gray-600 rounded-lg text-white transition-all shadow-lg hover:shadow-purple-500/50"
                                title="Zoom In (ou scroll up)"
                            >
                                <ZoomIn className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => zoomOut(0.2)}
                                className="p-3 bg-gray-800/95 hover:bg-purple-600 border border-gray-600 rounded-lg text-white transition-all shadow-lg hover:shadow-purple-500/50"
                                title="Zoom Out (ou scroll down)"
                            >
                                <ZoomOut className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => resetTransform()}
                                className="p-3 bg-gray-800/95 hover:bg-purple-600 border border-gray-600 rounded-lg text-white transition-all shadow-lg hover:shadow-purple-500/50"
                                title="Reset View"
                            >
                                <Maximize2 className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Tree Canvas */}
                        <TransformComponent
                            wrapperClass="!w-full !h-full border-2 border-purple-500/30 rounded-xl overflow-hidden shadow-2xl"
                            contentClass="!cursor-grab active:!cursor-grabbing"
                        >
                            <svg
                                width={treeWidth}
                                height={treeHeight}
                                className="relative"
                            >
                                {/* Background Tree Silhouette */}
                                <defs>
                                    <radialGradient id="bgGradient" cx="50%" cy="100%" r="80%">
                                        <stop offset="0%" stopColor="#1F2937" />
                                        <stop offset="50%" stopColor="#111827" />
                                        <stop offset="100%" stopColor="#030712" />
                                    </radialGradient>

                                    <linearGradient id="trunkGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
                                        <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.7" />
                                        <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.4" />
                                    </linearGradient>

                                    {/* Tree canopy pattern */}
                                    <pattern id="leaves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                        <circle cx="20" cy="20" r="15" fill="#10B981" opacity="0.05" />
                                        <circle cx="60" cy="40" r="20" fill="#059669" opacity="0.05" />
                                        <circle cx="80" cy="70" r="18" fill="#047857" opacity="0.05" />
                                    </pattern>
                                </defs>

                                {/* Background */}
                                <rect width={treeWidth} height={treeHeight} fill="url(#bgGradient)" />

                                {/* Decorative tree canopy in background */}
                                <ellipse
                                    cx={treeWidth / 2}
                                    cy={200}
                                    rx={600}
                                    ry={300}
                                    fill="url(#leaves)"
                                    opacity="0.3"
                                />

                                {/* Main trunk (grows from bottom) */}
                                <line
                                    x1={treeWidth / 2}
                                    y1={treeHeight - 50}
                                    x2={treeWidth / 2}
                                    y2={100}
                                    stroke="url(#trunkGradient)"
                                    strokeWidth="12"
                                    strokeLinecap="round"
                                />

                                {/* Ground/roots */}
                                <ellipse
                                    cx={treeWidth / 2}
                                    cy={treeHeight - 30}
                                    rx={150}
                                    ry={40}
                                    fill="#6D28D9"
                                    opacity="0.3"
                                />

                                {/* Draw branches connecting nodes */}
                                {levels.map((level) => {
                                    const parentLevel = level + 1; // Parent is one level up (higher number)
                                    if (!nodesByLevel[parentLevel]) return null;

                                    return nodesByLevel[level].map((node) => {
                                        const parentNodes = nodesByLevel[parentLevel];
                                        const parentNode = parentNodes.find(p => p.node_key === node.parent_key);

                                        if (!parentNode) return null;

                                        const parentIndex = parentNodes.indexOf(parentNode);
                                        const nodeIndex = nodesByLevel[level].indexOf(node);

                                        const parentPos = calculateNodePosition(parentLevel, parentIndex, parentNodes.length);
                                        const nodePos = calculateNodePosition(level, nodeIndex, nodesByLevel[level].length);

                                        // Create curved branch (growing upward)
                                        const midY = (parentPos.y + nodePos.y) / 2;
                                        const controlX = (parentPos.x + nodePos.x) / 2;
                                        const path = `M ${nodePos.x} ${nodePos.y} Q ${controlX} ${midY}, ${parentPos.x} ${parentPos.y}`;

                                        return (
                                            <g key={`branch-${node.node_key}`}>
                                                {/* Branch glow */}
                                                {!node.isLocked && (
                                                    <path
                                                        d={path}
                                                        stroke="#8B5CF6"
                                                        strokeWidth="8"
                                                        fill="none"
                                                        opacity="0.2"
                                                        strokeLinecap="round"
                                                        filter="blur(4px)"
                                                    />
                                                )}
                                                {/* Branch */}
                                                <path
                                                    d={path}
                                                    stroke={node.isLocked ? '#4B5563' : '#8B5CF6'}
                                                    strokeWidth="5"
                                                    fill="none"
                                                    opacity={node.isLocked ? 0.3 : 0.7}
                                                    strokeDasharray={node.isLocked ? '10,5' : '0'}
                                                    strokeLinecap="round"
                                                />
                                            </g>
                                        );
                                    });
                                })}

                                {/* Render nodes */}
                                {levels.map((level) => {
                                    return nodesByLevel[level].map((node, nodeIndex) => {
                                        const pos = calculateNodePosition(level, nodeIndex, nodesByLevel[level].length);

                                        return (
                                            <g key={node.node_key}>
                                                {/* Level badge */}
                                                {nodeIndex === Math.floor(nodesByLevel[level].length / 2) && (
                                                    <foreignObject
                                                        x={treeWidth / 2 - 50}
                                                        y={pos.y - 60}
                                                        width="100"
                                                        height="30"
                                                    >
                                                        <div className="flex justify-center">
                                                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-purple-400/50">
                                                                Nível {level}
                                                            </div>
                                                        </div>
                                                    </foreignObject>
                                                )}

                                                {/* Node */}
                                                <foreignObject
                                                    x={pos.x - 120}
                                                    y={pos.y - 110}
                                                    width="240"
                                                    height="220"
                                                >
                                                    <div className="flex justify-center items-start h-full pointer-events-auto">
                                                        <TreeNode
                                                            node={node}
                                                            onClick={() => setSelectedNode(node.node_key)}
                                                            isSelected={selectedNode === node.node_key}
                                                        />
                                                    </div>
                                                </foreignObject>
                                            </g>
                                        );
                                    });
                                })}
                            </svg>
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>

            {/* Node Detail Modal */}
            {selectedNode && (
                <NodeDetail
                    nodeKey={selectedNode}
                    onClose={() => setSelectedNode(null)}
                />
            )}
        </div>
    );
};

export default InvestmentTree;
