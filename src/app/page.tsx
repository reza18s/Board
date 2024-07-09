import { ModeToggle } from "@/components/global/mode-toggle";
import { useParams, useSearchParams } from "next/navigation";

export default function Home() {
  return (
    <div>
      <ModeToggle></ModeToggle>
      <h1>Home</h1>
    </div>
  );
}
