"use client";

import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      {children}
    </CartProvider>
  );
}

