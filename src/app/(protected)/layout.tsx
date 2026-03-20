import Header from "@/app/(protected)/_components/Header";
import { Stack, Container } from "@chakra-ui/react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack height="100vh" alignItems="stretch" gap="4rem">
      <Header />
      <Container maxWidth="6xl">{children}</Container>
    </Stack>
  );
};

export default ProtectedLayout;
