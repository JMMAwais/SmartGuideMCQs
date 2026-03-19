import Header from "../components/Header";
import Footer from "../components/Footer";
import { ShieldCheck, Lock, Eye, Mail } from "lucide-react";

const privacyHighlights = [
  {
    title: "Information we collect",
    description:
      "We collect the details you share directly with us, such as contact information, messages, and basic usage activity needed to improve the platform.",
    icon: Eye,
  },
  {
    title: "How we use data",
    description:
      "Your information helps us respond to inquiries, improve MCQ content quality, maintain site performance, and provide a better learning experience.",
    icon: ShieldCheck,
  },
  {
    title: "How we protect it",
    description:
      "We use reasonable administrative and technical safeguards to protect information from unauthorized access, misuse, or disclosure.",
    icon: Lock,
  },
];

const policySections = [
  {
    title: "1. Information We Collect",
    body: "We may collect your name, email address, contact details, submitted messages, and non-sensitive usage data such as visited pages, search behavior, and device/browser information.",
  },
  {
    title: "2. How We Use Information",
    body: "We use collected information to answer support requests, improve our MCQ library, monitor platform quality, understand usage trends, and communicate essential service updates.",
  },
  {
    title: "3. Cookies and Analytics",
    body: "We may use cookies or similar technologies to remember preferences, measure performance, and improve usability. You can manage cookies through your browser settings.",
  },
  {
    title: "4. Data Sharing",
    body: "We do not sell your personal information. We may share limited information with trusted service providers when necessary to operate, secure, or improve the platform.",
  },
  {
    title: "5. Data Retention",
    body: "We retain information only as long as reasonably needed for support, operational, legal, or security purposes, then delete or anonymize it when appropriate.",
  },
  {
    title: "6. Your Rights",
    body: "You may contact us to request access, correction, or deletion of personal information you have shared with us, subject to legal and operational requirements.",
  },
  {
    title: "7. Third-Party Links",
    body: "Our website may contain links to third-party websites or video resources. We are not responsible for the privacy practices or content of those external sites.",
  },
  {
    title: "8. Policy Updates",
    body: "We may update this Privacy Policy from time to time. Continued use of the platform after updates means you accept the revised policy.",
  },
];

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Top Section */}
        <section className="border-b border-border bg-card">
          <div className="container mx-auto grid gap-8 px-4 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-16">

            <div className="space-y-5">
              <span className="inline-flex w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                Privacy Policy
              </span>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Your privacy matters while you prepare, practice, and learn.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  This policy explains what information MCQPrep may collect, how it is used, and the steps we take to protect it.
                </p>
              </div>
            </div>

            {/* Info Card */}
            <div className="rounded-3xl border border-border bg-card shadow-md p-6 space-y-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Last updated
              </p>
              <p className="text-3xl font-bold text-foreground">March 19, 2026</p>
              <p className="text-sm leading-6 text-muted-foreground">
                If you have privacy questions, contact our support team and we will review your request promptly.
              </p>
              <a
                href="mailto:info@mcqprep.com"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <Mail className="h-4 w-4" />
                info@mcqprep.com
              </a>
            </div>

          </div>
        </section>

        {/* Highlights Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid gap-5 md:grid-cols-3">
            {privacyHighlights.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="rounded-3xl border border-border bg-card shadow p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Policy Sections */}
        <section className="container mx-auto px-4 pb-16">
          <div className="rounded-3xl border border-border bg-card shadow p-6 sm:p-8 space-y-8">
            {policySections.map((section) => (
              <div
                key={section.title}
                className="border-b border-border pb-6 last:border-b-0 last:pb-0"
              >
                <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground sm:text-base">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;