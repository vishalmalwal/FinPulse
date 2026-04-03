import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, IndianRupee, Calendar, Tag, FileText, Save } from 'lucide-react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { cn } from '../../lib/utils';

export const AddTransactionModal = ({ isOpen, onClose, editData }) => {
  const { addTransaction, updateTransaction, isDarkMode } = useFinanceStore();
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'Food',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        amount: editData.amount.toString(),
        description: editData.description,
        category: editData.category,
        type: editData.type,
        date: editData.date,
      });
    } else {
      setFormData({
        amount: '',
        description: '',
        category: 'Food',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
      });
    }
  }, [editData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return;

    const transactionData = {
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      type: formData.type,
      date: formData.date,
    };

    if (editData) {
      updateTransaction(editData.id, transactionData);
    } else {
      addTransaction(transactionData);
    }
    
    onClose();
  };

  const categories = [
    'Housing', 'Food', 'Entertainment', 'Subscriptions', 'Salary', 'Freelance', 'Transport', 'Utilities', 'Other'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-8 rounded-3xl shadow-2xl z-[101]",
              isDarkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
            )}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black tracking-tight">{editData ? 'Edit Transaction' : 'Add Transaction'}</h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Type Toggle */}
              <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'income' })}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-sm font-bold transition-all",
                    formData.type === 'income' ? "bg-emerald-500 text-white shadow-md" : "text-slate-500"
                  )}
                >
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'expense' })}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-sm font-bold transition-all",
                    formData.type === 'expense' ? "bg-rose-500 text-white shadow-md" : "text-slate-500"
                  )}
                >
                  Expense
                </button>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-500">Amount</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="number"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className={cn(
                      "w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all",
                      isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
                    )}
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-500">Description</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className={cn(
                      "w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all",
                      isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
                    )}
                    placeholder="What was this for?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500">Category</label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className={cn(
                        "w-full pl-10 pr-4 py-3 rounded-xl border appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all",
                        isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
                      )}
                    >
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-500">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={cn(
                        "w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all",
                        isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
                      )}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={cn(
                  "w-full flex items-center justify-center gap-2 text-white font-black py-4 rounded-2xl transition-all shadow-xl mt-4 uppercase tracking-widest text-sm",
                  editData 
                    ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30" 
                    : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30"
                )}
              >
                {editData ? <Save size={18} /> : <Plus size={18} />}
                {editData ? 'Update Transaction' : 'Add Transaction'}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
