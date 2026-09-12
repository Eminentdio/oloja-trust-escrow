import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { formatNaira, transactions } from "@/lib/mockData";
import { ArrowLeft, Shield, Clock, CheckCircle, ArrowRight } from "lucide-react";

const OrderSummary = () => {
  const navigate = useNavigate();
  const { updateTransaction } = useApp();
  const transaction = transactions[0];

  const handlePayIntoEscrow = () => {
    updateTransaction(transaction.id, {
      status: "payment_confirmed",
      escrowLocked: true,
    });
    navigate("/buyer/payment-confirmation");
  };

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
            <h1 className="text-xl font-semibold text-gray-900">Order Summary</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Order Details Card */}
          <Card className="border-orange-100">
            <CardHeader>
              <CardTitle className="text-xl">Your Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
                <img
                  src={transaction.itemImage}
                  alt={transaction.itemName}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{transaction.itemName}</h3>
                  <p className="text-gray-600">{transaction.itemDescription}</p>
                  <p className="text-sm text-gray-500">Seller: {transaction.sellerName}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Item Price</span>
                  <span className="font-medium">{formatNaira(transaction.itemPrice)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">{formatNaira(transaction.deliveryFee)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-xl font-bold text-orange-600">{formatNaira(transaction.totalAmount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Card */}
          <Card className="border-orange-100">
            <CardHeader>
              <CardTitle className="text-xl">Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">TrustEscrow Escrow</h3>
                  <p className="text-sm text-gray-600">Your money is held safely until you confirm receipt</p>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <h3 className="font-semibold text-yellow-800">How It Works</h3>
                </div>
                <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
                  <li>You pay into the escrow account</li>
                  <li>Seller prepares your order</li>
                  <li>You confirm receipt</li>
                  <li>Seller gets paid</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-lg py-6"
              onClick={handlePayIntoEscrow}
            >
              Pay {formatNaira(transaction.totalAmount)} into Escrow
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/buyer")}
              className="flex items-center gap-2"
            >
              <ArrowRight className="h-5 w-5" />
              Later
            </Button>
          </div>

          {/* Reference Code */}
          <Card className="border-orange-100 bg-orange-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Your Reference Code</p>
                <p className="text-2xl font-bold text-orange-700">{transaction.paymentReference}</p>
                <p className="text-sm text-gray-500 mt-2">Share this code with the agent</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OrderSummary;