import CreateBoardDialog from "@/app/(protected)/_components/CreateBoardDialog";
import MainNavigation from "@/app/(protected)/_components/MainNavigation";
import LogoutButton from "@/app/(public)/_components/LogoutButton";
import Link from "@/components/typography/link";
import { HStack } from "@chakra-ui/react";

const Header = () => {
  return (
    <HStack width="100%" bg="bg.subtle" p="1rem" justifyContent="space-between">
      <HStack gap="2rem">
        <Link href="/">Hindsight</Link>
        <MainNavigation />
      </HStack>
      <HStack>
        <CreateBoardDialog />
        <LogoutButton />
      </HStack>
    </HStack>
  );
};

export default Header;
