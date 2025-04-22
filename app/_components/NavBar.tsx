"use client";

import classNames from "classnames";
import {
  BookOpen,
  ChevronDown,
  Coffee,
  Compass,
  GraduationCap,
  Lightbulb,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaClover } from "react-icons/fa6";
import MobileSideBar from "./MobileSideBar";

export interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: NavLink[];
}

const NavBar = () => {
  const currentPath = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Set visibility after component mounts for slide-in effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDropdownToggle = (label: string, e: React.MouseEvent) => {
    // Prevent the event from bubbling up to potential parent link elements
    e.stopPropagation();
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const isDropdownOpen = (label: string) => {
    return openDropdown === label;
  };

  const links: NavLink[] = [
    { label: "Home", href: "/", icon: <Compass className="w-4 h-4 mr-1" /> },
    {
      label: "Tools Walkthrough",
      href: "/online-learning",
      icon: <GraduationCap className="w-4 h-4 mr-1" />,
      children: [
        {
          label: "Tools Home",
          href: "/online-learning",
          icon: <GraduationCap className="w-4 h-4 mr-1" />,
        },
        {
          label: "Tools Guide",
          href: "/online-learning/1",
          icon: <BookOpen className="w-4 h-4 mr-1" />,
        },
        {
          label: "Communication",
          href: "/online-learning/2",
          icon: <MessageCircle className="w-4 h-4 mr-1" />,
        },
      ],
    },
    {
      label: "Career Support",
      href: "/career-support",
      icon: <Coffee className="w-4 h-4 mr-1" />,
      children: [
        {
          label: "Career Support Home",
          href: "/career-support",
          icon: <Coffee className="w-4 h-4 mr-1" />,
        },
        {
          label: "Resume Builder",
          href: "/career-support/resume-support",
          icon: <BookOpen className="w-4 h-4 mr-1" />,
        },
        {
          label: "Interview Prep",
          href: "/career-support/interview",
          icon: <MessageCircle className="w-4 h-4 mr-1" />,
        },
      ],
    },
    {
      label: "AI Support",
      href: "/ai-support",
      icon: <Lightbulb className="w-4 h-4 mr-1" />,
    },
    {
      label: "Experience Wall",
      href: "/experience-wall",
      icon: <MessageCircle className="w-4 h-4 mr-1" />,
    },
  ];

  return (
    <>
      <div className="block md:hidden">
        <MobileSideBar links={links} />
      </div>
      <header
        className={`hidden md:block sticky top-0 z-50 shadow-md bg-white transition-all duration-500 transform ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full h-20 bg-gradient-to-r from-red-50 to-red-100 flex flex-row items-center justify-between rounded-b-lg">
            <div className="flex items-center space-x-3 ml-4">
              <FaClover className="text-red-200 text-3xl transition-transform duration-300 hover:rotate-12" />
              <Link
                href="/"
                className="font-extrabold text-xl text-red-900 tracking-tight hover:text-red-800 transition-colors duration-300"
              >
                StillSkilled
              </Link>
            </div>
          </div>

          {/* Link */}
          <nav className="flex justify-between items-center border-b border-gray-200 p-4">
            <ul className="flex flex-row space-x-8">
              {links.map((link, index) => (
                <li key={link.href} className="relative">
                  {link.children ? (
                    // If link has children, make it a div for dropdown
                    <div
                      className={classNames(
                        "group flex items-center px-2 py-1 cursor-pointer transition-all duration-300 text-base font-medium hover:text-red-800 transform",
                        {
                          "text-red-900":
                            (currentPath.startsWith(link.href) &&
                              link.href !== "/") ||
                            link.href === currentPath,
                          "text-red-800":
                            !currentPath.startsWith(link.href) ||
                            (link.href === "/" && currentPath !== "/"),
                          "font-bold":
                            (currentPath.startsWith(link.href) &&
                              link.href !== "/") ||
                            link.href === currentPath,
                        },
                        (currentPath.startsWith(link.href) &&
                          link.href !== "/") ||
                          link.href === currentPath
                          ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-900"
                          : "",
                        isVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0"
                      )}
                      style={{
                        transitionDelay: `${100 + index * 50}ms`,
                      }}
                      onClick={(e) => handleDropdownToggle(link.label, e)}
                    >
                      {link.icon}
                      {link.label}
                      <ChevronDown
                        className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                          isDropdownOpen(link.label) ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </div>
                  ) : (
                    // If link has no children, make it a Link for direct navigation
                    <Link
                      href={link.href}
                      className={classNames(
                        "group flex items-center px-2 py-1 transition-all duration-300 text-base font-medium hover:text-red-800 transform",
                        {
                          "text-red-900":
                            (currentPath.startsWith(link.href) &&
                              link.href !== "/") ||
                            link.href === currentPath,
                          "text-red-800":
                            !currentPath.startsWith(link.href) ||
                            (link.href === "/" && currentPath !== "/"),
                          "font-bold":
                            (currentPath.startsWith(link.href) &&
                              link.href !== "/") ||
                            link.href === currentPath,
                        },
                        (currentPath.startsWith(link.href) &&
                          link.href !== "/") ||
                          link.href === currentPath
                          ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-900"
                          : "",
                        isVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-4 opacity-0"
                      )}
                      style={{
                        transitionDelay: `${100 + index * 50}ms`,
                      }}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown menu */}
                  {link.children && (
                    <div
                      className={`absolute left-0 mt-2 z-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ${
                        isDropdownOpen(link.label)
                          ? "transform scale-100 opacity-100"
                          : "transform scale-95 opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="py-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={classNames(
                              "px-4 py-2 text-sm transition-colors duration-200 flex items-center",
                              {
                                "bg-red-50 text-red-900 font-bold":
                                  child.href === currentPath,
                                "text-red-800 hover:bg-red-50 hover:text-red-800":
                                  child.href !== currentPath,
                              }
                            )}
                          >
                            <span className="flex items-center">
                              {child.icon}
                              <span className="ml-1">{child.label}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavBar;
