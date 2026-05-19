export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#2F8FFF] border-r-transparent"></div>
        <p className="mt-4 text-sm text-gray-600">Loading AI Workbench...</p>
      </div>
    </div>
  )
}
