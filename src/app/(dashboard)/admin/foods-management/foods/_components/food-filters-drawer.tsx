"use client";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import {
  foodFiltersDefaultValues,
  foodFiltersSchema,
  FoodFiltersSchema,
} from "../_types/foodFilterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFoodsStore } from "../_libs/use-food-store";
import { useEffect, useMemo } from "react";
import equal from "fast-deep-equal";
import { useDebounce } from "@/lib/useDebounce";
import { useCategories } from "../../categories/_services/use-category-queries";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ControlledInput } from "@/components/ui/controlled/controlled-input";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { ControlledSelect } from "@/components/ui/controlled/controlled-select";
import { ControlledSlider } from "@/components/ui/controlled/controlled-slider";


const FoodFiltersDrawer = () => {
  const form = useForm<FoodFiltersSchema>({
    defaultValues: foodFiltersDefaultValues,
    resolver: zodResolver(foodFiltersSchema),
  });


  const {
    updateFoodFilters,
    foodFiltersDrawerOpen,
    updateFoodFiltersDrawerOpen,
    updateFoodFiltersSearchTerm,
    foodFilters,
  } = useFoodsStore();

  const areFiltersModified = useMemo(
    () => !equal(foodFilters, foodFiltersDefaultValues),
    [foodFilters],
  );

  const searchTerm = useWatch({ control: form.control, name: "searchTerm" });

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  useEffect(() => {
    updateFoodFiltersSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, updateFoodFiltersSearchTerm]);

  const categoriesQuery = useCategories();

  useEffect(() => {
    if (!foodFiltersDrawerOpen) {
      form.reset(foodFilters);
    }
  }, [foodFilters, foodFiltersDrawerOpen, form]);

  const onSubmit: SubmitHandler<FoodFiltersSchema> = (data) => {
    updateFoodFilters(data);
    updateFoodFiltersDrawerOpen(false);
  };

  return (
    <Drawer
      open={foodFiltersDrawerOpen}
      onOpenChange={updateFoodFiltersDrawerOpen}
      direction="left"
      handleOnly
    >
      <FormProvider {...form}>
        <div className="flex gap-2">
          <ControlledInput<FoodFiltersSchema>
            suppressHydrationWarning
            containerClassName="max-w-48"
            name="searchTerm"
            placeholder="جستجو سریع"
          />
          <DrawerTrigger asChild>
            <Button variant="outline" badge={areFiltersModified}>
              <FilterIcon />
              فیلتر
            </Button>
          </DrawerTrigger>
        </div>
        <form>
          <DrawerContent>
            <DrawerHeader className="text-right">
              <DrawerTitle className="text-right">فیلترها</DrawerTitle>
              <DrawerDescription className="text-right">
                معیارهای جستجوی غذا را سفارشی کنید
              </DrawerDescription>
            </DrawerHeader>

            <div className="space-y-2 p-4">
              <div className="flex flex-wrap gap-2">
                <ControlledSelect<FoodFiltersSchema>
                  label="دسته‌بندی"
                  name="categoryId"
                  clearable
                  options={categoriesQuery.data?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                />

                <ControlledSelect<FoodFiltersSchema>
                  label="مرتب‌سازی بر اساس"
                  name="sortBy"
                  options={[
                    { label: "نام", value: "name" },
                    { label: "کالری", value: "calories" },
                    { label: "کربوهیدرات", value: "carbohydrates" },
                    { label: "چربی", value: "fat" },
                    { label: "پروتئین", value: "protein" },
                  ]}
                />

                <ControlledSelect<FoodFiltersSchema>
                  label="ترتیب مرتب‌ سازی"
                  name="sortOrder"
                  options={[
                    { label: "صعودی", value: "asc" },
                    { label: "نزولی", value: "desc" },
                  ]}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <ControlledSlider<FoodFiltersSchema>
                  name="caloriesRange"
                  label="کالری"
                  min={0}
                  max={9999}
                />
                <ControlledSlider<FoodFiltersSchema>
                  name="proteinRange"
                  label="پروتئین"
                  min={0}
                  max={9999}
                />
              </div>
            </div>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">انصراف</Button>
              </DrawerClose>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset(foodFiltersDefaultValues)}
              >
                تنظیم مجدد
              </Button>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                اعمال فیلترها
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </FormProvider>
    </Drawer>
  );
};
export { FoodFiltersDrawer };
