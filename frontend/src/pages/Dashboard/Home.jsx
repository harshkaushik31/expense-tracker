import React, { useEffect, useState } from "react";
import creditCard from "../../assets/credit-card.png";
import incomeImage from "../../assets/salary.png";
import expnenseImage from "../../assets/spending.png";
import { dummyDashboardData } from "../../assets/assets";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

const Home = () => {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  const INCOMECOLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f472b6", "#c084fc"];

  const [data, setData] = useState({
    balance: 0,
    income: 0,
    expense: 0,
    recentTransaction: [],
    financialOverview: [],
    recentExpense: [],
    expenseBarGraphData: [],
    recentIncome: [],
    incomeBarGraphData: [],
  });

  const fetchDashboardData = async () => {
    setData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-2">
        <div className="border col-span-1 h-[5rem] rounded-2xl my-2 flex flex-row">
          <img
            src={creditCard}
            alt=""
            className="h-12 w-12 p-1 ml-4 mt-4 bg-amber-300 rounded-full overflow-hidden"
          />
          <div className="m-4 text-lg">
            <h1>Total Balance</h1>
            <div>{data.balance}</div>
          </div>
        </div>
        <div className="border col-span-1 h-[5rem] rounded-2xl my-2 flex flex-row">
          <img
            src={incomeImage}
            alt=""
            className="h-12 w-12 p-1 ml-4 mt-4 bg-amber-300 rounded-full overflow-hidden"
          />
          <div className="m-4 text-lg">
            <h1>Total Income</h1>
            <div>{data.income}</div>
          </div>
        </div>
        <div className="border col-span-1 h-[5rem] rounded-2xl my-2 flex flex-row">
          <img
            src={expnenseImage}
            alt=""
            className="h-12 w-12 p-1 ml-4 mt-4 bg-amber-300 rounded-full overflow-hidden"
          />
          <div className="m-4 text-lg">
            <h1>Total Expenditure</h1>
            <div>{data.expense}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-2">
        {/* Recent Transactions */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
          <ul className="space-y-2">
            {data.recentTransaction.map((transaction, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span>{transaction.name}</span>
                <span
                  className={
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  ₹{transaction.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Financial Overview Pie Chart */}
        <div className="border p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Financial Overview</h2>

          <div className="flex items-center">
            {/* Pie Chart */}
            <PieChart width={300} height={250}>
              <Pie
                data={data.financialOverview}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data.financialOverview.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>

            {/* Legend */}
            <div className="ml-4 space-y-2">
              {data.financialOverview.map((entry, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div
                    className="w-4 h-4 rounded-sm mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-2">
        {/* Recent Expenses Data */}
        <div className="border p-4 rounded-xl">
          <div className="flex flex-row justify-between">
            <h2 className="text-lg font-semibold mb-4">Recent Expenses</h2>
            <Link
              className="text-sm bg-red-200 p-1 rounded-2xl mb-4"
              to="/expenses"
            >
              All Expenses
            </Link>
          </div>
          <ul className="space-y-2">
            {data.recentExpense.map((expense, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span>{expense.name}</span>
                <span className="text-red-500">₹{expense.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bar Graph for Recent Expenses */}
        <div className="border p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Last 7 Days Expenses</h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.expenseBarGraphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#f87171" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-2">
        {/* Recent Income */}
        <div className="border p-4 rounded-xl">
          <div className="flex flex-row justify-between">
            <h2 className="text-lg font-semibold mb-4">Recent Income</h2>
            <Link
              className="text-sm bg-green-200 p-1 rounded-2xl mb-4"
              to="/income"
            >
              All Income
            </Link>
          </div>

          <ul className="space-y-2">
            {data.recentIncome.map((income, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span>{income.source}</span>
                <span className="text-green-600">₹{income.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pie Chart with source of Income */}
        <div className="border p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Income Sources</h2>

          <div className="flex items-center">
            {/* Pie Chart */}
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data.incomeBarGraphData}
                  dataKey="value"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {data.incomeBarGraphData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={INCOMECOLORS[index % INCOMECOLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="ml-6 space-y-2 text-sm">
              {data.incomeBarGraphData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-sm mr-2"
                    style={{
                      backgroundColor:
                        INCOMECOLORS[index % INCOMECOLORS.length],
                    }}
                  ></div>

                  <span>{entry.source}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
