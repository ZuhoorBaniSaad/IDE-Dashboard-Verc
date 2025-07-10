"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Lightbulb } from "lucide-react"
import { useState } from "react"

interface IDEHighlight {
  title: string
  description: string
  details: string[]
}

interface IDEHighlightsProps {
  data: IDEHighlight[]
}

export function IDEHighlights({ data }: IDEHighlightsProps) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((highlight, index) => (
        <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
          <Collapsible open={openItems.includes(index)} onOpenChange={() => toggleItem(index)}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600">
                      <Lightbulb className="h-4 w-4 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-slate-800 dark:text-white">
                      {highlight.title}
                    </CardTitle>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${openItems.includes(index) ? "rotate-180" : ""}`}
                  />
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <p className="text-slate-600 dark:text-slate-300 mb-4">{highlight.description}</p>
                <ul className="space-y-2">
                  {highlight.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      ))}
    </div>
  )
}
