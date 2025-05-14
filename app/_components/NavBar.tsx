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
import NavLogo from "./NavLogo";

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
  const [pageKey, setPageKey] = useState(0);

  // Trigger refresh animation when route changes
  useEffect(() => {
    setIsVisible(false);
    setPageKey((prev) => prev + 1);

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [currentPath]);

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
          href: "/online-learning/tool-selection",
          icon: <BookOpen className="w-4 h-4 mr-2" />,
        },
        {
          label: "Recommendations",
          href: "/online-learning/recommend-question",
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
      label: "JobFit AI",
      href: "/jobfit-ai",
      icon: <MessageCircle className="w-4 h-4 mr-2" />,
    },
  ];

  return (
    <>
      {/* Mobile sidebar */}
      <div className="block md:hidden">
        <MobileSideBar links={links} />
      </div>

      {/* Desktop navbar as a rectangle with space around it */}
      <div className="hidden md:flex justify-center w-full sticky top-6 z-50 px-6 sm:px-8 lg:px-12">
        <header
          className={`w-[95%] max-w-[1400px] rounded-xl transition-all duration-500 transform ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          } ${
            scrolled
              ? "bg-white/60 backdrop-blur-sm shadow-md"
              : "bg-white/80 backdrop-blur-sm"
          }`}
        >
          <div className="mx-auto px-6">
            <div className="flex items-center justify-between h-20 lg:h-24">
              {/* Logo area */}
              <div className="flex items-center h-[200px] w-[200px]">
                <Link
                  href="/"
                  aria-label="Home"
                  className="w-full h-full block"
                >
                  <NavLogo />
                </Link>
              </div>

              <nav className="pr-4">
                <ul className="flex flex-row space-x-6">
                  {links.map((link, index) => (
                    <li key={link.href} className="relative group">
                      {link.children ? (
                        <div className="flex items-center">
                          <Link
                            href={link.href}
                            className={classNames(
                              "flex items-center px-3 py-2 transition-all duration-300 font-medium tracking-tight rounded-lg hover:bg-red-50 transform",
                              {
                                "text-red-900":
                                  currentPath === link.href ||
                                  currentPath.startsWith(link.href + "/"),
                                "text-red-900/80":
                                  currentPath !== link.href &&
                                  !currentPath.startsWith(link.href + "/"),
                              },
                              isVisible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-4 opacity-0"
                            )}
                            style={{
                              transitionDelay: `${150 + index * 100}ms`,
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
                        <Link
                          href={link.href}
                          className={classNames(
                            "group flex items-center px-3 py-2 transition-all duration-300 font-medium tracking-tight rounded-lg hover:bg-red-50 transform",
                            {
                              "text-red-900":
                                currentPath === link.href ||
                                currentPath.startsWith(link.href + "/"),
                              "text-red-900/80":
                                currentPath !== link.href &&
                                !currentPath.startsWith(link.href + "/"),
                            },
                            isVisible
                              ? "translate-y-0 opacity-100"
                              : "translate-y-4 opacity-0"
                          )}
                          style={{
                            transitionDelay: `${150 + index * 100}ms`,
                          }}
                        >
                          <span>{link.icon}</span>
                          <span className="tracking-tight">{link.label}</span>
                        </Link>
                      )}

                      {/* Dropdown menu */}
                      {link.children && (
                        <div
                          className={`absolute left-0 mt-1 z-10 min-w-[200px] rounded-lg shadow-md bg-white/90 backdrop-blur-sm ring-1 ring-black/5 transition-all duration-300 origin-top-left ${
                            isDropdownOpen(link.label)
                              ? "transform scale-100 opacity-100"
                              : "transform scale-95 opacity-0 pointer-events-none"
                          }`}
                        >
                          <div className="py-1 rounded-lg overflow-hidden">
                            {link.children.map((child, childIndex) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={classNames(
                                  "flex items-center px-3 py-2 transition-all duration-300 font-medium tracking-tight hover:bg-red-50 rounded-lg transform",
                                  {
                                    "text-red-900":
                                      currentPath === child.href ||
                                      currentPath.startsWith(child.href + "/"),
                                    "text-red-900/80":
                                      currentPath !== child.href &&
                                      !currentPath.startsWith(child.href + "/"),
                                  }
                                )}
                                style={{
                                  transitionDelay: `${200 + childIndex * 50}ms`,
                                }}
                              >
                                <span>{child.icon}</span>
                                <span className="tracking-tight">
                                  {child.label}
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
      </div>
    </>
  );
};

export default NavBar;
