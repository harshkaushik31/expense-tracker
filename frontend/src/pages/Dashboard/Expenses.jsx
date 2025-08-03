import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import expenseImage from "../../assets/spending.png";

const Expenses = () => {
    const { user, axios, fetchUser } = useAppContext();
    const [showExpenseModal, setShowExpenseModal] = useState(false);
    const [newExpense, setNewExpense] = useState({ name: "", amount: "" });

    if (!user) return <div className="p-4">Loading...</div>;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExpense(prev => ({ ...prev, [name]: value }));
    };

    const handleAddExpense = async (e) => {
        e.preventDefault();
        try {
            // This requires an "addExpense" endpoint on your backend
            const { data } = await axios.post('/api/v1/expense/add', {
                category: newExpense.name, // Assuming 'name' from form maps to 'category' in backend
                amount: Number(newExpense.amount)
            });
            if (data.success) {
                await fetchUser(); // Re-fetch all user data to update UI
                setShowExpenseModal(false);
                setNewExpense({ name: "", amount: "" });
            }
        } catch (error) {
            console.error("Failed to add expense:", error);
            alert("Failed to add expense. Check console for details.");
        }
    };

    return (
        <div className="w-full p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Expenses</h1>
                <button
                    onClick={() => setShowExpenseModal(true)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                    Add Expense
                </button>
            </div>

            {/* Expenses Table */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Expense Categories</h2>
                <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 text-left">Category</th>
                                <th className="py-2 px-4 text-left">Amount</th>
                                <th className="py-2 px-4 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.expense.map((item) => (
                                <tr key={item._id} className="border-t">
                                    <td className="py-2 px-4">{item.category}</td>
                                    <td className="py-2 px-4 text-red-600">₹{item.amount.toLocaleString()}</td>
                                    <td className="py-2 px-4 text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Expenses Bar Chart */}
            <div>
                 <h2 className="text-xl font-semibold mb-2">Expense Distribution</h2>
                <div className="w-full h-80 border rounded-lg p-4">
                    <ResponsiveContainer>
                        <BarChart data={user.expense}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                            <Legend />
                            <Bar dataKey="amount" fill="#ff6347" name="Expense Amount" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Add Expense Modal */}
            {showExpenseModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
                        <form onSubmit={handleAddExpense}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Expense Category</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newExpense.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={newExpense.amount}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={() => setShowExpenseModal(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-lg">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Expenses;