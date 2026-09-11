import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { TrustEscrowProvider } from "@/components/TrustEscrowProvider";

createRoot(document.getElementById("root")!).render(
  <TrustEscrowProvider>
    <App />
  </TrustEscrowProvider>
);