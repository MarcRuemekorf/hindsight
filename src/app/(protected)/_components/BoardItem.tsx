import Link from "@/components/ui/typography/link";
import { Avatar, AvatarGroup, Card, HStack, Text } from "@chakra-ui/react";

type BoardItemProps = {
  title: string;
  postItsAmount: number;
};

const BoardItem = ({ title, postItsAmount }: BoardItemProps) => {
  return (
    <Card.Root width="100%" py="0.5rem" px="1rem">
      <HStack>
        <HStack gap="2rem">
          <Link href="#" fontWeight="bold">
            {title}
          </Link>
          <Text>{postItsAmount} post-its</Text>
        </HStack>
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
    </Card.Root>
  );
};

export default BoardItem;
