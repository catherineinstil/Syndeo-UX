"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  { label: "Home",          href: "/" },
  { label: "Reports",       href: "/reports" },
  { label: "AI Agents",     href: "/ai-agents" },
  { label: "AI Workbench",  href: "/ai-workbench" },
  { label: "Flows",         href: "/flows" },
  { label: "Channels",      href: "/channels" },
  { label: "Configuration", href: "/configuration" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="bg-white border-b border-[#E8F0FB]">
      <div className="container mx-auto px-6 py-0 flex items-center justify-between">
        <div className="flex items-center gap-2 py-3">
          <Image src="/images/syndeo-logo.png" alt="Syndeo" width={120} height={36} className="h-9 w-auto" />
        </div>
        <ul className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-4 py-5 text-sm font-medium inline-block border-b-2 transition-colors ${
                    active
                      ? "border-[#2F8FFF] text-[#2F8FFF]"
                      : "border-transparent text-[#6A738A] hover:text-[#3B4760]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
