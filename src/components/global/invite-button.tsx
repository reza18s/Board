import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const InviteButton = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className="h-[45px] lg:h-[40px]">
        <Plus className="xs:mr-2 h-4 w-4" />
        <span className="xs:inline-flex hidden">Invite members</span>
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-[880px] border-none bg-transparent p-0">
      <OrganizationProfile />
    </DialogContent>
  </Dialog>
);
