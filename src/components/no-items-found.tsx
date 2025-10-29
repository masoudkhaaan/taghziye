"use client";

import { CircleOff } from "lucide-react";
import { Button } from "./ui/button";

type noItemsFoundProps = {
  OnClick: () => void;
};

const NoItemsFound = ({ OnClick }: noItemsFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <CircleOff className="text-primary mb-2" />
      <h3 className="text-lg font-medium">آیتمی یافت نشد</h3>
      <p className="text-foreground/60 mt-1 text-shadow-sm">
        سعی کنید آیتم جدید اضافه کنید
        <div>      <Button variant="outline" className="mt-4" onClick={OnClick}>
          اضافه کردن آیتم جدید
        </Button></div>
  
      </p>
    </div>
  );
};
export { NoItemsFound };
