
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostInsight: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handlePost = () => {
    if (content.trim()) {
      alert('发布成功！');
      navigate('/community');
    } else {
      alert('请输入内容');
    }
  };

  return (
    <div className="bg-white dark:bg-[#101922] font-display text-[#111418] dark:text-white transition-colors duration-200 antialiased h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center bg-white/95 dark:bg-[#101922]/95 backdrop-blur-sm px-4 h-[56px] justify-between border-b border-gray-100 dark:border-gray-800 shrink-0">
        <button 
          onClick={() => navigate(-1)}
          className="text-[#617589] dark:text-text-secondary-dark text-base font-medium hover:text-[#111418] dark:hover:text-white transition-colors px-2 -ml-2"
        >
          取消
        </button>
        <h2 className="text-[#111418] dark:text-white text-lg font-bold tracking-tight">发布心得</h2>
        <button 
          onClick={handlePost}
          className="bg-[#137fec] hover:bg-[#137fec]/90 active:scale-95 text-white text-sm font-bold px-4 py-1.5 rounded-full transition-all shadow-sm shadow-blue-200 dark:shadow-none"
        >
          发布
        </button>
      </div>

      {/* Main Content Scroll Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
        {/* Text Entry */}
        <div className="p-5 flex-1 min-h-[200px]">
          <textarea 
            autoFocus
            className="w-full h-full min-h-[160px] bg-transparent border-none outline-none text-lg leading-relaxed text-[#111418] dark:text-white placeholder-gray-400 dark:placeholder-gray-600 resize-none p-0 focus:ring-0" 
            placeholder="分享您的健康心得或康复经历..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        {/* Media Grid Placeholder */}
        <div className="px-5 pb-8">
          <div className="grid grid-cols-3 gap-3">
            <button className="aspect-square rounded-xl bg-gray-50 dark:bg-[#1A2633] border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1A2633]/80 hover:text-primary transition-all group active:scale-95">
              <span className="material-symbols-outlined text-[32px] group-hover:scale-110 transition-transform font-light">add</span>
            </button>
          </div>
        </div>

        {/* Section Divider */}
        <div className="h-2 bg-[#f6f7f8] dark:bg-black/20 w-full shrink-0"></div>

        {/* Settings/Options */}
        <div className="flex flex-col shrink-0 pb-10">
          <button 
            onClick={() => alert('选择话题功能即将上线')}
            className="w-full flex items-center justify-between px-5 py-4 bg-white dark:bg-[#101922] border-b border-gray-100 dark:border-gray-800 active:bg-gray-50 dark:active:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 text-[#137fec]">
                <span className="material-symbols-outlined text-[20px]">tag</span>
              </div>
              <span className="text-[#111418] dark:text-white text-base font-medium">添加话题</span>
            </div>
            <div className="flex items-center gap-1 text-[#617589] dark:text-gray-500">
              <span className="text-sm">选择话题</span>
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </div>
          </button>

          <div className="w-full flex items-center justify-between px-5 py-4 bg-white dark:bg-[#101922] border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <span className="material-symbols-outlined text-[20px]">visibility_off</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[#111418] dark:text-white text-base font-medium">匿名发布</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                className="sr-only peer" 
                type="checkbox" 
                checked={isAnonymous}
                onChange={() => setIsAnonymous(!isAnonymous)}
              />
              <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#137fec]"></div>
            </label>
          </div>
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default PostInsight;
