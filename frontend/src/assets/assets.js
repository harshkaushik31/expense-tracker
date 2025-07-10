export const dummyDashboardData = {
  balance: 500,
  income: 1200,
  expense: 800,

  recentTransaction: [
    { id: 1, name: 'Groceries', amount: 200, type: 'expense', date: '2025-07-06' },
    { id: 2, name: 'Salary', amount: 1000, type: 'income', date: '2025-07-01' },
    { id: 3, name: 'Internet Bill', amount: 100, type: 'expense', date: '2025-07-04' },
    { id: 4, name: 'Freelance', amount: 200, type: 'income', date: '2025-07-05' },
    { id: 5, name: 'Dining Out', amount: 120, type: 'expense', date: '2025-07-03' }
  ],

  financialOverview: [
    { name: 'Balance', value: 500 },
    { name: 'Income', value: 1200 },
    { name: 'Expense', value: 800 }
  ],

  recentExpense: [
    { id: 1, name: 'Groceries', amount: 200, date: '2025-07-06' },
    { id: 2, name: 'Internet Bill', amount: 100, date: '2025-07-04' },
    { id: 3, name: 'Dining Out', amount: 120, date: '2025-07-03' },
    { id: 4, name: 'Electricity', amount: 180, date: '2025-07-02' },
    { id: 5, name: 'Netflix', amount: 60, date: '2025-07-01' }
  ],

  expenseBarGraphData: [
    { date: 'Jul 01', amount: 60 },
    { date: 'Jul 02', amount: 180 },
    { date: 'Jul 03', amount: 120 },
    { date: 'Jul 04', amount: 100 },
    { date: 'Jul 05', amount: 90 },
    { date: 'Jul 06', amount: 200 },
    { date: 'Jul 07', amount: 50 }
  ],

  recentIncome: [
    { id: 1, source: 'Salary', amount: 1000, date: '2025-07-01' },
    { id: 2, source: 'Freelance', amount: 200, date: '2025-07-05' }
  ],

  incomeBarGraphData: [
    { source: 'Salary', value: 1000 },
    { source: 'Freelance', value: 200 }
  ]
};
