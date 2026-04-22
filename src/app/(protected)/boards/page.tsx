import BoardList from "@/app/(protected)/_components/BoardList";
import { Heading, HStack, Stack } from "@chakra-ui/react";

const BoardsPage = () => {
	return (
		<Stack gap="2rem">
			<HStack>
				<Heading as="h2" size="xl">
					Boards overview
				</Heading>
			</HStack>
			<BoardList />
		</Stack>
	);
};

export default BoardsPage;
