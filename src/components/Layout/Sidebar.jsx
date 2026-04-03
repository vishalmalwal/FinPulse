import React from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  PieChart, 
  Settings, 
  LogOut, 
  User, 
  ShieldCheck,
  Sun,
  Moon,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { cn } from '../../lib/utils';

export const Sidebar = () => {
  const { userRole, setUserRole, isDarkMode, toggleDarkMode } = useFinanceStore();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', active: true },
    { icon: <ArrowLeftRight size={20} />, label: 'Transactions' },
    { icon: <PieChart size={20} />, label: 'Analytics' },
    { icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-fit px-4">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "flex items-center gap-2 p-2 rounded-[2.5rem] border backdrop-blur-2xl shadow-2xl transition-all duration-500",
          isDarkMode 
            ? "bg-slate-950/60 border-slate-800/50 shadow-indigo-500/10" 
            : "bg-white/60 border-slate-200/50 shadow-slate-200/50"
        )}
      >
        {/* Navigation Items */}
        <div className="flex items-center gap-1">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              className={cn(
                "relative group flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300",
                item.active 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40" 
                  : "text-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400"
              )}
            >
              {item.icon}
              <span className={cn(
                "hidden md:block overflow-hidden transition-all duration-300",
                item.active ? "w-auto opacity-100" : "w-0 opacity-0 group-hover:w-auto group-hover:opacity-100"
              )}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-800 mx-2" />

        {/* Role Toggle */}
        <div className={cn(
          "hidden sm:flex items-center p-1 rounded-full border transition-all",
          isDarkMode ? "bg-slate-900/50 border-slate-800" : "bg-slate-100/50 border-slate-200"
        )}>
          <button
            onClick={() => setUserRole('Viewer')}
            className={cn(
              "flex items-center gap-1 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all",
              userRole === 'Viewer' 
                ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm" 
                : "text-slate-600"
            )}
          >
            <User size={12} />
            Viewer
          </button>
          <button
            onClick={() => setUserRole('Admin')}
            className={cn(
              "flex items-center gap-1 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all",
              userRole === 'Admin' 
                ? "bg-white dark:bg-slate-800 text-indigo-600 shadow-sm" 
                : "text-slate-600"
            )}
          >
            <ShieldCheck size={12} />
            Admin
          </button>
        </div>

        <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-800 mx-2" />

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className={cn(
            "p-3 rounded-full transition-all duration-500",
            isDarkMode 
              ? "bg-slate-900 text-yellow-400 hover:bg-slate-800" 
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          )}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </motion.div>
    </div>
  );
};

