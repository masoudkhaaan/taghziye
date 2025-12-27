import { SignInSchema } from "@/app/(auth)/sign-in/_types/signInSchema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn } from "./sign-in-mutations";

import { signOut as nextAuthSignOut } from "next-auth/react";


const useSignIn = () => {
  return useMutation({
    mutationFn: async (data: SignInSchema) => {
      await signIn(data);
    },
  });
};

const useSignOut = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await nextAuthSignOut({ redirect: false });
    },
    onSuccess: () => {
      router.push("/sign-in");
    },
  });
};

export { useSignIn, useSignOut };
