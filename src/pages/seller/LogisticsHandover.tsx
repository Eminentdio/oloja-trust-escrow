import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { formatNaira, transactions } from "@/lib/mockData";
import { ArrowLeft, Camera, Upload, CheckCircle, Truck, MapPin, Phone } from "lucide-react";

const LogisticsHandover = () => {
  const navigate = useNavigate();
  const { updateTransaction } = useApp();
  const transaction = transactions[0];

  const handleUploadPhoto = () => {
    // In a real app, this would open a file picker
    updateTransaction(transaction.id, {
      deliveryPhoto: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop",
    });
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
            <Truck className="h-6 w-6 text-orange-500" />
            <h1 className="text-xl font-semibold text-gray-900">Logistics Handover</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Status Banner */}
          <Card className="border-orange-100 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Pickup Confirmed</h2>
                  <p className="text-gray-600">The logistics agent has picked up the item</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload Photo Card */}
          <Card className="border-orange-100">
            <CardHeader>
              <CardTitle className="text-xl">Upload Pickup Photo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-orange-200 rounded-lg p-8 text-center">
                <Camera className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Take a photo of the item with the logistics agent</p>
                <p className="text-sm text-gray-500 mb-6">This helps the buyer know the item is on its way</p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={handleUploadPhoto}>
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
              </div>

              {transaction.deliveryPhoto && (
                <div className="rounded-lg overflow-hidden border">
                  <img
                    src={transaction.deliveryPhoto}
                    alt="Pickup photo"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pickup Details */}
          <Card className="border-orange-100">
            <CardHeader>
              <CardTitle className="text-xl">Pickup Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Item</span>
                <span className="font-semibold">{transaction.itemName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Buyer</span>
                <span className="font-semibold">{transaction.buyerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-semibold">{formatNaira(transaction.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location</span>
                <span className="font-semibold">{transaction.location}</span>
              </div>
            </CardContent>
          </Card>

          {/* Next Step */}
          <Card className="border-orange-100 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-lg">What happens next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-blue-600 mt-0.5" />
                <p className="text-blue-800">
                  The logistics agent will deliver the item. Once the buyer confirms receipt, the money will be released to you.
                </p>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-6" onClick={() => navigate("/seller")}>
            Back to Orders
          </Button>
        </div>
      </main>
    </div>
  );
};

export default LogisticsHandover;