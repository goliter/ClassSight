"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import { Calendar, Home, BookOpen, User, Building2 } from "lucide-react";

const studentNavItems = [
  {
    href: "/home/student",
    icon: <Home className="h-4 w-4" />,
    label: "首页",
  },
  {
    href: "/home/student/courses",
    icon: <BookOpen className="h-4 w-4" />,
    label: "课程",
  },
  {
    href: "/home/student/calendar",
    icon: <Calendar className="h-4 w-4" />,
    label: "日历",
  },
  {
    href: "/home/student/profile",
    icon: <User className="h-4 w-4" />,
    label: "我的",
  },
];

const teacherNavItems = [
  {
    href: "/home/teacher",
    icon: <Home className="h-4 w-4" />,
    label: "首页",
  },
  {
    href: "/home/teacher/courses",
    icon: <BookOpen className="h-4 w-4" />,
    label: "课程",
  },
  {
    href: "/home/teacher/calendar",
    icon: <Calendar className="h-4 w-4" />,
    label: "日历",
  },
  {
    href: "/home/teacher/profile",
    icon: <User className="h-4 w-4" />,
    label: "我的",
  },
];

const adminNavItems = [
  {
    href: "/home/admin",
    icon: <Home className="h-4 w-4" />,
    label: "首页",
  },
  {
    href: "/home/admin/student",
    icon: <User className="h-4 w-4" />,
    label: "学生管理",
  },
  {
    href: "/home/admin/teacher",
    icon: <User className="h-4 w-4" />,
    label: "老师管理",
  },
  {
    href: "/home/admin/courses",
    icon: <BookOpen className="h-4 w-4" />,
    label: "课程管理",
  },
  {
    href: "/home/admin/department",
    icon: <Building2 className="h-4 w-4" />,
    label: "学院管理",
  },
  {
    href: "/home/admin/calendar",
    icon: <Calendar className="h-4 w-4" />,
    label: "日历",
  },
];

interface StudentNavigationProps {
  role: 0 | 1 | 2;
}

const StudentNavigation: React.FC<StudentNavigationProps> = ({ role }) => {
  const pathname = usePathname();

  const navItems =
    role === 0 ? studentNavItems : role === 1 ? teacherNavItems : adminNavItems;
  // 检查路径是否匹配（支持父路径匹配）
  const isActivePath = (href: string) => {
    if (href === "/home/student") {
      return pathname === href;
    }

    if (href === "/home/teacher") {
      return pathname === href;
    }

    if (href === "/home/admin") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <NavigationMenu className="w-full">
      <div className="container mx-auto py-4">
        <NavigationMenuList className="flex bg-white dark:bg-[oklch(0.205_0_0)] shadow-lg rounded-full p-1">
          {navItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-5 py-3 text-sm font-medium rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                    isActivePath(item.href) &&
                      "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </NavigationMenuTrigger>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
};

export default StudentNavigation;
