import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { TransactionQueue } from "@/components/Agent/TransactionQueue";
import { ActionPanel } from "@/components/Agent/ActionPanel";
import { useTrustEscrow } from "@/components/TrustEscrowProvider";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const { currentRole, setCurrentRole } = useTrustEscrow();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    setCurrentRole("agent");
  }, [setCurrentRole]);

  if (currentRole !== "agent") {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="sm" />
          <button
            onClick={() => navigate("/")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Home
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">
              Agent Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage transactions and verify payments
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TransactionQueue
                onOrderSelect={setSelectedOrderId}
                selectedOrderId={selectedOrderId}
              />
            </div>
            <div className="lg:col-span-1">
              <ActionPanel selectedOrderId={selectedOrderId} />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-white py-4">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-muted-foreground">
          <p>© 2025 TrustEscrow — Safe trade, every time</p>
        </div>
      </footer>
    </div>
  );
};

export default AgentDashboard;