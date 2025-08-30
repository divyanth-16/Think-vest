'use client';

import { useEffect, useState } from "react";
import TransactionForm from "../_components/TransactionForm";
import { defaultCategories } from "@/data/categories";
import { getTransaction } from "@/actions/transaction";
import { getUserAccounts } from "@/actions/dashboard";

export default function AddTransactionClient({ searchParams }) {
  const [accounts, setAccounts] = useState([]);
  const [initialData, setInitialData] = useState(null);

  const editId = searchParams?.edit;

  useEffect(() => {
    async function fetchData() {
      const accounts = await getUserAccounts();
      setAccounts(accounts);

      if (editId) {
        const transaction = await getTransaction(editId);
        setInitialData(transaction);
      }
    }

    fetchData();
  }, [editId]);

  return (
    <div className="min-h-screen text-white p-8 bg-[linear-gradient(to_right,_#2d2d2d,_#1a1a1a)]">
      <TransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}
