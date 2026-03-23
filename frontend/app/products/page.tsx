"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { Product } from "@/types";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setLoading(true);
      setError(null);

      try {
        const data = await apiFetch<Product[]>("/products");
        if (!cancelled) {
          if (!Array.isArray(data)) {
            throw new Error("Unexpected products response.");
          }
          setProducts(data);
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Failed to load products.";
          setError(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <span className="text-sm font-medium text-gray-700">Loading products...</span>
        </div>
      ) : error ? (
        <p className="text-center text-sm font-medium text-red-600">{error}</p>
      ) : (
        <>
          <h1 className="mb-6 text-3xl font-semibold text-gray-900">Our Products</h1>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

