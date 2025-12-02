import { passwordSchema, requiredStringSchema } from "@/lib/zodSchemas";
import { z } from "zod";

const signUpSchema = z
  .object({
    name: requiredStringSchema,
    email: z.string().email("ایمیل معتبر نیست"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند",
    path: ["confirmPassword"],
  });

type SignUpSchema = z.infer<typeof signUpSchema>;

const signUpDefaultValues: SignUpSchema = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export { signUpDefaultValues, signUpSchema, type SignUpSchema };
