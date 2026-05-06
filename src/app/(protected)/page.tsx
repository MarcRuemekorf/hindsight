import BoardList from "@/app/(protected)/_components/BoardList";
import Link from "@/components/typography/link";
import { Container, Heading, HStack, Stack } from "@chakra-ui/react";

type Props = { searchParams: Promise<{ page?: string }> };

const DashboardPage = async ({ searchParams }: Props) => {
	const { page } = await searchParams;
	const currentPage = Math.max(1, Number(page) || 1);

	return (
		<Container maxWidth="6xl">
			<Stack gap="2rem">
				<HStack>
					<Heading as="h2" size="xl">
						Latest boards
					</Heading>
					<Link href="/boards" fontSize="sm" ml="auto">
						View all
					</Link>
				</HStack>
				<BoardList page={currentPage} pageSize={5} />
			</Stack>
		</Container>
	);
};

export default DashboardPage;
