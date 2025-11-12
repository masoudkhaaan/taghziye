"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  foodDefaultValues,
  foodSchema,
  FoodSchema,
} from "../_types/foodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFood } from "../_services/use-food-queries";
import { useCategories } from "../../categories/_services/use-category-queries";
import { useCreateFood, useUpdateFood } from "../_services/use-food-mutations";
import { useFoodsStore } from "../_libs/use-food-store";
import { useCategoriesStore } from "../../categories/_libs/use-category-store";
import { useServingUnitsStore } from "../../serving-units/_libs/useServingUnitsStore";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ControlledInput } from "@/components/ui/controlled/controlled-input";
import { ControlledSelect } from "@/components/ui/controlled/controlled-select";
import { CategoryFormDialog } from "../../categories/_components/category-form-dialog";

const FoodFormDialog = () => {
  const form = useForm<FoodSchema>({
    defaultValues: foodDefaultValues,
    resolver: zodResolver(foodSchema),
  });

  const foodQuery = useFood();
  const categoriesQuery = useCategories();

  const createFoodMutation = useCreateFood();
  const updateFoodMutation = useUpdateFood();

  const isPending =
    createFoodMutation.isPending || updateFoodMutation.isPending;

  const {
    selectedFoodId,
    updateSelectedFoodId,
    foodDialogOpen,
    updateFoodDialogOpen,
  } = useFoodsStore();

  const { categoryDialogOpen } = useCategoriesStore();
  const { servingUnitDialogOpen } = useServingUnitsStore();

  useEffect(() => {
    if (!!selectedFoodId && foodQuery.data) {
      form.reset(foodQuery.data);
    }
  }, [foodQuery.data, form, selectedFoodId]);

  const handleDialogOpenChange = (open: boolean) => {
    updateFoodDialogOpen(open);

    if (!open) {
      updateSelectedFoodId(null);
      form.reset(foodDefaultValues);
    }
  };

  const handleSuccess = () => {
    handleDialogOpenChange(false);
  };

  const disabledSubmit = servingUnitDialogOpen || categoryDialogOpen;

  const OnSubmit: SubmitHandler<FoodSchema> = (data) => {
    if (data.action === "create") {
      createFoodMutation.mutate(data, {
        onSuccess: handleSuccess,
      });
    } else {
      updateFoodMutation.mutate(data, { onSuccess: handleSuccess });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          غذای جدید
          <Plus className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {selectedFoodId ? "تغییر غذا" : "ایجاد غذای جدید"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={disabledSubmit ? undefined : form.handleSubmit(OnSubmit)}
          className="space-y-6"
        >
          <FormProvider {...form}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <ControlledInput<FoodSchema>
                  name="name"
                  label="نام"
                  placeholder="نام غذا را وارد کنید"
                />
              </div>
              <div className="col-span-1 flex items-end">
                <ControlledSelect<FoodSchema>
                  label="دسته بندی"
                  name="categoryId"
                  options={categoriesQuery.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                />
                <CategoryFormDialog smallTrigger />
              </div>
              <div>
                <ControlledInput<FoodSchema>
                  name="calories"
                  label="کالری"
                  type="number"
                  placeholder="کیلوکالری"
                />
              </div>
              <div>
                <ControlledInput<FoodSchema>
                  name="protein"
                  label="پروتئین"
                  type="number"
                  placeholder="گرم"
                />
              </div>
              <div>
                <ControlledInput<FoodSchema>
                  name="carbohydrates"
                  label="کربوهیدرات‌ها"
                  type="number"
                  placeholder="گرم"
                />
              </div>
              <div>
                <ControlledInput<FoodSchema>
                  name="fat"
                  label="چربی"
                  type="number"
                  placeholder="گرم"
                />
              </div>
              <div>
                <ControlledInput<FoodSchema>
                  name="fiber"
                  label="فیبر"
                  type="number"
                  placeholder="گرم"
                />
              </div>
              <div>
                <ControlledInput<FoodSchema>
                  name="sugar"
                  label="قند"
                  type="number"
                  placeholder="گرم"
                />
              </div>
              {/*serving unites */}
            </div>
          </FormProvider>
          <DialogFooter>
            <Button type="submit" isLoading={isPending}> {!!selectedFoodId ? "تغییر" : "ایجاد"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
