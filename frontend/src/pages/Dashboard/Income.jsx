import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import incomeImage from "../../assets/salary.png";

const Income = () => {
    const { user, axios, fetchUser } = useAppContext();
    const [showIncomeModal, setShowIncomeModal] = useState(false);
    const [newIncome, setNewIncome] = useState({ source: "", amount: "" });

    if (!user) return <div className="p-4">Loading...</div>;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewIncome(prev => ({ ...prev, [name]: value }));
    };

    const handleAddIncome = async (e) => {
        e.preventDefault();
        try {
            // This requires an "addIncome" endpoint on your backend
            const { data } = await axios.post('/api/v1/income/add', {
                source: newIncome.source,
                amount: Number(newIncome.amount) // Ensure amount is a number
            });
            if (data.success) {
                await fetchUser(); // Re-fetch all user data to update the UI
                setShowIncomeModal(false);
                setNewIncome({ source: "", amount: "" }); // Reset form
            }
        } catch (error) {
            console.error("Failed to add income:", error);
            alert("Failed to add income. Check console for details.");
        }
    };

    return (
        <div className="w-full p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Income</h1>
                <button
                    onClick={() => setShowIncomeModal(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                    Add Income
                </button>
            </div>

            {/* Income Table */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Income Sources</h2>
                <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 text-left">Source</th>
                                <th className="py-2 px-4 text-left">Amount</th>
                                <th className="py-2 px-4 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.income.map((item) => (
                                <tr key={item._id} className="border-t">
                                    <td className="py-2 px-4">{item.source}</td>
                                    <td className="py-2 px-4 text-green-600">₹{item.amount.toLocaleString()}</td>
                                    <td className="py-2 px-4 text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Income Bar Chart */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Income Distribution</h2>
                <div className="w-full h-80 border rounded-lg p-4">
                     <ResponsiveContainer>
                        <BarChart data={user.income}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="source" />
                            <YAxis />
                            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                            <Legend />
                            <Bar dataKey="amount" fill="#82ca9d" name="Income Amount" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Add Income Modal */}
            {showIncomeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Add New Income</h2>
                        <form onSubmit={handleAddIncome}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Income Source</label>
                                <input
                                    type="text"
                                    name="source"
                                    value={newIncome.source}
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
                                    value={newIncome.amount}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={() => setShowIncomeModal(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Income;