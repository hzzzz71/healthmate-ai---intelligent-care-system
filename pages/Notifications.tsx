
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'reminder' | 'message'>('reminder');
  const [showUrgent, setShowUrgent] = useState(true);

  const handleAction = (msg: string) => {
    alert(msg);
    setShowUrgent(false);
  };

  const handleCopyAddress = () => {
    alert('地址已复制到剪贴板');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light">
      <header className="sticky top-0 z-50 bg-white p-4 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-black">通知与提醒</h1>
      </header>

      <div className="p-4 space-y-6 flex-1 overflow-y-auto pb-24">
        <div className="flex h-10 w-full items-center bg-gray-200 rounded-xl p-1">
          <button 
            onClick={() => setActiveTab('reminder')}
            className={`flex-1 h-full rounded-lg text-xs font-bold transition-all ${activeTab === 'reminder' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
          >
            提醒
          </button>
          <button 
            onClick={() => setActiveTab('message')}
            className={`flex-1 h-full rounded-lg text-xs font-bold transition-all ${activeTab === 'message' ? 'bg-white text-primary shadow-sm' : 'text-gray-400'}`}
          >
            消息
          </button>
        </div>

        {activeTab === 'reminder' ? (
          <>
            {showUrgent && (
              <section className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center gap-2 text-red-600">
                  <span className="material-symbols-outlined text-lg">error</span>
                  <h3 className="text-xs font-black uppercase tracking-wider">需要紧急处理</h3>
                </div>
                <div className="bg-white p-5 rounded-3xl border-l-4 border-red-500 shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-red-50 opacity-20"></div>
                  <div className="relative flex justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">漏服药物: 二甲双胍</h4>
                      <p className="text-xs text-gray-500 leading-relaxed mb-4">计划时间: 上午 8:00。请立即服用或联系 Jenkins 医生。</p>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handleAction('已记录服用：二甲双胍')}
                          className="flex-1 bg-primary text-white text-xs font-bold py-2.5 rounded-xl shadow-md active:scale-95 transition-transform"
                        >
                          立即服用
                        </button>
                        <button 
                          onClick={() => handleAction('已跳过本次服用')}
                          className="flex-1 bg-gray-100 text-gray-600 text-xs font-bold py-2.5 rounded-xl active:scale-95 transition-transform"
                        >
                          跳过
                        </button>
                      </div>
                    </div>
                    <div className="size-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined">medication</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section className="space-y-4">
              <h3 className="font-black text-lg">今天</h3>
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="flex">
                  <div className="p-5 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-100 text-primary text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest">预约</span>
                      <span className="text-[10px] text-gray-400 font-bold">下午 2:00</span>
                    </div>
                    <h4 className="font-bold">复诊: 心脏科</h4>
                    <p className="text-xs text-gray-400">Sarah Jenkins 医生 • 总院</p>
                  </div>
                  <div className="w-24 bg-gray-100">
                    <img src="https://picsum.photos/200/200?random=40" className="size-full object-cover" />
                  </div>
                </div>
                <div className="bg-gray-50 p-3 border-t border-gray-50 flex justify-between items-center px-5">
                  <p className="text-[10px] text-gray-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">notifications_active</span>
                    提醒设置为下午 1:30
                  </p>
                  <button 
                    onClick={handleCopyAddress}
                    className="text-[10px] font-black text-primary hover:underline"
                  >
                    复制地址
                  </button>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-40">
            <span className="material-symbols-outlined text-6xl mb-4">chat</span>
            <p className="text-sm font-bold">暂无新消息</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
