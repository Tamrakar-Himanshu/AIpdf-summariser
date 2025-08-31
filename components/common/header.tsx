import React from "react";
import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import NavLink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const header = () => {
  const isLoggedin = false; // Replace with actual authentication logic
  return (
    <>
      <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
        <div className=" flex lg:flex-1">
          <NavLink
            href={"/"}
            className="flex items-center gap-1 lg:gap-2 shrink-0"
          >
            <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-10 transform transition duration-500 ease-in-out " />
            <span className="font-extrabold lg:text-xl text-gray-900 ">
              Tomiyoka
            </span>
          </NavLink>
        </div>
        <div className=" flex lg:justigy-center gap-4 lg:gap-12 lg:items-center">
          <NavLink href={"/#pricing"}>Pricing</NavLink>
          {
            <SignedIn>
              <NavLink href={"/#dashboard"}>Your Summaries</NavLink>
            </SignedIn>
          }
        </div>

        <div className="flex lg:justify-end lg:flex-1">
          <div className="flex gap-2 items-center">
            <SignedIn>
              <div className="flex gap-2 items-center">
                <NavLink href={"/upload"}>Upload a Pdf</NavLink>
                <div className="">Pro</div>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </SignedIn>
            <SignedOut>
              <NavLink href={"/sign-up"}>Sign Up</NavLink>
            </SignedOut>
          </div>
        </div>
      </nav>
    </>
  );
};

export default header;
