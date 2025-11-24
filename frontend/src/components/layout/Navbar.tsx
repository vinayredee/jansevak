import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Building2, FileText, BarChart3, AlertCircle, Menu, LogOut, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logoutMutation } = useAuth();

  const links = [
    { href: "/", label: "Home", icon: Building2 },
    { href: "/report-issue", label: "Report Issue", icon: AlertCircle },
    { href: "/schemes", label: "Schemes", icon: FileText },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  ];

  if (user?.role === "ADMIN") {
    links.push({ href: "/admin-dashboard", label: "Admin", icon: BarChart3 });
    links.push({ href: "/analytics", label: "Analytics", icon: BarChart3 });
  }

  const NavContent = ({ mobile = false }) => (
    <div className={cn("flex", mobile ? "flex-col space-y-4" : "flex-row items-center space-x-6")}>
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = location === link.href;
        return (
          <Link key={link.href} href={link.href}>
            <a
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-colors",
                isActive
                  ? "text-white"
                  : "text-gray-200 hover:text-white",
                mobile && "p-2 rounded-md hover:bg-navy-700"
              )}
              onClick={() => mobile && setIsOpen(false)}
            >
              <Icon className="h-4 w-4" />
              <span>{link.label}</span>
            </a>
          </Link>
        );
      })}
    </div>
  );

  return (
    <nav className="gov-header sticky top-0 z-50 w-full shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center space-x-3">
            {/* Ashoka Chakra Logo */}
            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-white/10 border-2 border-white/20">
              <svg
                viewBox="0 0 100 100"
                className="w-7 h-7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Ashoka Chakra - Navy Blue */}
                <circle cx="50" cy="50" r="45" stroke="#000080" strokeWidth="2" fill="white" />
                <circle cx="50" cy="50" r="8" fill="#000080" />
                {/* 24 spokes */}
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i * 360) / 24;
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 50 + 10 * Math.cos(rad);
                  const y1 = 50 + 10 * Math.sin(rad);
                  const x2 = 50 + 42 * Math.cos(rad);
                  const y2 = 50 + 42 * Math.sin(rad);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#000080"
                      strokeWidth="1.5"
                    />
                  );
                })}
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg leading-tight text-white">
                Digital Public Seva
              </span>
              <span className="text-[10px] text-gray-200 uppercase tracking-wider">
                Public Grievance Portal (Prototype)
              </span>
            </div>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavContent />

          {/* Theme Toggle */}
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full hover:bg-white/10"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-white text-navy-900 font-semibold">
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.username}</p>
                    <p className="text-xs leading-none text-muted-foreground capitalize">
                      {user.role.toLowerCase()}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <a className="flex items-center space-x-2 text-sm font-medium transition-colors text-gray-200 hover:text-white">
                <User className="h-4 w-4" />
                <span>Login</span>
              </a>
            </Link>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-4">
          {user && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => logoutMutation.mutate()}
              className="text-white hover:bg-white/10"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="gov-header border-l-0">
              <div className="mt-8">
                <NavContent mobile />
                {!user && (
                  <div className="mt-6">
                    <Link href="/auth">
                      <Button
                        className="w-full bg-white text-navy-900 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav >
  );
}
