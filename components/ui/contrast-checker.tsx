"use client"

import { useState, useEffect } from "react"
import { checkContrastRatio } from "@/lib/accessibility"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function ContrastChecker() {
  const [foreground, setForeground] = useState("#FFFFFF")
  const [background, setBackground] = useState("#000000")
  const [contrastRatio, setContrastRatio] = useState(21)
  const [wcagAA, setWcagAA] = useState(true)
  const [wcagAAA, setWcagAAA] = useState(true)

  useEffect(() => {
    const ratio = checkContrastRatio(foreground, background)
    setContrastRatio(ratio)
    setWcagAA(ratio >= 4.5)
    setWcagAAA(ratio >= 7)
  }, [foreground, background])

  const getContrastColor = (ratio: number) => {
    if (ratio >= 7) return "text-green-500"
    if (ratio >= 4.5) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Contrast Ratio Checker</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="foreground">Foreground Color</Label>
          <Input
            id="foreground"
            type="text"
            value={foreground}
            onChange={(e) => setForeground(e.target.value)}
            className="mb-2"
          />
          <Input
            type="color"
            value={foreground}
            onChange={(e) => setForeground(e.target.value)}
            className="w-full h-10"
          />
        </div>

        <div>
          <Label htmlFor="background">Background Color</Label>
          <Input
            id="background"
            type="text"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="mb-2"
          />
          <Input
            type="color"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="w-full h-10"
          />
        </div>
      </div>

      <div
        className="p-4 mb-4 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: background, color: foreground }}
      >
        <span className="text-xl font-bold">Sample Text</span>
      </div>

      <div className="space-y-2">
        <p className="font-semibold">
          Contrast Ratio: <span className={getContrastColor(contrastRatio)}>{contrastRatio.toFixed(2)}:1</span>
        </p>

        <p>
          WCAG AA (minimum 4.5:1):
          <span className={wcagAA ? "text-green-500 ml-2" : "text-red-500 ml-2"}>{wcagAA ? "Pass" : "Fail"}</span>
        </p>

        <p>
          WCAG AAA (minimum 7:1):
          <span className={wcagAAA ? "text-green-500 ml-2" : "text-red-500 ml-2"}>{wcagAAA ? "Pass" : "Fail"}</span>
        </p>
      </div>

      <div className="mt-4">
        <Button
          onClick={() => {
            setForeground("#FFFFFF")
            setBackground("#000000")
          }}
          variant="outline"
          className="w-full"
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

