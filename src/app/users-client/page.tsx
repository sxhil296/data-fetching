"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

export default function UsersClient() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users`
        );
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred!");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex justify-center items-center py-10 flex-col gap-4">
      <h1 className="text-2xl font-bold">Users List</h1>
      {loading && (
        <>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </>
      )}
      {error && (
        <>
          <div className="text-red-500">{error}</div>
        </>
      )}
      {users && 
       <div className="flex flex-col gap-2">
        { users?.map((user) => (
            <div key={user.id} className="p-2 my-2">
                <h2 className="text-lg font-bold">{user.name}</h2>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
            </div>
        ))}
       </div>
      }
    </div>
  );
}
