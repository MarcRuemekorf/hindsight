import BoardItem from "@/app/(protected)/_components/BoardItem";
import Link from "@/components/ui/typography/link";
import { groupBoardsByDate } from "@/utils/groupBoardsByDate";
import { Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { getRecentBoards } from "../_actions/getRecentBoards";

const BoardsOverview = async () => {
  const recentBoards = await getRecentBoards();

  if (recentBoards.length === 0) {
    return null;
  }

  const groups = groupBoardsByDate(recentBoards);

  return (
    <Stack gap="2rem">
      <HStack>
        <Heading as="h2" size="xl">
          My recent boards
        </Heading>
        <Link href="#" fontSize="sm" ml="auto">
          View all
        </Link>
      </HStack>
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
    </Stack>
  );
};

export default BoardsOverview;
