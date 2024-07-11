import { List } from "./list";
import { NewButton } from "./new-button";

export const Sidebar = () => (
  <div className="fixed left-0 z-[1] h-full  w-[60px] flex-col gap-y-4 bg-amber p-3 text-white xl:flex">
    <List />
    <NewButton />
  </div>
);
