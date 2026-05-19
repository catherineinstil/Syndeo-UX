"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, MoreVertical, ArrowUpDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Outcome {
  id: string
  name: string
  description: string
  updated: string
}

const mockOutcomes: Outcome[] = [
  {
    id: "1",
    name: "Account Setup",
    description: "Guide users through the account creation process",
    updated: "2 days ago",
  },
  {
    id: "2",
    name: "Support Ticket",
    description: "Help users submit and track support requests",
    updated: "5 days ago",
  },
  {
    id: "fs-branch-locator",
    name: "FS_BranchLocator_V1",
    description:
      'The customer has asked where their nearest branch is. The customer may say something like "Where is my nearest branch?" or "I want to do this in branch".',
    updated: "Just now",
  },
  {
    id: "3",
    name: "Re-Mortgage",
    description: "Assist customers with remortgage applications and questions",
    updated: "1 week ago",
  },
  {
    id: "4",
    name: "Product Information",
    description: "Provide detailed information about products and services",
    updated: "1 week ago",
  },
  {
    id: "5",
    name: "Booking Appointment",
    description: "Schedule appointments with available agents",
    updated: "2 weeks ago",
  },
]

interface OutcomesListProps {
  onOutcomeClick: (outcomeId: string, outcomeName: string) => void // Pass outcome name along with ID
}

export function OutcomesList({ onOutcomeClick }: OutcomesListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOutcomes = mockOutcomes.filter(
    (outcome) =>
      outcome.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outcome.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="h-full flex flex-col bg-[#F6F8FA]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8F0FB] p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#3B4760]">Outcomes</h1>
            <p className="text-sm text-[#6A738A] mt-1">Manage conversation outcomes and goals</p>
          </div>
          <Button className="bg-[#2F8FFF] hover:bg-[#2680E8] text-white gap-2">
            <Plus className="w-4 h-4" />
            Create new Outcome
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A738A]" />
          <Input
            placeholder="Search outcomes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-[#E8F0FB] focus:border-[#2F8FFF] rounded-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-6">
        <Card className="border-2 border-[#E8F0FB]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F6F8FA] border-b border-[#E8F0FB]">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-[#3B4760]">
                    <div className="flex items-center gap-2">
                      Name
                      <ArrowUpDown className="w-4 h-4 text-[#6A738A]" />
                    </div>
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-[#3B4760]">
                    <div className="flex items-center gap-2">
                      Description
                      <ArrowUpDown className="w-4 h-4 text-[#6A738A]" />
                    </div>
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-[#3B4760]">
                    <div className="flex items-center gap-2">
                      Updated
                      <ArrowUpDown className="w-4 h-4 text-[#6A738A]" />
                    </div>
                  </th>
                  <th className="text-right p-4 text-sm font-semibold text-[#3B4760]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOutcomes.map((outcome) => (
                  <tr key={outcome.id} className="border-b border-[#E8F0FB] hover:bg-[#F6F8FA] transition-colors">
                    <td className="p-4">
                      <button
                        onClick={() => onOutcomeClick(outcome.id, outcome.name)}
                        className="text-sm font-medium text-[#2F8FFF] hover:underline"
                      >
                        {outcome.name}
                      </button>
                    </td>
                    <td className="p-4 text-sm text-[#6A738A]">{outcome.description}</td>
                    <td className="p-4 text-sm text-[#6A738A]">{outcome.updated}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-[#2F8FFF] border-[#2F8FFF] hover:bg-[#2F8FFF] hover:text-white bg-transparent"
                          onClick={() => onOutcomeClick(outcome.id, outcome.name)}
                        >
                          View
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Export</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
