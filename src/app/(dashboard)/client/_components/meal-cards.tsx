"use client";
import { MealCardsSkeleton } from "@/app/(dashboard)/client/_components/meal-cards-skeleton";
import { useMealsStore } from "@/app/(dashboard)/client/_libs/use-meal-store";
import { useDeleteMeal } from "@/app/(dashboard)/client/_services/use-meal-mutations";
import { useMeals } from "@/app/(dashboard)/client/_services/use-meal-queries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { alert } from "@/lib/use-global-store";

import { format } from "date-fns";
import {
  CalendarX,
  Edit,
  Flame,
  LineChart,
  PieChart,
  Trash,
  Utensils,
} from "lucide-react";

const MealCards = () => {
  const { updateSelectedMealId, updateMealDialogOpen, mealFilters } =
    useMealsStore();

  const mealsQuery = useMeals();
  const deleteMealMutation = useDeleteMeal();

  const nutritionTotals =
    mealsQuery.data?.reduce(
      (totals, meal) => {
        meal.mealFoods.forEach((mealFood) => {
          const multiplier = mealFood.amount || 1;
          totals.calories += (mealFood.food.calories || 0) * multiplier;
          totals.protein += (mealFood.food.protein || 0) * multiplier;
          totals.carbs += (mealFood.food.carbohydrates || 0) * multiplier;
          totals.fat += (mealFood.food.fat || 0) * multiplier;
          totals.sugar += (mealFood.food.sugar || 0) * multiplier;
          totals.fiber += (mealFood.food.fiber || 0) * multiplier;
        });
        return totals;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0 },
    ) || { calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, fiber: 0 };

  const displayDate = mealFilters.dateTime
    ? format(new Date(mealFilters.dateTime), "EEEE, MMMM d, yyyy")
    : "امروز";

  if (mealsQuery.isLoading) {
    return <MealCardsSkeleton />;
  }

  if (mealsQuery.data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CalendarX className="text-primary mb-2" />
        <h3 className="text-lg font-medium">وعده‌ای یافت نشد</h3>
        <p className="text-foreground/60 mt-1 text-sm">
          فیلترها را تغییر دهید یا یک وعده جدید اضافه کنید
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => {
            updateMealDialogOpen(true);
          }}
        >
          افزودن وعده جدید
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">{displayDate}</h2>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* کارت کالری کل */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm font-medium">
                <Flame className="text-primary mr-2 h-4 w-4" />
                مجموع کالری
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {nutritionTotals.calories} کیلوکالری
              </div>
            </CardContent>
          </Card>

          {/* کارت درشت‌مغذی‌ها */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm font-medium">
                <PieChart className="text-primary mr-2 h-4 w-4" />
                درشت‌مغذی‌ها
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-muted-foreground text-xs">پروتئین</p>
                  <p className="font-medium">{nutritionTotals.protein} {"  "}  گرم</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">کربوهیدرات</p>
                  <p className="font-medium">{nutritionTotals.carbs} {"  "}  گرم</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">چربی</p>
                  <p className="font-medium">{nutritionTotals.fat} {"  "}  گرم</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* خلاصه وعده‌ها */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm font-medium">
                <Utensils className="text-primary mr-2 h-4 w-4" />
                خلاصه وعده‌ها
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm">تعداد وعده‌ها</span>
                  <span className="font-medium">
                    {mealsQuery.data?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">تعداد اقلام غذایی</span>
                  <span className="font-medium">
                    {mealsQuery.data?.reduce(
                      (total, meal) => total + meal.mealFoods.length,
                      0,
                    ) || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">آخرین وعده</span>
                  <span className="font-medium">
                    {mealsQuery.data?.length
                      ? format(
                          new Date(mealsQuery.data[0].dateTime),
                          "HH:mm",
                        )
                      : "—"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ریزمغذی‌های تکمیلی */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm font-medium">
                <LineChart className="text-primary mr-2 h-4 w-4" />
                مواد مغذی دیگر
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <p className="text-muted-foreground text-xs">فیبر</p>
                  <p className="font-medium">{nutritionTotals.fiber} {"  "}  گرم</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">قند</p>
                  <p className="font-medium">{nutritionTotals.sugar}  {"  "}  گرم</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* لیست کارت‌های وعده */}
      <div>
        <h3 className="mb-4 text-lg font-medium">وعده‌ها</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mealsQuery.data?.map((meal) => {
            const totalCalories = meal.mealFoods.reduce((total, mealFood) => {
              const foodCalories =
                (mealFood?.food?.calories ?? 0) * mealFood.amount || 0;
              return total + foodCalories;
            }, 0);

            return (
              <div
                key={meal.id}
                className="border-border/40 hover:border-border/80 flex flex-col gap-3 rounded-lg border p-6 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">
                      {format(new Date(meal.dateTime), "PPp")}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {totalCalories} کیلوکالری
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      className="size-8"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        updateSelectedMealId(meal.id);
                        updateMealDialogOpen(true);
                      }}
                    >
                      <Edit className="size-4" />
                    </Button>
                    <Button
                      className="size-8"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        alert({
                          title: "حذف وعده",
                          description:
                            "آیا از حذف این وعده غذایی مطمئن هستید؟",
                          onConfirm: () =>
                            deleteMealMutation.mutate(meal.id),
                        });
                      }}
                    >
                      <Trash className="size-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Utensils className="text-primary size-4" />
                    <p className="text-foreground/70 text-sm font-medium">
                      {meal.mealFoods.length}{" "}
                      {meal.mealFoods.length === 1
                        ? "قلم"
                        : "قلم غذایی"}
                    </p>
                  </div>

                  {meal.mealFoods.length === 0 ? (
                    <p className="text-foreground/60 text-sm italic">
                      ماده غذایی اضافه نشده است
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {meal.mealFoods.map((mealFood) => (
                        <div
                          key={mealFood.id}
                          className="bg-muted/40 rounded-md p-5"
                        >
                          <div className="flex items-start justify-between">
                            <p className="font-medium">
                              {mealFood.food.name}
                            </p>
                            <Badge variant="secondary">
                              {(mealFood.food.calories ?? 0) *
                                (mealFood.amount || 1)}{" "}
                              کیلوکالری
                            </Badge>
                          </div>

                          <div className="text-foreground/70  mt-2 flex flex-col  justify-between text-sm">
                            <div>
                              <span>مقدار مصرف: </span>
                              <span className="font-medium">
                                {mealFood.amount > 0
                                  ? mealFood.amount
                                  : "نامشخص"}{" "}
                                {mealFood.servingUnit?.name || "واحد"}
                              </span>
                            </div>

                            <div className="space-x-2 text-xs flex mt-2">
                              <span>پ: {mealFood.food.protein}g</span>
                              <span>ک: {mealFood.food.carbohydrates}g</span>
                              <span>چ: {mealFood.food.fat}g</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { MealCards };
