import { useState, useEffect } from "react"
import { AgentCard } from "@/components/ui/agent-card"
import { Bot, Shield, CheckCircle, Activity, Zap } from "lucide-react"

interface ProcessingStep {
  id: string
  agent: string
  message: string
  timestamp: Date
  status: "processing" | "completed" | "current"
}

const autonomousScenarios = [
  {
    title: "Balance Inquiry Processing",
    steps: [
      { agent: "Intent Agent", message: "Auto-classified: balance_inquiry", delay: 800 },
      { agent: "Auth Agent", message: "Biometric verification successful", delay: 1200 },
      { agent: "Retrieval Agent", message: "Account data retrieved securely", delay: 900 },
      { agent: "Compliance Agent", message: "Regulatory checks passed", delay: 600 },
      { agent: "Response Agent", message: "Balance: ₹1,25,847.50 delivered", delay: 400 }
    ]
  },
  {
    title: "Transaction Dispute Detection",
    steps: [
      { agent: "Intent Agent", message: "Auto-classified: transaction_dispute", delay: 700 },
      { agent: "Auth Agent", message: "Enhanced verification initiated", delay: 1000 },
      { agent: "Compliance Agent", message: "Fraud patterns analyzed", delay: 1100 },
      { agent: "Decision Agent", message: "Complex case detected", delay: 800 },
      { agent: "Escalation Agent", message: "Human specialist notified with context", delay: 600 }
    ]
  }
]

export function ConversationDemo() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const runAutonomousDemo = async () => {
    if (isRunning) return
    
    setIsRunning(true)
    setProcessingSteps([])
    setCurrentStep(0)
    
    const scenario = autonomousScenarios[currentScenario]
    
    for (let i = 0; i < scenario.steps.length; i++) {
      const step = scenario.steps[i]
      
      // Add step as processing
      const newStep: ProcessingStep = {
        id: `${Date.now()}-${i}`,
        agent: step.agent,
        message: step.message,
        timestamp: new Date(),
        status: "current"
      }
      
      setProcessingSteps(prev => [
        ...prev.map(s => ({ ...s, status: "completed" as const })),
        newStep
      ])
      setCurrentStep(i)
      
      await new Promise(resolve => setTimeout(resolve, step.delay))
    }
    
    // Mark last step as completed
    setProcessingSteps(prev => prev.map(s => ({ ...s, status: "completed" as const })))
    setIsRunning(false)
  }

  const switchScenario = () => {
    if (isRunning) return
    setCurrentScenario((prev) => (prev + 1) % autonomousScenarios.length)
    setProcessingSteps([])
    setCurrentStep(0)
  }

  useEffect(() => {
    // Auto-start demo
    const timer = setTimeout(() => {
      runAutonomousDemo()
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [currentScenario])

  return (
    <section className="py-12 bg-gradient-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Autonomous Agent Processing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch our AI agents autonomously handle banking queries with complete automation and security.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AgentCard variant="secure" className="h-96">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b">
                    <div className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-banking-secure" />
                      <span className="font-semibold">{autonomousScenarios[currentScenario].title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-banking-warning animate-pulse' : 'bg-banking-success'}`} />
                        <span className="text-xs text-muted-foreground">
                          {isRunning ? 'Processing' : 'Ready'}
                        </span>
                      </div>
                      <button
                        onClick={switchScenario}
                        disabled={isRunning}
                        className="text-xs text-primary hover:underline disabled:opacity-50"
                      >
                        Switch Demo
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {processingSteps.map((step, index) => (
                      <div key={step.id} className="flex gap-3 justify-start">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.status === 'completed' 
                            ? 'bg-banking-success/20 text-banking-success' 
                            : step.status === 'current'
                            ? 'bg-banking-warning/20 text-banking-warning'
                            : 'bg-muted'
                        }`}>
                          {step.status === 'completed' ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : step.status === 'current' ? (
                            <Bot className="h-4 w-4 animate-pulse" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </div>
                        <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                          step.status === 'completed'
                            ? 'bg-banking-success/10 text-banking-success'
                            : step.status === 'current'
                            ? 'bg-banking-warning/10 text-banking-warning'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <div className="text-xs opacity-70 mb-1">
                            {step.agent}
                          </div>
                          {step.message}
                        </div>
                      </div>
                    ))}
                    
                    {!isRunning && processingSteps.length === 0 && (
                      <div className="flex items-center justify-center h-32 text-muted-foreground">
                        <div className="text-center">
                          <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Autonomous processing will begin shortly...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">
                      Fully autonomous • No human intervention required
                    </span>
                    <button
                      onClick={runAutonomousDemo}
                      disabled={isRunning}
                      className="text-sm text-primary hover:underline disabled:opacity-50"
                    >
                      {isRunning ? 'Processing...' : 'Run Demo'}
                    </button>
                  </div>
                </div>
              </AgentCard>
            </div>

            <div className="space-y-4">
              <AgentCard>
                <h3 className="font-semibold mb-3">Autonomous Capabilities</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-banking-success mt-0.5" />
                    <span>Auto-classification of customer intents</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-banking-success mt-0.5" />
                    <span>Instant biometric verification</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-banking-success mt-0.5" />
                    <span>Real-time compliance monitoring</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-banking-success mt-0.5" />
                    <span>Smart escalation to humans</span>
                  </div>
                </div>
              </AgentCard>

              <AgentCard variant="secure">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Security Status
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-banking-success" />
                    <span>End-to-end encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-banking-success" />
                    <span>PCI DSS compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-banking-success" />
                    <span>Audit trail active</span>
                  </div>
                </div>
              </AgentCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}