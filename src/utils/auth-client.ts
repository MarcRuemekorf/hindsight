import { createAuthClient } from "better-auth/react";
export const {
  signIn: logIn,
  signUp: register,
  signOut: logOut,
  useSession,
} = createAuthClient({
  baseURL: "http://localhost:3000",
});
