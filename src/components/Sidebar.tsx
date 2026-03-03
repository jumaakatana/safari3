import React from 'react';
import { Compass, Map, Calendar, MessageSquare, Settings, LogOut, Plane, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'explore', icon: Compass, label: 'Expeditions' },
    { id: 'destinations', icon: Map, label: 'Wilderness Map' },
    { id: 'bookings', icon: Calendar, label: 'Itineraries' },
    { id: 'ai-guide', icon: MessageSquare, label: 'Savanna AI' },
  ];

  return (
    <aside className="w-20 lg:w-72 h-screen bg-brand-bg border-r border-white/5 flex flex-col fixed left-0 top-0 z-50 transition-all duration-500">
      <div className="p-8 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shrink-0">
            <Plane className="w-5 h-5" />
          </div>
          <div className="hidden lg:block overflow-hidden">
            <h1 className="text-lg font-bold tracking-tighter leading-none">SAVANNA</h1>
            <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase">Private Reserve</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group relative",
              activeTab === item.id 
                ? "text-white" 
                : "text-slate-500 hover:text-slate-300"
            )}
          >
            {activeTab === item.id && (
              <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />
            )}
            <item.icon className={cn(
              "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
              activeTab === item.id ? "text-white" : "text-slate-600"
            )} />
            <span className="hidden lg:block font-medium text-sm tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 mt-auto">
        <div className="hidden lg:block bg-white/5 rounded-3xl p-5 mb-6 border border-white/5">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            <span className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">Elite Member</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            You have <span className="text-white font-bold">2,450</span> exploration points available.
          </p>
          <button className="w-full py-2 bg-white text-black text-[10px] font-bold rounded-xl hover:bg-slate-200 transition-colors uppercase tracking-widest">
            Redeem Rewards
          </button>
        </div>

        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" 
              alt="User" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden lg:block flex-1 min-w-0">
            <p className="text-sm font-bold truncate">James Wilson</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Platinum Tier</p>
          </div>
          <LogOut className="hidden lg:block w-4 h-4 text-slate-600 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>
    </aside>
  );
};
