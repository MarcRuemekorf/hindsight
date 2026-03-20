import BoardItem from "@/app/(protected)/_components/BoardItem";
import { Heading, Stack, Text } from "@chakra-ui/react";

const BoardsOverview = () => {
  return (
    <Stack gap="2rem">
      <Heading as="h2" size="xl">
        My boards
      </Heading>
      <Stack gap="1.5rem">
        <Stack>
          <Text fontSize="xs" color="fg.muted">
            Laatst gewijzigd - 2 dagen geleden
          </Text>
          <BoardItem title="Team retro" postItsAmount={43} />
          <BoardItem title="Avics retro" postItsAmount={23} />
          <BoardItem title="ZilliZ retro" postItsAmount={56} />
        </Stack>
        <Stack>
          <Text fontSize="xs" color="fg.muted">
            Laatst gewijzigd - 2 weken geleden
          </Text>
          <BoardItem title="Team retro" postItsAmount={46} />
          <BoardItem title="Avics retro" postItsAmount={33} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BoardsOverview;
