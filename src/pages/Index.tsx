import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { RoleSelector } from "@/components/RoleSelector";
import { ShieldCheck } from "lucide-react";
import type { Role } from "@/components/TrustEscrowProvider";

const Index = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setTimeout(() => {
      navigate(`/${role}`);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck size={16} className="text-money-500" />
            <span>Safe Trade, Every Time</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight mb-4">
            Trade with
            <span className="text-brand-600 block">Confidence</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto">
            Your money is held safely until you confirm you received your item.
            No more worry. Just trust the process.
          </p>

          <div className="mb-12">
            <p className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
              Select your role
            </p>
            <RoleSelector onSelect={handleRoleSelect} />
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-money-500" />
              <span>Escrow Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-500" />
              <span>Human Agent Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span>WhatsApp Ready</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white py-4">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-muted-foreground">
          <p>© 2025 TrustEscrow — Safe trade for informal markets</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
