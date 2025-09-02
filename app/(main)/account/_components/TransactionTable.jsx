"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Trash,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { categoryColors } from "@/data/categories";
import { bulkDeleteTransactions } from "@/actions/account";
import useFetch from "@/hooks/use-fetch";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 10;

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

export function TransactionTable({ transactions }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [recurringFilter, setRecurringFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((t) =>
        t.description?.toLowerCase().includes(searchLower)
      );
    }

    if (typeFilter) {
      result = result.filter((t) => t.type === typeFilter);
    }

    if (recurringFilter) {
      result = result.filter((t) => {
        return recurringFilter === "recurring"
          ? t.isRecurring
          : !t.isRecurring;
      });
    }

    result.sort((a, b) => {
      let comparison = 0;

      switch (sortConfig.field) {
        case "date":
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });

    return result;
  }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);

  const totalPages = Math.ceil(
    filteredAndSortedTransactions.length / ITEMS_PER_PAGE
  );

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedTransactions.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedTransactions, currentPage]);

  const handleSort = (field) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field === field && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds((current) =>
      current.length === paginatedTransactions.length
        ? []
        : paginatedTransactions.map((t) => t.id)
    );
  };

  const {
    loading: deleteLoading,
    fn: deleteFn,
    data: deleted,
  } = useFetch(bulkDeleteTransactions);

  const handleBulkDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedIds.length} transactions?`
      )
    )
      return;

    deleteFn(selectedIds);
  };

  useEffect(() => {
    if (deleted && !deleteLoading) {
      toast.error("Transactions deleted successfully");
    }
  }, [deleted, deleteLoading]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setTypeFilter("");
    setRecurringFilter("");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSelectedIds([]);
  };

  return (
    <div className="space-y-4 text-white">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-8 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
          >
            <option value="">All Types</option>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>

          {/* Recurring Filter */}
          <select
            value={recurringFilter}
            onChange={(e) => {
              setRecurringFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
          >
            <option value="">All Transactions</option>
            <option value="recurring">Recurring Only</option>
            <option value="non-recurring">Non-recurring Only</option>
          </select>

          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              <Trash className="h-4 w-4" />
              Delete Selected ({selectedIds.length})
            </button>
          )}

          {(searchTerm || typeFilter || recurringFilter) && (
            <button
              onClick={handleClearFilters}
              className="p-2 border border-gray-600 rounded hover:bg-gray-700"
              title="Clear filters"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-700 rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-800 text-gray-100">
            <tr>
              <th className="p-3 w-[50px]">
                <input
                  type="checkbox"
                  checked={
                    selectedIds.length === paginatedTransactions.length &&
                    paginatedTransactions.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th
                className="p-3 cursor-pointer text-left"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  Date
                  {sortConfig.field === "date" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </th>
              <th className="p-3 text-left">Description</th>
              <th
                className="p-3 cursor-pointer text-left"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center">
                  Category
                  {sortConfig.field === "category" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </th>
              <th
                className="p-3 cursor-pointer text-right"
                onClick={() => handleSort("amount")}
              >
                <div className="flex justify-end items-center">
                  Amount
                  {sortConfig.field === "amount" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    ))}
                </div>
              </th>
              <th className="p-3 text-left">Recurring</th>
              <th className="p-3 w-[50px]"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-gray-400 p-4">
                  No transactions found
                </td>
              </tr>
            ) : (
              paginatedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-700 border-b border-gray-700"
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(transaction.id)}
                      onChange={() => handleSelect(transaction.id)}
                    />
                  </td>
                  <td className="p-3">
                    {format(new Date(transaction.date), "PP")}
                  </td>
                  <td className="p-3">{transaction.description}</td>
                  <td className="p-3 capitalize">
                    <span
                      style={{
                        background: categoryColors[transaction.category],
                      }}
                      className="px-2 py-1 rounded text-white text-xs"
                    >
                      {transaction.category}
                    </span>
                  </td>
                  <td
                    className={`p-3 text-right font-medium ${
                      transaction.type === "EXPENSE"
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {transaction.type === "EXPENSE" ? "-" : "+"}$
                    {transaction.amount.toFixed(2)}
                  </td>
                  <td className="p-3">
                    {transaction.isRecurring ? (
                      <span
                        className="inline-flex items-center gap-1 text-purple-300 bg-purple-900 hover:bg-purple-800 px-2 py-1 rounded text-xs cursor-default"
                        title={`Next Date: ${format(
                          new Date(transaction.nextRecurringDate),
                          "PPP"
                        )}`}
                      >
                        <RefreshCw className="h-3 w-3" />
                        {RECURRING_INTERVALS[transaction.recurringInterval]}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 border border-gray-600 px-2 py-1 rounded text-xs text-gray-300">
                        <Clock className="h-3 w-3" />
                        One-time
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        className="p-2 rounded hover:bg-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          document
                            .getElementById(`dropdown-${transaction.id}`)
                            .classList.toggle("hidden");
                        }}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                      <div
                        id={`dropdown-${transaction.id}`}
                        className="hidden absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md border border-gray-700 bg-gray-800 text-gray-200 shadow-lg"
                      >
                        <button
                          onClick={() =>
                            router.push(
                              `/transaction/create?edit=${transaction.id}`
                            )
                          }
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                        >
                          Edit
                        </button>
                        <div className="border-t border-gray-700 my-1"></div>
                        <button
                          onClick={() => deleteFn([transaction.id])}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border border-gray-600 text-gray-300 p-2 rounded disabled:opacity-50 hover:bg-gray-700"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border border-gray-600 text-gray-300 p-2 rounded disabled:opacity-50 hover:bg-gray-700"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
