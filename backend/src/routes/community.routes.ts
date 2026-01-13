import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { supabaseAdmin } from '../config/supabase.js';

const router = Router();

// 获取社区帖子列表
router.get('/posts', authenticate, async (req: AuthRequest, res) => {
    try {
        const { type, limit = 20, offset = 0 } = req.query;

        let query = supabaseAdmin
            .from('community_posts')
            .select(`
        *,
        profiles:user_id (name, avatar_url)
      `)
            .order('created_at', { ascending: false })
            .range(Number(offset), Number(offset) + Number(limit) - 1);

        if (type) {
            query = query.eq('post_type', type);
        }

        const { data, error } = await query;

        if (error) throw error;

        res.json(data || []);
    } catch (error) {
        console.error('获取帖子列表错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 获取帖子详情
router.get('/posts/:id', authenticate, async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabaseAdmin
            .from('community_posts')
            .select(`
        *,
        profiles:user_id (name, avatar_url)
      `)
            .eq('id', id)
            .single();

        if (error) throw error;

        res.json(data);
    } catch (error) {
        console.error('获取帖子详情错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 发布帖子
router.post('/posts', authenticate, async (req: AuthRequest, res) => {
    try {
        const { content, post_type = 'post', title, image_url, tags } = req.body;

        if (!content) {
            return res.status(400).json({ error: '内容不能为空' });
        }

        const { data, error } = await supabaseAdmin
            .from('community_posts')
            .insert({
                user_id: req.user!.id,
                content,
                post_type,
                title,
                image_url,
                tags
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        console.error('发布帖子错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 点赞/取消点赞
router.post('/posts/:id/like', authenticate, async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const userId = req.user!.id;

        // 检查是否已点赞
        const { data: existingLike } = await supabaseAdmin
            .from('post_likes')
            .select('id')
            .eq('post_id', id)
            .eq('user_id', userId)
            .single();

        if (existingLike) {
            // 取消点赞
            const { error } = await supabaseAdmin
                .from('post_likes')
                .delete()
                .eq('post_id', id)
                .eq('user_id', userId);

            if (error) throw error;

            res.json({ message: '取消点赞', liked: false });
        } else {
            // 点赞
            const { error } = await supabaseAdmin
                .from('post_likes')
                .insert({
                    post_id: id,
                    user_id: userId
                });

            if (error) throw error;

            res.json({ message: '点赞成功', liked: true });
        }
    } catch (error) {
        console.error('点赞操作错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 获取评论列表
router.get('/posts/:id/comments', authenticate, async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabaseAdmin
            .from('post_comments')
            .select(`
        *,
        profiles:user_id (name, avatar_url)
      `)
            .eq('post_id', id)
            .order('created_at', { ascending: true });

        if (error) throw error;

        res.json(data || []);
    } catch (error) {
        console.error('获取评论错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 发布评论
router.post('/posts/:id/comments', authenticate, async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ error: '评论内容不能为空' });
        }

        const { data, error } = await supabaseAdmin
            .from('post_comments')
            .insert({
                post_id: id,
                user_id: req.user!.id,
                content
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        console.error('发布评论错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 搜索内容
router.get('/search', authenticate, async (req: AuthRequest, res) => {
    try {
        const { q, type } = req.query;

        if (!q) {
            return res.status(400).json({ error: '搜索关键词不能为空' });
        }

        let query = supabaseAdmin
            .from('community_posts')
            .select(`
        *,
        profiles:user_id (name, avatar_url)
      `)
            .or(`title.ilike.%${q}%,content.ilike.%${q}%`)
            .order('created_at', { ascending: false })
            .limit(20);

        if (type) {
            query = query.eq('post_type', type);
        }

        const { data, error } = await query;

        if (error) throw error;

        res.json(data || []);
    } catch (error) {
        console.error('搜索错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

export default router;
