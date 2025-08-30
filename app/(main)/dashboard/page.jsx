import { CreateAccountDrawer } from "@/components/create-account-drawer";
import AccountLine from "./_components/AccountLine";
import { getDashboardData, getUserAccounts } from "@/actions/dashboard";

import { getCurrentBudget } from "@/actions/budget";
import { Progress } from "./_components/Progress";
import { Overview } from "./_components/Overview";


// ✅ Must be an async function if using server-side data
export default async function DashboardPage() {
   const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);
   console.log("hello");

  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className="min-h-screen text-white p-8 bg-[linear-gradient(to_right,_#2d2d2d,_#1a1a1a)]">


      {/* 🔥 Fancy Dashboard Title */}
      <h1 className="text-5xl font-extrabold mb-10 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white drop-shadow-md">
        Dashboard
      </h1>
      <Progress    initialBudget={budgetData?.budget}
        currentExpenses={budgetData?.currentExpenses || 0}/>

      <Overview accounts={accounts}
        transactions={transactions || []}
      />
      {/* ➕ Add Account Button */}
      <div className="mb-10">
        <CreateAccountDrawer>
          <div className="inline-block bg-gradient-to-r from-green-400 to-green-600 text-black font-bold px-6 py-3 rounded-xl shadow-lg cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            + Add Account
          </div>
        </CreateAccountDrawer>
      </div>

      {/* 🧾 Accounts Listed Horizontally */}
      {accounts.length > 0 && (
        <div className="flex flex-wrap gap-6">
          {accounts.map((account) => (
            <AccountLine key={account.id} account={account} />
          ))}
        </div>
      )}
    </div>
  );
}
