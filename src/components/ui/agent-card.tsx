import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const agentCardVariants = cva(
  "relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-card transition-smooth",
  {
    variants: {
      variant: {
        default: "hover:shadow-banking hover:border-primary/20",
        active: "border-primary bg-gradient-primary text-primary-foreground shadow-banking",
        processing: "border-banking-warning bg-banking-warning/5 animate-pulse",
        success: "border-banking-success bg-banking-success/5",
        secure: "border-banking-secure bg-banking-secure/5 shadow-secure"
      },
      size: {
        default: "p-6",
        compact: "p-4",
        large: "p-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface AgentCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof agentCardVariants> {
  icon?: React.ReactNode
  title?: string
  description?: string
  status?: string
  metrics?: React.ReactNode
}

const AgentCard = React.forwardRef<HTMLDivElement, AgentCardProps>(
  ({ className, variant, size, icon, title, description, status, metrics, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(agentCardVariants({ variant, size, className }))}
        {...props}
      >
        {variant === "active" && (
          <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        )}
        
        <div className="relative">
          {(icon || title || status) && (
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {icon && (
                  <div className={cn(
                    "flex items-center justify-center rounded-full p-2",
                    variant === "active" ? "bg-white/20" : "bg-primary/10"
                  )}>
                    {icon}
                  </div>
                )}
                {title && (
                  <h3 className={cn(
                    "font-semibold",
                    variant === "active" ? "text-white" : "text-foreground"
                  )}>
                    {title}
                  </h3>
                )}
              </div>
              {status && (
                <span className={cn(
                  "text-xs px-2 py-1 rounded-full font-medium",
                  variant === "active" ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                )}>
                  {status}
                </span>
              )}
            </div>
          )}
          
          {description && (
            <p className={cn(
              "text-sm mb-4",
              variant === "active" ? "text-white/80" : "text-muted-foreground"
            )}>
              {description}
            </p>
          )}
          
          {children}
          
          {metrics && (
            <div className="mt-4 pt-4 border-t border-current/10">
              {metrics}
            </div>
          )}
        </div>
      </div>
    )
  }
)
AgentCard.displayName = "AgentCard"

export { AgentCard, agentCardVariants }