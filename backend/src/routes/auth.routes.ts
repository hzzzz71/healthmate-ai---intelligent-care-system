import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase.js';

const router = Router();

// 检查Supabase是否配置
const checkSupabase = (res: Response) => {
    if (!supabaseAdmin) {
        res.status(503).json({
            error: 'Supabase未配置，请在backend/.env中配置SUPABASE_URL和SUPABASE_SERVICE_ROLE_KEY'
        });
        return false;
    }
    return true;
};

// 注册 - 使用普通signUp（需要在Supabase禁用邮箱验证）
router.post('/signup', async (req: Request, res: Response) => {
    try {
        if (!checkSupabase(res)) return;

        const { email, password, name, birthday } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: '邮箱和密码不能为空' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: '密码至少需要6位字符' });
        }

        console.log('📝 开始注册用户:', email);

        // 使用普通signUp
        const { data: authData, error: authError } = await supabaseAdmin!.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name || '新用户'
                }
            }
        });

        if (authError) {
            console.error('❌ 注册失败:', authError.message);

            if (authError.message.includes('already') || authError.message.includes('registered')) {
                return res.status(400).json({ error: '该邮箱已注册，请直接登录' });
            }

            return res.status(400).json({ error: authError.message });
        }

        if (!authData.user) {
            return res.status(400).json({ error: '注册失败，请重试' });
        }

        // 检查是否需要邮箱验证
        if (authData.user.identities?.length === 0) {
            return res.status(400).json({ error: '该邮箱已注册，请直接登录' });
        }

        // 创建用户资料
        const { error: profileError } = await supabaseAdmin!
            .from('profiles')
            .upsert({
                id: authData.user.id,
                name: name || '新用户',
                birthday: birthday || null
            }, { onConflict: 'id' });

        if (profileError) {
            console.error('⚠️ 创建资料失败:', profileError.message);
        }

        console.log('✅ 用户注册成功:', authData.user.email);

        // 检查是否自动确认了邮箱
        const needsConfirmation = !authData.session;

        res.status(201).json({
            message: needsConfirmation
                ? '注册成功！请查收邮箱验证链接后再登录。'
                : '注册成功！',
            needsEmailConfirmation: needsConfirmation,
            user: {
                id: authData.user.id,
                email: authData.user.email
            },
            // 如果禁用了邮箱验证，会直接返回session
            access_token: authData.session?.access_token,
            refresh_token: authData.session?.refresh_token
        });
    } catch (error: any) {
        console.error('❌ 注册异常:', error.message);
        res.status(500).json({ error: '服务器错误: ' + error.message });
    }
});

// 登录 - 邮箱+密码
router.post('/login', async (req: Request, res: Response) => {
    try {
        if (!checkSupabase(res)) return;

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: '邮箱和密码不能为空' });
        }

        console.log('📝 用户登录尝试:', email);

        const { data, error } = await supabaseAdmin!.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error('❌ 登录失败:', error.message);

            if (error.message.includes('Invalid login credentials')) {
                return res.status(401).json({ error: '邮箱或密码错误' });
            }
            if (error.message.includes('Email not confirmed')) {
                return res.status(401).json({
                    error: '请先验证邮箱！检查你的邮箱收件箱，点击验证链接。或者在Supabase禁用邮箱验证。',
                    code: 'EMAIL_NOT_CONFIRMED'
                });
            }

            return res.status(401).json({ error: error.message });
        }

        // 获取用户资料
        const { data: profile } = await supabaseAdmin!
            .from('profiles')
            .select('*')
            .eq('id', data.user?.id)
            .single();

        console.log('✅ 用户登录成功:', data.user?.email);

        res.json({
            message: '登录成功',
            access_token: data.session?.access_token,
            refresh_token: data.session?.refresh_token,
            user: {
                id: data.user?.id,
                email: data.user?.email,
                name: profile?.name || data.user?.user_metadata?.name || '用户',
                ...profile
            }
        });
    } catch (error: any) {
        console.error('❌ 登录异常:', error.message);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 刷新token
router.post('/refresh', async (req: Request, res: Response) => {
    try {
        if (!checkSupabase(res)) return;

        const { refresh_token } = req.body;

        if (!refresh_token) {
            return res.status(400).json({ error: '刷新令牌不能为空' });
        }

        const { data, error } = await supabaseAdmin!.auth.refreshSession({
            refresh_token: refresh_token
        });

        if (error) {
            return res.status(401).json({ error: '刷新令牌无效' });
        }

        res.json({
            access_token: data.session?.access_token,
            refresh_token: data.session?.refresh_token
        });
    } catch (error) {
        console.error('刷新token错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 登出
router.post('/logout', async (req: Request, res: Response) => {
    res.json({ message: '登出成功' });
});

// 获取当前用户
router.get('/me', async (req: Request, res: Response) => {
    try {
        if (!checkSupabase(res)) return;

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: '未提供认证令牌' });
        }

        const token = authHeader.substring(7);
        const { data: { user }, error } = await supabaseAdmin!.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ error: '无效或过期的令牌' });
        }

        // 获取用户资料
        const { data: profile } = await supabaseAdmin!
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        res.json({
            user: {
                id: user.id,
                email: user.email,
                ...profile
            }
        });
    } catch (error) {
        console.error('获取用户错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

export default router;
