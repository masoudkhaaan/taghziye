import { z } from "zod";

const signInSchema = z.object({
  email: z
    .string({
      required_error: "ایمیل الزامی است.",
    })
    .email("ایمیل وارد شده معتبر نیست.")
    .trim(),

  password: z
    .string({
      required_error: "رمز عبور الزامی است.",
    })
    .min(1, "رمز عبور نمی‌تواند خالی باشد.")
    .trim(),
});


type SignInSchema = z.infer<typeof signInSchema>;

const signInDefaultValues: SignInSchema = {
  email: "",
  password: "",
};

export { signInDefaultValues, signInSchema, type SignInSchema };
