
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreed) {
      setError('请先同意用户协议');
      return;
    }

    if (password.length < 6) {
      setError('密码至少需要6位字符');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const result = await api.auth.signup({ email, password, name });

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      if (result.user || result.message) {
        setSuccess('🎉 注册成功！正在跳转到登录页...');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setError('注册失败，请重试');
      }
    } catch (err: any) {
      console.error('注册异常:', err);
      setError(err.message || '注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors">
      <header className="sticky top-0 z-20 flex items-center bg-background-light dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex size-10 items-center justify-center rounded-full text-text-primary-light dark:text-text-primary-dark hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <div className="text-base font-bold text-text-primary-light dark:text-text-primary-dark">用户注册</div>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 flex flex-col px-6 pt-4 pb-8">
        <div className="mb-8 mt-2">
          <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2 tracking-tight">创建您的健康账户</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed">
            请填写以下信息以开启您的专属医疗管理服务。
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">error</span>
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-xl text-sm mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            {success}
          </div>
        )}

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark ml-1 uppercase tracking-wider text-[11px]">第一步 · 输入姓名</label>
            <div className="relative group transition-all duration-300">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark text-[22px] group-focus-within:text-primary transition-colors">person</span>
              </div>
              <input
                className="block w-full pl-12 pr-4 py-4 bg-surface-light dark:bg-surface-dark border-0 rounded-2xl text-base shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface-dark transition-all outline-none"
                placeholder="请输入您的姓名"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark ml-1 uppercase tracking-wider text-[11px]">第二步 · 输入邮箱</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark text-[22px] group-focus-within:text-primary transition-colors">mail</span>
              </div>
              <input
                className="block w-full pl-12 pr-4 py-4 bg-surface-light dark:bg-surface-dark border-0 rounded-2xl text-base shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface-dark transition-all outline-none"
                placeholder="请输入邮箱地址"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark ml-1 uppercase tracking-wider text-[11px]">第三步 · 设置密码</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark text-[22px] group-focus-within:text-primary transition-colors">lock</span>
              </div>
              <input
                className="block w-full pl-12 pr-12 py-4 bg-surface-light dark:bg-surface-dark border-0 rounded-2xl text-base shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface-dark transition-all outline-none"
                placeholder="设置登录密码（至少6位）"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>
            <div className="flex items-center gap-1.5 ml-1 mt-1">
              <span className={`material-symbols-outlined text-[14px] ${password.length >= 6 ? 'text-green-600' : 'text-gray-400'}`}>
                {password.length >= 6 ? 'check_circle' : 'radio_button_unchecked'}
              </span>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">密码至少6位字符</p>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3 p-1">
            <div className="flex h-5 items-center mt-0.5">
              <input
                className="size-5 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer bg-surface-light"
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
            </div>
            <div className="text-sm leading-5">
              <label className="font-normal text-text-secondary-light dark:text-text-secondary-dark" htmlFor="terms">
                我已仔细阅读并同意 <button type="button" className="font-medium text-primary hover:underline">用户协议</button> 与 <button type="button" className="font-medium text-primary hover:underline">隐私条款</button>
              </label>
            </div>
          </div>

          <button
            className="mt-4 w-full bg-primary hover:bg-blue-600 text-white font-bold text-lg py-4 px-6 rounded-2xl shadow-lg shadow-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading || !agreed}
          >
            {loading ? (
              <>
                <span className="animate-spin material-symbols-outlined">progress_activity</span>
                <span>注册中...</span>
              </>
            ) : (
              <>
                <span>立即注册</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-auto pt-10 text-center">
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            已有账号？ <button onClick={() => navigate('/login')} className="font-bold text-primary hover:underline">立即登录</button>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
