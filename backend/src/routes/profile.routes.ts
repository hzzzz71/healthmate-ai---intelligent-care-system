import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { supabaseAdmin } from '../config/supabase.js';

const router = Router();

// 获取用户资料
router.get('/:id', authenticate, async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;

        // 只能查看自己的资料
        if (req.user?.id !== id) {
            return res.status(403).json({ error: '无权访问' });
        }

        const { data, error } = await supabaseAdmin
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            return res.status(404).json({ error: '用户不存在' });
        }

        res.json(data);
    } catch (error) {
        console.error('获取资料错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 更新用户资料
router.put('/:id', authenticate, async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const { name, birthday, avatar_url } = req.body;

        if (req.user?.id !== id) {
            return res.status(403).json({ error: '无权修改' });
        }

        const { data, error } = await supabaseAdmin
            .from('profiles')
            .update({
                name,
                birthday,
                avatar_url,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json(data);
    } catch (error) {
        console.error('更新资料错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

export default router;
