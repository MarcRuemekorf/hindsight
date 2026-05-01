import { Stack } from "@chakra-ui/react";
import BoardHeader from "./_components/BoardHeader";
import { getBoard } from "./_actions/getBoard";
import BoardColumns from "./_components/BoardColumns";

const BoardDetailsPage = async ({ params }: { params: { id: string } }) => {
	const { id } = await params;
	const board = await getBoard(id);

	console.log(board)
	
	if ('error' in board) {
		return <div>Error: {board.error}</div>;
	}
	
	return (
		<Stack gap="1rem" height="full">
			<BoardHeader title={board.title} members={board.members} />
			<BoardColumns boardId={id} columns={board.columns} />
		</Stack>
	);
};

export default BoardDetailsPage;
