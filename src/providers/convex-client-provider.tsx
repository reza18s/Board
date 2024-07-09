import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => (
  <ClerkProvider
    appearance={{
      variables: { colorPrimary: "#ffbf42" },
      layout: { logoPlacement: "none" },
    }}
  >
    {children}
  </ClerkProvider>
);
