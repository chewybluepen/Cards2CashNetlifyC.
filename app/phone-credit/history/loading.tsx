import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function PhoneCreditHistoryLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#000000]">
      <header className="sticky top-0 z-10 bg-[#141414] p-4 shadow-sm">
        <div className="flex items-center">
          <Skeleton className="h-10 w-10 rounded-full bg-[#333333]" />
          <Skeleton className="ml-4 h-6 w-48 bg-[#333333]" />
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4 bg-[#141414] border-[#333333]">
          <CardHeader>
            <Skeleton className="h-6 w-40 bg-[#333333]" />
            <Skeleton className="h-4 w-60 bg-[#333333]" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <Skeleton className="h-10 flex-1 bg-[#333333]" />
              <Skeleton className="h-10 w-full sm:w-[180px] bg-[#333333]" />
              <Skeleton className="h-10 w-full sm:w-[180px] bg-[#333333]" />
            </div>
          </CardContent>
        </Card>

        <Skeleton className="h-10 w-full bg-[#333333] mb-4" />

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="bg-[#141414] border-[#333333]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Skeleton className="h-10 w-10 rounded-full bg-[#333333] mr-4" />
                    <div>
                      <Skeleton className="h-5 w-32 bg-[#333333]" />
                      <Skeleton className="h-3 w-24 bg-[#333333] mt-1" />
                    </div>
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-5 w-20 bg-[#333333]" />
                    <Skeleton className="h-3 w-16 bg-[#333333] mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 z-10 w-full border-t border-[#333333] bg-[#141414]">
        <div className="grid h-16 grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <Skeleton className="h-6 w-6 rounded-full bg-[#333333] mb-1" />
              <Skeleton className="h-3 w-12 bg-[#333333]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

