import BoardList from "@/app/(protected)/_components/BoardList";
import { Container, Heading, HStack, Stack } from "@chakra-ui/react";

const BoardsPage = () => {
	return (
		<Container maxWidth="6xl">
			<Stack gap="2rem">
				<HStack>
					<Heading as="h2" size="xl">
						Boards overview
					</Heading>
				</HStack>
				<BoardList />
			</Stack>
		</Container>
	);
};

export default BoardsPage;
