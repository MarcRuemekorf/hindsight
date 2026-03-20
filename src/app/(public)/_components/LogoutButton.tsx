"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/buttons/button";
import { logOut } from "@/utils/auth-client";
import { toaster } from "@/components/ui/feedback/toaster";

const LogoutButton = () => {
  const router = useRouter();

  const onLogout = async () => {
    await logOut({
      fetchOptions: {
        onSuccess: () => {
          toaster.create({
            description: "Successfully logged out",
            type: "info",
          });
          router.push("/login");
        },
      },
    });
  };

  return (
    <Button type="button" variant="plain" onClick={onLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
