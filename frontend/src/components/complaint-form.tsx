import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const complaintSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    image: z.instanceof(File).optional(),
});

export function ComplaintForm() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof complaintSchema>>({
        resolver: zodResolver(complaintSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof complaintSchema>) => {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            if (data.image) {
                formData.append("image", data.image);
            }

            const res = await fetch("/api/complaints", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Failed to submit complaint");
            }
            return res.json();
        },
        onSuccess: () => {
            toast({
                title: "Complaint Submitted",
                description: "Your complaint has been successfully registered.",
            });
            form.reset();
            queryClient.invalidateQueries({ queryKey: ["/api/complaints"] });
        },
        onError: (error: Error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    function onSubmit(values: z.infer<typeof complaintSchema>) {
        mutation.mutate(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Pothole on Main Street" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe the issue in detail..."
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Attach Image (Optional)
                    </label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                form.setValue("image", file);
                            }
                        }}
                    />
                </div>

                <Button type="submit" className="w-full" disabled={mutation.isPending}>
                    {mutation.isPending ? "Submitting..." : "Submit Complaint"}
                </Button>
            </form>
        </Form>
    );
}
