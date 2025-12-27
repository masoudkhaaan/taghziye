"use server";

import { executeAction } from "@/lib/executeAction";
import { signInSchema, SignInSchema } from "../_types/signInSchema";

import { signIn as authSignIn} from "@/lib/auth";

const signIn = async (data: SignInSchema) => {
  await executeAction({
    actionFn: async () => {
      const validatedData = signInSchema.parse(data);
      await authSignIn("credentials", validatedData);
    },
  });
};

export {signIn};