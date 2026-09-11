import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle2, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";

export const Confirmation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto">
      <button
        onClick={() => navigate("/buyer/product")}
        className="flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} />
        Back to home
      </button>

      <Card className="overflow-hidden border-0 shadow-xl shadow-brand-500/5">
        <CardHeader className="bg-brand-500 text-white text-center">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Clock size={32} className="text-white" strokeWidth={2.5} />
            </div>
          </div>
          <CardTitle className="text-white text-xl">
            Waiting for Agent to Confirm Payment...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          <div className="flex justify-center">
            <StatusBadge status="pending_payment" large />
          </div>

          <div className="p-4 bg-brand-50 rounded-xl border border-brand-100">
            <p className="text-sm font-semibold text-foreground mb-2">
              What happens next?
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <CheckCircle2
                  size={16}
                  className="text-brand-500 mt-0.5 shrink-0"
                />
                <span>Agent verifies your payment</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2
                  size={16}
                  className="text-brand-500 mt-0.5 shrink-0"
                />
                <span>Seller is notified to prepare your item</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2
                  size={16}
                  className="text-brand-500 mt-0.5 shrink-0"
                />
                <span>Logistics agent picks up the item</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2
                  size={16}
                  className="text-brand-500 mt-0.5 shrink-0"
                />
                <span>You receive your item and confirm delivery</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-border">
            <p className="text-xs text-muted-foreground mb-1">
              Reference Code
            </p>
            <p className="text-xl font-extrabold text-foreground tracking-wider">
              TM-2847
            </p>
          </div>

          <Button
            onClick={() => navigate("/buyer/product")}
            className="w-full h-12 rounded-xl font-bold bg-brand-500 hover:bg-brand-600"
          >
            Back to Home
          </Button>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Bell size={14} />
            <span>You will be notified when the status updates</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
