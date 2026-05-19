import { Card } from "@/components/ui/card"
import { Sparkles, Workflow, Target } from "lucide-react"

export function WelcomeView() {
  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#3B4760] mb-2">Welcome to Flows</h1>
          <p className="text-lg text-[#6A738A]">
            Build intelligent conversation flows with our visual editor. Design, test, and deploy conversational
            experiences across all your channels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-2 border-[#E8F0FB] hover:border-[#2F8FFF] transition-all">
            <div className="w-12 h-12 rounded-lg bg-[#E8F0FB] flex items-center justify-center mb-4">
              <Workflow className="w-6 h-6 text-[#2F8FFF]" />
            </div>
            <h3 className="text-lg font-semibold text-[#3B4760] mb-2">Visual Flow Builder</h3>
            <p className="text-sm text-[#6A738A]">
              Drag and drop nodes to create complex conversation flows with branching logic, integrations, and more.
            </p>
          </Card>

          <Card className="p-6 border-2 border-[#E8F0FB] hover:border-[#2F8FFF] transition-all">
            <div className="w-12 h-12 rounded-lg bg-[#E8F0FB] flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-[#2F8FFF]" />
            </div>
            <h3 className="text-lg font-semibold text-[#3B4760] mb-2">Outcomes & Goals</h3>
            <p className="text-sm text-[#6A738A]">
              Define business outcomes and track how your conversations drive results across all customer touchpoints.
            </p>
          </Card>

          <Card className="p-6 border-2 border-[#E8F0FB] hover:border-[#2F8FFF] transition-all">
            <div className="w-12 h-12 rounded-lg bg-[#E8F0FB] flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-[#2F8FFF]" />
            </div>
            <h3 className="text-lg font-semibold text-[#3B4760] mb-2">Test & Simulate</h3>
            <p className="text-sm text-[#6A738A]">
              Use the built-in simulator to test your flows in real-time before deploying to production channels.
            </p>
          </Card>
        </div>

        <Card className="mt-8 p-6 bg-[#E8F0FB] border-2 border-[#2F8FFF]">
          <h3 className="text-lg font-semibold text-[#3B4760] mb-2">Getting Started</h3>
          <ul className="space-y-2 text-sm text-[#6A738A]">
            <li className="flex items-start gap-2">
              <span className="text-[#2F8FFF] font-bold">1.</span>
              <span>Navigate to Outcomes to create your first conversation goal</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2F8FFF] font-bold">2.</span>
              <span>Use the visual canvas to build your conversation flow</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2F8FFF] font-bold">3.</span>
              <span>Test your flow using the simulator widget</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2F8FFF] font-bold">4.</span>
              <span>Deploy to your connected channels and monitor performance</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
