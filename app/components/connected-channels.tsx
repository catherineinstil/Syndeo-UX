"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Globe,
  Monitor,
  MessageCircle,
  Facebook,
  MessageSquare,
  Smartphone,
  Slack,
  Mail,
  Send,
  Phone,
  Check,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Trash2 } from "lucide-react"
import Link from "next/link"

const channels = [
  { id: "web-1", name: "Web", count: 5, icon: Globe, color: "#5B6B8C" },
  { id: "desktop", name: "Desktop", count: 1, icon: Monitor, color: "#808A9F" },
  { id: "dialogflow-cx", name: "DialogFlow CX", count: 1, icon: MessageCircle, color: "#2F8FFF" },
  { id: "facebook", name: "Facebook", count: 1, icon: Facebook, color: "#0866FF" },
  { id: "line", name: "Line", count: 1, icon: MessageSquare, color: "#00C300" },
  { id: "mobile", name: "Mobile", count: 1, icon: Smartphone, color: "#6A738A" },
  { id: "slack", name: "Slack", count: 1, icon: Slack, color: "#611F69" },
  { id: "sms", name: "SMS", count: 1, icon: Mail, color: "#64B5F6" },
  { id: "telegram", name: "Telegram", count: 1, icon: Send, color: "#0088CC" },
  { id: "voice", name: "Voice", count: 1, icon: Phone, color: "#D32F2F" },
  { id: "whatsapp", name: "WhatsApp", count: 1, icon: Check, color: "#25D366" },
]

interface ConnectedChannelsProps {
  onRemove?: () => void
}

export function ConnectedChannels({ onRemove }: ConnectedChannelsProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground">Connected Channels</CardTitle>
          <div className="flex items-center gap-2">
            <Link href="/channels">
              <Button variant="link" className="text-xs text-primary p-0 h-auto hover:text-primary/80">
                View all
              </Button>
            </Link>
            {onRemove && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:bg-secondary">
                    <MoreVertical className="h-3 w-3" />
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
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {channels.map((channel) => {
          const Icon = channel.icon
          return (
            <Link key={channel.id} href={`/channels/${channel.id}`}>
              <div className="flex items-center justify-between p-3 rounded-lg border bg-card border-border hover:border-muted-foreground/30 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" style={{ color: channel.color }} />
                  <span className="text-sm font-medium text-foreground">{channel.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{channel.count}</span>
              </div>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}
