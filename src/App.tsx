
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import RolesManagement from "./pages/admin/RolesManagement";

// Optional: Create placeholder pages that we'll implement later
const HRDashboard = () => <div className="p-8">HR Dashboard (To be implemented)</div>;
const JobSeekerDashboard = () => <div className="p-8">Job Seeker Dashboard (To be implemented)</div>;
const InterviewManagement = () => <div className="p-8">Interview Management (To be implemented)</div>;
const JobListings = () => <div className="p-8">Job Listings (To be implemented)</div>;
const Questionnaires = () => <div className="p-8">Questionnaires (To be implemented)</div>;
const AIInterview = () => <div className="p-8">AI Interview Module (To be implemented)</div>;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* User Profile - available to all authenticated users */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/roles" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <RolesManagement />
              </ProtectedRoute>
            } />
            
            {/* HR Routes */}
            <Route path="/hr" element={
              <ProtectedRoute allowedRoles={['admin', 'hr']}>
                <HRDashboard />
              </ProtectedRoute>
            } />
            <Route path="/hr/interviews" element={
              <ProtectedRoute allowedRoles={['admin', 'hr']}>
                <InterviewManagement />
              </ProtectedRoute>
            } />
            
            {/* Job Seeker Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <JobSeekerDashboard />
              </ProtectedRoute>
            } />
            
            {/* Shared Routes with different access levels */}
            <Route path="/jobs" element={<JobListings />} />
            <Route path="/questionnaires" element={
              <ProtectedRoute>
                <Questionnaires />
              </ProtectedRoute>
            } />
            <Route path="/ai-interview" element={
              <ProtectedRoute>
                <AIInterview />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
