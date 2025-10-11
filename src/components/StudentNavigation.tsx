"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import { Calendar, Home, BookOpen, User } from "lucide-react";

const StudentNavigation: React.FC = () => {
  const pathname = usePathname();

  // 定义导航项数据
  const navItems = [
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

  // 检查路径是否匹配（支持父路径匹配）
  const isActivePath = (href: string) => {
    if (href === "/home/student") {
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
