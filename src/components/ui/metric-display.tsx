import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const metricDisplayVariants = cva(
  "flex items-center gap-2 transition-smooth",
  {
    variants: {
      variant: {
        default: "text-foreground",
        success: "text-banking-success",
        warning: "text-banking-warning",
        secure: "text-banking-secure",
        primary: "text-primary"
      },
      size: {
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface MetricDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricDisplayVariants> {
  label: string
  value: string | number
  trend?: "up" | "down" | "stable"
  icon?: React.ReactNode
}

const MetricDisplay = React.forwardRef<HTMLDivElement, MetricDisplayProps>(
  ({ className, variant, size, label, value, trend, icon, ...props }, ref) => {
    const getTrendIcon = () => {
      switch (trend) {
        case "up":
          return <span className="text-banking-success">↗</span>
        case "down":
          return <span className="text-destructive">↘</span>
        case "stable":
          return <span className="text-muted-foreground">→</span>
        default:
          return null
      }
    }

    return (
      <div
        ref={ref}
        className={cn(metricDisplayVariants({ variant, size, className }))}
        {...props}
      >
        {icon && <span className="opacity-70">{icon}</span>}
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground font-medium">{label}</span>
          <div className="flex items-center gap-1">
            <span className="font-semibold">{value}</span>
            {getTrendIcon()}
          </div>
        </div>
      </div>
    )
  }
)
MetricDisplay.displayName = "MetricDisplay"

export { MetricDisplay, metricDisplayVariants }