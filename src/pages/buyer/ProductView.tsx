import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { transactions } from "@/lib/mockData";
import { formatNaira } from "@/lib/mockData";

const ProductView = () => {
  const navigate = useNavigate();
  const transaction = transactions[0];

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
            <ShoppingBag className="h-6 w-6 text-orange-500" />
            <h1 className="text-xl font-semibold text-gray-900">Product Details</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg border border-orange-100 overflow-hidden">
              <img
                src={transaction.itemImage}
                alt={transaction.itemName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-white rounded border border-orange-100">
                  <img
                    src={transaction.itemImage}
                    alt={`${transaction.itemName} view ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{transaction.itemName}</h2>
              <p className="text-gray-600 text-lg">{transaction.itemDescription}</p>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-orange-100 text-orange-800">Lace</Badge>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{transaction.location}</span>
              </div>
            </div>

            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-lg">Price Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Item Price</span>
                  <span className="font-semibold">{formatNaira(transaction.itemPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold">{formatNaira(transaction.deliveryFee)}</span>
                </div>
                <div className="border-t border-orange-100 pt-3 flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold text-orange-600">{formatNaira(transaction.totalAmount)}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-lg">Seller Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name</span>
                  <span className="font-semibold">{transaction.sellerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-semibold">{transaction.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contact</span>
                  <span className="font-semibold">WhatsApp Available</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => navigate("/buyer/order-summary")}
              >
                Continue to Order
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Chat
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Call
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductView;