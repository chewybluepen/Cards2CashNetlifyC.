import { NetflixLoading } from "@/components/ui/netflix-loading"

export default function MonthlyGrowthLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#000000]">
      <NetflixLoading size="lg" />
      <p className="mt-4 text-lg text-white">Loading growth data...</p>
    </div>
  )
}

