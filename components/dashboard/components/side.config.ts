import {
  ClipboardList,
  Database,
  Home,
  Settings2,
  SquareTerminal,
} from "lucide-react";

export const data = {
  sideMenu: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      name: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
    {
      title: "Data Master",
      url: "#",
      icon: Database,
      isActive: true,
      items: [
        {
          name: "Categories",
          url: "/dashboard/categories",
        },
        {
          title: "Users",
          url: "/dashboard/users",
        },
      ],
    },
  ],
  menus: [
    {
      title: "Post",
      url: "#",
      icon: ClipboardList,
      isActive: true,
      items: [
        {
          title: "List Post",
          url: "/dashboard/posts",
        },
        {
          title: "Create Post",
          url: "/dashboard/posts/create",
        },
      ],
    },
  ],
};
