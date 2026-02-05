import { type SidebarItem } from "../types/sideBarItem.type";
import {
    HomeIcon,
    UserIcon,
    BookIcon,
    BarChartIcon,
    CalendarIcon,
    MessageCircleIcon,
    BellIcon,
    SettingsIcon,
    HelpCircleIcon,
} from "lucide-react";

export const sidebarItems: SidebarItem[] = [
    {
        title: "Dashboard",
        icon: HomeIcon,
        link: "/dashboard", // no dropdown
    },
    {
        title: "Courses",
        icon: BookIcon,
        link: '/course'
    },
    {
        title: "Students",
        icon: UserIcon,
        link: '/student'
    },
    {
        title: "Trainers",
        icon: UserIcon,
        link: '/trainer'
    },
    {
        title: "Reports",
        icon: BarChartIcon,
        dropdown: [
            { title: "Attendance Report", link: "/reports/attendance" },
            { title: "Performance Report", link: "/reports/performance" },
            { title: "Fee Report", link: "/reports/fees" },
        ],
    },
    {
        title: "Calendar",
        icon: CalendarIcon,
        link: "/calendar",
    },
    {
        title: "Messages",
        icon: MessageCircleIcon,
        link: "/messages",
    },
    {
        title: "Notifications",
        icon: BellIcon,
        link: "/notifications",
    },
    {
        title: "Settings",
        icon: SettingsIcon,
        dropdown: [
            { title: "Profile Settings", link: "/settings/profile" },
            { title: "System Settings", link: "/settings/system" },
            { title: "Role Management", link: "/settings/roles" },
        ],
    },
    {
        title: "Help",
        icon: HelpCircleIcon,
        link: "/help",
    },
];
