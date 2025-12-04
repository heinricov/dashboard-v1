import {
  AudioWaveform,
  ClipboardList,
  Command,
  Database,
  GalleryVerticalEnd,
  Home,
  Settings2,
} from "lucide-react";

export const Switcher = {
  AcmeInc: [
    {
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  AcmeCorp: [
    {
      logo: AudioWaveform,
      plan: "Startup",
    },
  ],
  EvilCorp: [
    {
      logo: Command,
      plan: "Free",
    },
  ],
};

export const navigation = {
  Menus: [
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
  ],
  MasterData: [
    {
      title: "Post",
      url: "#",
      icon: ClipboardList,
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
};
