import { useState, useEffect } from "react"
import { AgentCard } from "@/components/ui/agent-card"
import { MetricDisplay } from "@/components/ui/metric-display"
import { 
  MessageSquare, 
  Shield, 
  Database, 
  FileCheck, 
  Brain, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity
} from "lucide-react"

const agents = [
  {
    id: "intent",
    title: "Intent Agent",
    description: "Understands customer queries using NLU",
    icon: <MessageSquare className="h-5 w-5" />,
    metrics: { accuracy: "94.2%", latency: "0.2s" }
  },
  {
    id: "auth",
    title: "Authentication Agent", 
    description: "Verifies customer identity securely",
    icon: <Shield className="h-5 w-5" />,
    metrics: { success: "99.1%", fraud: "0.02%" }
  },
  {
    id: "data",
    title: "Retrieval Agent",
    description: "Fetches real-time account information",
    icon: <Database className="h-5 w-5" />,
    metrics: { accuracy: "99.8%", speed: "0.8s" }
  },
  {
    id: "compliance",
    title: "Compliance Agent",
    description: "Ensures regulatory compliance",
    icon: <FileCheck className="h-5 w-5" />,
    metrics: { score: "100%", checks: "47" }
  },
  {
    id: "decision",
    title: "Decision Agent",
    description: "Routes queries to auto-resolve or escalate",
    icon: <Brain className="h-5 w-5" />,
    metrics: { autoResolve: "73.2%", accuracy: "96.1%" }
  },
  {
    id: "escalation",
    title: "HITL Escalation Agent",
    description: "Manages human handoffs with context",
    icon: <AlertTriangle className="h-5 w-5" />,
    metrics: { handoffs: "89", context: "100%" }
  }
]

export function AgentWorkflow() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null)
  const [processingStep, setProcessingStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingStep((prev) => (prev + 1) % agents.length)
      setActiveAgent(agents[processingStep]?.id || null)
    }, 3000)

    return () => clearInterval(interval)
  }, [processingStep])

  const getAgentVariant = (agentId: string) => {
    if (agentId === activeAgent) return "active"
    if (agents.findIndex(a => a.id === agentId) < processingStep) return "success"
    if (agents.findIndex(a => a.id === agentId) === processingStep) return "processing"
    return "default"
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Multi-Agent Workflow</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch how our 6-agent system processes customer queries in real-time, 
            ensuring security, compliance, and optimal resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              variant={getAgentVariant(agent.id)}
              title={agent.title}
              description={agent.description}
              icon={agent.icon}
              status={
                agent.id === activeAgent ? "Processing" :
                agents.findIndex(a => a.id === agent.id) < processingStep ? "Complete" :
                "Waiting"
              }
              metrics={
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(agent.metrics).map(([key, value]) => (
                    <MetricDisplay
                      key={key}
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={value}
                      size="sm"
                      variant={agent.id === activeAgent ? "primary" : "default"}
                    />
                  ))}
                </div>
              }
            />
          ))}
        </div>

        <div className="bg-card border rounded-lg p-6 shadow-card">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Current Query: "What's my account balance?"
          </h3>
          <div className="space-y-3">
            {agents.map((agent, index) => (
              <div 
                key={agent.id}
                className={`flex items-center gap-3 p-3 rounded transition-smooth ${
                  index === processingStep ? "bg-primary/10 border border-primary/20" :
                  index < processingStep ? "bg-banking-success/5 border border-banking-success/20" :
                  "bg-muted/30"
                }`}
              >
                {index < processingStep ? (
                  <CheckCircle className="h-5 w-5 text-banking-success" />
                ) : index === processingStep ? (
                  <Clock className="h-5 w-5 text-primary animate-spin" />
                ) : (
                  <div className="h-5 w-5 rounded-full bg-muted" />
                )}
                <span className={`font-medium ${
                  index <= processingStep ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {agent.title}
                </span>
                {index === processingStep && (
                  <span className="text-sm text-primary">Processing...</span>
                )}
                {index < processingStep && (
                  <span className="text-sm text-banking-success">✓ Complete</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}