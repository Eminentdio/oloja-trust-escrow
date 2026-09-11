import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/components/TrustEscrowProvider";

export const OrderSummary: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto">
      <button
        onClick={() => navigate("/buyer/product")}
        className="flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} />
        Back to product
      </button>

      <Card className="overflow-hidden border-0 shadow-xl shadow-brand-500/5">
        <CardHeader className="bg-brand-500 text-white">
          <div className="flex items-center gap-2">
            <Receipt size={20} strokeWidth={2.5} />
            <CardTitle className="text-white">Order Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-border">
            <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center">
              <span className="text-2xl">👗</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-foreground">Aso-Oke Lace Fabric</p>
              <p className="text-sm text-muted-foreground">1 piece</p>
            </div>
            <p className="font-bold text-foreground">
              {formatNaira(150000)}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Item Price</span>
              <span className="font-medium">{formatNaira(150000)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className="font-medium">{formatNaira(25000)}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between items-center">
              <span className="font-bold text-foreground">Total</span>
              <span className="text-2xl font-extrabold text-brand-600">
                {formatNaira(175000)}
              </span>
            </div>
          </div>

          <div className="p-4 bg-money-50 rounded-xl border border-money-200">
            <p className="text-sm font-semibold text-money-700 mb-1">
              💡 Your money is safe
            </p>
            <p className="text-xs text-money-600 leading-relaxed">
              Payment goes into escrow first. Money is released to the seller
              only after you confirm delivery.
            </p>
          </div>

          <Button
            onClick={() => navigate("/buyer/payment")}
            className="w-full h-14 rounded-xl text-base font-bold bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/30"
          >
            Proceed to Pay
            <ChevronRight size={20} strokeWidth={2.5} />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
