import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ShoppingBag, Truck, User } from "lucide-react";
import { useApp } from "@/context/AppContext";

const Index = () => {
  const { setRole, setCurrentUser } = useApp();

  const handleRoleSelect = (role: "buyer" | "seller" | "agent") => {
    setRole(role);
    setCurrentUser({
      id: role === "buyer" ? "buyer-1" : role === "seller" ? "seller-1" : "agent-1",
      name: role === "buyer" ? "Tunde" : role === "seller" ? "Mama Bose" : "Agent Chidi",
      location: role === "buyer" ? "London, UK" : role === "seller" ? "Balogun, Lagos" : "Back Office",
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role === "buyer" ? "tunde" : role === "seller" ? "bose" : "chidi"}`,
    });
    // Navigate to role-specific home page
    if (role === "buyer") {
      window.location.href = "/buyer";
    } else if (role === "seller") {
      window.location.href = "/seller";
    } else if (role === "agent") {
      window.location.href = "/agent";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-400 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-12 w-12" />
            <h1 className="text-4xl font-bold">TrustEscrow</h1>
          </div>
          <h2 className="text-3xl font-bold mb-4">Safe shopping, simple trust</h2>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl">
            Your money stays protected until you confirm you received your order.
            Built for informal markets in Nigeria.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button
              className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8 py-6"
              onClick={() => handleRoleSelect("buyer")}
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              I'm a Buyer
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-orange-100 text-lg px-8 py-6"
              onClick={() => handleRoleSelect("seller")}
            >
              <Truck className="mr-2 h-5 w-5" />
              I'm a Seller
            </Button>
          </div>
        </div>
      </div>

      {/* Role Selector */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Choose your role to get started
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card
            className="border-orange-100 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleRoleSelect("buyer")}
          >
            <CardHeader>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Buyer</CardTitle>
              <CardDescription>
                Shop safely from sellers across Nigeria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Pay into escrow, confirm receipt, and get your items safely.
              </p>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Enter as Buyer
              </Button>
            </CardContent>
          </Card>

          <Card
            className="border-orange-100 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleRoleSelect("seller")}
          >
            <CardHeader>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Seller</CardTitle>
              <CardDescription>
                Sell with confidence, get paid safely
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Receive orders, confirm logistics, and get paid when buyer confirms.
              </p>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Enter as Seller
              </Button>
            </CardContent>
          </Card>

          <Card
            className="border-orange-100 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleRoleSelect("agent")}
          >
            <CardHeader>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Agent</CardTitle>
              <CardDescription>
                Manage transactions and build trust
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Confirm payments, release funds, and resolve disputes.
              </p>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Enter as Agent
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white border-t border-orange-100">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How TrustEscrow Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: ShoppingBag, step: "1", title: "Pay into Escrow", desc: "Buyer pays safely" },
              { icon: Truck, step: "2", title: "Agent Confirms", desc: "Payment verified" },
              { icon: Truck, step: "3", title: "Seller Ships", desc: "Item dispatched" },
              { icon: Shield, step: "4", title: "Buyer Confirms", desc: "Seller gets paid" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-orange-600" />
                </div>
                <div className="text-sm font-medium text-orange-600 mb-1">Step {item.step}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;