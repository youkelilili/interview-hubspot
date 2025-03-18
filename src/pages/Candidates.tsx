
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CandidateCard, { CandidateType } from "@/components/CandidateCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Filter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Define types for our Supabase candidates table
type CandidateFromDB = {
  id: string;
  name: string;
  email: string;
  position: string | null;
  status: string;
  applied_date: string;
  avatar_url: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

const Candidates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { data: candidates, isLoading } = useQuery({
    queryKey: ["candidates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("candidates")
        .select("*")
        .order("applied_date", { ascending: false }) as { data: CandidateFromDB[] | null, error: any };

      if (error) {
        toast.error("Failed to load candidates: " + error.message);
        throw error;
      }
      
      return (data || []).map(candidate => ({
        id: candidate.id,
        name: candidate.name,
        email: candidate.email,
        avatar: candidate.avatar_url,
        position: candidate.position || "",
        status: candidate.status,
        appliedDate: formatTimeAgo(candidate.applied_date),
        tags: candidate.tags || [],
      }));
    },
  });

  const formatTimeAgo = (dateString?: string) => {
    if (!dateString) return "Unknown";
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 604800)} weeks ago`;
    
    return new Date(dateString).toLocaleDateString();
  };

  const filteredCandidates = candidates ? candidates.filter(candidate => {
    return (
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }) : [];

  const displayCandidates = currentTab === "all" 
    ? filteredCandidates 
    : filteredCandidates.filter(c => c.status.toLowerCase() === currentTab.toLowerCase());

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
              <p className="mt-1 text-gray-600">Manage and track all your candidates in one place</p>
            </div>
            <Button 
              className="mt-4 md:mt-0 bg-brand-700 hover:bg-brand-800 text-white"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Candidate
            </Button>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search candidates by name, role, or skills"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="mb-6" onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-6 w-full max-w-2xl">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="screening">Screening</TabsTrigger>
              <TabsTrigger value="interview">Interview</TabsTrigger>
              <TabsTrigger value="final round">Final</TabsTrigger>
              <TabsTrigger value="offer">Offer</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : displayCandidates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayCandidates.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No candidates match your search criteria.</p>
                </div>
              )}
            </TabsContent>
            
            {["new", "screening", "interview", "final round", "offer"].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-6">
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : displayCandidates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayCandidates.map((candidate) => (
                      <CandidateCard key={candidate.id} candidate={candidate} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No candidates in {tab.replace('-', ' ')} stage.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="text-brand-700 border-brand-200 hover:bg-brand-50">
              Load More
            </Button>
          </div>
        </div>
      </div>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Candidate</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Candidate form will go here.</p>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Candidates;
