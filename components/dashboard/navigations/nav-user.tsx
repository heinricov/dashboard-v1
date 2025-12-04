import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, LogOut, Rocket, Settings2, User } from "lucide-react";

export function NavUser() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3">
        <Avatar className="size-7 md:size-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            M
          </AvatarFallback>
        </Avatar>
        <div className="text-start flex-col hidden md:flex">
          <p className="text-sm font-medium">My Workspace</p>
          <p className="text-xs text-muted-foreground">myworkspace.slack.com</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 w-72">
        <DropdownMenuItem className="flex items-start md:hidden">
          <Avatar className="size-7 md:size-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              M
            </AvatarFallback>
          </Avatar>
          <div className="text-start flex flex-col">
            <p className="text-sm font-medium">My Workspace</p>
            <p className="text-xs text-muted-foreground">
              myworkspace.slack.com
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className=" md:hidden" />
        <DropdownMenuItem className="flex-col items-start">
          <div className="flex items-center gap-1">
            <Rocket className="mr-1 h-[18px] w-[18px]" />
            <span className="font-medium leading-none">
              Your Role is{" "}
              <span className="font-bold text-blue-500">Admin</span>
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-1" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings2 className="mr-1" /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell className="mr-1" /> Notification
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-1" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
