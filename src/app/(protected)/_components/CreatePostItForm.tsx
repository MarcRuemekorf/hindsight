"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Fieldset, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { toaster } from "@/components/feedback/toaster";
import TextInput from "@/components/form/TextInput";
import { Alert } from "@/components/feedback/alert";
import {
  type CreatePostItSchema,
  createPostItSchema,
} from "@/app/(protected)/_actions/createPostIt.schema";
import { Button } from "@/components/buttons/button";
import { createPostIt } from "../_actions/createPostIt";

const CreatePostItForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, startTransition] = useTransition();

  const { control, handleSubmit } = useForm<CreatePostItSchema>({
	resolver: zodResolver(createPostItSchema),
	defaultValues: {
	  title: "",
	  content: "",
	},
  });

  const onSubmit = async (data: CreatePostItSchema): Promise<void> => {
	setError(null);

	startTransition(async () => {
	  const postItId = await createPostIt(data);

	  if (postItId) {
		toaster.create({
		  description: "Successfully created post-it",
		  type: "info",
		});
	  }
	});
  };

  return (
	<Stack as="form" onSubmit={handleSubmit(onSubmit)} gap="1.5rem">
	  {error && <Alert status="error" title={error} />}
	  <Fieldset.Root size="lg" maxW="md">
		<Fieldset.Content>
		  <TextInput name="title" title="Title" control={control} required />
		</Fieldset.Content>
		<Fieldset.Content>
		  <TextInput name="content" title="Content" control={control} />
		</Fieldset.Content>
	  </Fieldset.Root>
	  <Button type="submit" variant="solid" loading={loading} ml="auto">
		Create Post-It
	  </Button>
	</Stack>
  );
};

export default CreatePostItForm;
