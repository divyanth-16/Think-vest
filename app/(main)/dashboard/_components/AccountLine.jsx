"use client";

import Link from 'next/link';
import React from 'react'

const AccountLine = ({account}) => {
 const { name, type, balance, id, isDefault } = account;

  return (
     <div><input type="checkbox"></input>
   <Link href={`/account/${id}`} >
    <div>{name} </div>
        <p>
            {type}{" "}
            Account
          </p>
      <p> ${parseFloat(account.balance).toFixed(2)}</p>
    </Link>
    </div>
  )
}

export default AccountLine