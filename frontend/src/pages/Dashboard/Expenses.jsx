import React, { useEffect, useState } from "react";
import {
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  dummyExpenseBarGraphData,
  dummyExpenseTableData,
} from "../../assets/assets";

const Expenses = () => {
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const [expenseBarGraphData, setExpenseBarGraphData] = useState([
    { date: "Null", amount: 0 },
    { date: "Null", amount: 0 },
    { date: "Null", amount: 0 },
    { date: "Null", amount: 0 },
    { date: "Null", amount: 0 },
    { date: "Null", amount: 0 },
    { date: "Null", amount: 0 },
  ]);

  const [expenseTableData, setExpenseTableData] = useState([
    { id: 1, name: "Groceries", amount: 0, date: "nill" },
    { id: 2, name: "Rent", amount: 0, date: "nill" },
    { id: 3, name: "Travel", amount: 0, date: "nill" },
    { id: 4, name: "Food", amount: 0, date: "nill" },
    { id: 5, name: "Utilities", amount: 0, date: "nill" },
  ]);

  const [newExpense, setNewExpense] = useState({ name: "", amount: "" });

  const fetchExpenseBarGraphData = () => {
    setExpenseBarGraphData(dummyExpenseBarGraphData);
  };

  const fetchExpenseTableData = () => {
    setExpenseTableData(dummyExpenseTableData);
  };

  useEffect(() => {
    fetchExpenseBarGraphData();
    fetchExpenseTableData();
  }, []);

  const handleAddExpense = (e) => {
    e.preventDefault();

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    const newItem = {
      id: expenseTableData.length + 1,
      name: newExpense.name,
      amount: parseFloat(newExpense.amount),
      date: formattedDate,
    };

    setExpenseTableData([newItem, ...expenseTableData]);
    setNewExpense({ name: "", amount: "" });
    setShowExpenseModal(false);
  };

  return (
    <div className="w-full relative">
      {/* Overlay Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md relative">
            <h3 className="text-lg font-semibold mb-4">Add Expense</h3>

            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Category</label>
                <input
                  type="text"
                  value={newExpense.name}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, name: e.target.value })
                  }
                  placeholder="e.g. Rent"
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Amount</label>
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, amount: e.target.value })
                  }
                  placeholder="e.g. 1200"
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-1 rounded bg-gray-300"
                  onClick={() => setShowExpenseModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 rounded bg-red-500 text-white"
                >
                  Save
                </button>
              </div>
            </form>

            <button
              onClick={() => setShowExpenseModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="w-[80%] m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Last 7 Days Expenses</h2>
          <button
            className="bg-red-400 text-white text-sm px-4 py-1 rounded hover:bg-red-600 transition"
            onClick={() => setShowExpenseModal(true)}
          >
            ➕ Add Expense
          </button>
        </div>

        <div className="w-full border rounded-2xl text-sm">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={expenseBarGraphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#f87171" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <table className="w-full text-sm mt-6 border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenseTableData.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4 text-red-600">₹{item.amount}</td>
                <td className="py-2 px-4">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expenses;