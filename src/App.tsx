import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BuyerHome from "./pages/buyer/Home";
import SellerHome from "./pages/seller/Home";
import AgentDashboard from "./pages/agent/Dashboard";
import ProductView from "./pages/buyer/ProductView";
import OrderSummary from "./pages/buyer/OrderSummary";
import PaymentConfirmation from "./pages/buyer/PaymentConfirmation";
import BuyerOrders from "./pages/buyer/Orders";
import SellerOrders from "./pages/seller/Orders";
import OrderNotification from "./pages/seller/OrderNotification";
import LogisticsHandover from "./pages/seller/LogisticsHandover";
import Simulation from "./pages/Simulation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/buyer" element={<BuyerHome />} />
            <Route path="/buyer/product" element={<ProductView />} />
            <Route path="/buyer/order-summary" element={<OrderSummary />} />
            <Route path="/buyer/payment-confirmation" element={<PaymentConfirmation />} />
            <Route path="/buyer/orders" element={<BuyerOrders />} />
            <Route path="/seller" element={<SellerHome />} />
            <Route path="/seller/orders" element={<SellerOrders />} />
            <Route path="/seller/order-notification" element={<OrderNotification />} />
            <Route path="/seller/logistics" element={<LogisticsHandover />} />
            <Route path="/agent" element={<AgentDashboard />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;