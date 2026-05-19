"use client"

import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface AgentCardProps {
  title: string
  description: string
  icon: LucideIcon
  iconColor: string
  onClick?: () => void
  hasVariants?: boolean
}

export function AgentCard({ title, description, icon: Icon, iconColor, onClick, hasVariants }: AgentCardProps) {
  return (
    <Card
      className={`bg-white border-[#E8F0FB] rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${
        hasVariants ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon className="h-6 w-6" style={{ color: iconColor }} />
        </div>

        <h4 className="text-base font-semibold text-[#3B4760] mb-3">{title}</h4>

        <p className="text-sm text-[#6A738A] leading-relaxed mb-4 flex-1">{description}</p>

        <p className="text-xs text-[#6A738A]">Published by Syndeo</p>
      </div>
    </Card>
  )
}
