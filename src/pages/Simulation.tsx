import BuyerHome from "./buyer/Home";
import SellerHome from "./seller/Home";
import AgentDashboard from "./agent/Dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Phone, Laptop, Tablet, Monitor } from "lucide-react";

const Simulation = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Multi-Device Simulation</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Monitor className="h-4 w-4" />
              Desktop View
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Device Info */}
          <Card className="border-orange-100">
            <CardHeader>
              <CardTitle className="text-lg">See how TrustEscrow works across devices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-orange-500" />
                  <div>
                    <h3 className="font-semibold">Buyer (Mobile)</h3>
                    <p className="text-sm text-gray-600">Tunde in London</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-orange-500" />
                  <div>
                    <h3 className="font-semibold">Seller (Mobile)</h3>
                    <p className="text-sm text-gray-600">Mama Bose in Balogun</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Laptop className="h-6 w-6 text-orange-500" />
                  <div>
                    <h3 className="font-semibold">Agent (Desktop)</h3>
                    <p className="text-sm text-gray-600">Back Office</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Simulation View */}
          <div className="grid lg:grid-cols-[300px_300px_1fr] gap-6">
            {/* Buyer View */}
            <div className="h-[600px] overflow-hidden rounded-lg border border-orange-200">
              <BuyerHome />
            </div>

            {/* Seller View */}
            <div className="h-[600px] overflow-hidden rounded-lg border border-orange-200">
              <SellerHome />
            </div>

            {/* Agent View */}
            <div className="h-[600px] overflow-hidden rounded-lg border border-orange-200">
              <AgentDashboard />
            </div>
          </div>

          {/* Legend */}
          <Card className="border-orange-100">
            <CardHeader>
              <CardTitle className="text-lg">Transaction Flow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-orange-600 font-bold">1</span>
                </div>
                <p className="text-gray-700">
                  Buyer pays into escrow (Buyer Mobile View)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-orange-600 font-bold">2</span>
                </div>
                <p className="text-gray-700">
                  Agent confirms payment (Agent Desktop View)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-orange-600 font-bold">3</span>
                </div>
                <p className="text-gray-700">
                  Seller confirms pickup (Seller Mobile View)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-orange-600 font-bold">4</span>
                </div>
                <p className="text-gray-700">
                  Buyer confirms receipt (Buyer Mobile View)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-green-600 font-bold">5</span>
                </div>
                <p className="text-gray-700">
                  Seller receives payment (Agent Desktop View)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Simulation;