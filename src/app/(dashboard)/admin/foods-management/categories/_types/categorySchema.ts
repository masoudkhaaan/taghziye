import z from "zod";

//zod => 4
// const categorySchema = z.discriminatedUnion("action", [
//   z.object({
//     action: z.literal("create"),
//     title: z.string().min(1).max(255),
//   }),
//   z.object({
//     action: z.literal("update"),
//     id: z.number().min(1),
//     title: z.string().min(1).max(255),
//   }),
// ]);

//---------------//

//zod => 3

const categorySchema = z.intersection(
  z.object({
    title: z.string().min(1).max(255),
  }),
  z.discriminatedUnion("action", [
    z.object({ action: z.literal("create") }),
    z.object({ action: z.literal("update"), id: z.number().min(1) }),
  ]),
);


type CategorySchema = z.infer<typeof categorySchema>;

const categoryDefaultValue: CategorySchema = {
  action: "create",
  title: "",
};

export {type CategorySchema,categoryDefaultValue,categorySchema}