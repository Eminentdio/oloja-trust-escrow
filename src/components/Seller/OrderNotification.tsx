import { useNavigate } from "react-router-dom";
import { Bell, ShoppingBag, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/components/TrustEscrowProvider";
import { StatusBadge } from "@/components/StatusBadge";

export const OrderNotification: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto">
      <Card className="overflow-hidden border-0 shadow-xl shadow-brand-500/5">
        <CardHeader className="bg-money-600 text-white">
          <div className="flex items-center gap-2">
            <Bell size={20} strokeWidth={2.5} />
            <CardTitle className="text-white">New Order!</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          <div className="text-center p-6 bg-money-50 rounded-2xl border border-money-200">
            <p className="text-sm text-muted-foreground mb-1">
              You have a new order from
            </p>
            <p className="text-3xl font-extrabold text-foreground">Tunde</p>
            <p className="text-sm text-muted-foreground mt-1">
              London, UK 🇬🇧
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-border">
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center">
                <ShoppingBag size={24} className="text-brand-500" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground">
                  Aso-Oke Lace Fabric
                </p>
                <p className="text-sm text-muted-foreground">1 piece</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-brand-50 rounded-xl border border-brand-100">
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-extrabold text-brand-700">
                  {formatNaira(175000)}
                </p>
              </div>
              <StatusBadge status="pending_payment" />
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-border">
            <p className="text-sm font-semibold text-foreground mb-2">
              📋 What to do next:
            </p>
            <ol className="space-y-1.5 text-sm text-muted-foreground list-decimal list-inside">
              <li>Wait for the agent to confirm payment</li>
              <li>Once confirmed, prepare your item</li>
              <li>Logistics agent will pick up from you</li>
            </ol>
          </div>

          <Button
            onClick={() => navigate("/seller/logistics")}
            className="w-full h-14 rounded-xl text-base font-bold bg-money-600 hover:bg-money-700 shadow-lg shadow-money-600/30"
          >
            Check Order Status
            <ArrowRight size={20} strokeWidth={2.5} />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
