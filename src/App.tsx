import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import GamesPage from "./pages/GamesPage.tsx";
import GameDetailPage from "./pages/GameDetailPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import { LangProvider } from "@/components/ControlledChaos/LangContext";
import { LoginProvider } from "@/components/ControlledChaos/LoginContext";
import { LoginModal } from "@/components/ControlledChaos/LoginModal";
import { LogoutConfirmModal } from "@/components/ControlledChaos/LogoutConfirmModal";
import { FaqChatWidget } from "@/components/ControlledChaos/FaqChatWidget";
import { LivePurchases } from "@/components/ControlledChaos/LivePurchases";
import { AccountSystem } from "@/components/ControlledChaos/AccountSystem";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LangProvider>
        <LoginProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/game/:slug" element={<GameDetailPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <LoginModal />
            <LogoutConfirmModal />
            <FaqChatWidget />
            <LivePurchases />
            <AccountSystem />
          </BrowserRouter>
        </LoginProvider>
      </LangProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
