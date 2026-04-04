import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Filter, ArrowUpDown, Trash2, Edit3, Plus, 
  ChevronLeft, ChevronRight, FileX2
} from 'lucide-react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { cn, formatCurrency, formatDate } from '../../lib/utils';

export const TransactionDataGrid = ({ setIsModalOpen, onEditTransaction }) => {
  const { transactions, userRole, isDarkMode, deleteTransaction, searchTerm, setSearchTerm } = useFinanceStore();
  const [filterType, setFilterType] = useState('all');
  const [sortConfig, setSortConfig] = useState(null);

  const handleSort = (key) => {
    let direction = 'desc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedTransactions = useMemo(() => {
    let result = transactions.filter(t => {
      const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || t.type === filterType;
      return matchesSearch && matchesType;
    });

    if (sortConfig) {
      result.sort((a, b) => {
        if (sortConfig.key === 'date') {
          return sortConfig.direction === 'asc' 
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime();
        } else {
          return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
        }
      });
    }

    return result;
  }, [transactions, searchTerm, filterType, sortConfig]);

  return (
    <section className="mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className={cn(
            "text-3xl font-black tracking-tighter",
            isDarkMode ? "text-white" : "text-slate-900"
          )}>Recent Transactions</h2>
          <p className={cn(
            "text-[10px] font-bold uppercase tracking-widest",
            isDarkMode ? "text-slate-500" : "text-slate-600"
          )}>Your financial history at a glance</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                "pl-10 pr-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full sm:w-64 text-sm font-medium",
                isDarkMode ? "bg-slate-900/50 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
              )}
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={cn(
                "pl-4 pr-10 py-3 rounded-2xl border appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-bold uppercase tracking-widest",
                isDarkMode ? "bg-slate-900/50 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
              )}
            >
              <option value="all">All Transactions</option>
              <option value="income">Income Only</option>
              <option value="expense">Expenses Only</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      <div className={cn(
        "rounded-[2.5rem] border overflow-hidden transition-all duration-500",
        isDarkMode 
          ? "bg-slate-900/50 border-slate-800 shadow-2xl shadow-indigo-500/5" 
          : "bg-white border-slate-200 shadow-xl shadow-slate-200/50"
      )}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={cn(
                "border-b transition-colors",
                isDarkMode ? "bg-slate-800/30 border-slate-800" : "bg-slate-50/50 border-slate-200"
              )}>
                <th className="px-8 py-5 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                  <button onClick={() => handleSort('date')} className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors group">
                    Date <ArrowUpDown size={14} className="group-hover:scale-110 transition-transform" />
                  </button>
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Description</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                  <button onClick={() => handleSort('amount')} className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors group">
                    Amount <ArrowUpDown size={14} className="group-hover:scale-110 transition-transform" />
                  </button>
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Type</th>
                {userRole === 'Admin' && <th className="px-8 py-5 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <AnimatePresence mode="popLayout">
                {filteredAndSortedTransactions.length > 0 ? (
                  filteredAndSortedTransactions.map((t, idx) => (
                    <motion.tr
                      key={t.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.03 }}
                      className={cn(
                        "group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-all duration-300",
                        isDarkMode ? "text-slate-300" : "text-slate-900"
                      )}
                    >
                      <td className="px-8 py-5 text-xs font-bold">{formatDate(t.date)}</td>
                      <td className="px-8 py-5 text-sm font-black tracking-tight">{t.description}</td>
                      <td className="px-8 py-5">
                        <span className={cn(
                          "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                          isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"
                        )}>
                          {t.category}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-base font-black tracking-tighter">
                        {formatCurrency(t.amount)}
                      </td>
                      <td className="px-8 py-5">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          t.type === 'income' 
                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400" 
                            : "bg-rose-500/20 text-rose-700 dark:text-rose-400"
                        )}>
                          {t.type === 'income' ? <Plus size={12} /> : <ChevronRight size={12} className="rotate-90" />}
                          {t.type}
                        </span>
                      </td>
                      {userRole === 'Admin' && (
                        <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button 
                              onClick={() => onEditTransaction(t)}
                              className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button 
                              onClick={() => deleteTransaction(t.id)}
                              className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 hover:bg-rose-600 hover:text-white transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      )}
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={userRole === 'Admin' ? 6 : 5} className="py-32 text-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-6"
                      >
                        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-slate-400 shadow-inner">
                          <FileX2 size={40} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xl font-black tracking-tight text-slate-900 dark:text-white">No records found</p>
                          <p className="text-sm font-bold text-slate-500">Try adjusting your search parameters</p>
                        </div>
                        <button 
                          onClick={() => { setSearchTerm(''); setFilterType('all'); }}
                          className="px-6 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20"
                        >
                          Reset Filters
                        </button>
                      </motion.div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};