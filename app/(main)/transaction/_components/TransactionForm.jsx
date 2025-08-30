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

export default function TransactionForm({
  accounts = [],
  categories = [],
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
            type: initialData.type, // must be "EXPENSE" | "INCOME"
            amount: initialData.amount.toString(),
            description: initialData.description || "",
            accountId: initialData.accountId || accounts.find((ac) => ac.isDefault)?.id,
            category: initialData.category || "",
            date: new Date(initialData.date), // keep Date object (old logic)
            isRecurring: !!initialData.isRecurring,
            ...(initialData.recurringInterval && {
              recurringInterval: initialData.recurringInterval,
            }),
          }
        : {
            type: "EXPENSE",
            amount: "",
            description: "",
            accountId: accounts.find((ac) => ac.isDefault)?.id || "",
            category: "",
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
    // Ensure backend gets the right shapes
    const formData = {
      ...data,
      amount: parseFloat(data.amount),            // number (not string)
      type: data.type === "INCOME" ? "INCOME" : "EXPENSE", // enum EXACTLY as Prisma expects
      date: data.date instanceof Date ? data.date : new Date(data.date), // Date object
    };

    if (editMode) {
      transactionFn(editId, formData);
    } else {
      transactionFn(formData);
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
      // router.back(); // optional: navigate away after success
    }
  }, [transactionResult, transactionLoading, editMode, reset]);

  const filteredCategories = categories.filter((c) => c.type === type);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Card container with dark gradient that matches your screenshot */}
      <div className="max-w-3xl mx-auto rounded-2xl border border-neutral-700/80 bg-[linear-gradient(135deg,_#1f1f1f,_#111111)] p-6 sm:p-8 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] text-white">
        <h2 className="text-3xl font-extrabold text-center mb-8">Add Transaction</h2>

        {/* Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            className="w-full rounded-xl px-3 py-3 text-sm bg-neutral-800/90 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={type}
            onChange={(e) => setValue("type", e.target.value)}
          >
            <option className="bg-neutral-900" value="">Select type</option>
            <option className="bg-neutral-900" value="EXPENSE">Expense</option>
            <option className="bg-neutral-900" value="INCOME">Income</option>
          </select>
          {errors.type && (
            <p className="text-sm text-red-400">{errors.type.message}</p>
          )}
        </div>

        {/* Amount & Account */}
        <div className="grid gap-6 sm:grid-cols-2 mt-6">
          {/* Amount */}
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="amount">Amount</label>
            <input
              type="number"
              step="0.01"
              id="amount"
              placeholder="0.00"
              className="w-full rounded-xl px-3 py-3 text-sm bg-neutral-800/90 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("amount")}
            />
            {errors.amount && (
              <p className="text-sm text-red-400">{errors.amount.message}</p>
            )}
          </div>

          {/* Account */}
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="accountId">Account</label>
            <select
              id="accountId"
              name="accountId"
              className="w-full rounded-xl px-3 py-3 text-sm bg-neutral-800/90 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={getValues("accountId")}
              onChange={(e) => setValue("accountId", e.target.value)}
            >
              <option className="bg-neutral-900" value="">Select account</option>
              {accounts.map((account) => (
                <option className="bg-neutral-900" key={account.id} value={account.id}>
                  {account.name} (${parseFloat(account.balance).toFixed(2)})
                </option>
              ))}
            </select>
            {errors.accountId && (
              <p className="text-sm text-red-400">{errors.accountId.message}</p>
            )}
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2 mt-6">
          <label className="text-sm font-medium" htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            className="w-full rounded-xl px-3 py-3 text-sm bg-neutral-800/90 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={getValues("category")}
            onChange={(e) => setValue("category", e.target.value)}
          >
            <option className="bg-neutral-900" value="">Select category</option>
            {filteredCategories.map((category) => (
              <option className="bg-neutral-900" key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-sm text-red-400">{errors.category.message}</p>
          )}
        </div>

        {/* Date */}
        <div className="space-y-2 mt-6">
          <label className="text-sm font-medium" htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={new Date().toISOString().split("T")[0]}
            min="1900-01-01"
            className="w-full rounded-xl px-3 py-3 text-sm bg-neutral-800/90 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={date ? format(date, "yyyy-MM-dd") : ""}
            onChange={(e) => setValue("date", new Date(e.target.value))}
          />
          {errors.date && (
            <p className="text-sm text-red-400">{errors.date.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2 mt-6">
          <label className="text-sm font-medium" htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Add a note about this transaction..."
            className="w-full rounded-xl px-3 py-3 text-sm bg-neutral-800/90 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-red-400">{errors.description.message}</p>
          )}
        </div>

        {/* Recurring Toggle */}
        <div className="flex flex-row items-center justify-between rounded-xl border border-neutral-700 bg-neutral-800/60 p-4 mt-6">
          <div className="space-y-0.5">
            <label className="text-base font-medium">Recurring Transaction</label>
            <div className="text-sm text-neutral-400">
              Set up a recurring schedule for this transaction
            </div>
          </div>
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={(e) => setValue("isRecurring", e.target.checked)}
            className="h-5 w-5 accent-blue-600"
          />
        </div>

        {/* Recurring Interval */}
        {isRecurring && (
          <div className="space-y-2 mt-4">
            <label className="text-sm font-medium" htmlFor="recurringInterval">
              Recurring Interval
            </label>
            <select
              id="recurringInterval"
              name="recurringInterval"
              className="w-full rounded-xl px-3 py-3 text-sm bg-neutral-800/90 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={getValues("recurringInterval")}
              onChange={(e) => setValue("recurringInterval", e.target.value)}
            >
              <option className="bg-neutral-900" value="">Select interval</option>
              <option className="bg-neutral-900" value="DAILY">Daily</option>
              <option className="bg-neutral-900" value="WEEKLY">Weekly</option>
              <option className="bg-neutral-900" value="MONTHLY">Monthly</option>
              <option className="bg-neutral-900" value="YEARLY">Yearly</option>
            </select>
            {errors.recurringInterval && (
              <p className="text-sm text-red-400">{errors.recurringInterval.message}</p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 mt-8">
          <button
            type="button"
            className="w-full rounded-xl px-4 py-3 text-sm border border-neutral-700 bg-neutral-800/60 hover:bg-neutral-800 transition"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full rounded-xl px-4 py-3 text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border border-blue-700/40 shadow-lg hover:shadow-xl transition disabled:opacity-60 flex items-center justify-center"
            disabled={transactionLoading}
          >
            {transactionLoading ? (editMode ? "Updating..." : "Creating...") : (editMode ? "Update Transaction" : "Add Transaction")}
          </button>
        </div>
      </div>
    </form>
  );
}
