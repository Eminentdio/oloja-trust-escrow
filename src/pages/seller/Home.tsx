import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { transactions, formatNaira } from "@/lib/mockData";
import { ArrowRight, ShoppingBag, Package, Clock, Shield, MessageCircle, CheckCircle, Truck } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-orange-500" />
            <h1 className="text-xl font-semibold text-gray-900">Welcome, Mama Bose</h1>
          </div>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Chat with Agent</span>
            <span className="sm:hidden">Agent</span>
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="bg-gradient-to-r from-green-500 to-green-400 rounded-2xl p-8 text-white mb-8">
          <Shield className="h-12 w-12 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Your sales are protected</h2>
          <p className="text-green-100 mb-6 max-w-md">
            You get paid only after the buyer confirms they received the item.
          </p>
          <Button
            className="bg-white text-green-600 hover:bg-green-50"
            onClick={() => navigate("/seller/orders")}
          >
            View My Orders
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Package, label: "My Orders", path: "/seller/orders", color: "bg-orange-100 text-orange-600" },
            { icon: Truck, label: "Logistics", path: "/seller/orders", color: "bg-blue-100 text-blue-600" },
            { icon: CheckCircle, label: "Confirmed", path: "/seller/orders", color: "bg-green-100 text-green-600" },
            { icon: Clock, label: "Pending", path: "/seller/orders", color: "bg-purple-100 text-purple-600" },
          ].map((item) => (
            <Button
              key={item.label}
              variant="outline"
              className="flex flex-col items-start gap-3 p-5 h-auto text-left"
              onClick={() => navigate(item.path)}
            >
              <div className={`w-12 h-12 rounded-full ${item.color}`}>
                <item.icon className="h-6 w-6" />
              </div>
              <span className="font-semibold">{item.label}</span>
            </Button>
          ))}
        </div>

        {/* Active Orders */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Your Active Orders</h2>
            <Button variant="ghost" size="sm" className="text-orange-600" onClick={() => navigate("/seller/orders")}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {transactions
              .filter((tx) => tx.sellerId === "seller-1")
              .map((tx) => (
                <Card key={tx.id} className="border-orange-100">
                  <CardContent className="p-4 flex items-center gap-4">
                    <img
                      src={tx.itemImage}
                      alt={tx.itemName}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{tx.itemName}</h3>
                      <p className="text-sm text-gray-600">{tx.id} · {formatNaira(tx.totalAmount)}</p>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800 whitespace-nowrap">
                      {tx.status === "pending_payment" ? "Payment Pending" : tx.status === "payment_confirmed" ? "Confirmed" : tx.status === "in_transit" ? "In Transit" : "Delivered"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate("/seller/order-notification")}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Escrow Info */}
        <Card className="border-orange-100">
          <CardHeader>
            <CardTitle className="text-lg">How Escrow Protects You</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <p className="text-gray-700">Buyer pays into escrow</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <p className="text-gray-700">Agent confirms payment</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <p className="text-gray-700">You ship the item</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-green-600 font-bold">4</span>
              </div>
              <p className="text-gray-700">Buyer confirms, you get paid</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Home;