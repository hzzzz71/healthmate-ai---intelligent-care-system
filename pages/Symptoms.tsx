
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gemini } from '../services/geminiService';

const Symptoms: React.FC = () => {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [generatedImg, setGeneratedImg] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!symptoms) return;
    setLoading(true);
    try {
      const data = await gemini.analyzeSymptoms(symptoms);
      setResult(data);
      // Generate an illustrative image based on the diagnosis
      const img = await gemini.generateMedicalImage(`${data.department} related medical concept for ${symptoms}`, "1K");
      setGeneratedImg(img);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 flex items-center bg-white p-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">智能导诊</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">描述您的症状</h3>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="例如：我最近感到胸口闷痛，伴有轻微头晕..."
            className="w-full h-32 rounded-2xl border-gray-200 bg-gray-50 p-4 text-base focus:ring-primary focus:border-primary"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full h-14 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          {loading ? (
            <span className="animate-spin material-symbols-outlined">sync</span>
          ) : (
            <span className="material-symbols-outlined">psychology</span>
          )}
          {loading ? 'AI 正在分析中...' : '开始智能分析'}
        </button>

        {result && (
          <div className="mt-8 space-y-6 pb-12">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 p-6 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">cardiology</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-primary uppercase mb-1">推荐科室</p>
                  <h4 className="text-xl font-bold">{result.department}</h4>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {result.explanation}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 text-xs font-bold border border-orange-100">
                <span className="material-symbols-outlined text-sm">warning</span>
                优先级: {result.urgency}
              </div>
            </div>

            {generatedImg && (
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <img src={generatedImg} alt="Medical Illustration" className="w-full aspect-video object-cover" />
                <p className="p-3 text-[10px] text-gray-400 text-center bg-gray-50 italic">AI 生成的医疗示意图</p>
              </div>
            )}

            <div>
              <h3 className="text-lg font-bold mb-4">推荐专家</h3>
              <div className="space-y-4">
                {result.recommendedExperts?.map((expert: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:border-primary transition-colors cursor-pointer">
                    <img className="size-14 rounded-full object-cover" src={`https://picsum.photos/100/100?random=${idx + 10}`} alt={expert.name} />
                    <div className="flex-1">
                      <h4 className="font-bold">{expert.name}</h4>
                      <p className="text-xs text-gray-500">{expert.title}</p>
                      <div className="mt-2 flex gap-2">
                        <span className="text-[10px] bg-blue-50 text-primary px-2 py-0.5 rounded-full font-bold">
                          {expert.matchPercentage}% 匹配
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Symptoms;
