import Link from "next/link";
import { Gi3dHammer } from "react-icons/gi";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-red-50 to-red-100 border-t mt-auto border-none">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2 flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <span className="font-extrabold text-xl text-red-900">StillSkilled</span>
            </div>
            <p className="text-sm text-gray-600 max-w-md">
              StillSkilled is a platform that helps you choose the right digital
              tools for your learning needs. Explore our resources and guides to
              enhance your skills.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-600 hover:text-red-800 transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links sections */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-base font-bold text-red-900">StillSkilled</h3>
            <nav className="flex flex-col space-y-3">
              {/* <Link
                href="#"
                className="text-sm text-gray-600 hover:text-red-800 transition-colors"
              >
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-red-800 transition-colors"
              >
                Contact
              </Link> */}
            </nav>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-base font-bold text-red-900">Legal</h3>
            <nav className="flex flex-col space-y-3">
              {/* <Link
                href="#"
                className="text-sm text-gray-600 hover:text-red-800 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-600 hover:text-red-800 transition-colors"
              >
                Privacy
              </Link> */}
            </nav>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-gray-200 mt-5 pt-5">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
