"use client"

import { AIAssistant } from "@/components/ai-assistant"
import { Card } from "@/components/ui/card"
import { CheckCircle2, MessageSquare, Globe, BarChart3 } from "lucide-react"

export function HomepageNewUser() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Create your first flow",
      description: "Build a conversational flow to handle customer interactions",
      status: "pending" as const,
    },
    {
      icon: Globe,
      title: "Connect a channel",
      description: "Link your bot to Facebook, WhatsApp, or web chat",
      status: "pending" as const,
    },
    {
      icon: BarChart3,
      title: "Monitor conversations",
      description: "Track engagement and analyze bot performance",
      status: "locked" as const,
    },
  ]

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-b from-[#F6F8FA] to-white">
      <div className="container mx-auto px-6 py-5 h-full flex flex-col">
        {/* Welcome Header */}
        <div className="mb-4 shrink-0">
          <h1 className="text-2xl font-bold text-[#3B4760] mb-1">Welcome to Syndeo</h1>
          <p className="text-sm text-[#6A738A]">Let's get your conversational AI agent up and running</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          {/* AI Assistant - Main Focus */}
          <div className="lg:col-span-2 min-h-0">
            <AIAssistant isNewUser={true} />
          </div>

          {/* Getting Started Checklist */}
          <div className="lg:col-span-1 flex flex-col gap-4 min-h-0">
            <Card className="bg-white border border-[#E8F0FB] rounded-lg p-5 shrink-0">
              <h3 className="text-base font-semibold text-[#3B4760] mb-4">Getting Started</h3>
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div key={index} className="flex gap-3">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          step.status === "completed"
                            ? "bg-[#10B981] text-white"
                            : step.status === "pending"
                              ? "bg-[#E8F0FB] text-[#2F8FFF]"
                              : "bg-[#F6F8FA] text-[#94A3B8]"
                        }`}
                      >
                        {step.status === "completed" ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`text-sm font-medium ${
                            step.status === "locked" ? "text-[#94A3B8]" : "text-[#3B4760]"
                          }`}
                        >
                          {step.title}
                        </h4>
                        <p
                          className={`text-xs mt-0.5 ${
                            step.status === "locked" ? "text-[#94A3B8]" : "text-[#6A738A]"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Resources Card */}
            <Card className="bg-white border border-[#E8F0FB] rounded-lg p-5 shrink-0">
              <h3 className="text-base font-semibold text-[#3B4760] mb-3">Learn More</h3>
              <div className="space-y-2.5">
                <a href="#" className="block text-sm text-[#2F8FFF] hover:text-[#1E7FEF] hover:underline">
                  📖 Platform documentation
                </a>
                <a href="#" className="block text-sm text-[#2F8FFF] hover:text-[#1E7FEF] hover:underline">
                  🎥 Video tutorials
                </a>
                <a href="#" className="block text-sm text-[#2F8FFF] hover:text-[#1E7FEF] hover:underline">
                  💬 Community forum
                </a>
                <a href="#" className="block text-sm text-[#2F8FFF] hover:text-[#1E7FEF] hover:underline">
                  📧 Contact support
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
