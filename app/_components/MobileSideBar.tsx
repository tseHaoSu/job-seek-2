"use client";

import { LogIn, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Gi3dHammer } from "react-icons/gi";
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
            <Gi3dHammer className="text-red-800 text-2xl" />
            <Link href="/" className="font-bold text-red-900">
              Logo
            </Link>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <Menu className="h-6 w-6 text-gray-700" />
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
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-bold text-lg">Menu</h2>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6" />
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
                        currentPath === link.href
                          ? "bg-red-100 text-red-900 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sign in button */}
            <div className="absolute bottom-8 left-0 right-0 px-4">
              <button className="w-full bg-red-800 hover:bg-red-900 text-white p-3 rounded-md flex items-center justify-center gap-2">
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
