"use client";
import { ModeToggle } from "@/components/global/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <ModeToggle></ModeToggle>
      <UserButton></UserButton>
      <h1>Home</h1>
    </div>
  );
}
