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
    <div>
      <h1>{editId ? "Edit" : "Add"} Transaction</h1>
      <TransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}


