"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MessageSquare, Maximize2, Minimize2, MoreVertical, Trash2 } from "lucide-react"

interface SimulatorProps {
  onRemove?: () => void
}

export function Simulator({ onRemove }: SimulatorProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="bg-primary text-primary-foreground border-0 relative overflow-hidden transition-all hover:shadow-lg">
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-lg font-semibold">Simulator</h2>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary/90 h-8 w-8"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            {onRemove && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/90 h-8 w-8">
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
        </div>

        <div className="flex-1 flex items-center justify-center min-h-[180px]">
          <div className="text-center space-y-3">
            <MessageSquare className="h-12 w-12 mx-auto opacity-90" />
            <p className="text-primary-foreground/90 text-sm">Test conversation flows</p>
            <Button variant="secondary" size="sm" className="bg-card text-primary hover:bg-card/90">
              Start Testing
            </Button>
          </div>
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
    </Card>
  )
}
