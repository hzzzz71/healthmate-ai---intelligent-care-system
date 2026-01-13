
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopicDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24 bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white transition-colors duration-200 antialiased">
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-30 flex items-center bg-white/95 dark:bg-[#101922]/95 backdrop-blur-sm px-4 py-3 justify-between border-b border-gray-100 dark:border-gray-800 transition-colors">
        <button 
          onClick={() => navigate(-1)}
          className="text-[#111418] dark:text-white flex items-center justify-center rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 -ml-1 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-[#111418] dark:text-white text-base font-bold leading-tight tracking-tight">话题详情</h2>
        <button className="text-[#111418] dark:text-white flex items-center justify-center rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 -mr-1 transition-colors">
          <span className="material-symbols-outlined">share</span>
        </button>
      </div>

      {/* Hero Header Section */}
      <div className="relative w-full h-[260px] shrink-0">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCHi5FTjzJIYoWyLmngNlnC58M9a9muFdBLtUhDhQeCYmQm1xaDtdc7rHDgZcwpWDGjko0IXTSI_IZ_otmjJntyOT56CcV_e3y9okLaj8m-lnaxBTDoBYGrNFPBZDS4ZfwWQ-Q2KBLFzv-Oky7O9qP05-xJgJ2KaswIgKCQdyyB4AOE9K8g-0mrgHNL-QOFhSOv3G6Erl8z9egtY3PyTMMq3sslUj8hWBvSrkKLpb3xXhIi58OzZMenSP4EAVeSmhYuDa-hztCU2oSa")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="relative h-full flex flex-col justify-end p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">热门话题</span>
            <span className="text-gray-300 text-xs font-medium bg-black/30 px-2 py-0.5 rounded backdrop-blur-sm">临床营养科</span>
          </div>
          <h1 className="text-white text-2xl font-bold leading-tight mb-2 drop-shadow-md tracking-tight">了解胰岛素抵抗：成因与逆转</h1>
          <p className="text-gray-200 text-sm line-clamp-2 leading-relaxed opacity-90">如何通过饮食和生活方式干预有效改善胰岛素敏感性？专家团队与真实患者共同探讨。</p>
        </div>
      </div>

      {/* Sticky Tab/Filter Bar */}
      <div className="sticky top-[52px] z-20 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800 px-4 py-3 shadow-sm transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="font-bold text-[#111418] dark:text-white text-base">全部回答</span>
            <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">(45)</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium">
            <button className="text-primary flex items-center gap-0.5 hover:opacity-80 transition-opacity">
              按热度 <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </button>
          </div>
        </div>
      </div>

      {/* Answer List */}
      <div className="flex flex-col">
        {/* Answer 1: Doctor */}
        <div className="bg-white dark:bg-surface-dark p-4 border-b border-gray-100 dark:border-gray-800 transition-colors">
          <div className="flex gap-3">
            <div 
              className="w-10 h-10 rounded-full bg-cover bg-center shrink-0 border border-gray-100 dark:border-gray-700 shadow-sm" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhHQbVomtvIEgvYNHmcfEzleK69_7z2QCyDjKlUrY4p4z7AyLes3YtGX_Ad-rxp-7UePxsdJGq8hj6N3153JA1BY591ydBS9UCwBENVVbnubpXkdXh5a4mai1rVdqaCyH1swSemY40bwV2hEECwRZsfyTR1dL-tYX2wax0rbBpTp8aB99tfDMXl8cFOhVHypzvT08HR5rlOiuHv5ISwdQuN2knh1cv5ytRfdoI8D3G-TIJnIFkhsVLk3RGnpEcDEGdIAnqzFoE4NgD")' }}
            ></div>
            <div className="flex-1">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#111418] dark:text-white">Dr. Zhang</span>
                      <span className="material-symbols-outlined text-primary text-[14px] fill-current">verified</span>
                    </div>
                    <span className="text-primary text-[11px] font-medium">内分泌科主治医师 · 北京协和医院</span>
                  </div>
                  <span className="bg-primary/10 text-primary text-[10px] px-2 py-1 rounded font-bold flex items-center gap-1 shrink-0 border border-primary/10">
                    <span className="material-symbols-outlined text-[12px] fill-current">check_circle</span> 专业回答
                  </span>
                </div>
                <div className="mt-2 text-sm text-[#111418] dark:text-gray-100 leading-relaxed font-normal">
                  <p className="mb-2">胰岛素抵抗（Insulin Resistance）确实是2型糖尿病的前兆，但好消息是它是完全可逆的。在临床实践中，我们通常建议患者从以下三个维度入手：</p>
                  <ol className="list-decimal pl-4 space-y-1 text-gray-500 dark:text-gray-400">
                    <li><strong className="text-gray-700 dark:text-gray-200">低碳水饮食：</strong>严格控制精制米面糖的摄入，增加十字花科蔬菜比例。</li>
                    <li><strong className="text-gray-700 dark:text-gray-200">间歇性断食：</strong>如16:8饮食法，给胰腺足够的休息时间。</li>
                    <li><strong className="text-gray-700 dark:text-gray-200">抗阻力训练：</strong>增加肌肉量能有效提高葡萄糖处置率。</li>
                  </ol>
                </div>
                <div className="flex items-center gap-6 mt-3 pt-2">
                  <button className="flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                    <span className="text-xs font-medium">238 点赞</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                    <span className="text-xs font-medium">24 回复</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Answer 2: Verified Patient */}
        <div className="bg-white dark:bg-surface-dark p-4 border-b border-gray-100 dark:border-gray-800 transition-colors">
          <div className="flex gap-3">
            <div 
              className="w-10 h-10 rounded-full bg-cover bg-center shrink-0 border border-gray-100 dark:border-gray-700 shadow-sm" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBTSEvI_PwJswCS90TB159alYAIsPXhjjYKYKCHyozhbdtqakOZ2A5U_Vns1Le9RYGEF2X23eRiReLUtiAgXu1QKlBdaxe3HD-myK7_ZUNS68ibvLtS8zOEHdJerOtho9p1QAKeEQ9WpIjoOucFHL2Fa2DzgclarLKz-QUJuSuartc3M8EcJevlDZ2SmkgENNGtgv0ysmfOalniC5PnBB9FZZ3KAjYDtNcxs0mMvx0REQ1wWhFt-ovLvCl_mJVbl3lRwuy_MudaAimp")' }}
            ></div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#111418] dark:text-white">Sarah J.</span>
                    <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-[10px] px-1.5 py-0.5 rounded font-medium border border-green-200 dark:border-green-800">已验证患者</span>
                  </div>
                  <span className="text-gray-400 text-[11px] mt-0.5">2型糖尿病 · 确诊3年</span>
                </div>
                <span className="text-gray-400 text-[10px]">2小时前</span>
              </div>
              <div className="mt-2 text-sm text-[#111418] dark:text-gray-200 leading-relaxed">
                非常有用的建议！特别是关于抗阻力训练这块，我之前只知道有氧运动。坚持了三个月力量训练后，我的空腹胰岛素水平确实下降了，感觉整个人精神状态都不一样了。
              </div>
              <div className="flex items-center gap-6 mt-3">
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                  <span className="text-xs font-medium">45</span>
                </button>
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                  <span className="text-xs font-medium">回复</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Answer 3: Question from Li Ming */}
        <div className="bg-white dark:bg-surface-dark p-4 border-b border-gray-100 dark:border-gray-800 transition-colors">
          <div className="flex gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-primary shrink-0 text-sm font-bold shadow-sm">
              LM
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-bold text-sm text-[#111418] dark:text-white">Li Ming</span>
                  <span className="text-gray-400 text-[11px] mt-0.5">关注高血压话题</span>
                </div>
                <span className="text-gray-400 text-[10px]">4小时前</span>
              </div>
              <div className="mt-2 text-sm text-[#111418] dark:text-gray-200 leading-relaxed">
                请问医生，如果在服用二甲双胍期间进行间歇性断食，会不会容易出现低血糖的情况？早餐如果跳过的话，药物应该什么时候吃比较合适？
              </div>
              <div className="flex items-center gap-6 mt-3">
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                  <span className="text-xs font-medium">12</span>
                </button>
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                  <span className="text-xs font-medium">回复</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Answer 4: Nutritionist Reply to Li Ming */}
        <div className="bg-white dark:bg-surface-dark p-4 transition-colors">
          <div className="flex gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0 overflow-hidden shadow-sm">
              <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-[24px]">person</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#111418] dark:text-white">Wang Wei</span>
                    <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded font-medium border border-primary/10">临床营养师</span>
                  </div>
                  <span className="text-gray-400 text-[11px] mt-0.5">认证营养专家</span>
                </div>
                <span className="text-gray-400 text-[10px]">5小时前</span>
              </div>
              <span className="inline-flex mt-2 bg-primary/5 text-primary text-[10px] px-2 py-0.5 rounded font-medium items-center gap-1 border border-primary/10">
                <span className="material-symbols-outlined text-[12px] fill-current">check_circle</span> 专业回答
              </span>
              <div className="mt-2 text-sm text-[#111418] dark:text-gray-200 leading-relaxed">
                回复 <span className="text-primary font-medium">@Li Ming</span>：这是一个很好的问题。服用二甲双胍通常建议随餐服用以减少胃肠道反应。如果是进行16:8断食（跳过早餐），建议将早上的药量移至第一顿正餐（午餐）时服用。但具体调整方案，请务必咨询您的主治医生。
              </div>
              <div className="flex items-center gap-6 mt-3">
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">thumb_up</span>
                  <span className="text-xs font-medium">89</span>
                </button>
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
                  <span className="text-xs font-medium">回复</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Input Area */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#101922] border-t border-gray-100 dark:border-gray-800 p-3 px-4 z-40 pb-6 transition-colors shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
        <div className="flex items-end gap-3 max-w-md mx-auto">
          <button className="text-gray-400 hover:text-primary p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined text-[24px]">add_circle</span>
          </button>
          <div className="relative flex-1 bg-gray-100 dark:bg-gray-800 rounded-2xl transition-colors">
            <textarea 
              className="w-full bg-transparent py-2.5 px-4 text-sm focus:outline-none focus:ring-0 text-[#111418] dark:text-white border-none resize-none overflow-hidden" 
              placeholder="加入讨论..." 
              rows={1}
              style={{ minHeight: '40px' }}
            ></textarea>
          </div>
          <button className="flex items-center justify-center w-10 h-10 bg-primary rounded-full text-white shadow-md active:scale-95 transition-transform hover:bg-primary/90 shrink-0">
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
