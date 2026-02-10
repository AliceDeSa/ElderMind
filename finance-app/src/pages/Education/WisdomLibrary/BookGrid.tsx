import React from 'react';
import type { WisdomBook } from '../../../types/education';
import BookCard from './BookCard';

interface BookGridProps {
    books: WisdomBook[];
    onBookSelect: (bookKey: string) => void;
}

const BookGrid: React.FC<BookGridProps> = ({ books, onBookSelect }) => {
    if (books.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400">Nenhum livro encontrado</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
                <BookCard
                    key={book.book_key}
                    book={book}
                    onClick={() => onBookSelect(book.book_key)}
                />
            ))}
        </div>
    );
};

export default BookGrid;
