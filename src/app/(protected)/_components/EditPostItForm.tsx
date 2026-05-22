"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Field, Fieldset, Stack, Textarea } from "@chakra-ui/react";
import { useForm, useController } from "react-hook-form";
import { useState, useTransition } from "react";
import { toaster } from "@/components/feedback/toaster";
import TextInput from "@/components/form/TextInput";
import { Alert } from "@/components/feedback/alert";
import { updatePostItSchema, type UpdatePostItSchema } from "@/app/(protected)/_actions/updatePostIt.schema";
import { Button } from "@/components/buttons/button";
import { updatePostIt } from "@/app/(protected)/_actions/updatePostIt";

type EditPostItFormProps = {
	postItId: string;
	defaultTitle: string;
	defaultContent?: string | null;
	onSuccess?: () => void;
};

const EditPostItForm = ({ postItId, defaultTitle, defaultContent, onSuccess }: EditPostItFormProps) => {
	const [error, setError] = useState<string | null>(null);
	const [loading, startTransition] = useTransition();

	const { control, handleSubmit } = useForm<UpdatePostItSchema>({
		resolver: zodResolver(updatePostItSchema),
		defaultValues: {
			postItId,
			title: defaultTitle,
			content: defaultContent ?? "",
		},
	});

	const { field: contentField, fieldState: { error: contentError } } = useController({ name: "content", control });

	const onSubmit = async (data: UpdatePostItSchema): Promise<void> => {
		setError(null);

		startTransition(async () => {
			const result = await updatePostIt(data);

			if (result === "ok") {
				toaster.create({ description: "Post-it updated", type: "info" });
				onSuccess?.();
			} else {
				setError("Failed to update post-it. Please try again.");
			}
		});
	};

	return (
		<Stack as="form" onSubmit={handleSubmit(onSubmit)} gap="1.5rem">
			{error && <Alert status="error" title={error} />}
			<Fieldset.Root size="lg">
				<Fieldset.Content>
					<TextInput name="title" title="Title" control={control} required />
					<Field.Root invalid={!!contentError}>
						<Field.Label>Content</Field.Label>
						<Textarea {...contentField} placeholder="Content" />
						{contentError && <Field.ErrorText>{contentError.message}</Field.ErrorText>}
					</Field.Root>
				</Fieldset.Content>
			</Fieldset.Root>
			<Button type="submit" variant="solid" loading={loading} ml="auto">
				Save changes
			</Button>
		</Stack>
	);
};

export default EditPostItForm;
