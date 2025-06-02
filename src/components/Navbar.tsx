import Link from "next/link";
import React from "react";
import { createClient } from "@/../utils/supabase/server";
import Logout from "./auth/Logout";

const Navbar = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full border-b bg-background flex items-center justify-between px-4 h-16">
      {/* Left Side: Logo and Title */}
      <Link href="/" className="flex items-center">
        <div className="w-6 h-6 mr-2 flex flex-col justify-between">
          <div className="w-5 h-[5px] bg-foreground" />
          <div className="w-5 h-[5px] bg-foreground" />
          <div className="w-5 h-[5px] bg-foreground" />
        </div>
        <span className="text-foreground text-2xl font-extrabold font-['Inter'] leading-loose">
          Smart Cooking Recipe
        </span>
      </Link>

      {/* Right Side: Navigation and Account */}
      <div className="flex items-center gap-x-6 text-base font-medium font-['Inter']">
        <Link href="/" className="text-foreground">Home</Link>
        <Link href="/recipes" className="text-foreground">Recipes</Link>
        <Link href="/inventory" className="text-foreground">Inventory</Link>
        <Link href="/nutrition" className="text-foreground">Nutrition</Link>

        {!user ? (
          <Link href="/login">
            <div className="bg-blue-600 text-white text-sm px-4 py-2 rounded-sm">
              Login
            </div>
          </Link>
        ) : (
          <div className="relative group">
            <button className="text-foreground">{user.email}</button>
            <div className="absolute right-0 mt-2 w-40 bg-background text-foreground rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 border">
              <Link
                href="/settings"
                className="block px-4 py-2 hover:bg-muted"
              >
                Settings
              </Link>
              <div className="border-t" />
              <div className="px-4 py-2">
                <Logout />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// // 1. Navbar Component
// const Navbar = () => (
//   <header className="bg-white shadow-md sticky top-0 z-50">
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//       <div className="flex items-center justify-between h-16">
//         <div className="flex-shrink-0">
//           <Link href="/" className="text-3xl font-bold text-green-600">
//             Smart Cooking Recipe
//           </Link>
//         </div>
//         <nav className="hidden md:flex space-x-6 items-center">
//           {/* Future links can go here: Features, About, Contact */}
//           <Link href="/login" className="text-gray-600 hover:text-green-700 transition duration-150 ease-in-out">
//             Login
//           </Link>
//           <Link href="/signup" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out">
//             Sign Up Free
//           </Link>
//         </nav>
//         <div className="md:hidden">
//           {/* Mobile menu button can be added here */}
//           <Link href="/signup" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md text-sm">
//             Sign Up
//           </Link>
//         </div>
//       </div>
//     </div>
//   </header>
// );
export default Navbar;
