"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import Logo from "./logo";
import { ThemeToggle } from "./theme-button";
import { NavUser } from "./nav-user";

// This is sample data.

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  data: any;
};

export function AppSidebar({ children, data, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        {children}
        <NavSide data={data} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export function NavSide({
  data,
  label,
  variant = "compact",
}: {
  data: any;
  label?: string;
  variant?: "collaps" | "menu" | "compact";
}) {
  // Khusus variant "compact", kita serahkan langsung objek navigasi
  // ke `NavCompact`, karena di sana kita akan membuat beberapa group
  // berdasarkan struktur di `side.config.ts`.
  if (variant === "compact") {
    return <NavCompact navigation={data} />;
  }

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>{label}</SidebarGroupLabel>
        {variant === "collaps" ? (
          <NavCollaps items={data} />
        ) : variant === "menu" ? (
          <NavMenu items={data} />
        ) : null}
      </SidebarGroup>
    </>
  );
}

export function NavMenu({
  items,
}: {
  items: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton asChild tooltip={item.name}>
            <a href={item.url}>
              <item.icon />
              <span>{item.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export function NavCollaps({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <Collapsible
          key={item.title}
          asChild
          defaultOpen={item.isActive}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton asChild>
                      <a href={subItem.url}>
                        <span>{subItem.title}</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarMenu>
  );
}

type CompactSimpleItem = {
  name: string;
  url: string;
  icon: LucideIcon;
};

type CompactCollapsibleItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: Array<{
    title?: string;
    name?: string;
    url: string;
  }>;
};

type CompactItem = CompactSimpleItem | CompactCollapsibleItem;

type CompactNavigation = {
  [key: string]: CompactItem[];
};

function formatGroupLabel(key: string) {
  // Contoh: "sideMenu" -> "Side Menu", "menus" -> "Menus"
  const withSpaces = key.replace(/([A-Z])/g, " $1");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

export function NavCompact({ navigation }: { navigation: CompactNavigation }) {
  const entries = Object.entries(navigation);

  return (
    <>
      {entries.map(([groupKey, items]) => (
        <SidebarGroup key={groupKey}>
          <SidebarGroupLabel>{formatGroupLabel(groupKey)}</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item) => {
              // Item dengan anak (collapsible)
              if ("title" in item && item.items && item.items.length > 0) {
                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem
                              key={subItem.title || subItem.name}
                            >
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <span>{subItem.title || subItem.name}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }

              // Item sederhana
              if ("name" in item) {
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild tooltip={item.name}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              return null;
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}

export function NavHeader() {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs = [];

    // Skip "dashboard" from paths as it will be the root
    const pathsWithoutDashboard = paths.filter(
      (p, i) => !(i === 0 && p === "dashboard")
    );

    // Only add Dashboard as root if we're not on the dashboard page itself
    if (pathname !== "/dashboard" && pathname !== "/") {
      breadcrumbs.push({
        href: "/dashboard",
        label: "Dashboard",
        isLast: false,
      });
    }

    // Generate breadcrumbs from remaining path segments
    pathsWithoutDashboard.forEach((path, index) => {
      const href =
        "/dashboard/" + pathsWithoutDashboard.slice(0, index + 1).join("/");
      const label =
        path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
      const isLast = index === pathsWithoutDashboard.length - 1;

      breadcrumbs.push({
        href,
        label,
        isLast,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex justify-between items-center w-full gap-2 pr-8">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.href}>
                  {index > 0 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                  <BreadcrumbItem
                    className={index === 0 ? "hidden md:block" : ""}
                  >
                    {crumb.isLast ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={crumb.href}>
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
              {breadcrumbs.length === 0 && (
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NavUser />
        </div>
      </div>
    </header>
  );
}
