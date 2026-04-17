import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, Tag, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Your cart — kozohWorld" }] }),
});

function CartPage() {
  const { items, updateQty, removeFromCart, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<{ code: string; off: number } | null>(null);

  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 12;
  const discount = applied ? Math.round(subtotal * applied.off) : 0;
  const tax = Math.round((subtotal - discount) * 0.08);
  const total = Math.max(0, subtotal - discount + shipping + tax);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "KOZOH10") setApplied({ code: "KOZOH10", off: 0.1 });
    else if (coupon.toUpperCase() === "WELCOME20") setApplied({ code: "WELCOME20", off: 0.2 });
    else setApplied(null);
  };

  if (items.length === 0) {
    return (
      <div className="px-4 md:px-8 animate-fade-in">
        <div className="max-w-2xl mx-auto glass-strong rounded-[2.5rem] p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-hero grid place-items-center text-white">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-4xl mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Start exploring premium bags for every journey.</p>
          <Link to="/category" className="inline-flex items-center gap-2 bg-foreground text-background rounded-full px-6 py-3 font-medium hover:scale-105 transition">
            Shop now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <p className="text-sm text-muted-foreground mb-1">Cart</p>
          <h1 className="font-heading text-5xl md:text-6xl">Your bag</h1>
          <p className="text-muted-foreground mt-2">{items.length} {items.length === 1 ? "item" : "items"}</p>
        </header>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product.id + item.color + item.size} className="glass rounded-3xl p-4 flex gap-4 lift">
                <Link to="/product/$id" params={{ id: item.product.id }} className="w-28 h-28 shrink-0 rounded-2xl overflow-hidden bg-secondary relative">
                  <div className="absolute inset-0 opacity-50" style={{ background: "var(--gradient-mesh)" }} />
                  <img src={item.product.image} alt={item.product.name} className="relative w-full h-full object-contain p-2" />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                  <Link to="/product/$id" params={{ id: item.product.id }}>
                    <h3 className="font-heading text-xl truncate hover:text-primary">{item.product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    {item.color && (
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full ring-1 ring-border" style={{ background: item.color }} />
                        {item.color}
                      </span>
                    )}
                    {item.size && <span>· Size {item.size}</span>}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="glass-strong rounded-full flex items-center">
                      <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="w-8 h-8 grid place-items-center hover:text-primary">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="w-8 h-8 grid place-items-center hover:text-primary">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-xl">${item.product.price * item.quantity}</span>
                      <button onClick={() => removeFromCart(item.product.id)} className="w-8 h-8 grid place-items-center text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating summary */}
          <aside>
            <div className="glass-strong rounded-3xl p-6 sticky top-28 space-y-4">
              <h3 className="font-heading text-2xl">Order summary</h3>

              <div className="glass rounded-2xl p-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary ml-1" />
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Coupon code"
                  className="flex-1 bg-transparent outline-none text-sm"
                />
                <button onClick={applyCoupon} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-foreground text-background hover:scale-105 transition">
                  Apply
                </button>
              </div>
              {applied && (
                <p className="text-xs text-primary">✓ {applied.code} applied · {applied.off * 100}% off</p>
              )}
              <p className="text-xs text-muted-foreground">Try <span className="font-mono">KOZOH10</span> or <span className="font-mono">WELCOME20</span></p>

              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal}</span></div>
                {discount > 0 && (
                  <div className="flex justify-between text-primary"><span>Discount</span><span>−${discount}</span></div>
                )}
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping}`}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Estimated tax</span><span>${tax}</span></div>
              </div>

              <div className="border-t border-border pt-4 flex justify-between items-baseline">
                <span className="font-heading text-xl">Total</span>
                <span className="font-heading text-3xl">${total}</span>
              </div>

              <Link to="/checkout" className="w-full gradient-hero text-white rounded-full py-3.5 font-medium hover:scale-[1.01] transition glow-blue flex items-center justify-center gap-2">
                Checkout <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/category" className="block text-center text-sm text-muted-foreground hover:text-foreground">
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
