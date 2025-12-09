"use client";
import {
  signUpDefaultValues,
  signUpSchema,
  SignUpSchema,
} from "@/app/(auth)/sign-up/_types/signUpSchema";
import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/ui/controlled/controlled-input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useSignUp } from "../_services/use-sign-up-mutations";

const SignUpForm = () => {
  const form = useForm<SignUpSchema>({
    defaultValues: signUpDefaultValues,
    resolver: zodResolver(signUpSchema),
  });

  const signUpMutation = useSignUp();

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    signUpMutation.mutate(data);
  };

  return (
    <FormProvider {...form}>
      <form
        className="w-full max-w-96 space-y-5 rounded-md border px-10 py-12"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="text-center">
          <h2 className="mb-1 text-2xl font-semibold">ایجاد حساب کاربری</h2>
          <p className="text-muted-foreground text-sm">
            برای شروع، ثبت‌نام کنید
          </p>
        </div>

        <div className="space-y-3">
          <ControlledInput<SignUpSchema>
            suppressHydrationWarning
            name="name"
            label="نام و نام خانوادگی"
          />
          <ControlledInput<SignUpSchema> name="email" label="ایمیل" />
          <ControlledInput<SignUpSchema>
            name="password"
            label="رمز عبور"
            type="password"
          />
          <ControlledInput<SignUpSchema>
            name="confirmPassword"
            label="تکرار رمز عبور"
            type="password"
          />
        </div>

        <Button className="w-full" isLoading={signUpMutation.isPending}>
          ثبت‌نام
        </Button>

        <div className="text-center text-sm">
          قبلاً حساب دارید؟{" "}
          <Link
            href="/sign-in"
            className="text-primary font-medium hover:underline"
          >
            ورود
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export { SignUpForm };
