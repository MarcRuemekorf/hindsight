import BoardItem from "@/app/(protected)/_components/BoardItem";
import { groupBoardsByDate } from "@/utils/groupBoardsByDate";
import { Stack, Text } from "@chakra-ui/react";
import { getBoards } from "../_actions/getBoards";
import Pagination from "./Pagination";

const BoardList = async ({ page, pageSize }: { page?: number; pageSize?: number }) => {
	const recentBoards = await getBoards({ page, pageSize });

	if (recentBoards.length === 0) {
		return null;
	}

	const groups = groupBoardsByDate(recentBoards);

	return (
		<Stack gap="2rem">
			<Stack gap="1.5rem">
				{groups.map((group) => (
					<Stack key={group.label}>
						<Text fontSize="xs" color="fg.muted">
							{group.label}
						</Text>
						{group.boards.map((board) => (
							<BoardItem key={board.id} {...board} />
						))}
					</Stack>
				))}
			</Stack>
			<Pagination page={page} pageSize={pageSize} />
		</Stack>
	);
};

export default BoardList;
