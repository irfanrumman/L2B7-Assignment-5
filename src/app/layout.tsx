import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import { Navbar } from "@/components/shared/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ViewTransition } from "react";
import { Toaster } from "sonner";
import { Footer } from "@/components/shared/SharedFooter";

export const metadata: Metadata = {
  title: "RentNest - Find Your Perfect Home",
  description:
    "Modern rental property marketplace connecting tenants with landlords",
  creator: "Irfan Uddin",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F0EB" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        <Toaster position="top-center" richColors />
        <TooltipProvider>
          <ThemeProvider>
            <AuthProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                {/* <ViewTransition> */}
                  <main className="flex-1">{children}</main>
                {/* </ViewTransition> */}

                <Footer />
              </div>
            </AuthProvider>
          </ThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
