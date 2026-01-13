
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostComment: React.FC = () => {
  const navigate = useNavigate();
  const [comment, setComment] = useState('');

  const handleSend = () => {
    if (comment.trim()) {
      alert('评论已发送');
      navigate(-1);
    }
  };

  return (
    <div className="bg-white dark:bg-background-dark font-display text-[#111418] dark:text-white antialiased overflow-hidden h-[100dvh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#101922] shrink-0">
        <button 
          onClick={() => navigate(-1)}
          className="text-[#617589] dark:text-gray-400 text-base font-medium active:opacity-70"
        >
          取消
        </button>
        <h1 className="text-base font-bold text-[#111418] dark:text-white">发表评论</h1>
        <button 
          onClick={handleSend}
          className="bg-primary hover:bg-primary/90 text-white text-sm font-bold px-4 py-1.5 rounded-full transition-colors active:scale-95 shadow-sm shadow-blue-200 dark:shadow-none"
        >
          发送
        </button>
      </div>

      {/* Reply Context */}
      <div className="flex items-start gap-3 p-4 bg-[#f6f7f8]/50 dark:bg-[#1A2633]/30 border-b border-gray-100 dark:border-gray-800 shrink-0">
        <div className="w-1 bg-gray-300 dark:bg-gray-600 self-stretch rounded-full"></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-medium text-[#617589] dark:text-gray-400">回复</p>
            <p className="text-xs font-bold text-[#111418] dark:text-white">Sarah J.</p>
          </div>
          <p className="text-sm text-[#617589] dark:text-gray-400 line-clamp-1 truncate">
            有人在换新药方案后感到疲劳吗？尽管指标正常，我最近感觉异常疲惫...
          </p>
        </div>
        <div 
          className="bg-center bg-no-repeat bg-cover rounded-md w-10 h-10 shrink-0 opacity-80" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBTSEvI_PwJswCS90TB159alYAIsPXhjjYKYKCHyozhbdtqakOZ2A5U_Vns1Le9RYGEF2X23eRiReLUtiAgXu1QKlBdaxe3HD-myK7_ZUNS68ibvLtS8zOEHdJerOtho9p1QAKeEQ9WpIjoOucFHL2Fa2DzgclarLKz-QUJuSuartc3M8EcJevlDZ2SmkgENNGtgv0ysmfOalniC5PnBB9FZZ3KAjYDtNcxs0mMvx0REQ1wWhFt-ovLvCl_mJVbl3lRwuy_MudaAimp")' }}
        ></div>
      </div>

      {/* Textarea Area */}
      <div className="flex-1 w-full relative overflow-hidden flex flex-col">
        <textarea 
          autoFocus 
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full h-full p-4 text-base leading-relaxed bg-transparent border-none focus:ring-0 placeholder-gray-400 dark:placeholder-gray-600 resize-none caret-[#137fec] text-[#111418] dark:text-white" 
          placeholder="写下您的评论...&#10;分享您的经验或建议能够帮助社区成员。"
        ></textarea>
      </div>

      {/* Toolbar Area */}
      <div className="w-full bg-white dark:bg-[#101922] border-t border-gray-100 dark:border-gray-800 pb-1 shrink-0">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-5">
            <button className="text-[#617589] dark:text-gray-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[24px]">image</span>
            </button>
            <button className="text-[#617589] dark:text-gray-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[24px]">sentiment_satisfied</span>
            </button>
            <button className="text-[#617589] dark:text-gray-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[24px]">alternate_email</span>
            </button>
            <button className="text-[#617589] dark:text-gray-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[24px]">tag</span>
            </button>
          </div>
          <div className="text-xs font-medium text-[#617589] dark:text-gray-400">
            {comment.length}/500
          </div>
        </div>
      </div>

      {/* Simulated Native Keyboard */}
      <div className="w-full bg-[#d1d5db] dark:bg-[#1c1c1e] pt-2 pb-6 px-1 flex flex-col gap-2 shrink-0 select-none">
        <div className="flex justify-center gap-4 mb-1">
          <div className="bg-white/50 dark:bg-white/10 px-4 py-2 rounded text-sm text-[#111418] dark:text-white">我也</div>
          <div className="bg-white/50 dark:bg-white/10 px-4 py-2 rounded text-sm text-[#111418] dark:text-white">是</div>
          <div className="bg-white/50 dark:bg-white/10 px-4 py-2 rounded text-sm text-[#111418] dark:text-white">确实</div>
        </div>
        
        {/* Row 1 */}
        <div className="flex justify-center gap-1.5 px-1">
          {['q','w','e','r','t','y','u','i','o','p'].map(k => (
            <div key={k} className="h-[42px] flex-1 bg-white dark:bg-[#4a4a4a] rounded-[5px] shadow-[0_1px_0_rgba(0,0,0,0.3)] flex items-center justify-center text-xl font-normal dark:text-white">{k}</div>
          ))}
        </div>
        
        {/* Row 2 */}
        <div className="flex justify-center gap-1.5 px-5">
          {['a','s','d','f','g','h','j','k','l'].map(k => (
            <div key={k} className="h-[42px] flex-1 bg-white dark:bg-[#4a4a4a] rounded-[5px] shadow-[0_1px_0_rgba(0,0,0,0.3)] flex items-center justify-center text-xl font-normal dark:text-white">{k}</div>
          ))}
        </div>
        
        {/* Row 3 */}
        <div className="flex justify-center gap-3 px-1">
          <div className="h-[42px] w-[42px] bg-[#aeb3be] dark:bg-[#5f5f5f] rounded-[5px] shadow-[0_1px_0_rgba(0,0,0,0.3)] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] dark:text-white">arrow_upward</span>
          </div>
          <div className="flex flex-1 gap-1.5">
            {['z','x','c','v','b','n','m'].map(k => (
              <div key={k} className="h-[42px] flex-1 bg-white dark:bg-[#4a4a4a] rounded-[5px] shadow-[0_1px_0_rgba(0,0,0,0.3)] flex items-center justify-center text-xl font-normal dark:text-white">{k}</div>
            ))}
          </div>
          <div className="h-[42px] w-[42px] bg-[#aeb3be] dark:bg-[#5f5f5f] rounded-[5px] shadow-[0_1px_0_rgba(0,0,0,0.3)] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] dark:text-white text-base">backspace</span>
          </div>
        </div>
        
        {/* Row 4 */}
        <div className="flex justify-center gap-1.5 px-1 mt-1">
          <div className="h-[42px] w-[25%] bg-[#aeb3be] dark:bg-[#5f5f5f] rounded-[5px] shadow-[0_1px_0_rgba(0,0,0,0.3)] flex items-center justify-center text-sm font-medium dark:text-white">123</div>
          <div className="h-[42px] flex-1 bg-white dark:bg-[#4a4a4a] rounded-[5px] shadow-[0_1px_0_rgba(0,0,0,0.3)] flex items-center justify-center text-sm font-normal text-gray-500 dark:text-gray-300">空格</div>
          <div onClick={handleSend} className="h-[42px] w-[25%] bg-[#aeb3be] dark:bg-[#5f5f5f] rounded-[5px] shadow-[0_1px_0_rgba(0,0,0,0.3)] flex items-center justify-center text-sm font-medium dark:text-white cursor-pointer">Go</div>
        </div>
      </div>
    </div>
  );
};

export default PostComment;
