"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, BookOpen, Award } from "lucide-react"

interface CapabilityItem {
  title: string
  totalCount: number
  activities: string[]
  icon: string
}

interface CapabilityDevelopmentProps {
  data: CapabilityItem[]
}

export function CapabilityDevelopment({ data }: CapabilityDevelopmentProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "GraduationCap":
        return GraduationCap
      case "Users":
        return Users
      case "BookOpen":
        return BookOpen
      case "Award":
        return Award
      default:
        return GraduationCap
    }
  }

  const getIconColor = (index: number) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-purple-500 to-purple-600",
      "from-orange-500 to-orange-600",
      "from-green-500 to-green-600",
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((item, index) => {
        const IconComponent = getIcon(item.icon)
        return (
          <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center">
              <div className={`mx-auto p-3 rounded-full bg-gradient-to-br ${getIconColor(index)} w-fit`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg font-semibold text-slate-800 dark:text-white">{item.title}</CardTitle>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{item.totalCount}</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {item.activities.map((activity, activityIndex) => (
                  <li key={activityIndex} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">{activity}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
