import React, { useState } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', content: string}[]>([
    { role: 'bot', content: "Jambo! I'm your Savanna AI travel guide. I have access to real-time wildlife migration data and private reserve availability. How can I assist your exploration today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "You are Savanna AI, an elite safari concierge. You provide exclusive travel advice, wildlife expertise, and luxury itinerary planning. Your tone is sophisticated, knowledgeable, and highly professional. Use markdown for structure.",
        },
      });

      const response = await chat.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'bot', content: response.text || "I apologize, I encountered a brief interruption in our satellite link." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'bot', content: "Satellite link interrupted. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] bg-brand-surface border border-white/5 rounded-[3rem] overflow-hidden">
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-none mb-1">Savanna AI</h2>
            <p className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Satellite Link Active
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 transition-all">
            Clear Session
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-4 max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center border border-white/10 ${msg.role === 'user' ? 'bg-white text-black' : 'bg-brand-surface'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-brand-accent" />}
              </div>
              <div className={`p-6 rounded-[2rem] text-sm leading-relaxed ${msg.role === 'user' ? 'bg-white text-black rounded-tr-none' : 'bg-white/5 border border-white/5 rounded-tl-none'}`}>
                <div className="markdown-body prose prose-invert prose-sm max-w-none">
                  <Markdown>{msg.content}</Markdown>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-surface border border-white/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-brand-accent" />
              </div>
              <div className="p-6 bg-white/5 border border-white/5 rounded-[2rem] rounded-tl-none">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 bg-white/[0.02] border-t border-white/5">
        <div className="relative max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Inquire about private reserves or migration patterns..."
            className="w-full bg-brand-bg border border-white/10 rounded-full py-5 pl-8 pr-16 focus:outline-none focus:border-white/30 transition-all text-sm"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white text-black rounded-full hover:bg-brand-accent hover:text-white transition-all disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
