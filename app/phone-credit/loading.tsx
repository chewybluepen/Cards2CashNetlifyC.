import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function PhoneCreditLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#000000]">
      <header className="sticky top-0 z-10 bg-[#141414] p-4 shadow-sm">
        <div className="flex items-center">
          <Skeleton className="h-10 w-10 rounded-full bg-[#333333]" />
          <div className="ml-4 space-y-2">
            <Skeleton className="h-5 w-40 bg-[#333333]" />
            <Skeleton className="h-4 w-32 bg-[#333333]" />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <div className="mb-6">
          <Skeleton className="h-10 w-full bg-[#333333] mb-6" />

          <Card className="bg-[#141414] border-[#333333] mb-6">
            <CardHeader>
              <Skeleton className="h-6 w-40 bg-[#333333]" />
              <Skeleton className="h-4 w-60 bg-[#333333]" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-lg bg-[#333333]" />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#141414] border-[#333333] mb-6">
            <CardHeader>
              <Skeleton className="h-6 w-40 bg-[#333333]" />
              <Skeleton className="h-4 w-60 bg-[#333333]" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full bg-[#333333]" />
              <Skeleton className="h-10 w-full bg-[#333333]" />
              <Skeleton className="h-20 w-full bg-[#333333]" />
              <Skeleton className="h-20 w-full bg-[#333333]" />
              <Skeleton className="h-10 w-full bg-[#333333]" />
            </CardContent>
          </Card>

          <Card className="bg-[#141414] border-[#333333]">
            <CardHeader>
              <Skeleton className="h-6 w-40 bg-[#333333]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-start">
                    <Skeleton className="h-8 w-8 rounded-full bg-[#333333] mr-4" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-40 bg-[#333333]" />
                      <Skeleton className="h-4 w-full bg-[#333333]" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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

