import Header from "../components/Header";
import Footer from "../components/Footer";
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react";

const contactCards = [
  {
    title: "Email us",
    value: "info@mcqprep.com",
    description: "For subject requests, corrections, and general support.",
    href: "mailto:info@mcqprep.com",
    icon: Mail,
  },
  {
    title: "Call us",
    value: "+92 300 1234567",
    description: "Speak with our team during working hours.",
    href: "tel:+923001234567",
    icon: Phone,
  },
  {
    title: "Visit us",
    value: "Lahore, Pakistan",
    description: "A focused academic support team serving test prep students.",
    href: "#",
    icon: MapPin,
  },
];

function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Top Section */}
        <section className="border-b border-border bg-card">
          <div className="container mx-auto grid gap-10 px-4 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-16">

            <div className="space-y-6">
              <span className="inline-flex w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                Contact MCQPrep
              </span>

              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Get in touch with our academic support team.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  Reach out for subject suggestions, reported answer corrections, partnership inquiries, or help navigating the platform.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="grid gap-4 sm:grid-cols-3">
             {contactCards.map(({ title, value, description, href, icon: Icon }) => (
                <a
                    key={title}
                    href={href}
                    className="group rounded-2xl border border-border bg-background p-4 transition-all hover:border-primary hover:shadow-md"
                >
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-primary">
                    <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-base font-semibold text-foreground">{title}</h2>
                    <p className="mt-1 text-sm font-medium text-primary">{value}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="overflow-hidden rounded-3xl border border-border shadow-md">
              <div className="border-b border-border bg-secondary px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                      Response Promise
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-foreground">
                      We usually reply within 24 hours
                    </h2>
                  </div>
                  <div className="hidden rounded-2xl bg-background px-4 py-3 text-sm text-muted-foreground sm:block">
                    Mon - Sat
                  </div>
                </div>
              </div>

              <div className="space-y-5 px-6 py-6 bg-card">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Full Name
                    </label>
                    <input
                      id="name"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-input px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-input px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <input
                    id="subject"
                    placeholder="What can we help you with?"
                    className="w-full rounded-lg border border-input px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Write your message here"
                    className="w-full min-h-[150px] rounded-lg border border-input px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>

                <button className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity w-full sm:w-auto">
                  Send Message
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Bottom Section */}
        <section className="container mx-auto grid gap-6 px-4 py-12 lg:grid-cols-[0.9fr_1.1fr]">

          {/* Office Details */}
          <div className="rounded-3xl border border-border bg-card shadow p-6 space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Office details</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                We support students preparing for competitive exams, school tests, and general knowledge practice.
              </p>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3 rounded-2xl bg-secondary p-4">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Location</p>
                  <p>Lahore, Punjab, Pakistan</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-secondary p-4">
                <Clock className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">Working hours</p>
                  <p>Monday to Saturday — 9:00 AM to 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Contact */}
          <div className="rounded-3xl border border-border bg-card shadow p-6">
            <h2 className="text-2xl font-bold text-foreground">Why contact us?</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Report an incorrect answer or explanation.",
                "Request a new subject or MCQ category.",
                "Ask about partnerships or promotions.",
                "Get help using MCQPrep effectively.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border bg-background p-4 text-sm leading-6 text-muted-foreground"
                >
                  <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-semibold text-primary">
                    ✓
                  </span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;