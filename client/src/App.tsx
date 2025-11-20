import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AIAssistant } from "@/components/ui/ai-assistant";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ReportIssue from "@/pages/ReportIssue";
import Schemes from "@/pages/Schemes";
import Dashboard from "@/pages/Dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/report-issue" component={ReportIssue} />
      <Route path="/schemes" component={Schemes} />
      <Route path="/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <AIAssistant />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
