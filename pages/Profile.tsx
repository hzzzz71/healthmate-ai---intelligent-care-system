
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark transition-colors relative">
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-[2px] animate-in fade-in duration-200"
          onClick={() => setShowLogoutModal(false)}
        >
          <div 
            className="bg-surface-light dark:bg-surface-dark w-full max-w-[320px] rounded-2xl shadow-2xl p-6 flex flex-col gap-6 transform transition-all animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="h-12 w-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
                <span className="material-symbols-outlined text-[24px]">logout</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">退出登录</h3>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">确定要退出登录吗？</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex items-center justify-center h-11 rounded-xl bg-gray-100 dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                取消
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center h-11 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-sm transition-colors"
              >
                确认退出
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-white dark:bg-surface-dark p-4 border-b border-gray-100 dark:border-gray-800 flex items-center transition-colors">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 className="flex-1 text-center font-bold pr-10 text-text-primary-light dark:text-text-primary-dark">个人中心</h2>
      </header>

      <main className={`flex-1 flex flex-col transition-all ${showLogoutModal ? 'blur-[1px]' : ''}`}>
        <div className="flex flex-col items-center bg-white dark:bg-surface-dark py-8 px-6 shadow-sm mb-6 transition-colors">
          <div className="relative mb-4">
            <img src="https://picsum.photos/200/200?random=50" className="size-28 rounded-full ring-4 ring-gray-50 dark:ring-background-dark object-cover shadow-lg" alt="Profile" />
          </div>
          <button 
            onClick={() => navigate('/edit-profile')}
            className="bg-[#137fec]/10 text-[#137fec] px-10 py-2.5 rounded-full font-bold text-sm hover:bg-[#137fec]/20 transition-colors"
          >
            编辑资料
          </button>
        </div>

        <div className="px-4 space-y-6 pb-12">
          <div className="space-y-3">
            <h3 className="px-2 text-xs font-bold text-[#617589] dark:text-gray-400 uppercase tracking-wider">数据与安全</h3>
            <div className="bg-white dark:bg-surface-dark rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm transition-colors">
              <div 
                onClick={() => navigate('/data-auth')}
                className="flex items-center gap-4 p-5 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
              >
                <div className="size-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">shield_person</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-base text-text-primary-light dark:text-text-primary-dark">数据授权管理</p>
                  <p className="text-xs text-[#617589] dark:text-gray-400">3 项有效授权</p>
                </div>
                <span className="material-symbols-outlined text-gray-300">chevron_right</span>
              </div>
              <div 
                onClick={() => navigate('/privacy-security')}
                className="flex items-center gap-4 p-5 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
              >
                <div className="size-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">lock</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-base text-text-primary-light dark:text-text-primary-dark">隐私与安全</p>
                  <p className="text-xs text-[#617589] dark:text-gray-400">双重验证、密码与生物识别</p>
                </div>
                <span className="material-symbols-outlined text-gray-300">chevron_right</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="px-2 text-xs font-bold text-[#617589] dark:text-gray-400 uppercase tracking-wider">医疗网络</h3>
            <div className="bg-white dark:bg-surface-dark rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm transition-colors">
              <div 
                onClick={() => navigate('/family-management')}
                className="flex items-center gap-4 p-5 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
              >
                <div className="size-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">diversity_1</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-base text-text-primary-light dark:text-text-primary-dark">家人管理</p>
                  <p className="text-xs text-[#617589] dark:text-gray-400">共享访问权限与紧急联系人</p>
                </div>
                <span className="material-symbols-outlined text-gray-300">chevron_right</span>
              </div>
              <div 
                onClick={() => alert('拨打紧急电话...')}
                className="flex items-center gap-4 p-5 bg-[#f54336] text-white hover:bg-[#d32f2f] cursor-pointer transition-colors"
              >
                <div className="size-10 bg-white/20 text-white rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined fill-current">call</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-base">紧急联系人</p>
                  <p className="text-xs opacity-90">点击呼叫紧急救援或家属</p>
                </div>
                <span className="material-symbols-outlined text-white/50">chevron_right</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setShowLogoutModal(true)}
            className="w-full bg-white dark:bg-surface-dark text-red-600 dark:text-red-400 font-bold py-4 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center justify-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined">logout</span>
            退出登录
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
