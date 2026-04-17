import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Package, Heart, MapPin, Settings, Bell, Truck, Check, Star } from "lucide-react";
import { products } from "@/lib/products";
import { useCart } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Account — kozohWorld" }] }),
});

type Tab = "orders" | "wishlist" | "addresses" | "settings" | "notifications";

const orders = [
  { id: "KZH-10284", date: "Apr 12, 2026", status: "In transit", total: 478, items: 2, eta: "Apr 16" },
  { id: "KZH-10199", date: "Mar 28, 2026", status: "Delivered", total: 219, items: 1, eta: "Delivered" },
  { id: "KZH-10067", date: "Feb 14, 2026", status: "Delivered", total: 829, items: 3, eta: "Delivered" },
];

const trackingSteps = ["Ordered", "Packed", "Shipped", "Out for delivery", "Delivered"];
const trackingActive = 2;

const notifications = [
  { t: "Your Aero Voyager has shipped 📦", d: "2 hours ago" },
  { t: "Heritage Tote restocked in Cognac", d: "Yesterday" },
  { t: "Member-only sale starts Friday", d: "3 days ago" },
];

export function Dashboard() {
  const [tab, setTab] = useState<Tab>("orders");
  const { wishlist } = useCart();
  const wishedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="px-4 md:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full gradient-hero grid place-items-center text-white font-heading text-3xl">P</div>
          <div>
            <p className="text-sm text-muted-foreground">Welcome back</p>
            <h1 className="font-heading text-4xl md:text-5xl">Piyush Pandey</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
              <a href="mailto:triplepiyush@gmail.com" className="hover:text-foreground transition">triplepiyush@gmail.com</a>
              <span>·</span>
              <span>+1 (626) 309-8243</span>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          <aside className="glass-strong rounded-3xl p-3 lg:sticky lg:top-28 lg:self-start overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-3 lg:overflow-x-visible">
            <nav className="flex lg:flex-col gap-1 no-scrollbar">
              {([
                { id: "orders", label: "Orders", icon: Package },
                { id: "wishlist", label: "Wishlist", icon: Heart },
                { id: "addresses", label: "Addresses", icon: MapPin },
                { id: "notifications", label: "Notifications", icon: Bell },
                { id: "settings", label: "Settings", icon: Settings },
              ] as const).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition whitespace-nowrap ${
                    tab === id ? "bg-foreground text-background" : "hover:bg-foreground/5"
                  }`}
                >
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
            </nav>
          </aside>

          <div>
            {tab === "orders" && (
              <div className="space-y-6 animate-fade-in">
                {/* Tracking */}
                <div className="glass-strong rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-xs text-muted-foreground">Active order</p>
                      <h3 className="font-heading text-2xl">KZH-10284 · Aero Voyager + Stratos Daypack</h3>
                    </div>
                    <span className="glass rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5">
                      <Truck className="w-3 h-3 text-primary" /> ETA Apr 16
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {trackingSteps.map((s, i) => (
                      <div key={s} className="flex-1 flex items-center gap-2">
                        <div className="flex flex-col items-center">
                          <div className={`w-9 h-9 rounded-full grid place-items-center transition ${
                            i <= trackingActive ? "bg-foreground text-background" : "glass"
                          } ${i === trackingActive ? "animate-pulse-ring" : ""}`}>
                            {i < trackingActive ? <Check className="w-4 h-4" /> : i + 1}
                          </div>
                          <span className="text-[10px] mt-1 text-center hidden md:block">{s}</span>
                        </div>
                        {i < trackingSteps.length - 1 && (
                          <div className={`flex-1 h-px ${i < trackingActive ? "bg-foreground" : "bg-border"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order list */}
                <div className="space-y-3">
                  <h3 className="font-heading text-2xl">Order history</h3>
                  {orders.map((o) => (
                    <div key={o.id} className="glass rounded-2xl p-5 flex items-center justify-between gap-4 lift">
                      <div>
                        <div className="font-semibold">{o.id}</div>
                        <div className="text-xs text-muted-foreground">{o.date} · {o.items} items</div>
                      </div>
                      <div className="hidden sm:block">
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          o.status === "Delivered" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                        }`}>{o.status}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-heading text-xl">${o.total}</div>
                        <div className="text-xs text-muted-foreground">{o.eta}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "wishlist" && (
              <div className="animate-fade-in">
                <h3 className="font-heading text-3xl mb-6">Saved bags</h3>
                {wishedProducts.length === 0 ? (
                  <div className="glass rounded-3xl p-12 text-center">
                    <Heart className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">No saved bags yet.</p>
                    <Link to="/category" className="text-primary text-sm font-medium">Discover bags →</Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {wishedProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                  </div>
                )}
              </div>
            )}

            {tab === "addresses" && (
              <div className="animate-fade-in space-y-4">
                <h3 className="font-heading text-3xl">Saved addresses</h3>
                {[
                  { tag: "Home", line: "221B Baker Street, London NW1 6XE", default: true },
                  { tag: "Office", line: "45 Shoreditch High St, London E1 6JJ" },
                ].map((a, i) => (
                  <div key={i} className="glass-strong rounded-3xl p-6 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-heading text-xl">{a.tag}</span>
                        {a.default && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Default</span>}
                      </div>
                      <p className="text-sm text-muted-foreground">{a.line}</p>
                    </div>
                    <button className="text-sm text-primary">Edit</button>
                  </div>
                ))}
                <button className="w-full glass rounded-3xl p-6 text-sm font-medium hover:bg-foreground/5 transition">
                  + Add new address
                </button>
              </div>
            )}

            {tab === "notifications" && (
              <div className="animate-fade-in space-y-3">
                <h3 className="font-heading text-3xl mb-3">Notifications</h3>
                {notifications.map((n, i) => (
                  <div key={i} className="glass rounded-2xl p-5 flex items-start gap-4 lift">
                    <div className="w-10 h-10 rounded-full gradient-hero grid place-items-center text-white shrink-0">
                      <Star className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{n.t}</div>
                      <div className="text-xs text-muted-foreground">{n.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "settings" && (
              <div className="animate-fade-in glass-strong rounded-3xl p-8 space-y-5">
                <h3 className="font-heading text-3xl">Profile settings</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="First name" def="Alex" />
                  <Field label="Last name" def="Morgan" />
                </div>
                <Field label="Email" def="alex@kozohworld.com" />
                <Field label="Phone" def="+44 7700 900123" />
                <div className="space-y-3 border-t border-border pt-5">
                  <Toggle label="Email me about new drops" defaultChecked />
                  <Toggle label="SMS order updates" defaultChecked />
                  <Toggle label="Personalized AI recommendations" defaultChecked />
                </div>
                <button className="bg-foreground text-background rounded-full px-6 py-3 font-medium hover:scale-105 transition">
                  Save changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, def }: { label: string; def: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <input defaultValue={def} className="mt-1 w-full glass rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary transition" />
    </label>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(!!defaultChecked);
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm">{label}</span>
      <button
        type="button"
        onClick={() => setOn(!on)}
        className={`w-11 h-6 rounded-full transition relative ${on ? "bg-primary" : "bg-muted"}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition ${on ? "left-5" : "left-0.5"}`} />
      </button>
    </label>
  );
}
