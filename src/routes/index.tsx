import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Search, Star, Truck, Shield, RefreshCw } from "lucide-react";
import { useState } from "react";
import { products, categories, heroBag } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "kozohWorld - Premium Bags for Every Journey" },
      { name: "description", content: "Travel, office, leather, gym, laptop, trolley, backpacks, utility — every bag, one world." },
      { property: "og:title", content: "kozohWorld" },
      { property: "og:description", content: "Premium bags for every journey." },
    ],
  }),
});

function HomePage() {
  const trending = products.filter((p) => p.trending).slice(0, 4);
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 4);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);
  const [search, setSearch] = useState("");

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section className="relative px-4 md:px-8 pt-4 md:pt-12">
        <div className="max-w-7xl mx-auto relative">
          {/* Floating blobs */}
          <div className="absolute -top-10 -left-10 w-40 h-40 md:w-72 md:h-72 rounded-full bg-primary/30 blur-3xl animate-blob" />
          <div className="absolute top-20 right-0 w-48 h-48 md:w-96 md:h-96 rounded-full bg-accent/30 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
          <div className="absolute bottom-0 left-1/3 w-40 h-40 md:w-80 md:h-80 rounded-full bg-cyan/30 blur-3xl animate-blob" style={{ animationDelay: "6s" }} />

          <div className="relative grid lg:grid-cols-2 gap-8 items-center min-h-[80vh] py-12">
            <div className="space-y-6 z-10">
              <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-medium animate-fade-up">
                <Sparkles className="w-3 h-3 text-primary" />
                Powered by Kozoh.AI · New Spring Drop
              </span>
              <h1 className="font-heading text-6xl md:text-8xl leading-[0.95] tracking-tight animate-fade-up" style={{ animationDelay: "100ms", opacity: 0 }}>
                Every bag,
                <br />
                <em className="text-gradient not-italic">one world.</em>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md animate-fade-up" style={{ animationDelay: "200ms", opacity: 0 }}>
                A curated marketplace for travel, office, leather, gym, laptop, trolley, backpacks, and utility bags — engineered for the way you move.
              </p>

              {/* Search */}
              <div className="glass-strong rounded-full p-2 flex items-center gap-2 max-w-md animate-fade-up" style={{ animationDelay: "300ms", opacity: 0 }}>
                <Search className="w-4 h-4 ml-3 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search 'leather weekender'..."
                  className="flex-1 bg-transparent outline-none text-sm py-2"
                />
                <Link
                  to="/category"
                  className="rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:scale-105 transition flex items-center gap-1"
                >
                  Search <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4 animate-fade-up" style={{ animationDelay: "400ms", opacity: 0 }}>
                <div>
                  <div className="font-heading text-3xl">120k+</div>
                  <div className="text-xs text-muted-foreground">Happy travelers</div>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <div className="font-heading text-3xl flex items-center gap-1">4.9 <Star className="w-4 h-4 fill-amber-500 text-amber-500" /></div>
                  <div className="text-xs text-muted-foreground">Avg rating</div>
                </div>
                <div className="w-px h-10 bg-border hidden sm:block" />
                <div className="hidden sm:block">
                  <div className="font-heading text-3xl">50+</div>
                  <div className="text-xs text-muted-foreground">Brands</div>
                </div>
              </div>
            </div>

            {/* Hero bag */}
            <div className="relative h-[420px] md:h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 grid place-items-center">
                <div className="w-72 h-72 md:w-96 md:h-96 rounded-full glass-strong animate-pulse-ring" />
              </div>
              <img
                src={heroBag}
                alt="Premium kozohWorld backpack"
                width={1280}
                height={1280}
                className="relative z-10 w-[320px] md:w-[480px] h-auto object-contain animate-float drop-shadow-2xl"
              />
              {/* Floating mini badges */}
              <div className="absolute top-10 left-4 glass-strong rounded-2xl px-3 py-2 animate-float-slow">
                <div className="text-xs text-muted-foreground">Italian leather</div>
                <div className="font-heading text-lg">Aero Voyager</div>
              </div>
              <div className="absolute bottom-16 right-0 glass-strong rounded-2xl px-3 py-2 animate-float-slow" style={{ animationDelay: "2s" }}>
                <div className="text-xs text-muted-foreground">From</div>
                <div className="font-heading text-lg">$289</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING CATEGORIES */}
      <section className="px-4 md:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Browse</p>
              <h2 className="font-heading text-4xl md:text-5xl">Trending categories</h2>
            </div>
            <Link to="/category" className="hidden md:flex items-center gap-1 text-sm font-medium hover:text-primary transition">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                to="/category"
                search={{ cat: cat.name }}
                className="group relative glass rounded-3xl p-5 lift overflow-hidden animate-fade-up"
                style={{ animationDelay: `${i * 50}ms`, opacity: 0 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-50 group-hover:opacity-80 transition`} />
                <div className="relative">
                  <div className="text-3xl mb-2">{cat.emoji}</div>
                  <h3 className="font-heading text-2xl mb-1">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground">Shop now →</p>
                  <img src={cat.image} alt={cat.name} loading="lazy" className="w-24 h-24 object-contain absolute -bottom-2 -right-2 opacity-90 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="px-4 md:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Most loved</p>
              <h2 className="font-heading text-4xl md:text-5xl">Best sellers</h2>
            </div>
            <Link to="/category" className="hidden md:flex items-center gap-1 text-sm font-medium hover:text-primary transition">
              Shop all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {bestsellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* PREMIUM LEATHER BANNER */}
      <section className="px-4 md:px-8 mt-20">
        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2.5rem] gradient-charcoal text-white p-8 md:p-16 grid md:grid-cols-2 gap-8 items-center">
          <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-mesh)" }} />
          <div className="relative z-10 space-y-5">
            <span className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 text-xs">
              <Sparkles className="w-3 h-3" /> Atelier Collection
            </span>
            <h2 className="font-heading text-5xl md:text-6xl leading-tight">
              The Heritage<br />
              <em className="text-gradient-cyan not-italic">leather</em> drop.
            </h2>
            <p className="text-white/70 max-w-md">
              Vegetable-tanned, hand-stitched in small batches. Built to age beautifully — and to be passed down.
            </p>
            <Link to="/category" search={{ cat: "Leather" }} className="inline-flex items-center gap-2 bg-white text-foreground rounded-full px-6 py-3 text-sm font-medium hover:scale-105 transition">
              Explore the collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative h-72 md:h-96 flex items-center justify-center">
            <div className="absolute w-72 h-72 rounded-full bg-cyan/40 blur-3xl animate-blob" />
            <img src={categories[2].image} alt="Heritage leather tote" loading="lazy" className="relative z-10 h-full object-contain animate-float drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* TRENDING NOW */}
      <section className="px-4 md:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-primary" /> Kozoh.AI picks
              </p>
              <h2 className="font-heading text-4xl md:text-5xl">Trending right now</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="px-4 md:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-1">Just landed</p>
            <h2 className="font-heading text-4xl md:text-5xl">New arrivals</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="px-4 md:px-8 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Truck, t: "Free worldwide shipping", d: "On orders over $150" },
            { icon: Shield, t: "Lifetime warranty", d: "On every Kozoh original" },
            { icon: RefreshCw, t: "60-day returns", d: "Free, no questions asked" },
          ].map(({ icon: Icon, t, d }, i) => (
            <div key={i} className="clay rounded-3xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl gradient-hero grid place-items-center text-white shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading text-xl">{t}</div>
                <div className="text-xs text-muted-foreground">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="px-4 md:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm text-muted-foreground mb-1">From our community</p>
            <h2 className="font-heading text-4xl md:text-5xl">Loved worldwide</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Maya Chen", role: "Photographer · Tokyo", text: "The Aero Voyager survived 18 countries with me. Looks better than the day I bought it.", rating: 5 },
              { name: "Jordan Reyes", role: "Founder · Lisbon", text: "Finally a briefcase that doesn't look corporate. The Executive Slim is a daily favorite.", rating: 5 },
              { name: "Aisha Patel", role: "Designer · Mumbai", text: "Heritage Tote is unreal. The leather quality is on par with bags 3× the price.", rating: 5 },
            ].map((r, i) => (
              <div key={i} className="glass rounded-3xl p-6 lift">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-hero grid place-items-center text-white font-heading">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="px-4 md:px-8 mt-20">
        <div className="max-w-4xl mx-auto glass-strong rounded-[2.5rem] p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative">
            <h2 className="font-heading text-4xl md:text-5xl mb-3">Join the world.</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">Early drops, member-only sales, and stories from the road.</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="glass rounded-full p-2 flex items-center gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent outline-none text-sm px-4 py-2"
              />
              <button className="rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:scale-105 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
