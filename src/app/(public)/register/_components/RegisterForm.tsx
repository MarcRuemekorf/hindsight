"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Fieldset, Stack } from "@chakra-ui/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { register } from "@/utils/auth-client";
import TextInput from "@/components/form/TextInput";
import { Alert } from "@/components/ui/alert";
import { toaster } from "@/components/ui/toaster";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long.")
      .max(100, "Name must be less than 100 characters."),
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character.",
      ),
    passwordConfirmation: z
      .string()
      .min(1, "Password confirmation is required."),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match.",
    path: ["passwordConfirmation"],
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

    startTransition(async () => {
      await register.email(
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          onSuccess() {
            toaster.create({
              description: "Successfully created account",
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
