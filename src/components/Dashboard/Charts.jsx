import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { motion } from 'motion/react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { cn, formatCurrency } from '../../lib/utils';

export const Charts = () => {
  const { transactions, isDarkMode } = useFinanceStore();

  // Process data for Area Chart (Balance Trend)
  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString('default', { month: 'short' });
    if (!acc[month]) acc[month] = { month, income: 0, expense: 0 };
    if (t.type === 'income') acc[month].income += t.amount;
    else acc[month].expense += t.amount;
    return acc;
  }, {});

  const trendData = Object.values(monthlyData).map((d) => ({
    ...d,
    balance: d.income - d.expense
  }));

  // Process data for Pie Chart (Spending Breakdown)
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      if (!acc[t.category]) acc[t.category] = 0;
      acc[t.category] += t.amount;
      return acc;
    }, {});

  const breakdownData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#6366f1', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

  return (
    <div className="space-y-8">
      {/* Balance Trend Area Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={cn(
          "p-8 rounded-[2.5rem] border transition-all duration-500",
          isDarkMode 
            ? "bg-slate-900/50 border-slate-800 shadow-2xl shadow-indigo-500/5" 
            : "bg-white border-slate-200 shadow-xl shadow-slate-200/50"
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className={cn(
              "text-xl font-black tracking-tight",
              isDarkMode ? "text-white" : "text-slate-900"
            )}>Financial Trend</h3>
            <p className={cn(
              "text-[10px] font-bold uppercase tracking-widest",
              isDarkMode ? "text-slate-500" : "text-slate-600"
            )}>Monthly Balance Analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase">Balance</span>
            </div>
          </div>
        </div>
        
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#1e293b" : "#e2e8f0"} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: isDarkMode ? '#94a3b8' : '#1e293b', fontSize: 10, fontWeight: 700 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: isDarkMode ? '#94a3b8' : '#1e293b', fontSize: 10, fontWeight: 700 }}
                tickFormatter={(val) => `Rs.${val}`}
                dx={-10}
              />
              <Tooltip 
                cursor={{ stroke: '#6366f1', strokeWidth: 2 }}
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#0f172a' : '#fff', 
                  borderColor: isDarkMode ? '#1e293b' : '#e2e8f0',
                  borderRadius: '20px',
                  borderWidth: '2px',
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                  padding: '12px 16px'
                }}
                itemStyle={{ color: '#6366f1', fontWeight: 800, fontSize: '12px' }}
                labelStyle={{ fontWeight: 900, marginBottom: '4px', color: isDarkMode ? '#fff' : '#000' }}
              />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="#6366f1" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorBalance)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Spending Breakdown Pie Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={cn(
          "p-8 rounded-[2.5rem] border transition-all duration-500",
          isDarkMode 
            ? "bg-slate-900/50 border-slate-800 shadow-2xl shadow-indigo-500/5" 
            : "bg-white border-slate-200 shadow-xl shadow-slate-200/50"
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className={cn(
              "text-xl font-black tracking-tight",
              isDarkMode ? "text-white" : "text-slate-900"
            )}>Expense Allocation</h3>
            <p className={cn(
              "text-[10px] font-bold uppercase tracking-widest",
              isDarkMode ? "text-slate-500" : "text-slate-600"
            )}>Category Distribution</p>
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={breakdownData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {breakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                contentStyle={{ 
                  backgroundColor: isDarkMode ? '#0f172a' : '#fff', 
                  borderColor: isDarkMode ? '#1e293b' : '#e2e8f0',
                  borderRadius: '20px',
                  borderWidth: '2px'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};