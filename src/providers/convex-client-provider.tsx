"use client";

import { useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, ConvexReactClient } from "convex/react";
import { Loading } from "@/components/loader/Loading";
import React from "react";
interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => (
  <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
    {children}
    <AuthLoading>
      <Loading />
    </AuthLoading>
  </ConvexProviderWithClerk>
);
