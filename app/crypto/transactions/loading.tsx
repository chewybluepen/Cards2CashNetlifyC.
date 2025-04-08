import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { CryptoNavigation } from "@/components/crypto-navigation"

export default function CryptoTransactionsLoading() {
  return (
    <div className="container px-4 py-6 space-y-6">
      <CryptoNavigation />

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Transaction History</h1>

        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center p-4">
                <Skeleton className="w-10 h-10 rounded-full mr-4" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <div className="text-right space-y-2">
                  <Skeleton className="h-4 w-20 ml-auto" />
                  <Skeleton className="h-3 w-16 ml-auto" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

