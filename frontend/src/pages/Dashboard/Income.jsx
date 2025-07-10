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
  dummyIncomeBarGraphData,
  dummyIncomeSourcesTableData,
} from "../../assets/assets";

const Income = () => {
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  const [incomeBarGraphData, setIncomeBarGraphData] = useState([
    { date: "Null", amount: 0 },
    { date: "Null", amount: 0 },
    { date: "Null", amount: 0 },
    { date: "Null", amount: 0 },
    { date: "Null", amount: 0 },
    { date: "Null", amount: 0 },
    { date: "Null", amount: 0 },
  ]);

  const [incomeSourcesTableData, setIncomeSourcesTableData] = useState([
    { id: 1, source: "Salary", amount: 0, date: "nill" },
    { id: 2, source: "Freelancing", amount: 0, date: "nill" },
    { id: 3, source: "Dividends", amount: 0, date: "nill" },
    { id: 4, source: "Affiliate", amount: 0, date: "nill" },
    { id: 5, source: "Gift", amount: 0, date: "nill" },
  ]);

  const [newIncome, setNewIncome] = useState({ source: "", amount: "" });

  const fetchIncomeBarGraphData = () => {
    setIncomeBarGraphData(dummyIncomeBarGraphData);
  };

  const fetchIncomeSourcesTableData = () => {
    setIncomeSourcesTableData(dummyIncomeSourcesTableData);
  };

  useEffect(() => {
    fetchIncomeBarGraphData();
    fetchIncomeSourcesTableData();
  }, []);

  const handleAddIncome = (e) => {
    e.preventDefault();
    // TODO:Add Income API CALL
  };

  return (
    <div className="w-full relative">
      {/* Overlay Modal */}
      {showIncomeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md relative">
            <h3 className="text-lg font-semibold mb-4">Add Income</h3>

            <form onSubmit={handleAddIncome} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Source</label>
                <input
                  type="text"
                  value={newIncome.source}
                  onChange={(e) =>
                    setNewIncome({ ...newIncome, source: e.target.value })
                  }
                  placeholder="e.g. Freelancing"
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Amount</label>
                <input
                  type="number"
                  value={newIncome.amount}
                  onChange={(e) =>
                    setNewIncome({ ...newIncome, amount: e.target.value })
                  }
                  placeholder="e.g. 500"
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-1 rounded bg-gray-300"
                  onClick={() => setShowIncomeModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 rounded bg-green-500 text-white"
                >
                  Save
                </button>
              </div>
            </form>

            <button
              onClick={() => setShowIncomeModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-[80%] m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Last 7 Days Income</h2>
          <button
            className="bg-green-400 text-white text-sm px-4 py-1 rounded hover:bg-green-600 transition"
            onClick={() => setShowIncomeModal(true)}
          >
            ➕ Add Income
          </button>
        </div>

        <div className="w-full border rounded-2xl text-sm pt-4 pr-8">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={incomeBarGraphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#34d399" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <table className="w-full text-sm mt-6 border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Source</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {incomeSourcesTableData.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4">{item.source}</td>
                <td className="py-2 px-4 text-green-600">₹{item.amount}</td>
                <td className="py-2 px-4">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Income;
