"use client";

import Link from 'next/link';
import React from 'react';

const AccountLine = ({ account }) => {
  const { name, type, balance, id } = account;

  return (
    <div className="bg-[#1e1e1e] text-white rounded-xl shadow-md p-5 w-64 h-fit">
      <div className="flex gap-3 items-start">
        <input type="checkbox" className="mt-1 cursor-pointer" />
        <div>
          <Link href={`/account/${id}`}>
            <div className="text-lg font-bold hover:underline cursor-pointer">
              {name}
            </div>
            <p className="text-sm text-gray-400 mt-1">{type.toUpperCase()} ACCOUNT</p>
            <p className="text-green-400 font-semibold mt-2 text-md">
              ${parseFloat(balance).toFixed(2)}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountLine;
