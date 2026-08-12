import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Tenant, Dhaka",
    quote:
      "RentNest made finding my apartment effortless. The verified listings gave me real peace of mind.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Tenant, Cairo",
    quote:
      "I sent a request and heard back from the landlord the same day — way faster than anything else I tried.",
    rating: 5,
  },
  {
    name: "Amina Yusuf",
    role: "Landlord",
    quote:
      "Managing requests and payments in one dashboard has saved me hours every week.",
    rating: 4,
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-sm font-medium tracking-wide text-primary uppercase">
            Testimonials
          </span>
          <h2 className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl">
            What our community says
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="card-interactive flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:p-7"
            >
              <Quote className="h-6 w-6 text-accent" />
              <p className="flex-1 text-sm leading-relaxed text-foreground sm:text-base">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < t.rating ? "fill-accent text-accent" : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
