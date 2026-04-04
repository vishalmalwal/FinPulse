import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Menu, Bell, Search } from 'lucide-react';
import { Sidebar } from './components/Layout/Sidebar';
import { DashboardOverview } from './components/Dashboard/DashboardOverview';
import { Charts } from './components/Dashboard/Charts';
import { TransactionDataGrid } from './components/Transactions/TransactionDataGrid';
import { InsightsWidget } from './components/Insights/InsightsWidget';
import { AddTransactionModal } from './components/Transactions/AddTransactionModal';
import { useFinanceStore } from './store/useFinanceStore';
import { cn } from './lib/utils';

export default function App() {
  const { isDarkMode, userRole, searchTerm, setSearchTerm } = useFinanceStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleOpenAddModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 bg-mesh",
      isDarkMode ? "text-slate-100" : "text-slate-900"
    )}>
      {/* Floating Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="relative z-10 min-h-screen flex flex-col pb-32">
        {/* Top Navigation Bar - Glassmorphic */}
        <header className={cn(
          "sticky top-0 z-40 w-full backdrop-blur-xl transition-all duration-300",
          isDarkMode ? "bg-slate-950/40 border-b border-slate-800/50" : "bg-white/40 border-b border-slate-200/50"
        )}>
          <div className="px-6 lg:px-12 h-20 flex items-center justify-between max-w-[1600px] mx-auto">
            <div className="flex items-center gap-4">
              <div className="lg:hidden">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <span className="text-white font-bold text-xl italic">F</span>
                </div>
              </div>
              <div className="hidden lg:block">
                <h2 className={cn(
                  "text-xl font-black tracking-tighter",
                  isDarkMode ? "text-white" : "text-slate-900"
                )}>FINPULSE</h2>
                <p className={cn(
                  "text-[10px] font-bold uppercase tracking-widest",
                  isDarkMode ? "text-indigo-400" : "text-indigo-600"
                )}>Wealth Manager</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center relative group">
                <Search className="absolute left-3 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Search transactions..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn(
                    "pl-10 pr-4 py-2.5 rounded-2xl text-xs border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-64",
                    isDarkMode ? "bg-slate-900/50 border-slate-800 text-white" : "bg-slate-50/50 border-slate-200 text-slate-900"
                  )}
                />
              </div>
              <div className="flex items-center gap-4 relative">
                <button 
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors relative group"
                >
                  <Bell size={20} className="text-slate-500 group-hover:text-indigo-500 transition-colors" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950" />
                </button>

                {/* Notification Panel */}
                <AnimatePresence>
                  {isNotificationOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsNotificationOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={cn(
                          "absolute top-full right-0 mt-4 w-72 p-6 rounded-3xl shadow-2xl z-50 border",
                          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                        )}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-black uppercase tracking-widest">Notifications</h3>
                          <span className="text-[10px] font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full">0 New</span>
                        </div>
                        <div className="py-8 text-center space-y-2">
                          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                            <Bell size={20} />
                          </div>
                          <p className="text-sm font-bold text-slate-500">No new notifications</p>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1" />
                <div className="flex items-center gap-3 pl-2">
                  <div className="text-right hidden sm:block">
                    <p className={cn(
                      "text-xs font-black uppercase tracking-tight",
                      isDarkMode ? "text-white" : "text-slate-900"
                    )}>Vishal Malwal</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{userRole}</p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 ring-2 ring-white dark:ring-slate-800">
                    VM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-12 max-w-[1600px] mx-auto w-full space-y-12">
          {/* Welcome Section - Hero Style */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
          >
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                Live Portfolio Status
              </motion.div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9]">
                Welcome!, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                  Vishal Malwal! 🙏
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-slate-900 dark:text-slate-400 font-medium max-w-2xl">
                Your financial pulse is looking <span className="text-emerald-700 dark:text-emerald-400 font-black underline decoration-emerald-500/30 underline-offset-4">healthy</span> today. You've saved 12% more than last month.
              </p>
            </div>
            {userRole === 'Admin' && (
              <motion.button 
                whileHover={{ scale: 1.05, translateY: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenAddModal}
                className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-5 rounded-[2rem] font-black text-lg transition-all shadow-2xl shadow-indigo-500/40 group"
              >
                <Plus size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                New Transaction
              </motion.button>
            )}
          </motion.div>

          {/* Dashboard Overview Cards - Floating Grid */}
          <DashboardOverview />

          {/* Charts & Insights Bento Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-8">
              <Charts />
            </div>
            <div className="xl:col-span-4">
              <InsightsWidget />
            </div>
          </div>

          {/* Transactions Section */}
          <TransactionDataGrid 
            setIsModalOpen={setIsModalOpen} 
            onEditTransaction={handleOpenEditModal}
          />
        </div>

        {/* Footer */}
        <footer className="mt-auto py-12 px-12 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center">
              <span className="text-slate-500 font-bold">F</span>
            </div>
            <p>© FinPulse India. Premium Wealth Management.</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
          </div>
        </footer>
      </main>

      {/* Add/Edit Transaction Modal */}
      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editData={editingTransaction}
      />
    </div>
  );
}