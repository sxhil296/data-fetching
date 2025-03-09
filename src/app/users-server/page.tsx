import { Suspense } from "react";
import LoadingUsers from "./loading";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

export default async function UserServer() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const user: User[] = await response.json();
  console.log(user);
  return (
    <div className="flex justify-center items-center py-10 flex-col gap-4">
      <h1>Users list on server</h1>

      <ul className="space-y-2">
        {user.map((user) => (
          <li key={user.id} className="bg-black p-2 rounded text-white">
            <h2>{user.name}</h2>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
