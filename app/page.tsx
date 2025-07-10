"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import { OverviewKPIs } from "@/components/overview-kpis"
import { DigitalAmbitionTable } from "@/components/digital-ambition-table"
import { RPASummary } from "@/components/rpa-summary"
import { IDEHighlights } from "@/components/ide-highlights"
import { CapabilityDevelopment } from "@/components/capability-development"
import { RecognitionAwards } from "@/components/recognition-awards"
import { TeamBuildingTable } from "@/components/team-building-table"
import { generatePDFReport } from "@/lib/pdf-generator"
import { dashboardData } from "@/lib/dashboard-data"

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    const now = new Date()
    const monthYear = now.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
    setCurrentDate(monthYear)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handlePDFExport = () => {
    generatePDFReport(dashboardData, currentDate)
  }

  return (
    <TooltipProvider>
      <div
        className={`min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 transition-colors duration-300`}
      >
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-indigo-200/50 dark:border-indigo-800/50 shadow-lg shadow-indigo-500/5">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">DC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Digital Centre of Excellence</h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">DCoE Dashboard – {currentDate}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              className="border-emerald-200 hover:bg-emerald-50 dark:border-emerald-700 dark:hover:bg-emerald-900 bg-transparent"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 space-y-8">
          {/* Overview KPIs */}
          <section>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
              Overview
            </h2>
            <OverviewKPIs data={dashboardData.overview} />
          </section>

          {/* Digital Ambition Program */}
          <section>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
              Digital Ambition Program
            </h2>
            <DigitalAmbitionTable data={dashboardData.digitalAmbition} />
          </section>

          {/* RPA Summary */}
          <section>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
              RPA Summary
            </h2>
            <RPASummary data={dashboardData.rpa} />
          </section>

          {/* IDE Highlights */}
          <section>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
              IDE Highlights
            </h2>
            <IDEHighlights data={dashboardData.ideHighlights} />
          </section>

          {/* Capability Development */}
          <section>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
              Capability Development
            </h2>
            <CapabilityDevelopment data={dashboardData.capabilityDevelopment} />
          </section>

          {/* Recognition & Awards */}
          <section>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
              Recognition & Awards
            </h2>
            <RecognitionAwards data={dashboardData.recognitionAwards} />
          </section>

          {/* Team Building */}
          <section>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
              Team Building Activities
            </h2>
            <TeamBuildingTable data={dashboardData.teamBuilding} />
          </section>
        </main>

        {/* Floating Action Button */}
        <Button
          onClick={handlePDFExport}
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 group"
          size="icon"
        >
          <Download className="h-7 w-7 group-hover:scale-110 transition-transform" />
        </Button>
      </div>
    </TooltipProvider>
  )
}
