"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import {
  MessageSquare,
  HelpCircle,
  GitBranch,
  Code,
  Workflow,
  Globe,
  FileText,
  Variable,
  Bell,
  ArrowLeft,
  Save,
  Maximize2,
  X,
  Plus,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  Link,
  Smile,
  Settings,
  MoreVertical,
  Pencil,
  Trash2,
  AlignLeft,
  Target,
  Scale,
  Zap,
  Home,
  Undo,
  ZoomIn,
  Pen,
  Users,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type NodeType =
  | "message"
  | "paragraph"
  | "question"
  | "intent"
  | "decision"
  | "script"
  | "variables"
  | "notify"
  | "flow"
  | "switch"
  | "route"
  | "web"
  | "catch"
  | "end"

interface Node {
  id: string
  type: NodeType
  label: string
  x: number
  y: number
  connections: string[]
}

const nodeTypes: Array<{ type: NodeType; label: string; icon: any; color: string }> = [
  { type: "message", label: "Message", icon: MessageSquare, color: "#3B4760" },
  { type: "paragraph", label: "Paragraph", icon: AlignLeft, color: "#5A668E" },
  { type: "question", label: "Question", icon: HelpCircle, color: "#4ECDC4" },
  { type: "intent", label: "Intent", icon: Target, color: "#4ECDC4" },
  { type: "decision", label: "Decision", icon: Scale, color: "#E8A960" },
  { type: "script", label: "Script", icon: FileText, color: "#6A738A" },
  { type: "variables", label: "Variables", icon: Variable, color: "#6A738A" },
  { type: "notify", label: "Notify", icon: Bell, color: "#B8A5A5" },
  { type: "flow", label: "Flow", icon: Workflow, color: "#9B6B9E" },
  { type: "switch", label: "Switch", icon: GitBranch, color: "#9B6B9E" },
  { type: "route", label: "Route", icon: ArrowLeft, color: "#5A668E" },
  { type: "web", label: "Web", icon: Globe, color: "#6FA8C4" },
  { type: "catch", label: "Catch", icon: Zap, color: "#3B4760" },
  { type: "end", label: "End", icon: Maximize2, color: "#3B4760" },
]

const initialNodes: Node[] = [
  { id: "1", type: "message", label: "Welcome message", x: 600, y: 150, connections: ["2"] },
  { id: "2", type: "question", label: "Ask for email", x: 600, y: 350, connections: ["3"] },
  { id: "3", type: "decision", label: "If user says yes", x: 600, y: 550, connections: ["4", "5"] },
  { id: "4", type: "message", label: "Send confirmation", x: 450, y: 750, connections: [] },
  { id: "5", type: "web", label: "API call", x: 750, y: 750, connections: [] },
]

interface FlowCanvasProps {
  outcomeId: string
  outcomeName: string // Add outcome name prop
  onBack: () => void
}

type TabType = "flow" | "statements" | "details"

export function FlowCanvas({ outcomeId, outcomeName, onBack }: FlowCanvasProps) {
  // Accept outcome name
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState<TabType>("flow")
  const [zoom, setZoom] = useState(100)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)
  const [statements, setStatements] = useState<string[]>(["test"])
  const [newStatement, setNewStatement] = useState("")
  const [showStatementsInfo, setShowStatementsInfo] = useState(false)
  const [showDetailsInfo, setShowDetailsInfo] = useState(false)

  const getNodeColor = (type: NodeType) => {
    return nodeTypes.find((nt) => nt.type === type)?.color || "#6A738A"
  }

  const handleNodeMouseDown = (nodeId: string, e: React.MouseEvent) => {
    const node = nodes.find((n) => n.id === nodeId)
    if (!node) return

    setDraggedNode(nodeId)
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y,
    })
  }

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning) {
        const dx = e.clientX - panStart.x
        const dy = e.clientY - panStart.y
        setPanOffset({ x: panOffset.x + dx, y: panOffset.y + dy })
        setPanStart({ x: e.clientX, y: e.clientY })
        return
      }

      if (!draggedNode) return

      const canvasRect = canvasRef.current?.getBoundingClientRect()
      if (!canvasRect) return

      const x = Math.round((e.clientX - canvasRect.left - dragOffset.x) / 20) * 20
      const y = Math.round((e.clientY - canvasRect.top - dragOffset.y) / 20) * 20

      setNodes((prevNodes) => prevNodes.map((node) => (node.id === draggedNode ? { ...node, x, y } : node)))
    },
    [draggedNode, dragOffset, isPanning, panStart, panOffset],
  )

  const handleMouseUp = () => {
    setDraggedNode(null)
    setIsPanning(false)
  }

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).tagName === "svg") {
      setIsPanning(true)
      setPanStart({ x: e.clientX, y: e.clientY })
    }
  }

  const getConnectionPath = (fromNode: Node, toNode: Node, label?: string) => {
    const startX = fromNode.x + 100
    const startY = fromNode.y + 60
    const endX = toNode.x + 100
    const endY = toNode.y

    const midY = (startY + endY) / 2

    return {
      path: `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`,
      labelX: (startX + endX) / 2,
      labelY: midY,
    }
  }

  const handleEditNode = (nodeId: string) => {
    console.log("[v0] Edit node:", nodeId)
    // TODO: Implement edit functionality
  }

  const handleDeleteNode = (nodeId: string) => {
    console.log("[v0] Delete node:", nodeId)
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId))
  }

  return (
    <div className="h-full flex flex-col bg-[#F6F8FA]">
      {/* Header with Breadcrumb/Tabs */}
      <div className="bg-white border-b border-[#E8F0FB] px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-[#F6F8FA]">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-[#3B4760]">{outcomeName}</h1>
              <p className="text-sm text-[#6A738A]">OUTCOME</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="bg-[#2F8FFF] hover:bg-[#2680E8] text-white gap-2">
              <Save className="w-4 h-4" />
              Save
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-[#E8F0FB] -mb-4">
          <button
            onClick={() => setActiveTab("flow")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "flow"
                ? "border-[#2F8FFF] text-[#2F8FFF]"
                : "border-transparent text-[#6A738A] hover:text-[#3B4760]"
            }`}
          >
            Outcome Flow
          </button>
          <button
            onClick={() => setActiveTab("statements")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "statements"
                ? "border-[#2F8FFF] text-[#2F8FFF]"
                : "border-transparent text-[#6A738A] hover:text-[#3B4760]"
            }`}
          >
            Customer Statements
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "details"
                ? "border-[#2F8FFF] text-[#2F8FFF]"
                : "border-transparent text-[#6A738A] hover:text-[#3B4760]"
            }`}
          >
            Outcome Details
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "flow" && (
        <div className="flex-1 flex overflow-hidden">
          {/* Canvas */}
          <div className="flex-1 relative">
            <div
              ref={canvasRef}
              className="h-full overflow-hidden bg-[#F6F8FA] cursor-move"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseDown={handleCanvasMouseDown}
              style={{
                backgroundImage: `
                  linear-gradient(to right, #E8F0FB 1px, transparent 1px),
                  linear-gradient(to bottom, #E8F0FB 1px, transparent 1px)
                `,
                backgroundSize: `${20 * (zoom / 100)}px ${20 * (zoom / 100)}px`,
                backgroundPosition: `${panOffset.x}px ${panOffset.y}px`,
              }}
            >
              <div
                style={{
                  transform: `scale(${zoom / 100}) translate(${panOffset.x / (zoom / 100)}px, ${panOffset.y / (zoom / 100)}px)`,
                  transformOrigin: "top left",
                  width: "2000px",
                  height: "2000px",
                  position: "relative",
                }}
              >
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="8"
                      markerHeight="8"
                      refX="7"
                      refY="4"
                      orient="auto"
                      fill="#A0AEC0"
                    >
                      <path d="M 0 0 L 8 4 L 0 8 Z" />
                    </marker>
                  </defs>
                  {nodes.map((node) =>
                    node.connections.map((targetId, idx) => {
                      const targetNode = nodes.find((n) => n.id === targetId)
                      if (!targetNode) return null

                      const connection = getConnectionPath(node, targetNode)
                      const label = node.connections.length > 1 ? (idx === 0 ? "success" : "failure") : undefined

                      return (
                        <g key={`${node.id}-${targetId}`}>
                          <path
                            d={connection.path}
                            stroke="#A0AEC0"
                            strokeWidth="2"
                            fill="none"
                            markerEnd="url(#arrowhead)"
                            className="transition-all duration-200"
                          />
                          <circle
                            cx={connection.path.split(" ")[1]}
                            cy={connection.path.split(" ")[2]}
                            r="4"
                            fill={getNodeColor(node.type)}
                          />
                          <circle
                            cx={targetNode.x + 100}
                            cy={targetNode.y}
                            r="4"
                            fill={getNodeColor(targetNode.type)}
                          />
                          {label && (
                            <text
                              x={connection.labelX}
                              y={connection.labelY - 5}
                              textAnchor="middle"
                              className="text-xs fill-[#6A738A] font-medium"
                            >
                              {label}
                            </text>
                          )}
                        </g>
                      )
                    }),
                  )}
                </svg>

                {nodes.map((node) => {
                  const Icon = nodeTypes.find((nt) => nt.type === node.type)?.icon || MessageSquare
                  const nodeColor = getNodeColor(node.type)
                  return (
                    <Card
                      key={node.id}
                      className="absolute cursor-move transition-all duration-200 hover:shadow-xl border-none shadow-lg"
                      style={{
                        left: node.x,
                        top: node.y,
                        width: 200,
                        backgroundColor: nodeColor,
                        zIndex: draggedNode === node.id ? 10 : 2,
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation()
                        handleNodeMouseDown(node.id, e)
                      }}
                    >
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-4 h-4 text-white" />
                          <span className="text-[10px] font-bold text-white uppercase tracking-wider">{node.type}</span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                className="ml-auto w-5 h-5 rounded hover:bg-white/20 flex items-center justify-center transition-colors"
                                onClick={(e) => e.stopPropagation()}
                                onMouseDown={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="w-3.5 h-3.5 text-white" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-36">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleEditNode(node.id)
                                }}
                                className="gap-2 cursor-pointer"
                              >
                                <Pencil className="w-4 h-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteNode(node.id)
                                }}
                                className="gap-2 cursor-pointer text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="text-sm font-medium text-white">{node.label}</p>
                      </div>
                      {/* Connection points */}
                      <div
                        className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2"
                        style={{ borderColor: nodeColor }}
                      />
                      <div
                        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2"
                        style={{ borderColor: nodeColor }}
                      />
                    </Card>
                  )
                })}
              </div>
            </div>

            <div className="absolute top-4 left-4 z-20">
              {/* Minimap */}
              <Card className="w-36 bg-white border border-[#E8F0FB] shadow-xl overflow-hidden">
                <div className="p-3">
                  <div className="w-full h-24 bg-[#F6F8FA] rounded relative overflow-hidden mb-3 border border-[#E8F0FB]">
                    {nodes.map((node) => (
                      <div
                        key={`mini-${node.id}`}
                        className="absolute rounded-sm"
                        style={{
                          left: `${(node.x / 1400) * 100}%`,
                          top: `${(node.y / 1000) * 100}%`,
                          width: "4px",
                          height: "4px",
                          backgroundColor: getNodeColor(node.type),
                        }}
                      />
                    ))}
                    {/* Viewport indicator */}
                    <div
                      className="absolute border-2 border-[#2F8FFF] bg-[#2F8FFF]/10 rounded"
                      style={{ width: "35%", height: "25%", left: "10%", top: "10%" }}
                    />
                  </div>

                  {/* Zoom controls */}
                  <div className="flex items-center justify-between mb-3 bg-[#F6F8FA] rounded px-2 py-1.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setZoom(Math.max(50, zoom - 10))}
                      className="h-6 w-6 hover:bg-white text-[#2F8FFF] font-bold text-base"
                    >
                      −
                    </Button>
                    <span className="font-semibold text-sm text-[#3B4760]">{zoom}%</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setZoom(Math.min(200, zoom + 10))}
                      className="h-6 w-6 hover:bg-white text-[#2F8FFF] font-bold text-base"
                    >
                      +
                    </Button>
                  </div>

                  {/* Toolbar icons below zoom controls */}
                  <div className="flex items-center justify-center gap-1.5 pb-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-[#E8F0FB] text-[#6A738A] hover:text-[#3B4760]"
                      title="Home"
                    >
                      <Home className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-[#E8F0FB] text-[#6A738A] hover:text-[#3B4760]"
                      title="Undo"
                    >
                      <Undo className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-[#E8F0FB] text-[#6A738A] hover:text-[#3B4760]"
                      title="Zoom"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-[#E8F0FB] text-[#6A738A] hover:text-[#3B4760]"
                      title="Edit"
                    >
                      <Pen className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-[#E8F0FB] text-[#6A738A] hover:text-[#3B4760]"
                      title="Settings"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 hover:bg-[#E8F0FB] text-[#6A738A] hover:text-[#3B4760]"
                      title="Users"
                    >
                      <Users className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="mt-2 bg-white border border-[#E8F0FB] shadow-lg overflow-hidden">
                <button className="flex items-center gap-2 px-3 py-2.5 text-sm text-[#6A738A] hover:bg-[#F6F8FA] w-full border-b border-[#E8F0FB] transition-colors">
                  <Maximize2 className="w-4 h-4" />
                  <span className="font-medium">Edit Return Types</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2.5 text-sm text-[#6A738A] hover:bg-[#F6F8FA] w-full transition-colors">
                  <Settings className="w-4 h-4" />
                  <span className="font-medium">Edit Parameters</span>
                </button>
              </Card>
            </div>

            <div className="fixed top-52 right-6 z-50 w-44">
              <Card className="bg-white border border-[#E8F0FB] shadow-xl overflow-hidden">
                <div className="p-1.5 space-y-0.5">
                  {/* Node types list */}
                  {nodeTypes.map((nodeType) => {
                    const Icon = nodeType.icon
                    return (
                      <button
                        key={nodeType.type}
                        className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded hover:bg-[#F6F8FA] transition-colors text-left"
                      >
                        <div
                          className="w-8 h-8 flex items-center justify-center rounded shadow-sm flex-shrink-0"
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
          </div>
        </div>
      )}

      {activeTab === "statements" && (
        <div className="flex-1 overflow-auto p-8 bg-white">
          <div className="max-w-3xl">
            <div className="relative flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold text-[#3B4760]">Customer Statements</h2>
              <button
                className="w-5 h-5 rounded-full bg-[#6A738A] text-white flex items-center justify-center text-xs hover:bg-[#3B4760] transition-colors"
                onMouseEnter={() => setShowStatementsInfo(true)}
                onMouseLeave={() => setShowStatementsInfo(false)}
              >
                i
              </button>

              {showStatementsInfo && (
                <Card className="absolute top-full left-0 right-0 mt-2 p-6 bg-[#3B4760] text-white border-none shadow-xl z-50">
                  <p className="text-sm leading-relaxed">
                    Syndeo automatically matches your customers to an Outcome by using elements of machine learning and
                    natural language processing. You can help Syndeo to understand your outcome's purpose, and your
                    customers, by providing some statements you expect your customers to say when discussing this
                    outcome. The more statements you provide, the more easily Syndeo can match your customers needs to
                    an Outcome.
                  </p>
                </Card>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-[#6A738A] text-xs uppercase tracking-wider mb-3 block">STATEMENTS</Label>
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Enter a customer statement..."
                    value={newStatement}
                    onChange={(e) => setNewStatement(e.target.value)}
                    className="flex-1 border-[#E8F0FB] focus:border-[#2F8FFF]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newStatement.trim()) {
                        setStatements([...statements, newStatement.trim()])
                        setNewStatement("")
                      }
                    }}
                  />
                  <Button
                    className="bg-[#E8F0FB] hover:bg-[#2F8FFF] text-[#6A738A] hover:text-white px-6"
                    onClick={() => {
                      if (newStatement.trim()) {
                        setStatements([...statements, newStatement.trim()])
                        setNewStatement("")
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {statements.map((statement, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 bg-white border border-[#E8F0FB] rounded-full px-4 py-2 text-sm text-[#3B4760]"
                    >
                      {statement}
                      <button
                        onClick={() => setStatements(statements.filter((_, i) => i !== index))}
                        className="w-4 h-4 rounded-full bg-[#6A738A] text-white flex items-center justify-center hover:bg-[#3B4760] transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-end items-center gap-2 pt-4">
                <Button variant="outline" size="icon" className="h-8 w-8 border-[#E8F0FB] bg-transparent">
                  «
                </Button>
                <div className="w-8 h-8 rounded bg-[#2F8FFF] text-white flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <Button variant="outline" size="icon" className="h-8 w-8 border-[#E8F0FB] bg-transparent">
                  »
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "details" && (
        <div className="flex-1 overflow-auto p-8 bg-white">
          <div className="max-w-3xl">
            <div className="relative flex items-center gap-2 mb-6">
              <h2 className="text-2xl font-bold text-[#3B4760]">Outcome Details</h2>
              <button
                className="w-5 h-5 rounded-full bg-[#6A738A] text-white flex items-center justify-center text-xs hover:bg-[#3B4760] transition-colors"
                onMouseEnter={() => setShowDetailsInfo(true)}
                onMouseLeave={() => setShowDetailsInfo(false)}
              >
                i
              </button>

              {showDetailsInfo && (
                <Card className="absolute top-full left-0 right-0 mt-2 p-6 bg-[#3B4760] text-white border-none shadow-xl z-50">
                  <p className="text-sm leading-relaxed">
                    Outcomes are business functions you wish to expose to your customers via Syndeo's. Typically, an
                    outcome aligns with your business intentions. Example outcomes could be "renew customer
                    subscription", "check for an outage" or "recover lost account". We make serving these outcomes to
                    your customers easy by translating the business process for you.
                  </p>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-[#6A738A] text-xs uppercase tracking-wider mb-3 block">NAME</Label>
                <Input
                  defaultValue={outcomeName}
                  className="border-[#E8F0FB] bg-[#F6F8FA] focus:border-[#2F8FFF] focus:bg-white"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-[#6A738A] text-xs uppercase tracking-wider">DISPLAY ALIAS</Label>
                  <button className="w-4 h-4 rounded-full bg-[#6A738A] text-white flex items-center justify-center text-xs">
                    i
                  </button>
                </div>
                <Input
                  defaultValue="1 a"
                  className="border-[#E8F0FB] bg-[#F6F8FA] focus:border-[#2F8FFF] focus:bg-white"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-[#6A738A] text-xs uppercase tracking-wider">CONFIRMATION QUESTION</Label>
                  <button className="w-4 h-4 rounded-full bg-[#6A738A] text-white flex items-center justify-center text-xs">
                    i
                  </button>
                </div>
                <div className="border border-[#E8F0FB] rounded-lg bg-[#F6F8FA]">
                  <div className="flex gap-2 p-2 border-b border-[#E8F0FB] bg-white rounded-t-lg">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#E8F0FB]">
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#E8F0FB]">
                      <Italic className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#E8F0FB]">
                      <Underline className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#E8F0FB]">
                      <Strikethrough className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-8 bg-[#E8F0FB]" />
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#E8F0FB]">
                      <List className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#E8F0FB]">
                      <Code className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#E8F0FB]">
                      <Link className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#E8F0FB]">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#E8F0FB]">
                      <FileText className="w-4 h-4" />
                    </Button>
                  </div>
                  <Textarea
                    rows={8}
                    className="border-none bg-transparent focus:ring-0 resize-none"
                    placeholder="Enter confirmation question..."
                  />
                  <div className="px-3 py-2 text-xs text-[#6A738A] text-right border-t border-[#E8F0FB] bg-white rounded-b-lg">
                    0 of 2000 characters
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-[#6A738A] text-xs uppercase tracking-wider mb-3 block">DESCRIPTION</Label>
                <Textarea rows={6} className="border-[#E8F0FB] bg-[#F6F8FA] focus:border-[#2F8FFF] focus:bg-white" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-[#6A738A] text-xs uppercase tracking-wider">CUSTOM DATA FIELDS</Label>
                  <Button size="icon" className="h-10 w-10 rounded bg-[#2F8FFF] hover:bg-[#2680E8] text-white">
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-[#6A738A] text-xs uppercase tracking-wider mb-3 block">INTENTS</Label>
                <div className="flex gap-2 mb-3">
                  <div className="inline-flex items-center gap-2 bg-[#2F8FFF] text-white rounded px-4 py-2 text-sm font-medium">
                    1 a - Tany
                  </div>
                  <Input
                    placeholder="Add an intent"
                    className="flex-1 border-[#E8F0FB] bg-[#F6F8FA] focus:border-[#2F8FFF]"
                  />
                  <Button size="icon" className="h-10 w-10 rounded bg-[#2F8FFF] hover:bg-[#2680E8] text-white">
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 pt-6 border-t border-[#E8F0FB]">
                <Button className="bg-[#2F8FFF] hover:bg-[#2680E8] text-white px-8">Save</Button>
                <Button variant="link" className="text-red-600 hover:text-red-700">
                  Delete Outcome
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
