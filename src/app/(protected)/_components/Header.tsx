import MainNavigation from "@/app/(protected)/_components/MainNavigation";
import LogoutButton from "@/app/(public)/_components/LogoutButton";
import Link from "@/components/ui/link";
import { HStack } from "@chakra-ui/react";

const Header = () => {
  return (
    <HStack width="100%" bg="bg.subtle" p="1rem" justifyContent="space-between">
      <HStack gap="2rem">
        <Link href="/">Hindsight</Link>
        <MainNavigation />
      </HStack>
      <LogoutButton />
    </HStack>
  );
};

export default Header;
