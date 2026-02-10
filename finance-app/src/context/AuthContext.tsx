import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import Logger from '../core/Logger';
import { Session, User, AuthError } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ data: { user: User | null; session: Session | null }; error: AuthError | null }>;
    register: (email: string, password: string, name: string) => Promise<{ data: { user: User | null; session: Session | null }; error: AuthError | null }>;
    logout: () => Promise<{ error: AuthError | null }>;
    googleLogin: () => Promise<{ data: { provider: string; url: string } | { user: User | null; session: Session | null }; error: AuthError | null }>;
    recoverPassword: (email: string) => Promise<{ data: {}; error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        Logger.auth('Verificando sessão ativa');
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
            if (session?.user) {
                Logger.auth('Usuário autenticado:', session.user.email);
            } else {
                Logger.auth('Nenhuma sessão ativa');
            }
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            Logger.auth('Auth state changed:', _event);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        Logger.auth('Tentando login:', email);
        const result = await supabase.auth.signInWithPassword({ email, password });
        if (result.error) {
            Logger.auth('Erro no login:', result.error.message);
        } else {
            Logger.auth('Login bem-sucedido');
        }
        return result;
    };

    const register = async (email: string, password: string, name: string) => {
        Logger.auth('Tentando registro:', email);
        const result = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name },
            },
        });
        if (result.error) {
            Logger.auth('Erro no registro:', result.error.message);
        } else {
            Logger.auth('Registro bem-sucedido');
        }
        return result;
    };

    const logout = async () => {
        Logger.auth('Fazendo logout');
        const result = await supabase.auth.signOut();
        if (result.error) {
            Logger.auth('Erro no logout:', result.error.message);
        } else {
            Logger.auth('Logout bem-sucedido');
        }
        return result;
    };

    const googleLogin = async () => {
        Logger.auth('Tentando login com Google');
        const result = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin + window.location.pathname
            }
        });
        if (result.error) {
            Logger.auth('Erro no login Google:', result.error.message);
        } else {
            Logger.auth('Redirecionando para Google OAuth');
        }
        return result;
    };

    const recoverPassword = async (email: string) => {
        Logger.auth('Solicitando recuperação de senha:', email);
        const result = await supabase.auth.resetPasswordForEmail(email);
        if (result.error) {
            Logger.auth('Erro na recuperação:', result.error.message);
        } else {
            Logger.auth('Email de recuperação enviado');
        }
        return result;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, googleLogin, recoverPassword }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}
