import { Building2, ShieldCheck, Users, MapPinned } from "lucide-react";

const stats = [
  { icon: Building2, value: "10,000+", label: "Properties Listed" },
  { icon: ShieldCheck, value: "500+", label: "Verified Landlords" },
  { icon: Users, value: "25,000+", label: "Happy Tenants" },
  { icon: MapPinned, value: "20+", label: "Cities Covered" },
];

export function StatsSection() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid grid-cols-2 gap-6 text-center sm:gap-8 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/15">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-display text-2xl font-semibold sm:text-3xl md:text-4xl">
                  {stat.value}
                </p>
                <p className="text-xs text-primary-foreground/80 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
