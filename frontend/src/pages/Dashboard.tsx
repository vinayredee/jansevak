import { ComplaintList } from "@/components/complaint-list";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { PlusCircle, Clock, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { data: complaints } = useQuery({
    queryKey: ["/api/complaints"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/complaints");
      return res.json();
    },
  });

  const totalComplaints = complaints?.length || 0;
  const pendingCount = complaints?.filter((c: any) => c.status === "PENDING").length || 0;
  const inProgressCount = complaints?.filter((c: any) => c.status === "IN_PROGRESS").length || 0;
  const resolvedCount = complaints?.filter((c: any) => c.status === "RESOLVED").length || 0;

  const stats = [
    {
      title: "Total Complaints",
      value: totalComplaints,
      icon: TrendingUp,
      color: "text-[#FF9933]",
      bgColor: "bg-[#FF9933]/10",
    },
    {
      title: "Pending",
      value: pendingCount,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "In Progress",
      value: inProgressCount,
      icon: AlertCircle,
      color: "text-[#FF9933]",
      bgColor: "bg-orange-50",
    },
    {
      title: "Resolved",
      value: resolvedCount,
      icon: CheckCircle,
      color: "text-[#138808]",
      bgColor: "bg-[#138808]/10",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/10 font-sans">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#000080] mb-2">My Dashboard</h1>
              <p className="text-gray-600">
                Track your complaints and monitor resolution progress
              </p>
            </div>
            <Link href="/report-issue">
              <Button size="lg" className="gap-2 bg-[#000080] hover:bg-[#000066] text-white">
                <PlusCircle className="h-5 w-5" />
                Report New Issue
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Tracking Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Resolution Progress</CardTitle>
              <CardDescription>
                Real-time status of your submitted complaints
              </CardDescription>
            </CardHeader>
            <CardContent>
              {totalComplaints > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Overall Progress</span>
                    <span className="font-medium">
                      {totalComplaints > 0
                        ? Math.round((resolvedCount / totalComplaints) * 100)
                        : 0}
                      % Resolved
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="flex h-full">
                      <div
                        className="bg-green-500 transition-all duration-500"
                        style={{
                          width: `${totalComplaints > 0 ? (resolvedCount / totalComplaints) * 100 : 0}%`,
                        }}
                      />
                      <div
                        className="bg-orange-500 transition-all duration-500"
                        style={{
                          width: `${totalComplaints > 0 ? (inProgressCount / totalComplaints) * 100 : 0}%`,
                        }}
                      />
                      <div
                        className="bg-yellow-500 transition-all duration-500"
                        style={{
                          width: `${totalComplaints > 0 ? (pendingCount / totalComplaints) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span>Resolved ({resolvedCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full" />
                      <span>In Progress ({inProgressCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <span>Pending ({pendingCount})</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    You haven't submitted any complaints yet
                  </p>
                  <Link href="/report-issue">
                    <Button>Report Your First Issue</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Complaints List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-4">Your Complaints</h2>
          <ComplaintList />
        </motion.div>
      </main>
    </div>
  );
}
