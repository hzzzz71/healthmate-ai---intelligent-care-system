const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// 获取访问令牌
const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

// 通用请求函数（需要认证的接口）
const request = async (endpoint: string, options: RequestInit = {}) => {
    const token = getAccessToken();

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

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
    }

    return data;
};

// 公开请求函数（不需要认证，如注册登录）
const publicRequest = async (endpoint: string, options: RequestInit = {}) => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    try {
        console.log(`📤 请求: ${options.method || 'GET'} ${API_BASE_URL}${endpoint}`);

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const data = await response.json().catch(() => ({}));

        console.log(`📥 响应: ${response.status}`, data);

        if (!response.ok) {
            return { error: data.error || `请求失败 (${response.status})` };
        }

        return data;
    } catch (err: any) {
        console.error('❌ 网络错误:', err);
        return { error: '网络错误，请检查后端服务是否运行在 http://localhost:3001' };
    }
};

// API服务
export const api = {
    // 认证相关（公开接口，不需要token）
    auth: {
        signup: async (data: { email: string; password: string; name?: string }) => {
            return publicRequest('/auth/signup', {
                method: 'POST',
                body: JSON.stringify(data),
            });
        },

        login: async (data: { email: string; password: string }) => {
            return publicRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify(data),
            });
        },

        logout: () => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
        },

        getMe: () => request('/auth/me'),

        isLoggedIn: () => !!localStorage.getItem('access_token'),

        getUser: () => {
            const userStr = localStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        }
    },

    // 用户资料（需要认证）
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
