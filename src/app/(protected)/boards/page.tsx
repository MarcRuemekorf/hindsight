import BoardList from "@/app/(protected)/_components/BoardList";
import { Container, Heading, HStack, Stack } from "@chakra-ui/react";
import CreateBoardButton from "./_components/CreateBoardButton";

const BoardsPage = () => {
	return (
		<Container maxWidth="6xl">
			<Stack gap="2rem">
				<HStack justifyContent="space-between">
					<Heading as="h2" size="xl">
						Boards overview
					</Heading>
					<CreateBoardButton />
				</HStack>
				<BoardList />
			</Stack>
		</Container>
	);
};

export default BoardsPage;
