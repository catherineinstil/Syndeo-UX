"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Simulator } from "@/components/simulator"
import { ConversationEngagement } from "@/components/conversation-engagement"
import { ConnectedChannels } from "@/components/connected-channels"
import { SkillsExperts } from "@/components/skills-experts"
import { ChannelBreakdown } from "@/components/channel-breakdown"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { AddWidgetModal } from "@/components/add-widget-modal"
import { SplashScreen } from "@/components/splash-screen"
import type { JSX } from "react/jsx-runtime"

export default function DashboardPage() {
  const [showSplash, setShowSplash] = useState(true)
  const [showAddWidget, setShowAddWidget] = useState(false)
  const [activeWidgets, setActiveWidgets] = useState<string[]>([
    "simulator",
    "channel-breakdown",
    "conversation-engagement",
    "connected-channels",
    "skills-experts",
  ])

  const handleEnterPrototype = () => {
    setShowSplash(false)
  }

  const handleShowSplash = () => {
    setShowSplash(true)
  }

  const handleRemoveWidget = (widgetId: string) => {
    setActiveWidgets((prev) => prev.filter((id) => id !== widgetId))
  }

  const handleAddWidgets = (widgetIds: string[]) => {
    const leftColumnWidgets = ["conversations-closed", "messages-per-day"]
    const rightColumnWidgets = ["favorite-colors", "popular-platforms"]

    const newWidgets = [...activeWidgets]

    widgetIds.forEach((id) => {
      if (!newWidgets.includes(id)) {
        if (leftColumnWidgets.includes(id)) {
          const insertIndex = newWidgets.findIndex(
            (w) => !["simulator", "channel-breakdown"].includes(w) && !leftColumnWidgets.includes(w),
          )
          if (insertIndex === -1) {
            newWidgets.push(id)
          } else {
            newWidgets.splice(insertIndex, 0, id)
          }
        } else if (rightColumnWidgets.includes(id)) {
          newWidgets.push(id)
        } else {
          newWidgets.push(id)
        }
      }
    })

    setActiveWidgets(newWidgets)
    setShowAddWidget(false)
  }

  const renderWidget = (widgetId: string) => {
    const widgetComponents: Record<string, JSX.Element> = {
      simulator: <Simulator onRemove={() => handleRemoveWidget("simulator")} />,
      "channel-breakdown": <ChannelBreakdown onRemove={() => handleRemoveWidget("channel-breakdown")} />,
      "conversation-engagement": (
        <ConversationEngagement onRemove={() => handleRemoveWidget("conversation-engagement")} />
      ),
      "connected-channels": <ConnectedChannels onRemove={() => handleRemoveWidget("connected-channels")} />,
      "skills-experts": <SkillsExperts onRemove={() => handleRemoveWidget("skills-experts")} />,
      "conversations-closed": <ChannelBreakdown onRemove={() => handleRemoveWidget("conversations-closed")} />,
      "messages-per-day": <ChannelBreakdown onRemove={() => handleRemoveWidget("messages-per-day")} />,
      "favorite-colors": <ConnectedChannels onRemove={() => handleRemoveWidget("favorite-colors")} />,
      "popular-platforms": <SkillsExperts onRemove={() => handleRemoveWidget("popular-platforms")} />,
    }
    return widgetComponents[widgetId] || null
  }

  const leftColumnIds = [
    "simulator",
    "channel-breakdown",
    "conversations-closed",
    "messages-per-day",
    "conversation-engagement",
  ]
  const rightColumnIds = ["connected-channels", "skills-experts", "favorite-colors", "popular-platforms"]

  const leftWidgets = activeWidgets.filter((id) => leftColumnIds.includes(id))
  const rightWidgets = activeWidgets.filter((id) => rightColumnIds.includes(id))

  if (showSplash) {
    return <SplashScreen onEnter={handleEnterPrototype} />
  }

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Header onShowSplash={handleShowSplash} showingDashboard={!showSplash} />

      <main className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-[#3B4760]">Engagement Overview</h1>
          <Button
            onClick={() => setShowAddWidget(true)}
            variant="outline"
            className="gap-2 bg-white border-[#E8F0FB] text-[#3B4760] hover:bg-[#E8F0FB]"
          >
            <Plus className="h-4 w-4" />
            Add Widget
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {leftWidgets
                .filter((id) =>
                  ["simulator", "channel-breakdown", "conversations-closed", "messages-per-day"].includes(id),
                )
                .map((id) => (
                  <div key={id}>{renderWidget(id)}</div>
                ))}
            </div>
            {leftWidgets
              .filter((id) => ["conversation-engagement"].includes(id))
              .map((id) => (
                <div key={id}>{renderWidget(id)}</div>
              ))}
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-6">
            {rightWidgets.map((id) => (
              <div key={id}>{renderWidget(id)}</div>
            ))}
          </div>
        </div>
      </main>

      <AddWidgetModal
        open={showAddWidget}
        onClose={() => setShowAddWidget(false)}
        onAddWidgets={handleAddWidgets}
        activeWidgets={activeWidgets}
      />
    </div>
  )
}
