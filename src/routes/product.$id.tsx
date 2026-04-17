import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag, Star, Truck, Shield, RefreshCw, Sparkles, Check } from "lucide-react";
import { products } from "@/lib/products";
import { useCart } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
  notFoundComponent: () => (
    <div className="px-4 py-20 text-center">
      <div className="glass-strong rounded-3xl p-10 max-w-md mx-auto">
        <h1 className="font-heading text-3xl mb-2">Bag not found</h1>
        <Link to="/category" className="text-primary">Browse all bags</Link>
      </div>
    </div>
  ),
});

function ProductPage() {
  const { id } = Route.useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const router = useRouter();

  const [color, setColor] = useState(product?.colors[0]);
  const [size, setSize] = useState(product?.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <div className="px-4 py-20 text-center">
        <div className="glass-strong rounded-3xl p-10 max-w-md mx-auto">
          <h1 className="font-heading text-3xl mb-2">Bag not found</h1>
          <Link to="/category" className="text-primary">Browse all bags</Link>
        </div>
      </div>
    );
  }

  const wished = wishlist.includes(product.id);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const gallery = [product.image, product.image, product.image, product.image];

  return (
    <div className="px-4 md:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link to="/category" className="hover:text-foreground">Shop</Link>
          {" / "}
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="space-y-4">
            <div
              className="relative glass-strong rounded-[2.5rem] aspect-square overflow-hidden cursor-zoom-in"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
            >
              <div className="absolute inset-0 opacity-50" style={{ background: "var(--gradient-mesh)" }} />
              <img
                src={gallery[activeImg]}
                alt={product.name}
                className={`relative w-full h-full object-contain p-12 transition-transform duration-500 ${zoom ? "scale-150" : "scale-100"}`}
              />
              {product.bestseller && (
                <span className="absolute top-5 left-5 glass-dark text-xs font-semibold px-3 py-1.5 rounded-full">
                  Bestseller
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square rounded-2xl overflow-hidden glass transition-all ${activeImg === i ? "ring-2 ring-primary scale-95" : "hover:scale-95"}`}
                >
                  <img src={g} alt="" className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{product.brand} · {product.category}</p>
              <h1 className="font-heading text-5xl leading-tight">{product.name}</h1>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-amber-500 text-amber-500" : "text-muted"}`} />
                  ))}
                </div>
                <span className="text-sm">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-heading text-5xl">${product.price}</span>
              {product.oldPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">${product.oldPrice}</span>
                  <span className="text-sm font-semibold text-primary">
                    Save ${product.oldPrice - product.price}
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              or 4 interest-free payments of <span className="text-foreground font-semibold">${(product.price / 4).toFixed(2)}</span> · No-cost EMI available
            </p>

            <p className="text-foreground/80 leading-relaxed">{product.description}</p>

            {/* Color */}
            <div>
              <div className="text-sm font-semibold mb-2">Color: <span className="text-muted-foreground font-normal">{color}</span></div>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-10 h-10 rounded-full ring-2 ring-offset-2 ring-offset-background transition ${color === c ? "ring-foreground" : "ring-transparent"}`}
                    style={{ background: c }}
                    aria-label={c}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            {product.sizes && (
              <div>
                <div className="text-sm font-semibold mb-2">Size</div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`px-4 py-2 rounded-full text-sm transition ${size === s ? "bg-foreground text-background" : "glass hover:bg-foreground/5"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Actions */}
            <div className="flex items-center gap-3">
              <div className="glass rounded-full flex items-center">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 grid place-items-center hover:text-primary">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 grid place-items-center hover:text-primary">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <button
                onClick={() => addToCart(product, { color, size, quantity: qty })}
                className="flex-1 glass-strong rounded-full py-3 font-medium hover:bg-foreground/5 transition flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add to cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 grid place-items-center glass rounded-full hover:scale-105 transition ${wished ? "text-destructive" : ""}`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wished ? "fill-current" : ""}`} />
              </button>
            </div>
            <button
              onClick={() => {
                addToCart(product, { color, size, quantity: qty });
                router.navigate({ to: "/checkout" });
              }}
              className="w-full gradient-hero text-white rounded-full py-4 font-medium hover:scale-[1.01] transition glow-blue"
            >
              Buy now
            </button>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[
                { icon: Truck, label: "Free shipping" },
                { icon: RefreshCw, label: "60-day returns" },
                { icon: Shield, label: "Lifetime warranty" },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} className="glass rounded-2xl p-3 text-center">
                  <Icon className="w-4 h-4 mx-auto mb-1 text-primary" />
                  <div className="text-xs">{label}</div>
                </div>
              ))}
            </div>

            {/* Delivery */}
            <div className="glass rounded-3xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Truck className="w-4 h-4 text-primary" /> Delivery timeline
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex justify-between"><span>Standard (free)</span><span>5–7 business days</span></div>
                <div className="flex justify-between"><span>Express ($12)</span><span>2–3 business days</span></div>
                <div className="flex justify-between"><span>Next day ($24)</span><span>1 business day</span></div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-heading text-2xl mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* People also bought */}
        <section className="mt-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-primary" /> Kozoh.AI
              </p>
              <h2 className="font-heading text-4xl">People also bought</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-20 glass-strong rounded-[2.5rem] p-8 md:p-12">
          <div className="grid md:grid-cols-[1fr_2fr] gap-10">
            <div>
              <h2 className="font-heading text-4xl mb-2">Reviews</h2>
              <div className="font-heading text-6xl text-gradient">{product.rating}</div>
              <div className="flex mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-amber-500 text-amber-500" : "text-muted"}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Based on {product.reviews} reviews</p>
            </div>
            <div className="space-y-4">
              {[
                { name: "Elena K.", text: "Exceeded every expectation. The leather is buttery and the hardware feels solid.", rating: 5 },
                { name: "Mike T.", text: "Used it on a 3-week trip — zero issues. Worth every penny.", rating: 5 },
                { name: "Sarah W.", text: "Beautiful design. Slightly smaller than expected but still perfect for daily use.", rating: 4 },
              ].map((r, i) => (
                <div key={i} className="glass rounded-2xl p-5">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-sm">{r.name}</span>
                    <div className="flex">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
