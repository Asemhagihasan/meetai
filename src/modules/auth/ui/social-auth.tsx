import { useState, useTransition } from "react";
import { authClient } from "@/lib/auth-client";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

import ErrorAlert from "./error-alert";
import { useRouter } from "next/navigation";

const SocialAuth = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSocial = (provider: "github" | "google") => {
    setError(null);
    startTransition(async () => {
      await authClient.signIn.social(
        {
          provider,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: ({ error }) => {
            setError(error.message || "Something went wrong");
          },
        },
      );
    });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Button disabled variant="outline" type="button" className="w-full">
          <FaGoogle />
        </Button>
        <Button
          disabled={isPending}
          variant="outline"
          type="button"
          className="w-full"
          onClick={() => onSocial("github")}
        >
          <FaGithub />
        </Button>
      </div>
      {!!error && <ErrorAlert errorMessage={error} />}
    </>
  );
};

export default SocialAuth;
