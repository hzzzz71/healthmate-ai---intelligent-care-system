
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await api.auth.login({ email, password });

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      if (result.access_token) {
        // 保存token到localStorage
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('refresh_token', result.refresh_token);
        localStorage.setItem('user', JSON.stringify(result.user));

        navigate('/');
      } else {
        setError('登录失败，请重试');
      }
    } catch (err: any) {
      setError(err.message || '登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-surface-light dark:bg-background-dark transition-colors">
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>

      <header className="sticky top-0 z-10 flex items-center p-4 justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-text-secondary-light dark:text-text-secondary-dark flex size-10 shrink-0 items-center justify-center hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col px-8 pb-8 z-10">
        <div className="flex flex-col items-center mt-6 mb-10">
          <div className="bg-primary aspect-square rounded-2xl h-20 w-20 flex items-center justify-center shadow-lg shadow-primary/30 mb-6">
            <span className="material-symbols-outlined text-white text-[44px]">local_hospital</span>
          </div>
          <h1 className="text-text-primary-light dark:text-text-primary-dark text-2xl font-bold leading-tight tracking-tight text-center">智慧医疗健康</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium leading-normal text-center mt-2">安全登录您的健康管理账户</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">error</span>
            {error}
          </div>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark ml-1 uppercase tracking-wider">邮箱</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark group-focus-within:text-primary transition-colors text-[22px]">mail</span>
              </div>
              <input
                className="block w-full pl-12 pr-4 py-4 bg-background-light dark:bg-surface-dark border-transparent focus:border-primary focus:ring-0 rounded-xl text-text-primary-light dark:text-text-primary-dark placeholder-gray-400 font-medium transition-all text-base"
                placeholder="请输入邮箱"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark ml-1 uppercase tracking-wider">密码</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark group-focus-within:text-primary transition-colors text-[22px]">lock</span>
              </div>
              <input
                className="block w-full pl-12 pr-12 py-4 bg-background-light dark:bg-surface-dark border-transparent focus:border-primary focus:ring-0 rounded-xl text-text-primary-light dark:text-text-primary-dark placeholder-gray-400 font-medium transition-all text-base"
                placeholder="请输入密码"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end mt-1 px-1">
            <button className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors" type="button">
              忘记密码?
            </button>
          </div>

          <button
            className="mt-6 w-full bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? '登录中...' : '登 录'}
          </button>
        </form>

        <div className="flex-1 min-h-[40px]"></div>

        <div className="flex flex-col items-center gap-6 mb-4">
          <div className="w-full h-px bg-gray-100 dark:bg-gray-800"></div>

          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            还没有账号?
            <button onClick={() => navigate('/register')} className="text-primary font-bold hover:underline ml-1">立即注册</button>
          </p>

          <div className="flex items-center gap-1 text-text-secondary-light dark:text-text-secondary-dark opacity-40">
            <span className="material-symbols-outlined text-[14px]">shield</span>
            <p className="text-[10px] font-medium uppercase tracking-widest">Medical Grade Security</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
