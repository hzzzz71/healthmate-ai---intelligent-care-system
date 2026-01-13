import { supabase } from '../config/supabase';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// 获取访问令牌
const getAccessToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token;
};

// 通用请求函数
const request = async (endpoint: string, options: RequestInit = {}) => {
    const token = await getAccessToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: '请求失败' }));
        throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
};

// API服务
export const api = {
    // 认证相关
    auth: {
        signup: (data: { phone: string; password: string; name?: string; birthday?: string }) =>
            fetch(`${API_BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }).then(res => res.json()),

        login: (data: { phone: string; password: string }) =>
            fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }).then(res => res.json()),

        sendOtp: (phone: string) =>
            fetch(`${API_BASE_URL}/auth/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone }),
            }).then(res => res.json()),

        verifyOtp: (data: { phone: string; token: string }) =>
            fetch(`${API_BASE_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }).then(res => res.json()),
    },

    // 用户资料
    profile: {
        get: (id: string) => request(`/api/profiles/${id}`),
        update: (id: string, data: any) => request(`/api/profiles/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
    },

    // 仪表板
    dashboard: {
        get: () => request('/api/dashboard'),
    },

    // 健康数据
    health: {
        getVitalSigns: () => request('/api/health/vital-signs'),
        addVitalSign: (data: any) => request('/api/health/vital-signs', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        getReports: () => request('/api/health/reports'),
        addReport: (data: any) => request('/api/health/reports', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        getMedications: () => request('/api/health/medications'),
        addMedication: (data: any) => request('/api/health/medications', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        logMedication: (id: string, status: string) => request(`/api/health/medications/${id}/log`, {
            method: 'POST',
            body: JSON.stringify({ status }),
        }),
        getNutritionLogs: () => request('/api/health/nutrition/logs'),
        addNutritionLog: (data: any) => request('/api/health/nutrition/logs', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        getTodos: () => request('/api/health/todos'),
        addTodo: (data: any) => request('/api/health/todos', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        updateTodo: (id: string, completed: boolean) => request(`/api/health/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ completed }),
        }),
    },

    // 社区
    community: {
        getPosts: (params?: { type?: string; limit?: number; offset?: number }) => {
            const query = new URLSearchParams(params as any).toString();
            return request(`/api/community/posts?${query}`);
        },
        getPost: (id: string) => request(`/api/community/posts/${id}`),
        createPost: (data: any) => request('/api/community/posts', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        likePost: (id: string) => request(`/api/community/posts/${id}/like`, {
            method: 'POST',
        }),
        getComments: (postId: string) => request(`/api/community/posts/${postId}/comments`),
        addComment: (postId: string, content: string) => request(`/api/community/posts/${postId}/comments`, {
            method: 'POST',
            body: JSON.stringify({ content }),
        }),
        search: (q: string, type?: string) => {
            const query = new URLSearchParams({ q, ...(type && { type }) }).toString();
            return request(`/api/community/search?${query}`);
        },
    },

    // 聊天
    chat: {
        getHistory: (limit?: number) => {
            const query = limit ? `?limit=${limit}` : '';
            return request(`/api/chat/history${query}`);
        },
        saveMessage: (data: { content: string; role: 'user' | 'model' }) =>
            request('/api/chat/message', {
                method: 'POST',
                body: JSON.stringify(data),
            }),
        clearHistory: () => request('/api/chat/history', {
            method: 'DELETE',
        }),
    },

    // 通知
    notifications: {
        get: (unreadOnly?: boolean) => {
            const query = unreadOnly ? '?unread_only=true' : '';
            return request(`/api/notifications${query}`);
        },
        markAsRead: (id: string) => request(`/api/notifications/${id}/read`, {
            method: 'PUT',
        }),
        markAllAsRead: () => request('/api/notifications/read-all', {
            method: 'PUT',
        }),
    },
};
