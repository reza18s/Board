import { UserRoundPlus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Hint } from "./hint";

export const InviteButton = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className="size-[40px] p-0">
        <Hint
          label={"invite user"}
          side="bottom"
          alignOffset={30}
          align="center"
        >
          <UserRoundPlus></UserRoundPlus>
        </Hint>
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-[880px] border-none bg-transparent p-0">
      <OrganizationProfile />
    </DialogContent>
  </Dialog>
);
