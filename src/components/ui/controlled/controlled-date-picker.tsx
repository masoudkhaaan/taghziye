"use client";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type ControlledDatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
};

const ControlledDatePicker = <T extends FieldValues>({
  name,
  label,
}: ControlledDatePickerProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="flex flex-row items-start gap-2">
          {label && <Label htmlFor={String(name)}>{label}</Label>}

          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !value && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? (
                  new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
                    day: "numeric",
                    year: "numeric",
                    month: "long", // نام ماه کامل
                  }).format(value)
                ) : (
                  <span>یک تاریخ انتخاب کنید</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="p-2 w-auto  ">
              <DatePicker
                value={value}
                onChange={(date) => {
                  if (!date || Array.isArray(date)) return;
                  onChange(date.toDate());
                }}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="none"
                className="my-rmdp"
                // نام کامل روزهای هفته (شروع از شنبه)
                weekDays={[
                  "شنبه",
                  "یک‌شنبه",
                  "دو‌شنبه",
                  "سه‌شنبه",
                  "چهار‌شنبه",
                  "پنج‌شنبه",
                  "جمعه",
                ]}
                // نام کامل ماه‌ها به فارسی (در صورت نیاز می‌توانید نگارش دلخواه خود را قرار دهید)
                months={[
                  "فروردین",
                  "اردیبهشت",
                  "خرداد",
                  "تیر",
                  "مرداد",
                  "شهریور",
                  "مهر",
                  "آبان",
                  "آذر",
                  "دی",
                  "بهمن",
                  "اسفند",
                ]}
                style={{
                  background: "transparent",
                  border: "none",

                }}
              />
            </PopoverContent>
          </Popover>

          {error && <p className="text-destructive text-sm">{error.message}</p>}
        </div>
      )}
    />
  );
};

export { ControlledDatePicker };
