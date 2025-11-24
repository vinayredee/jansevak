import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
    const [, setLocation] = useLocation();
    const { user, loginMutation, registerMutation } = useAuth();
    const [loginData, setLoginData] = useState({ username: "", password: "", adminPassword: "" });
    const [registerData, setRegisterData] = useState({ username: "", password: "" });
    const { toast } = useToast();

    // Redirect if already logged in
    if (user) {
        setLocation("/dashboard");
        return null;
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if admin password is provided and correct
        if (loginData.adminPassword) {
            if (loginData.adminPassword === "9346144693") {
                // Admin login - set role to ADMIN
                await loginMutation.mutateAsync(loginData);
                // Manually update user role in backend would be ideal, but for now we'll redirect
                toast({
                    title: "Admin Access Granted",
                    description: "Welcome, Administrator!",
                });
                setLocation("/admin-dashboard");
            } else {
                toast({
                    title: "Invalid Admin Password",
                    description: "The admin password you entered is incorrect.",
                    variant: "destructive",
                });
                return;
            }
        } else {
            // Regular user login
            await loginMutation.mutateAsync(loginData);
            setLocation("/dashboard");
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        await registerMutation.mutateAsync(registerData);
        setLocation("/dashboard");
    };

    return (
        <div className="min-h-screen bg-muted/10 font-sans">
            <Navbar />
            <div className="container mx-auto py-10 px-4 md:px-6 flex items-center justify-center min-h-[calc(100vh-4rem)]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Register</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Welcome Back</CardTitle>
                                    <CardDescription>
                                        Login to access your dashboard and manage your complaints
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleLogin} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="login-username">Username</Label>
                                            <Input
                                                id="login-username"
                                                type="text"
                                                placeholder="Enter your username"
                                                value={loginData.username}
                                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="login-password">Password</Label>
                                            <Input
                                                id="login-password"
                                                type="password"
                                                placeholder="Enter your password"
                                                value={loginData.password}
                                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="admin-password">Admin Password (Optional)</Label>
                                            <Input
                                                id="admin-password"
                                                type="password"
                                                placeholder="Enter admin password for admin access"
                                                value={loginData.adminPassword}
                                                onChange={(e) => setLoginData({ ...loginData, adminPassword: e.target.value })}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Leave blank for regular user access
                                            </p>
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            style={{ backgroundColor: '#000080 !important', color: '#FFFFFF !important' }}
                                            disabled={loginMutation.isPending}
                                        >
                                            <span style={{ color: '#FFFFFF !important' }}>
                                                {loginMutation.isPending ? "Logging in..." : "Login"}
                                            </span>
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="register">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Create Account</CardTitle>
                                    <CardDescription>
                                        Register to start reporting public grievances
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleRegister} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="register-username">Username</Label>
                                            <Input
                                                id="register-username"
                                                type="text"
                                                placeholder="Choose a username"
                                                value={registerData.username}
                                                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="register-password">Password</Label>
                                            <Input
                                                id="register-password"
                                                type="password"
                                                placeholder="Choose a password"
                                                value={registerData.password}
                                                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            style={{ backgroundColor: '#000080', color: '#FFFFFF' }}
                                            disabled={registerMutation.isPending}
                                        >
                                            {registerMutation.isPending ? "Creating account..." : "Register"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </div>
        </div>
    );
}
