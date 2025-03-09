import Author from "./author";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export default async function PostSeq() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const post: Post[] = await response.json();

  const filteredPost = post.filter((post) => post.id % 10 === 1);
  console.log(filteredPost);
  return (
    <div className="flex justify-center w-full items-center py-6 flex-col gap-3 px-6">
      <h1>Posts - Sequential fetch</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredPost.map((post) => (
          <div key={post.id} className="border p-2 rounded space-y-2">
            <h2 className="font-bold">{post.title}</h2>
            <p>{post.body}</p>
            {/* <p className="text-gray-400">author name to be fetched</p> */}
            <Author userId={post.userId}/>
          </div>
        ))}
      </div>
    </div>
  );
}
