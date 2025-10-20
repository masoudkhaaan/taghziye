"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "./ui/sonner";

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
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  );
};

export { Providers };
