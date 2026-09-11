import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, CheckCircle2, Truck, Upload, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTrustEscrow } from "@/components/TrustEscrowProvider";
import { StatusBadge } from "@/components/StatusBadge";

export const LogisticsHandover: React.FC = () => {
  const navigate = useNavigate();
  const { orders, confirmLogistics } = useTrustEscrow();
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const order = orders.find((o) => o.id === "ORD-001");

  if (!order || order.status !== "payment_confirmed") {
    return (
      <div className="max-w-md mx-auto">
        <Card className="overflow-hidden border-0 shadow-xl shadow-brand-500/5">
          <CardContent className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Truck size={36} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              No Active Order
            </h2>
            <p className="text-sm text-muted-foreground">
              Wait for the agent to confirm payment before you can hand over
              the item.
            </p>
            <Button
              onClick={() => navigate("/seller")}
              className="mt-6 bg-brand-500 hover:bg-brand-600"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleConfirmPickup = () => {
    confirmLogistics(order.id);
    navigate("/seller/confirmation");
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="overflow-hidden border-0 shadow-xl shadow-brand-500/5">
        <CardHeader className="bg-money-600 text-white">
          <div className="flex items-center gap-2">
            <Truck size={20} strokeWidth={2.5} />
            <CardTitle className="text-white">
              Logistics Handover
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Order</p>
              <p className="font-bold text-foreground">{order.id}</p>
            </div>
            <StatusBadge status="payment_confirmed" />
          </div>

          <div className="p-4 bg-white rounded-xl border border-border">
            <p className="text-sm font-semibold text-foreground mb-2">
              Buyer: {order.buyerName}
            </p>
            <p className="text-sm text-muted-foreground">
              {order.buyerLocation}
            </p>
            <p className="text-sm font-semibold text-foreground mt-2 mb-1">
              Item: {order.item}
            </p>
            <p className="text-2xl font-extrabold text-brand-600">
              {order.totalAmount.toLocaleString("en-NG")}
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-foreground">
              Step 1: Take a Photo
            </p>
            <button
              onClick={() => setPhotoUploaded(!photoUploaded)}
              className={`w-full h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-colors ${
                photoUploaded
                  ? "border-money-500 bg-money-50"
                  : "border-border hover:border-brand-400"
              }`}
            >
              {photoUploaded ? (
                <div className="text-center">
                  <CheckCircle2
                    size={32}
                    className="text-money-500 mx-auto"
                  />
                  <p className="text-sm font-medium text-money-600 mt-1">
                    Photo uploaded!
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <Camera size={28} className="text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground mt-1">
                    Tap to upload item photo
                  </p>
                </div>
              )}
            </button>
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-foreground">
              Step 2: Confirm Pickup
            </p>
            <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-border">
              <MapPin size={18} className="text-brand-500" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Pickup Location
                </p>
                <p className="text-xs text-muted-foreground">
                  {order.sellerLocation}
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleConfirmPickup}
            className="w-full h-14 rounded-xl text-base font-bold bg-money-600 hover:bg-money-700 shadow-lg shadow-money-600/30"
          >
            <CheckCircle2 size={20} strokeWidth={2.5} />
            I've Handed Over the Item
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
