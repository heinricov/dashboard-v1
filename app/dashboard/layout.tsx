import React from "react";
import LayoutDashboard from "@/components/dashboard/components/layout-dashboard";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutDashboard>{children}</LayoutDashboard>
    </>
  );
}
