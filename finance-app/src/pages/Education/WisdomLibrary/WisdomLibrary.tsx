import React, { useState } from 'react';
import { useWisdomBooks, useReadingProgress } from '../../../hooks/useWisdomLibrary';
import BookGrid from './BookGrid';
import ExcerptReader from './ExcerptReader';
import DailyReading from './DailyReading';
import { Search } from 'lucide-react';

const WisdomLibrary: React.FC = () => {
    const { books, loading, error } = useWisdomBooks(true);
    const { stats, loading: statsLoading } = useReadingProgress();
    const [selectedBook, setSelectedBook] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    if (loading || statsLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Carregando biblioteca...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                <h3 className="text-red-400 font-semibold mb-2">Erro ao carregar biblioteca</h3>
                <p className="text-red-300">{error.message}</p>
            </div>
        );
    }

    // Filter books
    const filteredBooks = books.filter(book => {
        const matchesSearch = searchQuery === '' ||
            book.title_pt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = !selectedCategory || book.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const categories = Array.from(new Set(books.map(b => b.category)));

    return (
        <div className="wisdom-library-container">
            {/* Header */}
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-white mb-2">
                    📚 Biblioteca de Sabedoria
                </h1>
                <p className="text-gray-400">
                    Trechos selecionados dos melhores livros sobre investimentos e finanças
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-400">{stats.booksCompleted}</div>
                    <div className="text-xs text-gray-400">Livros Completos</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">{stats.excerptsRead}</div>
                    <div className="text-xs text-gray-400">Trechos Lidos</div>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-400">{stats.favoriteCount}</div>
                    <div className="text-xs text-gray-400">Favoritos</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{stats.totalBooks}</div>
                    <div className="text-xs text-gray-400">Total de Livros</div>
                </div>
            </div>

            {/* Daily Reading Widget */}
            <DailyReading />

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por título ou autor..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === null
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                    >
                        Todos
                    </button>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === category
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Books Grid */}
            <BookGrid
                books={filteredBooks}
                onBookSelect={setSelectedBook}
            />

            {/* Excerpt Reader Modal */}
            {selectedBook && (
                <ExcerptReader
                    bookKey={selectedBook}
                    onClose={() => setSelectedBook(null)}
                />
            )}
        </div>
    );
};

export default WisdomLibrary;
