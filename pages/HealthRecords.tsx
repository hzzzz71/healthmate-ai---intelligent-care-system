
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HealthRecords: React.FC = () => {
  const navigate = useNavigate();

  const handleAction = (msg: string) => {
    alert(msg);
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="sticky top-0 z-50 bg-white p-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-bold">健康档案</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => navigate('/notifications')}
            className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 relative"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </header>

      <div className="px-4 space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex gap-4 items-center">
          <div className="size-20 rounded-full border-2 border-primary/20 overflow-hidden shrink-0">
            <img src="https://picsum.photos/200/200?random=50" alt="Profile" className="size-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold">Sarah Jenkins</h3>
            <p className="text-xs text-gray-500 font-medium mt-1">ID: 883-920-11 • 生日: 1985/04/12</p>
          </div>
        </div>

        {/* Vitals Trends */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">体征趋势</h3>
            <button 
              onClick={() => handleAction('打开手动输入界面')}
              className="text-primary text-sm font-bold hover:underline"
            >
              手动输入
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-rose-500 text-lg">cardiology</span>
                <span className="text-xs text-gray-400 font-bold">血压</span>
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-black">120/80</span>
                <span className="text-[10px] text-gray-400">mmHg</span>
              </div>
              <div className="flex items-end gap-1 h-8">
                {[30, 50, 40, 60, 55, 70, 65].map((h, i) => (
                  <div key={i} className={`flex-1 rounded-t-sm ${i === 6 ? 'bg-primary' : 'bg-primary/20'}`} style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-blue-500 text-lg">water_drop</span>
                <span className="text-xs text-gray-400 font-bold">血糖</span>
              </div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-black">98</span>
                <span className="text-[10px] text-gray-400">mg/dL</span>
              </div>
              <div className="flex items-end gap-1 h-8">
                {[40, 30, 50, 45, 60, 55, 58].map((h, i) => (
                  <div key={i} className={`flex-1 rounded-t-sm ${i === 6 ? 'bg-primary' : 'bg-primary/20'}`} style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reports */}
        <div className="pb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">最近报告</h3>
            <button 
              onClick={() => handleAction('上传新报告')}
              className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-sm">upload</span>
              上传报告
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            {[
              { title: '血脂检查', date: '2023年11月12日', doctor: 'Sarah Smith', status: '异常', color: 'text-red-600 bg-red-50', icon: 'picture_as_pdf' },
              { title: 'MRI 扫描 - 腰椎', date: '2023年10月05日', doctor: '放射科', status: null, icon: 'image' },
              { title: '年度体检', date: '2023年8月20日', doctor: 'James Wilson', status: '正常', color: 'text-green-600 bg-green-50', icon: 'picture_as_pdf' }
            ].map((report, i) => (
              <div 
                key={i} 
                onClick={() => handleAction(`正在打开报告: ${report.title}`)}
                className="flex items-center p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 mr-4 ${report.color || 'bg-blue-50 text-blue-600'}`}>
                  <span className="material-symbols-outlined">{report.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold">{report.title}</h4>
                  <p className="text-[10px] text-gray-400">{report.date} • {report.doctor}</p>
                </div>
                {report.status && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mr-2 ${report.color}`}>
                    {report.status}
                  </span>
                )}
                <span className="material-symbols-outlined text-gray-300">chevron_right</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
