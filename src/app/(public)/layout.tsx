import Navigation from "@/app/(public)/_components/Navigation";
import { Card, Center } from "@chakra-ui/react";
import { ReactNode } from "react";
import LogoutButton from "@/app/(public)/_components/LogoutButton";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <Center minHeight="100vh">
      <Card.Root maxWidth="xs" width="100%">
        <Card.Header>
          <Navigation />
        </Card.Header>
        <Card.Body>{children}</Card.Body>
        <Card.Footer>
          <LogoutButton />
        </Card.Footer>
      </Card.Root>
    </Center>
  );
}
