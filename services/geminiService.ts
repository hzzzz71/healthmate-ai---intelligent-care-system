
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // 修复：前端使用 import.meta.env 而不是 process.env
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.API_KEY || '';

    if (!apiKey) {
      console.warn('⚠️ Gemini API Key 未配置，请在 .env.local 中设置 VITE_GEMINI_API_KEY');
    }

    this.ai = new GoogleGenAI({ apiKey });
  }

  async analyzeSymptoms(symptoms: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-1.5-pro',
        contents: `You are an AI medical assistant. Analyze these symptoms in Chinese: "${symptoms}". 
        
Provide:
1. Recommended medical department (in Chinese)
2. Urgency level (低/中/高)
3. Brief explanation (in Chinese)
4. 2-3 recommended experts with realistic Chinese names

Respond in JSON format.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              department: { type: Type.STRING, description: "推荐科室，如：心内科、消化科" },
              urgency: { type: Type.STRING, description: '紧急程度: 低、中、高' },
              explanation: { type: Type.STRING, description: "症状分析说明" },
              recommendedExperts: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: "医生姓名" },
                    title: { type: Type.STRING, description: "职称，如：主任医师、副主任医师" },
                    matchPercentage: { type: Type.NUMBER, description: "匹配度百分比，如：95" }
                  }
                }
              }
            },
            required: ["department", "urgency", "explanation"]
          }
        }
      });

      return JSON.parse(response.text);
    } catch (error: any) {
      console.error('❌ Gemini API 调用失败:', error.message);
      throw new Error('AI分析失败: ' + error.message);
    }
  }

  async chat(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
    try {
      const chat = this.ai.chats.create({
        model: 'gemini-1.5-pro',
        config: {
          systemInstruction: "你是一个专业的健康助手。用中文回答问题，提供医学建议，但始终提醒用户你是AI助手，正式诊断需要咨询真正的医生。"
        }
      });

      const result = await chat.sendMessage({ message });
      return result.text;
    } catch (error: any) {
      console.error('❌ Gemini 聊天失败:', error.message);
      throw new Error('聊天失败: ' + error.message);
    }
  }

  async generateMedicalImage(prompt: string, size: "1K" | "2K" | "4K" = "1K") {
    try {
      // 注意：Gemini 图片生成功能可能需要特定权限
      const response = await this.ai.models.generateContent({
        model: 'gemini-1.5-pro',
        contents: {
          parts: [{ text: `High quality medical illustration: ${prompt}` }]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: size
          }
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
      return null;
    } catch (error: any) {
      console.error('❌ 图片生成失败:', error.message);
      // 图片生成失败不影响主要功能
      return null;
    }
  }
}

export const gemini = new GeminiService();
