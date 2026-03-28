import Link from "@/components/ui/typography/link";
import {
  Avatar,
  AvatarGroup,
  Card,
  HStack,
  List,
  Text,
} from "@chakra-ui/react";
import { LuCalendar, LuColumns3, LuStickyNote } from "react-icons/lu";

type BoardItemProps = {
  boardId?: string;
  title: string;
  columnsAmount: number;
  postItsAmount: number;
};

const BoardItem = ({
  boardId,
  title,
  columnsAmount,
  postItsAmount,
}: BoardItemProps) => {
  return (
    <Link
      variant="plain"
      href={`/boards/${boardId}`}
      _hover={{ textDecoration: "none" }}
      _focusVisible={{ outline: "none" }}
    >
      <Card.Root width="100%" py="0.5rem" px="1rem">
        <HStack alignItems="flex-start">
          <Text fontWeight="bold">{title}</Text>
          <HStack gap="2rem"></HStack>
          <AvatarGroup gap="0" spaceX="-3" size="xs" ml="auto">
            <Avatar.Root>
              <Avatar.Fallback name="Jan de Vries" />
            </Avatar.Root>
            <Avatar.Root>
              <Avatar.Fallback name="Daan Bakker" />
            </Avatar.Root>
            <Avatar.Root>
              <Avatar.Fallback name="Sanne Jansen" />
              <Avatar.Image src="https://randomuser.me/api/portraits/women/72.jpg" />
            </Avatar.Root>
            <Avatar.Root>
              <Avatar.Fallback name="Milan Smit" />
              <Avatar.Image src="https://randomuser.me/api/portraits/men/73.jpg" />
            </Avatar.Root>
            <Avatar.Root>
              <Avatar.Fallback name="Lotte Visser" />
              <Avatar.Image src="https://randomuser.me/api/portraits/women/74.jpg" />
            </Avatar.Root>
          </AvatarGroup>
        </HStack>
        <List.Root
          display="flex"
          flexDirection="row"
          gap="1.5rem"
          variant="plain"
          align="center"
          fontSize="sm"
        >
          <List.Item>
            <List.Indicator asChild color="fg.muted">
              <LuCalendar />
            </List.Indicator>
            <Text>01-01-2026</Text>
          </List.Item>
          <List.Item>
            <List.Indicator asChild color="fg.muted">
              <LuColumns3 />
            </List.Indicator>
            <Text>{columnsAmount} columns</Text>
          </List.Item>
          <List.Item>
            <List.Indicator asChild color="fg.muted">
              <LuStickyNote />
            </List.Indicator>
            <Text>{postItsAmount} post-its</Text>
          </List.Item>
        </List.Root>
      </Card.Root>
    </Link>
  );
};

export default BoardItem;
