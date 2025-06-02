'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/../utils/supabase/client";
import { signOut } from "@/actions/auth";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserEmail(user?.email ?? null);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false); // Scroll down → hide
      } else {
        setShowNavbar(true); // Scroll up → show
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`bg-white shadow-md fixed top-0 w-full z-50 transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-bold text-green-600">
              Smart Cooking Recipe
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6 items-center text-base font-medium">
            <Link href="/dashboard" className="text-gray-600 hover:text-green-700 transition">Home</Link>

            {userEmail && (
              <>
                <Link href="/recipes" className="text-gray-600 hover:text-green-700 transition">Recipes</Link>
                <Link href="/inventory" className="text-gray-600 hover:text-green-700 transition">Inventory</Link>
                <Link href="/nutrition" className="text-gray-600 hover:text-green-700 transition">Nutrition</Link>
              </>
            )}

            {!userEmail ? (
              <>
                <Link href="/login" className="text-gray-600 hover:text-green-700 transition">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  Sign Up Free
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="text-gray-700 font-semibold">{userEmail}</button>
                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border">
                  <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                  <div className="border-t" />
                  <div className="px-4 py-2">
                    <button onClick={() => signOut()} className="w-full text-left">Logout</button>
                  </div>
                </div>
              </div>
            )}
          </nav>

          {/* Mobile */}
          <div className="md:hidden">
            <Link
              href={userEmail ? "/settings" : "/signup"}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md text-sm"
            >
              {userEmail ? "Settings" : "Sign Up"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
