import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Logger from '../core/Logger';

export default function Login() {
    const { t } = useTranslation('auth');
    const { login, googleLogin, user } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect if already logged in (handles OAuth callback)
    useEffect(() => {
        if (user) {
            Logger.auth('Usuário já autenticado, redirecionando para dashboard');
            navigate('/dashboard');
        }
    }, [user, navigate]);

    // Icons SVG
    const MailIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );

    const LockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    );

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { error } = await login(email, password);
            if (error) throw error;
            navigate('/dashboard');
        } catch (err) {
            setError(t('login.error', 'Falha ao entrar. Verifique seus dados.'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
        } catch (error) {
            console.error("Google login error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 font-sans">
            <div className="w-full max-w-[400px]">

                <div className="bg-surfaceCard p-8 rounded-2xl shadow-2xl border border-border/20">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold text-textTitle tracking-tight drop-shadow-sm" translate="no">ElderMind</h1>
                    </div>

                    {error && <div className="mb-4 text-center text-red-500 text-sm bg-red-500/10 p-2 rounded">{error}</div>}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <Input
                                label={t('login.email')}
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                icon={MailIcon}
                                required
                            />
                        </div>

                        <div>
                            <Input
                                label={t('login.password')}
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={LockIcon}
                                required
                            />
                        </div>

                        <Button type="submit" disabled={loading}>
                            {loading ? t('common:messages.loading') : t('login.button')}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t border-border"></div>
                        <span className="px-4 text-xs text-textSecondary uppercase tracking-wider">ou</span>
                        <div className="flex-1 border-t border-border"></div>
                    </div>

                    {/* Google Login */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-md hover:shadow-lg border border-gray-200"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        {t('login.googleButton')}
                    </button>

                    {/* Footer Links */}
                    <div className="mt-6 text-center space-y-2">
                        <Link to="/recover-password" className="block text-sm text-primary hover:text-primaryHover transition-colors">
                            {t('login.forgotPassword')}
                        </Link>
                        <p className="text-sm text-textSecondary">
                            {t('login.noAccount')}{' '}
                            <Link to="/register" className="text-primary hover:text-primaryHover font-semibold transition-colors">
                                {t('login.signUp')}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
