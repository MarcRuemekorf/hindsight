"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fieldset, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { toaster } from "@/components/ui/feedback/toaster";
import TextInput from "@/components/form/TextInput";
import { Alert } from "@/components/ui/feedback/alert";
import { createBoard } from "@/app/(protected)/_actions/createBoard";
import {
  type CreateBoardSchema,
  createBoardSchema,
} from "@/app/(protected)/_actions/createBoard.schema";
import { Button } from "@/components/ui/buttons/button";

const CreateBoardForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, startTransition] = useTransition();

  const { control, handleSubmit } = useForm<CreateBoardSchema>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: CreateBoardSchema): Promise<void> => {
    setError(null);

    startTransition(async () => {
      const boardId = await createBoard(data);

      if (boardId) {
        toaster.create({
          description: "Successfully created board",
          type: "info",
        });

        router.push(`/boards/${boardId}`);
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
      </Fieldset.Root>
      <Button type="submit" variant="solid" loading={loading} ml="auto">
        Create Board
      </Button>
    </Stack>
  );
};

export default CreateBoardForm;
