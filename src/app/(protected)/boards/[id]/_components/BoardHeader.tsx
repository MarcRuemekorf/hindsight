import { Avatar, AvatarGroup, Container, Heading, HStack } from "@chakra-ui/react";

const BoardHeader = ({
	title,
	members,
}: {
	title: string;
	members: { id: string; name: string; image: string | null; role: string }[];
}) => {
	return (
		<Container maxWidth="full">
			<HStack>
				<Heading as="h2" size="xl">
					{title ? title : "Board details"}
				</Heading>
				<AvatarGroup gap="0" spaceX="-3" size="xs" ml="auto">
					{members.map((member) => (
						<Avatar.Root key={member.name}>
							<Avatar.Fallback name={member.name} />
							{member.image && <Avatar.Image src={member.image} />}
						</Avatar.Root>
					))}
				</AvatarGroup>
			</HStack>
		</Container>
	);
};

export default BoardHeader;
