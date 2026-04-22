import BoardItem from "@/app/(protected)/_components/BoardItem";
import { groupBoardsByDate } from "@/utils/groupBoardsByDate";
import { Stack, Text } from "@chakra-ui/react";
import { getBoards } from "../_actions/getBoards";
import Pagination from "./Pagination";

const BoardList = async ({ page, pageSize }: { page?: number; pageSize?: number }) => {
	const { boards, totalCount } = await getBoards({ page, pageSize });

	if (boards.length === 0) {
		return null;
	}

	const boardGroupsByDate = groupBoardsByDate(boards);

	return (
		<Stack gap="2rem">
			<Stack gap="1.5rem">
				{boardGroupsByDate.map((group) => (
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
			<Pagination page={page} pageSize={pageSize} count={totalCount} />
		</Stack>
	);
};

export default BoardList;
