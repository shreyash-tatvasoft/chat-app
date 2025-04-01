"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SessionProvider>
        <Navbar />
        {children}
      </SessionProvider>
    </div>
  );
}

