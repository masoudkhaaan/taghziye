import {
  createServingUnit,
  deleteServingUnit,
  updateServingUnit,
} from "@/app/(dashboard)/admin/foods-management/serving-units/_services/services";
import { ServingUnitSchema } from "@/app/(dashboard)/admin/foods-management/serving-units/_types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateServingUnit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ServingUnitSchema) => {
      await createServingUnit(data);
    },
    onSuccess: () => {
      toast.success("واحد مصرف با موفقیت ایجاد شد");
      queryClient.invalidateQueries({ queryKey: ["servingUnits"] });
    },
  });
};

const useUpdateServingUnit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ServingUnitSchema) => {
      await updateServingUnit(data);
    },
    onSuccess: () => {
      toast.success("واحد مصرف با موفقیت به روز شد.");
      queryClient.invalidateQueries({ queryKey: ["servingUnits"] });
    },
  });
};

const useDeleteServingUnit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await deleteServingUnit(id);
    },
    onSuccess: () => {
      toast.success("واحد مصرف با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["servingUnits"] });
    },
  });
};

export { useCreateServingUnit, useDeleteServingUnit, useUpdateServingUnit };
