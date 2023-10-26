"use client";

import useSession from "@/hooks/useSession";
import { User } from "@/types";

export default function UserInfo({ user }: { user: User }) {
  const { status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  return (
    <main>
      <h1>User</h1>
      <p>{user.name}</p>
      <p>{user.age}</p>
      <p>{user.email}</p>
      <p>{user.createDate}</p>
    </main>
  );
}
