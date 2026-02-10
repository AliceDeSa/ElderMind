import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    isLoading?: boolean;
}

export default function Button({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    className = '',
    isLoading = false,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = "w-full font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
        outline: "bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed",
        ghost: "bg-transparent text-purple-400 hover:text-purple-300 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : children}
        </button>
    );
}
