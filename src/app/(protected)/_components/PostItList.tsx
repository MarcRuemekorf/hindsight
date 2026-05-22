import PostItCard from "@/app/(protected)/_components/PostItCard";
import { groupItemsByDate } from "@/utils/groupItemsByDate";
import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { getPostIts } from "@/app/(protected)/_actions/getpostIts";
import Pagination from "./Pagination";

const PostItList = async ({ page, pageSize, paramName }: { page?: number; pageSize?: number; paramName?: string }) => {
	const { postIts, totalCount } = await getPostIts({ page, pageSize });

	if (postIts.length === 0) {
		return null;
	}

	const postItGroupsByDate = groupItemsByDate(postIts);

	return (
		<Stack gap="2rem">
			<Stack gap="1.5rem">
				{postItGroupsByDate.map((group) => (
					<Stack key={group.label}>
						<Text fontSize="xs" color="fg.muted">
							{group.label}
						</Text>
						<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="0.5rem">
							{group.items.map((postIt) => (
								<PostItCard key={postIt.id} {...postIt} />
							))}
						</SimpleGrid>
					</Stack>
				))}
			</Stack>
			<Pagination page={page} pageSize={pageSize} count={totalCount} paramName={paramName} />
		</Stack>
	);
};

export default PostItList;
