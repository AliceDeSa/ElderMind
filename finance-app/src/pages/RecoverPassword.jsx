import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

export default function RecoverPassword() {
    const { recoverPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRecover = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        try {
            const { error } = await recoverPassword(email);
            if (error) throw error;
            setMessage("Verifique seu email para redefinir a senha.");
        } catch (err) {
            setError(err.message || 'Falha ao enviar email.');
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
                        <p className="text-textSecondary mt-2">Recuperar Senha</p>
                    </div>

                    {error && <div className="mb-4 text-center text-red-500 text-sm bg-red-500/10 p-2 rounded">{error}</div>}
                    {message && <div className="mb-4 text-center text-green-500 text-sm bg-green-500/10 p-2 rounded">{message}</div>}

                    <form onSubmit={handleRecover} className="space-y-4">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Button type="submit" variant="primary" className="mt-4 w-full shadow-purple-900/20">
                            {loading ? 'Enviando...' : 'Enviar Email'}
                        </Button>
                    </form>

                    <div className="text-center mt-6">
                        <button
                            onClick={() => window.location.hash = ''}
                            className="text-textSecondary hover:text-textTitle text-sm transition-colors"
                        >
                            Voltar para o <span className="font-bold text-primary">Login</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
