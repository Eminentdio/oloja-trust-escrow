import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { formatNaira, transactions } from "@/lib/mockData";
import { ArrowLeft, ShoppingBag, Clock, MapPin, MessageCircle, Phone, Truck } from "lucide-react";

const OrderNotification = () => {
  const navigate = useNavigate();
  const { updateTransaction } = useApp();
  const transaction = transactions[0];

  const handleConfirmPickup = () => {
    updateTransaction(transaction.id, {
      logisticsConfirmed: true,
      status: "in_transit",
    });
    navigate("/seller/logistics");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/seller")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-orange-500" />
            <h1 className="text-xl font-semibold text-gray-900">Order Notification</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* New Order Alert */}
          <Card className="border-orange-100 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">New Order!</h2>
                  <p className="text-gray-600">From Tunde</p>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-orange-200">
                <p className="text-2xl font-bold text-orange-700">{formatNaira(transaction.totalAmount)}</p>
                <p className="text-sm text-gray-600">{transaction.itemName}</p>
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="border-orange-100">
            <CardHeader>
              <CardTitle className="text-xl">Order Details</CardTitle>
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
                  <p className="text-sm text-gray-500">{transaction.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg border">
                  <p className="text-sm text-gray-600 mb-1">Buyer</p>
                  <p className="font-semibold">{transaction.buyerName}</p>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                  <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logistics Handover */}
          <Card className="border-orange-100">
            <CardHeader>
              <CardTitle className="text-xl">Logistics Handover</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <Truck className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Logistics Agent Pickup</h3>
                  <p className="text-gray-600">Confirm when the logistics agent picks up the item</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 mb-3">
                  The logistics agent will collect the item from you. Confirm pickup to start the delivery process.
                </p>
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={handleConfirmPickup}
                >
                  Confirm Pickup
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Buttons */}
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Chat with Buyer
            </Button>
            <Button variant="outline" className="flex-1 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Call Buyer
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderNotification;