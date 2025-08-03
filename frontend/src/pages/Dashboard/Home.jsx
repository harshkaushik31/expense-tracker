import React from "react";
import { useAppContext } from "../../context/AppContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import creditCard from "../../assets/credit-card.png";
import incomeImage from "../../assets/salary.png";
import expenseImage from "../../assets/spending.png";

const Home = () => {
    const { user } = useAppContext();

    // Show a loading state if the user object itself isn't ready
    if (!user) {
        return <div className="p-4">Loading user data...</div>;
    }

    // --- The Fix: Provide a default empty array for income and expense ---
    // This ensures .reduce() will never be called on 'undefined'
    const incomeData = user.income || [];
    const expenseData = user.expense || [];

    // --- Calculate totals from live data ---
    const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
    const totalExpense = expenseData.reduce((sum, item) => sum + item.amount, 0);
    const balance = totalIncome - totalExpense;

    // --- Prepare data for charts and lists ---
    const recentTransactions = [...incomeData, ...expenseData]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map(t => ({ ...t, type: t.source ? 'income' : 'expense' }));

    const financialOverviewData = [
        { name: 'Income', value: totalIncome },
        { name: 'Expense', value: totalExpense },
    ];

    const COLORS = ["#82ca9d", "#ff6347"]; // Green for Income, Red for Expense

    return (
        <div className="w-full p-2 md:p-4">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="border h-[5rem] rounded-2xl flex items-center p-4">
                    <img src={creditCard} alt="Balance" className="h-12 w-12 p-2 bg-amber-300 rounded-full" />
                    <div className="ml-4">
                        <h1 className="text-lg">Total Balance</h1>
                        <div className="font-semibold text-xl">₹{balance.toLocaleString()}</div>
                    </div>
                </div>
                <div className="border h-[5rem] rounded-2xl flex items-center p-4">
                    <img src={incomeImage} alt="Income" className="h-12 w-12 p-2 bg-green-300 rounded-full" />
                    <div className="ml-4">
                        <h1 className="text-lg">Total Income</h1>
                        <div className="font-semibold text-xl">₹{totalIncome.toLocaleString()}</div>
                    </div>
                </div>
                <div className="border h-[5rem] rounded-2xl flex items-center p-4">
                    <img src={expenseImage} alt="Expense" className="h-12 w-12 p-2 bg-red-300 rounded-full" />
                    <div className="ml-4">
                        <h1 className="text-lg">Total Expenditure</h1>
                        <div className="font-semibold text-xl">₹{totalExpense.toLocaleString()}</div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions & Financial Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Recent Transactions List */}
                <div className="border p-4 rounded-xl">
                    <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
                    <ul className="space-y-3">
                        {recentTransactions.length > 0 ? (
                            recentTransactions.map((transaction) => (
                                <li key={transaction._id} className="flex justify-between items-center text-sm">
                                    <span>{transaction.category || transaction.source}</span>
                                    <span className={`font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                                        {transaction.type === "income" ? "+" : "-"} ₹{transaction.amount.toLocaleString()}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500">No recent transactions found.</p>
                        )}
                    </ul>
                </div>

                {/* Financial Overview Pie Chart */}
                <div className="border p-4 rounded-xl">
                    <h2 className="text-lg font-semibold mb-4">Financial Overview</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={financialOverviewData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label={(entry) => `${entry.name}: ₹${entry.value.toLocaleString()}`}
                            >
                                {financialOverviewData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Home;