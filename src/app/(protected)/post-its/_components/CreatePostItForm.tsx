"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Field, Fieldset, Stack, Textarea } from "@chakra-ui/react";
import { useForm, useController } from "react-hook-form";
import { useState, useTransition } from "react";
import { toaster } from "@/components/feedback/toaster";
import TextInput from "@/components/form/TextInput";
import { Alert } from "@/components/feedback/alert";
import {
	type CreatePostItSchema,
	createPostItSchema,
} from "@/app/(protected)/_actions/createPostIt.schema";
import { Button } from "@/components/buttons/button";
import { createPostIt } from "@/app/(protected)/_actions/createPostIt";

type CreatePostItFormProps = {
	onSuccess?: () => void;
};

const CreatePostItForm = ({ onSuccess }: CreatePostItFormProps) => {
	const [error, setError] = useState<string | null>(null);
	const [loading, startTransition] = useTransition();

	const { control, handleSubmit } = useForm<CreatePostItSchema>({
		resolver: zodResolver(createPostItSchema),
		defaultValues: {
			title: "",
			content: "",
		},
	});

	const {
		field: contentField,
		fieldState: { error: contentError },
	} = useController({ name: "content", control });

	const onSubmit = async (data: CreatePostItSchema): Promise<void> => {
		setError(null);

		startTransition(async () => {
			const postItId = await createPostIt(data);

			if (postItId) {
				toaster.create({
					description: "Successfully created post-it",
					type: "info",
				});
				onSuccess?.();
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
				Create Post-It
			</Button>
		</Stack>
	);
};

export default CreatePostItForm;
