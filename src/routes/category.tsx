import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { products, brands, categories } from "@/lib/products";
import type { Category } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

interface Search { cat?: Category }

export const Route = createFileRoute("/category")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    cat: typeof s.cat === "string" ? (s.cat as Category) : undefined,
  }),
  component: CategoryPage,
  head: () => ({
    meta: [
      { title: "Shop all bags — kozohWorld" },
      { name: "description", content: "Browse premium bags by category, brand, and price." },
    ],
  }),
});

type Sort = "popular" | "price-asc" | "price-desc" | "newest";

function CategoryPage() {
  const { cat } = Route.useSearch();
  const [selectedCats, setSelectedCats] = useState<Category[]>(cat ? [cat] : []);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(600);
  const [sort, setSort] = useState<Sort>("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (selectedCats.length === 0 || selectedCats.includes(p.category)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
        p.price <= priceMax
    );
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "newest": list = [...list].sort((a, b) => Number(!!b.newArrival) - Number(!!a.newArrival)); break;
      default: list = [...list].sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [selectedCats, selectedBrands, priceMax, sort]);

  const toggle = <T,>(arr: T[], v: T, set: (a: T[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const Filters = (
    <div className="space-y-6">
      <div>
        <h4 className="font-heading text-xl mb-3">Categories</h4>
        <div className="flex flex-col gap-1.5">
          {categories.map((c) => (
            <label key={c.name} className="flex items-center gap-3 cursor-pointer hover:text-primary transition text-sm">
              <input
                type="checkbox"
                checked={selectedCats.includes(c.name)}
                onChange={() => toggle(selectedCats, c.name, setSelectedCats)}
                className="w-4 h-4 accent-primary rounded"
              />
              <span>{c.emoji} {c.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-heading text-xl mb-3">Brands</h4>
        <div className="flex flex-col gap-1.5">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-3 cursor-pointer hover:text-primary transition text-sm">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggle(selectedBrands, b, setSelectedBrands)}
                className="w-4 h-4 accent-primary rounded"
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-heading text-xl mb-3">Max price: <span className="text-primary">${priceMax}</span></h4>
        <input
          type="range" min={50} max={600} step={10}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>
    </div>
  );

  return (
    <div className="px-4 md:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <p className="text-sm text-muted-foreground mb-1">Marketplace</p>
          <h1 className="font-heading text-5xl md:text-6xl">Shop all bags</h1>
          <p className="text-muted-foreground mt-2">{filtered.length} bags · curated for you</p>
        </header>

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <div className="glass-strong rounded-3xl p-6 sticky top-28">
              <div className="flex items-center gap-2 mb-5">
                <SlidersHorizontal className="w-4 h-4" />
                <h3 className="font-heading text-2xl">Filters</h3>
              </div>
              {Filters}
            </div>
          </aside>

          <div>
            {/* Sort + mobile filters */}
            <div className="flex items-center justify-between mb-6 gap-3">
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden glass rounded-full px-4 py-2 flex items-center gap-2 text-sm"
              >
                <SlidersHorizontal className="w-3 h-3" /> Filters
              </button>
              <div className="relative ml-auto">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="appearance-none glass rounded-full pl-4 pr-10 py-2 text-sm cursor-pointer outline-none"
                >
                  <option value="popular">Most popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="glass rounded-3xl p-12 text-center">
                <p className="text-muted-foreground">No bags match those filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            )}
          </div>
        </div>

        {/* Mobile filter sheet */}
        {filtersOpen && (
          <div className="lg:hidden fixed inset-0 z-[60] animate-fade-in">
            <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
            <div className="absolute bottom-0 left-0 right-0 glass-strong rounded-t-[2.5rem] p-6 max-h-[85vh] overflow-y-auto animate-scale-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-2xl">Filters</h3>
                <button onClick={() => setFiltersOpen(false)} className="w-9 h-9 grid place-items-center rounded-full bg-foreground/5">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {Filters}
              <button onClick={() => setFiltersOpen(false)} className="mt-6 w-full bg-foreground text-background rounded-full py-3 font-medium">
                Show {filtered.length} results
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
