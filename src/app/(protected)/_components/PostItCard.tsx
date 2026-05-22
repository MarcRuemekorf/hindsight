"use client";

import { Button } from "@/components/buttons/button";
import { Card, HStack, Menu, Portal, Stack, Text } from "@chakra-ui/react";
import { useState, useTransition } from "react";
import { LuEllipsis, LuTrash2 } from "react-icons/lu";
import { toaster } from "@/components/feedback/toaster";
import { deletePostIt } from "@/app/(protected)/_actions/deletePostIt";
import DeletePostItDialog from "./DeletePostItDialog";

export type PostIt = {
	id: string;
	title: string;
	content: string | null;
	createdAt: Date;
};

const PostItCard = ({ id, title, content, createdAt }: PostIt) => {
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [deleting, startTransition] = useTransition();

	const performDelete = () => {
		startTransition(async () => {
			const result = await deletePostIt({ postItId: id });
			if (result === "ok") {
				toaster.create({ description: "Post-it deleted", type: "info" });
			} else {
				toaster.create({ description: "Failed to delete post-it.", type: "error" });
			}
			setConfirmOpen(false);
		});
	};

	return (
		<>
			<Card.Root width="100%" height="150px" p="1rem 1rem 0.5rem">
				<Stack height="100%">
					<Text fontWeight="bold">{title}</Text>
					<Text>{content}</Text>
					<HStack justifyContent="space-between" mt="auto">
						<Text fontSize="xs" color="fg.muted">
							{createdAt.toLocaleDateString()}
						</Text>
						<Menu.Root>
							<Menu.Trigger asChild>
								<Button
									aria-label="Post-it actions"
									size="xs"
									px="0"
									variant="ghost"
								>
									<LuEllipsis />
								</Button>
							</Menu.Trigger>
							<Portal>
								<Menu.Positioner>
									<Menu.Content>
										<Menu.Item
											value="delete"
											color="fg.error"
											onClick={() => setConfirmOpen(true)}
										>
											<LuTrash2 /> Delete post-it
										</Menu.Item>
									</Menu.Content>
								</Menu.Positioner>
							</Portal>
						</Menu.Root>
					</HStack>
				</Stack>
			</Card.Root>

			<DeletePostItDialog
				open={confirmOpen}
				setOpen={setConfirmOpen}
				deleting={deleting}
				onConfirm={performDelete}
			/>
		</>
	);
};

export default PostItCard;
