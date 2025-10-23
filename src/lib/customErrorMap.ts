import { z } from "zod";

////zod 3

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      if (issue.received === "undefined" || issue.received === "null") {
        return { message: "وارد کردن این فیلد الزامی است." };
      }
      if (issue.expected === "string") {
        return { message: "لطفاً متن وارد کنید." };
      }
      if (issue.expected === "number") {
        return { message: "لطفاً عدد وارد کنید." };
      }
      return { message: "نوع داده نامعتبر است." };

    case z.ZodIssueCode.too_small:
      if (issue.type === "string") {
        return { message: `حداقل ${issue.minimum} کاراکتر وارد کنید.` };
      }
      if (issue.type === "number") {
        return {
          message: `عدد باید بزرگ‌تر یا مساوی ${issue.minimum} باشد.`,
        };
      }
      return { message: "مقدار وارد شده خیلی کم است." };

    case z.ZodIssueCode.too_big:
      if (issue.type === "string") {
        return { message: `حداکثر ${issue.maximum} کاراکتر مجاز است.` };
      }
      if (issue.type === "number") {
        return {
          message: `عدد باید کوچک‌تر یا مساوی ${issue.maximum} باشد.`,
        };
      }
      return { message: "مقدار وارد شده خیلی زیاد است." };

    case z.ZodIssueCode.invalid_string:
      if (issue.validation === "email") {
        return { message: "لطفاً ایمیل معتبر وارد کنید." };
      }
      if (issue.validation === "url") {
        return { message: "لطفاً آدرس اینترنتی معتبر وارد کنید." };
      }
      return { message: "فرمت متن معتبر نیست." };

    case z.ZodIssueCode.invalid_date:
      return { message: "لطفاً تاریخ معتبر وارد کنید." };

    case z.ZodIssueCode.custom:
      return { message: issue.message || "مقدار وارد شده نامعتبر است." };

    default:
      return { message: ctx.defaultError };
  }
};

export { customErrorMap };
