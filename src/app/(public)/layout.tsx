import { Center } from "@chakra-ui/react";
import { ReactNode } from "react";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return <Center minHeight="100vh">{children}</Center>;
}
