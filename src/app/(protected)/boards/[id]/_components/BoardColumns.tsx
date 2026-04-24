import { Container, Flex, ScrollArea } from "@chakra-ui/react";
import BoardColumn from "./BoardColumn";

const BoardColumns = ({ boardId }: { boardId: string }) => {
	return (
		<Container maxWidth="full">
			<ScrollArea.Root width="full" size="xs">
				<ScrollArea.Viewport>
					<ScrollArea.Content>
						<Flex gap="4" flexWrap="nowrap">
							<BoardColumn boardId={boardId} />
						</Flex>
					</ScrollArea.Content>
				</ScrollArea.Viewport>
				<ScrollArea.Scrollbar orientation="horizontal" />
				<ScrollArea.Corner />
			</ScrollArea.Root>
		</Container>
	);
};

export default BoardColumns;
