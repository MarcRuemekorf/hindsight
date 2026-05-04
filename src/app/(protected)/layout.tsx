import Header from "@/app/(protected)/_components/Header";
import { Stack } from "@chakra-ui/react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack height="100vh" alignItems="stretch" gap="1rem">
      <Header />
      {children}
    </Stack>
  );
};

export default ProtectedLayout;
