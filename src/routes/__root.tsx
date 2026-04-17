import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-strong rounded-3xl p-10 max-w-md text-center">
        <h1 className="font-heading text-7xl text-gradient">404</h1>
        <h2 className="mt-4 font-heading text-2xl">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We couldn't locate the bag you're looking for.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:scale-105 transition"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "kozohWorld — Premium Bags for Every Journey" },
      { name: "description", content: "Discover travel, office, leather, gym, laptop, trolley, backpacks, and utility bags. Powered by Kozoh.AI." },
      { name: "author", content: "kozohWorld" },
      { property: "og:title", content: "kozohWorld — Premium Bags for Every Journey" },
      { property: "og:description", content: "The premium D2C marketplace for every type of bag." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-24 md:pb-8">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
