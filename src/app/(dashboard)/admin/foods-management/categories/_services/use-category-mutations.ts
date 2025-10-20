import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "./use-mutations";
import { toast } from "sonner";

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

export { useDeleteCategory };
