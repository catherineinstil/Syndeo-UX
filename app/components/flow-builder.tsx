"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import { MessageSquare, HelpCircle, GitBranch, Brain, Code, Workflow, Route, Globe, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type NodeType = "message" | "question" | "decision" | "intent" | "script" | "flow" | "route" | "web" | "catch"

interface Node {
  id: string
  type: NodeType
  label: string
  x: number
  y: number
  connections: string[]
}

interface Connection {
  from: string
  to: string
}

const nodeTypes: Array<{ type: NodeType; label: string; icon: any; color: string }> = [
  { type: "message", label: "Message", icon: MessageSquare, color: "#2F8FFF" },
  { type: "question", label: "Question", icon: HelpCircle, color: "#10B981" },
  { type: "decision", label: "Decision", icon: GitBranch, color: "#F59E0B" },
  { type: "intent", label: "Intent", icon: Brain, color: "#8B5CF6" },
  { type: "script", label: "Script", icon: Code, color: "#6A738A" },
  { type: "flow", label: "Flow", icon: Workflow, color: "#EC4899" },
  { type: "route", label: "Route", icon: Route, color: "#14B8A6" },
  { type: "web", label: "Web", icon: Globe, color: "#3B82F6" },
  { type: "catch", label: "Catch", icon: AlertCircle, color: "#EF4444" },
]

const initialNodes: Node[] = [
  { id: "1", type: "message", label: "Welcome message", x: 200, y: 100, connections: ["2"] },
  { id: "2", type: "question", label: "Ask for email", x: 200, y: 250, connections: ["3"] },
  { id: "3", type: "decision", label: "If user says yes", x: 200, y: 400, connections: ["4", "5"] },
  { id: "4", type: "message", label: "Send confirmation", x: 100, y: 550, connections: [] },
  { id: "5", type: "web", label: "API call", x: 300, y: 550, connections: ["6"] },
  { id: "6", type: "message", label: "Thank you", x: 300, y: 700, connections: [] },
]

export function FlowBuilder() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)

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
      if (!draggedNode) return

      const canvasRect = canvasRef.current?.getBoundingClientRect()
      if (!canvasRect) return

      const x = Math.round((e.clientX - canvasRect.left - dragOffset.x) / 20) * 20
      const y = Math.round((e.clientY - canvasRect.top - dragOffset.y) / 20) * 20

      setNodes((prevNodes) => prevNodes.map((node) => (node.id === draggedNode ? { ...node, x, y } : node)))
    },
    [draggedNode, dragOffset],
  )

  const handleMouseUp = () => {
    setDraggedNode(null)
  }

  const getConnectionPath = (fromNode: Node, toNode: Node) => {
    const startX = fromNode.x + 100
    const startY = fromNode.y + 50
    const endX = toNode.x + 100
    const endY = toNode.y

    const midY = (startY + endY) / 2

    return `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Main Canvas */}
      <div
        ref={canvasRef}
        className="flex-1 relative overflow-auto bg-[#F6F8FA]"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          backgroundImage: `
            linear-gradient(to right, #E8F0FB 1px, transparent 1px),
            linear-gradient(to bottom, #E8F0FB 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" fill="#6A738A">
              <polygon points="0 0, 10 3, 0 6" />
            </marker>
          </defs>
          {nodes.map((node) =>
            node.connections.map((targetId) => {
              const targetNode = nodes.find((n) => n.id === targetId)
              if (!targetNode) return null

              return (
                <path
                  key={`${node.id}-${targetId}`}
                  d={getConnectionPath(node, targetNode)}
                  stroke="#6A738A"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                  className="transition-all duration-200"
                />
              )
            }),
          )}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const Icon = nodeTypes.find((nt) => nt.type === node.type)?.icon || MessageSquare
          return (
            <Card
              key={node.id}
              className="absolute bg-white border-2 shadow-lg cursor-move transition-all duration-200 hover:shadow-xl"
              style={{
                left: node.x,
                top: node.y,
                width: 200,
                borderColor: getNodeColor(node.type),
                zIndex: draggedNode === node.id ? 10 : 2,
              }}
              onMouseDown={(e) => handleNodeMouseDown(node.id, e)}
            >
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center"
                    style={{ backgroundColor: `${getNodeColor(node.type)}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: getNodeColor(node.type) }} />
                  </div>
                  <span className="text-xs font-semibold text-[#6A738A] uppercase">{node.type}</span>
                </div>
                <p className="text-sm font-medium text-[#3B4760]">{node.label}</p>
              </div>
              {/* Connection points */}
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2"
                style={{ borderColor: getNodeColor(node.type) }}
              />
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2"
                style={{ borderColor: getNodeColor(node.type) }}
              />
            </Card>
          )
        })}
      </div>

      {/* Right Toolbar */}
      <div className="w-80 bg-white border-l border-[#E8F0FB] p-6 overflow-y-auto">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#3B4760] mb-2">Node Types</h3>
          <p className="text-sm text-[#6A738A] mb-4">Drag nodes to the canvas to build your flow</p>
        </div>

        <div className="space-y-2">
          {nodeTypes.map((nodeType) => {
            const Icon = nodeType.icon
            return (
              <Button
                key={nodeType.type}
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-3 border-2 hover:border-[#2F8FFF] hover:bg-[#E8F0FB] transition-all bg-transparent"
                style={{ borderColor: `${nodeType.color}40` }}
              >
                <div
                  className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${nodeType.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: nodeType.color }} />
                </div>
                <div className="text-left">
                  <div className="font-medium text-[#3B4760]">{nodeType.label}</div>
                  <div className="text-xs text-[#6A738A]">
                    {nodeType.type === "message" && "Send a message"}
                    {nodeType.type === "question" && "Ask the user"}
                    {nodeType.type === "decision" && "Branch logic"}
                    {nodeType.type === "intent" && "Detect intent"}
                    {nodeType.type === "script" && "Run custom code"}
                    {nodeType.type === "flow" && "Sub-flow"}
                    {nodeType.type === "route" && "Route to agent"}
                    {nodeType.type === "web" && "API call"}
                    {nodeType.type === "catch" && "Error handler"}
                  </div>
                </div>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
