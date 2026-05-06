import MainNavigation from "@/app/(protected)/_components/MainNavigation";
import LogoutButton from "@/app/(public)/_components/LogoutButton";
import Link from "@/components/typography/link";
import { Container, HStack } from "@chakra-ui/react";
import CreateButton from "./CreateButton";

const Header = () => {
	return (
		<Container maxWidth="full" bg="bg.subtle" py="1rem">
			<HStack width="100%" justifyContent="space-between">
				<HStack gap="2rem">
					<Link href="/" fontWeight="semibold">Hindsight</Link>
					<MainNavigation />
				</HStack>
				<HStack>
					<CreateButton />
					<LogoutButton />
				</HStack>
			</HStack>
		</Container>
	);
};

export default Header;
