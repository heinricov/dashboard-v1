"use client";
import {
  AppSidebar,
  NavHeader,
  NavSide,
} from "@/components/dashboard/navigations/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { navigation, Switcher } from "@/side.config";
import { TeamSwitcher } from "../navigations/team-switcher";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar data={navigation}>
        {/* <TeamSwitcher data={Switcher} /> */}
      </AppSidebar>
      <SidebarInset>
        <NavHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
