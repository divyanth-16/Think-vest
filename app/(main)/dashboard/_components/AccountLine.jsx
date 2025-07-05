"use client";

import Link from 'next/link';
import React from 'react';

const AccountLine = ({ account }) => {
  const { name, type, balance, id } = account;

  return (
    <div className="bg-white text-black rounded-lg shadow-md p-4 w-64 hover:scale-105 transition-transform">
      <div className="flex items-start gap-2">
        <input type="checkbox" className="mt-1" />
        <div>
          <Link href={`/account/${id}`}>
            <div className="font-semibold text-lg cursor-pointer hover:underline">
              {name}
            </div>
            <p className="text-sm text-gray-700">{type.toUpperCase()} Account</p>
            <p className="text-md font-medium mt-1">${parseFloat(balance).toFixed(2)}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountLine;
