import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Game night",
  description: "The games on our shelf and who won what.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
