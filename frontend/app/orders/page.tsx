"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { Order } from "@/types";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString();
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadOrders() {
      setLoading(true);
      setError(null);

      try {
        const data = await apiFetch<Order[]>("/orders");
        if (!cancelled) {
          setOrders(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "Failed to load orders.";
          setError(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadOrders();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-semibold text-gray-900">Your Orders</h1>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <span className="text-sm font-medium text-gray-700">Loading orders...</span>
        </div>
      ) : error ? (
        <p className="text-sm font-medium text-red-600">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-sm font-medium text-gray-700">No past orders found.</p>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li key={order.id} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="text-base font-semibold text-gray-900">{order.id}</p>
                </div>

                <div className="mt-3 sm:mt-0">
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="text-base font-semibold text-gray-900">{formatDate(order.orderDate)}</p>
                </div>

                <div className="mt-3 sm:mt-0">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-base font-semibold text-gray-900">{order.status}</p>
                </div>

                <div className="mt-3 sm:mt-0">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-base font-semibold text-gray-900">{formatCurrency(order.totalAmount)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

