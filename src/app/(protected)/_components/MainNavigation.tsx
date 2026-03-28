import NavigationItem from "@/app/(protected)/_components/NavigationItem";
import { HStack } from "@chakra-ui/react";
import { ReactElement } from "react";

const MainNavigation = (): ReactElement => {
  return (
    <nav>
      <HStack as="ul" listStyleType="none" width="100%">
        <NavigationItem href="/dashboard" name="Dashboard" />
        <NavigationItem href="/dashboard" name="Boards" />
        <NavigationItem href="/dashboard" name="Post-it's" />
      </HStack>
    </nav>
  );
};

export default MainNavigation;
