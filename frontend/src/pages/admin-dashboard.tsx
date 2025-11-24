import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Complaint } from "@shared/complaint";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, ChevronDown, ChevronUp } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import AnalyticsCharts from "@/components/analytics-charts";
import { useState } from "react";

export default function AdminDashboard() {
    const { user, logoutMutation } = useAuth();
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

    const { data: complaints, isLoading } = useQuery<Complaint[]>({
        queryKey: ["/api/complaints/all"],
    });

    const statusMutation = useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            const res = await apiRequest("PATCH", `/api/complaints/${id}/status`, { status });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/complaints/all"] });
            queryClient.invalidateQueries({ queryKey: ["/api/complaints/stats"] }); // Refresh stats too
            toast({
                title: "Status Updated",
                description: "Complaint status has been updated.",
            });
        },
        onError: (error: Error) => {
            toast({
                title: "Update Failed",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "RESOLVED":
                return "bg-green-500";
            case "IN_PROGRESS":
                return "bg-blue-500";
            default:
                return "bg-yellow-500";
        }
    };

    const toggleRow = (id: string) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedRows(newExpanded);
    };

    if (isLoading) {
        return <div className="p-8">Loading admin dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Admin Dashboard
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            Admin: {user?.username}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => logoutMutation.mutate()}
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Analytics Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
                    <AnalyticsCharts />
                </div>

                {/* Complaints Table */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold">All Complaints</h2>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12"></TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {complaints?.map((complaint) => (
                                <>
                                    <TableRow key={complaint.id}>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleRow(complaint.id)}
                                            >
                                                {expandedRows.has(complaint.id) ? (
                                                    <ChevronUp className="h-4 w-4" />
                                                ) : (
                                                    <ChevronDown className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {complaint.title}
                                        </TableCell>
                                        <TableCell>{complaint.userId}</TableCell>
                                        <TableCell>
                                            {complaint.createdAt &&
                                                format(new Date(complaint.createdAt), "PPP")}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={`${getStatusColor(
                                                    complaint.status
                                                )} text-white`}
                                            >
                                                {complaint.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {complaint.imageUrl ? (
                                                <a
                                                    href={`http://localhost:8080/uploads/${complaint.imageUrl}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    View Image
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">No Image</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                defaultValue={complaint.status}
                                                onValueChange={(value) =>
                                                    statusMutation.mutate({
                                                        id: complaint.id,
                                                        status: value,
                                                    })
                                                }
                                                disabled={statusMutation.isPending}
                                            >
                                                <SelectTrigger className="w-[140px]">
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="PENDING">Pending</SelectItem>
                                                    <SelectItem value="IN_PROGRESS">
                                                        In Progress
                                                    </SelectItem>
                                                    <SelectItem value="RESOLVED">Resolved</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                    {expandedRows.has(complaint.id) && (
                                        <TableRow>
                                            <TableCell colSpan={7} className="bg-gray-50 dark:bg-gray-900">
                                                <div className="p-6 space-y-4">
                                                    <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                                                        Complaint Details
                                                    </h4>

                                                    {/* Parse and display details in a structured format */}
                                                    {(() => {
                                                        const desc = complaint.description;
                                                        const stateMatch = desc.match(/\*\*State:\*\* (.+)/);
                                                        const districtMatch = desc.match(/\*\*District:\*\* (.+)/);
                                                        const pincodeMatch = desc.match(/\*\*Pincode:\*\* (.+)/);
                                                        const sectorMatch = desc.match(/\*\*Sector:\*\* (.+)/);
                                                        const priorityMatch = desc.match(/\*\*Priority:\*\* (.+)/);
                                                        const categoryMatch = desc.match(/\*\*Category:\*\* (.+)/);
                                                        const locationMatch = desc.match(/\*\*Location:\*\* (.+)/);
                                                        const phoneMatch = desc.match(/\*\*Contact Phone:\*\* (.+)/);
                                                        const emailMatch = desc.match(/\*\*Contact Email:\*\* (.+)/);
                                                        const notificationsMatch = desc.match(/\*\*Notifications:\*\* (.+)/);
                                                        const detailsMatch = desc.match(/\*\*Details:\*\*\s*\n(.+)/s);

                                                        return (
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                {/* Location Information */}
                                                                <div className="space-y-3">
                                                                    <h5 className="font-semibold text-md text-gray-700 dark:text-gray-300 border-b pb-2">
                                                                        📍 Location Information
                                                                    </h5>
                                                                    {stateMatch && (
                                                                        <div className="flex items-start">
                                                                            <span className="font-medium text-gray-600 dark:text-gray-400 w-24">State:</span>
                                                                            <span className="text-gray-900 dark:text-white capitalize">{stateMatch[1].replace(/-/g, ' ')}</span>
                                                                        </div>
                                                                    )}
                                                                    {districtMatch && (
                                                                        <div className="flex items-start">
                                                                            <span className="font-medium text-gray-600 dark:text-gray-400 w-24">District:</span>
                                                                            <span className="text-gray-900 dark:text-white">{districtMatch[1]}</span>
                                                                        </div>
                                                                    )}
                                                                    {pincodeMatch && (
                                                                        <div className="flex items-start">
                                                                            <span className="font-medium text-gray-600 dark:text-gray-400 w-24">Pincode:</span>
                                                                            <span className="text-gray-900 dark:text-white">{pincodeMatch[1]}</span>
                                                                        </div>
                                                                    )}
                                                                    {locationMatch && (
                                                                        <div className="flex items-start">
                                                                            <span className="font-medium text-gray-600 dark:text-gray-400 w-24">Area:</span>
                                                                            <span className="text-gray-900 dark:text-white">{locationMatch[1]}</span>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Issue Information */}
                                                                <div className="space-y-3">
                                                                    <h5 className="font-semibold text-md text-gray-700 dark:text-gray-300 border-b pb-2">
                                                                        🔧 Issue Information
                                                                    </h5>
                                                                    {sectorMatch && (
                                                                        <div className="flex items-start">
                                                                            <span className="font-medium text-gray-600 dark:text-gray-400 w-24">Sector:</span>
                                                                            <span className="text-gray-900 dark:text-white capitalize">{sectorMatch[1]}</span>
                                                                        </div>
                                                                    )}
                                                                    {categoryMatch && (
                                                                        <div className="flex items-start">
                                                                            <span className="font-medium text-gray-600 dark:text-gray-400 w-24">Category:</span>
                                                                            <span className="text-gray-900 dark:text-white">{categoryMatch[1]}</span>
                                                                        </div>
                                                                    )}
                                                                    {priorityMatch && (
                                                                        <div className="flex items-start">
                                                                            <span className="font-medium text-gray-600 dark:text-gray-400 w-24">Priority:</span>
                                                                            <Badge className={
                                                                                priorityMatch[1].includes('CRITICAL') ? 'bg-red-500 text-white' :
                                                                                    priorityMatch[1].includes('HIGH') ? 'bg-orange-500 text-white' :
                                                                                        priorityMatch[1].includes('MEDIUM') ? 'bg-yellow-500 text-white' :
                                                                                            'bg-blue-500 text-white'
                                                                            }>
                                                                                {priorityMatch[1]}
                                                                            </Badge>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Contact Information */}
                                                                {(phoneMatch || emailMatch || notificationsMatch) && (
                                                                    <div className="space-y-3">
                                                                        <h5 className="font-semibold text-md text-gray-700 dark:text-gray-300 border-b pb-2">
                                                                            📞 Contact Information
                                                                        </h5>
                                                                        {phoneMatch && (
                                                                            <div className="flex items-start">
                                                                                <span className="font-medium text-gray-600 dark:text-gray-400 w-24">Phone:</span>
                                                                                <span className="text-gray-900 dark:text-white">{phoneMatch[1]}</span>
                                                                            </div>
                                                                        )}
                                                                        {emailMatch && (
                                                                            <div className="flex items-start">
                                                                                <span className="font-medium text-gray-600 dark:text-gray-400 w-24">Email:</span>
                                                                                <span className="text-gray-900 dark:text-white">{emailMatch[1]}</span>
                                                                            </div>
                                                                        )}
                                                                        {notificationsMatch && (
                                                                            <div className="flex items-start">
                                                                                <span className="font-medium text-gray-600 dark:text-gray-400 w-24">Notify via:</span>
                                                                                <span className="text-gray-900 dark:text-white">{notificationsMatch[1]}</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {/* Description */}
                                                                {detailsMatch && (
                                                                    <div className="space-y-3 md:col-span-2">
                                                                        <h5 className="font-semibold text-md text-gray-700 dark:text-gray-300 border-b pb-2">
                                                                            📝 Description
                                                                        </h5>
                                                                        <p className="text-gray-900 dark:text-white bg-white dark:bg-gray-800 p-4 rounded border">
                                                                            {detailsMatch[1].trim()}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })()}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </div>
    );
}
