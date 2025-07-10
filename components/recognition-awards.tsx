"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Award } from "lucide-react"

interface RecognitionItem {
  name: string
  photo: string
  recognition: string
  type: "individual" | "team"
  teamMembers?: string[]
}

interface RecognitionAwardsProps {
  data: RecognitionItem[]
}

export function RecognitionAwards({ data }: RecognitionAwardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {item.type === "individual" ? (
                <Avatar className="h-16 w-16">
                  <AvatarImage src={item.photo || "/placeholder.svg"} alt={item.name} />
                  <AvatarFallback>
                    {item.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="flex -space-x-2">
                  {item.teamMembers?.slice(0, 3).map((member, memberIndex) => (
                    <Avatar key={memberIndex} className="h-12 w-12 border-2 border-white">
                      <AvatarFallback className="text-xs">
                        {member
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {item.teamMembers && item.teamMembers.length > 3 && (
                    <Avatar className="h-12 w-12 border-2 border-white">
                      <AvatarFallback className="text-xs">+{item.teamMembers.length - 3}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              )}
            </div>
            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-white">{item.name}</CardTitle>
            <Badge variant="secondary" className="w-fit mx-auto">
              <Award className="h-3 w-3 mr-1" />
              {item.type === "individual" ? "Individual" : "Team"}
            </Badge>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-slate-600 dark:text-slate-300 text-sm">{item.recognition}</p>
            {item.type === "team" && item.teamMembers && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Team Members:</p>
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
