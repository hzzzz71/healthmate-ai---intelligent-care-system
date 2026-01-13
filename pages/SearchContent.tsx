
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchContent: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const recentSearches = ['2型糖尿病', '降压药副作用', '心脏康复'];
  const hotSearches = ['糖尿病饮食', '高血压运动', '胰岛素抵抗', '减脂餐', '睡眠改善'];

  const clearSearch = () => setSearchQuery('');

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-10 bg-[#f6f7f8] dark:bg-[#101922] font-display text-[#111418] dark:text-white transition-colors duration-200 antialiased">
      {/* Search Header */}
      <div className="sticky top-0 z-30 flex items-center bg-white/95 dark:bg-[#101922]/95 backdrop-blur-sm px-4 py-3 justify-between border-b border-gray-100 dark:border-gray-800 gap-3">
        <div className="relative flex-1 group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#617589] dark:text-gray-400 pointer-events-none text-[20px]">search</span>
          <input 
            className="w-full h-9 bg-[#f6f7f8] dark:bg-[#1A2633] rounded-full pl-10 pr-9 text-sm text-[#111418] dark:text-white placeholder:text-[#617589] dark:placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white dark:focus:bg-[#1A2633] transition-all border border-transparent" 
            placeholder="搜索疾病、症状或科普文章" 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#617589] dark:text-gray-400 hover:text-[#111418] dark:hover:text-white p-1 rounded-full flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="text-[#111418] dark:text-white text-sm font-medium whitespace-nowrap active:opacity-70"
        >
          取消
        </button>
      </div>

      {/* Search Suggestions Content */}
      <div className="flex flex-col gap-6 pt-4 pb-2">
        {/* Recent Search */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-[#111418] dark:text-white">最近搜索</h3>
            <button className="text-[#617589] dark:text-gray-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((s) => (
              <button 
                key={s}
                onClick={() => setSearchQuery(s)}
                className="px-3 py-1.5 bg-white dark:bg-[#1A2633] border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium text-[#111418] dark:text-gray-200 active:scale-95 transition-transform truncate max-w-[150px]"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Hot Search */}
        <div className="px-4">
          <h3 className="text-sm font-bold text-[#111418] dark:text-white mb-3">热门搜索</h3>
          <div className="flex flex-wrap gap-2">
            {hotSearches.map((s, i) => (
              <button 
                key={s}
                onClick={() => setSearchQuery(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border border-transparent transition-colors ${
                  i === 0 
                  ? 'bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20' 
                  : 'bg-gray-100 dark:bg-[#1A2633] text-[#111418] dark:text-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="h-1 w-full bg-gray-100 dark:bg-[#151f2b]"></div>
      </div>

      {/* Recommended Content */}
      <div className="flex flex-col gap-4 px-4 pb-12">
        <h3 className="text-sm font-bold text-[#111418] dark:text-white pt-2">推荐内容</h3>
        
        {/* Article Card */}
        <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#1A2633] p-4 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-stretch justify-between gap-4">
            <div className="flex flex-[2_2_0px] flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
                  <p className="text-primary text-xs font-bold uppercase tracking-wider">临床洞察</p>
                </div>
                <p className="text-[#111418] dark:text-white text-base font-bold leading-tight line-clamp-2">冬季血压管理新指南：如何应对气温变化</p>
                <p className="text-[#617589] dark:text-gray-400 text-xs font-normal leading-normal">Smith 医生, 心脏科专家</p>
              </div>
              <button 
                onClick={() => navigate('/article/winter-hypertension')}
                className="flex items-center gap-1 text-sm font-semibold text-primary group w-fit"
              >
                <span>阅读文章</span>
                <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
            </div>
            <div 
              className="w-24 h-24 sm:w-32 sm:h-auto bg-center bg-no-repeat bg-cover rounded-lg shrink-0" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAuRDlf8ZAxG2YNnE4xjLOkFZ-RaP44k3BdZB1ene1BWt_kltd4BeTSzlvfxhLTRHR4IO_hZhlZrXYoNHxDeKTOaO3KUkJwXTCHHNY1LSnidNIKh8pNL74S4aymW05RY3Fu1wjw5JPebPscGyJUWN5zluHH1bjLsbqxFs3UUCfzykth68H16wGw7vF-81Dvc-JzG0v6cYv63llsRuSEl4QftvcOTjCKglkFa5-7Vkp-sVyr-ulbWmFfoQS3-t2Maofibg0eQfnYUeLe")' }}
            ></div>
          </div>
        </div>

        {/* User Post Card */}
        <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-[#1A2633] p-4 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex w-full flex-row items-start justify-start gap-3">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full w-10 h-10 shrink-0 border border-gray-100 dark:border-gray-700" 
              style={{ backgroundImage: 'url("https://picsum.photos/100/100?random=21")' }}
            ></div>
            <div className="flex h-full flex-1 flex-col items-start justify-start">
              <div className="flex w-full flex-row items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[#111418] dark:text-white text-sm font-bold leading-normal">Sarah J.</p>
                    <span className="material-symbols-outlined text-primary text-[16px]">shield_person</span>
                    <span className="text-[10px] font-medium bg-primary/10 text-primary px-1.5 py-0.5 rounded ml-1">已验证患者</span>
                  </div>
                  <p className="text-[#617589] dark:text-gray-400 text-xs font-normal">2小时前 • 2型糖尿病</p>
                </div>
                <button className="text-[#617589] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-full transition-colors">
                  <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                </button>
              </div>
              <p className="text-[#111418] dark:text-gray-200 text-sm font-normal leading-relaxed mt-3">
                有人在换新药方案后感到疲劳吗？尽管指标正常，我最近感觉异常疲惫，想知道这是否是常见的副作用。
              </p>
              <div className="flex w-full flex-row items-center justify-start gap-6 pt-4 border-t border-gray-50 dark:border-gray-700 mt-3">
                <button className="flex items-center gap-1.5 text-[#617589] dark:text-gray-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                  <span className="text-xs font-medium">12 点赞</span>
                </button>
                <button 
                  onClick={() => navigate('/comment')}
                  className="flex items-center gap-1.5 text-[#617589] dark:text-gray-400 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                  <span className="text-xs font-medium">4 评论</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Discussion Topic Card */}
        <div 
          onClick={() => navigate('/topic/insulin-resistance')}
          className="relative overflow-hidden rounded-xl h-[240px] shadow-sm group cursor-pointer"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCHi5FTjzJIYoWyLmngNlnC58M9a9muFdBLtUhDhQeCYmQm1xaDtdc7rHDgZcwpWDGjko0IXTSI_IZ_otmjJntyOT56CcV_e3y9okLaj8m-lnaxBTDoBYGrNFPBZDS4ZfwWQ-Q2KBLFzv-Oky7O9qP05-xJgJ2KaswIgKCQdyyB4AOE9K8g-0mrgHNL-QOFhSOv3G6Erl8z9egtY3PyTMMq3sslUj8hWBvSrkKLpb3xXhIi58OzZMenSP4EAVeSmhYuDa-hztCU2oSa")' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="relative h-full flex flex-col justify-end p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary/90 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                专家回答
              </span>
              <span className="bg-black/30 text-white text-[10px] font-medium px-2 py-1 rounded backdrop-blur-md">45 个回答</span>
            </div>
            <h3 className="text-white text-xl font-bold leading-tight mb-4 drop-shadow-md">了解胰岛素抵抗：成因与逆转</h3>
            <button className="flex w-full items-center justify-center rounded-lg h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-bold transition-colors">
              查看讨论
            </button>
          </div>
        </div>

        {/* Another User Post Card */}
        <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-[#1A2633] p-4 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex w-full flex-row items-start justify-start gap-3">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full w-10 h-10 shrink-0 border border-gray-100 dark:border-gray-700" 
              style={{ backgroundImage: 'url("https://picsum.photos/100/100?random=50")' }}
            ></div>
            <div className="flex h-full flex-1 flex-col items-start justify-start">
              <div className="flex w-full flex-row items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-[#111418] dark:text-white text-sm font-bold leading-normal">Robert M.</p>
                  <p className="text-[#617589] dark:text-gray-400 text-xs font-normal">5小时前 • 高血压</p>
                </div>
              </div>
              <p className="text-[#111418] dark:text-gray-200 text-sm font-normal leading-relaxed mt-3">
                刚刚完成了术后的第一次5公里步行！这是一段漫长的旅程，但坚持计划是有效的。#心脏健康
              </p>
              <div className="flex w-full flex-row items-center justify-start gap-6 pt-4 border-t border-gray-50 dark:border-gray-700 mt-3">
                <button className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-[20px] fill-current">thumb_up</span>
                  <span className="text-xs font-medium">84 点赞</span>
                </button>
                <button className="flex items-center gap-1.5 text-[#617589] dark:text-gray-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                  <span className="text-xs font-medium">12 评论</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchContent;
