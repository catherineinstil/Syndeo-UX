"use client"

import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Header />

      <main className="container mx-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#3B4760]">Reports</h1>
          <p className="text-sm text-[#6B7280] mt-1">Analytics and insights from your conversations</p>
        </div>

        {/* Under Development Message */}
        <Card className="bg-white border-[#E8F0FB]">
          <CardContent className="p-12">
            <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="h-16 w-16 rounded-full bg-[#E8F0FB] flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-[#2F8FFF]" />
              </div>
              <h2 className="text-xl font-semibold text-[#3B4760] mb-2">Reports Coming Soon</h2>
              <p className="text-[#6B7280] leading-relaxed">
                This section is currently under development. Advanced reporting and analytics features will be available
                here soon, including detailed conversation insights, performance metrics, and custom report generation.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
