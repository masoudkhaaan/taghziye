import { auth } from "@/lib/auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Role } from "$/generated/prisma";

type LayoutProps = { children: ReactNode };

const Layout = async ({ children }: LayoutProps) => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  if (session.user.role === Role.USER) redirect("/client");
  return <div className="mx-auto max-w-7xl px-6">{children}</div>;
};

export default Layout;
