import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Register() {
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError("As senhas não coincidem");
        }
        setError('');
        setLoading(true);
        try {
            const { error } = await register(email, password, name);
            if (error) throw error;
            alert("Cadastro realizado! Verifique seu email para confirmar.");
            window.location.hash = ''; // Go to Login
        } catch (err) {
            setError(err.message || 'Falha ao cadastrar.');
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
                        <p className="text-textSecondary mt-2">Crie sua nova conta</p>
                    </div>

                    {error && <div className="mb-4 text-center text-red-500 text-sm bg-red-500/10 p-2 rounded">{error}</div>}

                    <form onSubmit={handleRegister} className="space-y-4">
                        <Input
                            label="Nome Completo"
                            type="text"
                            placeholder="Seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            label="Senha"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            label="Confirmar Senha"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <Button type="submit" variant="primary" className="mt-4 w-full shadow-purple-900/20">
                            {loading ? 'Criando conta...' : 'Cadastrar'}
                        </Button>
                    </form>

                    <div className="text-center mt-6">
                        <button
                            onClick={() => window.location.hash = ''}
                            className="text-textSecondary hover:text-textTitle text-sm transition-colors"
                        >
                            Já tem uma conta? <span className="font-bold text-primary">Entrar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
