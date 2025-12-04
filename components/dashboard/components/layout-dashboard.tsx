"use client";
import {
  AppSidebar,
  NavHeader,
  NavSide,
} from "@/components/dashboard/navigations/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { data } from "./side.config";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar>
        {/* <NavSide variant="menu" data={data.main} label="Menu" /> */}
        <NavSide variant="compact" data={data.sideMenu} label="Side Menu" />
        <NavSide variant="collaps" data={data.menus} label="Text Rich" />
      </AppSidebar>
      <SidebarInset>
        <NavHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
