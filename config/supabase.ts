import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// 开发模式：如果没有配置Supabase，使用mock客户端
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
    console.warn('⚠️ Supabase未配置，使用开发模式（无真实数据库连接）');
}

export { supabase };

// 认证辅助函数
export const auth = {
    // 获取当前用户
    getCurrentUser: async () => {
        if (!supabase) return null;
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    },

    // 获取当前session
    getSession: async () => {
        if (!supabase) return null;
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    },

    // 登出
    signOut: async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
    },

    // 设置session
    setSession: async (tokens: { access_token: string; refresh_token: string }) => {
        if (!supabase) return null;
        const { data, error } = await supabase.auth.setSession(tokens);
        return { data, error };
    }
};
