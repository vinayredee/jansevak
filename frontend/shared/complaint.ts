export interface Complaint {
    id: string;
    title: string;
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "RESOLVED";
    userId: string;
    createdAt?: string;
    imageUrl?: string;
}
