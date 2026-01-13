
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ArticleDetail: React.FC = () => {
  const navigate = useNavigate();
  const [isFollowed, setIsFollowed] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Hex colors from the provided HTML specification
  // primary: #137fec
  // text-main: #111418
  // text-secondary: #637588

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-20 bg-white dark:bg-[#101922] font-display text-[#111418] dark:text-white transition-colors duration-200 antialiased">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 flex items-center bg-white/95 dark:bg-[#101922]/95 backdrop-blur-md px-4 py-3 justify-between border-b border-gray-100 dark:border-gray-800">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center p-2 -ml-2 rounded-full text-[#111418] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
        </button>
        <h1 className="text-base font-bold text-[#111418] dark:text-white truncate max-w-[200px]">文章详情</h1>
        <button className="flex items-center justify-center p-2 -mr-2 rounded-full text-[#111418] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-[24px]">more_horiz</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Hero Image */}
        <div className="w-full h-56 sm:h-64 md:h-80 bg-gray-100 dark:bg-gray-800 relative">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAuRDlf8ZAxG2YNnE4xjLOkFZ-RaP44k3BdZB1ene1BWt_kltd4BeTSzlvfxhLTRHR4IO_hZhlZrXYoNHxDeKTOaO3KUkJwXTCHHNY1LSnidNIKh8pNL74S4aymW05RY3Fu1wjw5JPebPscGyJUWN5zluHH1bjLsbqxFs3UUCfzykth68H16wGw7vF-81Dvc-JzG0v6cYv63llsRuSEl4QftvcOTjCKglkFa5-7Vkp-sVyr-ulbWmFfoQS3-t2Maofibg0eQfnYUeLe")' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
        </div>

        <div className="px-5 py-6 max-w-3xl mx-auto">
          {/* Metadata Tags */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 rounded bg-[#137fec]/10 dark:bg-[#137fec]/20 text-[#137fec] text-xs font-bold tracking-wide">临床洞察</span>
            <span className="text-[#637588] dark:text-gray-400 text-xs">5分钟阅读</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-[#111418] dark:text-white mb-6">
            冬季血压管理新指南：如何应对气温骤降带来的挑战
          </h2>

          {/* Author Info */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full bg-cover bg-center border border-gray-100 dark:border-gray-700 shadow-sm" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhHQbVomtvIEgvYNHmcfEzleK69_7z2QCyDjKlUrY4p4z7AyLes3YtGX_Ad-rxp-7UePxsdJGq8hj6N3153JA1BY591ydBS9UCwBENVVbnubpXkdXh5a4mai1rVdqaCyH1swSemY40bwV2hEECwRZsfyTR1dL-tYX2wax0rbBpTp8aB99tfDMXl8cFOhVHypzvT08HR5rlOiuHv5ISwdQuN2knh1cv5ytRfdoI8D3G-TIJnIFkhsVLk3RGnpEcDEGdIAnqzFoE4NgD")' }}
              ></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[#111418] dark:text-white">Smith 医生</span>
                  <span className="material-symbols-outlined text-[#137fec] text-[14px] fill-current">verified</span>
                </div>
                <span className="text-xs text-[#637588] dark:text-gray-400">心脏科专家 • 2023年11月15日</span>
              </div>
            </div>
            <button 
              onClick={() => setIsFollowed(!isFollowed)}
              className={`text-sm font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
                isFollowed 
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-500' 
                : 'text-[#137fec] hover:bg-[#137fec]/10 dark:hover:bg-[#137fec]/20 border border-[#137fec]/10'
              }`}
            >
              {isFollowed ? '已关注' : '+ 关注'}
            </button>
          </div>

          {/* Article Body */}
          <div className="space-y-6">
            <p className="text-[17px] leading-8 text-[#111418] dark:text-gray-300 font-normal">
              随着冬季的到来，许多高血压患者会发现自己的血压读数有所上升。这并非偶然现象，而是一种被称为“季节性血压波动”的生理反应。本指南基于最新的临床研究，为您提供全面且可执行的冬季血压管理建议。
            </p>

            {/* Why section */}
            <div className="bg-gray-50 dark:bg-[#1A2633] rounded-xl p-5 border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="flex items-center gap-2 text-lg font-bold text-[#111418] dark:text-white mb-3">
                <span className="material-symbols-outlined text-[#137fec]">thermometer</span>
                为什么冬季血压会升高？
              </h3>
              <p className="text-sm text-[#637588] dark:text-gray-400 leading-6">
                寒冷刺激会激活交感神经系统，导致外周血管收缩（Vasoconstriction），增加血液流动的阻力。此外，冬季人体出汗减少，钠盐排泄降低，加之户外运动量减少和饮食口味偏重，这些因素共同作用导致了血压的季节性升高。
              </p>
            </div>

            <h3 className="text-xl font-bold text-[#111418] dark:text-white mt-8 mb-4">关键管理策略</h3>
            <p className="text-base leading-7 text-[#637588] dark:text-gray-300 mb-4">
              为了在寒冷季节保持心血管健康，专家建议采取以下综合措施：
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#137fec]/10 dark:bg-[#137fec]/20 text-[#137fec] text-sm font-bold flex items-center justify-center mt-0.5">1</span>
                <div>
                  <strong className="text-[#111418] dark:text-white block mb-1 font-bold">加强保暖措施</strong>
                  <span className="text-[#637588] dark:text-gray-400 text-sm leading-6">外出时务必佩戴帽子和围巾。头部和颈部的血管丰富且对寒冷敏感，保护好这些部位能有效减少血管收缩反应。</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#137fec]/10 dark:bg-[#137fec]/20 text-[#137fec] text-sm font-bold flex items-center justify-center mt-0.5">2</span>
                <div>
                  <strong className="text-[#111418] dark:text-white block mb-1 font-bold">调整监测频率</strong>
                  <span className="text-[#637588] dark:text-gray-400 text-sm leading-6">建议将血压监测频率调整为每天两次（早晨起床后及晚上睡前），并记录数据以便就医时供医生参考。</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#137fec]/10 dark:bg-[#137fec]/20 text-[#137fec] text-sm font-bold flex items-center justify-center mt-0.5">3</span>
                <div>
                  <strong className="text-[#111418] dark:text-white block mb-1 font-bold">优化室内环境</strong>
                  <span className="text-[#637588] dark:text-gray-400 text-sm leading-6">保持室内温度在 20°C - 24°C 之间。清晨起床时动作要缓慢，给身体一个适应过程，避免因体位急剧变化导致的血压波动。</span>
                </div>
              </li>
            </ul>

            <h3 className="text-xl font-bold text-[#111418] dark:text-white mt-8 mb-4">饮食与用药提醒</h3>
            <p className="text-[17px] leading-8 text-[#111418] dark:text-gray-300 font-normal">
              冬季饮食往往偏咸，建议刻意控制盐分摄入，每日食盐量不超过 5 克。增加富含钾的食物摄入，如香蕉、菠菜、红薯等，有助于钠的排出。关于用药，<strong className="font-bold">切勿自行增减药量</strong>。如果发现血压持续波动，应及时咨询医生，调整降压方案。
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 mb-6 pt-6 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-[#637588] dark:text-gray-500 italic">
              免责声明：本文仅供医学科普，不作为疾病诊疗依据。如有不适，请及时前往医院就诊。
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Toolbar */}
      <div className="fixed bottom-0 z-40 w-full bg-white dark:bg-[#101922] border-t border-gray-100 dark:border-gray-800 px-6 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-colors">
        <div className="flex items-center justify-around max-w-md mx-auto pb-safe">
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`group flex flex-col items-center gap-1 min-w-[64px] transition-colors ${isBookmarked ? 'text-[#137fec]' : 'text-[#637588] dark:text-gray-400'}`}
          >
            <span className={`material-symbols-outlined text-[26px] ${isBookmarked ? 'material-symbols-filled' : ''}`}>bookmark</span>
            <span className="text-[10px] font-bold uppercase tracking-tight">收藏</span>
          </button>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`group flex flex-col items-center gap-1 min-w-[64px] transition-colors ${isLiked ? 'text-[#137fec]' : 'text-[#637588] dark:text-gray-400'}`}
          >
            <span className={`material-symbols-outlined text-[26px] ${isLiked ? 'material-symbols-filled' : ''}`}>thumb_up</span>
            <span className="text-[10px] font-bold uppercase tracking-tight">点赞</span>
          </button>
          <button className="group flex flex-col items-center gap-1 min-w-[64px] text-[#637588] dark:text-gray-400 hover:text-[#137fec] transition-colors">
            <span className="material-symbols-outlined text-[26px]">share</span>
            <span className="text-[10px] font-bold uppercase tracking-tight">分享</span>
          </button>
        </div>
      </div>

      <style>{`
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 16px);
        }
      `}</style>
    </div>
  );
};

export default ArticleDetail;
