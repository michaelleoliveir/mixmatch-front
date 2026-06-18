import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import CreatePlaylist from "./pages/CreatePlaylist.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Match from "./pages/Match.tsx";
import MatchResult from "./pages/MatchResult.tsx";
import MatchDetail from "./pages/MatchDetail.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner richColors />
      <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create-playlist" element={<CreatePlaylist />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/match" element={<Match />} />
          <Route path="/match/:matchCode" element={<MatchResult />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
