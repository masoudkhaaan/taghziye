"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "./ui/sonner";
import { AlertDialogProvider } from "./ui/alert-dialog-provider";

const queryClient = new QueryClient();

type ProvidersType = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersType) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        <AlertDialogProvider />
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  );
};

export { Providers };
