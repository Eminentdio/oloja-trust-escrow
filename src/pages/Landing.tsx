import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Handshake, ArrowRight, Smartphone, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = ({ onRoleSelect }: { onRoleSelect: (role: "buyer" | "seller" | "agent") => void }) => {
  const navigate = useNavigate();

  const roleOptions = [
    {
      role: "buyer" as const,
      title: "I want to buy",
      description: "Pay safely. Your money stays protected until you confirm delivery.",
      icon: Users,
      color: "text-orange-500",
      bg: "bg-orange-50",
      action: "Continue as Buyer",
    },
    {
      role: "seller" as const,
      title: "I want to sell",
      description: "Receive payment confirmation before you hand over the goods.",
      icon: Handshake,
      color: "text-green-600",
      bg: "bg-green-50",
      action: "Continue as Seller",
    },
    {
      role: "agent" as const,
      title: "I am an Agent",
      description: "Manage transactions, confirm payments, and keep everyone informed.",
      icon: Shield,
      color: "text-blue-600",
      bg: "bg-blue-50",
      action: "Continue as Agent",
    },
  ];

  const steps = [
    {
      title: "Pay into Escrow",
      description: "Buyer sends money to a trusted agent",
      icon: Smartphone,
    },
    {
      title: "Agent Confirms",
      description: "Agent verifies the payment and locks the funds",
      icon: CheckCircle2,
    },
    {
      title: "Goods Delivered",
      description: "Seller ships, buyer confirms receipt",
      icon: ArrowRight,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      {/* Header */}
      <header className="border-b border-orange-100 bg-white/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <Shield className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-900">TrustEscrow</span>
          </div>
          <Button variant="ghost" onClick={() => navigate("/")}>
            Home
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            Trusted by markets across Nigeria
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Safe trades,
            <span className="text-orange-500"> simple trust.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            A human agent holds your money safely until the buyer confirms the goods have arrived.
          </p>
        </div>

        {/* How it works */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {steps.map((step, index) => (
            <Card key={step.title} className="border-orange-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                  <step.icon className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
                <CardDescription className="text-gray-600">{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Role selection */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose how you want to use TrustEscrow</h2>
            <p className="text-gray-600">Select your role to continue</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {roleOptions.map((option) => (
              <Card
                key={option.role}
                className="border-2 border-transparent hover:border-orange-200 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => onRoleSelect(option.role)}
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-full ${option.bg} flex items-center justify-center mb-4`}>
                    <option.icon className={`h-7 w-7 ${option.color}`} />
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                  <CardDescription className="text-gray-600">{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    {option.action}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-orange-100 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600 text-sm">
          <p>TrustEscrow helps buyers and sellers trade with confidence across Nigerian markets.</p>
          <p className="mt-2">Prototype for demonstration purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;