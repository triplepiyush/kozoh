import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 px-4 pb-28 md:pb-8">
      <div className="max-w-7xl mx-auto glass-strong rounded-3xl p-8 md:p-12">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-full gradient-hero grid place-items-center text-white font-heading text-lg">k</span>
              <span className="font-heading text-2xl">kozoh<span className="text-gradient">World</span></span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The marketplace for every bag, designed for the way you move.
            </p>
            <div className="flex gap-2 mt-4">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 grid place-items-center rounded-full bg-foreground/5 hover:bg-foreground hover:text-background transition" aria-label="social">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Shop", links: ["Travel", "Office", "Leather", "Backpacks", "Trolley"] },
            { title: "Company", links: ["About", "Sustainability", "Press", "Careers"] },
            { title: "Support", links: ["Help Center", "Shipping", "Returns", "Warranty"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-heading text-lg mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">© 2026 kozohWorld. Crafted with care.</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="w-3 h-3" /> hello@kozohworld.com
          </div>
        </div>
      </div>
    </footer>
  );
}
