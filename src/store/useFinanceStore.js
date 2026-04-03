import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialTransactions = [
  { id: '1', date: '2025-10-01', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: '2', date: '2025-10-05', amount: 1200, category: 'Housing', type: 'expense', description: 'Rent Payment' },
  { id: '3', date: '2025-10-07', amount: 150, category: 'Food', type: 'expense', description: 'Grocery Shopping' },
  { id: '4', date: '2025-10-10', amount: 80, category: 'Entertainment', type: 'expense', description: 'Movie Night' },
  { id: '5', date: '2025-10-12', amount: 45, category: 'Subscriptions', type: 'expense', description: 'Netflix' },
  { id: '6', date: '2025-10-15', amount: 300, category: 'Freelance', type: 'income', description: 'Logo Design Project' },
  { id: '7', date: '2025-10-18', amount: 200, category: 'Food', type: 'expense', description: 'Dinner with friends' },
  { id: '8', date: '2025-10-20', amount: 100, category: 'Transport', type: 'expense', description: 'Gas refill' },
  { id: '9', date: '2025-10-22', amount: 120, category: 'Utilities', type: 'expense', description: 'Electricity Bill' },
  { id: '10', date: '2025-10-25', amount: 60, category: 'Entertainment', type: 'expense', description: 'Gaming' },
  { id: '11', date: '2025-11-01', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: '12', date: '2025-11-03', amount: 1200, category: 'Housing', type: 'expense', description: 'Rent Payment' },
  { id: '13', date: '2025-11-05', amount: 200, category: 'Food', type: 'expense', description: 'Bulk Groceries' },
  { id: '14', date: '2025-11-08', amount: 500, category: 'Freelance', type: 'income', description: 'Web Dev Gig' },
  { id: '15', date: '2025-11-12', amount: 30, category: 'Subscriptions', type: 'expense', description: 'Spotify' },
  { id: '16', date: '2025-11-15', amount: 150, category: 'Transport', type: 'expense', description: 'Train Pass' },
  { id: '17', date: '2025-11-20', amount: 400, category: 'Entertainment', type: 'expense', description: 'Concert Tickets' },
  { id: '18', date: '2025-11-25', amount: 90, category: 'Food', type: 'expense', description: 'Takeout' },
  { id: '19', date: '2025-12-01', amount: 5200, category: 'Salary', type: 'income', description: 'Monthly Salary + Bonus' },
  { id: '20', date: '2025-12-05', amount: 1250, category: 'Housing', type: 'expense', description: 'Rent + Maintenance' },
];

export const useFinanceStore = create(
  persist(
    (set) => ({
      transactions: initialTransactions,
      userRole: 'Admin',
      isDarkMode: false,
      searchTerm: '',

      setSearchTerm: (term) => set({ searchTerm: term }),

      addTransaction: (transaction) => set((state) => ({
        transactions: [
          { ...transaction, id: Math.random().toString(36).substring(2, 9) },
          ...state.transactions
        ]
      })),

      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      })),

      updateTransaction: (id, updatedFields) => set((state) => ({
        transactions: state.transactions.map((t) => t.id === id ? { ...t, ...updatedFields } : t)
      })),

      setUserRole: (role) => set({ userRole: role }),

      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'finpulse-storage',
    }
  )
);
