import { CheckCircle2, Package, CreditCard, AlertTriangle, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { useTrustEscrow } from "@/components/TrustEscrowProvider";
import { formatNaira } from "@/components/TrustEscrowProvider";

interface ActionPanelProps {
  selectedOrderId: string | null;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({ selectedOrderId }) => {
  const { orders, confirmPayment, releaseFunds, flagDispute, confirmLogistics } = useTrustEscrow();

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  if (!selectedOrder) {
    return (
      <Card className="border-0 shadow-xl">
        <CardContent className="text-center py-16">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Package size={36} className="text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Select an Order
          </h2>
          <p className="text-sm text-muted-foreground">
            Click on an order from the queue to view details and take actions
          </p>
        </CardContent>
      </Card>
    );
  }

  const getStatusActions = () => {
    switch (selectedOrder.status) {
      case "pending_payment":
        return [
          {
            label: "Confirm Payment Received",
            icon: CheckCircle2,
            action: () => confirmPayment(selectedOrder.id),
            color: "bg-blue-600 hover:bg-blue-700",
            textColor: "text-white",
            description: "Move money from pending to escrow lock",
          },
        ];
      case "payment_confirmed":
        return [
          {
            label: "Confirm Logistics Handover",
            icon: Package,
            action: () => confirmLogistics(selectedOrder.id),
            color: "bg-purple-600 hover:bg-purple-700",
            textColor: "text-white",
            description: "Seller has handed over the item",
          },
          {
            label: "Flag Dispute",
            icon: AlertTriangle,
            action: () => flagDispute(selectedOrder.id),
            color: "bg-red-600 hover:bg-red-700",
            textColor: "text-white",
            description: "Mark this order as disputed",
          },
        ];
      case "in_transit":
        return [
          {
            label: "Release Funds to Seller",
            icon: CreditCard,
            action: () => releaseFunds(selectedOrder.id),
            color: "bg-green-600 hover:bg-green-700",
            textColor: "text-white",
            description: "Release escrow funds to seller after buyer confirmation",
          },
          {
            label: "Flag Dispute",
            icon: AlertTriangle,
            action: () => flagDispute(selectedOrder.id),
            color: "bg-red-600 hover:bg-red-700",
            textColor: "text-white",
            description: "Mark this order as disputed",
          },
        ];
      case "delivered":
        return [
          {
            label: "Order Complete",
            icon: CheckCircle2,
            action: () => {},
            color: "bg-green-600 hover:bg-green-700",
            textColor: "text-white",
            description: "Transaction completed successfully",
          },
        ];
      case "dispute":
        return [
          {
            label: "Resolve Dispute",
            icon: CheckCircle2,
            action: () => {},
            color: "bg-orange-600 hover:bg-orange-700",
            textColor: "text-white",
            description: "Mark dispute as resolved",
          },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-brand-500 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-white">Order Details</CardTitle>
            </div>
            <StatusBadge status={selectedOrder.status} large />
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-border">
              <p className="text-xs text-muted-foreground mb-1">Buyer</p>
              <p className="font-bold text-foreground">{selectedOrder.buyerName}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {selectedOrder.buyerLocation}
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-border">
              <p className="text-xs text-muted-foreground mb-1">Seller</p>
              <p className="font-bold text-foreground">{selectedOrder.sellerName}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {selectedOrder.sellerLocation}
              </p>
            </div>
          </div>

          <div className="p-4 bg-brand-50 rounded-xl border border-brand-100">
            <p className="text-xs text-muted-foreground mb-1">Item</p>
            <p className="font-bold text-foreground">{selectedOrder.item}</p>
            <p className="text-xl font-extrabold text-brand-600 mt-2">
              {formatNaira(selectedOrder.totalAmount)}
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-border">
            <p className="text-xs text-muted-foreground mb-1">Reference Code</p>
            <p className="text-xl font-extrabold text-foreground tracking-wider">
              {selectedOrder.referenceCode}
            </p>
          </div>

          {selectedOrder.logisticsPhoto && (
            <div className="p-4 bg-white rounded-xl border border-border">
              <p className="text-xs text-muted-foreground mb-2">Logistics Photo</p>
              <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <CreditCard size={24} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground ml-2">
                  Photo uploaded
                </span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">
              Human-in-the-Loop Actions:
            </p>
            {getStatusActions().map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className={`w-full p-4 rounded-xl ${action.color} ${action.textColor} shadow-lg hover:shadow-xl transition-all flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} strokeWidth={2.5} />
                    <div className="text-left">
                      <p className="font-bold">{action.label}</p>
                      <p className="text-xs opacity-90 mt-0.5">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={20} strokeWidth={2.5} />
                </button>
              );
            })}
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Created</p>
            <p className="text-sm font-medium text-foreground">
              {new Date(selectedOrder.createdAt).toLocaleDateString("en-NG", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};