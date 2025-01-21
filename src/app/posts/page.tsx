"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { useEffect, useRef, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Post {
  id: number;
  title: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  //   to cancel the spam requests
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();
      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/posts?page=${page}`, {
          signal: abortControllerRef.current.signal,
        });
        const posts = (await response.json()) as Post[];

        console.log("POSTS DATA >>>>> : ", posts);
        setPosts(posts);
      } catch (error: any) {
        if (error.name === "AbortError") {
          toast({
            variant: "destructive",
            title: "Request Aborted",
          });
        }
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [page]);

  if (error) {
    return (
      <div className="flex flex-col items-start justify-center gap-4 p-6 bg-red-300">
        <h1>Data Fetching in React</h1>
        <p>Something went wrong. Please reload the page.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start justify-center gap-4 p-4">
      <h1>Data Fetching in React</h1>
      <Button disabled={isLoading} onClick={() => setPage(page + 1)}>
        {isLoading ? "Fetching... " : "Fetch Again"} - {page}
      </Button>
      <ul className="p-2">
        {posts.map((post) => {
          return isLoading ? (
            <Skeleton className="h-5 w-[300px] mb-1" key={post.id} />
          ) : (
            <li key={post.id}>{post.title}</li>
          );
        })}
      </ul>
    </div>
  );
}
