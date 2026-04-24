"use client"

import { Alert } from "@/components/feedback/alert";
import { toaster } from "@/components/feedback/toaster";
import TextInput from "@/components/form/TextInput";
import { Box, Button, Fieldset, Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { CreateColumnSchema, createColumnSchema } from "../_actions/createColumn.schema";
import { createColumn } from "../_actions/createColumn";

const BoardColumn = ({ boardId }: { boardId: string }) => {
	const [error, setError] = useState<string | null>(null);
	const [loading, startTransition] = useTransition();

	const { control, handleSubmit } = useForm<CreateColumnSchema>({
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
			}
		});
	};
	handleSubmit((data) => console.log(data))();
	return (
		<Box borderRadius="md" backgroundColor="bg.subtle" padding="1rem" width="360px">
			<Stack as="form" onSubmit={handleSubmit(onSubmit)} gap="1rem">
				{error && <Alert status="error" title={error} />}
				<Fieldset.Root size="lg" maxW="md">
					<Fieldset.Content>
						<TextInput name="title" title="Title" control={control} required />
					</Fieldset.Content>
				</Fieldset.Root>
				<Button type="submit" size="sm" variant="subtle" loading={loading} mr="auto">
					Create Column
				</Button>
			</Stack>
		</Box>
	);
};

export default BoardColumn;
