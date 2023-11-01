import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Tv Detail",
};

export default function TvLayout({ children }: { children: React.ReactNode }) {
  return (
    <section lang="en" suppressHydrationWarning>
      {children}
    </section>
  );
}
