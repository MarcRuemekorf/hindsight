import AuthNavigation from "@/app/(public)/_components/AuthNavigation";
import { Card, Center } from "@chakra-ui/react";
import { ReactNode } from "react";
import LogoutButton from "@/app/(public)/_components/LogoutButton";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <Center minHeight="100vh">
      <Card.Root maxWidth="md" width="100%">
        <Card.Header>
          <AuthNavigation />
        </Card.Header>
        <Card.Body>{children}</Card.Body>
      </Card.Root>
    </Center>
  );
}
