"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { FolderOpen, Cloud } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";

// Navigation Items
const navigationItems = [
  {
    title: "Local Files",
    href: "/local",
    description: "Browse files on your local system",
    icon: FolderOpen,
  },
  {
    title: "Cloud Storage",
    href: "/cloud",
    description: "Access files from cloud services",
    icon: Cloud,
  },
];

// Navbar
export function Navbar() {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Desktop Navigation */}
          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Docs */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="https://github.com/abhimehrr/code-explorer"
                    target="_blank"
                    className={navigationMenuTriggerStyle()}
                  >
                    Docs
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Browse */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Browse</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <li key={item.title}>
                            <NavigationMenuLink
                              href={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="flex items-center space-x-2">
                                <Icon className="h-4 w-4" />
                                <div className="text-sm font-medium leading-none">
                                  {item.title}
                                </div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </NavigationMenuLink>
                          </li>
                        );
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Share Button */}
            <Button
              variant="outline"
              size="icon"
              className="hidden sm:flex size-8"
              asChild
            >
              <Link href="https://github.com/code-explorer" target="_blank">
                <Image
                  src={"/github-mark-white.png"}
                  alt="Github"
                  width={20}
                  height={20}
                  className="size-4"
                />
              </Link>
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
