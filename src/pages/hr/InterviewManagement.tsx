
import { useState } from "react";
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

const InterviewManagement = () => {
  // This is just a placeholder component - to be implemented later
  const [interviews] = useState([
    {
      id: 1,
      candidateName: "John Doe",
      position: "Frontend Developer",
      date: "2023-08-15T14:30:00",
      interviewers: ["Jane Smith", "Mike Johnson"],
      status: "Scheduled",
    },
    {
      id: 2,
      candidateName: "Sarah Williams",
      position: "UX Designer",
      date: "2023-08-16T10:00:00",
      interviewers: ["Mike Johnson"],
      status: "Completed",
    },
    {
      id: 3,
      candidateName: "Robert Brown",
      position: "Backend Developer",
      date: "2023-08-17T11:15:00",
      interviewers: ["Jane Smith", "David Wilson"],
      status: "Scheduled",
    },
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Interview Management</h1>
          <Button>Schedule Interview</Button>
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviews.map((interview) => (
                <TableRow key={interview.id}>
                  <TableCell className="font-medium">{interview.candidateName}</TableCell>
                  <TableCell>{interview.position}</TableCell>
                  <TableCell>{formatDate(interview.date)}</TableCell>
                  <TableCell>{interview.interviewers.join(", ")}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      interview.status === "Scheduled" ? "bg-blue-100 text-blue-800" : 
                      interview.status === "Completed" ? "bg-green-100 text-green-800" : 
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {interview.status}
                    </span>
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
          <div className="p-4 text-center text-gray-500 text-sm">
            This is a placeholder component. Interview management functionality will be implemented in a future update.
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default InterviewManagement;
