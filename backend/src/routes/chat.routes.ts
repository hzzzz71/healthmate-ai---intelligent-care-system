import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { supabaseAdmin } from '../config/supabase.js';

const router = Router();

// 获取聊天历史
router.get('/history', authenticate, async (req: AuthRequest, res) => {
    try {
        const { limit = 50 } = req.query;

        const { data, error } = await supabaseAdmin
            .from('chat_messages')
            .select('*')
            .eq('user_id', req.user!.id)
            .order('created_at', { ascending: false })
            .limit(Number(limit));

        if (error) throw error;

        res.json((data || []).reverse());
    } catch (error) {
        console.error('获取聊天历史错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 发送消息并保存
router.post('/message', authenticate, async (req: AuthRequest, res) => {
    try {
        const { content, role = 'user' } = req.body;

        if (!content) {
            return res.status(400).json({ error: '消息内容不能为空' });
        }

        const { data, error } = await supabaseAdmin
            .from('chat_messages')
            .insert({
                user_id: req.user!.id,
                role,
                content
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        console.error('保存消息错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 清空聊天历史
router.delete('/history', authenticate, async (req: AuthRequest, res) => {
    try {
        const { error } = await supabaseAdmin
            .from('chat_messages')
            .delete()
            .eq('user_id', req.user!.id);

        if (error) throw error;

        res.json({ message: '聊天历史已清空' });
    } catch (error) {
        console.error('清空聊天历史错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

export default router;
