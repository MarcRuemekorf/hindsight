"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Field, Fieldset, Input, Stack } from "@chakra-ui/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { toaster } from "@/components/ui/toaster";
import { logIn } from "@/utils/auth-client";

const logInSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean(),
});

type LogInFormValues = z.infer<typeof logInSchema>;

const LoginForm = () => {
  const [loading, startTransition] = useTransition();

  const form = useForm<LogInFormValues>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LogInFormValues) => {
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
            // onSuccess?.();
          },
          onError(context) {
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
    <Card.Root>
      <Card.Header>
        <Card.Title>Login</Card.Title>
        <Card.Description>
          Fill in the form below to log in to your account
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Fieldset.Root size="lg" maxW="md">
          <Fieldset.Content>
            <Field.Root>
              <Field.Label>Email address</Field.Label>
              <Input name="email" type="email" />
            </Field.Root>
            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input name="password" type="password" />
            </Field.Root>
          </Fieldset.Content>
        </Fieldset.Root>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="solid">Log in</Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default LoginForm;
