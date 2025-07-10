"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Award, Users, User } from "lucide-react"

interface RecognitionItem {
  name: string
  type: "Individual" | "Team"
  recognition: string
  photo?: string
  teamMembers?: string[]
}

interface RecognitionAwardsProps {
  data: RecognitionItem[]
}

export function RecognitionAwards({ data }: RecognitionAwardsProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300 group">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              {item.type === "Individual" ? (
                <Avatar className="h-16 w-16 border-4 border-emerald-200 group-hover:border-emerald-300 transition-colors">
                  <AvatarImage src={item.photo || "/placeholder-user.jpg"} alt={item.name} />
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 font-semibold text-lg">
                    {getInitials(item.name)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center border-4 border-purple-200 group-hover:border-purple-300 transition-colors">
                  <Users className="h-8 w-8 text-white" />
                </div>
              )}
            </div>
            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-white">{item.name}</CardTitle>
            <Badge
              variant={item.type === "Individual" ? "default" : "secondary"}
              className={`w-fit mx-auto ${
                item.type === "Individual"
                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                  : "bg-purple-100 text-purple-700 hover:bg-purple-200"
              }`}
            >
              <div className="flex items-center space-x-1">
                {item.type === "Individual" ? <User className="h-3 w-3" /> : <Users className="h-3 w-3" />}
                <span>{item.type}</span>
              </div>
            </Badge>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-2 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500">
                <Award className="h-5 w-5 text-white" />
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">{item.recognition}</p>
            {item.teamMembers && (
              <div className="border-t pt-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-2">Team Members:</p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {item.teamMembers.map((member, memberIndex) => (
                    <Badge key={memberIndex} variant="outline" className="text-xs">
                      {member}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
