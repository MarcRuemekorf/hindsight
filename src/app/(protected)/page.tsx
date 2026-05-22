import BoardList from "@/app/(protected)/_components/BoardList";
import Link from "@/components/typography/link";
import { Container, Heading, HStack, Stack } from "@chakra-ui/react";
import PostItList from "./_components/PostItList";

type Props = { searchParams: Promise<{ boardsPage?: string; postItsPage?: string }> };

const DashboardPage = async ({ searchParams }: Props) => {
	const { boardsPage, postItsPage } = await searchParams;
	const currentBoardsPage = Math.max(1, Number(boardsPage) || 1);
	const currentPostItsPage = Math.max(1, Number(postItsPage) || 1);

	return (
		<Container maxWidth="6xl">
			<Stack gap="4rem" mb="4rem">
				<Stack gap="2rem">
					<HStack>
						<Heading as="h2" size="xl">
							Recent boards
						</Heading>
						<Link href="/boards" fontSize="sm" ml="auto">
							View boards
						</Link>
					</HStack>
					<BoardList page={currentBoardsPage} pageSize={5} paramName="boardsPage" />
				</Stack>
				<Stack gap="2rem">
					<HStack>
						<Heading as="h2" size="xl">
							Recent post-its
						</Heading>
						<Link href="/post-its" fontSize="sm" ml="auto">
							View post-its
						</Link>
					</HStack>
					<PostItList page={currentPostItsPage} pageSize={5} paramName="postItsPage" />
				</Stack>
			</Stack>
		</Container>
	);
};

export default DashboardPage;
