import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Movies",
};

export default function MovieLayout({
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
