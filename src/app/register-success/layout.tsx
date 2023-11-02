import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Register Success",
};

export default function RegisterSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container" lang="en" suppressHydrationWarning>
      {children}
    </section>
  );
}
