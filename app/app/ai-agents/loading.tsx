import { Header } from "@/components/header"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Header />
      <div className="flex">
        <aside className="w-64 bg-white border-r border-[#E8F0FB] min-h-[calc(100vh-64px)]">
          <div className="p-6">
            <div className="h-6 w-32 bg-[#E8F0FB] rounded animate-pulse mb-4" />
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-8 bg-[#F6F8FA] rounded animate-pulse" />
              ))}
            </div>
          </div>
        </aside>
        <div className="flex-1 p-8">
          <div className="h-12 bg-[#E8F0FB] rounded-lg mb-6 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-white rounded-lg border border-[#E8F0FB] animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
