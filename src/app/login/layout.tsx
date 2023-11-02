import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginLayout({
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
