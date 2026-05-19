"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreVertical, Trash2 } from "lucide-react"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const data = [
  { day: "Day 1", WhatsApp: 0.22, Web: 0.18, Slack: 0.15, Facebook: 0.12, Voice: 0.1 },
  { day: "Day 2", WhatsApp: 0.24, Web: 0.19, Slack: 0.16, Facebook: 0.13, Voice: 0.11 },
  { day: "Day 3", WhatsApp: 0.23, Web: 0.2, Slack: 0.17, Facebook: 0.14, Voice: 0.12 },
  { day: "Day 4", WhatsApp: 0.26, Web: 0.21, Slack: 0.18, Facebook: 0.15, Voice: 0.13 },
  { day: "Day 5", WhatsApp: 0.28, Web: 0.22, Slack: 0.19, Facebook: 0.16, Voice: 0.14 },
  { day: "Day 6", WhatsApp: 0.27, Web: 0.23, Slack: 0.2, Facebook: 0.17, Voice: 0.15 },
  { day: "Day 7", WhatsApp: 0.3, Web: 0.24, Slack: 0.21, Facebook: 0.18, Voice: 0.16 },
  { day: "Day 8", WhatsApp: 0.29, Web: 0.25, Slack: 0.22, Facebook: 0.19, Voice: 0.17 },
  { day: "Day 9", WhatsApp: 0.31, Web: 0.26, Slack: 0.23, Facebook: 0.2, Voice: 0.18 },
  { day: "Day 10", WhatsApp: 0.33, Web: 0.27, Slack: 0.24, Facebook: 0.21, Voice: 0.19 },
  { day: "Day 11", WhatsApp: 0.32, Web: 0.28, Slack: 0.25, Facebook: 0.22, Voice: 0.2 },
  { day: "Day 12", WhatsApp: 0.34, Web: 0.29, Slack: 0.26, Facebook: 0.23, Voice: 0.21 },
  { day: "Day 13", WhatsApp: 0.36, Web: 0.3, Slack: 0.27, Facebook: 0.24, Voice: 0.22 },
  { day: "Day 14", WhatsApp: 0.35, Web: 0.31, Slack: 0.28, Facebook: 0.25, Voice: 0.23 },
  { day: "Day 15", WhatsApp: 0.37, Web: 0.32, Slack: 0.29, Facebook: 0.26, Voice: 0.24 },
  { day: "Day 16", WhatsApp: 0.39, Web: 0.33, Slack: 0.3, Facebook: 0.27, Voice: 0.25 },
  { day: "Day 17", WhatsApp: 0.38, Web: 0.34, Slack: 0.31, Facebook: 0.28, Voice: 0.26 },
  { day: "Day 18", WhatsApp: 0.4, Web: 0.35, Slack: 0.32, Facebook: 0.29, Voice: 0.27 },
  { day: "Day 19", WhatsApp: 0.39, Web: 0.36, Slack: 0.33, Facebook: 0.3, Voice: 0.28 },
  { day: "Day 20", WhatsApp: 0.41, Web: 0.37, Slack: 0.34, Facebook: 0.31, Voice: 0.29 },
  { day: "Day 21", WhatsApp: 0.43, Web: 0.38, Slack: 0.35, Facebook: 0.32, Voice: 0.3 },
  { day: "Day 22", WhatsApp: 0.42, Web: 0.39, Slack: 0.36, Facebook: 0.33, Voice: 0.31 },
  { day: "Day 23", WhatsApp: 0.44, Web: 0.4, Slack: 0.37, Facebook: 0.34, Voice: 0.32 },
  { day: "Day 24", WhatsApp: 0.43, Web: 0.41, Slack: 0.38, Facebook: 0.35, Voice: 0.33 },
  { day: "Day 25", WhatsApp: 0.45, Web: 0.42, Slack: 0.39, Facebook: 0.36, Voice: 0.34 },
  { day: "Day 26", WhatsApp: 0.44, Web: 0.43, Slack: 0.4, Facebook: 0.37, Voice: 0.35 },
  { day: "Day 27", WhatsApp: 0.46, Web: 0.44, Slack: 0.41, Facebook: 0.38, Voice: 0.36 },
  { day: "Day 28", WhatsApp: 0.45, Web: 0.45, Slack: 0.42, Facebook: 0.39, Voice: 0.37 },
  { day: "Day 29", WhatsApp: 0.47, Web: 0.46, Slack: 0.43, Facebook: 0.4, Voice: 0.38 },
  { day: "Day 30", WhatsApp: 0.48, Web: 0.47, Slack: 0.44, Facebook: 0.41, Voice: 0.39 },
]

const channelColors = {
  WhatsApp: "#25D366",
  Web: "#2F8FFF",
  Slack: "#611F69",
  Facebook: "#0866FF",
  Voice: "#8B5CF6",
}

interface ConversationEngagementProps {
  onRemove?: () => void
}

export function ConversationEngagement({ onRemove }: ConversationEngagementProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-semibold text-foreground">Conversation Engagement by Platform</CardTitle>
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
        <div className="flex items-center gap-2 mt-4">
          <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:bg-secondary">
            12 months
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs bg-secondary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            30 days
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:bg-secondary">
            7 days
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:bg-secondary">
            24 hours
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" hide />
              <YAxis domain={[0, 0.6]} hide />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-popover p-2 border border-border rounded shadow-lg">
                        <p className="text-sm font-medium text-popover-foreground mb-1">{payload[0].payload.day}</p>
                        {payload.map((entry, index) => (
                          <div key={index} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                              <span className="text-xs text-muted-foreground">{entry.name}</span>
                            </div>
                            <span className="text-xs font-medium">{(Number(entry.value) * 100).toFixed(1)}%</span>
                          </div>
                        ))}
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="WhatsApp"
                stroke={channelColors.WhatsApp}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Web"
                stroke={channelColors.Web}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Slack"
                stroke={channelColors.Slack}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Facebook"
                stroke={channelColors.Facebook}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Voice"
                stroke={channelColors.Voice}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                content={({ payload }) => (
                  <div className="flex flex-wrap justify-center gap-3 mt-2">
                    {payload?.map((entry, index) => (
                      <div key={`legend-${index}`} className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-xs text-muted-foreground">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
