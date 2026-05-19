"use client"

import { useState } from "react"
import { ChevronDown, Bold, Italic, Underline, Strikethrough, List, Code, Link, Smile, Variable, X } from "lucide-react"

interface FAQ {
  id: string
  name: string
  displayAlias: string
  confirmationQuestion: string
  questions: string[]
  answer: string
  mediaType: string
}

export function FAQView() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "1",
      name: "FAQ - About Us - Areas",
      displayAlias: "areas we cover",
      confirmationQuestion: "Are you looking for ${Alias}?",
      questions: ["What areas do you cover?", "Where do you operate?"],
      answer: "We cover all major areas in the UK...",
      mediaType: "No",
    },
    {
      id: "2",
      name: "FAQ - About Us - How",
      displayAlias: "more information",
      confirmationQuestion: "Are you looking for ${Alias}?",
      questions: [
        "Can I find out more?",
        "Can I get more information?",
        "How can I find out more?",
        "I am looking for more information",
        "I'd like to find out more",
        "Where can I get more information?",
      ],
      answer: "You can find out more about us and meet the team here: www.chartersfinancialservices.co.uk",
      mediaType: "No",
    },
    {
      id: "3",
      name: "FAQ - About Us - What",
      displayAlias: "what we do",
      confirmationQuestion: "Are you looking for ${Alias}?",
      questions: ["What do you do?"],
      answer: "We provide comprehensive financial services...",
      mediaType: "No",
    },
    {
      id: "4",
      name: "FAQ - About Us - When",
      displayAlias: "our hours",
      confirmationQuestion: "Are you looking for ${Alias}?",
      questions: ["When are you open?"],
      answer: "We are open Monday to Friday, 9am to 5pm...",
      mediaType: "No",
    },
    {
      id: "5",
      name: "FAQ - About Us - Where",
      displayAlias: "our location",
      confirmationQuestion: "Are you looking for ${Alias}?",
      questions: ["Where are you located?"],
      answer: "We are based in central London...",
      mediaType: "No",
    },
    {
      id: "6",
      name: "FAQ - About Us - Who",
      displayAlias: "about our team",
      confirmationQuestion: "Are you looking for ${Alias}?",
      questions: ["Who are you?"],
      answer: "We are a team of experienced financial advisors...",
      mediaType: "No",
    },
    {
      id: "7",
      name: "FAQ - About Us - Why",
      displayAlias: "why choose us",
      confirmationQuestion: "Are you looking for ${Alias}?",
      questions: ["Why should I choose you?"],
      answer: "We offer personalized service and expert advice...",
      mediaType: "No",
    },
    {
      id: "8",
      name: "FAQ - Existing - Changes To Existing Mortgages",
      displayAlias: "mortgage changes",
      confirmationQuestion: "Are you looking for ${Alias}?",
      questions: ["Can I change my mortgage?"],
      answer: "Yes, we can help you review and change your mortgage...",
      mediaType: "No",
    },
  ])

  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [newQuestion, setNewQuestion] = useState("")

  const toggleExpand = (id: string) => {
    if (expandedFaq === id) {
      setExpandedFaq(null)
      setEditingFaq(null)
    } else {
      setExpandedFaq(id)
      const faq = faqs.find((f) => f.id === id)
      if (faq) {
        setEditingFaq({ ...faq })
      }
    }
  }

  const handleSave = () => {
    if (editingFaq) {
      setFaqs(faqs.map((f) => (f.id === editingFaq.id ? editingFaq : f)))
      setExpandedFaq(null)
      setEditingFaq(null)
    }
  }

  const handleAddQuestion = () => {
    if (newQuestion.trim() && editingFaq) {
      setEditingFaq({
        ...editingFaq,
        questions: [...editingFaq.questions, newQuestion.trim()],
      })
      setNewQuestion("")
    }
  }

  const handleRemoveQuestion = (index: number) => {
    if (editingFaq) {
      setEditingFaq({
        ...editingFaq,
        questions: editingFaq.questions.filter((_, i) => i !== index),
      })
    }
  }

  const expandAll = () => {
    // For now, just expand the first one as an example
    if (faqs.length > 0) {
      toggleExpand(faqs[0].id)
    }
  }

  const collapseAll = () => {
    setExpandedFaq(null)
    setEditingFaq(null)
  }

  return (
    <div className="h-full overflow-y-auto bg-[#F6F8FA] p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#3B4760]">FAQs</h1>
        <div className="flex gap-3">
          <button
            onClick={expandAll}
            className="px-4 py-2 bg-white border border-[#E8F0FB] text-[#3B4760] text-sm font-medium rounded-lg hover:bg-[#F6F8FA]"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-4 py-2 bg-white border border-[#E8F0FB] text-[#3B4760] text-sm font-medium rounded-lg hover:bg-[#F6F8FA]"
          >
            Collapse All
          </button>
          <button className="px-4 py-2 bg-[#2F8FFF] text-white text-sm font-medium rounded-lg hover:bg-[#1a7ae0]">
            Add FAQ
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-lg border border-[#E8F0FB] overflow-hidden">
            <button
              onClick={() => toggleExpand(faq.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-[#F6F8FA] transition-colors"
            >
              <span className="text-sm font-medium text-[#3B4760]">{faq.name}</span>
              <ChevronDown
                className={`w-5 h-5 text-[#6A738A] transition-transform ${expandedFaq === faq.id ? "rotate-180" : ""}`}
              />
            </button>

            {expandedFaq === faq.id && editingFaq && (
              <div className="border-t border-[#E8F0FB] p-6 space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-xs font-medium text-[#6A738A] mb-2 uppercase">Name</label>
                  <input
                    type="text"
                    value={editingFaq.name}
                    onChange={(e) => setEditingFaq({ ...editingFaq, name: e.target.value })}
                    className="w-full px-4 py-2 bg-[#F6F8FA] border-none rounded text-sm text-[#3B4760] focus:outline-none focus:ring-2 focus:ring-[#2F8FFF]"
                  />
                </div>

                {/* Display Alias */}
                <div>
                  <label className="block text-xs font-medium text-[#6A738A] mb-2 uppercase">Display Alias</label>
                  <input
                    type="text"
                    value={editingFaq.displayAlias}
                    onChange={(e) => setEditingFaq({ ...editingFaq, displayAlias: e.target.value })}
                    className="w-full px-4 py-2 bg-[#F6F8FA] border-none rounded text-sm text-[#3B4760] focus:outline-none focus:ring-2 focus:ring-[#2F8FFF]"
                  />
                </div>

                {/* Confirmation Question */}
                <div>
                  <label className="block text-xs font-medium text-[#6A738A] mb-2 uppercase">
                    Confirmation Question
                  </label>
                  <div className="bg-[#F6F8FA] rounded">
                    {/* Rich text toolbar */}
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-[#E8F0FB]">
                      <button className="p-1 hover:bg-white rounded">
                        <Bold className="w-4 h-4 text-[#6A738A]" />
                      </button>
                      <button className="p-1 hover:bg-white rounded">
                        <Italic className="w-4 h-4 text-[#6A738A]" />
                      </button>
                      <button className="p-1 hover:bg-white rounded">
                        <Underline className="w-4 h-4 text-[#6A738A]" />
                      </button>
                      <button className="p-1 hover:bg-white rounded">
                        <Strikethrough className="w-4 h-4 text-[#6A738A]" />
                      </button>
                      <button className="p-1 hover:bg-white rounded">
                        <List className="w-4 h-4 text-[#6A738A]" />
                      </button>
                      <button className="p-1 hover:bg-white rounded">
                        <Code className="w-4 h-4 text-[#6A738A]" />
                      </button>
                      <button className="p-1 hover:bg-white rounded">
                        <Link className="w-4 h-4 text-[#6A738A]" />
                      </button>
                      <button className="p-1 hover:bg-white rounded">
                        <Smile className="w-4 h-4 text-[#6A738A]" />
                      </button>
                      <button className="p-1 hover:bg-white rounded">
                        <Variable className="w-4 h-4 text-[#6A738A]" />
                      </button>
                    </div>
                    <textarea
                      value={editingFaq.confirmationQuestion}
                      onChange={(e) => setEditingFaq({ ...editingFaq, confirmationQuestion: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F6F8FA] border-none text-sm text-[#3B4760] focus:outline-none resize-none"
                      rows={3}
                    />
                    <div className="px-4 py-2 text-right text-xs text-[#6A738A]">
                      {editingFaq.confirmationQuestion.length} of 2000 characters
                    </div>
                  </div>
                </div>

                {/* Questions */}
                <div>
                  <label className="block text-xs font-medium text-[#6A738A] mb-2 uppercase">Question</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddQuestion()}
                      placeholder="Add a question variant..."
                      className="flex-1 px-4 py-2 bg-[#F6F8FA] border-none rounded text-sm text-[#3B4760] focus:outline-none focus:ring-2 focus:ring-[#2F8FFF]"
                    />
                    <button
                      onClick={handleAddQuestion}
                      className="px-4 py-2 bg-[#2F8FFF] text-white text-sm font-medium rounded hover:bg-[#1a7ae0]"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {editingFaq.questions.map((question, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-2 bg-[#F6F8FA] border border-[#E8F0FB] rounded-full text-sm text-[#3B4760]"
                      >
                        <span>{question}</span>
                        <button
                          onClick={() => handleRemoveQuestion(idx)}
                          className="hover:bg-[#E8F0FB] rounded-full p-0.5"
                        >
                          <X className="w-3 h-3 text-[#6A738A]" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Answer */}
                <div>
                  <label className="block text-xs font-medium text-[#6A738A] mb-2 uppercase">Answer</label>
                  <div className="bg-[#F6F8FA] rounded">
                    {/* Rich text toolbar */}
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-[#E8F0FB]">
                      <button className="p-1 hover:bg-white rounded">
                        <Bold className="w-4 h-4 text-[#6A738A]" />
                      </button>
                      <button className="p-1 hover:bg-white rounded">
                        <Italic className="w-4 h-4 text-[#6A738A]" />
                      </button>
                      <button className="p-1 hover:bg-white rounded">
                        <Underline className="w-4 h-4 text-[#6A738A]" />
                      </button>
                      <button className="p-1 hover:bg-white rounded">
                        <Strikethrough className="w-4 h-4 text-[#6A738A]" />
                      </button>
                      <button className="p-1 hover:bg-white rounded">
                        <List className="w-4 h-4 text-[#6A738A]" />
                      </button>
                      <button className="p-1 hover:bg-white rounded">
                        <Code className="w-4 h-4 text-[#6A738A]" />
                      </button>
                      <button className="p-1 hover:bg-white rounded">
                        <Link className="w-4 h-4 text-[#6A738A]" />
                      </button>
                      <button className="p-1 hover:bg-white rounded">
                        <Smile className="w-4 h-4 text-[#6A738A]" />
                      </button>
                      <button className="p-1 hover:bg-white rounded">
                        <Variable className="w-4 h-4 text-[#6A738A]" />
                      </button>
                    </div>
                    <textarea
                      value={editingFaq.answer}
                      onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F6F8FA] border-none text-sm text-[#3B4760] focus:outline-none resize-none"
                      rows={4}
                    />
                    <div className="px-4 py-2 text-right text-xs text-[#6A738A]">
                      {editingFaq.answer.length} of 2000 characters
                    </div>
                  </div>
                </div>

                {/* Media Type */}
                <div>
                  <label className="block text-xs font-medium text-[#6A738A] mb-2 uppercase">Media Type</label>
                  <select
                    value={editingFaq.mediaType}
                    onChange={(e) => setEditingFaq({ ...editingFaq, mediaType: e.target.value })}
                    className="w-full px-4 py-2 bg-[#F6F8FA] border-none rounded text-sm text-[#3B4760] focus:outline-none focus:ring-2 focus:ring-[#2F8FFF]"
                  >
                    <option>No</option>
                    <option>Image</option>
                    <option>Video</option>
                    <option>Document</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <button className="px-4 py-2 bg-white border border-[#2F8FFF] text-[#2F8FFF] text-sm font-medium rounded-lg hover:bg-[#F6F8FA]">
                    Add Answer
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-[#2F8FFF] text-white text-sm font-medium rounded-lg hover:bg-[#1a7ae0]"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
