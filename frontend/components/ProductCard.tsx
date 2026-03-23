"use client";

import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [toast, setToast] = useState<string | null>(null);

  const formattedPrice = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  const handleAdd = () => {
    addToCart(product);
    setToast(`Added "${product.title}" to cart`);
    window.setTimeout(() => setToast(null), 1500);
    // Note: `Add to Cart` will be extended to the cart page later.
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex-1">
        <div className="flex items-center justify-center bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="h-48 w-full object-contain p-4"
          />
        </div>

        <div className="px-4 pb-4 pt-2">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
              {product.category}
            </span>
          </div>

          <h3
            className="mt-3 text-sm font-semibold text-gray-900 [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden"
            title={product.title}
          >
            {product.title}
          </h3>

          <p className="mt-2 text-lg font-semibold text-gray-900">{formattedPrice}</p>
        </div>
      </div>

      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={handleAdd}
          className="w-full rounded-md bg-black px-4 py-2 text-white transition-opacity hover:opacity-90"
        >
          Add to Cart
        </button>

        {toast ? (
          <div
            className="mt-3 rounded-md bg-green-50 px-3 py-2 text-xs font-medium text-green-700"
            role="status"
            aria-live="polite"
          >
            {toast}
          </div>
        ) : null}
      </div>
    </div>
  );
}

