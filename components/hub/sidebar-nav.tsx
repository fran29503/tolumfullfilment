"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  MAIN_NAV_ITEMS,
  SUPPORT_NAV_ITEMS,
  MOCK_USER,
  type NavItem,
} from "@/lib/constants/navigation";

// ─── Nav Item ────────────────────────────────────────────────────────────────

interface SidebarNavItemProps {
  item: NavItem;
  isActive: boolean;
  index: number;
}

function SidebarNavItem({ item, isActive, index }: SidebarNavItemProps) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 + 0.15, duration: 0.35, ease: "easeOut" }}
    >
      <Link href={item.href}>
        <motion.div
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer",
            "transition-colors duration-200",
            isActive
              ? "bg-green-primary/20 border border-green-primary/30 text-green-bright"
              : "border border-transparent text-white/50 hover:text-white/80 hover:bg-white/5"
          )}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <Icon
            size={16}
            className={cn(
              "shrink-0",
              isActive ? "text-green-bright" : "text-white/40"
            )}
          />
          <span
            className={cn(
              "text-sm font-inter",
              isActive ? "font-semibold text-green-bright" : "font-normal"
            )}
          >
            {item.label}
          </span>

          {/* Active indicator dot */}
          {isActive && (
            <motion.div
              className="ml-auto w-1.5 h-1.5 rounded-full bg-green-primary"
              layoutId="active-dot"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <motion.aside
      className="fixed left-0 top-0 h-screen w-[250px] z-50 flex flex-col
                 bg-black/80 backdrop-blur-md border-r border-white/10"
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* ── Logo ── */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-primary to-green-bright flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" strokeWidth={3} />
            </div>
            <div className="absolute inset-0 rounded-lg bg-green-primary blur-md opacity-25" />
          </div>
          <span className="font-montserrat font-bold text-lg tracking-[0.15em] text-white uppercase">
            TOLUM
          </span>
        </div>
        <p className="text-xs text-white/30 font-inter mt-1.5 pl-11">
          Operations Hub
        </p>
      </div>

      {/* ── Main Navigation ── */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        <p className="text-[10px] font-inter font-semibold text-white/25 uppercase tracking-widest px-3 mb-2">
          Main
        </p>
        {MAIN_NAV_ITEMS.map((item, index) => (
          <SidebarNavItem
            key={item.href}
            item={item}
            isActive={pathname === item.href}
            index={index}
          />
        ))}
      </nav>

      {/* ── User Block ── */}
      <motion.div
        className="px-3 py-4 border-t border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.4 }}
      >
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-primary/80 to-green-bright/60 flex items-center justify-center shrink-0">
            <span className="text-xs font-montserrat font-bold text-black">
              {MOCK_USER.initials}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-inter font-semibold text-white truncate">
              {MOCK_USER.name}
            </p>
            <p className="text-[10px] font-inter text-white/40 truncate">
              {MOCK_USER.role}
            </p>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-green-primary animate-pulse shrink-0" />
        </div>
      </motion.div>

      {/* ── Support Navigation ── */}
      <nav className="px-3 pb-5 flex flex-col gap-1 border-t border-white/10 pt-3">
        <p className="text-[10px] font-inter font-semibold text-white/25 uppercase tracking-widest px-3 mb-2">
          Support
        </p>
        {SUPPORT_NAV_ITEMS.map((item, index) => (
          <SidebarNavItem
            key={item.href}
            item={item}
            isActive={pathname === item.href}
            index={MAIN_NAV_ITEMS.length + index}
          />
        ))}
      </nav>
    </motion.aside>
  );
}
