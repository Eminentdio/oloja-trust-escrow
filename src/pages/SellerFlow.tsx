import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { OrderNotification } from "@/components/Seller/OrderNotification";
import { LogisticsHandover } from "@/components/Seller/LogisticsHandover";
import { LogisticsConfirmation } from "@/components/Seller/LogisticsConfirmation";
import { useTrustEscrow } from "@/components/TrustEscrowProvider";
import { StepIndicator } from "@/components/StepIndicator";

const SellerFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentRole, setCurrentRole } = useTrustEscrow();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ["Notification", "Logistics", "Confirmation"];

  // Update step based on URL
  useEffect(() => {
    setCurrentRole("seller");
    const path = location.pathname;
    if (path.includes("/seller/logistics")) {
      setCurrentStep(1);
    } else if (path.includes("/seller/confirmation")) {
      setCurrentStep(2);
    } else {
      // Default to notification view
      setCurrentStep(0);
    }
  }, [location.pathname, setCurrentRole]);

  if (currentRole !== "seller") {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="sm" />
          <button
            onClick={() => navigate("/")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Home
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>

          <div className="mt-8">
            {currentStep === 0 && <OrderNotification />}
            {currentStep === 1 && <LogisticsHandover />}
            {currentStep === 2 && <LogisticsConfirmation />}
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-white py-4">
        <div className="max-w-md mx-auto px-4 text-center text-xs text-muted-foreground">
          <p>© 2025 TrustEscrow — Safe trade, every time</p>
        </div>
      </footer>
    </div>
  );
};

export default SellerFlow;