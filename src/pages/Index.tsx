
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, BarChart3, User, Calendar, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Trusted by companies worldwide
            </h2>
            <p className="mt-3 text-xl text-gray-500 sm:mt-4">
              Our platform has helped hundreds of companies improve their hiring process.
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                Companies
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-brand-700">500+</dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                Interviews
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-brand-700">50k+</dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                Successful Hires
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-brand-700">10k+</dd>
            </div>
          </dl>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-700 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to streamline</span>
                  <span className="block">your hiring process?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-white">
                  Start using FinalRound today to find and hire the best talent for your team.
                </p>
                <Link to="/signup" className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-brand-700 hover:bg-gray-50">
                  Sign up for free
                </Link>
              </div>
            </div>
            <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
              <div className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20 bg-brand-600/30 flex items-center justify-center">
                <div className="p-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-medium text-white">FinalRound Dashboard</h3>
                    <div className="mt-4 flex flex-col space-y-3">
                      <div className="flex items-center text-white/80">
                        <Check className="h-5 w-5 mr-2 text-green-400" />
                        <span>Centralized candidate management</span>
                      </div>
                      <div className="flex items-center text-white/80">
                        <Check className="h-5 w-5 mr-2 text-green-400" />
                        <span>Automated interview scheduling</span>
                      </div>
                      <div className="flex items-center text-white/80">
                        <Check className="h-5 w-5 mr-2 text-green-400" />
                        <span>Collaborative hiring workflows</span>
                      </div>
                      <div className="flex items-center text-white/80">
                        <Check className="h-5 w-5 mr-2 text-green-400" />
                        <span>Comprehensive analytics</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
