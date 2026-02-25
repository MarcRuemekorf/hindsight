"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Fieldset, Stack } from "@chakra-ui/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import TextInput from "@/components/form/TextInput";
import { Alert } from "@/components/ui/alert";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  email: z.email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  passwordConfirmation: z.string().min(1, "Password confirmation is required."),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, startTransition] = useTransition();

  const { control, handleSubmit } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues): Promise<void> => {
    setError(null);

    startTransition(async () => {});
  };

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} gap="1.5rem">
      {error && <Alert status="error" title={error} />}
      <Fieldset.Root size="lg" maxW="md">
        <Fieldset.Content>
          <TextInput
            name="name"
            title="Name"
            control={control}
            type="text"
            required
          />
          <TextInput
            name="email"
            title="Email address"
            control={control}
            type="email"
            required
          />
          <TextInput
            name="password"
            title="Password"
            control={control}
            type="password"
            required
          />
        </Fieldset.Content>
      </Fieldset.Root>
      <Button type="submit" variant="solid" loading={loading}>
        Log in
      </Button>
    </Stack>
  );
};

export default RegisterForm;
