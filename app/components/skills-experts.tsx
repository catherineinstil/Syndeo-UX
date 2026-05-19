"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Circle, MoreVertical, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const skills = ["kyiv", "london", "belfast"]

const experts = [
  {
    name: "Neil Mulholland",
    email: "test@syndeo.cx",
    initials: "NM",
    online: true,
  },
  {
    name: "Jason Grey prod",
    email: "test@syndeo.cx",
    initials: "JG",
    online: true,
  },
]

interface SkillsExpertsProps {
  onRemove?: () => void
}

export function SkillsExperts({ onRemove }: SkillsExpertsProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-white border-[#E8F0FB]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-[#3B4760]">Skills</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="link" className="text-xs text-[#2F8FFF] p-0 h-auto hover:text-[#2680E8]">
                View all
              </Button>
              {onRemove && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-[#6A738A] hover:bg-[#E8F0FB]">
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onRemove} className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="text-sm font-normal border-[#E8F0FB] bg-[#E8F0FB] text-[#3B4760] hover:bg-[#2F8FFF] hover:text-white transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-[#E8F0FB]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-[#3B4760]">Experts</CardTitle>
            <span className="text-xs text-[#6A738A]">Test Expert Mode</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {experts.map((expert) => (
            <div
              key={expert.email}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#E8F0FB] transition-colors"
            >
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-[#E8F0FB] text-[#2F8FFF] text-sm font-medium">
                    {expert.initials}
                  </AvatarFallback>
                </Avatar>
                {expert.online && (
                  <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-[#10B981] text-[#10B981]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#3B4760] truncate">{expert.name}</p>
                <p className="text-xs text-[#6A738A] truncate">{expert.email}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
