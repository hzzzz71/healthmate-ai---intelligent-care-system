
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacySecurity: React.FC = () => {
  const navigate = useNavigate();
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  const handleAction = (msg: string) => {
    alert(msg);
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-sans text-text-primary-light dark:text-text-primary-dark antialiased transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center bg-surface-light dark:bg-surface-dark p-4 justify-between border-b border-gray-100 dark:border-gray-800">
        <button 
          onClick={() => navigate(-1)}
          className="text-text-primary-light dark:text-text-primary-dark flex size-10 shrink-0 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">隐私与安全</h2>
      </header>

      <main className="flex-1 flex flex-col pb-8 max-w-md mx-auto w-full">
        {/* Status Illustration Section */}
        <div className="flex flex-col items-center justify-center p-8 pb-6">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 ring-4 ring-white dark:ring-surface-dark shadow-sm">
            <span className="material-symbols-outlined text-[40px] material-symbols-filled">shield_lock</span>
          </div>
          <h1 className="text-xl font-bold mb-1">安全设置</h1>
          <p className="text-[#617589] dark:text-gray-400 text-sm text-center px-4 leading-relaxed font-medium">
            您的账户受临床级加密技术保护。<br/>请定期检查您的登录方式与授权。
          </p>
        </div>

        {/* Section: Login & Authentication */}
        <div className="px-4 mb-6">
          <h3 className="text-[#617589] dark:text-gray-400 text-xs font-bold uppercase tracking-wider px-2 pb-2 ml-1">登录与认证</h3>
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
            
            {/* Biometric Toggle */}
            <div className="flex items-center gap-4 px-4 min-h-[72px] py-3 justify-between border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                  <span className="material-symbols-outlined">fingerprint</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-base font-bold leading-normal">指纹/面容 ID 登录</p>
                  <p className="text-[#617589] dark:text-gray-400 text-xs font-medium leading-normal">使用生物特征快速验证</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={biometricEnabled}
                  onChange={() => setBiometricEnabled(!biometricEnabled)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary shadow-sm"></div>
              </label>
            </div>

            {/* 2FA Item */}
            <div 
              onClick={() => handleAction('双重验证设置页面即将上线')}
              className="flex items-center gap-4 px-4 min-h-[72px] py-3 justify-between group cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center gap-4">
                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                  <span className="material-symbols-outlined">phonelink_lock</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-base font-bold leading-normal">双重身份验证</p>
                  <p className="text-[#617589] dark:text-gray-400 text-xs font-medium leading-normal">短信或身份验证器应用</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#617589] dark:text-gray-400 font-bold bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">未开启</span>
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-600">chevron_right</span>
              </div>
            </div>

            {/* Password Item */}
            <div 
              onClick={() => handleAction('修改密码功能开发中')}
              className="flex items-center gap-4 px-4 min-h-[72px] py-3 justify-between group cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                  <span className="material-symbols-outlined">lock_reset</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-base font-bold leading-normal">修改密码</p>
                  <p className="text-[#617589] dark:text-gray-400 text-xs font-medium leading-normal">上次修改：90天前</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-400 dark:text-gray-600">chevron_right</span>
            </div>
          </div>
        </div>

        {/* Section: Account Management */}
        <div className="px-4 mb-6">
          <h3 className="text-[#617589] dark:text-gray-400 text-xs font-bold uppercase tracking-wider px-2 pb-2 ml-1">账户管理</h3>
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
            <div 
              onClick={() => handleAction('账户注销属于敏感操作，请联系客服处理')}
              className="flex items-center gap-4 px-4 min-h-[72px] py-3 justify-between group cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-red-600 dark:text-red-400 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/20 shrink-0 size-10">
                  <span className="material-symbols-outlined">person_cancel</span>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-base font-bold leading-normal">注销账号</p>
                  <p className="text-[#617589] dark:text-gray-400 text-xs font-medium leading-normal">永久删除数据与访问权限</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-400 dark:text-gray-600 group-hover:text-red-400 transition-colors">chevron_right</span>
            </div>
          </div>
        </div>

        {/* HIPAA Footer */}
        <div className="mt-auto px-4 mb-4 flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-1.5 text-primary opacity-90 px-3 py-1.5 bg-primary/5 rounded-full border border-primary/10 transition-colors">
            <span className="material-symbols-outlined text-[16px] material-symbols-filled">lock</span>
            <p className="text-xs font-bold">受 HIPAA 协议保护的加密连接</p>
          </div>
          <p className="text-[10px] text-[#617589] dark:text-gray-500 font-bold opacity-60">Device ID: 883-920-11 • v2.4.1</p>
        </div>
      </main>
    </div>
  );
};

export default PrivacySecurity;
