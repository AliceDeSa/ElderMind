import React, { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: ReactNode;
}

export default function Input({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    icon,
    className = '',
    ...props
}: InputProps) {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-gray-300 text-xs font-medium mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    className={`w-full bg-gray-800 border border-transparent text-white text-sm rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent block py-3.5 placeholder-gray-600 transition-all focus:outline-none ${icon ? 'pl-10' : 'p-3'} ${className}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    {...props}
                />
            </div>
        </div>
    );
}
