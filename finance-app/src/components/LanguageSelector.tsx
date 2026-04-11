/**
 * Language Selector Component
 * Allows users to switch between supported languages
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';

const languages = [
    { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
    { code: 'en-US', name: 'English', flag: '🇺🇸' }
];

interface LanguageSelectorProps {
    dropdownDirection?: 'up' | 'down';
}

export default function LanguageSelector({ dropdownDirection = 'down' }: LanguageSelectorProps) {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
        setIsOpen(false);
    };

    const isUp = dropdownDirection === 'up';

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full justify-center flex items-center gap-2 px-3 py-2 rounded-lg bg-surfaceCard border border-border/50 hover:border-primary/50 transition-colors"
                title="Mudar Idioma"
            >
                <Globe size={18} className="text-textSecondary" />
                <span className="text-sm font-medium text-white">{currentLanguage.flag}</span>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className={`absolute ${isUp ? 'bottom-[120%] left-0' : 'top-[120%] right-0'} w-48 bg-surfaceCard border border-border/50 rounded-xl shadow-2xl z-50 overflow-hidden`}>
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`w-full flex items-center justify-between px-4 py-3 hover:bg-background/60 transition-colors ${lang.code === i18n.language ? 'bg-primary/10' : ''
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{lang.flag}</span>
                                    <span className="text-sm font-medium text-white">{lang.name}</span>
                                </div>
                                {lang.code === i18n.language && (
                                    <Check size={16} className="text-primary" />
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
