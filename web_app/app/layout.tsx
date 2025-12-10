import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tourify - Product Onboarding Made Simple",
  description: "Create interactive product tours that help users discover value faster.",
  icons: {
    icon: '/icon.png'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable}  antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster theme="dark" />
      </body>
    </html>
  );
}
