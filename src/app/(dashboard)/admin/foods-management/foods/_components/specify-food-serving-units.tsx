import { useFieldArray, useFormContext } from "react-hook-form";
import { FoodSchema } from "../_types/foodSchema";
import { useServingUnits } from "../../serving-units/_services/useQueries";
import { Button } from "@/components/ui/button";
import { CirclePlus, Trash2, UtensilsCrossed } from "lucide-react";
import { ControlledSelect } from "@/components/ui/controlled/controlled-select";
import { ServingUnitFormDialog } from "../../serving-units/_components/serving-unit-form-dialog";
import { ControlledInput } from "@/components/ui/controlled/controlled-input";

const SpecifyFoodServingUnits = () => {
  const { control } = useFormContext<FoodSchema>();

  const foodServingUnits = useFieldArray({ control, name: "foodServingUnits" });

  const servingUnitsQuery = useServingUnits();

  return (
    <div className="flex flex-col gap-4 rounded-md border p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">واحد وعده غذایی</h3>
        <Button
          size="sm"
          type="button"
          variant="outline"
          className="flex items-center gap-1"
          onClick={() => {
            foodServingUnits.append({ foodServingUnitId: "", grams: "0" });
          }}
        >
          <CirclePlus className="size-4" /> اضافه کردن واحد وعده غذایی
        </Button>
      </div>
      {foodServingUnits.fields.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center rounded-md border border-dashed py-6 text-center">
          <UtensilsCrossed className="mb-2 size-10 opacity-50" />
          <p>هنوز واحدی برای این غذا اضافه نشده است</p>
          <p className="text-sm">
            واحدهای اندازه‌گیری را اضافه کنید تا کاربران بتوانند مقدار این غذا
            را دقیق‌تر بسنجند
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {foodServingUnits.fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-[1fr_1fr_auto] items-end gap-3"
            >
              <div className="col-span-1 flex items-end">
                <ControlledSelect<FoodSchema>
                  label="واحد وعده غذایی"
                  name={`foodServingUnits.${index}.foodServingUnitId`}
                  options={servingUnitsQuery.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  placeholder="انتخاب واحد   "
                />
                <ServingUnitFormDialog smallTrigger />
              </div>
              <div>
                <ControlledInput<FoodSchema>
                  name={`foodServingUnits.${index}.grams`}
                  label="واحد هر گرم"
                  type="number"
                  placeholder="0"
                />
              </div>
              <Button
                size="icon"
                variant="outline"
                type="button"
                onClick={() => {
                  foodServingUnits.remove(index);
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
export { SpecifyFoodServingUnits };
