"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface SplashScreenProps {
  onEnter: () => void
}

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export function SplashScreen({ onEnter }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FC] via-white to-[#F8F9FC] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-12">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 inline-block">
            <div className="flex items-center gap-8">
              <Image
                src={`${BASE_PATH}/images/syndeo-logo.png`}
                alt="SYNDEO"
                width={200}
                height={60}
                className="h-16 w-auto"
                priority
              />
              <div className="h-16 w-px bg-gray-300" />
              <Image
                src={`${BASE_PATH}/images/instil-logo.png`}
                alt="Instil"
                width={160}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-[#1E293B] tracking-tight">UX Proposal Improvements</h1>
          <p className="text-xl text-[#64748B] max-w-xl mx-auto leading-relaxed">
            Explore the enhanced user experience and new features designed to streamline your conversational AI workflow
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <Button
            onClick={onEnter}
            size="lg"
            className="bg-[#2F8FFF] hover:bg-[#1E7FEF] text-white px-8 py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
          >
            View Prototype
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-[#2F8FFF] text-[#2F8FFF] hover:bg-[#E8F0FB] px-8 py-6 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 bg-transparent"
          >
            <Link href="/components">Vibe Coded Components</Link>
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="pt-12 text-sm text-[#94A3B8]">Interactive prototype • Click to explore</div>
      </div>
    </div>
  )
}
