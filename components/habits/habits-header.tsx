"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AddHabitDialog } from "./add-habit-dialog";
import {
  Bell,
  User,
  Zap,
  Book,
  Heart,
  Brain,
  Users,
  Briefcase,
  ChevronDown,
  Plus,
  Settings,
  BarChart,
  LogOut, // Ajout de l'icône de déconnexion
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const categories = [
  {
    name: "Productivity",
    icon: Zap,
    color: "text-yellow-500",
    link: "/habits/productivity",
    count: 5,
  },
  {
    name: "Business",
    icon: Briefcase,
    color: "text-blue-500",
    link: "/habits/business",
    count: 3,
  },
  {
    name: "Wellness",
    icon: Heart,
    color: "text-red-500",
    link: "/habits/wellness",
    count: 4,
  },
  {
    name: "Learning",
    icon: Book,
    color: "text-green-500",
    link: "/habits/learning",
    count: 2,
    subCategories: [
      { name: "Video Courses", link: "/habits/learning/videos" },
      { name: "Reading List", link: "/habits/learning/reading" },
      { name: "Practice Projects", link: "/habits/learning/projects" },
    ]
  },
  {
    name: "Mindfulness",
    icon: Brain,
    color: "text-purple-500",
    link: "/habits/mindfulness",
    count: 2,
  },
  {
    name: "Networking",
    icon: Users,
    color: "text-indigo-500",
    link: "/habits/networking",
    count: 3,
  },
];

const mockNotifications = [
  {
    id: "1",
    title: "New Comment",
    description: "Emma Watson commented on your post",
    time: "5m ago",
    unread: true,
  },
  {
    id: "2",
    title: "Achievement Unlocked",
    description: "You've completed your daily meditation goal!",
    time: "1h ago",
    unread: true,
  },
  {
    id: "3",
    title: "New Challenge",
    description: "Join the Productivity Power Week",
    time: "2h ago",
    unread: false,
  },
];

export function HabitsHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(mockNotifications.filter(n => n.unread).length);
  const router = useRouter();

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    // Ajoutez ici votre logique de déconnexion (par exemple, Supabase auth, etc.)
    // Après la déconnexion, redirigez l'utilisateur
    router.push("/login"); // Redirige vers la page de connexion
  };

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="border-b">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="h-16 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <BarChart className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Habits Tracker</h1>
            </motion.div>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                New Habit
              </Button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <Badge 
                          variant="secondary" 
                          className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                        >
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="flex items-center justify-between px-4 py-2 border-b">
                      <span className="font-semibold">Notifications</span>
                      <Link href="/notifications">
                        <Button variant="ghost" size="sm">View All</Button>
                      </Link>
                    </div>
                    {mockNotifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="px-4 py-3">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 space-y-1">
                            <p className="font-medium">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {notification.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {notification.time}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                          )}
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center gap-2 p-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">Sarah Chen</span>
                        <span className="text-xs text-muted-foreground">sarah@example.com</span>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <Link href="/profile">
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/settings">
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                    </Link>
                    {/* Bouton de déconnexion */}
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            </div>
          </div>

          {/* Categories Bar */}
          <div className="h-14 flex items-center -mb-px">
            <div className="flex space-x-4">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div key={category.name} className="relative">
                    {category.subCategories ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className={`h-14 gap-2 ${activeCategory === category.name ? "border-b-2 border-primary" : ""}`}
                            onMouseEnter={() => setActiveCategory(category.name)}
                            onMouseLeave={() => setActiveCategory(null)}
                          >
                            <Icon className={`h-4 w-4 ${category.color}`} />
                            <span>{category.name}</span>
                            <Badge variant="secondary" className="ml-1">
                              {category.count}
                            </Badge>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          {category.subCategories.map((sub) => (
                            <DropdownMenuItem key={sub.name} onClick={() => router.push(sub.link)}>
                              {sub.name}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Button
                        variant="ghost"
                        className={`h-14 gap-2 ${activeCategory === category.name ? "border-b-2 border-primary" : ""}`}
                        onClick={() => router.push(category.link)}
                        onMouseEnter={() => setActiveCategory(category.name)}
                        onMouseLeave={() => setActiveCategory(null)}
                      >
                        <Icon className={`h-4 w-4 ${category.color}`} />
                        <span>{category.name}</span>
                        <Badge variant="secondary" className="ml-1">
                          {category.count}
                        </Badge>
                      </Button>
                    )}

                    <AnimatePresence>
                      {activeCategory === category.name && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <AddHabitDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
