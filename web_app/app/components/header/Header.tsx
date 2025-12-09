"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "@/app/(auth)/actions";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const handleLogout = async () => {
    await LogOut();
    setIsMenuOpen(false);
    router.push("/login");
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed w-full bg-custom-black/95 backdrop-blur-sm z-50 border-b border-custom-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href={"/"} className="text-2xl font-bold tracking-tight">
              <span className="text-custom-orange">Tour</span>Rify
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/documentation"
              className="text-gray-300 hover:text-custom-orange transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-custom-orange transition-colors"
            >
              About
            </Link>
            {isLoading ? (
              <div className="animate-pulse w-24 h-10 bg-white/5 rounded-md"></div>
            ) : !user ? (
              <Link
                href={"/login"}
                className="px-4 py-2 rounded-sm border border-l-custom-orange border-b-custom-orange text-gray-300 hover:text-white transition-colors"
              >
                Log In
              </Link>
            ) : (
              <Button
                className="bg-custom-orange text-white px-6 py-2.5 rounded hover:bg-custom-orange-dark transition-colors font-medium"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-custom-black border-t border-custom-gray absolute w-full left-0 shadow-2xl animate-in slide-in-from-top-5 duration-200">
          <div className="px-4 py-6 space-y-4 flex flex-col">
            <Link
              href={"/documentation"}
              onClick={closeMenu}
              className="block text-lg text-gray-300 hover:text-custom-orange transition-colors py-2"
            >
              Documentation
            </Link>
            <Link
              href={"/about"}
              onClick={closeMenu}
              className="block text-lg text-gray-300 hover:text-custom-orange transition-colors py-2"
            >
              About
            </Link>

            <div className="h-px bg-gray-800 my-2" />

            {isLoading ? (
              <div className="space-y-3 pt-2">
                <div className="h-10 w-full bg-white/5 rounded animate-pulse" />
                <div className="h-10 w-full bg-white/5 rounded animate-pulse" />
              </div>
            ) : user ? (
              <div className="space-y-4 pt-2">
                <Button
                  onClick={handleLogout}
                  className="w-full bg-custom-orange text-white py-6 text-lg hover:bg-custom-orange-dark transition-colors font-medium"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <Link
                  href={"/login"}
                  onClick={closeMenu}
                  className="block w-full text-center py-3 text-gray-300 border border-custom-gray rounded-md hover:text-white hover:border-custom-orange transition-all"
                >
                  Log In
                </Link>
                <Link
                  href={"/signup"}
                  onClick={closeMenu}
                  className="block w-full text-center bg-custom-orange text-white py-3 rounded-md hover:bg-custom-orange-dark transition-colors font-medium"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
