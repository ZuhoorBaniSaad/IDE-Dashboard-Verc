"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, TrendingUp, Target, Building, ExternalLink } from "lucide-react"

interface OverviewData {
  totalProjects: number
  valueGenerated: number
  actualPercentage: number
  pdoEngagements: number
  externalEngagements: number
  valueContributions: Array<{
    project: string
    contribution: number
    percentage: number
  }>
}

interface OverviewKPIsProps {
  data: OverviewData
}

export function OverviewKPIs({ data }: OverviewKPIsProps) {
  const kpiCards = [
    {
      title: "Total Projects",
      value: data.totalProjects,
      icon: Target,
      color: "from-blue-500 to-blue-600",
      description: "Active projects across all departments",
    },
    {
      title: "Value Generated",
      value: `$${(data.valueGenerated / 1000000).toFixed(1)}M`,
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-600",
      description: "Total financial value created",
      hasTooltip: true,
    },
    {
      title: "Actual %",
      value: `${data.actualPercentage}%`,
      icon: Target,
      color: "from-purple-500 to-purple-600",
      description: "Achievement rate against targets",
    },
    {
      title: "PDO Engagements",
      value: data.pdoEngagements,
      icon: Building,
      color: "from-orange-500 to-orange-600",
      description: "Internal PDO collaborations",
    },
    {
      title: "External Engagements",
      value: data.externalEngagements,
      icon: ExternalLink,
      color: "from-red-500 to-red-600",
      description: "External partnerships and collaborations",
    },
  ]

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card
            key={index}
            className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${kpi.color} opacity-5 group-hover:opacity-10 transition-opacity`}
            />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">{kpi.title}</CardTitle>
                {kpi.hasTooltip && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-slate-400 hover:text-slate-600 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <div className="space-y-2">
                        <p className="font-semibold">Value Contributions:</p>
                        {data.valueContributions.map((contrib, idx) => (
                          <div key={idx} className="flex justify-between text-xs">
                            <span>{contrib.project}</span>
                            <span>{contrib.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              <div
                className={`p-2 rounded-lg bg-gradient-to-br ${kpi.color} group-hover:scale-110 transition-transform`}
              >
                <kpi.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{kpi.value}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  )
}
