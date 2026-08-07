// src/app/about/page.tsx
import { Home, Shield, Users, Zap, Search, FileCheck, KeyRound, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CTASection } from "./_components/CTASection";

export const metadata = {
  title: "About Us - RentNest",
  description:
    "Learn about RentNest's mission to connect tenants with trusted landlords across the country.",
};

const stats = [
  { value: "10,000+", label: "Properties Listed" },
  { value: "500+", label: "Verified Landlords" },
  { value: "25,000+", label: "Happy Tenants" },
  { value: "20+", label: "Cities Covered" },
];

const values = [
  {
    icon: Shield,
    title: "Verified Listings",
    description:
      "Every property goes through a verification process before it appears on RentNest, so you browse with confidence.",
  },
  {
    icon: Zap,
    title: "Fast & Simple",
    description:
      "Search, shortlist, and send a rental request in minutes — no phone tag, no paperwork chasing.",
  },
  {
    icon: Users,
    title: "Built for Both Sides",
    description:
      "Tools for tenants to find a home and tools for landlords to manage requests, all in one place.",
  },
];

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Search & Filter",
    description: "Browse listings by location, price, and property type to find what fits.",
  },
  {
    icon: FileCheck,
    number: "02",
    title: "Send a Request",
    description: "Submit a rental request directly to the landlord with your move-in details.",
  },
  {
    icon: KeyRound,
    number: "03",
    title: "Move In",
    description: "Once approved, handle payment securely through RentNest and get your keys.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero — image background with gradient overlay */}
      {/* <section className="relative">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/60 to-foreground/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-medium text-background/90 tracking-wide uppercase mb-4 border border-background/30 rounded-full px-3 py-1">
              About RentNest
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-background leading-[1.1]">
              Finding a home shouldn&apos;t feel like a second job.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-background/85 leading-relaxed max-w-xl">
              RentNest connects tenants with trusted landlords through a
              platform built on transparency, speed, and trust — from your
              first search to the day you get your keys.
            </p>
          </div>
        </div>
      </section> */}

      {/* Hero — image background with gradient overlay + accent highlight */}
      {/* Hero — balanced two-side composition with floating stat card */}

      {/* <section className="relative min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] flex items-end">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/10 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-8 items-end"> */}
            {/* Left — main content */}
            {/* <div>
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-background tracking-wide uppercase mb-5 bg-primary/90 backdrop-blur-sm rounded-full px-4 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-background" />
                About RentNest
              </span>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-6xl font-semibold text-background leading-[1.05] tracking-tight">
                Finding a home
                <br />
                shouldn&apos;t feel like a{" "}
                <span className="italic text-primary-foreground bg-primary px-2 sm:px-3 inline-block rounded-lg -rotate-1 mt-2">
                  second job
                </span>
                .
              </h1>

              <p className="mt-6 sm:mt-8 text-base sm:text-lg text-background/90 leading-relaxed max-w-xl border-l-2 border-primary/70 pl-4">
                RentNest connects tenants with trusted landlords through a
                platform built on transparency, speed, and trust — from your
                first search to the day you get your keys.
              </p>
            </div> */}

            {/* Right — floating stat card, fills the empty space + adds credibility */}
            {/* <div className="hidden lg:flex flex-col gap-4 bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-card-hover border border-border/50">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <p className="font-display text-3xl font-semibold text-foreground">
                    10,000+
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Properties listed nationwide
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Home className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-display text-xl font-semibold text-foreground">
                    500+
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Verified landlords
                  </p>
                </div>
                <div>
                  <p className="font-display text-xl font-semibold text-foreground">
                    4.8/5
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Average tenant rating
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Hero */}
    {/* Hero */}
     {/* Hero */}
    {/* Hero */}
      <section className="relative min-h-[500px] sm:min-h-[560px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
            alt="Modern apartment building"
            className="w-full h-full object-cover"
          />
          {/* Fixed literal dark overlay — NOT a theme token, so it never flips in dark mode */}
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white tracking-wide uppercase mb-5 bg-primary rounded-full px-4 py-1.5">
            About RentNest
          </span>

          <h1
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
          >
            Finding a home shouldn&apos;t feel like a{" "}
            <span className="text-[#3ECFB8]">second job</span>.
          </h1>

          <p
            className="mt-6 text-base sm:text-lg text-white/95 leading-relaxed"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}
          >
            RentNest connects tenants with trusted landlords through a
            platform built on transparency, speed, and trust — from your
            first search to the day you get your keys.
          </p>
        </div>
      </section>



      {/* Stats */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl sm:text-4xl font-semibold">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-primary-foreground/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story — overlapping image collage like reference */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-sm font-medium text-primary tracking-wide uppercase">
                Our Story
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mt-3 leading-tight">
                Built from a frustrating rental search
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                RentNest started with a simple problem: renting a home meant
                juggling scattered listings, unreturned calls, and landlords
                who were impossible to verify. We built a single place where
                tenants can search with confidence and landlords can manage
                requests without the back-and-forth.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Today, RentNest supports thousands of listings across the
                country, with tools for browsing, requesting, and paying —
                all built around trust on both sides of the transaction.
              </p>

              <div className="mt-8 flex items-start gap-4 border-l-2 border-primary pl-4">
                <Quote className="w-6 h-6 text-primary shrink-0" />
                <p className="text-foreground italic">
                  We wanted renting to feel as simple as it should&apos;ve
                  always been.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative h-[340px] sm:h-[420px] lg:h-[480px]">
              <div className="absolute top-0 left-0 w-[65%] h-[75%] rounded-2xl overflow-hidden shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80"
                  alt="Modern living room interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[55%] h-[55%] rounded-2xl overflow-hidden shadow-card-hover border-4 border-background">
                <img
                  src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=700&q=80"
                  alt="Cozy apartment bedroom"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values — numbered instead of generic icon cards */}
      {/* <section className="bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-8">
            <div className="lg:col-span-1">
              <span className="text-sm font-medium text-primary tracking-wide uppercase">
                Why RentNest
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mt-3 leading-tight">
                What makes us different
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Three principles guide every feature we build.
              </p>
            </div>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-x-8 gap-y-10">
              {values.map((value, i) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className={i === 2 ? "sm:col-span-2" : ""}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {value.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pl-13 sm:pl-0">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section> */}

      {/* Values — clean icon-card grid, properly aligned */}
      <section className="bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-xl">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">
              Why RentNest
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mt-3 leading-tight">
              What makes us different
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Three principles guide every feature we build.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="card-interactive flex flex-col rounded-2xl bg-card border border-border p-6 sm:p-7"
                >
                  <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mt-5">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works — connected timeline */}
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-xl mx-auto text-center">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">
              How It Works
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mt-3">
              Three steps to your next home
            </h2>
          </div>

          <div className="mt-14 relative">
            {/* connecting line — desktop only */}
            <div className="hidden sm:block absolute top-6 left-[16.5%] right-[16.5%] h-px bg-border" />

            <div className="grid sm:grid-cols-3 gap-10 sm:gap-6">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="relative text-center">
                    <div className="relative inline-flex w-12 h-12 rounded-full bg-primary items-center justify-center shadow-card">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <p className="mt-4 font-display text-sm font-semibold text-primary tracking-wide">
                      STEP {step.number}
                    </p>
                    <h3 className="font-display text-lg font-semibold text-foreground mt-1">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-[240px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA — background image band */}
      {/* <section className="relative">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/90" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <Home className="w-10 h-10 mx-auto mb-5 text-primary-foreground/80" />
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-primary-foreground">
            Ready to find your next home?
          </h2>
          <p className="mt-4 text-primary-foreground/85 text-base sm:text-lg">
            Join thousands of tenants who found their perfect rental through
            RentNest.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/properties">Browse Properties</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </div>
      </section> */}

    {/* <section className="relative">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <Home className="w-10 h-10 mx-auto mb-5 text-white/80" />
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold text-white"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
          >
            Ready to find your next home?
          </h2>
          <p className="mt-4 text-white/85 text-base sm:text-lg">
            Join thousands of tenants who found their perfect rental through
            RentNest.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center rounded-md px-8 py-3 text-sm font-medium bg-[#3ECFB8] text-[#0a1211] transition-colors hover:bg-[#5ddcc6]"
            >
              Browse Properties
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-md px-8 py-3 text-sm font-medium border border-white/50 text-white bg-transparent transition-colors hover:bg-white/15 hover:border-white/70"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section> */}

      {/* <section className="relative overflow-hidden">
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
            className="w-10 h-10 mx-auto mb-5 text-white/80 animate-in fade-in slide-in-from-bottom-4 duration-700"
          />
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold text-white animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
          >
            Ready to find your next home?
          </h2>
          <p className="mt-4 text-white/85 text-base sm:text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
            Join thousands of tenants who found their perfect rental through
            RentNest.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
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
      </section> */}
      <CTASection />
    </div>
  );
}