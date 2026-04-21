import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import GamesPage from "./pages/GamesPage";
import GameDetailPage from "./pages/GameDetailPage";
import NotFound from "./pages/NotFound";
import { LangProvider } from "@/components/ControlledChaos/LangContext";
import { LoginProvider } from "@/components/ControlledChaos/LoginContext";
import { LoginModal } from "@/components/ControlledChaos/LoginModal";
import { LogoutConfirmModal } from "@/components/ControlledChaos/LogoutConfirmModal";
import { FaqChatWidget } from "@/components/ControlledChaos/FaqChatWidget";
import { LivePurchases } from "@/components/ControlledChaos/LivePurchases";
import ProfilePage from "./pages/ProfilePage";
import { CommunityProvider } from "@/components/ControlledChaos/CommunityContext";
import { NotificationProvider } from "@/components/ControlledChaos/NotificationContext";
import { ComplaintProvider } from "@/components/ControlledChaos/ComplaintContext";
import { GamesProvider } from "@/components/ControlledChaos/GamesContext";
import { SettingsProvider } from "@/components/ControlledChaos/SettingsContext";
import { CouponProvider } from "@/components/ControlledChaos/CouponContext";
import { WalletProvider } from "@/components/ControlledChaos/WalletContext";
import CommunityPage from "./pages/CommunityPage";
import AdminDashboard from "./pages/AdminDashboard";
import BuyGemsPage from "./pages/BuyGemsPage";
import { AdminStatusProvider, useAdminStatus } from "@/components/ControlledChaos/AdminStatusContext";
import { AdminFinanceProvider } from "@/components/ControlledChaos/AdminFinanceContext";
import { OrderProvider } from "@/components/ControlledChaos/OrderContext";
import { StoryViewer } from "@/components/ControlledChaos/StoryViewer";

const StoryViewerWrapper = () => {
  const { isViewerOpen, closeViewer } = useAdminStatus();
  return isViewerOpen ? <StoryViewer onClose={closeViewer} /> : null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LangProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SettingsProvider>
        <CouponProvider>
        <GamesProvider>
          <NotificationProvider>
            <LoginProvider>
              <WalletProvider>
                <CommunityProvider>
                  <ComplaintProvider>
                  <AdminStatusProvider>
                    <OrderProvider>
                    <AdminFinanceProvider>
                    <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/games" element={<GamesPage />} />
                    <Route path="/game/:slug" element={<GameDetailPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/buy-gems" element={<BuyGemsPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <LoginModal />
                  <LogoutConfirmModal />
                  <FaqChatWidget />
                  <LivePurchases />
                  <StoryViewerWrapper />
                  </AdminFinanceProvider>
                  </OrderProvider>
                  </AdminStatusProvider>
                </ComplaintProvider>
              </CommunityProvider>
              </WalletProvider>
            </LoginProvider>
          </NotificationProvider>
        </GamesProvider>
        </CouponProvider>
        </SettingsProvider>
        </BrowserRouter>
      </LangProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
