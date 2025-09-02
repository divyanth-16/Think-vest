"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";

import { createAccount } from "@/actions/dashboard";
import { accountSchema } from "@/app/lib/schema";

export function CreateAccountDrawer({ children }) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  const {
    loading: createAccountLoading,
    fn: createAccountFn,
    error,
    data: newAccount,
  } = useFetch(createAccount);

  const onSubmit = async (data) => {
    await createAccountFn(data);
  };

  useEffect(() => {
    if (newAccount) {
      toast.success("Account created successfully");
      reset();
      setOpen(false);
    }
  }, [newAccount, reset]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create account");
    }
  }, [error]);

  return (
<Drawer open={open} onOpenChange={setOpen}>
  <DrawerTrigger asChild>
    <button className="px-4 py-2 text-white rounded-md transition">
      {children}
    </button>
  </DrawerTrigger>
  <DrawerContent
    className="bg-[#1e1e1e] text-white" 
    // ✅ SOLID DARK BACKGROUND
  >
    <DrawerHeader>
      <DrawerTitle>Create New Account</DrawerTitle>
    </DrawerHeader>
    <div className="px-4 pb-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Account Name
          </label>
          <input
            id="name"
            placeholder="e.g., Main Checking"
            {...register("name")}
            className="w-full px-3 py-2 border rounded-md text-sm bg-gray-800 text-white placeholder-gray-400 border-gray-600" 
            // ✅ DARK INPUT
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Type */}
        <div className="space-y-2">
          <label htmlFor="type" className="text-sm font-medium">
            Account Type
          </label>
          <select
            id="type"
            className="w-full px-3 py-2 border rounded-md text-sm bg-gray-800 text-white border-gray-600"
            // ✅ DARK SELECT
            value={watch("type")}
            onChange={(e) => setValue("type", e.target.value)}
          >
            <option className="bg-gray-800 text-white" value="CURRENT">
              Current
            </option>
            <option className="bg-gray-800 text-white" value="SAVINGS">
              Savings
            </option>
          </select>
          {errors.type && (
            <p className="text-sm text-red-500">{errors.type.message}</p>
          )}
        </div>

        {/* Balance */}
        <div className="space-y-2">
          <label htmlFor="balance" className="text-sm font-medium">
            Initial Balance
          </label>
          <input
            id="balance"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("balance")}
            className="w-full px-3 py-2 border rounded-md text-sm bg-gray-800 text-white placeholder-gray-400 border-gray-600"
            // ✅ DARK INPUT
          />
          {errors.balance && (
            <p className="text-sm text-red-500">{errors.balance.message}</p>
          )}
        </div>

        {/* Switch */}
        <div className="flex items-center justify-between rounded-lg border border-gray-600 p-3">
          <div>
            <label htmlFor="isDefault" className="text-base font-medium">
              Set as Default
            </label>
            <p className="text-sm text-gray-400">
              This account will be selected by default for transactions
            </p>
          </div>
          <input
            type="checkbox"
            id="isDefault"
            checked={watch("isDefault")}
            onChange={(e) => setValue("isDefault", e.target.checked)}
            className="w-5 h-5 accent-blue-600"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <DrawerClose asChild>
            <button
              type="button"
              className="flex-1 border border-gray-500 text-gray-300 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </DrawerClose>
          <button
            type="submit"
            disabled={createAccountLoading}
            className={`flex-1 bg-blue-600 text-white py-2 rounded-md transition flex items-center justify-center ${
              createAccountLoading
                ? "opacity-75 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
          >
            {createAccountLoading ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Create Account"
            )}
          </button>
        </div>
      </form>
    </div>
  </DrawerContent>
</Drawer>

  );
}
