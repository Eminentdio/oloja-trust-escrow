import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Smartphone, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/components/TrustEscrowProvider";

export const PaymentInstruction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto">
      <button
        onClick={() => navigate("/buyer/order-summary")}
        className="flex items-center gap-2 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors"
      >
        <ArrowLeft size={16} />
        Back to summary
      </button>

      <Card className="overflow-hidden border-0 shadow-xl shadow-brand-500/5">
        <CardHeader className="bg-brand-500 text-white">
          <div className="flex items-center gap-2">
            <Smartphone size={20} strokeWidth={2.5} />
            <CardTitle className="text-white">Pay into Escrow</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          <div className="text-center p-6 bg-brand-50 rounded-2xl">
            <p className="text-sm text-muted-foreground mb-1">Amount to Pay</p>
            <p className="text-4xl font-extrabold text-brand-700">
              {formatNaira(175000)}
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-foreground">How to Pay</p>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-border">
                <MessageCircle size={20} className="text-green-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">WhatsApp</p>
                  <p className="text-xs text-muted-foreground">
                    Send payment details to +234 801 234 5678
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-border">
                <Smartphone size={20} className="text-brand-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">Bank Transfer</p>
                  <p className="text-xs text-muted-foreground">
                    Account: 1234567890, Zenith Bank
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-money-50 rounded-xl border border-money-200 text-center">
            <p className="text-xs text-muted-foreground mb-1">
              Your Reference Code
            </p>
            <p className="text-2xl font-extrabold text-money-700 tracking-wider">
              TM-2847
            </p>
            <p className="text-xs text-money-600 mt-1">
              Share this code with the agent for verification
            </p>
          </div>

          <Button
            onClick={() => navigate("/buyer/confirmation")}
            className="w-full h-14 rounded-xl text-base font-bold bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/30"
          >
            I Have Paid
            <CheckCircle2 size={20} strokeWidth={2.5} />
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            After paying, the agent will verify your payment within 24 hours
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
