# FinPulse - Advanced Finance Dashboard

FinPulse is a production-grade, highly interactive finance dashboard built with React, Tailwind CSS, and Framer Motion. It features real-time data visualization, Role-Based Access Control (RBAC), and a stunning dark mode interface.

## 🚀 Features

- **Dashboard Overview**: Masonry grid layout with summary cards for Balance, Income, and Expenses.
- **Interactive Charts**:
  - **Balance Trend**: Smooth Area Chart showing financial trajectory over the last 6 months.
  - **Spending Breakdown**: Doughnut Chart visualizing expenses by category.
- **Transaction Management**:
  - Search, filter, and sort capabilities.
  - Admin vs. Viewer roles (RBAC).
  - Admin-only Add/Edit/Delete functionality.
- **Smart Insights**: Dynamic, data-driven financial analysis and tips.
- **UI/UX Excellence**:
  - Scroll-triggered animations using Framer Motion.
  - Staggered list animations for transactions.
  - Beautiful empty states and micro-interactions.
  - Full Dark Mode support.
- **Persistence**: State is persisted using `zustand` middleware and `localStorage`.

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React

## 📂 Project Structure

```text
src/
├── components/
│   ├── Dashboard/      # Summary cards and charts
│   ├── Insights/       # Smart insights widget
│   ├── Layout/         # Header and navigation
│   └── Transactions/   # Data grid and add transaction modal
├── lib/                # Utility functions (cn, formatting)
├── store/              # Zustand state management
├── types.ts            # TypeScript interfaces
└── App.tsx             # Main application entry
```

## 🚦 Getting Started

1. **Initialize Git**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: FinPulse Dashboard"
   git branch -M master
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 🔐 State Management Approach

We use **Zustand** with the `persist` middleware. This ensures:
1. **Global Accessibility**: Any component can access financial data or user settings.
2. **Persistence**: Theme preferences, user roles, and transactions survive page refreshes.
3. **Performance**: Selective re-renders by subscribing only to needed state slices.

## 🛡️ Role-Based Access Control (RBAC)

- **Viewer**: Read-only access to charts and transaction history.
- **Admin**: Full CRUD capabilities, including adding new transactions and deleting existing ones.
