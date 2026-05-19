"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Eye, Edit, Trash2 } from "lucide-react"

const integrations = [
  {
    id: "fs-branch-information",
    name: "FS_BranchInformation",
    description:
      "A collection of integration functions that are used by the FS BranchLocator Agent to find the nearest branch to the customer and details for that branch.",
    functions: ["BranchLocator", "BranchOpeningHours"],
  },
]

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Header />

      <main className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-[#E8F0FB] min-h-[calc(100vh-64px)]">
          <div className="p-6">
            <h2 className="text-base font-semibold text-[#3B4760] mb-4">Your Integrations</h2>
            <nav className="space-y-1">
              <button className="w-full text-left px-4 py-2 text-sm rounded-md transition-colors relative text-[#3B4760] font-medium bg-[#E8F0FB]">
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#2F8FFF] rounded-r" />
                Groups
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-[#3B4760]">Your Integrations</h1>
            <Button className="bg-[#2F8FFF] hover:bg-[#2680E8] text-white gap-2">
              <Plus className="w-4 h-4" />
              Create New Integration Group
            </Button>
          </div>

          <Card className="border-2 border-[#E8F0FB]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F6F8FA] border-b border-[#E8F0FB]">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-[#3B4760]">NAME</th>
                    <th className="text-left p-4 text-sm font-semibold text-[#3B4760]">DESCRIPTION</th>
                    <th className="text-right p-4 text-sm font-semibold text-[#3B4760]">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {integrations.map((integration) => (
                    <tr key={integration.id} className="border-b border-[#E8F0FB] hover:bg-[#F6F8FA] transition-colors">
                      <td className="p-4">
                        <span className="text-sm font-medium text-[#3B4760]">{integration.name}</span>
                      </td>
                      <td className="p-4 text-sm text-[#6A738A]">{integration.description}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-[#2F8FFF] border-[#2F8FFF] hover:bg-[#E8F0FB] bg-transparent"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-[#6A738A] hover:text-[#3B4760]">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-[#6A738A] hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
