"use client";

import { LuckyProvider } from "@/providers/lucky-context";

export default function App({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <LuckyProvider>
        <div>{children}</div>    
      </LuckyProvider>
    );
  }