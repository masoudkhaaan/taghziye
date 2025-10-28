import React from "react";
import { CategoryCards } from "./_components/category-cards";
import { CategoryFormDialog } from "./_components/category-form-dialog";

function Page() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold ">لیست دسته بندی ها</h1>
        <CategoryFormDialog />
      </div>
      <CategoryCards />
    </>
  );
}

export default Page;
