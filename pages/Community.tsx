
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Community: React.FC = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(12);

  const toggleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-100">
        <button 
          onClick={() => navigate('/search')}
          className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined">search</span>
        </button>
        <h2 className="text-lg font-bold">社区</h2>
        <button 
          onClick={() => navigate('/profile')}
          className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </header>

      <div className="px-4 space-y-4 pb-12 pt-2">
        {/* Article Card */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4">
          <div className="flex-1 flex flex-col justify-between py-1">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-sm font-bold">verified_user</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">临床洞察</span>
              </div>
              <h3 className="text-base font-bold leading-tight">冬季血压管理新指南</h3>
              <p className="text-[10px] text-gray-400">Smith 医生, 心脏科专家</p>
            </div>
            <button 
              onClick={() => navigate('/article/winter-hypertension')}
              className="text-primary text-sm font-bold flex items-center gap-1 group mt-2 hover:underline"
            >
              阅读文章
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
          <div className="size-24 rounded-xl overflow-hidden shrink-0">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuRDlf8ZAxG2YNnE4xjLOkFZ-RaP44k3BdZB1ene1BWt_kltd4BeTSzlvfxhLTRHR4IO_hZhlZrXYoNHxDeKTOaO3KUkJwXTCHHNY1LSnidNIKh8pNL74S4aymW05RY3Fu1wjw5JPebPscGyJUWN5zluHH1bjLsbqxFs3UUCfzykth68H16wGw7vF-81Dvc-JzG0v6cYv63llsRuSEl4QftvcOTjCKglkFa5-7Vkp-sVyr-ulbWmFfoQS3-t2Maofibg0eQfnYUeLe" alt="Thumbnail" className="size-full object-cover" />
          </div>
        </div>

        {/* Post Card */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-start gap-3">
            <img src="https://picsum.photos/100/100?random=21" className="size-10 rounded-full border border-gray-100" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold">Sarah J.</span>
                    <span className="material-symbols-outlined text-primary text-sm">shield_person</span>
                  </div>
                  <p className="text-[10px] text-gray-400">2小时前 • 2型糖尿病</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            有人在换新药方案后感到疲劳吗？尽管指标正常，我最近感觉异常疲惫。
          </p>
          <div className="flex gap-6 pt-2 border-t border-gray-50">
            <button 
              onClick={toggleLike}
              className={`flex items-center gap-1.5 transition-colors ${liked ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
            >
              <span className={`material-symbols-outlined text-xl ${liked ? 'material-symbols-filled' : ''}`}>thumb_up</span>
              <span className="text-xs font-bold">{likeCount}</span>
            </button>
            <button 
              onClick={() => navigate('/comment')}
              className="flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-xl">chat_bubble</span>
              <span className="text-xs font-bold">4</span>
            </button>
          </div>
        </div>

        {/* Discussion Card */}
        <div 
          onClick={() => navigate('/topic/insulin-resistance')}
          className="relative h-60 rounded-3xl overflow-hidden shadow-sm group cursor-pointer"
        >
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHi5FTjzJIYoWyLmngNlnC58M9a9muFdBLtUhDhQeCYmQm1xaDtdc7rHDgZcwpWDGjko0IXTSI_IZ_otmjJntyOT56CcV_e3y9okLaj8m-lnaxBTDoBYGrNFPBZDS4ZfwWQ-Q2KBLFzv-Oky7O9qP05-xJgJ2KaswIgKCQdyyB4AOE9K8g-0mrgHNL-QOFhSOv3G6Erl8z9egtY3PyTMMq3sslUj8hWBvSrkKLpb3xXhIi58OzZMenSP4EAVeSmhYuDa-hztCU2oSa" className="absolute inset-0 size-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="relative h-full p-6 flex flex-col justify-end text-white">
            <div className="flex gap-2 mb-2">
              <span className="bg-primary px-2 py-0.5 rounded text-[10px] font-bold">专家回答</span>
              <span className="bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold">45 个回答</span>
            </div>
            <h3 className="text-xl font-bold mb-4 leading-tight">了解胰岛素抵抗：成因与逆转</h3>
            <button 
              className="w-full bg-white/20 backdrop-blur-md border border-white/30 h-10 rounded-xl font-bold text-sm active:scale-95 transition-transform"
            >
              查看讨论
            </button>
          </div>
        </div>
      </div>

      {/* Blue Circular Upload/Post Button as requested in screenshot */}
      <button 
        onClick={() => navigate('/post-insight')}
        className="fixed bottom-28 right-6 size-14 bg-primary text-white rounded-full shadow-xl shadow-primary/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-30"
      >
        <span className="material-symbols-outlined text-3xl font-bold">add</span>
      </button>
    </div>
  );
};

export default Community;
