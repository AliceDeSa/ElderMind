import React, { useState } from 'react';
import { Target, Plus, Plane, Car, Home, ShoppingBag, Gift, Trash2, Edit2, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';

const icons = [
    { name: 'Target', icon: Target },
    { name: 'Plane', icon: Plane },
    { name: 'Car', icon: Car },
    { name: 'Home', icon: Home },
    { name: 'ShoppingBag', icon: ShoppingBag },
    { name: 'Gift', icon: Gift }
];

const categories = ['Viagem', 'Carro', 'Casa', 'Compra', 'Reserva', 'Lazer', 'Outros'];

export default function ObjectivesTab() {
    const { financialGoals, addGoal, updateGoal, deleteGoal } = useFinance();
    const [showForm, setShowForm] = useState(false);
    const [editingGoal, setEditingGoal] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        targetAmount: '',
        currentAmount: 0,
        deadline: '',
        category: 'Outros',
        icon: 'Target'
    });

    const resetForm = () => {
        setFormData({
            title: '',
            targetAmount: '',
            currentAmount: 0,
            deadline: '',
            category: 'Outros',
            icon: 'Target'
        });
        setEditingGoal(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingGoal) {
            await updateGoal(editingGoal.id, formData);
        } else {
            await addGoal(formData);
        }
        resetForm();
    };

    const handleEdit = (goal) => {
        setFormData({
            title: goal.title,
            targetAmount: goal.target_amount,
            currentAmount: goal.current_amount,
            deadline: goal.deadline,
            category: goal.category,
            icon: goal.icon || 'Target'
        });
        setEditingGoal(goal);
        setShowForm(true);
    };

    const getIcon = (iconName) => {
        const iconObj = icons.find(i => i.name === iconName);
        return iconObj ? <iconObj.icon size={20} /> : <Target size={20} />;
    };

    return (
        <div className="animate-fade-in">
            {/* Header with Add Button */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white">Metas e Projetos</h2>
                    <p className="text-textSecondary text-xs">Acompanhe seus planos e sonhos de longo prazo</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/20"
                >
                    <Plus size={18} /> Nova Meta
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-surfaceCard w-full max-w-lg rounded-3xl border border-border/50 shadow-2xl animate-scale-in">
                        <div className="p-6 border-b border-border/30">
                            <h3 className="text-lg font-bold text-white">{editingGoal ? 'Editar Meta' : 'Criar Nova Meta'}</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="text-xs font-bold text-textSecondary uppercase mb-2 block">Título da Meta</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-white focus:border-primary outline-none transition-all"
                                        placeholder="Ex: Viagem para Europa"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-textSecondary uppercase mb-2 block">Valor Alvo (R$)</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.targetAmount}
                                        onChange={e => setFormData({ ...formData, targetAmount: e.target.value })}
                                        className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-white focus:border-primary outline-none transition-all"
                                        placeholder="0,00"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-textSecondary uppercase mb-2 block">Valor Atual (R$)</label>
                                    <input
                                        type="number"
                                        value={formData.currentAmount}
                                        onChange={e => setFormData({ ...formData, currentAmount: e.target.value })}
                                        className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-white focus:border-primary outline-none transition-all"
                                        placeholder="0,00"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-textSecondary uppercase mb-2 block">Data Alvo</label>
                                    <input
                                        type="date"
                                        value={formData.deadline}
                                        onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                                        className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-white focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-textSecondary uppercase mb-2 block">Categoria</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-white focus:border-primary outline-none transition-all"
                                    >
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                            </div>

                            <label className="text-xs font-bold text-textSecondary uppercase mb-2 block">Ícone</label>
                            <div className="flex gap-3">
                                {icons.map(icon => (
                                    <button
                                        key={icon.name}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, icon: icon.name })}
                                        className={`p-3 rounded-xl border transition-all ${formData.icon === icon.name ? 'bg-primary/20 border-primary text-primary' : 'bg-background border-border/50 text-textSecondary hover:border-textSecondary'}`}
                                    >
                                        <icon.icon size={20} />
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 py-3 rounded-xl border border-border text-white text-sm font-bold hover:bg-white/5 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                >
                                    {editingGoal ? 'Salvar Alterações' : 'Criar Meta'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {financialGoals.map(goal => {
                    const progress = Math.min(100, (goal.current_amount / goal.target_amount) * 100);
                    return (
                        <div key={goal.id} className="bg-surfaceCard rounded-3xl p-6 border border-border/50 shadow-xl group hover:border-primary/50 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-2xl bg-primary/10 text-primary`}>
                                    {getIcon(goal.icon)}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(goal)} className="p-2 text-textSecondary hover:text-blue-400 transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => deleteGoal(goal.id)} className="p-2 text-textSecondary hover:text-red-400 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="font-bold text-white text-lg mb-1">{goal.title}</h3>
                            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-4 inline-block">{goal.category}</span>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] text-textSecondary font-bold uppercase">Progresso</p>
                                        <p className="text-white font-black text-xl">R$ {parseFloat(goal.current_amount).toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-textSecondary font-bold uppercase">Meta</p>
                                        <p className="text-textSecondary text-sm font-bold">R$ {parseFloat(goal.target_amount).toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="h-2.5 bg-background rounded-full overflow-hidden border border-border/30">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-1000"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                <div className="flex justify-between items-center text-[11px] font-bold">
                                    <span className="text-primary">{progress.toFixed(1)}% Completo</span>
                                    {goal.deadline && (
                                        <span className="text-textSecondary flex items-center gap-1">
                                            <Calendar size={12} /> {new Date(goal.deadline).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Empty State */}
                {financialGoals.length === 0 && (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-border/30 rounded-3xl opacity-50">
                        <Target size={48} className="text-textSecondary mb-4" />
                        <p className="text-white font-bold">Nenhuma meta ainda</p>
                        <p className="text-textSecondary text-xs">Clique em "Nova Meta" para começar a planejar seu futuro.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
