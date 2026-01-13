
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FamilyManagement: React.FC = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState([
    {
      id: '1',
      name: '李建国',
      relation: '父亲',
      avatarIcon: 'elderly',
      avatarBg: 'bg-blue-50 dark:bg-blue-900/20',
      tagColor: 'bg-blue-50 text-primary dark:bg-blue-900/30 dark:text-blue-400',
      tagText: '父亲',
      subtext: '已绑定医保卡 (尾号 4592)',
      sharedData: true,
      appointmentAuth: true,
    },
    {
      id: '2',
      name: '李小明',
      relation: '孩子',
      avatarIcon: 'face_6',
      avatarBg: 'bg-green-50 dark:bg-green-900/20',
      tagColor: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      tagText: '孩子',
      subtext: '儿童疫苗接种提醒开启',
      sharedData: false,
      appointmentAuth: true,
    }
  ]);

  const toggleStatus = (memberId: string, field: 'sharedData' | 'appointmentAuth') => {
    setMembers(prev => prev.map(m => m.id === memberId ? { ...m, [field]: !m[field] } : m));
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
      <header className="sticky top-0 z-10 flex items-center bg-surface-light dark:bg-surface-dark p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800">
        <button 
          onClick={() => navigate(-1)}
          className="text-text-primary-light dark:text-text-primary-dark flex size-10 shrink-0 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">家人管理</h2>
      </header>

      <main className="flex-1 flex flex-col pb-8 max-w-md mx-auto w-full">
        <div className="px-6 pt-6 pb-2">
          <p className="text-[#617589] dark:text-gray-400 text-sm leading-relaxed font-medium">
            管理您亲属的健康档案。您可以为每位家庭成员单独设置数据共享与代办挂号权限。
          </p>
        </div>

        <div className="flex flex-col gap-4 p-4">
          {members.map(member => (
            <div key={member.id} className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4 mb-5">
                <div className={`h-14 w-14 rounded-full ${member.avatarBg} flex items-center justify-center text-primary shrink-0`}>
                  <span className="material-symbols-outlined text-[32px] material-symbols-filled">{member.avatarIcon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold ring-1 ring-inset ring-opacity-20 ${member.tagColor}`}>
                      {member.tagText}
                    </span>
                  </div>
                  <p className="text-xs text-[#617589] dark:text-gray-400 font-medium">{member.subtext}</p>
                </div>
                <button 
                  onClick={() => alert(`管理 ${member.name} 的详细资料`)}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">more_horiz</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#617589] dark:text-gray-500 text-[20px]">vital_signs</span>
                    <span className="text-sm font-bold">共享健康数据</span>
                  </div>
                  <ToggleSwitch active={member.sharedData} onToggle={() => toggleStatus(member.id, 'sharedData')} />
                </div>
                <div className="h-px bg-gray-100 dark:bg-gray-800 w-full"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#617589] dark:text-gray-500 text-[20px]">calendar_month</span>
                    <span className="text-sm font-bold">代办挂号权限</span>
                  </div>
                  <ToggleSwitch active={member.appointmentAuth} onToggle={() => toggleStatus(member.id, 'appointmentAuth')} />
                </div>
              </div>
            </div>
          ))}

          {/* Add Member Button */}
          <button 
            onClick={() => alert('添加家属功能即将上线')}
            className="mt-2 w-full flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-dashed border-[#137fec]/30 text-[#137fec] hover:bg-[#137fec]/5 transition-all group active:scale-[0.98]"
          >
            <div className="bg-[#137fec]/10 rounded-full p-1 group-hover:bg-[#137fec]/20 transition-colors">
              <span className="material-symbols-outlined text-[20px] font-bold">add</span>
            </div>
            <span className="font-bold text-sm">添加家属</span>
          </button>
        </div>

        {/* Security Footer */}
        <div className="mt-6 flex flex-col items-center justify-center gap-2 pb-10">
          <div className="flex items-center gap-1.5 text-[#617589] dark:text-gray-500 opacity-60">
            <span className="material-symbols-outlined text-[16px] material-symbols-filled">lock</span>
            <p className="text-xs font-bold">受安全保护的连接</p>
          </div>
          <p className="text-[10px] text-[#617589] dark:text-gray-500 font-bold opacity-40">HIPAA Compliant</p>
        </div>
      </main>
    </div>
  );
};

export default FamilyManagement;
