
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, MapPin, Clock, Building, Share2, Bookmark, ChevronLeft } from "lucide-react";
import { JobType } from "@/components/JobCard";

// Sample job data - in a real app, you would fetch this based on the ID
const jobsData: Record<string, JobType> = {
  "1": {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    description: "We're looking for a Senior Frontend Developer with 5+ years of experience in React and modern JavaScript frameworks to join our growing team. The ideal candidate will have a strong portfolio of web applications and experience with TypeScript, state management, and responsive design principles. You'll be working on our core product, collaborating with designers, product managers, and backend engineers to deliver exceptional user experiences.",
  },
};

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const job = id ? jobsData[id] : null;

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Job Not Found</h1>
            <p className="mt-2 text-gray-600">We couldn't find the job you're looking for.</p>
            <Link to="/jobs">
              <Button className="mt-4 bg-brand-700 hover:bg-brand-800 text-white">
                Back to Jobs
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/jobs" className="inline-flex items-center text-brand-700 hover:text-brand-800">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Jobs
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-gray-600">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1 text-gray-500" />
                    {job.company}
                  </div>
                  <div className="hidden sm:block text-gray-300">•</div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                    {job.location}
                  </div>
                  <div className="hidden sm:block text-gray-300">•</div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    Posted {job.posted}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                <Button variant="outline" size="icon" className="h-9 w-9" aria-label="Share">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9" aria-label="Save">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Link to={`/apply/${job.id}`}>
                  <Button className="bg-brand-700 hover:bg-brand-800 text-white">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-6">
              <Badge className={`
                ${job.type === "Full-time" ? "bg-green-100 text-green-800" : ""}
                ${job.type === "Part-time" ? "bg-blue-100 text-blue-800" : ""}
                ${job.type === "Contract" ? "bg-purple-100 text-purple-800" : ""}
                ${job.type === "Remote" ? "bg-indigo-100 text-indigo-800" : ""}
              `}>
                {job.type}
              </Badge>
              {job.salary && (
                <Badge variant="outline" className="bg-gray-50">
                  <Briefcase className="h-3 w-3 mr-1" /> {job.salary}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="description">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="company">Company</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                      <p className="text-gray-700 mb-6">{job.description}</p>
                      
                      <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                        <li>Design and implement new features and functionality for our web application</li>
                        <li>Build reusable components and libraries for future use</li>
                        <li>Translate designs and wireframes into high-quality code</li>
                        <li>Optimize components for maximum performance across devices and browsers</li>
                        <li>Collaborate with cross-functional teams in an agile environment</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                        <li>5+ years of experience in frontend development</li>
                        <li>Strong proficiency in React, TypeScript, and modern JavaScript</li>
                        <li>Experience with responsive design and cross-browser compatibility</li>
                        <li>Familiarity with state management libraries (Redux, MobX, etc.)</li>
                        <li>Understanding of CSS preprocessors and modern CSS techniques</li>
                        <li>Knowledge of testing frameworks (Jest, React Testing Library)</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Competitive salary and equity options</li>
                        <li>Health, dental, and vision insurance</li>
                        <li>Flexible work arrangements with remote options</li>
                        <li>Professional development budget</li>
                        <li>Paid time off and company holidays</li>
                        <li>401(k) with company match</li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="company" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">About {job.company}</h2>
                      <p className="text-gray-700 mb-6">
                        TechCorp Inc. is a leading technology company specializing in developing innovative software solutions for businesses of all sizes. Founded in 2015, we have grown to a team of over 200 employees across multiple offices worldwide.
                      </p>
                      
                      <h3 className="text-lg font-semibold mb-3">Our Mission</h3>
                      <p className="text-gray-700 mb-6">
                        We're on a mission to simplify complex business processes through intuitive, powerful software that helps our clients work more efficiently and effectively.
                      </p>
                      
                      <h3 className="text-lg font-semibold mb-3">Company Culture</h3>
                      <p className="text-gray-700">
                        At TechCorp, we value innovation, collaboration, and continuous learning. We foster an inclusive environment where diverse perspectives are welcomed and celebrated. Our team members enjoy a balance of autonomy and support, with opportunities to grow both personally and professionally.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="reviews" className="mt-6">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <h2 className="text-xl font-semibold mb-2">Company Reviews</h2>
                      <p className="text-gray-500 mb-4">Reviews from current and former employees</p>
                      <div className="py-8">
                        <p className="text-gray-500">No reviews available yet.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Job Summary</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Job Type</p>
                      <p className="font-medium">{job.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{job.location}</p>
                    </div>
                    {job.salary && (
                      <div>
                        <p className="text-sm text-gray-500">Salary Range</p>
                        <p className="font-medium">{job.salary}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Experience Level</p>
                      <p className="font-medium">Senior</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Education</p>
                      <p className="font-medium">Bachelor's Degree or equivalent experience</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-gray-50">React</Badge>
                      <Badge variant="outline" className="bg-gray-50">TypeScript</Badge>
                      <Badge variant="outline" className="bg-gray-50">JavaScript</Badge>
                      <Badge variant="outline" className="bg-gray-50">Redux</Badge>
                      <Badge variant="outline" className="bg-gray-50">CSS/SASS</Badge>
                      <Badge variant="outline" className="bg-gray-50">Responsive Design</Badge>
                      <Badge variant="outline" className="bg-gray-50">Testing</Badge>
                      <Badge variant="outline" className="bg-gray-50">Git</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link to={`/apply/${job.id}`}>
                      <Button className="w-full bg-brand-700 hover:bg-brand-800 text-white">
                        Apply for this Job
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-12 bg-brand-50 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">See more jobs like this</h2>
            <p className="mt-2 text-gray-600">
              Join our talent network to get personalized job recommendations
            </p>
            <Button className="mt-4 bg-brand-700 hover:bg-brand-800 text-white">
              Join Talent Network
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default JobDetail;
