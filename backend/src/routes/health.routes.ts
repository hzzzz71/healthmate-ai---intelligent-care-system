import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { supabaseAdmin } from '../config/supabase.js';

const router = Router();

// 获取体征数据
router.get('/vital-signs', authenticate, async (req: AuthRequest, res) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('vital_signs')
            .select('*')
            .eq('user_id', req.user!.id)
            .order('recorded_at', { ascending: false })
            .limit(30);

        if (error) throw error;

        res.json(data || []);
    } catch (error) {
        console.error('获取体征数据错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 添加体征数据
router.post('/vital-signs', authenticate, async (req: AuthRequest, res) => {
    try {
        const { blood_pressure_systolic, blood_pressure_diastolic, blood_sugar, heart_rate } = req.body;

        const { data, error } = await supabaseAdmin
            .from('vital_signs')
            .insert({
                user_id: req.user!.id,
                blood_pressure_systolic,
                blood_pressure_diastolic,
                blood_sugar,
                heart_rate
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        console.error('添加体征数据错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 获取医疗报告列表
router.get('/reports', authenticate, async (req: AuthRequest, res) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('medical_reports')
            .select('*')
            .eq('user_id', req.user!.id)
            .order('report_date', { ascending: false });

        if (error) throw error;

        res.json(data || []);
    } catch (error) {
        console.error('获取报告错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 添加医疗报告
router.post('/reports', authenticate, async (req: AuthRequest, res) => {
    try {
        const { title, report_type, doctor_name, status, file_url, report_date } = req.body;

        const { data, error } = await supabaseAdmin
            .from('medical_reports')
            .insert({
                user_id: req.user!.id,
                title,
                report_type,
                doctor_name,
                status,
                file_url,
                report_date
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        console.error('添加报告错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 获取用药列表
router.get('/medications', authenticate, async (req: AuthRequest, res) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('medications')
            .select('*')
            .eq('user_id', req.user!.id)
            .eq('active', true)
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json(data || []);
    } catch (error) {
        console.error('获取用药列表错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 添加用药
router.post('/medications', authenticate, async (req: AuthRequest, res) => {
    try {
        const { name, dosage, frequency, scheduled_time, notes } = req.body;

        const { data, error } = await supabaseAdmin
            .from('medications')
            .insert({
                user_id: req.user!.id,
                name,
                dosage,
                frequency,
                scheduled_time,
                notes
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        console.error('添加用药错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 用药打卡
router.post('/medications/:id/log', authenticate, async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const { status = 'taken' } = req.body;

        const { data, error } = await supabaseAdmin
            .from('medication_logs')
            .insert({
                medication_id: id,
                user_id: req.user!.id,
                status
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        console.error('用药打卡错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 获取营养记录
router.get('/nutrition/logs', authenticate, async (req: AuthRequest, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];

        const { data, error } = await supabaseAdmin
            .from('nutrition_logs')
            .select('*')
            .eq('user_id', req.user!.id)
            .gte('logged_at', today)
            .order('logged_at', { ascending: false });

        if (error) throw error;

        res.json(data || []);
    } catch (error) {
        console.error('获取营养记录错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 添加营养记录
router.post('/nutrition/logs', authenticate, async (req: AuthRequest, res) => {
    try {
        const { calories, notes } = req.body;

        const { data, error } = await supabaseAdmin
            .from('nutrition_logs')
            .insert({
                user_id: req.user!.id,
                calories,
                notes
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        console.error('添加营养记录错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 获取待办事项
router.get('/todos', authenticate, async (req: AuthRequest, res) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('todos')
            .select('*')
            .eq('user_id', req.user!.id)
            .order('scheduled_time', { ascending: true });

        if (error) throw error;

        res.json(data || []);
    } catch (error) {
        console.error('获取待办错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 添加待办
router.post('/todos', authenticate, async (req: AuthRequest, res) => {
    try {
        const { title, subtitle, scheduled_time, todo_type } = req.body;

        const { data, error } = await supabaseAdmin
            .from('todos')
            .insert({
                user_id: req.user!.id,
                title,
                subtitle,
                scheduled_time,
                todo_type
            })
            .select()
            .single();

        if (error) throw error;

        res.status(201).json(data);
    } catch (error) {
        console.error('添加待办错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 更新待办
router.put('/todos/:id', authenticate, async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;

        const { data, error } = await supabaseAdmin
            .from('todos')
            .update({ completed })
            .eq('id', id)
            .eq('user_id', req.user!.id)
            .select()
            .single();

        if (error) throw error;

        res.json(data);
    } catch (error) {
        console.error('更新待办错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

export default router;
