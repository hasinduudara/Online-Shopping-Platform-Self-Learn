import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-black text-white">
      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-950 to-black p-6 sm:p-10">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.16),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.10),transparent_50%),radial-gradient(circle_at_50%_95%,rgba(255,255,255,0.08),transparent_45%)]" />

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80">
                New arrivals every day
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
              </p>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Welcome to ShopFront.
              </h1>
              <p className="mt-4 text-base text-white/75 sm:text-lg">
                Discover quality products, add to your cart in seconds, and checkout with confidence.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
                >
                  Browse Products
                </Link>
                <Link
                  href="/cart"
                  className="inline-flex items-center justify-center rounded-md border border-white/15 px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:bg-white/5"
                >
                  View Cart
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-medium text-white/70">Reliable checkout</p>
                  <p className="mt-2 text-sm font-semibold">Fast confirmation</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-medium text-white/70">Smart cart</p>
                  <p className="mt-2 text-sm font-semibold">Adjust quantities</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-medium text-white/70">Order history</p>
                  <p className="mt-2 text-sm font-semibold">Track your purchases</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <h2 className="text-lg font-semibold">Shop in three steps</h2>
              <ol className="mt-4 space-y-3 text-sm text-white/75">
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
                    1
                  </span>
                  Find products you love.
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
                    2
                  </span>
                  Add to cart and adjust quantities.
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
                    3
                  </span>
                  Proceed to checkout and place your order.
                </li>
              </ol>

              <div className="mt-6">
                <p className="text-xs text-white/60">
                  Tip: Sign in for a smoother checkout experience and order tracking.
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Link
                    href="/login"
                    className="rounded-md border border-white/15 bg-black px-4 py-3 text-sm font-semibold text-white/90 transition-colors hover:bg-white/5"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
                  >
                    Create account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY CHIPS + TRUST */}
        <section className="mt-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Shop by category</h2>
              <p className="mt-2 text-sm text-white/70">A curated selection for every mood and budget.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Electronics", "Fashion", "Home", "Sports", "Beauty"].map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: "Curated deals",
                desc: "Find trending items and everyday favorites.",
              },
              {
                title: "Secure checkout",
                desc: "Clear steps from cart to confirmation.",
              },
              {
                title: "Fast support",
                desc: "Help when you need it, right away.",
              },
            ].map((x) => (
              <div key={x.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-base font-semibold">{x.title}</h3>
                <p className="mt-2 text-sm text-white/75">{x.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS + FAQ */}
        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">Loved by shoppers</h2>
            <p className="mt-2 text-sm text-white/70">Real feedback from real people.</p>

            <div className="mt-6 space-y-4">
              {[
                {
                  name: "Amina",
                  quote: "The cart is super easy to use. Checkout felt effortless.",
                },
                {
                  name: "Marco",
                  quote: "Great product layout and quick navigation. I found what I needed fast.",
                },
                {
                  name: "Sofia",
                  quote: "Order history is clear and I always know where my purchase stands.",
                },
              ].map((t) => (
                <div key={t.name} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm text-white/80">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-3 text-sm font-semibold text-white/90">- {t.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">Quick answers</h2>
            <p className="mt-2 text-sm text-white/70">Everything you need to know before you shop.</p>

            <div className="mt-6 space-y-4">
              {[
                {
                  q: "Can I start shopping without an account?",
                  a: "Yes—add items to your cart and checkout when you’re ready.",
                },
                {
                  q: "How do I adjust my order before checkout?",
                  a: "Use the cart page to increase or decrease quantities and remove items.",
                },
                {
                  q: "Where can I view past orders?",
                  a: "Your orders appear on the Orders page after checkout.",
                },
              ].map((item) => (
                <div key={item.q} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white/90">{item.q}</p>
                  <p className="mt-2 text-sm text-white/75">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex w-full items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Get the best offers</h2>
              <p className="mt-2 text-sm text-white/70">
                Subscribe for new arrivals, seasonal deals, and exclusive discounts.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Email address"
                className="h-11 flex-1 rounded-md border border-white/10 bg-black/30 px-4 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/30"
                required
              />
              <button
                type="button"
                className="h-11 rounded-md bg-white px-6 text-sm font-semibold text-black transition-opacity hover:opacity-90"
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
