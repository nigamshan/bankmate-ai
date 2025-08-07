import { BankingHeader } from "@/components/banking-header"
import { AgentWorkflow } from "@/components/agent-workflow"
import { ConversationDemo } from "@/components/conversation-demo"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <BankingHeader />
      <main>
        <AgentWorkflow />
        <ConversationDemo />
      </main>
    </div>
  );
};

export default Index;
