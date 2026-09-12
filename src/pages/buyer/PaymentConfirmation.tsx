import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { transactions, formatNaira } from "@/lib/mockData";
import { ArrowLeft, Clock, CheckCircle, Shield, MessageCircle, Phone } from "lucide-react";

const PaymentConfirmation = () => {
  const navigate = useNavigate();
  const { transactions } = useApp();
  const transaction = transactions.find((tx) => tx.id === "TM-2847") || transactions[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/buyer")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-orange-500" />
            <h1 className="text-xl font-semibold text-gray-900">Payment Confirmation</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Status Card */}
          <Card className="border-orange-100">
            <CardContent className="pt-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-10 w-10 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Waiting for Agent to confirm payment...</h2>
                <p className="text-gray-600 mb-6">
                  Your payment is safe with us. The agent will confirm it shortly and notify the seller.
                </p>

                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-4 bg-white rounded-lg border">
                    <p className="text-sm text-gray-600 mb-1">Reference Code</p>
                    <p className="text-lg font-bold">{transaction.paymentReference}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <p className="text-sm text-gray-600 mb-1">Amount</p>
                    <p className="text-lg font-bold text-orange-600">{formatNaira(transaction.totalAmount)}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <p className="text-sm text-gray-600 mb-1">Seller</p>
                    <p className="text-lg font-semibold">{transaction.sellerName}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border">
                    <p className="text-sm text-gray-600 mb-1">Item</p>
                    <p className="text-lg font-semibold">{transaction.itemName}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps Card */}
          <Card className="border-orange-100">
            <CardHeader>
              <CardTitle className="text-xl">What happens next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-orange-600 font-bold">1</span>
                </div>
                <p className="text-gray-700">Agent confirms your payment</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-orange-600 font-bold">2</span>
                </div>
                <p className="text-gray-700">Seller gets notified and prepares your order</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-orange-600 font-bold">3</span>
                </div>
                <p className="text-gray-700">You confirm receipt when the item arrives</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-green-600 font-bold">4</span>
                </div>
                <p className="text-gray-700">Seller receives the money</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-lg py-6">
              Contact Agent
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/buyer")}
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              My Orders
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentConfirmation;