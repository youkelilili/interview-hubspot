
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
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import RolesManagement from "./pages/admin/RolesManagement";

// HR pages
import HRDashboard from "./pages/hr/HRDashboard";
import JobManagement from "./pages/hr/JobManagement";
import InterviewManagement from "./pages/hr/InterviewManagement";

// JobSeeker pages
import JobSeekerDashboard from "./pages/jobseeker/JobSeekerDashboard";

// Optional: Create placeholder pages that we'll implement later
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
            <Route path="/hr/jobs" element={
              <ProtectedRoute allowedRoles={['admin', 'hr']}>
                <JobManagement />
              </ProtectedRoute>
            } />
            <Route path="/hr/interviews" element={
              <ProtectedRoute allowedRoles={['admin', 'hr']}>
                <InterviewManagement />
              </ProtectedRoute>
            } />
            
            {/* Job Seeker Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['job_seeker']}>
                <JobSeekerDashboard />
              </ProtectedRoute>
            } />
            
            {/* Public Job Routes */}
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            
            {/* Shared Routes with different access levels */}
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
