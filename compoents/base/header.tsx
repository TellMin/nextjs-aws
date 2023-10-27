"use client";

import useSession from "@/hooks/useSession";
import { signOut } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return;

  const user = session?.user?.name || session?.user?.email || "there";

  return (
    <div>
      Welcome
      <span className="font-bold"> {user}</span>
      <div>
        <button onClick={() => signOut({ callbackUrl: "api/auth/signOut" })}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Header;
