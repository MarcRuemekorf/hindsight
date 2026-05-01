"use client";

import { Alert } from "@/components/feedback/alert";
import { toaster } from "@/components/feedback/toaster";
import TextInput from "@/components/form/TextInput";
import { Box, Button, Fieldset, HStack, Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { CreateColumnSchema, createColumnSchema } from "../_actions/createColumn.schema";
import { createColumn } from "../_actions/createColumn";
import { LuPlus, LuX } from "react-icons/lu";

const CreateBoardColumnForm = ({ boardId }: { boardId: string }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [loading, startTransition] = useTransition();

	const { control, handleSubmit, reset } = useForm<CreateColumnSchema>({
		resolver: zodResolver(createColumnSchema),
		defaultValues: {
			title: "",
		},
	});

	const onSubmit = async (data: CreateColumnSchema): Promise<void> => {
		setError(null);

		startTransition(async () => {
			const columnId = await createColumn({ ...data, boardId });

			if (columnId) {
				toaster.create({
					description: "Successfully created column",
					type: "info",
				});

				reset();
				setIsEditing(false);
			}
		});
	};

	return (
		<Box borderRadius="md" backgroundColor="bg.subtle" padding="1rem" width="360px">
			{!isEditing && (
				<Button
					size="sm"
					variant="plain"
					width="full"
					loading={loading}
					onClick={() => setIsEditing(true)}
				>
					<LuPlus /> Add new column
				</Button>
			)}
			{isEditing && (
				<Stack as="form" onSubmit={handleSubmit(onSubmit)} gap="1rem">
					{error && <Alert status="error" title={error} />}
					<Fieldset.Root size="lg" maxW="md">
						<Fieldset.Content>
							<TextInput name="title" title="Title" control={control} />
						</Fieldset.Content>
					</Fieldset.Root>
					<HStack>
						<Button type="submit" size="sm" variant="subtle" loading={loading}>
							Create Column
						</Button>
						<Button
							size="sm"
							variant="ghost"
							px="0"
							onClick={() => setIsEditing(false)}
						>
							<LuX />
						</Button>
					</HStack>
				</Stack>
			)}
		</Box>
	);
};

export default CreateBoardColumnForm;
