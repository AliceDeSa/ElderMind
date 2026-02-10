import { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import MonthSelector from '../MonthSelector';
import { Plus, Trash2, Repeat, DollarSign, Edit2, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useFinance } from '../../context/FinanceProvider';

export default function IncomeTab() {
    const {
        incomes,
        addIncome,
        updateIncome,
        deleteIncome,
        selectedMonth,
        setSelectedMonth
    } = useFinance();

    // Local UI states
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [expandedId, setExpandedId] = useState(null);
    const [formData, setFormData] = useState({ description: '', amount: '', category: 'Salário', recurring: true });

    const resetForm = () => {
        setFormData({ description: '', amount: '', category: 'Salário', recurring: true });
        setEditingId(null);
        setShowForm(false);
    };

    const handleEditClick = (income) => {
        setFormData({
            description: income.name,
            amount: income.amount,
            category: income.category,
            recurring: income.recurring
        });
        setEditingId(income.id);
        setShowForm(true);
        setExpandedId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            amount: parseFloat(formData.amount),
            month: selectedMonth
        };

        if (isNaN(payload.amount)) {
            alert("Por favor, insira um valor válido.");
            return;
        }

        if (editingId) {
            updateIncome(editingId, payload);
        } else {
            addIncome(payload);
        }
        resetForm();
    };

    const removeIncome = (id) => {
        if (confirm('Tem certeza que deseja excluir esta renda?')) {
            deleteIncome(id);
        }
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    // Filter incomes for display
    const filteredIncomes = incomes.filter(income =>
        income.recurring || income.month === selectedMonth
    );

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header / Month Selector */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-surfaceCard p-4 rounded-xl border border-border/50">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <DollarSign size={20} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold">Rendas</h3>
                        <p className="text-xs text-textSecondary">Gerencie suas entradas</p>
                    </div>
                </div>

                <MonthSelector
                    onDateChange={(date) => setSelectedMonth(date.getMonth())}
                    initialDate={new Date(new Date().setMonth(selectedMonth))}
                />
            </div>

            {/* Actions & Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white">Minhas Rendas</h2>
                    <p className="text-textSecondary text-sm">Gerencie suas fontes de renda</p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    {!showForm && (
                        <Button onClick={() => setShowForm(true)} className="!w-auto px-4 py-2 text-sm">
                            <Plus size={16} className="mr-2" /> Nova Renda
                        </Button>
                    )}
                </div>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
                <div className="bg-surfaceCard p-6 rounded-2xl border border-primary/20 animate-fade-in shadow-lg relative">
                    <button onClick={resetForm} className="absolute top-4 right-4 text-textSecondary hover:text-white">
                        <X size={20} />
                    </button>
                    <h3 className="text-lg font-bold text-white mb-4">{editingId ? 'Editar Renda' : 'Adicionar Nova Renda'}</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Descrição"
                            placeholder="Ex: Salário, Aluguel..."
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                        <Input
                            label="Valor (R$)"
                            type="number"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={e => setFormData({ ...formData, amount: e.target.value })}
                            required
                        />
                        <Input
                            label="Categoria"
                            placeholder="Salário, Extra, Investimento"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        />

                        <div className="flex flex-col justify-end pb-2">
                            <label className="text-xs font-semibold text-textSecondary mb-2 block">Tipo de Renda</label>
                            <div
                                onClick={() => setFormData({ ...formData, recurring: !formData.recurring })}
                                className={`flex items-center cursor-pointer p-3 rounded-xl border transition-all ${formData.recurring ? 'bg-primary/10 border-primary' : 'bg-background border-border'}`}
                            >
                                <div className={`w-10 h-6 rounded-full flex items-center p-1 transition-colors mr-3 ${formData.recurring ? 'bg-primary' : 'bg-gray-600'}`}>
                                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${formData.recurring ? 'translate-x-4' : ''}`} />
                                </div>
                                <div>
                                    <span className={`text-sm font-bold block ${formData.recurring ? 'text-primary' : 'text-textMain'}`}>
                                        {formData.recurring ? 'Recorrente (Mensal)' : 'Renda Única'}
                                    </span>
                                    <span className="text-xs text-textSecondary block">
                                        {formData.recurring ? 'Repete todos os meses' : 'Apenas este mês'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 flex justify-end space-x-3 mt-4 border-t border-border/20 pt-4">
                            <button type="button" onClick={resetForm} className="px-4 py-2 text-textSecondary hover:text-white transition-colors">Cancelar</button>
                            <Button type="submit" className="!w-auto px-8">{editingId ? 'Salvar Alterações' : 'Adicionar Renda'}</Button>
                        </div>
                    </form>
                </div>
            )}

            {/* Visual Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIncomes.map(income => {
                    const isExpanded = expandedId === income.id;

                    return (
                        <div
                            key={income.id}
                            onClick={() => toggleExpand(income.id)}
                            className={`bg-surfaceCard p-5 rounded-2xl border transition-all cursor-pointer ${isExpanded ? 'border-primary shadow-lg scale-[1.02]' : 'border-border/50 hover:border-primary/50'}`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                    <DollarSign size={20} />
                                </div>
                                <div className="flex items-center gap-2">
                                    {income.recurring ? (
                                        <div className="flex items-center text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full border border-primary/20">
                                            <Repeat size={12} className="mr-1" /> Mensal
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-xs font-bold text-textSecondary bg-white/5 px-2 py-1 rounded-full border border-white/10">
                                            Única
                                        </div>
                                    )}
                                    {isExpanded ? <ChevronUp size={16} className="text-primary" /> : <ChevronDown size={16} className="text-textSecondary" />}
                                </div>
                            </div>

                            <h3 className="font-bold text-white text-lg mb-1">{income.name}</h3>
                            <p className="text-2xl font-bold text-emerald-400">R$ {parseFloat(income.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            <p className="text-sm text-textSecondary mt-1">{income.category}</p>

                            {/* Expanded Actions Area */}
                            {isExpanded && (
                                <div className="mt-4 pt-4 border-t border-border/30 flex gap-2 animate-fade-in">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleEditClick(income); }}
                                        className="flex-1 flex items-center justify-center p-2 rounded-lg bg-blue-500/10 text-blue-400 font-medium text-sm hover:bg-blue-500/20 transition-colors"
                                    >
                                        <Edit2 size={16} className="mr-2" /> Editar
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeIncome(income.id); }}
                                        className="flex-1 flex items-center justify-center p-2 rounded-lg bg-red-500/10 text-red-500 font-medium text-sm hover:bg-red-500/20 transition-colors"
                                    >
                                        <Trash2 size={16} className="mr-2" /> Excluir
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
