
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [meetingDone, setMeetingDone] = useState(false);

  const handleAddTask = () => {
    alert('添加待办功能开发中...');
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border-2 border-primary/20 shadow-sm" style={{ backgroundImage: 'url("https://picsum.photos/200/200?random=50")' }}></div>
          <div>
            <p className="text-xs text-gray-500 font-medium">欢迎回来，</p>
            <h2 className="text-lg font-bold leading-tight">Sarah Jenkins</h2>
          </div>
        </div>
        <button onClick={() => navigate('/notifications')} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors">
          <span className="material-symbols-outlined text-2xl">notifications</span>
        </button>
      </div>

      {/* Hero Card */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-primary shadow-xl shadow-primary/30 text-white p-6">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
          <div className="relative z-10 flex justify-between items-start mb-6">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1 opacity-90">今日状态</p>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined fill-current text-green-300">check_circle</span>
                <h3 className="text-2xl font-bold">稳定</h3>
              </div>
            </div>
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
              <span className="material-symbols-outlined text-white">ecg_heart</span>
            </div>
          </div>
          <div className="relative z-10 grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
              <p className="text-xs text-blue-100 mb-1">心率</p>
              <p className="text-xl font-bold">72 <span className="text-xs font-normal opacity-70">bpm</span></p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
              <p className="text-xs text-blue-100 mb-1">血压</p>
              <p className="text-xl font-bold">120/80</p>
            </div>
          </div>
        </div>
      </section>

      {/* Todo Items */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">待办事项</h3>
          <button 
            onClick={handleAddTask}
            className="size-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            title="添加待办"
          >
            <span className="material-symbols-outlined text-xl">add</span>
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
            <div className="flex flex-col items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 text-primary shrink-0">
              <span className="text-sm font-bold">10:00</span>
              <span className="text-[10px] font-bold uppercase">上午</span>
            </div>
            <div className="flex-1">
              <p className={`font-bold text-base transition-colors ${meetingDone ? 'text-gray-400 line-through' : ''}`}>雷医生复诊</p>
              <p className={`text-sm transition-colors ${meetingDone ? 'text-gray-300' : 'text-gray-500'}`}>心内科会诊</p>
            </div>
            <button 
              onClick={() => setMeetingDone(!meetingDone)}
              className={`size-6 border-2 rounded-lg cursor-pointer transition-all flex items-center justify-center ${meetingDone ? 'bg-primary border-primary text-white' : 'border-gray-200 hover:border-primary'}`}
            >
              {meetingDone && <span className="material-symbols-outlined text-xs font-bold">check</span>}
            </button>
          </div>
          <div onClick={() => navigate('/daily')} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50">
            <div className="flex flex-col items-center justify-center h-14 w-14 rounded-2xl bg-orange-100 text-orange-600 shrink-0">
              <span className="text-sm font-bold">12:30</span>
              <span className="text-[10px] font-bold uppercase">下午</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-base">打卡：每日日志</p>
              <p className="text-gray-500 text-sm">点击进行健康汇报</p>
            </div>
            <span className="material-symbols-outlined text-gray-300">chevron_right</span>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">快捷操作</h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {[
            { id: 'timeline', label: '健康时间轴', icon: 'history', color: 'bg-orange-50 text-orange-600', path: '/timeline' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center gap-3 p-5 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <div className={`${item.color} size-12 rounded-2xl flex items-center justify-center`}>
                <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              </div>
              <span className="text-sm font-bold">{item.label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
