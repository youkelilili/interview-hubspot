
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CandidateCard, { CandidateType } from "@/components/CandidateCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Filter } from "lucide-react";

// Enhanced dummy data with more realistic information
const candidatesData: CandidateType[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: undefined,
    position: "Senior Frontend Developer",
    status: "Interview",
    appliedDate: "2 days ago",
    tags: ["React", "TypeScript", "UI/UX"],
  },
  {
    id: "2",
    name: "Jamie Smith",
    email: "jamie.smith@example.com",
    avatar: undefined,
    position: "Product Manager",
    status: "Screening",
    appliedDate: "3 days ago",
    tags: ["Product Strategy", "Agile", "B2B"],
  },
  {
    id: "3",
    name: "Taylor Wilson",
    email: "taylor.wilson@example.com",
    avatar: undefined,
    position: "UX/UI Designer",
    status: "Final Round",
    appliedDate: "1 week ago",
    tags: ["Figma", "User Research", "Design Systems"],
  },
  {
    id: "4",
    name: "Morgan Lee",
    email: "morgan.lee@example.com",
    avatar: undefined,
    position: "DevOps Engineer",
    status: "New",
    appliedDate: "5 days ago",
    tags: ["AWS", "Kubernetes", "CI/CD"],
  },
  {
    id: "5",
    name: "Casey Brown",
    email: "casey.brown@example.com",
    avatar: undefined,
    position: "Marketing Specialist",
    status: "Offer",
    appliedDate: "1 day ago",
    tags: ["Content Strategy", "SEO", "Social Media"],
  },
  {
    id: "6",
    name: "Jordan Taylor",
    email: "jordan.taylor@example.com",
    avatar: undefined,
    position: "Backend Developer",
    status: "Rejected",
    appliedDate: "3 days ago",
    tags: ["Node.js", "Python", "Databases"],
  },
  {
    id: "7",
    name: "Riley Morgan",
    email: "riley.morgan@example.com",
    avatar: undefined,
    position: "Data Scientist",
    status: "New",
    appliedDate: "4 days ago",
    tags: ["Python", "Machine Learning", "Statistics"],
  },
  {
    id: "8",
    name: "Sam Peterson",
    email: "sam.peterson@example.com",
    avatar: undefined,
    position: "Project Manager",
    status: "Interview",
    appliedDate: "6 days ago",
    tags: ["Agile", "Scrum", "JIRA"],
  },
  {
    id: "9",
    name: "Drew Mitchell",
    email: "drew.mitchell@example.com",
    avatar: undefined,
    position: "Mobile Developer",
    status: "Final Round",
    appliedDate: "2 weeks ago",
    tags: ["React Native", "Swift", "Mobile UX"],
  },
  {
    id: "10",
    name: "Quinn Roberts",
    email: "quinn.roberts@example.com",
    avatar: undefined,
    position: "QA Engineer",
    status: "Screening",
    appliedDate: "3 days ago",
    tags: ["Test Automation", "Selenium", "QA Processes"],
  },
  {
    id: "11",
    name: "Avery Williams",
    email: "avery.williams@example.com",
    avatar: undefined,
    position: "Technical Writer",
    status: "New",
    appliedDate: "1 day ago",
    tags: ["Documentation", "API Docs", "Technical Communication"],
  },
  {
    id: "12",
    name: "Harper Jones",
    email: "harper.jones@example.com",
    avatar: undefined,
    position: "Systems Analyst",
    status: "Offer",
    appliedDate: "1 week ago",
    tags: ["System Architecture", "Business Analysis", "Requirements Gathering"],
  },
];

const Candidates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("all");

  // Filter candidates based on search term
  const filteredCandidates = candidatesData.filter(candidate => {
    return (
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Filter candidates based on tab selection
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
            <Button className="mt-4 md:mt-0 bg-brand-700 hover:bg-brand-800 text-white">
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
              <TabsTrigger value="final">Final</TabsTrigger>
              <TabsTrigger value="offer">Offer</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayCandidates.length > 0 ? (
                  displayCandidates.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-gray-500">No candidates match your search criteria.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="new" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayCandidates.length > 0 ? (
                  displayCandidates.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-gray-500">No new candidates found.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="screening" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayCandidates.length > 0 ? (
                  displayCandidates.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-gray-500">No candidates in screening stage.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="interview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayCandidates.length > 0 ? (
                  displayCandidates.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-gray-500">No candidates in interview stage.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="final" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayCandidates.length > 0 ? (
                  displayCandidates.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-gray-500">No candidates in final round.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="offer" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayCandidates.length > 0 ? (
                  displayCandidates.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-gray-500">No candidates with offers.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="text-brand-700 border-brand-200 hover:bg-brand-50">
              Load More
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Candidates;
