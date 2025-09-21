"use client";
import React, { useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import NavLink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "../theme-toggle";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto relative">
      {/* Logo */}
      <div className="flex lg:flex-1">
        <NavLink
          href={"/"}
          className="flex items-center gap-1 lg:gap-2 shrink-0"
        >
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 dark:text-white hover:rotate-10 transform transition duration-500 ease-in-out " />
          <span className="font-extrabold lg:text-xl text-gray-900 dark:text-white ">
            HIXUPDF
          </span>
        </NavLink>
      </div>

      {/* Desktop Nav */}
      <div className="hidden lg:flex flex-1 justify-center gap-4 lg:gap-12 items-center text-sm font-extrabold">
        <NavLink href={"/#pricing"}>Pricing</NavLink>

        <SignedIn>
          <NavLink href={"/dashboard"}>Your Summaries</NavLink>
        </SignedIn>
        <NavLink href={"/contact-us"}>Contact Us</NavLink>
      </div>

      {/* Desktop Auth */}
      <div className="hidden lg:flex justify-end flex-1">
        <div className="flex gap-2 items-center font-extrabold">
          <ThemeToggle />
          <SignedIn>
            <NavLink href={"/upload"} className="px-3">
              Upload
            </NavLink>
            <div className="">Pro</div>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <NavLink href={"/sign-up"}>Sign Up</NavLink>
          </SignedOut>
        </div>
      </div>

      {/* Mobile Hamburger */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-md focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50 flex flex-col gap-4 px-4 py-6 lg:hidden font-bold">
          <div className="flex items-center justify-between">
            <span>Theme</span>
            <ThemeToggle />
          </div>
          <NavLink href={"/#pricing"} onClick={() => setMenuOpen(false)}>
            Pricing
          </NavLink>
          <SignedIn>
            <NavLink href={"/dashboard"} onClick={() => setMenuOpen(false)}>
              Your Summaries
            </NavLink>
            <NavLink href={"/upload"} onClick={() => setMenuOpen(false)}>
              Upload a Pdf
            </NavLink>
            <div className="">Pro</div>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <NavLink href={"/sign-up"} onClick={() => setMenuOpen(false)}>
              Sign Up
            </NavLink>
          </SignedOut>
        </div>
      )}
    </nav>
  );
};

export default Header;
