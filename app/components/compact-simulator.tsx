"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChevronUp,
  ChevronDown,
  Play,
  MessageSquare,
  Zap,
  RefreshCw,
  Minimize2,
  Maximize2,
  ArrowLeftRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"

export function CompactSimulator() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Card
        className={`bg-white shadow-2xl border-2 border-[#2F8FFF] overflow-hidden transition-all duration-300 ${isMaximized ? "w-[500px]" : "w-64"}`}
      >
        <div
          className="bg-[#2F8FFF] px-4 py-3 flex items-center justify-between cursor-pointer"
          onClick={(e) => {
            if ((e.target as HTMLElement).tagName !== "BUTTON" && !(e.target as HTMLElement).closest("button")) {
              setIsExpanded(!isExpanded)
            }
          }}
        >
          <div className="flex items-center gap-3">
            <ArrowLeftRight className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">Simulator</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-[#2680E8]"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <Zap className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-[#2680E8]"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-[#2680E8]"
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(false)
              }}
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-[#2680E8]"
              onClick={(e) => {
                e.stopPropagation()
                setIsMaximized(!isMaximized)
              }}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-[#2680E8]"
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div>
            <div className="p-4 space-y-4 h-[400px] overflow-y-auto bg-[#F6F8FA]">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E8F0FB] flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-[#2F8FFF]" />
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-[#E8F0FB]">
                    <p className="text-sm text-[#3B4760]">Welcome! How can I help you today?</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <div className="flex-1 max-w-[70%]">
                  <div className="bg-[#2F8FFF] rounded-lg p-3 shadow-sm">
                    <p className="text-sm text-white">I need help with my account</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#6A738A] flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-white">U</span>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E8F0FB] flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-[#2F8FFF]" />
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-[#E8F0FB]">
                    <p className="text-sm text-[#3B4760]">I'd be happy to help! Can you provide your email address?</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#E8F0FB] bg-white">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  className="flex-1 text-sm border-[#E8F0FB] focus:border-[#2F8FFF]"
                />
                <Button size="icon" className="bg-[#2F8FFF] hover:bg-[#2680E8] text-white">
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
