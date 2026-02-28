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
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
