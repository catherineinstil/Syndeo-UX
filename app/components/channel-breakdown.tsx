"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Trash2 } from "lucide-react"

const COLORS = {
  Facebook: "#0866FF",
  Slack: "#611F69",
  Voice: "#DC2626",
  Web: "#2F8FFF",
  WhatsApp: "#25D366",
}

const data = [
  { name: "Facebook", value: 14, color: COLORS.Facebook },
  { name: "Slack", value: 16, color: COLORS.Slack },
  { name: "Voice", value: 18, color: COLORS.Voice },
  { name: "Web", value: 24, color: COLORS.Web },
  { name: "WhatsApp", value: 28, color: COLORS.WhatsApp },
]

interface ChannelBreakdownProps {
  onRemove?: () => void
}

export function ChannelBreakdown({ onRemove }: ChannelBreakdownProps) {
  console.log("[v0] Channel data with colors:", data)

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground">Channel Breakdown</CardTitle>
          {onRemove && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-secondary">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onRemove} className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                stroke="white"
                strokeWidth={2}
              >
                {data.map((entry, index) => {
                  console.log(`[v0] Cell ${index}: ${entry.name} with color ${entry.color}`)
                  return <Cell key={`cell-${index}`} fill={entry.color} style={{ fill: entry.color }} />
                })}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-popover p-2 border border-border rounded shadow-lg">
                        <p className="text-sm font-medium text-popover-foreground">{payload[0].name}</p>
                        <p className="text-sm text-muted-foreground">{payload[0].value}%</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                content={({ payload }) => (
                  <div className="flex flex-wrap justify-center gap-3 mt-2">
                    {payload?.map((entry, index) => {
                      const dataEntry = data.find((d) => d.name === entry.value)
                      const legendColor = dataEntry?.color || entry.color
                      console.log(`[v0] Legend ${entry.value}: color ${legendColor}`)
                      return (
                        <div key={`legend-${index}`} className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: legendColor }} />
                          <span className="text-xs text-muted-foreground">{entry.value}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
