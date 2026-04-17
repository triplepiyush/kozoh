import { Link } from "@tanstack/react-router";
import { Heart, Plus, Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/store";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const wished = wishlist.includes(product.id);

  return (
    <div
      className="group relative glass rounded-3xl p-4 lift animate-fade-up"
      style={{ animationDelay: `${index * 60}ms`, opacity: 0 }}
    >
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-muted">
          <div className="absolute inset-0 bg-gradient-to-br opacity-50" style={{ background: "var(--gradient-mesh)" }} />
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-contain p-3 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3"
          />
          {product.oldPrice && (
            <span className="absolute top-3 left-3 glass-dark text-xs font-semibold px-2.5 py-1 rounded-full">
              −{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}
          {product.newArrival && (
            <span className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              New
            </span>
          )}
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className={`absolute top-7 right-7 w-9 h-9 grid place-items-center rounded-full glass-strong opacity-0 group-hover:opacity-100 transition-all ${
          wished ? "!opacity-100 text-destructive" : ""
        }`}
        aria-label="wishlist"
      >
        <Heart className={`w-4 h-4 ${wished ? "fill-current" : ""}`} />
      </button>

      <div className="pt-4 px-1">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
          <span>{product.brand}</span>
          <span>·</span>
          <Star className="w-3 h-3 fill-current text-amber-500" />
          <span>{product.rating}</span>
          <span className="text-muted-foreground/60">({product.reviews})</span>
        </div>
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="font-heading text-lg leading-snug mb-3 hover:text-primary transition line-clamp-2">{product.name}</h3>
        </Link>
        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-2xl">${product.price}</span>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">${product.oldPrice}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="w-10 h-10 grid place-items-center rounded-full bg-foreground text-background hover:scale-110 hover:rotate-90 transition-all duration-300 active:scale-95"
            aria-label="Add to cart"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
