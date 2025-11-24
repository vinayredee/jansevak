import { Navbar } from "@/components/layout/Navbar";
import AnalyticsCharts from "@/components/analytics-charts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { BarChart3, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

export default function Analytics() {
    const { data: stats } = useQuery({
        queryKey: ["/api/complaints/stats"],
        queryFn: async () => {
            const res = await apiRequest("GET", "/api/complaints/stats");
            return res.json();
        },
    });

    const totalComplaints = stats ? Object.values(stats as Record<string, number>).reduce((a, b) => a + b, 0) : 0;

    return (
        <div className="min-h-screen bg-muted/10 font-sans">
            <Navbar />
            <div className="container mx-auto py-10 px-4 md:px-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-serif font-bold text-primary mb-2">Analytics Dashboard</h1>
                    <p className="text-muted-foreground">
                        View comprehensive statistics and insights about complaints
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalComplaints}</div>
                            <p className="text-xs text-muted-foreground">All registered complaints</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{(stats as Record<string, number>)?.PENDING || 0}</div>
                            <p className="text-xs text-muted-foreground">Awaiting review</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                            <TrendingUp className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{(stats as Record<string, number>)?.IN_PROGRESS || 0}</div>
                            <p className="text-xs text-muted-foreground">Being addressed</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{(stats as Record<string, number>)?.RESOLVED || 0}</div>
                            <p className="text-xs text-muted-foreground">Successfully resolved</p>
                        </CardContent>
                    </Card>
                </div>

                <AnalyticsCharts />
            </div>
        </div>
    );
}
