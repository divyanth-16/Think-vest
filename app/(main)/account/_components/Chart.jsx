"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, startOfDay, endOfDay, parse } from "date-fns";

const DATE_RANGES = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  ALL: { label: "All Time", days: null },
};

export default function AccountChart({ transactions }) {
  const [dateRange, setDateRange] = useState("1M");

  const filteredData = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();
    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    // const filtered = transactions.filter(
    //   (t) =>
    //     new Date(t.date) >= startDate &&
    //     new Date(t.date) <= endOfDay(now)
    // );
    const filtered = transactions;

    const grouped = filtered.reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), "MMM dd");
      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }
      if (transaction.type === "INCOME") {
        acc[date].income += transaction.amount;
      } else {
        acc[date].expense += transaction.amount;
      }
      return acc;
    }, {});

    return Object.values(grouped).sort(
      (a, b) =>
        parse(a.date, "MMM dd", new Date()) -
        parse(b.date, "MMM dd", new Date())
    );
  }, [transactions, dateRange]);

  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData]);

  return (
    <div className="bg-black p-6 rounded-md text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Transaction Overview</h2>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
        >
          {Object.entries(DATE_RANGES).map(([key, { label }]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Totals */}
      <div className="flex justify-around mb-6 text-sm">
        <div className="text-center">
          <p className="text-gray-400">Total Income</p>
          <p className="text-lg font-bold text-green-400">
            ${totals.income.toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Total Expenses</p>
          <p className="text-lg font-bold text-red-400">
            ${totals.expense.toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Net</p>
          <p
            className={`text-lg font-bold ${
              totals.income - totals.expense >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            ${(totals.income - totals.expense).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255, 255, 255, 0.1)" vertical={false} />
            <XAxis
              dataKey="date"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              stroke="#9ca3af"
            />
            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              stroke="#9ca3af"
            />
            <Tooltip
              formatter={(value) => [`$${value}`, undefined]}
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#f9fafb",
              }}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              fill="url(#colorIncome)"
              strokeWidth={2}
              dot={{ stroke: "#22c55e", strokeWidth: 2, r: 3 }}
              name="Income"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              fill="url(#colorExpense)"
              strokeWidth={2}
              dot={{ stroke: "#ef4444", strokeWidth: 2, r: 3 }}
              name="Expense"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
