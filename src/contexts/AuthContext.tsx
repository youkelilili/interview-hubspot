
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type UserRole = 'admin' | 'hr' | 'job_seeker';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  userRole: UserRole | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string, role?: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: Partial<Profile>) => Promise<void>;
  isAdmin: () => boolean;
  isHR: () => boolean;
  isJobSeeker: () => boolean;
  hasPermission: (requiredRoles: UserRole[]) => boolean;
};

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  role: UserRole;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchProfile(userId: string) {
    try {
      console.log("Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      console.log("Profile data:", data);
      setProfile(data);
      setUserRole(data.role || 'job_seeker');
      
      // Log role for debugging
      console.log("User role set to:", data.role || 'job_seeker');
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  const isAdmin = () => userRole === 'admin';
  const isHR = () => userRole === 'hr';
  const isJobSeeker = () => userRole === 'job_seeker';
  
  const hasPermission = (requiredRoles: UserRole[]) => {
    if (!userRole) return false;
    return requiredRoles.includes(userRole);
  };

  async function signIn(email: string, password: string) {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      // Redirect will happen after onAuthStateChange updates the profile and userRole
      toast.success("Signed in successfully");
    } catch (error: any) {
      toast.error(error.message || "An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  }

  async function signUp(email: string, password: string, firstName?: string, lastName?: string, role: UserRole = 'job_seeker') {
    try {
      console.log("Signing up with:", email, firstName, lastName, role);
      setLoading(true);
      
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            first_name: firstName, 
            last_name: lastName, 
            role 
          }
        }
      });
      
      if (authError) {
        console.error("Auth error during signup:", authError);
        toast.error(authError.message);
        return;
      }
      
      if (!authData.user) {
        console.error("No user returned from signup");
        toast.error("Failed to create user account");
        return;
      }
      
      console.log("Auth signup successful:", authData.user.id);
      
      // Manually create/update the profile
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: authData.user.id,
          first_name: firstName || null,
          last_name: lastName || null,
          role: role
        });
      
      if (profileError) {
        console.error("Error updating profile:", profileError);
        toast.error("Account created but profile setup failed");
      } else {
        console.log("Profile created/updated successfully for user:", authData.user.id);
      }
      
      navigate("/");
      toast.success("Account created successfully. Please check your email for verification.");
    } catch (error: any) {
      console.error("Error during signup:", error);
      toast.error(error.message || "An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      navigate("/login");
      toast.success("Signed out successfully");
    } catch (error: any) {
      toast.error(error.message || "An error occurred during sign out");
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(profileData: Partial<Profile>) {
    try {
      if (!user) return;
      
      const { error } = await supabase
        .from("profiles")
        .update(profileData)
        .eq("id", user.id);
      
      if (error) {
        toast.error(error.message);
        return;
      }
      
      // Refresh profile data
      fetchProfile(user.id);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message || "An error occurred while updating profile");
    }
  }

  const value = {
    session,
    user,
    profile,
    loading,
    userRole,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAdmin,
    isHR,
    isJobSeeker,
    hasPermission
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
