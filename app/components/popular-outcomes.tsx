"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreVertical, Trash2 } from "lucide-react"
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const data = [
  { outcome: "Account Setup", count: 1247 },
  { outcome: "Support Ticket", count: 1089 },
  { outcome: "Re-Mortgage", count: 892 },
  { outcome: "Balance Inquiry", count: 756 },
  { outcome: "Payment Issue", count: 634 },
  { outcome: "Product Info", count: 521 },
  { outcome: "Transfer Funds", count: 478 },
  { outcome: "Update Details", count: 423 },
  { outcome: "Complaint", count: 367 },
  { outcome: "Loan Application", count: 298 },
]

const COLORS = [
  "#2F8FFF", // Syndeo Blue
  "#3B82F6", // Blue
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#F59E0B", // Orange
  "#10B981", // Green
  "#14B8A6", // Teal
  "#F97316", // Orange variant
  "#6366F1", // Indigo
  "#84CC16", // Lime
]

interface PopularOutcomesProps {
  onRemove?: () => void
}

export function PopularOutcomes({ onRemove }: PopularOutcomesProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-semibold text-foreground">Most Popular Outcomes - Top 10</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-secondary">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onRemove && (
                <DropdownMenuItem onClick={onRemove} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Button
            variant="outline"
            className="w-full justify-start text-sm bg-card border-border text-foreground hover:bg-secondary"
          >
            12 Months
          </Button>
        </div>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: 20, right: 20, top: 5, bottom: 60 }}>
              <XAxis
                dataKey="outcome"
                angle={-45}
                textAnchor="end"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                height={80}
              />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-popover p-2 border border-border rounded shadow-lg">
                        <p className="text-sm font-medium text-popover-foreground">{payload[0].payload.outcome}</p>
                        <p className="text-sm text-muted-foreground">{payload[0].value} conversations</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
