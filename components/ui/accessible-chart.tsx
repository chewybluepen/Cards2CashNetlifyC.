"use client"

import type { ReactNode } from "react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { cn } from "@/lib/utils"

interface AccessibleChartProps {
  data: any[]
  type?: "line" | "bar" | "pie"
  dataKey: string
  nameKey?: string
  xAxisDataKey?: string
  width?: number | string
  height?: number | string
  className?: string
  colors?: string[]
  title?: string
  description?: string
  children?: ReactNode
}

export function AccessibleChart({
  data,
  type = "line",
  dataKey,
  nameKey,
  xAxisDataKey = "name",
  width = "100%",
  height = 300,
  className,
  colors = ["#E50914", "#0070F3", "#10B981", "#F59E0B", "#8B5CF6"],
  title,
  description,
  children,
}: AccessibleChartProps) {
  // Default chart colors with good contrast
  const defaultColors = {
    line: "#E50914", // Netflix red
    bar: "#0070F3", // Bright blue
    grid: "#555555", // Dark gray for grid lines
    text: "#FFFFFF", // White for text
  }

  // Render appropriate chart based on type
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={defaultColors.grid} className="chart-grid" />
            <XAxis
              dataKey={xAxisDataKey}
              stroke={defaultColors.text}
              tick={{ fill: defaultColors.text }}
              className="chart-label"
            />
            <YAxis stroke={defaultColors.text} tick={{ fill: defaultColors.text }} className="chart-label" />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.9)", color: "#FFFFFF", border: "1px solid #333" }}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Legend wrapperStyle={{ color: defaultColors.text }} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={colors[0] || defaultColors.line}
              strokeWidth={2}
              activeDot={{ r: 8 }}
              className="chart-line"
            />
            {children}
          </LineChart>
        )
      case "bar":
        return (
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={defaultColors.grid} className="chart-grid" />
            <XAxis
              dataKey={xAxisDataKey}
              stroke={defaultColors.text}
              tick={{ fill: defaultColors.text }}
              className="chart-label"
            />
            <YAxis stroke={defaultColors.text} tick={{ fill: defaultColors.text }} className="chart-label" />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.9)", color: "#FFFFFF", border: "1px solid #333" }}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Legend wrapperStyle={{ color: defaultColors.text }} />
            <Bar dataKey={dataKey} fill={colors[0] || defaultColors.bar} className="chart-bar" />
            {children}
          </BarChart>
        )
      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey || xAxisDataKey}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              className="chart-pie"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.9)", color: "#FFFFFF", border: "1px solid #333" }}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Legend wrapperStyle={{ color: defaultColors.text }} />
            {children}
          </PieChart>
        )
    }
  }

  return (
    <div className={cn("w-full", className)}>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {description && <p className="text-sm mb-4 text-gray-300">{description}</p>}
      <div className="w-full" style={{ height }} aria-label={title || `${type} chart`}>
        <ResponsiveContainer width={width} height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      {/* Hidden table for screen readers */}
      <table className="sr-only">
        <caption>{title || `${type} chart data`}</caption>
        <thead>
          <tr>
            <th scope="col">{xAxisDataKey}</th>
            <th scope="col">{dataKey}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item[xAxisDataKey]}</td>
              <td>{item[dataKey]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

