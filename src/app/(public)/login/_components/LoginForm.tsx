"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Fieldset, Stack, VStack } from "@chakra-ui/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { toaster } from "@/components/ui/toaster";
import { logIn } from "@/utils/auth-client";
import TextInput from "@/components/form/TextInput";
import { Alert } from "@/components/ui/alert";

const logInSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean(),
});

type LogInFormValues = z.infer<typeof logInSchema>;

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, startTransition] = useTransition();

  const { control, handleSubmit } = useForm<LogInFormValues>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LogInFormValues): Promise<void> => {
    setError(null);

    startTransition(async () => {
      await logIn.email(
        {
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe,
        },
        {
          onSuccess() {
            toaster.create({
              description: "Successfully logged in",
              type: "info",
            });
          },
          onError(context) {
            setError(context.error.message);
            toaster.create({
              description: context.error.message,
              type: "error",
            });
          },
        },
      );
    });
  };

  return (
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} gap="1.5rem">
      {error && <Alert status="error" title={error} />}
      <Fieldset.Root size="lg" maxW="md">
        <Fieldset.Content>
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

export default LoginForm;
