import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase.js';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email?: string;
        phone?: string;
    };
}

export const authenticate = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: '未提供认证令牌' });
        }

        const token = authHeader.substring(7);

        // 验证JWT token
        const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({ error: '无效或过期的令牌' });
        }

        // 将用户信息附加到请求对象
        req.user = {
            id: user.id,
            email: user.email,
            phone: user.phone
        };

        next();
    } catch (error) {
        console.error('认证错误:', error);
        res.status(500).json({ error: '服务器错误' });
    }
};
