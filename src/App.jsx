import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import SubjectPage from "./pages/SubjectPage";
// import AllSubjects from "./pages/AllSubjects";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* <Route path="/subjects" element={<AllSubjects />} />
            <Route path="/subject/:subjectId" element={<SubjectPage />} /> */}

            {/* Catch All Route */}
            {/* <Route path="*" element={<NotFound />} /> */}

          </Routes>
        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;