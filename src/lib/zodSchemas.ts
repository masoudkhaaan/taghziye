import z from "zod";
import { patterns } from "./constants";

const regexSchema = (pattern: RegExp) => z.coerce.string().regex(pattern);

const requiredStringSchema = z.string().max(255).min(1).trim();

const passwordSchema = z
  .string()
  .max(255)
  .refine(
    (str) => patterns.minimumOneUpperCaseLetter.test(str),
    "حداقل یک حرف بزرگ لازم است.",
  )
  .refine(
    (str) => patterns.minimumOneLowerCaseLetter.test(str),
    "حداقل یک حرف کوچک لازم است.",
  )
  .refine((str) => patterns.minimumOneDigit.test(str), "حداقل یک عدد لازم است.")
  .refine(
    (str) => patterns.minimumOneSpecialCharacter.test(str),
    "حداقل یک کاراکتر خاص لازم است.",
  );

export { requiredStringSchema, regexSchema, passwordSchema };
