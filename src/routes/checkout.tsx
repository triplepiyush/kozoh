import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Check, CreditCard, Smartphone, Wallet, Apple, Lock } from "lucide-react";
import { useCart } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({ meta: [{ title: "Checkout — kozohWorld" }] }),
});

type Step = 1 | 2 | 3;
type Pay = "card" | "apple" | "gpay" | "wallet";

function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [pay, setPay] = useState<Pay>("card");
  const [success, setSuccess] = useState(false);

  const shipping = subtotal > 150 ? 0 : 12;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const placeOrder = () => {
    setSuccess(true);
    setTimeout(() => {
      clearCart();
      router.navigate({ to: "/dashboard" });
    }, 2200);
  };

  if (items.length === 0 && !success) {
    return (
      <div className="px-4 py-20 text-center">
        <div className="glass-strong rounded-3xl p-10 max-w-md mx-auto">
          <h1 className="font-heading text-3xl mb-2">Your cart is empty</h1>
          <Link to="/category" className="text-primary">Start shopping</Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="px-4 py-12 animate-fade-in">
        <div className="glass-strong rounded-[2.5rem] p-12 max-w-lg mx-auto text-center relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/30 blur-3xl animate-blob" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-accent/30 blur-3xl animate-blob" />
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-hero grid place-items-center text-white animate-scale-in glow-blue">
              <Check className="w-10 h-10" />
            </div>
            <h1 className="font-heading text-5xl mb-2">Order placed</h1>
            <p className="text-muted-foreground">Your bags are on their way. Check email for tracking.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Checkout</p>
            <h1 className="font-heading text-5xl md:text-6xl">Almost yours</h1>
          </div>
          <Link to="/cart" className="text-sm text-muted-foreground hover:text-foreground">← Edit cart</Link>
        </header>

        {/* Steps */}
        <div className="flex items-center gap-3 mb-8">
          {[
            { n: 1, label: "Address" },
            { n: 2, label: "Payment" },
            { n: 3, label: "Review" },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center gap-3 flex-1">
              <div className={`w-9 h-9 rounded-full grid place-items-center font-semibold text-sm transition ${
                step >= s.n ? "bg-foreground text-background" : "glass text-muted-foreground"
              }`}>
                {step > s.n ? <Check className="w-4 h-4" /> : s.n}
              </div>
              <span className={`text-sm font-medium ${step >= s.n ? "" : "text-muted-foreground"}`}>{s.label}</span>
              {i < 2 && <div className={`flex-1 h-px ${step > s.n ? "bg-foreground" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="glass-strong rounded-3xl p-8 space-y-6">
            {step === 1 && (
              <div className="animate-fade-in space-y-4">
                <h2 className="font-heading text-3xl">Shipping address</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="First name" defaultValue="Alex" />
                  <Field label="Last name" defaultValue="Morgan" />
                </div>
                <Field label="Email" type="email" defaultValue="alex@kozohworld.com" />
                <Field label="Address" defaultValue="221B Baker Street" />
                <div className="grid grid-cols-3 gap-3">
                  <Field label="City" defaultValue="London" />
                  <Field label="State" defaultValue="ENG" />
                  <Field label="ZIP" defaultValue="NW1 6XE" />
                </div>
                <button onClick={() => setStep(2)} className="bg-foreground text-background rounded-full px-8 py-3 font-medium hover:scale-105 transition mt-4">
                  Continue to payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in space-y-5">
                <h2 className="font-heading text-3xl">Payment</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: "card" as const, label: "Card", icon: CreditCard },
                    { id: "apple" as const, label: "Apple Pay", icon: Apple },
                    { id: "gpay" as const, label: "Google Pay", icon: Smartphone },
                    { id: "wallet" as const, label: "Wallet", icon: Wallet },
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setPay(id)}
                      className={`relative glass rounded-2xl p-4 flex flex-col items-center gap-2 transition-all ${
                        pay === id ? "ring-2 ring-primary scale-95 glow-blue" : "hover:scale-95"
                      }`}
                    >
                      <Icon className={`w-6 h-6 transition ${pay === id ? "text-primary scale-110" : ""}`} />
                      <span className="text-xs font-medium">{label}</span>
                      {pay === id && (
                        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary text-white grid place-items-center">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {pay === "card" && (
                  <div className="space-y-3 animate-fade-in">
                    <Field label="Card number" defaultValue="4242 4242 4242 4242" />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Expiry" defaultValue="12 / 28" />
                      <Field label="CVC" defaultValue="123" />
                    </div>
                  </div>
                )}
                {pay !== "card" && (
                  <div className="glass rounded-2xl p-6 text-center animate-fade-in">
                    <p className="text-sm text-muted-foreground">You'll be redirected to confirm with {pay === "apple" ? "Apple Pay" : pay === "gpay" ? "Google Pay" : "your wallet"}.</p>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(1)} className="glass rounded-full px-6 py-3 font-medium hover:bg-foreground/5">Back</button>
                  <button onClick={() => setStep(3)} className="bg-foreground text-background rounded-full px-8 py-3 font-medium hover:scale-105 transition">
                    Review order
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in space-y-4">
                <h2 className="font-heading text-3xl">Review & confirm</h2>
                <div className="glass rounded-2xl p-4">
                  <div className="text-xs text-muted-foreground">Shipping to</div>
                  <div className="text-sm font-medium">Alex Morgan · 221B Baker Street, London NW1 6XE</div>
                </div>
                <div className="glass rounded-2xl p-4">
                  <div className="text-xs text-muted-foreground">Paying with</div>
                  <div className="text-sm font-medium capitalize">{pay === "card" ? "Card ending 4242" : pay === "apple" ? "Apple Pay" : pay === "gpay" ? "Google Pay" : "kozoh Wallet"}</div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(2)} className="glass rounded-full px-6 py-3 font-medium hover:bg-foreground/5">Back</button>
                  <button onClick={placeOrder} className="flex-1 gradient-hero text-white rounded-full py-3 font-medium hover:scale-[1.01] transition glow-blue flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" /> Place order · ${total}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <aside>
            <div className="glass-strong rounded-3xl p-6 sticky top-28 space-y-4">
              <h3 className="font-heading text-2xl">Summary</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto no-scrollbar">
                {items.map((it) => (
                  <div key={it.product.id} className="flex gap-3">
                    <div className="w-14 h-14 rounded-xl bg-secondary overflow-hidden relative shrink-0">
                      <img src={it.product.image} alt="" className="w-full h-full object-contain p-1" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-foreground text-background text-[10px] grid place-items-center">{it.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{it.product.name}</div>
                      <div className="text-xs text-muted-foreground">{it.product.brand}</div>
                    </div>
                    <div className="text-sm font-semibold">${it.product.price * it.quantity}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping}`}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>${tax}</span></div>
              </div>
              <div className="border-t border-border pt-3 flex justify-between items-baseline">
                <span className="font-heading text-lg">Total</span>
                <span className="font-heading text-3xl">${total}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type = "text", defaultValue }: { label: string; type?: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="mt-1 w-full glass rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary transition"
      />
    </label>
  );
}
