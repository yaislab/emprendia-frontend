import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Welcome } from "./pages/Welcome";
import { IdeaPresentation } from "./pages/IdeaPresentation";
import ValidacionProblema from "./pages/ValidacionProblema";
import PerfilCliente from "./pages/PerfilCliente";
import PropuestaValor from "./pages/PropuestaValor";
import ConstruccionMVP from "./pages/ConstruccionMVP";
import FeedbackIA from "./pages/FeedbackIA";
import ResumenNegocio from "./pages/ResumenNegocio";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/bienvenida" element={<Welcome onStart={() => {}} />} />
          <Route path="/idea" element={<IdeaPresentation onNext={() => {}} onBack={() => {}} />} />
          <Route path="/problema" element={<ValidacionProblema />} />
          <Route path="/cliente" element={<PerfilCliente />} />
          <Route path="/propuesta" element={<PropuestaValor />} />
          <Route path="/mvp" element={<ConstruccionMVP />} />
          <Route path="/feedback" element={<FeedbackIA />} />
          <Route path="/resumen" element={<ResumenNegocio />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
