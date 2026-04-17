import { Link, useLocation } from "@tanstack/react-router";
import { Home, Search, ShoppingBag, Sparkles, User } from "lucide-react";
import { useCart } from "@/lib/store";

const items = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/category", icon: Search, label: "Shop" },
  { to: "/ai", icon: Sparkles, label: "AI" },
  { to: "/cart", icon: ShoppingBag, label: "Cart" },
  { to: "/dashboard", icon: User, label: "Me" },
] as const;

export function MobileNav() {
  const location = useLocation();
  const { count } = useCart();

  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 z-40 glass-strong rounded-full px-2 py-2 flex items-center justify-around">
      {items.map(({ to, icon: Icon, label }) => {
        const active = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-full transition-all ${
              active ? "bg-foreground text-background" : "text-foreground/70"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-[10px] font-medium">{label}</span>
            {to === "/cart" && count > 0 && (
              <span className="absolute top-0 right-1 w-4 h-4 rounded-full bg-primary text-white text-[9px] font-bold grid place-items-center">
                {count}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
