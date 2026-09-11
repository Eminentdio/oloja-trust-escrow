import { ShoppingBag, Truck, ShieldCheck, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/components/TrustEscrowProvider";

export const ProductView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto">
      <Card className="overflow-hidden border-0 shadow-xl shadow-brand-500/5">
        <div className="h-48 bg-gradient-to-br from-brand-100 to-brand-50 flex items-center justify-center">
          <ShoppingBag size={64} className="text-brand-400" strokeWidth={1.5} />
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-foreground">
            Aso-Oke Lace Fabric
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Beautiful hand-woven lace for traditional occasions
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between bg-brand-50 rounded-xl p-4">
            <div>
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="text-2xl font-bold text-brand-700">
                {formatNaira(150000)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-brand-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">₦</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border">
            <div className="w-10 h-10 rounded-full bg-money-100 flex items-center justify-center">
              <span className="text-lg">👤</span>
            </div>
            <div>
              <p className="font-semibold text-foreground">Mama Bose</p>
              <p className="text-xs text-muted-foreground">Balogun, Lagos</p>
            </div>
            <div className="ml-auto flex items-center gap-1 text-xs text-money-600 font-medium">
              <ShieldCheck size={14} strokeWidth={2.5} />
              Verified
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Truck size={18} className="text-purple-600" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Delivery</p>
              <p className="text-xs text-muted-foreground">
                Nationwide logistics available
              </p>
            </div>
          </div>

          <Button
            onClick={() => navigate("/buyer/order-summary")}
            className="w-full h-14 rounded-xl text-base font-bold bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/30"
          >
            Continue to Order
            <ChevronRight size={20} strokeWidth={2.5} />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
