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
        className={`min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-900 dark:to-emerald-950 transition-colors duration-300`}
      >
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-emerald-200 dark:border-emerald-800">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PDO</span>
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
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">Overview</h2>
            <OverviewKPIs data={dashboardData.overview} />
          </section>

          {/* Digital Ambition Program */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">Digital Ambition Program</h2>
            <DigitalAmbitionTable data={dashboardData.digitalAmbition} />
          </section>

          {/* RPA Summary */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">RPA Summary</h2>
            <RPASummary data={dashboardData.rpa} />
          </section>

          {/* IDE Highlights */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">IDE Highlights</h2>
            <IDEHighlights data={dashboardData.ideHighlights} />
          </section>

          {/* Capability Development */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">Capability Development</h2>
            <CapabilityDevelopment data={dashboardData.capabilityDevelopment} />
          </section>

          {/* Recognition & Awards */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">Recognition & Awards</h2>
            <RecognitionAwards data={dashboardData.recognitionAwards} />
          </section>

          {/* Team Building */}
          <section>
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">Team Building Activities</h2>
            <TeamBuildingTable data={dashboardData.teamBuilding} />
          </section>
        </main>

        {/* Floating Action Button */}
        <Button
          onClick={handlePDFExport}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          size="icon"
        >
          <Download className="h-6 w-6" />
        </Button>
      </div>
    </TooltipProvider>
  )
}
