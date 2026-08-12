import type { Metadata, Viewport } from "next";
import { Cormorant, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import { Navbar } from "@/components/shared/navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { Footer } from "@/components/shared/SharedFooter";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RentNest - Find Your Perfect Home",
  description:
    "Modern rental property marketplace connecting tenants with landlords",
  creator: "Irfan Uddin",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2EBDC" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1211" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`bg-background ${cormorant.variable} ${inter.variable}`}
    >
      <body className="antialiased font-sans">
        <Toaster position="top-center" richColors />
        <TooltipProvider>
          <ThemeProvider>
            <AuthProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
             
                <main className="flex-1">{children}</main>
              

                <Footer />
              </div>
            </AuthProvider>
          </ThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}