import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";

import Home from "@/pages/Home";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Orders from "@/pages/Orders";
import Tracking from "@/pages/Tracking";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import ForgotPassword from "@/pages/ForgotPassword";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import RefundPolicy from "@/pages/RefundPolicy";
import GrievanceOfficer from "@/pages/GrievanceOfficer";
import NotFound from "@/pages/not-found";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CookieConsent from "@/components/CookieConsent";
import { apiRequest } from "@/lib/queryClient";
import { useEffect } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";

function Router() {
  useEffect(() => {
    // Track visit
    apiRequest("POST", "/api/track-visit", { path: window.location.pathname })
      .catch(err => console.error("Failed to track visit", err));
  }, []);

  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/about" component={About} />
        <Route path="/orders" component={Orders} />
        <Route path="/track" component={Tracking} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/admin" component={Admin} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/refund-policy" component={RefundPolicy} />
        <Route path="/grievance-officer" component={GrievanceOfficer} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
      <WhatsAppFloat />
      <CookieConsent />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AuthProvider>
          <TooltipProvider>
            <Router />
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
