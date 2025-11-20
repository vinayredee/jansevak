import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Building2, FileText, BarChart3, AlertCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: Building2 },
    { href: "/report-issue", label: "Report Issue", icon: AlertCircle },
    { href: "/schemes", label: "Schemes", icon: FileText },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  ];

  const NavContent = ({ mobile = false }) => (
    <div className={cn("flex", mobile ? "flex-col space-y-4" : "flex-row items-center space-x-6")}>
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = location === link.href;
        return (
          <Link key={link.href} href={link.href}>
            <a
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-muted-foreground",
                mobile && "p-2 rounded-md hover:bg-muted"
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
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-lg">I</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg leading-none text-primary">IndiaConnect</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Civic Engagement</span>
            </div>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:block">
          <NavContent />
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="mt-8">
                <NavContent mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
