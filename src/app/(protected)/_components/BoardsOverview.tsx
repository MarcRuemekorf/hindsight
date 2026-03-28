import BoardItem from "@/app/(protected)/_components/BoardItem";
import Link from "@/components/ui/typography/link";
import { Heading, HStack, Stack, Text } from "@chakra-ui/react";

const BoardsOverview = () => {
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
        <Stack>
          <Text fontSize="xs" color="fg.muted">
            Laatst gewijzigd - 2 dagen geleden
          </Text>
          <BoardItem title="Team retro" columnsAmount={3} postItsAmount={43} />
          <BoardItem title="Avics retro" columnsAmount={4} postItsAmount={23} />
          <BoardItem
            title="ZilliZ retro"
            columnsAmount={4}
            postItsAmount={56}
          />
        </Stack>
        <Stack>
          <Text fontSize="xs" color="fg.muted">
            Laatst gewijzigd - 2 weken geleden
          </Text>
          <BoardItem title="Team retro" columnsAmount={3} postItsAmount={46} />
          <BoardItem title="Avics retro" columnsAmount={4} postItsAmount={33} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BoardsOverview;
