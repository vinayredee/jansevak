import { useQuery } from "@tanstack/react-query";
import { Complaint } from "@shared/complaint";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export function ComplaintList() {
    const { data: complaints, isLoading } = useQuery<Complaint[]>({
        queryKey: ["/api/complaints"],
    });

    if (isLoading) {
        return <div className="text-center py-4">Loading complaints...</div>;
    }

    if (!complaints || complaints.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                No complaints found. Submit one above!
            </div>
        );
    }

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

    return (
        <div className="space-y-4">
            {complaints.map((complaint) => (
                <Card key={complaint.id}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle>{complaint.title}</CardTitle>
                            <Badge className={getStatusColor(complaint.status)}>
                                {complaint.status}
                            </Badge>
                        </div>
                        <CardDescription>
                            {format(new Date(complaint.createdAt), "PPP")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            {complaint.description}
                        </p>
                        {complaint.imageUrl && (
                            <div className="rounded-md overflow-hidden border">
                                <img
                                    src={complaint.imageUrl}
                                    alt="Complaint attachment"
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
