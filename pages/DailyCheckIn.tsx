
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DailyCheckIn: React.FC = () => {
  const navigate = useNavigate();
  const [lisinoprilDone, setLisinoprilDone] = useState(false);
  const [calories, setCalories] = useState(1240);
  const goal = 2000;

  const handleAddNutrition = () => {
    const amount = parseInt(prompt("请输入摄入的热量 (kcal):") || "0");
    if (amount > 0) {
      setCalories(prev => Math.min(prev + amount, goal));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <img src="https://picsum.photos/200/200?random=50" className="size-10 rounded-full border-2 border-primary/20" />
            <p className="text-sm text-gray-400 font-bold">10月24日 星期一</p>
          </div>
          <button onClick={() => navigate('/notifications')} className="size-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-600">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
        <h1 className="text-2xl font-black">早上好，Sarah</h1>
      </header>

      <div className="px-4 space-y-6 pb-12">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">今日进度</h2>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black">
              已完成 {3 + (lisinoprilDone ? 1 : 0)} / 5
            </span>
          </div>
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full rounded-full transition-all duration-500" 
              style={{ width: `${((3 + (lisinoprilDone ? 1 : 0)) / 5) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-4 leading-relaxed font-medium">做得很好！保持节奏，延续您的连胜纪录。</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-bold">用药记录</h3>
          </div>
          <div className="bg-white p-4 rounded-2xl border-l-4 border-green-500 shadow-sm flex items-center justify-between opacity-60">
            <div className="flex items-center gap-4">
              <div className="size-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined">pill</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-400 line-through">二甲双胍 (Metformin)</h4>
                <p className="text-[10px] text-gray-400">500mg • 早上 8:00 • 随餐服用</p>
              </div>
            </div>
            <div className="size-8 rounded-full bg-green-500 text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">check</span>
            </div>
          </div>
          <div className={`bg-white p-4 rounded-2xl border-l-4 border-primary shadow-sm flex items-center justify-between transition-colors ${lisinoprilDone ? 'opacity-60' : ''}`}>
            <div className="flex items-center gap-4">
              <div className={`size-10 rounded-xl flex items-center justify-center ${lisinoprilDone ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-primary'}`}>
                <span className="material-symbols-outlined">{lisinoprilDone ? 'check_circle' : 'medication_liquid'}</span>
              </div>
              <div>
                <h4 className={`font-bold transition-all ${lisinoprilDone ? 'text-gray-400 line-through' : ''}`}>赖诺普利 (Lisinopril)</h4>
                <p className="text-[10px] text-gray-400">10mg • 中午 12:00</p>
              </div>
            </div>
            <button 
              onClick={() => setLisinoprilDone(!lisinoprilDone)}
              className={`size-8 rounded-full border-2 transition-all flex items-center justify-center ${lisinoprilDone ? 'bg-green-500 border-green-500 text-white' : 'border-gray-200 hover:border-primary'}`}
            >
              {lisinoprilDone && <span className="material-symbols-outlined text-sm font-bold">check</span>}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold px-1">每日日志</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <div className="size-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined">nutrition</span>
                  </div>
                  <div>
                    <h4 className="font-bold">营养摄入</h4>
                    <p className="text-[10px] text-gray-400">目标: {goal} 千卡</p>
                  </div>
                </div>
                <button 
                  onClick={handleAddNutrition}
                  className="bg-primary text-white size-8 rounded-lg flex items-center justify-center active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>{calories} 千卡</span>
                <span className="text-gray-300">{Math.round((calories / goal) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-orange-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${(calories / goal) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyCheckIn;
