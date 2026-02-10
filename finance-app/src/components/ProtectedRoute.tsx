import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logger from '../core/Logger';

interface ProtectedRouteProps {
    children: JSX.Element;
}

/**
 * Componente que protege rotas autenticadas
 * Redireciona para login se usuário não estiver autenticado
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center text-textMain">
                Carregando...
            </div>
        );
    }

    if (!user) {
        Logger.auth('Acesso negado - redirecionando para login');
        return <Navigate to="/login" replace />;
    }

    return children;
}
