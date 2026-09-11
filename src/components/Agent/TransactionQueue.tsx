import { useState } from "react";
import { Search, Filter, Clock, CheckCircle2, Package, AlertTriangle, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { useTrustEscrow } from "@/components/TrustEscrowProvider";
import { formatNaira } from "@/components/TrustEscrowProvider";

interface TransactionQueueProps {
  onOrderSelect: (orderId: string) => void;
  selectedOrderId: string | null;
}

export const TransactionQueue: React.FC<TransactionQueueProps> = ({
  onOrderSelect,
  selectedOrderId,
}) => {
  const { orders, confirmPayment, releaseFunds, flagDispute } = useTrustEscrow();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.referenceCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action: "confirm" | "release" | "dispute", orderId: string) => {
    switch (action) {
      case "confirm":
        confirmPayment(orderId);
        break;
      case "release":
        releaseFunds(orderId);
        break;
      case "dispute":
        flagDispute(orderId);
        break;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>
        <Button variant="outline" className="rounded-xl border-border">
          <Filter size={18} />
        </Button>
      </div>

      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <Card
            key={order.id}
            className={`overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
              selectedOrderId === order.id ? "ring-2 ring-brand-500" : ""
            }`}
            onClick={() => onOrderSelect(order.id)}
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

              <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Buyer</p>
                  <p className="font-medium text-foreground">{order.buyerName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Seller</p>
                  <p className="font-medium text-foreground">{order.sellerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="font-bold text-brand-600">
                    {formatNaira(order.totalAmount)}
                  </p>
                </div>
              </div>

              {selectedOrderId === order.id && (
                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  <p className="text-sm font-semibold text-foreground">
                    Quick Actions:
                  </p>
                  <div className="flex gap-2">
                    {order.status === "pending_payment" && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction("confirm", order.id);
                        }}
                        className="flex-1 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <CheckCircle2 size={16} className="mr-1" />
                        Confirm Payment
                      </Button>
                    )}
                    {order.status === "in_transit" && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction("release", order.id);
                        }}
                        className="flex-1 h-10 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Package size={16} className="mr-1" />
                        Release Funds
                      </Button>
                    )}
                    {order.status !== "dispute" && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction("dispute", order.id);
                        }}
                        variant="outline"
                        className="h-10 rounded-lg border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <AlertTriangle size={16} className="mr-1" />
                        Flag Dispute
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOrderSelect(selectedOrderId === order.id ? "" : order.id);
                }}
                className="w-full mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronRight
                  size={14}
                  className={`transform transition-transform ${
                    selectedOrderId === order.id ? "rotate-90" : "-rotate-90"
                  }`}
                />
                {selectedOrderId === order.id ? "Hide Actions" : "Show Actions"}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Clock size={32} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">No orders found</p>
        </div>
      )}
    </div>
  );
};