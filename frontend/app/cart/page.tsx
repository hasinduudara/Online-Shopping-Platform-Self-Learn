"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/types";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default function CartPage() {
  const router = useRouter();
  const {
    cart: cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEmpty = cartItems.length === 0;

  const checkoutPayload = useMemo(() => {
    return {
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };
  }, [cartItems]);

  const handleCheckout = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await apiFetch<{ status: string }>("/orders", {
        method: "POST",
        body: JSON.stringify(checkoutPayload),
      });

      if (response?.status === "PAID") {
        clearCart();
        // Simple success feedback for now
        window.alert("Payment Successful! Order Placed.");
        router.push("/orders");
        return;
      }

      setError("Payment declined. Please try again.");
    } catch {
      setError("Payment declined. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isEmpty) {
    return (
      <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4">
        <div className="text-center">
          <p className="mb-6 text-lg font-medium text-gray-800">Your cart is empty</p>
          <button
            type="button"
            onClick={() => router.push("/products")}
            className="rounded-md bg-black px-5 py-2 text-white transition-opacity hover:opacity-90"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {error ? <p className="mb-4 text-sm font-medium text-red-600">{error}</p> : null}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item: CartItem) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-24 w-24 flex-shrink-0 rounded-lg object-contain bg-gray-50 p-2"
              />

              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{formatCurrency(item.price)} each</p>

                <div className="mt-3 flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Quantity</span>

                  <div className="flex items-center rounded-md border border-gray-200 bg-white">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-gray-800 transition-colors hover:bg-gray-50"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <div className="min-w-[2rem] px-2 text-center text-sm font-semibold text-gray-900">
                      {item.quantity}
                    </div>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-gray-800 transition-colors hover:bg-gray-50"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-2 sm:items-end">
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:col-span-1">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Order Summary</h2>

            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <span className="text-sm font-medium text-gray-700">Total</span>
              <span className="text-lg font-semibold text-gray-900">{formatCurrency(cartTotal)}</span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isProcessing}
              className="mt-5 w-full rounded-md bg-black px-4 py-3 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isProcessing ? "Processing Payment..." : "Proceed to Checkout"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

