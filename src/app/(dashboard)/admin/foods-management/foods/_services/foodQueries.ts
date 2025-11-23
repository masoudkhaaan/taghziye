'use server'
import {
  foodFiltersSchema,
  FoodFiltersSchema,
} from "../_types/foodFilterSchema";
import { Prisma } from "$/generated/prisma";
import { PaginatedResult } from "@/lib/types/paginatedResult";
import db from "@/lib/db";
import { FoodSchema } from "../_types/foodSchema";
import { toStringSafe } from "@/lib/utils";

type FoodWithServingUnits = Prisma.FoodGetPayload<{
  include: { foodServingUnits: true };
}>;

const getFoods = async (
  filters: FoodFiltersSchema,
): Promise<PaginatedResult<FoodWithServingUnits>> => {
  const validatedFilters = foodFiltersSchema.parse(filters);

  const {
    searchTerm,
    caloriesRange,
    categoryId,
    page,
    pageSize,
    proteinRange,
    sortBy = "name",
    sortOrder,
  } = validatedFilters;

  const where: Prisma.FoodWhereInput = {};

  if (searchTerm) {
    where.name = {
      contains: searchTerm,
    };
  }

  const [mincaloriesStr, maxcaloriesStr] = caloriesRange;

  const numericMincalories =
    mincaloriesStr === "" ? undefined : Number(mincaloriesStr);

  const numericMaxcalories =
    maxcaloriesStr === "" ? undefined : Number(maxcaloriesStr);

  if (numericMincalories !== undefined || numericMaxcalories !== undefined) {
    where.calories = {};
    if (numericMincalories !== undefined)
      where.calories.gte = numericMincalories;

    if (numericMaxcalories !== undefined)
      where.calories.lte = numericMaxcalories;
  }

  const [minProteinStr, maxProteinStr] = proteinRange;
  const numericMinProtein =
    minProteinStr === "" ? undefined : Number(minProteinStr);
  const numericMaxProtein =
    maxProteinStr === "" ? undefined : Number(maxProteinStr);

  if (numericMinProtein !== undefined || numericMaxProtein !== undefined) {
    where.protein = {};
    if (numericMinProtein !== undefined) where.protein.gte = numericMinProtein;
    if (numericMaxProtein !== undefined) where.protein.lte = numericMaxProtein;
  }

  const numericCategoryId = categoryId ? Number(categoryId) : undefined;

  if (numericCategoryId !== undefined && numericCategoryId !== 0) {
    where.category = {
      id: numericCategoryId,
    };
  }

  const skip = (page - 1) * pageSize;

  const [total, data] = await Promise.all([
    db.food.count({ where }),
    db.food.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: pageSize,
      include: {
        foodServingUnits: true,
      },
    }),
  ]);
  return {
    data,
    total,
    page,
    pageSize,
    totalPage: Math.ceil(total / pageSize),
  };
};

const getFood = async (id: number): Promise<FoodSchema | null> => {
  const res = await db.food.findFirst({
    where: { id },
    include: {
      foodServingUnits: true,
    },
  });
  if (!res) return null;

  return {
    action: "update" as const,
    id,
    name: res.name,
    calories: toStringSafe(res.calories),
    carbohydrates: toStringSafe(res.carbohydrates),
    fat: toStringSafe(res.fat),
    fiber: toStringSafe(res.fiber),
    protein: toStringSafe(res.protein),
    sugar: toStringSafe(res.sugar),
    categoryId: toStringSafe(res.categoryId),
    foodServingUnits: res.foodServingUnits.map((item) => ({
      foodServingUnitId: toStringSafe(item.servingUnitId),
      grams: toStringSafe(item.grams),
    })),
  };
};

export { getFood, getFoods };
