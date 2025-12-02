import { type LucideIcon } from "lucide-react";

export interface SidebarDropdownItem {
    title: string;
    link: string;
}

export interface SidebarItem {
    title: string;
    icon: LucideIcon;
    link?: string;
    dropdown?: SidebarDropdownItem[];
}
