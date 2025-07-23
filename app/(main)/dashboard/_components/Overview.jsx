"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { format } from "date-fns";

export function Overview({ accounts, transactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );

  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );

  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const currentDate = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const date = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  });

  const expensesByCategory = currentMonthExpenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const donutChartData = Object.entries(expensesByCategory).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  const COLORS = [
    "#7C3AED",
    "#A78BFA",
    "#C084FC",
    "#F472B6",
    "#FBBF24",
    "#34D399",
    "#60A5FA",
  ];

  return (
    <section className="bg-gradient-to-br from-gray-900 to-black text-white p-6 mt-8 rounded-2xl shadow-lg">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Account Activity</h2>
        <select
          className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
          value={selectedAccountId}
          onChange={(e) => setSelectedAccountId(e.target.value)}
        >
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-gray-800 p-4 rounded-xl">
          <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
          {recentTransactions.length === 0 ? (
            <p className="text-gray-400">No recent transactions.</p>
          ) : (
            <ul className="space-y-3">
              {recentTransactions.map((t) => (
                <li
                  key={t.id}
                  className="flex justify-between items-center bg-gray-900 px-4 py-3 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">
                      {t.description || "Untitled"}
                    </p>
                    <span className="text-sm text-gray-400">
                      {format(new Date(t.date), "PPP")}
                    </span>
                  </div>
                  <span
                    className={`font-bold ${
                      t.type === "EXPENSE"
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {t.type === "EXPENSE" ? "-" : "+"}${t.amount.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Donut Chart */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-medium mb-4">Monthly Expense Breakdown</h3>
          {donutChartData.length === 0 ? (
            <p className="text-gray-400">No data for this month.</p>
          ) : (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    labelLine={false}
                    label={({ name }) => name}
                  >
                    {donutChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        cornerRadius={6}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val) => `$${val.toFixed(2)}`}
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderColor: "#4b5563",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-4 text-sm text-purple-300 font-medium">
                Spending by Category
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
