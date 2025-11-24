import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Chatbot } from "@/components/chatbot";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/hooks/use-theme";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ReportIssue from "@/pages/ReportIssue";
import Schemes from "@/pages/Schemes";
import Dashboard from "@/pages/Dashboard";
import AdminDashboard from "@/pages/admin-dashboard";
import Analytics from "@/pages/Analytics";
import Auth from "@/pages/Auth";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/report-issue" component={ReportIssue} />
      <Route path="/schemes" component={Schemes} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/analytics" component={Analytics} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="digital-public-seva-theme">
        <TooltipProvider>
          <Toaster />
          <Router />
          <Footer />
          <Chatbot />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
