import Link from "@/components/ui/link";
import { Tabs } from "@chakra-ui/react";

const Navigation = () => (
  <Tabs.Root variant="enclosed" fitted>
    <Tabs.List>
      <Tabs.Trigger value="login">
        <Link unstyled href="/login">
          Login
        </Link>
      </Tabs.Trigger>
      <Tabs.Trigger value="register">
        <Link unstyled href="/register">
          Register
        </Link>
      </Tabs.Trigger>
    </Tabs.List>
  </Tabs.Root>
);

export default Navigation;
