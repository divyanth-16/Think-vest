"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import useFetch from "@/hooks/use-fetch";
import { createTransaction, updateTransaction } from "@/actions/transaction";
import { transactionSchema } from "@/app/lib/schema";

import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
// import { AIReceiptScanner } from "./AIReceiptScanner";


export function TransactionForm({
  accounts,
  categories,
  editMode = false,
  initialData = null,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

   const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues:
      editMode && initialData
        ? {
            type: initialData.type,
            amount: initialData.amount.toString(),
            description: initialData.description,
            accountId: initialData.accountId,
            category: initialData.category,
            date: new Date(initialData.date),
            isRecurring: initialData.isRecurring,
            ...(initialData.recurringInterval && {
              recurringInterval: initialData.recurringInterval,
            }),
          }
        : {
            type: "EXPENSE",
            amount: "",
            description: "",
            accountId: accounts.find((ac) => ac.isDefault)?.id,
            date: new Date(),
            isRecurring: false,
          },
  });

const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
  } = useFetch(editMode ? updateTransaction : createTransaction);


  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");

   const onSubmit = (data) => {
    const formData = {
      ...data,
      amount: parseFloat(data.amount),
    };

    if (editMode) {
      transactionFn(editId, formData);
    } else {
      transactionFn(formData);
    }
  };

  const handleScanComplete = (scannedData) => {
    if (scannedData) {
      setValue("amount", scannedData.amount.toString());
      setValue("date", new Date(scannedData.date));
      if (scannedData.description) {
        setValue("description", scannedData.description);
      }
      if (scannedData.category) {
        setValue("category", scannedData.category);
      }
      toast.success("Receipt scanned successfully");
    }
  };


  
 useEffect(() => {
    if (transactionResult?.success && !transactionLoading) {
      toast.success(
        editMode
          ? "Transaction updated successfully"
          : "Transaction created successfully"
      );
      reset();
      // router.push(/account/${transactionResult.data.accountId});
    }
  }, [transactionResult, transactionLoading, editMode]);


  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

{/* {!editMode && <AIReceiptScanner onScanComplete={handleScanComplete} />} */}

      {/* Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="type">
          Type
        </label>
        <select
          id="type"
          name="type"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          defaultValue={type}
          onChange={(e) => setValue("type", e.target.value)}
        >
          <option value="">Select type</option>
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>
        {errors.type && (
          <p className="text-sm text-red-500">{errors.type.message}</p>
        )}
      </div>

      {/* Amount and Account */}
      <div className="grid gap-6 md:grid-cols-2 mt-4">
        {/* Amount */}
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            id="amount"
            placeholder="0.00"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            {...register("amount")}
          />
          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}
        </div>

        {/* Account */}
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="accountId">
            Account
          </label>
          <select
            id="accountId"
            name="accountId"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            defaultValue={getValues("accountId")}
            onChange={(e) => setValue("accountId", e.target.value)}
          >
            <option value="">Select account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} (${parseFloat(account.balance).toFixed(2)})
              </option>
            ))}
          </select>
          {errors.accountId && (
            <p className="text-sm text-red-500">{errors.accountId.message}</p>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2 mt-4">
        <label className="text-sm font-medium" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          name="category"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          defaultValue={getValues("category")}
          onChange={(e) => setValue("category", e.target.value)}
        >
          <option value="">Select category</option>
          {filteredCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category.message}</p>
        )}
      </div>

      {/* Date */}
      <div className="space-y-2 mt-4">
        <label className="text-sm font-medium" htmlFor="date">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          max={new Date().toISOString().split("T")[0]}
          min="1900-01-01"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          value={date ? format(date, "yyyy-MM-dd") : ""}
          onChange={(e) => setValue("date", new Date(e.target.value))}
        />
        {errors.date && (
          <p className="text-sm text-red-500">{errors.date.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2 mt-4">
        <label className="text-sm font-medium" htmlFor="description">
          Description
        </label>
        <input
          type="text"
          id="description"
          placeholder="Enter description"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Recurring Toggle */}
      <div className="flex flex-row items-center justify-between rounded-lg border p-4 mt-4">
        <div className="space-y-0.5">
          <label className="text-base font-medium">
            Recurring Transaction
          </label>
          <div className="text-sm text-gray-500">
            Set up a recurring schedule for this transaction
          </div>
        </div>
        <input
          type="checkbox"
          checked={isRecurring}
          onChange={(e) => setValue("isRecurring", e.target.checked)}
          className="h-5 w-5 text-blue-600 border-gray-300 rounded"
        />
      </div>

      {/* Recurring Interval */}
      {isRecurring && (
        <div className="space-y-2 mt-4">
          <label
            className="text-sm font-medium"
            htmlFor="recurringInterval"
          >
            Recurring Interval
          </label>
          <select
            id="recurringInterval"
            name="recurringInterval"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            defaultValue={getValues("recurringInterval")}
            onChange={(e) =>
              setValue("recurringInterval", e.target.value)
            }
          >
            <option value="">Select interval</option>
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
            <option value="YEARLY">Yearly</option>
          </select>
          {errors.recurringInterval && (
            <p className="text-sm text-red-500">
              {errors.recurringInterval.message}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <button
          type="button"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm hover:bg-gray-100"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded px-3 py-2 text-sm hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
          disabled={transactionLoading}
        >
          {transactionLoading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
               {editMode ? "Updating..." : "Creating..."}
            </>
          ) : editMode ? (
            "Update Transaction"
          ) : (
            "Create Transaction"
          )}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;