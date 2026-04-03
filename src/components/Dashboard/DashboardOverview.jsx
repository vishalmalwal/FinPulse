import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn, formatCurrency } from '../../lib/utils';
import { useFinanceStore } from '../../store/useFinanceStore';

const SummaryCard = ({ title, amount, type, percentageChange, index }) => {
  const { isDarkMode } = useFinanceStore();
  
  const icons = {
    balance: <Wallet size={28} />,
    income: <TrendingUp size={28} />,
    expense: <TrendingDown size={28} />,
  };

  const colors = {
    balance: "from-indigo-600 to-indigo-400 shadow-indigo-500/20",
    income: "from-emerald-600 to-emerald-400 shadow-emerald-500/20",
    expense: "from-rose-600 to-rose-400 shadow-rose-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={cn(
        "p-8 rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden group",
        isDarkMode 
          ? "bg-slate-900/50 border-slate-800 shadow-2xl shadow-indigo-500/5" 
          : "bg-white border-slate-200 shadow-xl shadow-slate-200/50"
      )}
    >
      <div className="flex justify-between items-start mb-8">
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br shadow-xl transition-transform duration-500 group-hover:rotate-12",
          colors[type]
        )}>
          {icons[type]}
        </div>
        <div className={cn(
          "flex items-center gap-1 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
          percentageChange >= 0 
            ? "text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10" 
            : "text-rose-700 bg-rose-100 dark:text-rose-400 dark:bg-rose-500/10"
        )}>
          {percentageChange >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(percentageChange)}%
        </div>
      </div>
      
      <div className="relative z-10 space-y-1">
        <p className="text-[10px] font-black text-slate-700 dark:text-slate-400 uppercase tracking-[0.2em]">{title}</p>
        <h3 className={cn(
          "text-4xl lg:text-5xl font-black tracking-tighter",
          isDarkMode ? "text-white" : "text-slate-900"
        )}>
          {formatCurrency(amount)}
        </h3>
        <p className="text-xs font-bold text-slate-600 dark:text-slate-500 mt-2">
          {type === 'balance' ? 'Total available wealth' : type === 'income' ? 'Total monthly earnings' : 'Total monthly spending'}
        </p>
      </div>

      {/* Decorative background element */}
      <div className={cn(
        "absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-3xl opacity-10 transition-all duration-500 group-hover:scale-150",
        type === 'balance' ? "bg-indigo-500" : type === 'income' ? "bg-emerald-500" : "bg-rose-500"
      )} />
    </motion.div>
  );
};

export const DashboardOverview = () => {
  const { transactions } = useFinanceStore();

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <SummaryCard 
        index={0}
        title="Total Balance" 
        amount={totalBalance} 
        type="balance" 
        percentageChange={12.5} 
      />
      <SummaryCard 
        index={1}
        title="Total Income" 
        amount={totalIncome} 
        type="income" 
        percentageChange={8.2} 
      />
      <SummaryCard 
        index={2}
        title="Total Expenses" 
        amount={totalExpenses} 
        type="expense" 
        percentageChange={-4.1} 
      />
    </div>
  );
};

