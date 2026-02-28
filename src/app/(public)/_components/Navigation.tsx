"use client";

import { Tabs } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const path = usePathname();

  return (
    <Tabs.Root variant="enclosed" value={path} fitted>
      <Tabs.List>
        <Tabs.Trigger value="/login" asChild>
          <NextLink href="/login">Login</NextLink>
        </Tabs.Trigger>
        <Tabs.Trigger value="/register" asChild>
          <NextLink href="/register">Register</NextLink>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
};

export default Navigation;
