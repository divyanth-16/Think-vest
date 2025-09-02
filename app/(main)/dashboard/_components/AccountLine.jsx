"use client";

import Link from 'next/link'; 
import React from 'react';

const AccountLine = ({ account }) => {
  const { name, type, balance, id } = account;

  return (
    <div className="bg-white text-black rounded-lg shadow-md p-4 w-64 hover:scale-105 transition-transform">
      <div className="flex items-start gap-2">
        <input type="checkbox" className="mt-1" />
        <div>
          <Link href={`/account/${id}`}>
            <div className="font-semibold text-lg cursor-pointer hover:underline">
              {name}
            </div>
            <p className="text-sm text-gray-700">{type.toUpperCase()} Account</p>
            <p className="text-md font-medium mt-1">${parseFloat(balance).toFixed(2)}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};


import React, { useEffect } from 'react';
import { Switch } from "@/components/ui/switch"; 
import { updateDefaultAccount } from '@/actions/account';
import useFetch from '@/hooks/use-fetch';
import { toast } from 'sonner';
import { Loader2 } from "lucide-react";

const AccountLine = ({ account }) => {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need at least 1 default account");
      return;
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Link href={`/account/${id}`}>
      <div
        className="
          bg-[#1e1e1e] 
          text-white 
          rounded-xl 
          shadow-md 
          p-5 
          w-64 
          h-fit
          transition 
          transform 
          hover:scale-105 
          hover:shadow-xl 
          
          hover:border hover:border-green-500
          duration-300
          cursor-pointer
        "
      >
         {/* Loader Overlay */}
        {updateDefaultLoading && (
          <div
            className="
              absolute 
              inset-0 
              bg-black/60 
              flex 
              items-center 
              justify-center 
              rounded-xl
              z-20
            "
          >
            <Loader2 className="h-8 w-8 text-green-400 animate-spin font-bold" />
               </div>
        )}
        {/* Switch at the top */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-300">Enable Default</span>
          <div className="relative">
            <Switch
              className="data-[state=checked]:bg-green-500"
              checked={isDefault}
              onClick={handleDefaultChange}
              disabled={updateDefaultLoading}
            />
           
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <div>
            <div className="text-lg font-bold hover:underline">
              {name}
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {type.toUpperCase()} ACCOUNT
            </p>
            <p className="text-green-400 font-semibold mt-2 text-md">
              ${parseFloat(balance).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};


export default AccountLine;
