import { FlowsWorkspace } from "@/components/flows-workspace"
import { Header } from "@/components/header"

export default function FlowsPage() {
  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <Header />
      <FlowsWorkspace />
    </div>
  )
}
