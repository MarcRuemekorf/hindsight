"use client";

import Link from "@/components/typography/link";
import { Avatar, AvatarGroup, Card, HStack, List, Menu, Portal, Stack, Text } from "@chakra-ui/react";
import { LuCalendar, LuColumns3, LuEllipsis, LuStickyNote, LuTrash2 } from "react-icons/lu";
import { useState, useTransition } from "react";
import { Button } from "@/components/buttons/button";
import { toaster } from "@/components/feedback/toaster";
import { deleteBoard } from "../_actions/deleteBoard";
import DeleteBoardDialog from "./DeleteBoardDialog";

export type Board = {
	id: string;
	title: string;
	createdAt: Date;
	columnCount: number;
	postItCount: number;
	members?: {
		name: string;
		image?: string | null;
	}[];
};

const BoardCard = ({ id, title, createdAt, columnCount, postItCount, members }: Board) => {
	const visibleMembers = (members ?? []).slice(0, 5);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [deleting, startTransition] = useTransition();

	const performDelete = () => {
		startTransition(async () => {
			const result = await deleteBoard({ boardId: id });
			if (result === "ok") {
				toaster.create({ description: "Board deleted", type: "info" });
			} else {
				toaster.create({ description: "Failed to delete board.", type: "error" });
			}
			setConfirmOpen(false);
		});
	};

	return (
		<>
		
			<Card.Root width="100%" height="fit-content" p="1rem 1rem 0.5rem">
				<Stack justifyContent="space-between" height="100%">
					<HStack alignItems="flex-start">
						<Link
							variant="plain"
							href={`/boards/${id}`}
							_hover={{ textDecoration: "none" }}
							_focusVisible={{ outline: "none" }}
						>
							<Text fontWeight="bold">{title}</Text>
						</Link>
						<HStack ml="auto">
							<AvatarGroup gap="0" spaceX="-3" size="xs" ml="auto">
								{visibleMembers.map((member) => (
									<Avatar.Root key={member.name}>
										<Avatar.Fallback name={member.name} />
										{member.image && <Avatar.Image src={member.image} />}
									</Avatar.Root>
								))}
							</AvatarGroup>
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
						<List.Item ml="auto">
							<Menu.Root>
								<Menu.Trigger asChild>
									<Button aria-label="Board actions" size="xs" px="0" variant="ghost">
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
												<LuTrash2 /> Delete board
											</Menu.Item>
										</Menu.Content>
									</Menu.Positioner>
								</Portal>
							</Menu.Root>
						</List.Item>
					</List.Root>
				</Stack>
			</Card.Root>

			<DeleteBoardDialog
				open={confirmOpen}
				setOpen={setConfirmOpen}
				deleting={deleting}
				onConfirm={performDelete}
			/>
		</>
	);
};

export default BoardCard;
