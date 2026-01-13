import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { supabaseAdmin } from '../config/supabase.js';

const router = Router();

// 获取仪表板数据
router.get('/', authenticate, async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.id;

        // 并行获取各种数据
        const [profileData, vitalSignsData, todosData, medicationsData] = await Promise.all([
            // 用户资料
            supabaseAdmin
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single(),

            // 最新体征数据
            supabaseAdmin
                .from('vital_signs')
                .select('*')
                .eq('user_id', userId)
                .order('recorded_at', { ascending: false })
                .limit(1),

            // 今日待办
            supabaseAdmin
                .from('todos')
                .select('*')
                .eq('user_id', userId)
                .eq('completed', false)
                .order('scheduled_time', { ascending: true })
                .limit(5),

            // 今日用药
            supabaseAdmin
                .from('medications')
                .select('*')
                .eq('user_id', userId)
                .eq('active', true)
        ]);

        res.json({
            profile: profileData.data,
            latestVitalSigns: vitalSignsData.data?.[0] || null,
            todos: todosData.data || [],
            medications: medicationsData.data || []
        });
    } catch (error) {
        console.error('获取仪表板数据错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

export default router;
