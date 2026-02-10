/**
 * Cliente Supabase - Singleton
 * Configuração centralizada para acesso ao banco de dados
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Logger from '../core/Logger';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Validação de variáveis de ambiente
if (!supabaseUrl || !supabaseAnonKey) {
    Logger.sys('ERRO: Variáveis de ambiente Supabase não configuradas');
    throw new Error('Supabase URL ou Anon Key ausentes. Verifique seu arquivo .env');
}

// Reutiliza cliente existente se já inicializado (previne múltiplas instâncias durante HMR)
const getSupabaseClient = (): SupabaseClient => {
    if (typeof window !== 'undefined' && (window as any)._supabase) {
        return (window as any)._supabase;
    }

    Logger.sys('Inicializando cliente Supabase');
    const client = createClient(supabaseUrl, supabaseAnonKey);

    if (typeof window !== 'undefined') {
        (window as any)._supabase = client;
    }

    return client;
};

export const supabase = getSupabaseClient();
