import { useState } from "react";
import { Users, Clock, CheckCircle2, Package, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { useTrustEscrow } from "@/components/TrustEscrowProvider";
import { formatNaira } from "@/components/TrustEscrowProvider";

export const AgentDashboard: React.FC = () => {
  const { orders } = useTrustEscrow();
  const [activeTab, setActiveTab] = useState("queue");

  const stats = [
    {
      icon: Clock,
      label: "Pending Payment",
      value: orders.filter((o) => o.status === "pending_payment").length,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: CheckCircle2,
      label: "Payment Confirmed",
      value: orders.filter((o) => o.status === "payment_confirmed").length,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Package,
      label: "In Transit",
      value: orders.filter((o) => o.status === "in_transit").length,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: TrendingUp,
      label: "Total Volume",
      value: formatNaira(
        orders.reduce((sum, o) => sum + o.totalAmount, 0)
      ),
      color: "text-brand-600",
      bg: "bg-brand-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              <CardContent className="p-4">
                <div
                  className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-2`}
                >
                  <Icon size={20} strokeWidth={2.5} />
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {typeof stat.value === "number" ? stat.value : stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-2 bg-white rounded-xl p-1 border border-border">
        <button
          onClick={() => setActiveTab("queue")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            activeTab === "queue"
              ? "bg-brand-500 text-white shadow-lg"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Transaction Queue
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            activeTab === "analytics"
              ? "bg-brand-500 text-white shadow-lg"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Analytics
        </button>
      </div>

      {activeTab === "queue" ? (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">Active Orders</h2>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <Card
                key={order.id}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => {}}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">#{order.id}</span>
                      <span className="text-xs text-muted-foreground">
                        {order.referenceCode}
                      </span>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Buyer</p>
                      <p className="font-medium text-foreground">{order.buyerName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Seller</p>
                      <p className="font-medium text-foreground">{order.sellerName}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <p className="text-sm font-bold text-brand-600">
                      {formatNaira(order.totalAmount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.item}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">Analytics</h2>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <TrendingUp size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Analytics dashboard coming soon
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
