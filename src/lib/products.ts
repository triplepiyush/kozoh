import bagTravel from "@/assets/bag-travel.png";
import bagOffice from "@/assets/bag-office.png";
import bagLeather from "@/assets/bag-leather.png";
import bagGym from "@/assets/bag-gym.png";
import bagBackpack from "@/assets/bag-backpack.png";
import bagLaptop from "@/assets/bag-laptop.png";
import bagTrolley from "@/assets/bag-trolley.png";
import bagUtility from "@/assets/bag-utility.png";
import heroBag from "@/assets/hero-bag.png";

export type Category =
  | "Travel"
  | "Office"
  | "Leather"
  | "Gym"
  | "Backpacks"
  | "Laptop"
  | "Trolley"
  | "Utility";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  category: Category;
  colors: string[];
  sizes?: string[];
  image: string;
  rating: number;
  reviews: number;
  trending?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  description: string;
  features: string[];
}

export const categories: { name: Category; emoji: string; image: string; gradient: string }[] = [
  { name: "Travel", emoji: "✈️", image: bagTravel, gradient: "from-blue-500/20 to-violet-500/20" },
  { name: "Office", emoji: "💼", image: bagOffice, gradient: "from-slate-500/20 to-blue-500/20" },
  { name: "Leather", emoji: "👜", image: bagLeather, gradient: "from-amber-500/20 to-orange-500/20" },
  { name: "Gym", emoji: "🏋️", image: bagGym, gradient: "from-cyan-500/20 to-blue-500/20" },
  { name: "Backpacks", emoji: "🎒", image: bagBackpack, gradient: "from-violet-500/20 to-fuchsia-500/20" },
  { name: "Laptop", emoji: "💻", image: bagLaptop, gradient: "from-blue-500/20 to-cyan-500/20" },
  { name: "Trolley", emoji: "🧳", image: bagTrolley, gradient: "from-slate-400/20 to-slate-600/20" },
  { name: "Utility", emoji: "🛠️", image: bagUtility, gradient: "from-cyan-500/20 to-violet-500/20" },
];

export const products: Product[] = [
  {
    id: "p1", name: "Aero Voyager 40L", brand: "Kozoh", price: 289, oldPrice: 349,
    category: "Travel", colors: ["#0a0a0f", "#3f3f46"], sizes: ["S", "M", "L"],
    image: bagTravel, rating: 4.8, reviews: 1284, trending: true, bestseller: true, newArrival: true,
    description: "Engineered for the modern traveler. Italian leather meets aerospace-grade hardware in a duffle that opens flat for effortless packing.",
    features: ["Full-grain Italian leather", "YKK Excella zippers", "Detachable shoulder strap", "Lifetime warranty"],
  },
  {
    id: "p2", name: "Executive Slim Brief", brand: "Noir", price: 219,
    category: "Office", colors: ["#1c1b2e", "#3f3f46"],
    image: bagOffice, rating: 4.7, reviews: 642, bestseller: true,
    description: "A briefcase reimagined. Slim silhouette, magnetic closures, and a dedicated 16\" laptop sleeve.",
    features: ["Magnetic closure", "16\" laptop sleeve", "RFID-blocking pocket", "Saffiano leather"],
  },
  {
    id: "p3", name: "Heritage Tote", brand: "Atelier", price: 459, oldPrice: 549,
    category: "Leather", colors: ["#a0522d", "#1c1b2e"],
    image: bagLeather, rating: 4.9, reviews: 892, trending: true,
    description: "Hand-stitched in small batches. Vegetable-tanned full-grain leather that ages beautifully with you.",
    features: ["Vegetable-tanned leather", "Hand-stitched", "Solid brass hardware", "Cotton canvas lining"],
  },
  {
    id: "p4", name: "Pulse Athletic Duffle", brand: "Volt", price: 149,
    category: "Gym", colors: ["#0a0a0f", "#3b82f6"], sizes: ["M", "L"],
    image: bagGym, rating: 4.6, reviews: 1502, trending: true, newArrival: true,
    description: "Engineered for performance. Ventilated shoe compartment, wet/dry split, and water-repellent shell.",
    features: ["Water-repellent shell", "Ventilated shoe pocket", "Wet/dry separator", "Reflective trim"],
  },
  {
    id: "p5", name: "Stratos Daypack", brand: "Kozoh", price: 179, oldPrice: 219,
    category: "Backpacks", colors: ["#1c1b2e", "#3f3f46"],
    image: bagBackpack, rating: 4.7, reviews: 2104, bestseller: true, newArrival: true,
    description: "The everyday carry, refined. Ergonomic straps, hidden security pocket, and weatherproof construction.",
    features: ["Ergonomic mesh straps", "Hidden anti-theft pocket", "Weatherproof zippers", "Padded laptop sleeve"],
  },
  {
    id: "p6", name: "Quantum Laptop Sleeve", brand: "Noir", price: 129,
    category: "Laptop", colors: ["#1c1b2e", "#0a0a0f"], sizes: ["13\"", "15\"", "16\""],
    image: bagLaptop, rating: 4.5, reviews: 488,
    description: "Slim, structured, secure. Microfiber lining and shock-absorbing foam for ultimate device protection.",
    features: ["Shock-absorbing foam", "Microfiber lining", "Magnetic closure", "Slim profile"],
  },
  {
    id: "p7", name: "Orbit Carry-On Spinner", brand: "Atelier", price: 399, oldPrice: 479,
    category: "Trolley", colors: ["#d1d1d6", "#1c1b2e"], sizes: ["Cabin", "Medium", "Large"],
    image: bagTrolley, rating: 4.8, reviews: 1876, trending: true, bestseller: true,
    description: "Aerospace polycarbonate shell, whisper-quiet 360° spinner wheels, integrated TSA lock.",
    features: ["Polycarbonate shell", "360° spinner wheels", "TSA-approved lock", "USB charging port"],
  },
  {
    id: "p8", name: "Tactical Sling Pro", brand: "Volt", price: 99,
    category: "Utility", colors: ["#0a0a0f", "#22d3ee"],
    image: bagUtility, rating: 4.6, reviews: 734, newArrival: true,
    description: "Modular, mission-ready. MOLLE-compatible webbing and quick-release shoulder strap.",
    features: ["MOLLE webbing", "Quick-release strap", "Water-resistant", "Modular pockets"],
  },
  {
    id: "p9", name: "Nimbus Weekender", brand: "Kozoh", price: 329,
    category: "Travel", colors: ["#1c1b2e", "#a0522d"],
    image: bagTravel, rating: 4.7, reviews: 521,
    description: "The perfect 2–3 day companion. Soft structured form with rigid base.",
    features: ["Structured base", "Trolley sleeve", "Interior organizer", "Premium leather handles"],
  },
  {
    id: "p10", name: "Meridian Briefcase", brand: "Atelier", price: 289,
    category: "Office", colors: ["#1c1b2e"],
    image: bagOffice, rating: 4.6, reviews: 312,
    description: "Architectural lines meet timeless craft.",
    features: ["Hand-finished edges", "Detachable laptop sleeve", "Document organizer", "Brass feet"],
  },
  {
    id: "p11", name: "Apex Trail Pack 28L", brand: "Volt", price: 199,
    category: "Backpacks", colors: ["#3f3f46", "#22d3ee"],
    image: bagBackpack, rating: 4.8, reviews: 967, trending: true,
    description: "Built for trails and city alike.",
    features: ["28L capacity", "Hydration compatible", "Compression straps", "Rain cover included"],
  },
  {
    id: "p12", name: "Zenith Roller XL", brand: "Atelier", price: 549,
    category: "Trolley", colors: ["#1c1b2e", "#d1d1d6"], sizes: ["Medium", "Large", "XL"],
    image: bagTrolley, rating: 4.9, reviews: 432, newArrival: true,
    description: "Maximum capacity, minimum compromise.",
    features: ["Expandable +15%", "Double spinner wheels", "TSA lock", "10-year warranty"],
  },
];

export const brands = Array.from(new Set(products.map((p) => p.brand)));

export { heroBag };
