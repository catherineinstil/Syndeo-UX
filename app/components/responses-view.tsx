"use client"

import { Plus, Edit, Trash2 } from "lucide-react"
import { useState } from "react"

export function ResponsesView() {
  const [selectedResponse, setSelectedResponse] = useState("test 1")

  const responses = [
    { id: "test 1", name: "test 1", subtitle: "test" },
    { id: "test 2", name: "test 2", subtitle: "test 2" },
  ]

  return (
    <div className="h-full flex bg-[#F6F8FA]">
      {/* Left List */}
      <div className="w-80 bg-white border-r border-[#E8F0FB] overflow-y-auto">
        <div className="p-4 border-b border-[#E8F0FB]">
          <h2 className="text-lg font-semibold text-[#3B4760] mb-4">Responses</h2>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#2F8FFF] text-white text-sm font-medium rounded-lg hover:bg-[#1a7ae0]">
            <Plus className="w-4 h-4" />
            Add Response
          </button>
        </div>

        <div className="p-2">
          {responses.map((response) => (
            <button
              key={response.id}
              onClick={() => setSelectedResponse(response.id)}
              className={`w-full text-left p-3 rounded-lg mb-1 transition-colors ${
                selectedResponse === response.id ? "bg-[#E8F0FB]" : "hover:bg-[#F6F8FA]"
              }`}
            >
              <div className="text-sm font-medium text-[#3B4760]">{response.name}</div>
              <div className="text-xs text-[#6A738A] mt-1">{response.subtitle}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Detail Panel */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="bg-white rounded-lg border border-[#E8F0FB] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#3B4760]">test 1</h2>
            <div className="flex gap-2">
              <button className="p-2 text-[#6A738A] hover:text-[#3B4760]">
                <Edit className="w-5 h-5" />
              </button>
              <button className="p-2 text-[#6A738A] hover:text-red-500">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[#6A738A] uppercase tracking-wide mb-2 block">
              Default Text
            </label>
            <div className="border border-[#E8F0FB] rounded-lg">
              <div className="flex items-center gap-2 p-2 border-b border-[#E8F0FB] bg-[#F6F8FA]">
                <button className="p-1 hover:bg-[#E8F0FB] rounded">
                  <strong className="text-sm">B</strong>
                </button>
                <button className="p-1 hover:bg-[#E8F0FB] rounded">
                  <em className="text-sm">I</em>
                </button>
                <button className="p-1 hover:bg-[#E8F0FB] rounded">
                  <u className="text-sm">U</u>
                </button>
                <button className="p-1 hover:bg-[#E8F0FB] rounded">
                  <s className="text-sm">S</s>
                </button>
                <div className="w-px h-4 bg-[#E8F0FB]" />
                <button className="p-1 hover:bg-[#E8F0FB] rounded text-sm">≡</button>
                <button className="p-1 hover:bg-[#E8F0FB] rounded text-sm">{"</>"}</button>
                <button className="p-1 hover:bg-[#E8F0FB] rounded text-sm">🔗</button>
                <button className="p-1 hover:bg-[#E8F0FB] rounded text-sm">😊</button>
                <button className="p-1 hover:bg-[#E8F0FB] rounded text-sm">Ꞁ</button>
              </div>
              <textarea
                className="w-full p-4 text-sm text-[#3B4760] resize-none focus:outline-none min-h-[200px]"
                defaultValue="test"
              />
            </div>
            <div className="text-right text-xs text-[#6A738A] mt-1">4 of 2000 characters</div>
          </div>
        </div>
      </div>
    </div>
  )
}
