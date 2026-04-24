import CreateBoardDialog from "@/app/(protected)/_components/CreateBoardDialog";
import MainNavigation from "@/app/(protected)/_components/MainNavigation";
import LogoutButton from "@/app/(public)/_components/LogoutButton";
import Link from "@/components/typography/link";
import { Container, HStack } from "@chakra-ui/react";

const Header = () => {
	return (
		<Container maxWidth="full" bg="bg.subtle" py="1rem">
			<HStack width="100%" justifyContent="space-between">
				<HStack gap="2rem">
					<Link href="/">Hindsight</Link>
					<MainNavigation />
				</HStack>
				<HStack>
					<CreateBoardDialog />
					<LogoutButton />
				</HStack>
			</HStack>
		</Container>
	);
};

export default Header;
