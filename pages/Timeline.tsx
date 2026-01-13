
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Timeline: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md p-4 border-b border-gray-100 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined text-xl">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold">健康时间轴</h2>
        <button className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100">
          <span className="material-symbols-outlined text-xl">more_horiz</span>
        </button>
      </header>

      <div className="px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="size-16 rounded-full border-2 border-white shadow-md overflow-hidden">
              <img src="https://picsum.photos/200/200?random=50" alt="Avatar" className="size-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full border-2 border-white p-0.5">
              <span className="material-symbols-outlined text-white text-[10px] font-bold block">check</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold">Sarah Jenkins</h3>
            <p className="text-gray-500 text-sm">ID: 883-920-11</p>
          </div>
          <div className="bg-green-50 px-2 py-1 rounded-lg border border-green-100 flex items-center gap-1">
            <span className="material-symbols-outlined text-green-600 text-sm">sync</span>
            <span className="text-green-700 text-[10px] font-bold">已同步</span>
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-6 text-white shadow-lg shadow-primary/20">
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider">下一步计划</span>
              <span className="text-sm font-medium">10月24日 10:00</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">心内科复诊</h3>
            <p className="text-blue-100 text-sm flex items-center gap-1 mb-6">
              <span className="material-symbols-outlined text-sm">person</span>
              李医生 • 市中心医院
            </p>
            <div className="flex gap-3">
              <button className="flex-1 bg-white text-primary text-sm font-bold py-3 rounded-xl shadow-sm active:scale-95 transition-transform">
                查看计划
              </button>
              <button className="size-12 bg-blue-600/50 rounded-xl flex items-center justify-center hover:bg-blue-600/70">
                <span className="material-symbols-outlined">near_me</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6">
        <div className="flex h-12 w-full items-center rounded-2xl bg-gray-100 p-1">
          {['全部', '就诊', '检查', '用药'].map((tab, i) => (
            <button key={tab} className={`flex-1 h-full rounded-xl text-xs font-bold transition-all ${i === 0 ? 'bg-white shadow-sm text-primary' : 'text-gray-400'}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 mt-8 relative">
        <div className="absolute left-[31px] top-4 bottom-0 w-0.5 bg-gray-100"></div>
        <div className="space-y-10 pb-12">
          {[
            { icon: 'biotech', color: 'text-blue-500 bg-blue-50', title: '血检结果 (CBC)', date: '10月10日', desc: '全血细胞计数结果已出。', action: '查看报告' },
            { icon: 'pill', color: 'text-orange-500 bg-orange-50', title: '处方续方', date: '9月15日', desc: '阿托伐他汀 - 20mg • 每日随餐服用' },
            { icon: 'stethoscope', color: 'text-purple-500 bg-purple-50', title: '诊断记录', date: '8月01日', desc: '轻度高血压 - 李医生在常规检查中发现血压偏高。' }
          ].map((item, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className={`size-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center shrink-0 z-10 ${item.color}`}>
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
              </div>
              <div className="flex-1 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-between mb-1">
                  <h4 className="font-bold text-base">{item.title}</h4>
                  <span className="text-[10px] font-bold text-gray-400">{item.date}</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                {item.action && (
                  <button className="mt-3 flex items-center gap-1 text-primary text-xs font-bold hover:underline">
                    <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                    {item.action}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
