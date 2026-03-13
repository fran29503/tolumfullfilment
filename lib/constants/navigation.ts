import {
  LayoutDashboard,
  Radio,
  TrendingUp,
  MessageSquare,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavUser {
  name: string;
  role: string;
  initials: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/hub",
    icon: LayoutDashboard,
  },
  {
    label: "Live Operations",
    href: "/hub/operations",
    icon: Radio,
  },
  {
    label: "Sales",
    href: "/hub/sales",
    icon: TrendingUp,
  },
  {
    label: "Chat",
    href: "/hub/chat",
    icon: MessageSquare,
  },
  {
    label: "Alerts",
    href: "/hub/alerts",
    icon: Bell,
  },
];

export const SUPPORT_NAV_ITEMS: NavItem[] = [
  {
    label: "Help",
    href: "/hub/help",
    icon: HelpCircle,
  },
  {
    label: "Settings",
    href: "/hub/settings",
    icon: Settings,
  },
  {
    label: "Logout",
    href: "/logout",
    icon: LogOut,
  },
];

export const MOCK_USER: NavUser = {
  name: "Fran Martinez",
  role: "Operations Manager",
  initials: "FM",
};
