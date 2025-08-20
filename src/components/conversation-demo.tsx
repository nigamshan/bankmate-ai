import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AgentCard } from "@/components/ui/agent-card"
import { Send, Bot, User, Shield, CheckCircle } from "lucide-react"

interface Message {
  id: string
  type: "user" | "agent" | "system"
  content: string
  timestamp: Date
  agentType?: string
}

const sampleQueries = [
  "What's my account balance?",
  "I need to dispute a transaction",
  "What are your branch hours?",
  "Help me with a suspicious charge"
]

const agentResponses = {
  "What's my account balance?": [
    { agent: "Intent Agent", message: "Query classified as 'balance_inquiry'" },
    { agent: "Auth Agent", message: "Identity verified via biometric scan" },
    { agent: "Retrieval Agent", message: "Account data retrieved securely" },
    { agent: "Compliance Agent", message: "Balance disclosure approved" },
    { agent: "Response", message: "Your current balance is ₹1,25,847.50" }
  ],
  "I need to dispute a transaction": [
    { agent: "Intent Agent", message: "Query classified as 'transaction_dispute'" },
    { agent: "Auth Agent", message: "Enhanced verification required" },
    { agent: "Compliance Agent", message: "Dispute process initiated" },
    { agent: "Escalation Agent", message: "Escalating to human specialist with full context" }
  ]
}

export function ConversationDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "system",
      content: "Secure banking session initiated. How can I assist you today?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSampleQuery = async (query: string) => {
    setInputValue(query)
    await handleSendMessage(query)
  }

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || inputValue
    if (!content.trim() || isProcessing) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsProcessing(true)

    // Simulate agent processing
    const responses = agentResponses[content as keyof typeof agentResponses] || [
      { agent: "System", message: "Processing your request..." }
    ]

    for (let i = 0; i < responses.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const agentMessage: Message = {
        id: `${Date.now()}-${i}`,
        type: "agent",
        content: responses[i].message,
        timestamp: new Date(),
        agentType: responses[i].agent
      }
      setMessages(prev => [...prev, agentMessage])
    }

    setIsProcessing(false)
  }

  return (
    <section className="py-12 bg-gradient-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Live Conversation Demo</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience how our AI agents handle real banking queries with security and compliance.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AgentCard variant="secure" className="h-96">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                    <Shield className="h-5 w-5 text-banking-secure" />
                    <span className="font-semibold">Secure Banking Chat</span>
                    <div className="flex items-center gap-1 ml-auto">
                      <div className="w-2 h-2 bg-banking-success rounded-full animate-pulse" />
                      <span className="text-xs text-banking-success">Encrypted</span>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.type === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {message.type !== "user" && (
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg p-3 text-sm ${
                            message.type === "user"
                              ? "bg-primary text-primary-foreground"
                              : message.type === "system"
                              ? "bg-banking-secure/10 text-banking-secure"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {message.agentType && (
                            <div className="text-xs opacity-70 mb-1">
                              {message.agentType}
                            </div>
                          )}
                          {message.content}
                        </div>
                        {message.type === "user" && (
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-secondary-foreground" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isProcessing && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-primary animate-pulse" />
                        </div>
                        <div className="bg-muted rounded-lg p-3 text-sm">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask about your account..."
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      disabled={isProcessing}
                    />
                    <Button 
                      onClick={() => handleSendMessage()}
                      disabled={isProcessing || !inputValue.trim()}
                      size="icon"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </AgentCard>
            </div>

            <div className="space-y-4">
              <AgentCard>
                <h3 className="font-semibold mb-3">Sample Queries</h3>
                <div className="space-y-2">
                  {sampleQueries.map((query) => (
                    <Button
                      key={query}
                      variant="outline"
                      className="w-full text-left justify-start text-sm h-auto p-3"
                      onClick={() => handleSampleQuery(query)}
                      disabled={isProcessing}
                    >
                      {query}
                    </Button>
                  ))}
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