"use client";

import { LogIn, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaClover } from "react-icons/fa6";
import { NavLink } from "./NavBar";

interface Props {
  links: NavLink[];
}

const MobileSidebar = ({ links }: Props) => {
  const currentPath = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Mobile Header */}
      <header className="sticky top-0 z-30 bg-white shadow-sm">
        <div className="flex justify-between items-center h-16 px-4 bg-gradient-to-r from-red-50 to-red-100">
          <div className="flex items-center gap-2">
            <FaClover className="text-red-800 text-3xl transition-transform duration-300 hover:rotate-12" />
            <Link
              href="/"
              className="scroll-m-20 text-xl font-extrabold tracking-tight text-red-900"
            >
              StillSkilled
            </Link>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <Menu className="h-6 w-6 text-red-800" />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar panel */}
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg">
            {/* Close button */}
            <div className="flex justify-between items-center p-4 border-b border-red-100">
              <h2 className="scroll-m-20 text-lg font-semibold tracking-tight text-red-900">
                Menu
              </h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6 text-red-800" />
              </button>
            </div>

            {/* Links */}
            <nav className="p-4">
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 p-2 rounded-md ${
                        currentPath === link.href ||
                        currentPath.startsWith(link.href + "/")
                          ? "bg-red-100 text-red-900 font-medium tracking-tight"
                          : "text-gray-700 hover:bg-red-50 tracking-tight"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.icon}
                      {link.label}
                    </Link>

                    {/* Render sub-items if they exist and the parent is active */}
                    {link.children &&
                      (currentPath === link.href ||
                        currentPath.startsWith(link.href + "/")) && (
                        <ul className="pl-6 mt-2 space-y-2">
                          {link.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={`flex items-center gap-2 p-1.5 rounded-md leading-7 ${
                                  currentPath === child.href
                                    ? "bg-red-50 text-red-900 font-medium tracking-tight"
                                    : "text-gray-600 hover:bg-red-50"
                                }`}
                                onClick={() => setIsOpen(false)}
                              >
                                {child.icon}
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sign in button */}
            <div className="absolute bottom-8 left-0 right-0 px-4">
              <button className="w-full bg-red-900 hover:bg-red-950 text-white p-3 rounded-md flex items-center justify-center gap-2 transition-colors font-medium tracking-tight">
                <LogIn className="w-5 h-5" />
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSidebar;
