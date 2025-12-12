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
        dropdown: [
            { title: "All Students", link: "/students/all" },
            { title: "Add Student", link: "/students/add" },
            { title: "Attendance", link: "/students/attendance" },
        ],
    },
    {
        title: "Trainers",
        icon: UserIcon,
        dropdown: [
            { title: "All Trainers", link: "/trainers/all" },
            { title: "Add Trainer", link: "/trainers/add" },
            { title: "Assign Courses", link: "/trainers/assign-courses" },
        ],
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
