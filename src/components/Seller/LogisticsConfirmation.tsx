import { useNavigate } from "react-router-dom";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";

export const LogisticsConfirmation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto">
      <Card className="overflow-hidden border-0 shadow-xl shadow-brand-500/5">
        <CardHeader className="bg-money-600 text-white text-center">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Package size={32} className="text-white" />
            </div>
          </div>
          <CardTitle className="text-white text-xl">
            Item Handed Over!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          <div className="flex justify-center">
            <StatusBadge status="in_transit" large />
          </div>

          <div className="text-center p-4 bg-money-50 rounded-xl border border-money-200">
            <p className="text-sm text-muted-foreground">
              Your item is now in transit to
            </p>
            <p className="text-xl font-extrabold text-foreground">
              Tunde (London, UK)
            </p>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-money-500" />
              <span>Photo uploaded and verified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-money-500" />
              <span>Logistics agent has picked up the item</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-brand-500" />
              <span>Buyer will confirm delivery</span>
            </div>
          </div>

          <Button
            onClick={() => navigate("/seller")}
            className="w-full h-12 rounded-xl font-bold bg-money-600 hover:bg-money-700"
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
