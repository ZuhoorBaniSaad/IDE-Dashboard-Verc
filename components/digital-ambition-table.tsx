"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Delayed by 20%":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Delayed by >50%":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "Significantly Delayed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800 dark:text-white">Program Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Program Name</TableHead>
                <TableHead className="font-semibold">Phase</TableHead>
                <TableHead className="font-semibold">Comments</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                  <TableCell className="font-medium">{item.programName}</TableCell>
                  <TableCell>{item.phase}</TableCell>
                  <TableCell className="max-w-xs truncate" title={item.comments}>
                    {item.comments}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
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
