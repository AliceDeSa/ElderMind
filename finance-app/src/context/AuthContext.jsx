import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = (email, password) => {
        return supabase.auth.signInWithPassword({ email, password });
    };

    const register = (email, password, name) => {
        return supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name },
            },
        });
    };

    const logout = () => {
        return supabase.auth.signOut();
    };

    const googleLogin = () => {
        return supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });
    };

    const recoverPassword = (email) => {
        return supabase.auth.resetPasswordForEmail(email);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, googleLogin, recoverPassword, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
