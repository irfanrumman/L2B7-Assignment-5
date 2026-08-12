import { ShieldCheck, Wallet, Zap, Headphones } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    description:
      "Every listing is reviewed before it goes live, so you browse with confidence.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description:
      "No hidden fees — see the exact rent and terms before you request a viewing.",
  },
  {
    icon: Zap,
    title: "Instant Requests",
    description:
      "Send a rental request in minutes and hear back directly from the landlord.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Our team is on hand to help with anything from search to move-in.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="relative overflow-hidden bg-secondary">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-accent/5" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-sm font-medium tracking-wide text-primary uppercase">
            Why RentNest
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
            A better way to rent
          </h2>
        </div>

        <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-6 sm:mt-16 sm:gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isLeft = i % 2 === 0;
            return (
              <div
                key={feature.title}
                className={`flex ${isLeft ? "justify-start" : "justify-end"}`}
              >
                <div className="card-interactive w-[80%] rounded-3xl border border-border/60 bg-linear-to-br from-card to-card/70 p-6 shadow-xl sm:w-[52%] sm:p-8">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary sm:text-sm">
                      Feature 0{i + 1}
                    </span>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-background shadow-sm">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-extrabold text-foreground sm:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
