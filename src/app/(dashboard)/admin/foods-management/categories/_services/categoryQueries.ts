"use server";

import db from "@/lib/db";
import { CategorySchema } from "../_types/categorySchema";
import { executeAction } from "@/lib/executeAction";

const getCategories = async () => {
  return await db.category.findMany();
};

const createCategory = async (data: CategorySchema) => {
  await executeAction({
    actionFn: () =>
      db.category.create({
        data: {
          name: data.name,
        },
      }),
  });
};

const updateCategory = async (data: CategorySchema) => {
  if (data.action === "update") {
    await executeAction({
      actionFn: () =>
        db.category.update({
          where: { id: data.id },
          data: {
            name: data.name,
          },
        }),
    });
  }
};

export { getCategories, createCategory, updateCategory };
