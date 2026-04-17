import { Link, useLocation } from "@tanstack/react-router";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/store";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/category", label: "Shop" },
  { to: "/ai", label: "Kozoh.AI" },
  { to: "/dashboard", label: "Account" },
] as const;

export function Navbar() {
  const { count, wishlist } = useCart();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
        <nav className="glass-strong rounded-full max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-full gradient-hero grid place-items-center text-white font-heading text-lg shadow-[var(--shadow-glow-blue)] group-hover:scale-105 transition-transform">
              k
            </span>
            <span className="font-heading text-2xl tracking-tight">
              kozoh<span className="text-gradient">World</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((n) => {
              const active = location.pathname === n.to || (n.to !== "/" && location.pathname.startsWith(n.to));
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    active ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden sm:grid w-10 h-10 place-items-center rounded-full hover:bg-foreground/5 transition" aria-label="Search">
              <Search className="w-4 h-4" />
            </button>
            <Link to="/dashboard" className="relative grid w-10 h-10 place-items-center rounded-full hover:bg-foreground/5 transition" aria-label="Wishlist">
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-white text-[10px] font-bold grid place-items-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative grid w-10 h-10 place-items-center rounded-full hover:bg-foreground/5 transition" aria-label="Cart">
              <ShoppingBag className="w-4 h-4" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-white text-[10px] font-bold grid place-items-center animate-scale-in">
                  {count}
                </span>
              )}
            </Link>
            <Link to="/dashboard" className="hidden sm:grid w-10 h-10 place-items-center rounded-full bg-foreground text-background hover:scale-105 transition" aria-label="Account">
              <User className="w-4 h-4" />
            </Link>
            <button onClick={() => setOpen(true)} className="md:hidden grid w-10 h-10 place-items-center rounded-full hover:bg-foreground/5" aria-label="Menu">
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden animate-fade-in">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-4 top-4 bottom-4 w-72 glass-strong rounded-3xl p-6 animate-scale-in">
            <div className="flex justify-between items-center mb-8">
              <span className="font-heading text-2xl">Menu</span>
              <button onClick={() => setOpen(false)} className="grid w-10 h-10 place-items-center rounded-full hover:bg-foreground/5">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {navItems.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-2xl text-lg font-medium hover:bg-foreground/5"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
