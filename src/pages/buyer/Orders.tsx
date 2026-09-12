import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { transactions, formatNaira } from "@/lib/mockData";
import { ArrowLeft, ShoppingBag, Clock, Shield, CheckCircle, Truck, XCircle } from "lucide-react";

const Orders = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/buyer")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Shield className="h-6 w-6 text-orange-500" />
            <h1 className="text-xl font-semibold text-gray-900">My Orders</h1>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Orders", value: "4", icon: ShoppingBag, color: "text-orange-600" },
              { label: "Pending", value: "1", icon: Clock, color: "text-yellow-600" },
              { label: "In Transit", value: "1", icon: Truck, color: "text-blue-600" },
              { label: "Delivered", value: "2", icon: CheckCircle, color: "text-green-600" },
            ].map((stat) => (
              <Card key={stat.label} className="border-orange-100">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {transactions
              .filter((tx) => tx.buyerId === "buyer-1")
              .map((tx) => (
                <Card key={tx.id} className="border-orange-100">
                  <CardContent className="p-4 flex items-center gap-4">
                    <img
                      src={tx.itemImage}
                      alt={tx.itemName}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="font-semibold">{tx.itemName}</h3>
                      <p className="text-sm text-gray-600">{tx.itemDescription}</p>
                      <div className="flex items-center gap-3 text-sm">
                        <span>{tx.id}</span>
                        <span className="px-2 py-0.5 rounded-full text-xs">
                          {tx.status === "pending_payment" ? "Payment Pending" : tx.status === "payment_confirmed" ? "Confirmed" : tx.status === "in_transit" ? "In Transit" : "Delivered"}
                        </span>
                        <span>{formatNaira(tx.totalAmount)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {tx.status === "pending_payment" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/buyer/order-summary`)}
                        >
                          Pay
                        </Button>
                      )}
                      {tx.status === "payment_confirmed" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/buyer/payment-confirmation`)}
                        >
                          Waiting
                        </Button>
                      )}
                      {tx.status === "in_transit" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/buyer/orders`)}
                        >
                          Tracking
                        </Button>
                      )}
                      {tx.status === "delivered" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/buyer/orders`)}
                        >
                          Received
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Orders;