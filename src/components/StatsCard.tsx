import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface StatsCardProps {
  label: string;
  value: string;
  unit?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color: string;
  delay?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  label, value, unit, icon: Icon, trend, color, delay = 0 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass p-6 rounded-3xl relative overflow-hidden group"
    >
      <div className={cn(
        "absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150",
        color
      )} />
      
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-3 rounded-2xl", color.replace('bg-', 'bg-').replace('10', '20'))}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-bold px-2 py-1 rounded-lg",
            trend.isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
          )}>
            {trend.isPositive ? '+' : '-'}{trend.value}
          </span>
        )}
      </div>
      
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
        <div className="flex items-baseline gap-1">
          <h3 className="text-3xl font-bold font-display">{value}</h3>
          {unit && <span className="text-slate-500 text-sm font-medium">{unit}</span>}
        </div>
      </div>
    </motion.div>
  );
};

// Helper to use cn in this file since I didn't import it
import { cn } from '../lib/utils';
