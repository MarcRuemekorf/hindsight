import { Container, HStack, ScrollArea } from "@chakra-ui/react";
import BoardColumn from "./BoardColumn";
import CreateColumnForm from "./CreateBoardColumnForm";
import { BoardColumn as BoardColumnType } from "../_actions/getBoard";

const BoardColumns = ({ boardId, columns }: { boardId: string; columns: BoardColumnType[] }) => {
	return (
		<ScrollArea.Root maxWidth="full" height="full">
			<ScrollArea.Viewport
				css={{
					"--scroll-shadow-size": "2rem",
					maskImage: "linear-gradient(#000, #000)",
					"&[data-overflow-x]": {
						maskImage:
							"linear-gradient(to right, transparent, #000 var(--scroll-shadow-size), #000 calc(100% - var(--scroll-shadow-size)), transparent)",
						"&[data-at-start]": {
							maskImage:
								"linear-gradient(to right, #000 calc(100% - var(--scroll-shadow-size)), transparent)",
						},
						"&[data-at-end]": {
							maskImage:
								"linear-gradient(to left, #000 calc(100% - var(--scroll-shadow-size)), transparent)",
						},
					},
				}}
			>
				<ScrollArea.Content>
					<Container maxWidth="full" height="full">
						<HStack gap="1rem" align="start" flexWrap="nowrap">
							{columns.map((column) => (
								<BoardColumn key={column.id} boardId={boardId} column={column} />
							))}
							<CreateColumnForm boardId={boardId} />
						</HStack>
					</Container>
				</ScrollArea.Content>
			</ScrollArea.Viewport>
			<ScrollArea.Scrollbar orientation="horizontal" />
			<ScrollArea.Corner />
		</ScrollArea.Root>
	);
};

export default BoardColumns;
