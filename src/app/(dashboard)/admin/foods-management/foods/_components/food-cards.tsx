"use client";
import { FoodCardsSkeleton } from "@/app/(dashboard)/admin/foods-management/foods/_components/food-cards-skeleton";
import { useFoodsStore } from "@/app/(dashboard)/admin/foods-management/foods/_libs/use-food-store";
import { useDeleteFood } from "@/app/(dashboard)/admin/foods-management/foods/_services/use-food-mutations";
import { useFoods } from "@/app/(dashboard)/admin/foods-management/foods/_services/use-food-queries";
import { NoItemsFound } from "@/components/no-items-found";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { alert } from "@/lib/use-global-store";
import { Edit, Trash } from "lucide-react";

const FoodCards = () => {
  const {
    updateSelectedFoodId,
    updateFoodDialogOpen,
    foodFilters,
    updateFoodFiltersPage,
  } = useFoodsStore();

  const foodsQuery = useFoods();
  const deleteFoodMutation = useDeleteFood();

  const totalPages = foodsQuery.data?.totalPage;

  if (totalPages === 0) {
    return <NoItemsFound OnClick={() => updateFoodDialogOpen(true)} />;
  }

  return (
    <div className="space-y-6">
      {/* کارت‌ها */}
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-4">
        {foodsQuery.isLoading ? (
          <FoodCardsSkeleton />
        ) : (
          <>
            {foodsQuery.data?.data.map((item) => (
              <div
                className="flex flex-col gap-3 rounded-lg border p-6"
                key={item.id}
              >
                {/* عنوان + دکمه‌ها */}
                <div className="flex justify-between">
                  <p className="truncate">{item.name}</p>

                  <div className="flex gap-1">
                    <Button
                      className="size-6"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        updateSelectedFoodId(item.id);
                        updateFoodDialogOpen(true);
                      }}
                    >
                      <Edit />
                    </Button>

                    <Button
                      className="size-6"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        alert({
                          onConfirm: () => deleteFoodMutation.mutate(item.id),
                        });
                      }}
                    >
                      <Trash />
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* مشخصات غذا */}
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="text-foreground/60 text-sm font-normal">
                      کالری
                    </p>
                    <p className="text-sm font-medium">{item.calories} کیلوکالری</p>
                  </div>

                  <div>
                    <p className="text-foreground/60 text-sm font-normal">
                      کربوهیدرات
                    </p>
                    <p className="text-sm font-medium">
                      {item.carbohydrates} گرم
                    </p>
                  </div>

                  <div>
                    <p className="text-foreground/60 text-sm font-normal">
                      پروتئین
                    </p>
                    <p className="text-sm font-medium">{item.protein} گرم</p>
                  </div>

                  <div>
                    <p className="text-foreground/60 text-sm font-normal">
                      چربی
                    </p>
                    <p className="text-sm font-medium">{item.fat} گرم</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* صفحه‌بندی */}
      <Pagination
        currentPage={foodFilters.page}
        totalPages={totalPages}
        updatePage={updateFoodFiltersPage}
      />
    </div>
  );
};

export { FoodCards };
