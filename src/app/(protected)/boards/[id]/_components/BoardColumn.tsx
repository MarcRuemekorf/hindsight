"use client";

import { Button } from "@/components/buttons/button";
import { Box, HStack, Stack, Heading } from "@chakra-ui/react";
import { BoardColumn as BoardColumnType } from "../_actions/getBoard";

const BoardColumn = ({ column }: { boardId: string; column: BoardColumnType }) => {
	return (
		<Box borderRadius="md" backgroundColor="bg.subtle" padding="1rem" width="360px">
			<Stack gap="1rem">
				<HStack>
					<Heading fontSize="lg">{column.title}</Heading>
				</HStack>
				<Button size="sm" width="full" variant="subtle" mr="auto">
					Add post-it
				</Button>
			</Stack>
		</Box>
	);
};

export default BoardColumn;
