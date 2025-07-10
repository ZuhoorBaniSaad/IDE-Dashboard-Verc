"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Clock, AlertTriangle, XCircle } from "lucide-react"

interface DigitalAmbitionItem {
  programName: string
  phase: string
  comments: string
  status: "On Track" | "Delayed by 20%" | "Delayed by >50%" | "Significantly Delayed"
}

interface DigitalAmbitionTableProps {
  data: DigitalAmbitionItem[]
}

export function DigitalAmbitionTable({ data }: DigitalAmbitionTableProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "On Track":
        return <CheckCircle className="h-4 w-4" />
      case "Delayed by 20%":
        return <Clock className="h-4 w-4" />
      case "Delayed by >50%":
        return <AlertTriangle className="h-4 w-4" />
      case "Significantly Delayed":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "On Track":
        return "default"
      case "Delayed by 20%":
        return "secondary"
      case "Delayed by >50%":
        return "outline"
      case "Significantly Delayed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "text-green-600 bg-green-50 border-green-200"
      case "Delayed by 20%":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "Delayed by >50%":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "Significantly Delayed":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800 dark:text-white">Program Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-800">
                <TableHead className="font-semibold">Program Name</TableHead>
                <TableHead className="font-semibold">Phase</TableHead>
                <TableHead className="font-semibold">Comments</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <TableCell className="font-medium">{item.programName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">
                      {item.phase}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={item.comments}>
                      {item.comments}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(item.status)}`}
                    >
                      {getStatusIcon(item.status)}
                      <span className="text-sm font-medium">{item.status}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
