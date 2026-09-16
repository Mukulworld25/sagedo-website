import React from "react";
import { Suspense } from "react";
import { Switch, Route } from "wouter";
import { HelmetProvider } from 'react-helmet-async';
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { CurrencyProvider } from "@/contexts/CurrencyContext";

const Home = React.lazy(() => import("@/pages/Home"));
const Services = React.lazy(() => import("@/pages/Services"));
const About = React.lazy(() => import("@/pages/About"));
const Orders = React.lazy(() => import("@/pages/Orders"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const Admin = React.lazy(() => import("@/pages/Admin"));
const OrderDetails = React.lazy(() => import("@/pages/OrderDetails"));
const OrderSuccess = React.lazy(() => import("@/pages/OrderSuccess"));
const Login = React.lazy(() => import("@/pages/Login"));
const ForgotPassword = React.lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("@/pages/ResetPassword"));
const PrivacyPolicy = React.lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = React.lazy(() => import("@/pages/TermsOfService"));
const RefundPolicy = React.lazy(() => import("@/pages/RefundPolicy"));
const GrievanceOfficer = React.lazy(() => import("@/pages/GrievanceOfficer"));
const Contact = React.lazy(() => import("@/pages/Contact"));
const FAQ = React.lazy(() => import("@/pages/FAQ"));
const VerifyEmail = React.lazy(() => import("@/pages/verify-email"));
const Settings = React.lazy(() => import("@/pages/Settings"));
const Pay = React.lazy(() => import("@/pages/Pay"));
const FreeAudit = React.lazy(() => import("@/pages/FreeAudit"));
const AboutFounder = React.lazy(() => import("@/pages/AboutFounder"));
const Blog = React.lazy(() => import("@/pages/Blog"));
const BlogPost = React.lazy(() => import("@/pages/BlogPost"));
const AIReadinessCheck = React.lazy(() => import("@/pages/AIReadinessCheck"));
const AgencyAlternative = React.lazy(() => import("@/pages/AgencyAlternative"));
const FreelancerAlternative = React.lazy(() => import("@/pages/FreelancerAlternative"));
const DIYAlternative = React.lazy(() => import("@/pages/DIYAlternative"));
const Refer = React.lazy(() => import("@/pages/Refer"));
const AgencyPartner = React.lazy(() => import("@/pages/AgencyPartner"));
const BookCall = React.lazy(() => import("@/pages/BookCall"));
const Careers = React.lazy(() => import("@/pages/Careers"));
const Locations = React.lazy(() => import("@/pages/Locations"));
const PillarPage = React.lazy(() => import("@/pages/PillarPage"));
const NotFound = React.lazy(() => import("@/pages/not-found"));

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import CookieConsent from "@/components/CookieConsent";
import { apiRequest } from "@/lib/queryClient";
import { useEffect } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import ScrollToTop from "@/components/ScrollToTop";
import OnboardingSurvey from "@/components/OnboardingSurvey";
import AdminNotification from "@/components/AdminNotification";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { useAnalytics } from "@/hooks/useAnalytics";
import MobileAppEntry from "./MobileAppEntry";
import { useLocation } from "wouter";

function LoadingFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-7 w-7 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-zinc-500 font-medium">Loading SAGEDO…</p>
      </div>
    </div>
  );
}


function Router() {
  useAnalytics();
  const [location] = useLocation();
  if (location.startsWith("/app")) { return <MobileAppEntry />; }
  return (
    <>
      <ScrollToTop /><AdminNotification /><OnboardingSurvey /><Navigation />
      <Switch>
        <Route path="/"><Suspense fallback={<LoadingFallback />}><Home /></Suspense></Route>
        <Route path="/services"><Suspense fallback={<LoadingFallback />}><Services /></Suspense></Route>
        <Route path="/about"><Suspense fallback={<LoadingFallback />}><About /></Suspense></Route>
        <Route path="/orders"><Suspense fallback={<LoadingFallback />}><Orders /></Suspense></Route>
        <Route path="/login"><Suspense fallback={<LoadingFallback />}><Login /></Suspense></Route>
        <Route path="/forgot-password"><Suspense fallback={<LoadingFallback />}><ForgotPassword /></Suspense></Route>
        <Route path="/reset-password"><Suspense fallback={<LoadingFallback />}><ResetPassword /></Suspense></Route>
        <Route path="/dashboard"><Suspense fallback={<LoadingFallback />}><Dashboard /></Suspense></Route>
        <Route path="/admin"><Suspense fallback={<LoadingFallback />}><Admin /></Suspense></Route>
        <Route path="/admin/orders/:id"><Suspense fallback={<LoadingFallback />}><OrderDetails /></Suspense></Route>
        <Route path="/privacy-policy"><Suspense fallback={<LoadingFallback />}><PrivacyPolicy /></Suspense></Route>
        <Route path="/terms-of-service"><Suspense fallback={<LoadingFallback />}><TermsOfService /></Suspense></Route>
        <Route path="/refund-policy"><Suspense fallback={<LoadingFallback />}><RefundPolicy /></Suspense></Route>
        <Route path="/shipping-policy"><Suspense fallback={<LoadingFallback />}><RefundPolicy /></Suspense></Route>
        <Route path="/grievance-officer"><Suspense fallback={<LoadingFallback />}><GrievanceOfficer /></Suspense></Route>
        <Route path="/contact"><Suspense fallback={<LoadingFallback />}><Contact /></Suspense></Route>
        <Route path="/verify-email"><Suspense fallback={<LoadingFallback />}><VerifyEmail /></Suspense></Route>
        <Route path="/settings"><Suspense fallback={<LoadingFallback />}><Settings /></Suspense></Route>
        <Route path="/faq"><Suspense fallback={<LoadingFallback />}><FAQ /></Suspense></Route>
        <Route path="/order-success"><Suspense fallback={<LoadingFallback />}><OrderSuccess /></Suspense></Route>
        <Route path="/pay"><Suspense fallback={<LoadingFallback />}><Pay /></Suspense></Route>
        <Route path="/free-audit"><Suspense fallback={<LoadingFallback />}><FreeAudit /></Suspense></Route>
        <Route path="/about-founder"><Suspense fallback={<LoadingFallback />}><AboutFounder /></Suspense></Route>
        <Route path="/blog"><Suspense fallback={<LoadingFallback />}><Blog /></Suspense></Route>
        <Route path="/blog/:slug"><Suspense fallback={<LoadingFallback />}><BlogPost /></Suspense></Route>
        <Route path="/tools/ai-readiness-check"><Suspense fallback={<LoadingFallback />}><AIReadinessCheck /></Suspense></Route>
        <Route path="/alternatives/agency-alternative"><Suspense fallback={<LoadingFallback />}><AgencyAlternative /></Suspense></Route>
        <Route path="/alternatives/freelancer-alternative"><Suspense fallback={<LoadingFallback />}><FreelancerAlternative /></Suspense></Route>
        <Route path="/alternatives/diy-ai-alternative"><Suspense fallback={<LoadingFallback />}><DIYAlternative /></Suspense></Route>
        <Route path="/refer"><Suspense fallback={<LoadingFallback />}><Refer /></Suspense></Route>
        <Route path="/agency-partner"><Suspense fallback={<LoadingFallback />}><AgencyPartner /></Suspense></Route>
        <Route path="/book-call"><Suspense fallback={<LoadingFallback />}><BookCall /></Suspense></Route>
        <Route path="/careers"><Suspense fallback={<LoadingFallback />}><Careers /></Suspense></Route>
        <Route path="/locations"><Suspense fallback={<LoadingFallback />}><Locations /></Suspense></Route>
        
        {/* AEO / GEO Pillar & City Routes (Tasks B & C) */}
        <Route path="/ai-automation-agency-india"><Suspense fallback={<LoadingFallback />}><PillarPage slug="ai-automation-agency-india" /></Suspense></Route>
        <Route path="/b2b-lead-generation-systems"><Suspense fallback={<LoadingFallback />}><PillarPage slug="b2b-lead-generation-systems" /></Suspense></Route>
        <Route path="/custom-crm-development-chandigarh"><Suspense fallback={<LoadingFallback />}><PillarPage slug="custom-crm-development-chandigarh" /></Suspense></Route>
        <Route path="/custom-crm-development-ludhiana"><Suspense fallback={<LoadingFallback />}><PillarPage slug="custom-crm-development-ludhiana" /></Suspense></Route>
        <Route path="/custom-crm-development-panchkula"><Suspense fallback={<LoadingFallback />}><PillarPage slug="custom-crm-development-panchkula" /></Suspense></Route>
        <Route path="/ai-automation-agency-zirakpur"><Suspense fallback={<LoadingFallback />}><PillarPage slug="ai-automation-agency-zirakpur" /></Suspense></Route>

        <Route><Suspense fallback={<LoadingFallback />}><NotFound /></Suspense></Route>
      </Switch>
      <Footer /><ChatWidget /><CookieConsent /><ExitIntentPopup />
    </>
  );
}


export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LanguageProvider>
            <CurrencyProvider>
              <ErrorBoundary>
                <AuthProvider>
                  <TooltipProvider>
                    <Router /><Toaster />
                  </TooltipProvider>
                </AuthProvider>
              </ErrorBoundary>
            </CurrencyProvider>
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

