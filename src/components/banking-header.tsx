import { Shield, Activity, Users, Clock } from "lucide-react"
import { MetricDisplay } from "@/components/ui/metric-display"

export function BankingHeader() {
  return (
    <header className="border-b bg-gradient-surface">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Banking Agent Orchestrator
            </h1>
            <p className="text-muted-foreground mt-1">
              Autonomous customer service with 70%+ resolution rate
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-banking-success/10 border border-banking-success/20 rounded-full">
            <Shield className="h-4 w-4 text-banking-success" />
            <span className="text-sm font-medium text-banking-success">System Secure</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricDisplay
            variant="success"
            label="Resolution Rate"
            value="73.2%"
            trend="up"
            icon={<Activity className="h-4 w-4" />}
          />
          <MetricDisplay
            variant="primary"
            label="Active Sessions"
            value="1,247"
            trend="stable"
            icon={<Users className="h-4 w-4" />}
          />
          <MetricDisplay
            variant="secure"
            label="Avg Response Time"
            value="1.3s"
            trend="down"
            icon={<Clock className="h-4 w-4" />}
          />
          <MetricDisplay
            variant="warning"
            label="Escalations Today"
            value="89"
            trend="down"
            icon={<Shield className="h-4 w-4" />}
          />
        </div>
      </div>
    </header>
  )
}