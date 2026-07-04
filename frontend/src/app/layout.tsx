import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Automated Property Manager",
  description: "Landlord and tenant experiences for a frictionless Australian property management platform"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}