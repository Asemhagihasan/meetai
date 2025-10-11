"use client";
import { authClient } from "@/lib/auth-client";

const HomeView = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-y-4 p-4">
      <p className="">Logged in as {session?.user?.email}</p>
    </div>
  );
};

export default HomeView;
