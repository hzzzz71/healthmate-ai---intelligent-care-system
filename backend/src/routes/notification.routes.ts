import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { supabaseAdmin } from '../config/supabase.js';

const router = Router();

// 获取通知列表
router.get('/', authenticate, async (req: AuthRequest, res) => {
    try {
        const { unread_only } = req.query;

        let query = supabaseAdmin
            .from('notifications')
            .select('*')
            .eq('user_id', req.user!.id)
            .order('created_at', { ascending: false });

        if (unread_only === 'true') {
            query = query.eq('read', false);
        }

        const { data, error } = await query;

        if (error) throw error;

        res.json(data || []);
    } catch (error) {
        console.error('获取通知错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 标记通知为已读
router.put('/:id/read', authenticate, async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabaseAdmin
            .from('notifications')
            .update({ read: true })
            .eq('id', id)
            .eq('user_id', req.user!.id)
            .select()
            .single();

        if (error) throw error;

        res.json(data);
    } catch (error) {
        console.error('标记已读错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 全部标记为已读
router.put('/read-all', authenticate, async (req: AuthRequest, res) => {
    try {
        const { error } = await supabaseAdmin
            .from('notifications')
            .update({ read: true })
            .eq('user_id', req.user!.id)
            .eq('read', false);

        if (error) throw error;

        res.json({ message: '已全部标记为已读' });
    } catch (error) {
        console.error('全部标记已读错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 创建通知（系统内部使用）
router.post('/', authenticate, async (req: AuthRequest, res) => {
    try {
        const { title, message, notification_type, metadata } = req.body;

        const { data, error } = await supabaseAdmin
            .from('notifications')
            .insert({
                user_id: req.user!.id,
                title,
                message,
                notification_type,
                metadata
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        console.error('创建通知错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

export default router;
