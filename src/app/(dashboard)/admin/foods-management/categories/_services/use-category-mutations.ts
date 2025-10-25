import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "./categoryMutations";
import { toast } from "sonner";
import { CategorySchema } from "../_types/categorySchema";
import { createCategory, updateCategory } from "./categoryQueries";

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CategorySchema) => {
      await createCategory(data);
    },
    onSuccess: () => {
      toast.success("دسته بندی با موفقیت ایجاد شد.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CategorySchema) => {
      await updateCategory(data);
    },
    onSuccess: () => {
      toast.success("دسته بندی با موفقیت به روز شد.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};


const useDeleteCategory = () => {
    
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      deleteCategory(id);
    },
    onSuccess: () => {
      toast.success("گالری با موفقیت حذف شد");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};




export { useDeleteCategory,useUpdateCategory,useCreateCategory };
