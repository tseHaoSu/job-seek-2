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
  const [scrolled, setScrolled] = useState(false);

  // Set visibility after component mounts for slide-in effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle scroll transparency effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleDropdownToggle = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdown(openDropdown === label ? null : label);
  };

  useEffect(() => {
    setOpenDropdown(null);
  }, [currentPath]);

  const isDropdownOpen = (label: string) => {
    return openDropdown === label;
  };

  const links: NavLink[] = [
    {
      label: "Home",
      href: "/",
      icon: <Compass className="w-4 h-4 mr-2" />,
      children: [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: <BookOpen className="w-4 h-4 mr-2" />,
        },
      ],
    },
    {
      label: "Tools Walkthrough",
      href: "/online-learning",
      icon: <GraduationCap className="w-4 h-4 mr-2" />,
      children: [
        {
          label: "Tools Guide",
          href: "/online-learning/1",
          icon: <BookOpen className="w-4 h-4 mr-2" />,
        },
        {
          label: "Communication",
          href: "/online-learning/2",
          icon: <MessageCircle className="w-4 h-4 mr-2" />,
        },
      ],
    },
    {
      label: "Career Support",
      href: "/career-support",
      icon: <Coffee className="w-4 h-4 mr-2" />,
      children: [
        {
          label: "Resume Builder",
          href: "/career-support/resume-support",
          icon: <BookOpen className="w-4 h-4 mr-2" />,
        },
        {
          label: "Interview Prep",
          href: "/career-support/interview",
          icon: <MessageCircle className="w-4 h-4 mr-2" />,
        },
      ],
    },
    {
      label: "AI Support",
      href: "/ai-support",
      icon: <Lightbulb className="w-4 h-4 mr-2" />,
    },
    {
      label: "Experience Wall",
      href: "/experience-wall",
      icon: <MessageCircle className="w-4 h-4 mr-2" />,
    },
  ];

  return (
    <>
      {/* Mobile sidebar */}
      <div className="block md:hidden">
        <MobileSideBar links={links} />
      </div>

      {/* Desktop navbar */}
      <header
        className={`hidden md:block sticky top-0 z-50 transition-all duration-300 transform ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        } ${
          scrolled
            ? "bg-white/70 backdrop-blur shadow-sm"
            : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          {/* Combined navbar with logo and links */}
          <div className="flex items-center justify-between h-16">
            {/* Logo area */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-red-900 to-red-700 p-2 rounded-full">
                <FaClover className="text-white text-2xl transition-all duration-300 transform hover:rotate-12 hover:scale-110" />
              </div>
              <Link
                href="/"
                className="scroll-m-20 text-2xl font-semibold tracking-tight transition-colors duration-300"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-900 via-red-800 to-red-700">
                  StillSkilled
                </span>
              </Link>
            </div>

            {/* Navigation links */}
            <nav>
              <ul className="flex flex-row space-x-6">
                {links.map((link, index) => (
                  <li key={link.href} className="relative group">
                    {link.children ? (
                      // Link with dropdown
                      <div className="flex items-center">
                        <Link
                          href={link.href}
                          className={classNames(
                            "flex items-center px-3 py-2 transition-all duration-300 font-medium tracking-tight rounded-lg hover:bg-red-50 transform",
                            {
                              "text-red-900":
                                currentPath.startsWith(link.href) ||
                                link.href === currentPath,
                              "text-red-900/80":
                                !currentPath.startsWith(link.href) &&
                                link.href !== currentPath,
                            },
                            isVisible
                              ? "translate-y-0 opacity-100"
                              : "translate-y-4 opacity-0"
                          )}
                          style={{
                            transitionDelay: `${100 + index * 50}ms`,
                          }}
                        >
                          <span>{link.icon}</span>
                          <span className="tracking-tight">{link.label}</span>
                        </Link>
                        <button
                          onClick={(e) => handleDropdownToggle(link.label, e)}
                          className="ml-1 p-1 hover:bg-gray-100 focus:outline-none transition-colors duration-200 rounded-full"
                          aria-expanded={isDropdownOpen(link.label)}
                          aria-label={`Toggle ${link.label} dropdown`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              isDropdownOpen(link.label)
                                ? "rotate-180 text-red-900"
                                : "rotate-0 text-red-900/70"
                            }`}
                          />
                        </button>
                      </div>
                    ) : (
                      // Regular link without dropdown
                      <Link
                        href={link.href}
                        className={classNames(
                          "group flex items-center px-3 py-2 transition-all duration-300 font-medium tracking-tight rounded-lg hover:bg-red-50 transform",
                          {
                            "text-red-900":
                              currentPath.startsWith(link.href) ||
                              link.href === currentPath,
                            "text-red-900/80":
                              !currentPath.startsWith(link.href) &&
                              link.href !== currentPath,
                          },
                          isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        )}
                        style={{
                          transitionDelay: `${100 + index * 50}ms`,
                        }}
                      >
                        <span>{link.icon}</span>
                        <span className="tracking-tight">{link.label}</span>
                      </Link>
                    )}

                    {/* Dropdown menu */}
                    {link.children && (
                      <div
                        className={`absolute left-0 mt-1 z-10 min-w-[200px] rounded-lg shadow-md bg-white ring-1 ring-black/5 transition-all duration-200 origin-top-left ${
                          isDropdownOpen(link.label)
                            ? "transform scale-100 opacity-100"
                            : "transform scale-95 opacity-0 pointer-events-none"
                        }`}
                      >
                        <div className="py-1 rounded-lg overflow-hidden">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={classNames(
                                "px-4 py-2 transition-all duration-200 flex items-center hover:bg-red-50",
                                {
                                  "text-red-900 font-semibold tracking-tight":
                                    child.href === currentPath,
                                  "text-red-900/80 font-medium":
                                    child.href !== currentPath,
                                }
                              )}
                            >
                              <span className="flex items-center">
                                <span>{child.icon}</span>
                                <span className="tracking-tight">
                                  {child.label}
                                </span>
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
        </div>
      </header>
    </>
  );
};

export default NavBar;
