"use client";
import { Authenticated } from "convex/react";
import React from "react";

export default function AuthenticatedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Authenticated>{children}</Authenticated>;
}
