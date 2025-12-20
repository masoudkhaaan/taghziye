import {
  createMeal,
  deleteMeal,
  updateMeal,
} from "@/app/(dashboard)/client/_services/meal-mutations";
import { MealSchema } from "@/app/(dashboard)/client/_types/mealSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MealSchema) => {
      await createMeal(data);
    },
    onSuccess: () => {
      toast.success("وعده غذایی با موفقیت ایجاد شد.");
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
  });
};

const useUpdateMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MealSchema) => {
      await updateMeal(data);
    },
    onSuccess: () => {
      toast.success("وعده غذایی با موفقیت بروزرسانی شد.");
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
  });
};

const useDeleteMeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deleteMeal(id);
    },
    onSuccess: () => {
      toast.success("وعده غذایی با موفقیت حذف شد.");
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    },
  });
};

export { useCreateMeal, useDeleteMeal, useUpdateMeal };