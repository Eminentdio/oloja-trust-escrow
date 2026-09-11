import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BuyerFlow from "./pages/BuyerFlow";
import SellerFlow from "./pages/SellerFlow";
import AgentDashboard from "./pages/AgentDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/buyer" element={<BuyerFlow />} />
          <Route path="/buyer/product" element={<BuyerFlow />} />
          <Route path="/buyer/order-summary" element={<BuyerFlow />} />
          <Route path="/buyer/payment" element={<BuyerFlow />} />
          <Route path="/buyer/confirmation" element={<BuyerFlow />} />
          <Route path="/seller" element={<SellerFlow />} />
          <Route path="/seller/logistics" element={<SellerFlow />} />
          <Route path="/seller/confirmation" element={<SellerFlow />} />
          <Route path="/agent" element={<AgentDashboard />} />
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;