import { useGlobalStore } from "@/lib/use-global-store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "./alert-dialog";
import { AlertDescription, AlertTitle } from "./alert";

const AlertDialogProvider = () => {
  const { alertConfig, alertOpen, updateAlertOpen } = useGlobalStore();

  if (!alertConfig) return null;

  const handleConfirm = () => {
    if (alertConfig?.onConfirm) {
      alertConfig.onConfirm();
    }
    updateAlertOpen(false);
  };

  const handleCancel = () => {
    if (alertConfig?.onCancel) {
      alertConfig.onCancel();
    }
    updateAlertOpen(false);
  };

  return (
    <div className="text-right">
      <AlertDialog open={alertOpen} onOpenChange={updateAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertTitle>{alertConfig.title || "تایید الزامی"}</AlertTitle>
            <AlertDescription>
              {alertConfig.description || "آیا شما از این اقدام مطمئن هستید؟"}
            </AlertDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>
              {alertConfig.cancelLabel || "انصراف"}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              {alertConfig.confirmLabel || "ادامه"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export { AlertDialogProvider };
