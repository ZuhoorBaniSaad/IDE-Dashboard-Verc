"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Info, Target, DollarSign, TrendingUp, Users, Building } from "lucide-react"

interface OverviewData {
  totalProjects: number
  valueGenerated: number
  actualPercentage: number
  pdoEngagements: number
  externalEngagements: number
  valueContributions: Array<{
    project: string
    contribution: number
  }>
}

interface OverviewKPIsProps {
  data: OverviewData
}

export function OverviewKPIs({ data }: OverviewKPIsProps) {
  const kpis = [
    {
      title: "Total Projects",
      value: data.totalProjects.toString(),
      icon: Target,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Value Generated",
      value: `$${(data.valueGenerated / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: "from-emerald-500 to-emerald-600",
      hasTooltip: true,
    },
    {
      title: "Actual %",
      value: `${data.actualPercentage}%`,
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "PDO Engagements",
      value: data.pdoEngagements.toString(),
      icon: Building,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "External Engagements",
      value: data.externalEngagements.toString(),
      icon: Users,
      color: "from-red-500 to-red-600",
    },
  ]

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {kpis.map((kpi, index) => (
          <Card
            key={index}
            className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${kpi.color} opacity-5`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {kpi.title}
                {kpi.hasTooltip && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="inline-block ml-1 h-3 w-3 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <div className="space-y-2">
                        <p className="font-semibold">Value Contributions:</p>
                        {data.valueContributions.map((contrib, idx) => (
                          <div key={idx} className="flex justify-between text-xs">
                            <span>{contrib.project}</span>
                            <span>{contrib.contribution}%</span>
                          </div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${kpi.color}`}>
                <kpi.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800 dark:text-white">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  )
}
