import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 认证辅助函数
export const auth = {
    // 获取当前用户
    getCurrentUser: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    },

    // 获取当前session
    getSession: async () => {
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    },

    // 登出
    signOut: async () => {
        await supabase.auth.signOut();
    }
};
