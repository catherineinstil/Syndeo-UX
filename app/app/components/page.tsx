"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Copy, Eye, Home, Target, Globe, HelpCircle, Share2, Languages, MessageSquare, Mail, Settings, Boxes, Calendar, ClipboardList, ListChecks, Search, Plus, ChevronDown, MoreVertical, ArrowUpDown, Undo, ZoomIn, Pen, Users, MessageCircle, FileText, CircleHelp, Crosshair, Scale, FileCode, Braces, Bell, GitBranch, GitMerge, CornerDownRight, Zap, Maximize2 } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function ComponentsPage() {
  const [copiedId, setCopiedId] = useState<string>("")
  const [demoActiveTab, setDemoActiveTab] = useState("flow")
  const [configOpen, setConfigOpen] = useState(false)
  const router = useRouter()

  const copyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(""), 2000)
  }


  const navigationItems = [
    { id: "welcome", label: "Welcome", icon: Home },
    { id: "outcomes", label: "Outcomes", icon: Target },
    { id: "web-events", label: "Web Events", icon: Globe },
    { id: "faq", label: "FAQ", icon: HelpCircle },
    { id: "global-segues", label: "Global Segues", icon: Share2 },
    { id: "languages", label: "Languages", icon: Languages },
    { id: "responses", label: "Responses", icon: MessageSquare },
    { id: "default-messages", label: "Default Messages", icon: Mail },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "properties", label: "Properties", icon: Boxes },
    { id: "events", label: "Events", icon: Calendar },
    { id: "surveys", label: "Surveys", icon: ClipboardList },
    { id: "survey-selector", label: "Survey Selector", icon: ListChecks },
  ]

  const nodeTypes = [
    { label: "Message", icon: MessageCircle, color: "#3B4760" },
    { label: "Paragraph", icon: FileText, color: "#5A668E" },
    { label: "Question", icon: CircleHelp, color: "#4ECDC4" },
    { label: "Intent", icon: Crosshair, color: "#4ECDC4" },
    { label: "Decision", icon: Scale, color: "#E8A960" },
    { label: "Script", icon: FileCode, color: "#6A738A" },
    { label: "Variables", icon: Braces, color: "#6A738A" },
    { label: "Notify", icon: Bell, color: "#B8A5A5" },
    { label: "Flow", icon: GitBranch, color: "#9B6B9E" },
    { label: "Switch", icon: GitMerge, color: "#9B6B9E" },
    { label: "Route", icon: CornerDownRight, color: "#5A668E" },
    { label: "Web", icon: Globe, color: "#6FA8C4" },
    { label: "Catch", icon: Zap, color: "#3B4760" },
    { label: "End", icon: Maximize2, color: "#3B4760" },
  ]

  const codeSnippets = {
    nav: `// Global Navigation Component
<nav className="flex items-center gap-6 px-6 py-4">
  <button className="text-sm font-medium text-[#2F8FFF]">Home</button>
  <button className="text-sm font-medium text-[#6A738A]">Reports</button>
  <DropdownMenu>
    <DropdownMenuTrigger>Configuration</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>Profile Settings</DropdownMenuItem>
      <DropdownMenuItem>Team Management</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</nav>`,
    "flows-nav": `// Flows Navigation Menu
<nav className="space-y-1">
  {items.map((item) => (
    <button className="flex items-center gap-3 px-3 py-2 
      hover:bg-[#F6F8FA] text-[#6A738A]">
      <Icon className="w-4 h-4" />
      {item.label}
    </button>
  ))}
</nav>`,
    "outcomes-header": `// Outcomes Header
<div className="bg-white p-6 border border-[#E8F0FB] rounded-none">
  <div className="flex items-center justify-between mb-4">
    <div>
      <h3 className="text-2xl font-bold text-[#3B4760]">Outcomes</h3>
      <p className="text-sm text-[#6A738A]">Manage outcomes</p>
    </div>
    <Button className="bg-[#2F8FFF] rounded-none">
      <Plus /> Create new Outcome
    </Button>
  </div>
  <Input placeholder="Search..." className="rounded-none" />
</div>`,
    "outcomes-table": `// Outcomes Table
<table className="w-full">
  <thead className="bg-[#F6F8FA]">
    <tr>
      <th className="text-left p-4">Name</th>
      <th className="text-left p-4">Description</th>
      <th className="text-left p-4">Updated</th>
      <th className="text-right p-4">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b hover:bg-[#F6F8FA]">
      <td className="p-4 text-[#2F8FFF]">Account Setup</td>
      <td className="p-4 text-[#6A738A]">Guide users...</td>
      <td className="p-4 text-[#6A738A]">2 days ago</td>
      <td className="p-4">
        <Button variant="outline" className="rounded-none bg-transparent">View</Button>
        <DropdownMenu>
          <DropdownMenuTrigger><MoreVertical /></DropdownMenuTrigger>
        </DropdownMenu>
      </td>
    </tr>
  </tbody>
</table>`,
    "flow-tabs": `// Flow Tabs Component
<div className="flex gap-4 border-b border-[#E8F0FB]">
  {tabs.map((tab) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={\`px-4 py-2 border-b-2 transition-all \${
        activeTab === tab
          ? "border-[#2F8FFF] text-[#2F8FFF]"
          : "border-transparent text-[#6A738A]"
      }\`}
    >
      {tab}
    </button>
  ))}
</div>`,
    zoom: `// Zoom Control Panel
<Card className="w-36 bg-white border rounded-none">
  <div className="p-3">
    {/* Mini Canvas Preview */}
    <div className="w-full h-24 bg-[#F6F8FA] mb-3">
      {/* Minimap dots */}
    </div>
    
    {/* Zoom Controls */}
    <div className="flex items-center justify-between mb-3 bg-[#F6F8FA] px-2 py-1.5">
      <Button size="icon" onClick={zoomOut}>−</Button>
      <span>{zoom}%</span>
      <Button size="icon" onClick={zoomIn}>+</Button>
    </div>
    
    {/* Tool Icons */}
    <div className="flex gap-1.5 justify-center">
      <Button size="icon"><Home /></Button>
      <Button size="icon"><Undo /></Button>
      <Button size="icon"><ZoomIn /></Button>
      <Button size="icon"><Pen /></Button>
      <Button size="icon"><Settings /></Button>
      <Button size="icon"><Users /></Button>
    </div>
  </div>
</Card>`,
    "node-panel": `// Node Types Panel
<Card className="bg-white border rounded-none w-44">
  <div className="p-1.5 space-y-0.5">
    {nodeTypes.map((type) => (
      <button className="w-full flex items-center gap-2.5 
        px-2 py-1.5 hover:bg-[#F6F8FA]">
        <div className="w-8 h-8 flex items-center justify-center"
          style={{ backgroundColor: type.color }}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <span className="text-xs font-medium">{type.label}</span>
      </button>
    ))}
  </div>
</Card>`,
    "form-fields": `// Standard Form Fields
<div className="space-y-4">
  {/* Text Input */}
  <div>
    <Label>Text Input</Label>
    <Input placeholder="Enter text..." className="rounded-none" />
  </div>

  {/* Textarea */}
  <div>
    <Label>Textarea</Label>
    <Textarea placeholder="Enter description..." className="rounded-none" />
  </div>

  {/* Select Dropdown */}
  <div>
    <Label>Select</Label>
    <Select>
      <SelectTrigger className="rounded-none">
        <SelectValue placeholder="Choose option..." />
      </SelectTrigger>
      <SelectContent className="rounded-none">
        <SelectItem value="1">Option 1</SelectItem>
        <SelectItem value="2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  </div>

  {/* Checkbox */}
  <div className="flex items-center gap-2">
    <Checkbox id="check" className="rounded-none" />
    <Label htmlFor="check">Checkbox label</Label>
  </div>

  {/* Button */}
  <Button className="rounded-none bg-[#2F8FFF]">Submit</Button>
</div>`,
    grid: `// Canvas Grid Background
<div 
  className="bg-[#F6F8FA]"
  style={{
    backgroundImage: \`
      linear-gradient(to right, #E8F0FB 1px, transparent 1px),
      linear-gradient(to bottom, #E8F0FB 1px, transparent 1px)
    \`,
    backgroundSize: "20px 20px"
  }}
/>`,
  }

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Simple Header */}
      <div className="border-b border-[#E8F0FB] bg-white">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="gap-2 text-[#6A738A] hover:text-[#3B4760] rounded-none"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Splash Screen
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-[1600px]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#3B4760] mb-2">SYNDEO Component Library</h1>
          <p className="text-[#6A738A]">Engineering reference for UX components from prototype</p>
        </div>

        {/* Global Navigation */}
        <Card className="p-6 mb-8 bg-white rounded-none border border-[#E8F0FB]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#3B4760]">Global Top Navigation</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyCode(codeSnippets.nav, "nav")}
              className="gap-2 rounded-none"
            >
              {copiedId === "nav" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copiedId === "nav" ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="bg-[#F6F8FA] p-6 rounded-none">
            <nav className="bg-white border border-[#E8F0FB] rounded-none">
              <div className="flex items-center gap-6 px-6 py-4">
                <button className="text-sm font-medium text-[#2F8FFF]">Home</button>
                <button className="text-sm font-medium text-[#6A738A] hover:text-[#3B4760]">Reports</button>
                <button className="text-sm font-medium text-[#6A738A] hover:text-[#3B4760]">AI Agents</button>
                <button className="text-sm font-medium text-[#6A738A] hover:text-[#3B4760]">AI Workbench</button>
                <button className="text-sm font-medium text-[#6A738A] hover:text-[#3B4760]">Flows</button>
                <button className="text-sm font-medium text-[#6A738A] hover:text-[#3B4760]">Channels</button>
                <DropdownMenu open={configOpen} onOpenChange={setConfigOpen}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-[#6A738A] hover:text-[#3B4760]">
                    Configuration
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-none">
                    <DropdownMenuItem className="rounded-none">Profile Settings</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-none">Team Management</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-none">API Keys</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-none">Integrations</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </nav>
          </div>
        </Card>

        {/* Flows Left Navigation */}
        <Card className="p-6 mb-8 bg-white rounded-none border border-[#E8F0FB]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#3B4760]">Flows Left Navigation Menu</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyCode(codeSnippets["flows-nav"], "flows-nav")}
              className="gap-2 rounded-none"
            >
              {copiedId === "flows-nav" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copiedId === "flows-nav" ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="bg-[#F6F8FA] p-6 rounded-none">
            <div className="bg-white rounded-none border border-[#E8F0FB] max-w-xs p-4">
              <h3 className="text-lg font-semibold text-[#3B4760] mb-4">Your Flows</h3>
              <nav className="space-y-1">
                {navigationItems.map((item, idx) => {
                  const Icon = item.icon
                  const isActive = idx === 0
                  return (
                    <button
                      key={item.id}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#E8F0FB] text-[#2F8FFF] border-l-4 border-[#2F8FFF]"
                          : "text-[#6A738A] hover:bg-[#F6F8FA] hover:text-[#3B4760]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>
        </Card>

        {/* Outcomes Header Section */}
        <Card className="p-6 mb-8 bg-white rounded-none border border-[#E8F0FB]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#3B4760]">Outcomes Header with Search Bar</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyCode(codeSnippets["outcomes-header"], "outcomes-header")}
              className="gap-2 rounded-none"
            >
              {copiedId === "outcomes-header" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copiedId === "outcomes-header" ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="bg-[#F6F8FA] p-6 rounded-none">
            <div className="bg-white p-6 rounded-none border border-[#E8F0FB]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#3B4760]">Outcomes</h3>
                  <p className="text-sm text-[#6A738A] mt-1">Manage conversation outcomes and goals</p>
                </div>
                <Button className="bg-[#2F8FFF] hover:bg-[#2680E8] text-white gap-2 rounded-none">
                  <Plus className="w-4 h-4" />
                  Create new Outcome
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A738A]" />
                <Input placeholder="Search outcomes..." className="pl-10 rounded-none border-[#E8F0FB]" />
              </div>
            </div>
          </div>
        </Card>

        {/* Outcomes Table */}
        <Card className="p-6 mb-8 bg-white rounded-none border border-[#E8F0FB]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#3B4760]">Outcomes Table</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyCode(codeSnippets["outcomes-table"], "outcomes-table")}
              className="gap-2 rounded-none"
            >
              {copiedId === "outcomes-table" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copiedId === "outcomes-table" ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="bg-[#F6F8FA] p-6 rounded-none">
            <div className="bg-white rounded-none border border-[#E8F0FB] overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#F6F8FA] border-b border-[#E8F0FB]">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#3B4760]">
                        Name
                        <ArrowUpDown className="w-4 h-4 text-[#6A738A]" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#3B4760]">
                        Description
                        <ArrowUpDown className="w-4 h-4 text-[#6A738A]" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#3B4760]">
                        Updated
                        <ArrowUpDown className="w-4 h-4 text-[#6A738A]" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-[#3B4760]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#E8F0FB] hover:bg-[#F6F8FA]">
                    <td className="px-6 py-4 text-sm text-[#2F8FFF] font-medium">Account Setup</td>
                    <td className="px-6 py-4 text-sm text-[#6A738A]">Guide users through account creation</td>
                    <td className="px-6 py-4 text-sm text-[#6A738A]">2 days ago</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-none border-[#2F8FFF] text-[#2F8FFF] bg-transparent"
                        >
                          View
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-none">
                            <DropdownMenuItem className="rounded-none">Edit</DropdownMenuItem>
                            <DropdownMenuItem className="rounded-none">Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="rounded-none">Export</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 rounded-none">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-[#E8F0FB] hover:bg-[#F6F8FA]">
                    <td className="px-6 py-4 text-sm text-[#2F8FFF] font-medium">Support Ticket</td>
                    <td className="px-6 py-4 text-sm text-[#6A738A]">Help users submit support requests</td>
                    <td className="px-6 py-4 text-sm text-[#6A738A]">5 days ago</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-none border-[#2F8FFF] text-[#2F8FFF] bg-transparent"
                        >
                          View
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-none">
                            <DropdownMenuItem className="rounded-none">Edit</DropdownMenuItem>
                            <DropdownMenuItem className="rounded-none">Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="rounded-none">Export</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 rounded-none">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Outcome Flow Header with Tabs */}
        <Card className="p-6 mb-8 bg-white rounded-none border border-[#E8F0FB]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#3B4760]">Outcome Flow Header with Interactive Tabs</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyCode(codeSnippets["flow-tabs"], "flow-tabs")}
              className="gap-2 rounded-none"
            >
              {copiedId === "flow-tabs" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copiedId === "flow-tabs" ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="bg-[#F6F8FA] p-6 rounded-none">
            <div className="bg-white rounded-none border border-[#E8F0FB]">
              <div className="px-6 py-4 border-b border-[#E8F0FB]">
                <h3 className="text-lg font-semibold text-[#3B4760] mb-3">Account Setup</h3>
                <div className="flex gap-4 border-b border-[#E8F0FB] -mb-4">
                  {["flow", "statements", "details"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setDemoActiveTab(tab)}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
                        demoActiveTab === tab
                          ? "border-[#2F8FFF] text-[#2F8FFF]"
                          : "border-transparent text-[#6A738A] hover:text-[#3B4760]"
                      }`}
                    >
                      {tab === "flow" ? "Outcome Flow" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-6 text-[#6A738A] bg-[#F6F8FA] rounded-none">
                Active tab: <span className="font-semibold text-[#2F8FFF]">{demoActiveTab}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Zoom Controls - Complete Component */}
        <Card className="p-6 mb-8 bg-white rounded-none border border-[#E8F0FB]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#3B4760]">Canvas Zoom Control Panel</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyCode(codeSnippets.zoom, "zoom")}
              className="gap-2 rounded-none"
            >
              {copiedId === "zoom" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copiedId === "zoom" ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="bg-[#F6F8FA] p-6 rounded-none">
            <Card className="inline-block bg-white border border-[#E8F0FB] shadow-xl overflow-hidden rounded-none w-36">
              <div className="p-3">
                {/* Minimap */}
                <div className="w-full h-24 bg-[#F6F8FA] rounded-none relative overflow-hidden mb-3 border border-[#E8F0FB]">
                  <div className="absolute w-1 h-1 bg-[#3B4760] rounded-none" style={{ left: "20%", top: "20%" }} />
                  <div className="absolute w-1 h-1 bg-[#4ECDC4] rounded-none" style={{ left: "50%", top: "40%" }} />
                  <div className="absolute w-1 h-1 bg-[#E8A960] rounded-none" style={{ left: "30%", top: "60%" }} />
                  <div className="absolute w-1 h-1 bg-[#6FA8C4] rounded-none" style={{ left: "60%", top: "70%" }} />
                  <div
                    className="absolute border-2 border-[#2F8FFF] bg-[#2F8FFF]/10 rounded-none"
                    style={{ width: "35%", height: "25%", left: "10%", top: "10%" }}
                  />
                </div>

                {/* Zoom controls - tighter spacing */}
                <div className="flex items-center justify-between mb-2 bg-[#F6F8FA] rounded-none px-2 py-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-white text-[#2F8FFF] font-bold text-base rounded-none"
                  >
                    −
                  </Button>
                  <span className="font-semibold text-sm text-[#3B4760]">100%</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-white text-[#2F8FFF] font-bold text-base rounded-none"
                  >
                    +
                  </Button>
                </div>

                {/* Toolbar icons - tighter spacing */}
                <div className="flex items-center justify-center gap-1 pb-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:bg-[#E8F0FB] text-[#6A738A] hover:text-[#3B4760] rounded-none"
                    title="Home"
                  >
                    <Home className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:bg-[#E8F0FB] text-[#6A738A] hover:text-[#3B4760] rounded-none"
                    title="Undo"
                  >
                    <Undo className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:bg-[#E8F0FB] text-[#6A738A] hover:text-[#3B4760] rounded-none"
                    title="Zoom"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:bg-[#E8F0FB] text-[#6A738A] hover:text-[#3B4760] rounded-none"
                    title="Edit"
                  >
                    <Pen className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:bg-[#E8F0FB] text-[#6A738A] hover:text-[#3B4760] rounded-none"
                    title="Settings"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:bg-[#E8F0FB] text-[#6A738A] hover:text-[#3B4760] rounded-none"
                    title="Users"
                  >
                    <Users className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </Card>

        {/* Node Types Panel - Complete */}
        <Card className="p-6 mb-8 bg-white rounded-none border border-[#E8F0FB]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#3B4760]">Flow Node Types Panel (Complete)</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyCode(codeSnippets["node-panel"], "node-panel")}
              className="gap-2 rounded-none"
            >
              {copiedId === "node-panel" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copiedId === "node-panel" ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="bg-[#F6F8FA] p-6 rounded-none">
            <Card className="inline-block bg-white border border-[#E8F0FB] shadow-lg overflow-hidden rounded-none w-44">
              <div className="p-1.5 space-y-0.5">
                {nodeTypes.map((nodeType) => {
                  const Icon = nodeType.icon
                  return (
                    <button
                      key={nodeType.label}
                      className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-none hover:bg-[#F6F8FA] transition-colors text-left"
                    >
                      <div
                        className="w-8 h-8 flex items-center justify-center rounded-none shadow-sm flex-shrink-0"
                        style={{ backgroundColor: nodeType.color }}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-medium text-[#6A738A]">{nodeType.label}</span>
                    </button>
                  )
                })}
              </div>
            </Card>
          </div>
        </Card>

        {/* Form Fields & Controls */}
        <Card className="p-6 mb-8 bg-white rounded-none border border-[#E8F0FB]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#3B4760]">Form Fields & Controls</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyCode(codeSnippets["form-fields"], "form-fields")}
              className="gap-2 rounded-none"
            >
              {copiedId === "form-fields" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copiedId === "form-fields" ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="bg-[#F6F8FA] p-6 rounded-none">
            <div className="bg-white border border-[#E8F0FB] rounded-none p-6 max-w-md">
              <div className="space-y-4">
                {/* Text Input */}
                <div>
                  <Label className="text-xs font-medium text-[#6A738A] mb-1.5 block">Text Input</Label>
                  <Input placeholder="Enter text..." className="rounded-none border-[#E8F0FB]" />
                </div>

                {/* Textarea */}
                <div>
                  <Label className="text-xs font-medium text-[#6A738A] mb-1.5 block">Textarea</Label>
                  <Textarea placeholder="Enter description..." className="rounded-none border-[#E8F0FB] min-h-20" />
                </div>

                {/* Select Dropdown */}
                <div>
                  <Label className="text-xs font-medium text-[#6A738A] mb-1.5 block">Select Dropdown</Label>
                  <Select>
                    <SelectTrigger className="rounded-none border-[#E8F0FB]">
                      <SelectValue placeholder="Choose an option..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-none">
                      <SelectItem value="option1" className="rounded-none">
                        Option 1
                      </SelectItem>
                      <SelectItem value="option2" className="rounded-none">
                        Option 2
                      </SelectItem>
                      <SelectItem value="option3" className="rounded-none">
                        Option 3
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-2">
                  <Checkbox id="checkbox-demo" className="rounded-none" />
                  <Label htmlFor="checkbox-demo" className="text-sm text-[#6A738A] cursor-pointer">
                    Checkbox option
                  </Label>
                </div>

                {/* Button */}
                <Button className="w-full rounded-none bg-[#2F8FFF] hover:bg-[#2680E8] text-white">
                  Submit Form
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Canvas Grid Background */}
        <Card className="p-6 mb-8 bg-white rounded-none border border-[#E8F0FB]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#3B4760]">Canvas Grid Background Pattern</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyCode(codeSnippets.grid, "grid")}
              className="gap-2 rounded-none"
            >
              {copiedId === "grid" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copiedId === "grid" ? "Copied" : "Copy"}
            </Button>
          </div>

          <div className="bg-[#F6F8FA] p-6 rounded-none">
            <div
              className="bg-[#F6F8FA] h-64 rounded-none border border-[#E8F0FB]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #E8F0FB 1px, transparent 1px),
                  linear-gradient(to bottom, #E8F0FB 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
            >
              <div className="flex items-center justify-center h-full text-[#6A738A] text-sm">
                20px × 20px Grid Pattern
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
