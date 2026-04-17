import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, TrendingUp, MapPin, Users, BarChart3, Brain, Activity, Send, Lightbulb, Zap } from "lucide-react";
import { useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/ai")({
  component: AIPage,
  head: () => ({
    meta: [
      { title: "Kozoh.AI — Smart bag discovery" },
      { name: "description", content: "Personalized recommendations, trending picks, and demand forecasting powered by Kozoh.AI." },
    ],
  }),
});

const recommended = products.slice(0, 4);
const trendingNear = [products[6], products[3], products[10], products[7]];
const peopleAlso = [products[4], products[1], products[2], products[8]];

const forecastData = [
  { cat: "Travel", current: 84, next: 96, growth: "+14%" },
  { cat: "Backpacks", current: 72, next: 88, growth: "+22%" },
  { cat: "Leather", current: 65, next: 71, growth: "+9%" },
  { cat: "Office", current: 58, next: 54, growth: "−7%" },
  { cat: "Gym", current: 49, next: 62, growth: "+27%" },
  { cat: "Trolley", current: 42, next: 51, growth: "+21%" },
  { cat: "Laptop", current: 38, next: 41, growth: "+8%" },
  { cat: "Utility", current: 31, next: 44, growth: "+42%" },
];

const suggestedPrompts = [
  "Show me bags for business travel",
  "Weekend gym bags under $150",
  "Sustainable leather backpacks",
  "Trending bags in my area",
];

// AI Response function to filter products based on prompt
const getAIResponse = (userPrompt: string) => {
  const prompt = userPrompt.toLowerCase();
  let response = {
    title: "AI Results",
    description: "",
    products: [] as typeof products,
  };

  // Gym bags under $150
  if ((prompt.includes("gym") || prompt.includes("athletic")) && prompt.includes("150")) {
    response.title = "Weekend Gym Bags Under $150";
    response.description = "Perfect for quick workouts and gym sessions. High-quality, affordable options for active lifestyle.";
    response.products = products.filter((p) => p.category === "Gym" && p.price <= 150).slice(0, 4);
  }
  // Business travel
  else if (prompt.includes("business") && (prompt.includes("travel") || prompt.includes("trip"))) {
    response.title = "Professional Travel Bags";
    response.description = "Sophisticated bags designed for the modern business traveler. Style meets functionality.";
    response.products = products.filter((p) => (p.category === "Travel" || p.category === "Office") && p.bestseller).slice(0, 4);
  }
  // Leather bags
  else if (prompt.includes("leather")) {
    response.title = "Premium Leather Collection";
    response.description = "Crafted from the finest leather with timeless design. Investment pieces that age beautifully.";
    response.products = products.filter((p) => p.category === "Leather").slice(0, 4);
  }
  // Trending
  else if (prompt.includes("trending") || prompt.includes("popular")) {
    response.title = "Trending Bags";
    response.description = "What's hot right now in the bag world. Customer favorites and bestsellers.";
    response.products = products.filter((p) => p.trending || p.bestseller).slice(0, 4);
  }
  // Backpacks
  else if (prompt.includes("backpack") || prompt.includes("back pack")) {
    response.title = "Backpack Collection";
    response.description = "Versatile backpacks for every occasion. From daily commutes to weekend adventures.";
    response.products = products.filter((p) => p.category === "Backpacks").slice(0, 4);
  }
  // Default: show all products
  else {
    response.title = "Results for Your Query";
    response.description = "Here are the bags we recommend based on your search.";
    response.products = products.slice(0, 4);
  }

  return response;
};

function AIPage() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<any>(null);
  const [submittedPrompt, setSubmittedPrompt] = useState("");

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      setIsLoading(true);
      setSubmittedPrompt(prompt);
      // Simulate AI thinking time for demo effect
      setTimeout(() => {
        const response = getAIResponse(prompt);
        setAiResponse(response);
        setIsLoading(false);
      }, 1200);
    }
  };

  const handleSuggestedPrompt = (suggestedPrompt: string) => {
    setPrompt(suggestedPrompt);
    // Auto-submit
    setTimeout(() => {
      setIsLoading(true);
      setSubmittedPrompt(suggestedPrompt);
      const response = getAIResponse(suggestedPrompt);
      setTimeout(() => {
        setAiResponse(response);
        setIsLoading(false);
      }, 1200);
    }, 200);
  };

  return (
    <div className="px-4 md:px-8 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <section className="relative glass-strong rounded-[2.5rem] p-8 md:p-14 mb-12 overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/30 blur-3xl animate-blob" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/30 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
          <div className="relative">
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs mb-4">
              <Brain className="w-3 h-3 text-primary" /> Kozoh.AI · v2.4
            </span>
            <h1 className="font-heading text-5xl md:text-7xl leading-[0.95] max-w-2xl">
              Bags that
              <br />
              <em className="text-gradient not-italic">find you.</em>
            </h1>
            <p className="text-muted-foreground mt-5 max-w-md">
              Our intelligence layer learns your style, lifestyle, and travel patterns to surface bags before you knew you needed them.
            </p>
            <div className="flex flex-wrap gap-2 mt-6 mb-8">
              {["Style match", "Travel pattern", "Material preference", "Color affinity"].map((t) => (
                <span key={t} className="glass rounded-full px-3 py-1.5 text-xs font-medium">{t}</span>
              ))}
            </div>

            {/* Prompt Input Bar */}
            <form onSubmit={handlePromptSubmit} className="mt-12">
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Input
                      type="text"
                      placeholder="Ask me anything... Tell me about your style, budget, or travel plans"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="h-12 md:h-14 pr-12 rounded-xl glass backdrop-blur-xl border-white/20 focus-visible:ring-primary text-base placeholder:text-muted-foreground/60"
                    />
                    <button
                      type="submit"
                      disabled={!prompt.trim() || isLoading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Suggested Prompts */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lightbulb className="w-4 h-4 text-primary/60" />
                    Try asking:
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {suggestedPrompts.map((suggestedPrompt) => (
                      <button
                        key={suggestedPrompt}
                        onClick={() => handleSuggestedPrompt(suggestedPrompt)}
                        className="text-left p-3 rounded-lg glass hover:bg-white/10 transition-all border border-white/10 hover:border-primary/30 text-sm text-muted-foreground hover:text-foreground group"
                      >
                        <span className="flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 mt-0.5 text-primary/40 group-hover:text-primary transition-colors shrink-0" />
                          {suggestedPrompt}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>

        {/* AI Loading State */}
        {isLoading && (
          <section className="mb-16 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0s" }} />
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0.4s" }} />
              </div>
              <p className="text-sm text-muted-foreground">Kozoh.AI is analyzing your request...</p>
            </div>
          </section>
        )}

        {/* AI Response Results */}
        {aiResponse && !isLoading && (
          <section className="mb-16 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-accent" /> AI Powered
                </p>
                <h2 className="font-heading text-4xl md:text-5xl">{aiResponse.title}</h2>
              </div>
              <button
                onClick={() => setAiResponse(null)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear ✕
              </button>
            </div>
            <p className="text-muted-foreground mb-8 max-w-xl">{aiResponse.description}</p>
            <p className="text-xs text-muted-foreground mb-6 flex items-center gap-2">
              <Brain className="w-3 h-3 text-primary" />
              Query: <em>{submittedPrompt}</em>
            </p>
            {aiResponse.products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {aiResponse.products.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="glass rounded-2xl p-8 text-center">
                <p className="text-muted-foreground">No bags match your criteria. Try another search!</p>
              </div>
            )}
          </section>
        )}

        {/* Recommended for you - Hidden when showing AI results */}
        {!aiResponse && (
          <>
        {/* Recommended for you */}
        <section className="mb-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2"><Sparkles className="w-3 h-3 text-primary" /> Personalized</p>
              <h2 className="font-heading text-4xl md:text-5xl">Recommended for you</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {recommended.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>

        {/* Trending near you */}
        <section className="mb-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2"><MapPin className="w-3 h-3 text-accent" /> Around you</p>
              <h2 className="font-heading text-4xl md:text-5xl">Trending near you</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {trendingNear.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>

        {/* People also bought */}
        <section className="mb-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2"><Users className="w-3 h-3 text-primary" /> Community signal</p>
              <h2 className="font-heading text-4xl md:text-5xl">People also bought</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {peopleAlso.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>

        {/* Forecast Dashboard */}
        <section className="glass-strong rounded-[2.5rem] p-8 md:p-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2"><BarChart3 className="w-3 h-3 text-primary" /> Admin preview</p>
              <h2 className="font-heading text-4xl">Demand forecast · 30 days</h2>
            </div>
            <span className="glass rounded-full px-3 py-1.5 text-xs flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-primary" /> Live model
            </span>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { label: "Predicted units", val: "12.4k", change: "+18%" },
              { label: "Revenue forecast", val: "$2.1M", change: "+22%" },
              { label: "Conversion lift", val: "4.7%", change: "+0.8" },
              { label: "Stock at risk", val: "9 SKUs", change: "Action" },
            ].map((k) => (
              <div key={k.label} className="clay rounded-2xl p-4">
                <div className="text-xs text-muted-foreground">{k.label}</div>
                <div className="font-heading text-3xl mt-1">{k.val}</div>
                <div className="text-xs text-primary font-semibold mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {k.change}
                </div>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="glass rounded-3xl p-6">
            <h4 className="font-heading text-xl mb-5">Category demand · current vs forecast</h4>
            <div className="space-y-3">
              {forecastData.map((row) => (
                <div key={row.cat} className="grid grid-cols-[100px_1fr_60px] items-center gap-3">
                  <span className="text-sm font-medium">{row.cat}</span>
                  <div className="space-y-1">
                    <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full gradient-hero transition-all duration-1000"
                        style={{ width: `${row.next}%` }}
                      />
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-foreground/30" style={{ width: `${row.current}%` }} />
                    </div>
                  </div>
                  <span className={`text-xs font-semibold text-right ${row.growth.startsWith("−") ? "text-destructive" : "text-primary"}`}>
                    {row.growth}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-full gradient-hero" /> Forecast (30d)</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-full bg-foreground/30" /> Current</span>
            </div>
          </div>
        </section>
          </>
        )}
      </div>
    </div>
  );
}

export default AIPage;
