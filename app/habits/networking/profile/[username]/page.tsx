import { UserProfile } from "@/components/networking/user/user-profile"
import { FeedContainer } from "@/components/networking/post/post-edit"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage({ params }: { params: { username: string } }) {
  return (
    <div className="flex flex-col gap-8">
      <UserProfile username={params.username} />

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <FeedContainer username={params.username} />
        </TabsContent>
        <TabsContent value="media">
          <div className="grid grid-cols-3 gap-4">{/* Media content will go here */}</div>
        </TabsContent>
        <TabsContent value="likes">
          <FeedContainer username={params.username} filter="likes" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

