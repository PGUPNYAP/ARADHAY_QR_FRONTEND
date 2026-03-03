import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import UserRequest from "./pages/UserRequest";
import UserDashboard from "./pages/UserDashboard";
import ViewMyQR from "./pages/ViewMyQR";
import MyProfile from "./pages/MyProfile";
import AllQRs from "./pages/AllQRs";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";

import { useEffect } from "react";
import { onIdTokenChanged } from "firebase/auth";
import { auth } from "./auth/firebase";

const queryClient = new QueryClient();

const App = () => {
  // ✅ Keep Firebase token fresh in localStorage automatically
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const userStr = localStorage.getItem("focusdesk_user");
          if (userStr) {
            const userData = JSON.parse(userStr);
            userData.token = token;
            // Also ensure uid is synced just in case
            userData.uid = user.uid;
            localStorage.setItem("focusdesk_user", JSON.stringify(userData));
          }
        } catch (error) {
          console.error("Failed to refresh Firebase token:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/login" element={<Login />} />

            <Route path="/user/request" element={<UserRequest />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/viewqr" element={<ViewMyQR />} />
            <Route path="/user/profile" element={<MyProfile />} />
            <Route path="/user/allqrs" element={<AllQRs />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard/*" element={<AdminDashboard />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
