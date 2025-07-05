import { getAccountWithTransactions } from '@/actions/account';
import React from 'react'

export default async function AccountsPage({ params }) {
  const accountData = await getAccountWithTransactions(params.id);

  const {transactions, ...account } = accountData

  return (
    <div>
      <div>{account.name}</div>
         <p>
            {account.type}{" "}
            ACCOUNT
          </p>
           <div>
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p>
            {account._count.transactions} Transactions
          </p>
    </div>
    
  )
}

