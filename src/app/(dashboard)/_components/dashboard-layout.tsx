"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import * as Collapsible from "@radix-ui/react-collapsible";
import {
  Apple,
  Boxes,
  ChevronDown,
  ChevronRight,
  Menu,
  Ruler,
  Utensils,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

type RouteGroupType = {
  group: string;
  items: {
    href: string;
    label: string;
    icon: ReactNode;
  }[];
};

const ROUTE_GROUPS: RouteGroupType[] = [
  {
    group: "مدیریت غذاها",
    items: [
      {
        href: "/admin/foods-management/foods",
        label: "غذاها",
        icon: <Apple className="mr-2 size-3" />,
      },
      {
        href: "/admin/foods-management/categories",
        label: "دسته بندی ها",
        icon: <Boxes className="mr-2 size-3" />,
      },
      {
        href: "/admin/foods-management/serving-units",
        label: "واحد های اندازه گیری",
        icon: <Ruler className="mr-2 size-3" />,
      },
    ],
  },
  {
    group: "مدیریت مشتریان",
    items: [
      {
        href: "/client",
        label: "مشتریان",
        icon: <Utensils className="mr-2 size-3" />,
      },
    ],
  },
];

type RouteGroupProps = RouteGroupType;

const RouteGroup = ({ group, items }: RouteGroupProps) => {
  const [open, setopen] = useState(false);
  const pathname = usePathname();
  return (
    <Collapsible.Root open={open} onOpenChange={setopen}>
      <Collapsible.Trigger asChild>
        <Button
          className="text-foreground/80 flex w-full justify-between font-normal"
          variant="ghost"
        >
            <span className="font-bold">   {group}</span>
       
          <motion.div animate={{ rotate: open ? 180 : 0 }}>
            <ChevronDown />
          </motion.div>
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content forceMount>
        <motion.div
          className={`flex flex-col gap-2 ${!open ? "pointer-events-none" : ""}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {items.map((item) => (
            <Button
              className="w-full justify-start font-normal"
              key={item.href}
              variant="link"
              asChild
            >
               <Link
                href={item.href}
                className={`flex items-center  rounded-md px-5 py-1 transition-all ${
                  pathname === item.href
                    ? "bg-foreground/10 hover:bg-foreground/5"
                    : "hover:bg-foreground/10"
                }`}
              >
                <span className="text-green-700"> {item.icon}</span>
                <span className="text-sm text-green-500">{item.label}</span>
              </Link>
            </Button>
          ))}
        </motion.div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

type DashboardLayoutProps = { children: ReactNode };

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [open, setopen] = useState(false);
  return (
    <div className="bg-background fixed z-10 flex h-10 w-screen items-center justify-between border px-2">
      <Collapsible.Root className="h-full "  open={open} onOpenChange={setopen}>
        <Collapsible.Trigger className="m-2" asChild>
          <Button size="icon" variant="outline">
            <Menu />
          </Button>
        </Collapsible.Trigger>
      </Collapsible.Root>

      <Collapsible.Root
        className="fixed top-0 right-0 z-20 h-dvh"
        open={open}
        onOpenChange={setopen}
      >
        <Collapsible.Content forceMount>
          <div
            className={`bg-background fixed top-0 right-0 h-screen w-64 border p-4 transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold">ادمین دشبورد</h1>
              <Collapsible.Trigger asChild>
                <Button size="icon" variant="outline">
                  <ChevronRight />
                </Button>
              </Collapsible.Trigger>
            </div>
            <Separator className="my-2" />
            <div className="mt-4">
              {ROUTE_GROUPS.map((routeGroup) => (
                <RouteGroup {...routeGroup} key={routeGroup.group} />
              ))}
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
      <main
        className={`transition-margin mt-13 flex-1 p-4 duration-300 ${open ? "mr-64" : "mr-0"} `}
      >
        {children}
      </main>
    </div>
  );
};

export { DashboardLayout };
