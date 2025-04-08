import { Suspense } from "react"
import { ArrowDownLeft, ArrowUpRight, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { CryptoNavigation } from "@/components/crypto-navigation"
import { PageTransition } from "@/components/page-transition"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface Transaction {
  id: string
  type: "buy" | "sell"
  cryptoAmount: number
  cryptoSymbol: string
  fiatAmount: number
  fiatCurrency: string
  timestamp: string
  status: "completed" | "pending" | "failed"
}

// Mock data for transactions
const transactions: Transaction[] = [
  {
    id: "tx1",
    type: "buy",
    cryptoAmount: 0.05,
    cryptoSymbol: "BTC",
    fiatAmount: 2500,
    fiatCurrency: "USD",
    timestamp: "2023-04-15T10:30:00Z",
    status: "completed",
  },
  {
    id: "tx2",
    type: "sell",
    cryptoAmount: 0.5,
    cryptoSymbol: "ETH",
    fiatAmount: 1200,
    fiatCurrency: "USD",
    timestamp: "2023-04-10T14:45:00Z",
    status: "completed",
  },
  {
    id: "tx3",
    type: "buy",
    cryptoAmount: 100,
    cryptoSymbol: "ADA",
    fiatAmount: 45,
    fiatCurrency: "USD",
    timestamp: "2023-04-05T09:15:00Z",
    status: "completed",
  },
  {
    id: "tx4",
    type: "buy",
    cryptoAmount: 0.01,
    cryptoSymbol: "BTC",
    fiatAmount: 500,
    fiatCurrency: "USD",
    timestamp: "2023-04-01T16:20:00Z",
    status: "pending",
  },
]

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

function TransactionsList() {
  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <Card key={tx.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center p-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                  tx.type === "buy" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}
              >
                {tx.type === "buy" ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <p className="font-medium">
                  {tx.type === "buy" ? "Bought" : "Sold"} {tx.cryptoAmount} {tx.cryptoSymbol}
                </p>
                <p className="text-sm text-muted-foreground">{formatDate(tx.timestamp)}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {tx.type === "buy" ? "-" : "+"}
                  {tx.fiatCurrency} {tx.fiatAmount.toFixed(2)}
                </p>
                <p
                  className={`text-sm ${
                    tx.status === "completed"
                      ? "text-green-600"
                      : tx.status === "pending"
                        ? "text-amber-600"
                        : "text-red-600"
                  }`}
                >
                  {tx.status === "pending" && <Clock className="inline h-3 w-3 mr-1" />}
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function CryptoTransactionsPage() {
  return (
    <PageTransition>
      <div className="container px-4 py-6 space-y-6">
        <CryptoNavigation />

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Transaction History</h1>

          <Suspense fallback={<LoadingSpinner />}>
            <TransactionsList />
          </Suspense>
        </div>
      </div>
    </PageTransition>
  )
}

