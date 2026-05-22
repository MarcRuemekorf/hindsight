"use client";

import { Button } from "@/components/buttons/button";
import { Box, HStack, Stack, Heading, Menu, Portal } from "@chakra-ui/react";
import { BoardColumn as BoardColumnType } from "../_actions/getBoard";
import { LuEllipsis, LuTrash2 } from "react-icons/lu";
import { toaster } from "@/components/feedback/toaster";
import { deleteColumn } from "../_actions/deleteColumn";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import DeleteColumnDialog from "./DeleteColumnDialog";

type BoardColumnProps = {
	boardId: string;
    column: BoardColumnType;
    isOwner: boolean;
};

const BoardColumn = ({ boardId, column, isOwner }: BoardColumnProps) => {
	const router = useRouter();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, startTransition] = useTransition();

    const handleDelete = () => {
        if (column.postIts.length > 0) {
            setConfirmOpen(true);
            return;
        }
        
		performDelete();		
    };

	const performDelete = () => {
		startTransition(async () => {
            const result = await deleteColumn({ columnId: column.id, boardId });
            if (result === "ok") {
				toaster.create({
					description: "Successfully deleted column",
					type: "info",
				});
                router.refresh();
            } else {
                toaster.create({ description: "Failed to delete column.", type: "error" });
            }
            setConfirmOpen(false);
        });
	}

	return (
		<>
		<Box borderRadius="md" backgroundColor="bg.subtle" padding="1rem" width="360px">
			<Stack gap="1rem">
				<HStack justifyContent="space-between">
					<Heading fontSize="lg">{column.title}</Heading>
					{isOwner && (
						<Menu.Root>
							<Menu.Trigger asChild>
								<Button aria-label="Column actions" size="xs" px="0" variant="ghost">
									<LuEllipsis />
								</Button>
							</Menu.Trigger>
							<Portal>
								<Menu.Positioner>
									<Menu.Content>
										<Menu.Item
											value="delete"
											color="fg.error"
											onClick={handleDelete}
										>
											<LuTrash2 /> Delete column
										</Menu.Item>
									</Menu.Content>
								</Menu.Positioner>
							</Portal>
						</Menu.Root>
					)}
				</HStack>
				<Button size="sm" width="full" variant="subtle" mr="auto">
					Add post-it
				</Button>
			</Stack>
		</Box>

		<DeleteColumnDialog
            column={column}
            open={confirmOpen}
            setOpen={setConfirmOpen}
            deleting={deleting}
            onConfirm={performDelete}
        />
		</>
	);
};

export default BoardColumn;
