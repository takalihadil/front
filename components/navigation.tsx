"use client";

import { LineChart, Wallet, Settings, Clock, ListTodo, Users, Trophy, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { useState } from "react";
import { Button } from "./ui/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LineChart },
  { name: "Transactions", href: "/transactions", icon: Wallet },
  { name: "Time Tracker", href: "/time-tracker", icon: Clock },
  { name: "Habits", href: "/habits", icon: ListTodo },
  { name: "Community", href: "/community", icon: Users },
  { name: "Challenges", href: "/community/challenges", icon: Trophy },
];

interface NavigationProps {
  children: React.ReactNode;
}

export function Navigation({ children }: NavigationProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-card border-r flex flex-col transition-all duration-300",
          isCollapsed ? "w-[4rem]" : "w-64"
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          {!isCollapsed && (
            <span className="text-xl font-semibold">IndieTracker</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="shrink-0"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                pathname === item.href || pathname.startsWith(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <item.icon
                className={cn(
                  "shrink-0",
                  isCollapsed ? "h-5 w-5" : "h-4 w-4 mr-3"
                )}
                aria-hidden="true"
              />
              {!isCollapsed && (
                <span className="truncate">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <ModeToggle />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        <main className="flex-1 container mx-auto px-4 py-4">
          {children}
        </main>
      </div>
    </div>
  );
}