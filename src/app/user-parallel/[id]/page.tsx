import { Suspense } from "react";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type Album = {
  userId: number;
  id: number;
  title: string;
};

async function fetchUserPosts(userId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  const posts: Post[] = await response.json();
  return posts;
}

async function fetchUserAlbums(userId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
  );
  const albums: Album[] = await response.json();
  return albums;
}

export default async function UserParallel({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = parseInt((await params).id);
  const posts = await fetchUserPosts(userId);
  const albums = await fetchUserAlbums(userId);
  return (
    <div className="grid grid-cols-2 gap-8 p-6">
    <Suspense fallback={<div>Loading...</div>}>
    <div>
      <h1>Posts</h1>
     <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-100 p-4 rounded-lg border">
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
     </div>
     <div>
      <h1>Albums</h1>
     <div className="space-y-4">
        {albums.map((album) => (
          <div key={album.id} className="bg-gray-100 p-4 rounded-lg border">
            <h2 className="text-lg font-bold">{album.title}</h2>
          </div>
        ))}
      </div>
     </div>
    </Suspense>
    </div>
  );
}
