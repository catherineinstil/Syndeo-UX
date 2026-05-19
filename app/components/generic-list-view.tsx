"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, MoreVertical, ArrowUpDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface GenericListViewProps {
  title: string
  type: string
}

// Mock data generator
const generateMockData = (type: string) => {
  const baseData = [
    { id: "1", name: `${type} Item 1`, description: `Description for ${type} item 1`, updated: "2 days ago" },
    { id: "2", name: `${type} Item 2`, description: `Description for ${type} item 2`, updated: "5 days ago" },
    { id: "3", name: `${type} Item 3`, description: `Description for ${type} item 3`, updated: "1 week ago" },
    { id: "4", name: `${type} Item 4`, description: `Description for ${type} item 4`, updated: "2 weeks ago" },
  ]
  return baseData
}

export function GenericListView({ title, type }: GenericListViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const mockData = generateMockData(type)

  const filteredData = mockData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="h-full flex flex-col bg-[#F6F8FA]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8F0FB] p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#3B4760]">{title}</h1>
            <p className="text-sm text-[#6A738A] mt-1">Manage your {title.toLowerCase()}</p>
          </div>
          <Button className="bg-[#2F8FFF] hover:bg-[#2680E8] text-white gap-2">
            <Plus className="w-4 h-4" />
            Create new {title.slice(0, -1)}
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A738A]" />
          <Input
            placeholder={`Search ${title.toLowerCase()}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-[#E8F0FB] focus:border-[#2F8FFF]"
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
                {filteredData.map((item) => (
                  <tr key={item.id} className="border-b border-[#E8F0FB] hover:bg-[#F6F8FA] transition-colors">
                    <td className="p-4">
                      <span className="text-sm font-medium text-[#2F8FFF]">{item.name}</span>
                    </td>
                    <td className="p-4 text-sm text-[#6A738A]">{item.description}</td>
                    <td className="p-4 text-sm text-[#6A738A]">{item.updated}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-[#2F8FFF] border-[#2F8FFF] hover:bg-[#2F8FFF] hover:text-white bg-transparent"
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
