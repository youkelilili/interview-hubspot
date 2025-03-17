
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCard, { JobType } from "@/components/JobCard";
import JobListSidebar from "@/components/JobListSidebar";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const jobsData: JobType[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    description: "We're looking for a Senior Frontend Developer with 5+ years of experience in React and modern JavaScript frameworks to join our growing team.",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "Innovation Labs",
    location: "New York, NY",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    posted: "3 days ago",
    description: "Seeking an experienced Product Manager to drive our product strategy and roadmap. You'll work closely with engineering, design, and marketing teams.",
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "Creative Solutions",
    location: "Remote",
    type: "Remote",
    salary: "$90,000 - $120,000",
    posted: "1 week ago",
    description: "Join our design team to create beautiful, functional user experiences for our suite of products. Experience with Figma and design systems required.",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudSystems",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    posted: "5 days ago",
    description: "Help us build and maintain our cloud infrastructure, CI/CD pipelines, and security protocols. Experience with AWS, Kubernetes, and Terraform preferred.",
  },
  {
    id: "5",
    title: "Marketing Specialist",
    company: "GrowthBrand",
    location: "Chicago, IL",
    type: "Part-time",
    salary: "$60,000 - $80,000",
    posted: "1 day ago",
    description: "Looking for a marketing specialist to help drive our content strategy, social media presence, and digital marketing campaigns.",
  },
  {
    id: "6",
    title: "Backend Developer",
    company: "DataSystems Inc.",
    location: "Seattle, WA",
    type: "Contract",
    salary: "$50 - $70 per hour",
    posted: "3 days ago",
    description: "Join our backend team to develop new APIs and services. Strong experience with Node.js, Python, and database design required.",
  },
];

const Jobs = () => {
  const [filters, setFilters] = useState({});

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
    // In a real app, this would filter the jobs based on the criteria
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Job Openings</h1>
              <p className="mt-1 text-gray-600">Find your perfect role from our open positions</p>
            </div>
            <Button className="mt-4 md:mt-0 bg-brand-700 hover:bg-brand-800 text-white">
              Post a Job
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <JobListSidebar onFilter={handleFilter} />
            </div>
            
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobsData.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
              
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <Button 
                    variant="outline" 
                    className="hidden h-8 w-8 p-0 sm:flex items-center justify-center"
                    disabled={true}
                  >
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    3
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    4
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    5
                  </Button>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Jobs;
