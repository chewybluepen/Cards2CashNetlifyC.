"use client"

import dynamic from "next/dynamic"

const TransactionHistory = dynamic(() => import("./TransactionHistoryClient"), { ssr: false })

export default function TransactionsPage() {
  return <TransactionHistory />
}
