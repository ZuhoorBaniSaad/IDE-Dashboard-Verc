"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Search, Calendar, Users, CheckCircle, Clock } from "lucide-react"

interface TeamBuildingItem {
  teamName: string
  date: string
  activityName: string
  status: "Done" | "In Progress"
}

interface TeamBuildingTableProps {
  data: TeamBuildingItem[]
}

export function TeamBuildingTable({ data }: TeamBuildingTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof TeamBuildingItem>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const filteredData = data.filter(
    (item) =>
      item.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.activityName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (sortField === "date") {
      const aDate = new Date(aValue).getTime()
      const bDate = new Date(bValue).getTime()
      return sortDirection === "asc" ? aDate - bDate : bDate - aDate
    }

    return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
  })

  const handleSort = (field: keyof TeamBuildingItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getStatusIcon = (status: string) => {
    return status === "Done" ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />
  }

  const getStatusColor = (status: string) => {
    return status === "Done"
      ? "text-green-600 bg-green-50 border-green-200"
      : "text-blue-600 bg-blue-50 border-blue-200"
  }

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-semibold text-slate-800 dark:text-white flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Team Activities</span>
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search teams or activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-800">
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("teamName")}
                    className="font-semibold p-0 h-auto hover:bg-transparent"
                  >
                    Team Name
                    {sortField === "teamName" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("date")}
                    className="font-semibold p-0 h-auto hover:bg-transparent"
                  >
                    Date
                    {sortField === "date" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("activityName")}
                    className="font-semibold p-0 h-auto hover:bg-transparent"
                  >
                    Activity Name
                    {sortField === "activityName" && (
                      <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                    )}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((item, index) => (
                <TableRow key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <TableCell className="font-medium">{item.teamName}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.activityName}</TableCell>
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
        {sortedData.length === 0 && (
          <div className="text-center py-8 text-slate-500">No activities found matching your search.</div>
        )}
      </CardContent>
    </Card>
  )
}
