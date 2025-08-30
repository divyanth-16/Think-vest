'use client';

import { useEffect, useState } from "react";
import TransactionForm from "../_components/TransactionForm";
import { defaultCategories } from "@/data/categories";
import { getTransaction } from "@/actions/transaction";
import { getUserAccounts } from "@/actions/dashboard";
import AIReceiptScanner from "../_components/AIReceiptScanner";// ✅ Import your scanner

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

  // ✅ Callback to receive scanned data
  const handleScanComplete = (scannedData) => {
    setInitialData((prev) => ({
      ...prev,
      ...scannedData,
    }));
  };

  return (
    <div className="min-h-screen text-white p-8 bg-[linear-gradient(to_right,_#2d2d2d,_#1a1a1a)] space-y-8">

      <div className="max-w-2xl w-full mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-3 tracking-tight">Add New Transaction</h2>
          <p className="text-gray-400 text-lg">Effortlessly manage your finances with precise tracking.</p>
        </div>

      {/* ✅ AI Receipt Scanner Button */}
      <AIReceiptScanner onScanComplete={handleScanComplete} />
        </div>

      {/* ✅ Transaction Form */}
      <TransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}