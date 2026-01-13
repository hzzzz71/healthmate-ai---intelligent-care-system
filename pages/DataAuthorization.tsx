
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DataAuthorization: React.FC = () => {
  const navigate = useNavigate();

  const [authorizations, setAuthorizations] = useState({
    hospital: true,
    doctor: true,
    apple: true,
    huawei: false,
    xiaomi: false
  });

  const toggle = (key: keyof typeof authorizations) => {
    setAuthorizations(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const ToggleSwitch = ({ active, onToggle }: { active: boolean, onToggle: () => void }) => (
    <button 
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer ${active ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
    >
      <span className={`${active ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm`}></span>
    </button>
  );

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
        <h2 className="text-lg font-bold flex-1 text-center pr-10">数据授权管理</h2>
      </header>

      <main className="flex-1 flex flex-col p-4 pb-8 max-w-md mx-auto w-full">
        {/* Security Info Box */}
        <div className="mb-6 bg-[#ebf5ff] dark:bg-primary/10 border border-[#cce4ff] dark:border-primary/20 rounded-xl p-4 flex gap-3 items-start">
          <span className="material-symbols-outlined text-primary shrink-0 mt-0.5 material-symbols-filled">security</span>
          <div>
            <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark mb-1">隐私与安全保护</p>
            <p className="text-xs text-[#617589] dark:text-gray-400 leading-relaxed font-medium">
              您的健康数据仅在您的明确授权下共享。所有数据传输均采用医疗级端对端加密。
            </p>
          </div>
        </div>

        <h3 className="text-[#617589] dark:text-gray-400 text-xs font-bold uppercase tracking-wider px-2 mb-3">有效授权</h3>
        
        <div className="flex flex-col gap-4">
          {/* Hospital System Sync */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary flex items-center justify-center rounded-lg h-10 w-10 shrink-0">
                  <span className="material-symbols-outlined">domain</span>
                </div>
                <h4 className="font-bold text-base">医院系统同步</h4>
              </div>
              <ToggleSwitch active={authorizations.hospital} onToggle={() => toggle('hospital')} />
            </div>
            <p className="text-sm text-[#617589] dark:text-gray-400 leading-relaxed pl-[52px] font-medium">
              同步您的就诊记录、检验报告及电子处方至医院中心数据库，确保病历完整性。
            </p>
          </div>

          {/* Doctor Access */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center rounded-lg h-10 w-10 shrink-0">
                  <span className="material-symbols-outlined">stethoscope</span>
                </div>
                <h4 className="font-bold text-base">医师访问权限</h4>
              </div>
              <ToggleSwitch active={authorizations.doctor} onToggle={() => toggle('doctor')} />
            </div>
            <p className="text-sm text-[#617589] dark:text-gray-400 leading-relaxed pl-[52px] font-medium">
              允许您的签约医师查看实时健康指标（如血压、血糖），以便提供远程指导。
            </p>
          </div>

          {/* External Devices */}
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden">
            <div className="p-5 pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center rounded-lg h-10 w-10 shrink-0">
                  <span className="material-symbols-outlined">sensors</span>
                </div>
                <h4 className="font-bold text-base">第三方健康设备</h4>
              </div>
              <p className="text-sm text-[#617589] dark:text-gray-400 leading-relaxed pl-[52px] font-medium">
                连接外部健康平台，自动汇聚步数、心率及睡眠分析数据。
              </p>
            </div>
            
            <div className="mt-2 flex flex-col border-t border-gray-100 dark:border-gray-800/50">
              {/* Apple Health */}
              <div className="flex items-center justify-between p-4 pl-5 border-b border-gray-50 dark:border-gray-800/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-9 w-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-[#ff2d55] material-symbols-filled" style={{ fontSize: '22px' }}>favorite</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">Apple Health</span>
                      {authorizations.apple && (
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded font-bold">已连接</span>
                      )}
                    </div>
                  </div>
                </div>
                <ToggleSwitch active={authorizations.apple} onToggle={() => toggle('apple')} />
              </div>

              {/* Huawei Health */}
              <div className="flex items-center justify-between p-4 pl-5 border-b border-gray-50 dark:border-gray-800/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-9 w-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm overflow-hidden text-red-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2C12.55,2 13,2.45 13,3V9H11V3C11,2.45 11.45,2 12,2M6.5,5.5L8.5,8L10.5,10.5L10,12L6.5,7.5L5,5.5C5.4,5.2 6.1,5.2 6.5,5.5M17.5,5.5C17.9,5.2 18.6,5.2 19,5.5L17.5,7.5L14,12L13.5,10.5L15.5,8L17.5,5.5M4,11C4.55,11 5,11.45 5,12V13L10.5,14L11,15.5L4,14C3.45,14 3,13.55 3,13V12C3,11.45 3.45,11 4,11M20,11C20.55,11 21,11.45 21,12V13C21,13.55 20.55,14 20,14L13,15.5L13.5,14L19,13V12C19,11.45 19.45,11 20,11M12,16L13.5,20.5L14,22H10L10.5,20.5L12,16Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">Huawei Health</span>
                      {!authorizations.huawei && (
                        <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded font-bold">未连接</span>
                      )}
                    </div>
                  </div>
                </div>
                <ToggleSwitch active={authorizations.huawei} onToggle={() => toggle('huawei')} />
              </div>

              {/* Xiaomi */}
              <div className="flex items-center justify-between p-4 pl-5 border-b border-gray-50 dark:border-gray-800/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-9 w-9 bg-[#FF6700] rounded-lg flex items-center justify-center shrink-0 shadow-sm text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.8 13.5h-1.8v-4.5h1.8v2.3h3.5v-2.3h1.8v6.8h-1.8V13.5H13.8ZM8.3 15.8H6.5V7h1.8v9.5c0 0 0 .1 0-.1zm-4.5 0H2V7h1.8v8.8Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">Xiaomi</span>
                      {!authorizations.xiaomi && (
                        <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded font-bold">未连接</span>
                      )}
                    </div>
                  </div>
                </div>
                <ToggleSwitch active={authorizations.xiaomi} onToggle={() => toggle('xiaomi')} />
              </div>
            </div>
          </div>
        </div>

        {/* HIPAA Compliance Footer */}
        <div className="mt-auto pt-8 flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-1.5 text-[#617589] dark:text-gray-500 opacity-60">
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <p className="text-xs font-bold">受HIPAA合规性保护的安全连接</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataAuthorization;
