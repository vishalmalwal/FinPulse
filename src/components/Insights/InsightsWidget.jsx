import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { cn, formatCurrency } from '../../lib/utils';

export const InsightsWidget = () => {
  const { transactions, isDarkMode } = useFinanceStore();

  const generateInsights = () => {
    const insights = [];
    
    // 1. Highest spending category
    const categorySpending = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
    
    const sortedCategories = Object.entries(categorySpending).sort((a, b) => b[1] - a[1]);
    
    if (sortedCategories.length > 0) {
      insights.push({
        icon: <TrendingUp className="text-rose-500" size={24} />,
        title: 'Spending Alert',
        text: `Highest spending in ${sortedCategories[0][0]} (${formatCurrency(sortedCategories[0][1])}).`,
        type: 'warning',
        color: 'rose'
      });
    }

    // 2. Savings rate
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

    if (savingsRate > 20) {
      insights.push({
        icon: <Sparkles className="text-emerald-500" size={24} />,
        title: 'Wealth Growth',
        text: `Savings rate is ${savingsRate.toFixed(1)}%, exceeding the 20% benchmark.`,
        type: 'success',
        color: 'emerald'
      });
    } else {
      insights.push({
        icon: <AlertCircle className="text-amber-500" size={24} />,
        title: 'Savings Tip',
        text: `Savings rate at ${savingsRate.toFixed(1)}%. Try to cut non-essential costs.`,
        type: 'info',
        color: 'amber'
      });
    }

    // 3. Subscription check
    const subscriptionCount = transactions.filter(t => t.category === 'Subscriptions').length;
    if (subscriptionCount > 3) {
      insights.push({
        icon: <Lightbulb className="text-indigo-500" size={24} />,
        title: 'Recurring Costs',
        text: `You have ${subscriptionCount} active subscriptions. Review for unused services.`,
        type: 'tip',
        color: 'indigo'
      });
    }

    return insights;
  };

  const insights = generateInsights();

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Sparkles className="text-indigo-600" size={20} />
          <h2 className={cn(
            "text-xl font-black tracking-tight uppercase",
            isDarkMode ? "text-white" : "text-slate-900"
          )}>Smart Insights</h2>
        </div>
        <p className={cn(
          "text-[10px] font-bold uppercase tracking-widest",
          isDarkMode ? "text-slate-400" : "text-slate-600"
        )}>AI-Powered Wealth Analysis</p>
      </div>

      <div className="flex flex-col gap-6">
        {insights.map((insight, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ x: -10 }}
            className={cn(
              "p-6 rounded-[2rem] border flex gap-5 items-start transition-all duration-500 group",
              isDarkMode 
                ? "bg-slate-900/50 border-slate-800 shadow-2xl shadow-indigo-500/5" 
                : "bg-white border-slate-200 shadow-xl shadow-slate-200/50"
            )}
          >
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110",
              isDarkMode ? "bg-slate-800" : "bg-slate-50"
            )}>
              {insight.icon}
            </div>
            <div className="space-y-1">
              <p className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                insight.color === 'rose' ? "text-rose-500" : 
                insight.color === 'emerald' ? "text-emerald-500" : 
                insight.color === 'amber' ? "text-amber-500" : "text-indigo-500"
              )}>
                {insight.title}
              </p>
              <p className={cn(
                "text-sm font-black tracking-tight leading-snug",
                isDarkMode ? "text-slate-200" : "text-slate-900"
              )}>
                {insight.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};