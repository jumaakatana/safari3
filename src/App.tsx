/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { SafariHome } from './components/SafariHome';
import { AIChat } from './components/AIChat';
import { 
  Search, 
  Bell, 
  MapPin,
  Calendar,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');

  const renderContent = () => {
    switch (activeTab) {
      case 'explore':
        return <SafariHome searchQuery={searchQuery} />;
      case 'ai-guide':
        return <AIChat />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6">
              <MapPin className="w-10 h-10 text-slate-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
            <p className="text-slate-400 max-w-xs">We're curating the best wildlife experiences for this section. Stay tuned!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-20 lg:ml-72 p-6 lg:p-12 transition-all duration-500">
        <div className="max-w-[1600px] mx-auto space-y-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-12"
            >
              {/* Top Bar - Minimalist */}
              <header className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Live: Serengeti</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="relative hidden md:block group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-white transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Search expeditions..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-white/5 border border-white/5 rounded-full py-3 pl-12 pr-6 text-xs focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all w-80"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-3 bg-white/5 border border-white/5 rounded-full text-slate-400 hover:text-white transition-all relative">
                      <Bell className="w-4 h-4" />
                      <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-brand-accent rounded-full" />
                    </button>
                    <button className="hidden sm:flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-brand-accent hover:text-white transition-all">
                      <Calendar className="w-3.5 h-3.5" />
                      Plan Trip
                    </button>
                  </div>
                </div>
              </header>

              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
