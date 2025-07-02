"use client";

import React from 'react'
import { transactionSchema } from "@/app/lib/schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import useFetch from '@/hooks/use-fetch';
import { createTransaction } from '@/actions/transaction';

const TransactionForm = ({ accounts,
  categories}) => {
    useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues:
       {
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
  } = useFetch( createTransaction);
  return (
    <div>TransactionForm</div>
  )
}

export default TransactionForm