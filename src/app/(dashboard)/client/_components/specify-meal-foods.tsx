import { useFoods } from "@/app/(dashboard)/admin/foods-management/foods/_services/use-food-queries";
import { useServingUnits } from "@/app/(dashboard)/admin/foods-management/serving-units/_services/useQueries";
import { MealSchema } from "@/app/(dashboard)/client/_types/mealSchema";
import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/ui/controlled/controlled-input";
import { ControlledSelect } from "@/components/ui/controlled/controlled-select";
import { CirclePlus, Trash2, UtensilsCrossed } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

const SpecifyMealFoods = () => {
  const { control } = useFormContext<MealSchema>();
  const mealFoods = useFieldArray({ control, name: "mealFoods" });

  const foodsQuery = useFoods();
  const servingUnitsQuery = useServingUnits();

  return (
    <div className="flex flex-col gap-4 rounded-md border p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">مواد غذایی</h3>

        <Button
          size="sm"
          type="button"
          variant="outline"
          className="flex items-center gap-1"
          onClick={() => {
            mealFoods.append({
              foodId: "",
              servingUnitId: "",
              amount: "0",
            });
          }}
        >
          <CirclePlus className="size-4" />
          افزودن ماده غذایی
        </Button>
      </div>

      {mealFoods.fields.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center rounded-md border border-dashed py-6 text-center">
          <UtensilsCrossed className="mb-2 size-10 opacity-50" />
          <p>هنوز ماده غذایی به این وعده اضافه نشده است</p>
          <p className="text-sm">
            برای ثبت و پیگیری مصرف خود، مواد غذایی را به این وعده اضافه کنید
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {mealFoods.fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-3"
            >
              <div>
                <ControlledSelect<MealSchema>
                  label="ماده غذایی"
                  name={`mealFoods.${index}.foodId`}
                  options={foodsQuery.data?.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  placeholder="انتخاب ماده غذایی..."
                />
              </div>

              <div>
                <ControlledSelect<MealSchema>
                  label="واحد مصرف"
                  name={`mealFoods.${index}.servingUnitId`}
                  options={servingUnitsQuery.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  placeholder="انتخاب واحد..."
                />
              </div>

              <div>
                <ControlledInput<MealSchema>
                  name={`mealFoods.${index}.amount`}
                  label="مقدار"
                  type="number"
                  placeholder="۰"
                />
              </div>

              <Button
                size="icon"
                variant="outline"
                type="button"
                onClick={() => {
                  mealFoods.remove(index);
                }}
              >
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { SpecifyMealFoods };
