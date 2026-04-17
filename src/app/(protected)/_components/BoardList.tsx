import BoardItem from "@/app/(protected)/_components/BoardItem";
import { groupBoardsByDate } from "@/utils/groupBoardsByDate";
import { Stack, Text } from "@chakra-ui/react";
import { getBoards } from "../_actions/getBoards";

const BoardList = async ({ page, pageSize }: { page?: number; pageSize?: number }) => {
	const recentBoards = await getBoards(page, pageSize);

	if (recentBoards.length === 0) {
		return null;
	}

	const groups = groupBoardsByDate(recentBoards);

	return (
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
	);
};

export default BoardList;
