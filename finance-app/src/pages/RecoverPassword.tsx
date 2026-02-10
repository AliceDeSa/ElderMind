import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

export default function RecoverPassword() {
    const { t } = useTranslation('auth');
    const { resetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRecover = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        try {
            const { error } = await resetPassword(email);
            if (error) throw error;
            setMessage(t('recoverPassword.success'));
        } catch (err: any) {
            setError(err.message || t('recoverPassword.error', 'Falha ao enviar email.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 font-sans">
            <div className="w-full max-w-[400px]">
                <div className="bg-surfaceCard p-8 rounded-2xl shadow-2xl border border-border/20">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold text-textTitle tracking-tight drop-shadow-sm" translate="no">ElderMind</h1>
                        <p className="text-textSecondary mt-2">{t('recoverPassword.subtitle')}</p>
                    </div>

                    {error && <div className="mb-4 text-center text-red-500 text-sm bg-red-500/10 p-2 rounded">{error}</div>}
                    {message && <div className="mb-4 text-center text-emerald-500 text-sm bg-emerald-500/10 p-2 rounded">{message}</div>}

                    <form onSubmit={handleRecover} className="space-y-4">
                        <Input
                            label={t('recoverPassword.email')}
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Button type="submit" variant="primary" className="mt-4 w-full shadow-purple-900/20">
                            {loading ? t('common:messages.loading') : t('recoverPassword.button')}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/login" className="text-sm text-primary hover:text-primaryHover transition-colors">
                            {t('recoverPassword.backToLogin')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
