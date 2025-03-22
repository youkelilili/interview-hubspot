
import { useState, useEffect } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PlusCircle, FileText, Calendar, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Define types for our data
interface Interview {
  id: number;
  candidateName: string;
  position: string;
  date: string;
  interviewers: string[];
  status: "Scheduled" | "In Progress" | "Completed" | "Canceled";
  assessments?: Assessment[];
}

interface Assessment {
  id: string;
  title: string;
  assessmentType: "technical" | "behavioral";
  status?: "pending" | "in_progress" | "completed" | "canceled";
}

const InterviewManagement = () => {
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: 1,
      candidateName: "John Doe",
      position: "Frontend Developer",
      date: "2023-08-15T14:30:00",
      interviewers: ["Jane Smith", "Mike Johnson"],
      status: "Scheduled",
      assessments: [
        { 
          id: "sample-1", 
          title: "JavaScript Fundamentals", 
          assessmentType: "technical",
          status: "pending"
        }
      ]
    },
    {
      id: 2,
      candidateName: "Sarah Williams",
      position: "UX Designer",
      date: "2023-08-16T10:00:00",
      interviewers: ["Mike Johnson"],
      status: "Completed",
      assessments: []
    },
    {
      id: 3,
      candidateName: "Robert Brown",
      position: "Backend Developer",
      date: "2023-08-17T11:15:00",
      interviewers: ["Jane Smith", "David Wilson"],
      status: "Scheduled",
      assessments: [
        { 
          id: "sample-2", 
          title: "System Design", 
          assessmentType: "technical",
          status: "pending"
        },
        { 
          id: "sample-3", 
          title: "Communication Skills", 
          assessmentType: "behavioral",
          status: "completed"
        }
      ]
    },
  ]);

  const [availableAssessments, setAvailableAssessments] = useState<Assessment[]>([]);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<string>("");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch assessments from the database
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('assessments')
          .select('id, title, assessment_type');
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setAvailableAssessments(data.map(item => ({
            id: item.id,
            title: item.title,
            assessmentType: item.assessment_type as "technical" | "behavioral"
          })));
        }
      } catch (error) {
        console.error("Error fetching assessments:", error);
        toast.error("Failed to load assessments");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleScheduleInterview = () => {
    toast.success("Interview scheduled successfully");
    setIsScheduleModalOpen(false);
  };

  const handleAddAssessment = () => {
    if (selectedInterview && selectedAssessment) {
      // In a real app, we would call the API to link the assessment to the interview
      // For now, we're just updating the UI
      const updatedInterviews = interviews.map(interview => {
        if (interview.id === selectedInterview.id) {
          const assessment = availableAssessments.find(a => a.id === selectedAssessment);
          if (assessment) {
            const newAssessment: Assessment = {
              id: assessment.id,
              title: assessment.title,
              assessmentType: assessment.assessmentType,
              status: "pending"
            };
            
            return {
              ...interview,
              assessments: [
                ...(interview.assessments || []),
                newAssessment
              ]
            };
          }
        }
        return interview;
      });
      
      setInterviews(updatedInterviews);
      toast.success("Assessment added to interview");
      setIsAssessmentModalOpen(false);
      setSelectedAssessment("");
    } else {
      toast.error("Please select an assessment");
    }
  };

  const openAssessmentModal = (interview: Interview) => {
    setSelectedInterview(interview);
    setIsAssessmentModalOpen(true);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Interview Management</h1>
          <div className="flex space-x-2">
            <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Interview
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule New Interview</DialogTitle>
                  <DialogDescription>
                    Fill in the details to schedule a new interview.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="candidate">Candidate Name</Label>
                    <Input id="candidate" placeholder="Enter candidate name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" placeholder="Enter position" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date & Time</Label>
                    <Input id="date" type="datetime-local" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="interviewers">Interviewers</Label>
                    <Input id="interviewers" placeholder="Enter interviewer names (comma separated)" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleScheduleInterview}>Schedule</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" onClick={() => toast.success("Interviews refreshed")}>
              Refresh
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Interviewers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assessments</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviews.map((interview) => (
                <TableRow key={interview.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {interview.candidateName}
                    </div>
                  </TableCell>
                  <TableCell>{interview.position}</TableCell>
                  <TableCell>{formatDate(interview.date)}</TableCell>
                  <TableCell>{interview.interviewers.join(", ")}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      interview.status === "Scheduled" ? "bg-blue-100 text-blue-800" : 
                      interview.status === "Completed" ? "bg-green-100 text-green-800" : 
                      interview.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {interview.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {interview.assessments && interview.assessments.length > 0 ? (
                        interview.assessments.map((assessment, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <FileText className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs">{assessment.title}</span>
                            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                              assessment.status === "completed" ? "bg-green-100 text-green-800" :
                              assessment.status === "in_progress" ? "bg-yellow-100 text-yellow-800" :
                              "bg-blue-100 text-blue-800"
                            }`}>
                              {assessment.status}
                            </span>
                          </div>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500">No assessments</span>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-1 h-6 text-xs"
                        onClick={() => openAssessmentModal(interview)}
                      >
                        <PlusCircle className="h-3 w-3 mr-1" />
                        Add Assessment
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Assessment Assignment Modal */}
      <Dialog open={isAssessmentModalOpen} onOpenChange={setIsAssessmentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Assessment to Interview</DialogTitle>
            <DialogDescription>
              {selectedInterview && (
                <>Assign an assessment to {selectedInterview.candidateName}'s interview.</>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="assessment">Select Assessment</Label>
              <Select 
                value={selectedAssessment} 
                onValueChange={setSelectedAssessment}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an assessment" />
                </SelectTrigger>
                <SelectContent>
                  {availableAssessments.map((assessment) => (
                    <SelectItem key={assessment.id} value={assessment.id}>
                      {assessment.title} ({assessment.assessmentType})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddAssessment} disabled={!selectedAssessment}>
              Assign Assessment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default InterviewManagement;
