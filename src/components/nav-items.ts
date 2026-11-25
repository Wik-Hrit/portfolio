import { House, FolderGit2, Briefcase, PenLine, UserRound, Wrench, Mail } from "lucide-react";

export const navItems = [
  { href: "/", label: "Home", icon: House },
  { href: "/projects", label: "Projects", icon: FolderGit2 },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/research", label: "Research & Writing", icon: PenLine },
  { href: "/about", label: "About", icon: UserRound },
  { href: "/tools", label: "Tools", icon: Wrench },
  { href: "/contact", label: "Contact", icon: Mail },
] as const;

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
