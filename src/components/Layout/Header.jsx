import React from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Sun, Moon, User, ShieldCheck, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export const Header = () => {
  const { userRole, setUserRole, isDarkMode, toggleDarkMode } = useFinanceStore();

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b backdrop-blur transition-colors duration-300",
      isDarkMode 
        ? "bg-slate-950/80 border-slate-800 text-slate-100" 
        : "bg-white/80 border-slate-200 text-slate-900"
    )}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">F</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight hidden sm:block">FinPulse</h1>
        </motion.div>

        <div className="flex items-center gap-4">
          {/* Role Toggle */}
          <div className={cn(
            "flex items-center p-1 rounded-full border transition-all",
            isDarkMode ? "bg-slate-900 border-slate-700" : "bg-slate-100 border-slate-200"
          )}>
            <button
              onClick={() => setUserRole('Viewer')}
              className={cn(
                "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all",
                userRole === 'Viewer' 
                  ? "bg-white text-indigo-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <User size={14} />
              Viewer
            </button>
            <button
              onClick={() => setUserRole('Admin')}
              className={cn(
                "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all",
                userRole === 'Admin' 
                  ? "bg-white text-indigo-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <ShieldCheck size={14} />
              Admin
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className={cn(
              "p-2 rounded-full transition-colors",
              isDarkMode ? "hover:bg-slate-800 text-yellow-400" : "hover:bg-slate-100 text-slate-600"
            )}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

          <button className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
            <LogOut size={18} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
