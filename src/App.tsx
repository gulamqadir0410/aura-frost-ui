import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { DocsLayout } from "./components/DocsLayout";

// Docs pages
import IntroductionPage from "./pages/docs/IntroductionPage";
import InstallationPage from "./pages/docs/InstallationPage";
import PublishingPage from "./pages/docs/PublishingPage";
import GlassLayersPage from "./pages/docs/GlassLayersPage";
import ColorsPage from "./pages/docs/ColorsPage";
import AnimationsPage from "./pages/docs/AnimationsPage";

// Component pages
import ButtonPage from "./pages/docs/components/ButtonPage";
import CardPage from "./pages/docs/components/CardPage";
import InputPage from "./pages/docs/components/InputPage";
import DialogPage from "./pages/docs/components/DialogPage";
import TabsPage from "./pages/docs/components/TabsPage";
import SwitchPage from "./pages/docs/components/SwitchPage";
import ToastPage from "./pages/docs/components/ToastPage";
import NavBarPage from "./pages/docs/components/NavBarPage";
import SidebarPage from "./pages/docs/components/SidebarPage";
import DropdownPage from "./pages/docs/components/DropdownPage";
import DataTablePage from "./pages/docs/components/DataTablePage";
import CommandPage from "./pages/docs/components/CommandPage";
import SegmentedPage from "./pages/docs/components/SegmentedPage";
import FABPage from "./pages/docs/components/FABPage";
import NotificationsPage from "./pages/docs/components/NotificationsPage";
import ChartPage from "./pages/docs/components/ChartPage";
import CryptoTrackerDemo from "./pages/CryptoTrackerDemo";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/examples/crypto-tracker" element={<CryptoTrackerDemo />} />
            <Route path="/docs" element={<DocsLayout />}>
              <Route path="introduction" element={<IntroductionPage />} />
              <Route path="installation" element={<InstallationPage />} />
              <Route path="glass-layers" element={<GlassLayersPage />} />
              <Route path="colors" element={<ColorsPage />} />
              <Route path="animations" element={<AnimationsPage />} />
              <Route path="components/button" element={<ButtonPage />} />
              <Route path="components/card" element={<CardPage />} />
              <Route path="components/input" element={<InputPage />} />
              <Route path="components/dialog" element={<DialogPage />} />
              <Route path="components/tabs" element={<TabsPage />} />
              <Route path="components/switch" element={<SwitchPage />} />
              <Route path="components/toast" element={<ToastPage />} />
              <Route path="components/navbar" element={<NavBarPage />} />
              <Route path="components/sidebar" element={<SidebarPage />} />
              <Route path="components/dropdown" element={<DropdownPage />} />
              <Route path="components/data-table" element={<DataTablePage />} />
              <Route path="components/command" element={<CommandPage />} />
              <Route path="components/segmented" element={<SegmentedPage />} />
              <Route path="components/fab" element={<FABPage />} />
              <Route path="components/notifications" element={<NotificationsPage />} />
              <Route path="components/chart" element={<ChartPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
