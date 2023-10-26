"use client";

import useSession from "@/hooks/useSession";

const Header = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return;

  const user = session?.user?.name || session?.user?.email || "there";

  return (
    <div>
      Welcome
      <span className="font-bold"> {user}</span>
    </div>
  );
};

export default Header;
