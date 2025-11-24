import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest, getQueryFn } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { User } from "@shared/schema";

export function useAuth() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { data: user, isLoading } = useQuery<User | null>({
        queryKey: ["/api/user"],
        queryFn: async () => {
            try {
                // Try real backend first
                const res = await fetch("/api/user");
                if (res.ok) return await res.json();
                if (res.status === 401) return null;
            } catch (e) {
                // Backend unreachable, check for demo user
                const demoUser = localStorage.getItem("jansevak_demo_user");
                if (demoUser) return JSON.parse(demoUser);
            }
            return null;
        },
    });

    const loginMutation = useMutation({
        mutationFn: async (credentials: any) => {
            try {
                const res = await apiRequest("POST", "/api/login", credentials);
                return await res.json();
            } catch (e) {
                // Fallback for demo mode
                console.log("Backend unreachable, using demo mode");
                const demoUser: User = {
                    id: "demo-user-123",
                    username: credentials.username,
                    password: credentials.password,
                    role: "USER",
                    createdAt: new Date().toISOString()
                };
                localStorage.setItem("jansevak_demo_user", JSON.stringify(demoUser));
                return demoUser;
            }
        },
        onSuccess: (user: User) => {
            queryClient.setQueryData(["/api/user"], user);
            toast({
                title: "Welcome back!",
                description: `Logged in as ${user.username}`,
            });
        },
        onError: (error: Error) => {
            toast({
                title: "Login failed",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            try {
                await apiRequest("POST", "/api/logout");
            } catch (e) {
                // Demo mode logout
                localStorage.removeItem("jansevak_demo_user");
            }
        },
        onSuccess: () => {
            queryClient.setQueryData(["/api/user"], null);
            toast({
                title: "Logged out",
                description: "You have been successfully logged out",
            });
        },
        onError: (error: Error) => {
            toast({
                title: "Logout failed",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const registerMutation = useMutation({
        mutationFn: async (credentials: any) => {
            try {
                const res = await apiRequest("POST", "/api/register", credentials);
                return await res.json();
            } catch (e) {
                // Fallback for demo mode
                const demoUser: User = {
                    id: `demo-user-${Math.random().toString(36).substr(2, 9)}`,
                    username: credentials.username,
                    password: credentials.password,
                    role: "USER",
                    createdAt: new Date().toISOString()
                };
                localStorage.setItem("jansevak_demo_user", JSON.stringify(demoUser));
                return demoUser;
            }
        },
        onSuccess: (user: User) => {
            queryClient.setQueryData(["/api/user"], user);
            toast({
                title: "Registration successful",
                description: `Welcome to JanSevak, ${user.username}!`,
            });
        },
        onError: (error: Error) => {
            toast({
                title: "Registration failed",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    return {
        user,
        isLoading,
        loginMutation,
        logoutMutation,
        registerMutation,
    };
}
