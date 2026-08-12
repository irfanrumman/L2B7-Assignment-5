import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
  title: "Contact Us - RentNest",
  description:
    "Get in touch with the RentNest team — we're here to help with anything from listings to your account.",
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "support@rentnest.com",
    href: "mailto:support@rentnest.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+201515272668",
    href: "tel:+201515272668",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "123 Main Street, Suite 400, New York, NY 10001",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Fri, 9:00am – 6:00pm",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/10" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 text-xs font-medium tracking-wide uppercase sm:text-sm">
            Contact Us
          </span>
          <h1 className="mt-5 font-display text-3xl font-semibold sm:text-5xl">
            We&apos;d love to hear from you
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/85 sm:text-lg">
            Questions about a listing, your account, or just want to say
            hello? Our team typically replies within one business day.
          </p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <p className="mt-4 text-sm font-medium tracking-wide text-primary uppercase">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground sm:text-base">
                    {item.value}
                  </p>
                </>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="card-interactive flex flex-col rounded-2xl border border-border bg-card p-6"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={item.label}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Message form + office image */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="text-sm font-medium tracking-wide text-primary uppercase">
                Send a Message
              </span>
              <h2 className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl">
                Drop us a line
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                Fill in the form and it&apos;ll open in your email app, ready
                to send straight to our support team.
              </p>

              <form
                action="mailto:support@rentnest.com"
                method="post"
                encType="text/plain"
                className="mt-8 space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" name="name" placeholder="Jane Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" placeholder="How can we help?" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us a bit more..."
                    className="min-h-32"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full gap-2 sm:w-auto">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>

            <div className="relative h-64 overflow-hidden rounded-3xl shadow-xl lg:h-auto">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80"
                alt="RentNest office"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-display text-lg font-semibold text-white">
                  RentNest HQ
                </p>
                <p className="text-sm text-white/85">
                  123 Main Street, Suite 400, New York, NY 10001
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
