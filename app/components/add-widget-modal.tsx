"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis } from "recharts"

const conversationsData = [
  { name: "Paid Advice", value: 40 },
  { name: "User Inactivity", value: 30 },
  { name: "Closed by Expert", value: 30 },
]

const messagesData = [
  { day: "8/1/25", count: 50000 },
  { day: "9/1/25", count: 75000 },
  { day: "10/1/25", count: 60000 },
  { day: "11/1/25", count: 90000 },
  { day: "12/1/25", count: 100000 },
  { day: "1/2/26", count: 95000 },
  { day: "2/2/26", count: 110000 },
]

const platformsData = [
  { name: "Telegram", value: 60 },
  { name: "WhatsApp", value: 40 },
]

const colorData = [
  { name: "Red", value: 25 },
  { name: "Green", value: 25 },
  { name: "Blue", value: 25 },
  { name: "Yellow", value: 25 },
]

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

interface AddWidgetModalProps {
  open: boolean
  onClose: () => void
  onAddWidgets: (widgetIds: string[]) => void
  activeWidgets: string[]
}

export function AddWidgetModal({ open, onClose, onAddWidgets, activeWidgets }: AddWidgetModalProps) {
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([])

  const widgets = [
    {
      id: "conversations-closed",
      title: "Conversations Closed - By Reason",
      description: "Last 7 Days",
      chart: (
        <ResponsiveContainer width="100%" height={120}>
          <RechartsPie>
            <Pie data={conversationsData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value">
              {conversationsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </RechartsPie>
        </ResponsiveContainer>
      ),
    },
    {
      id: "messages-per-day",
      title: "Messages per Day",
      description: "Last 7 Days",
      chart: (
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={messagesData}>
            <XAxis dataKey="day" hide />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      id: "favorite-colors",
      title: "lol",
      description: "Favorite Colors (Example)",
      chart: (
        <ResponsiveContainer width="100%" height={120}>
          <RechartsPie>
            <Pie data={colorData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value">
              {colorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </RechartsPie>
        </ResponsiveContainer>
      ),
    },
    {
      id: "popular-platforms",
      title: "Most Popular Platforms",
      description: "Last 7 Days",
      chart: (
        <ResponsiveContainer width="100%" height={120}>
          <RechartsPie>
            <Pie data={platformsData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value">
              {platformsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "hsl(var(--chart-2))" : "hsl(var(--primary))"} />
              ))}
            </Pie>
          </RechartsPie>
        </ResponsiveContainer>
      ),
    },
  ]

  const toggleWidget = (widgetId: string) => {
    setSelectedWidgets((prev) => (prev.includes(widgetId) ? prev.filter((id) => id !== widgetId) : [...prev, widgetId]))
  }

  const handleSave = () => {
    onAddWidgets(selectedWidgets)
    setSelectedWidgets([])
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col bg-card">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-xl font-semibold text-foreground">Add Report</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            {widgets.map((widget) => (
              <Card
                key={widget.id}
                className={`p-4 cursor-pointer transition-all border-2 ${
                  selectedWidgets.includes(widget.id)
                    ? "border-primary bg-secondary shadow-md"
                    : "border-border hover:border-primary hover:shadow-sm"
                } ${activeWidgets.includes(widget.id) ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => !activeWidgets.includes(widget.id) && toggleWidget(widget.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-sm text-foreground flex-1 pr-2">{widget.title}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:bg-secondary flex-shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-muted-foreground cursor-default">
                        <span className="text-xs">Preview only</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {widget.chart}
                <p className="text-xs text-muted-foreground mt-2">{widget.description}</p>
                {activeWidgets.includes(widget.id) && (
                  <p className="text-xs text-primary mt-1 font-medium">Already added</p>
                )}
              </Card>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border flex-shrink-0 bg-card">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-secondary bg-transparent font-medium"
          >
            Add Custom Report
          </Button>
          <Button
            onClick={handleSave}
            disabled={selectedWidgets.length === 0}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save ({selectedWidgets.length})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
