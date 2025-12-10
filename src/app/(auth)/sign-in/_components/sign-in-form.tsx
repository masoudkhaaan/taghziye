"use client";

import {
  signInDefaultValues,
  signInSchema,
  SignInSchema,
} from "@/app/(auth)/sign-in/_types/signInSchema";
import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/ui/controlled/controlled-input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useSignIn } from "../_services/use-sign-in-mutations";

const SignInForm = () => {
  const form = useForm<SignInSchema>({
    defaultValues: signInDefaultValues,
    resolver: zodResolver(signInSchema),
  });

  const signInMutation = useSignIn();

  const onSubmit: SubmitHandler<SignInSchema> = (data) => {
    signInMutation.mutate(data);
  };

  return (
    <FormProvider {...form}>
      <form
        className="w-full max-w-96 space-y-5 rounded-md border px-10 py-12"
        onSubmit={form.handleSubmit(onSubmit)}
        dir="rtl"
      >
        <div className="text-center">
          <h2 className="mb-1 text-2xl font-semibold">خوش آمدید</h2>
          <p className="text-muted-foreground text-sm">
            وارد حساب کاربری خود شوید
          </p>
        </div>

        <div className="space-y-3">
          <ControlledInput<SignInSchema>
            name="email"
            label="ایمیل"
            suppressHydrationWarning
          />
          <ControlledInput<SignInSchema>
            name="password"
            label="رمز عبور"
            type="password"
            suppressHydrationWarning
          />
        </div>

        <Button className="w-full" isLoading={signInMutation.isPending}>
          ورود
        </Button>

        <div className="text-center text-sm">
          حساب ندارید؟{" "}
          <Link
            href="/sign-up"
            className="text-primary font-medium hover:underline"
          >
            ثبت‌نام
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export { SignInForm };
