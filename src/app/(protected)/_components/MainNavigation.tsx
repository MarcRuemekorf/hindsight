import NavigationItem from "@/app/(protected)/_components/NavigationItem";
import { HStack } from "@chakra-ui/react";
import { ReactElement } from "react";

const MainNavigation = (): ReactElement => {
	return (
		<nav>
			<HStack as="ul" listStyleType="none" width="100%">
				<NavigationItem href="/dashboard" name="Dashboard" />
				<NavigationItem href="/boards" name="Boards" />
				<NavigationItem href="/post-its" name="Post-it's" />
			</HStack>
		</nav>
	);
};

export default MainNavigation;
