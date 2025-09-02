"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { updateBudget } from "@/actions/budget";

export function Progress ({ initialBudget, currentExpenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const percentUsed = initialBudget
    ? (currentExpenses / initialBudget.amount) * 100
    : 0;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      setIsEditing(false);
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  return (
    <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-inner border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm text-gray-200 font-semibold">
            Monthly Budget (Default Account)
          </h3>
          <div className="flex items-center gap-2 mt-2">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  placeholder="Enter amount"
                  className="w-32 px-2 py-1 rounded border border-gray-600 bg-gray-800 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={isLoading}
                  autoFocus
                />
                <button
                  onClick={handleUpdateBudget}
                  disabled={isLoading}
                  className="p-2 rounded hover:bg-green-800 transition"
                >
                  <Check className="h-4 w-4 text-green-400" />
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="p-2 rounded hover:bg-red-800 transition"
                >
                  <X className="h-4 w-4 text-red-400" />
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs text-gray-400">
                  {initialBudget
                    ? `$${currentExpenses.toFixed(
                        2
                      )} of $${initialBudget.amount.toFixed(2)} spent`
                    : "No budget set"}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  <Pencil className="h-3 w-3 text-gray-400" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {initialBudget && (
        <div className="space-y-2">
          {/* Progress Bar */}
          <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`
                h-full 
                ${percentUsed >= 90
                  ? "bg-gradient-to-r from-red-500 via-red-400 to-red-300"
                  : percentUsed >= 75
                  ? "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300"
                  : "bg-gradient-to-r from-green-500 via-green-400 to-green-300"}
                transition-all duration-500
              `}
              style={{
                width: `${Math.min(percentUsed, 100)}%`,
                boxShadow: "0 0 10px rgba(0,255,0,0.5)",
              }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 text-right">
            {percentUsed.toFixed(1)}% used
          </p>
        </div>
      )}
    </div>
  );
}
