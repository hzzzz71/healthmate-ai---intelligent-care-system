import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

// 开发模式检查
let supabaseAdmin: SupabaseClient | null = null;

if (supabaseUrl && supabaseServiceKey) {
    // 管理员客户端 (使用service role key，绕过RLS)
    supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    console.log('✅ Supabase Admin客户端已连接');
} else {
    console.warn('⚠️ Supabase未配置，后端将使用Mock模式');
    console.warn('   请在backend/.env中配置SUPABASE_URL和SUPABASE_SERVICE_ROLE_KEY');
}

// 创建带认证的客户端 (用于API请求)
export const createSupabaseClient = (accessToken: string) => {
    if (!supabaseUrl || !supabaseAnonKey) {
        return null;
    }
    return createClient(supabaseUrl, supabaseAnonKey, {
        global: {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    });
};

export { supabaseAdmin };
