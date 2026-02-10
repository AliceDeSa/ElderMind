import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Register() {
    const { t } = useTranslation('auth');
    const { register } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError(t('register.passwordMismatch', 'As senhas não coincidem'));
        }
        setError('');
        setLoading(true);
        try {
            const { error } = await register(email, password, name);
            if (error) throw error;
            alert(t('register.success', 'Cadastro realizado! Verifique seu email para confirmar.'));
            navigate('/login');
        } catch (err: any) {
            setError(err.message || t('register.error', 'Falha ao cadastrar.'));
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
                        <p className="text-textSecondary mt-2">{t('register.subtitle')}</p>
                    </div>

                    {error && <div className="mb-4 text-center text-red-500 text-sm bg-red-500/10 p-2 rounded">{error}</div>}

                    <form onSubmit={handleRegister} className="space-y-4">
                        <Input
                            label={t('register.name')}
                            type="text"
                            placeholder={t('register.name')}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Input
                            label={t('register.email')}
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            label={t('register.password')}
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Input
                            label={t('register.confirmPassword')}
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <Button type="submit" variant="primary" className="mt-4 w-full shadow-purple-900/20">
                            {loading ? t('common:messages.loading') : t('register.button')}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-textSecondary">
                            {t('register.hasAccount')}{' '}
                            <Link to="/login" className="text-primary hover:text-primaryHover font-semibold transition-colors">
                                {t('register.signIn')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
