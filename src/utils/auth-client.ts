import { createAuthClient } from "better-auth/react";
export const {
  signIn: logIn,
  signUp: register,
  useSession,
} = createAuthClient({
  baseURL: "http://localhost:3000",
});
