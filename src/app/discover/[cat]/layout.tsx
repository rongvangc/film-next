import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Discover",
};

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section lang="en" suppressHydrationWarning>
      {children}
    </section>
  );
}
