"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Bot, Cog, Calendar, DollarSign, Clock, Cpu } from "lucide-react"

interface RPAData {
  kpis: {
    liveProcesses: number
    inDevelopment: number
    planned: number
    valueGenerated: number
    manhourSavings: number
    robots: number
  }
  savingsByDirectorate: Array<{
    name: string
    value: number
  }>
  projectStatusByDirectorate: Array<{
    directorate: string
    planning: number
    development: number
    production: number
    underDiscussion: number
  }>
}

interface RPASummaryProps {
  data: RPAData
}

export function RPASummary({ data }: RPASummaryProps) {
  const kpiCards = [
    {
      title: "Live Processes",
      value: data.kpis.liveProcesses,
      icon: Bot,
      color: "from-green-500 to-green-600",
    },
    {
      title: "In Development",
      value: data.kpis.inDevelopment,
      icon: Cog,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Planned",
      value: data.kpis.planned,
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Value Generated",
      value: `$${(data.kpis.valueGenerated / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Manhour Savings",
      value: `${data.kpis.manhourSavings}K`,
      icon: Clock,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Robots",
      value: data.kpis.robots,
      icon: Cpu,
      color: "from-red-500 to-red-600",
    },
  ]

  const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444", "#8b5cf6"]
  const totalSavings = data.savingsByDirectorate.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {kpiCards.map((kpi, index) => (
          <Card
            key={index}
            className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${kpi.color} opacity-5`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-slate-600 dark:text-slate-300">{kpi.title}</CardTitle>
              <div className={`p-1.5 rounded-lg bg-gradient-to-br ${kpi.color}`}>
                <kpi.icon className="h-3 w-3 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-slate-800 dark:text-white">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-white">
              Dollar Savings by Directorate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.savingsByDirectorate}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.savingsByDirectorate.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}M`, "Savings"]} />
                <Legend />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-800 dark:fill-white text-lg font-bold"
                >
                  ${totalSavings}M
                </text>
                <text
                  x="50%"
                  y="50%"
                  dy={20}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-600 dark:fill-slate-300 text-sm"
                >
                  Total
                </text>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Stacked Bar Chart */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-white">
              Project Status by Directorate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.projectStatusByDirectorate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="directorate" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="planning" stackId="a" fill="#3b82f6" name="Planning" />
                <Bar dataKey="development" stackId="a" fill="#f59e0b" name="Development" />
                <Bar dataKey="production" stackId="a" fill="#10b981" name="Production" />
                <Bar dataKey="underDiscussion" stackId="a" fill="#eab308" name="Under Discussion" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
