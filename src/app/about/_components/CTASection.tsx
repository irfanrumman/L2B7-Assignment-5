"use client"; // ফাইলের একদম উপরে, যেহেতু hook ব্যবহার করছি

import { useInView } from "@/hooks/useInView";
import { Home } from "lucide-react";
import Link from "next/link";
// ...বাকি imports

export function CTASection() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <Home
          className={`w-10 h-10 mx-auto mb-5 text-white/80 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        />
        <h2
          className={`font-display text-3xl sm:text-4xl font-semibold text-white transition-all duration-700 delay-100 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
        >
          Ready to find your next home?
        </h2>
        <p
          className={`mt-4 text-white/85 text-base sm:text-lg transition-all duration-700 delay-200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Join thousands of tenants who found their perfect rental through
          RentNest.
        </p>
        <div
          className={`mt-8 flex flex-col sm:flex-row gap-3 justify-center transition-all duration-700 delay-300 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Link
            href="/properties"
            className="inline-flex items-center justify-center rounded-md px-8 py-3 text-sm font-medium bg-[#3ECFB8] text-[#0a1211] transition-all duration-200 hover:bg-[#5ddcc6] hover:scale-105 hover:shadow-lg active:scale-100"
          >
            Browse Properties
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-md px-8 py-3 text-sm font-medium border border-white/50 text-white bg-transparent transition-all duration-200 hover:bg-white/15 hover:border-white/70 hover:scale-105 active:scale-100"
          >
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
}