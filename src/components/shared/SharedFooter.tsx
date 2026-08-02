import Link from "next/link";
import { Home } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Home className="h-5 w-5 text-primary" />
              <span className="text-foreground">RentNest</span>
            </Link>
            <p className="text-xs text-muted-foreground">
              Your trusted platform for finding the perfect rental home.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link href="/properties" className="text-muted-foreground hover:text-primary transition">
              Browse Properties
            </Link>
            <Link href="/register" className="text-muted-foreground hover:text-primary transition">
              Create Account
            </Link>
            <Link href="/login" className="text-muted-foreground hover:text-primary transition">
              Sign In
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} RentNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}