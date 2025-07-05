import { CreateAccountDrawer } from "@/components/create-account-drawer";
import React from 'react'
import AccountLine from "./_components/AccountLine";
import { getUserAccounts } from "@/actions/dashboard";

async function Dashboard() {

  const accounts = await getUserAccounts();
  return (
    <div className='mt-5 ml-25'>
      <h1 className='text-white text-4xl  font-bold '>
       Dashboard
      </h1>
      <div className='mt-5'>
        <CreateAccountDrawer>
          <div className="bg-white text-black font-semibold px-5 py-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-300 hover:scale-105 transition duration-300 w-40 text-center">
             Add Account
           </div>
        </CreateAccountDrawer>
        
        {accounts.length > 0 &&
          accounts?.map((account) => (
            <AccountLine key={account.id} account={account} />
          ))}
      </div>
    </div>
  )
}

export default Dashboard