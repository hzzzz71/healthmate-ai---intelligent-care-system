
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: 'Sarah Jenkins',
    gender: 'female',
    bloodType: 'O',
    dob: '1985-04-12',
    allergies: '青霉素, 磺胺类药物'
  });

  const handleSave = () => {
    // Logic to save profile changes
    navigate('/profile');
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark transition-colors">
      <header className="sticky top-0 z-10 flex items-center bg-surface-light dark:bg-surface-dark p-4 pb-2 justify-between border-b border-gray-100 dark:border-gray-800 transition-colors">
        <button 
          onClick={() => navigate(-1)}
          className="text-text-primary-light dark:text-text-primary-dark flex size-10 shrink-0 items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight flex-1 text-center">编辑个人资料</h2>
        <button 
          onClick={handleSave}
          className="flex items-center justify-center h-10 px-2 text-primary font-bold text-base hover:opacity-80 transition-opacity"
        >
          保存
        </button>
      </header>

      <main className="flex-1 flex flex-col pb-8">
        <div className="flex p-6 flex-col items-center bg-surface-light dark:bg-surface-dark mb-6 shadow-sm transition-colors">
          <div className="flex w-full flex-col gap-4 items-center">
            <div className="relative group cursor-pointer">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-28 w-28 ring-4 ring-background-light dark:ring-background-dark shadow-md" 
                style={{ backgroundImage: 'url("https://picsum.photos/200/200?random=50")' }}
              ></div>
              <div className="absolute inset-0 bg-black/10 dark:bg-black/30 rounded-full flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
              </div>
              <div className="absolute bottom-0 right-0 bg-surface-light dark:bg-surface-dark rounded-full p-2 shadow-md border border-gray-100 dark:border-gray-700 text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
              </div>
            </div>
            <button className="text-primary font-medium text-sm hover:underline">更换头像</button>
          </div>
        </div>

        <div className="px-4 space-y-5">
          <div>
            <label className="block text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-2 ml-1" htmlFor="name">姓名</label>
            <div className="relative">
              <input 
                className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark focus:border-primary focus:ring-primary/20 py-3.5 px-4 shadow-sm transition-colors text-base font-medium" 
                id="name" 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-2 ml-1" htmlFor="gender">性别</label>
              <div className="relative">
                <select 
                  className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark focus:border-primary focus:ring-primary/20 py-3.5 px-4 shadow-sm transition-colors appearance-none text-base font-medium" 
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="female">女</option>
                  <option value="male">男</option>
                  <option value="other">其他</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary-light">
                  <span className="material-symbols-outlined text-[20px]">expand_more</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-2 ml-1" htmlFor="blood-type">血型</label>
              <div className="relative">
                <select 
                  className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark focus:border-primary focus:ring-primary/20 py-3.5 px-4 shadow-sm transition-colors appearance-none text-base font-medium" 
                  id="blood-type"
                  value={formData.bloodType}
                  onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
                >
                  <option value="A">A 型</option>
                  <option value="B">B 型</option>
                  <option value="AB">AB 型</option>
                  <option value="O">O 型</option>
                  <option value="unknown">未知</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary-light">
                  <span className="material-symbols-outlined text-[20px]">expand_more</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-2 ml-1" htmlFor="dob">出生日期</label>
            <div className="relative">
              <input 
                className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark focus:border-primary focus:ring-primary/20 py-3.5 px-4 shadow-sm transition-colors text-base font-medium" 
                id="dob" 
                type="date" 
                value={formData.dob}
                onChange={(e) => setFormData({...formData, dob: e.target.value})}
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary-light pointer-events-none">
                <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider mb-2 ml-1" htmlFor="allergies">过敏史</label>
            <div className="relative">
              <textarea 
                className="w-full rounded-xl border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark focus:border-primary focus:ring-primary/20 py-3.5 px-4 shadow-sm transition-colors text-base leading-relaxed resize-none font-medium" 
                id="allergies" 
                placeholder="请输入过敏药物或食物..." 
                rows={3}
                value={formData.allergies}
                onChange={(e) => setFormData({...formData, allergies: e.target.value})}
              ></textarea>
              <div className="absolute top-3 right-3 text-red-500">
                <span className="material-symbols-outlined text-[20px]">warning</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-text-secondary-light dark:text-text-secondary-dark ml-1 italic opacity-80">
              * 请如实填写过敏史，以便医生在开具处方时进行核对。
            </p>
          </div>
        </div>

        <div className="mt-auto px-4 pt-8 pb-4">
          <div className="flex items-center justify-center gap-2 text-primary bg-primary/5 dark:bg-primary/10 rounded-lg p-3 border border-primary/10 transition-colors">
            <span className="material-symbols-outlined text-sm">lock</span>
            <p className="text-xs font-medium">您的健康数据已通过端到端加密保护</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
