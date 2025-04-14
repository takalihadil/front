"use client";

import { useEffect, useState } from "react";
import { ChatList } from "@/components/networking/chat/chat-list";
import { ChatContainer } from "@/components/networking/chat/chat-container";
import { NotificationList } from "@/components/networking/notification/notification-list";
import { UserProfile } from "@/components/networking/user/user-profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/networking/layout/header";
import Sidebar from "@/components/networking/layout/sidebar";
import RightSidebar from "@/components/networking/layout/right-sidebar";
import { CreatePost } from "@/components/networking/post/create-post";
import { PostCard } from "@/components/networking/post/post-card";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { type Post } from "@/lib/api";

const currentUser = {
  id: "current-user",
  name: "Current User",
  avatar: "/placeholder.svg?height=40&width=40",
};

export default function NetworkingPage() {
  const username = "exampleUser";
  const chatId = "exampleChatId";

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("No token found. Please login first.");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch posts");
        }

        const data = await response.json();
        console.log("Fetched Posts:", data);
        setPosts(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load posts. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [toast]);

  const handlePostCreated = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handlePostUpdated = (updatedPost: Post) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const handlePostDeleted = (postId: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex min-h-screen flex-col">
        <Header />

        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr_300px] md:gap-6 lg:grid-cols-[240px_1fr_300px] lg:gap-10">
          <Sidebar className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block" />

          <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-1">
            <Tabs defaultValue="home" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              <TabsContent value="home">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Home Feed</h1>
                    <p className="text-muted-foreground">See the latest posts from your network</p>
                  </div>

                  <CreatePost
                    userId={currentUser.id}
                    userAvatar={currentUser.avatar}
                    userName={currentUser.name}
                    onPostCreated={handlePostCreated}
                  />

{loading ? (
      Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="mb-4">
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      ))
    ) : posts.length > 0 ? (
      posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          user={{
            id: post.user?.id || "default-id",
            fullname: post.user?.fullname || "Unknown User",
            profile_photo: post.user?.profile_photo || "/default-avatar.png",
          }}
          content={post.content || ""}
          media={post.media || []}
          likes={post.likes || 0}
          comments={post.comments || 0}
          shares={post.shares || 0}
          createdAt={post.createdAt || new Date().toISOString()}
          userReaction={post.userReaction}
          currentUser={currentUser}
          onPostUpdated={handlePostUpdated}
          onPostDeleted={handlePostDeleted}
        />
      ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No posts yet. Be the first to create a post!
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="messages">
                <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-lg border">
                  <div className="w-1/3 border-r">
                    <ChatList activeChatId={chatId} />
                  </div>
                  <div className="w-2/3">
                    <ChatContainer chatId={chatId} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications">
                <div className="flex flex-col gap-8">
                  <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                  <p className="text-muted-foreground">Stay updated with your network activity</p>

                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="mentions">Mentions</TabsTrigger>
                      <TabsTrigger value="comments">Comments</TabsTrigger>
                      <TabsTrigger value="likes">Likes</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                      <NotificationList />
                    </TabsContent>
                    <TabsContent value="mentions">
                      <NotificationList type="mention" />
                    </TabsContent>
                    <TabsContent value="comments">
                      <NotificationList type="comment" />
                    </TabsContent>
                    <TabsContent value="likes">
                      <NotificationList type="like" />
                    </TabsContent>
                  </Tabs>
                </div>
              </TabsContent>

              <TabsContent value="profile">
                <UserProfile username={username} />
              </TabsContent>
            </Tabs>
          </main>

          <RightSidebar className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block" />
        </div>

        <Toaster />
      </div>
    </ThemeProvider>
  );
}