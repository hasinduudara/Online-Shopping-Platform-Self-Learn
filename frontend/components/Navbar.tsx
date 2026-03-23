"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const syncAuth = () => {
      setHasToken(Boolean(localStorage.getItem("token")));
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "token") syncAuth();
    };

    syncAuth();
    window.addEventListener("auth-change", syncAuth);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("auth-change", syncAuth);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setHasToken(false);
    window.dispatchEvent(new Event("auth-change"));
    router.push("/");
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-gray-900">
          ShopFront
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link href="/" className="transition-colors hover:text-black">
            Home
          </Link>
          <Link href="/products" className="transition-colors hover:text-black">
            Products
          </Link>
          <Link href="/cart" className="transition-colors hover:text-black">
            Cart ({cartCount})
          </Link>
        </div>

        <div className="flex items-center gap-3 text-sm font-medium">
          {hasToken ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md bg-black px-4 py-2 text-white transition-opacity hover:opacity-90"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-black px-4 py-2 text-white transition-opacity hover:opacity-90"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
