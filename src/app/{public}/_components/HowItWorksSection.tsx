import { Search, FileCheck, KeyRound } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search",
    description: "Filter by location, price and property type to find what fits.",
  },
  {
    icon: FileCheck,
    title: "Request",
    description: "Send a rental request directly to the landlord with your move-in details.",
  },
  {
    icon: KeyRound,
    title: "Move In",
    description: "Pay securely through RentNest and get the keys to your new home.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-sm font-medium tracking-wide text-primary uppercase">
            How It Works
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
            Three steps to your next home
          </h2>
        </div>

        <div className="mt-10 grid gap-8 sm:mt-14 sm:grid-cols-3 sm:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-card sm:p-8"
              >
                <span className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground shadow-card">
                  {i + 1}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="max-w-60 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
