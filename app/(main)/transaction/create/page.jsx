import { getUserAccounts } from "@/actions/dashboard";
import React from 'react'
import TransactionForm from "../_components/TransactionForm";
import { defaultCategories } from "@/data/categories";

export default async function AddTransaction({ searchParams }) {
     const accounts = await getUserAccounts();

  return (
    <div>
        <h1>Add Transaction</h1>
        <TransactionForm  accounts={accounts}
        categories={defaultCategories}
        />
    </div>
  )
}

