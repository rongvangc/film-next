import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Movie Detail",
};

export default function DetailLayout({
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
