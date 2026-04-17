import { Button } from "@/components/ui/buttons/button";
import Link from "@/components/ui/typography/link";
import type { BoardSummary } from "@/utils/groupBoardsByDate";
import {
  Avatar,
  AvatarGroup,
  Card,
  HStack,
  List,
  Text,
} from "@chakra-ui/react";
import { LuCalendar, LuColumns3, LuStickyNote, LuUserPlus } from "react-icons/lu";

const BoardItem = ({ id, title, createdAt, columnCount, postItCount, members }: BoardSummary) => {
  const visibleMembers = (members ?? []).slice(0, 5);
  return (
    <Link
      variant="plain"
      href={`/boards/${id}`}
      _hover={{ textDecoration: "none" }}
      _focusVisible={{ outline: "none" }}
    >
      <Card.Root width="100%" py="0.5rem" px="1rem">
        <HStack alignItems="flex-start">
          <Text fontWeight="bold">{title}</Text>
          <HStack ml="auto">
            <AvatarGroup gap="0" spaceX="-3" size="xs" ml="auto">
              {visibleMembers.map((member) => (
                <Avatar.Root key={member.name}>
                  <Avatar.Fallback name={member.name} />
                  {member.image && <Avatar.Image src={member.image} />}
                </Avatar.Root>
              ))}
            </AvatarGroup>
            {members && members.length < 2 && (
            <Button size="xs" variant="subtle"><LuUserPlus /> Invite members</Button>
            )}
          </HStack>
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
            <Text>
              {createdAt.toLocaleDateString("nl-NL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </Text>
          </List.Item>
          <List.Item>
            <List.Indicator asChild color="fg.muted">
              <LuColumns3 />
            </List.Indicator>
            <Text>{columnCount} columns</Text>
          </List.Item>
          <List.Item>
            <List.Indicator asChild color="fg.muted">
              <LuStickyNote />
            </List.Indicator>
            <Text>{postItCount} post-its</Text>
          </List.Item>
        </List.Root>
      </Card.Root>
    </Link>
  );
};

export default BoardItem;
