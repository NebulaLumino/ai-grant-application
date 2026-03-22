import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Grant Application Generator",
  description: "Generate complete grant proposals with AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
