"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();

  const isActive =
    pathname === href || (href === "/" && pathname.startsWith("/"));
  return (
    <Link
      href={href}
      className={cn(
        `text-gray-600 text-sm hover:text-rose-500 transition-colors duration-300`,
        className,
        isActive && "text-rose-500"
      )}
    >
      {children}
    </Link>
  );
}
