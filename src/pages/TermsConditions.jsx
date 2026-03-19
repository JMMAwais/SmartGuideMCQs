import Header from "../components/Header";
import Footer from "../components/Footer";
import { FileText, BadgeCheck, Scale, Mail } from "lucide-react";

const termsHighlights = [
  {
    title: "Fair use",
    description:
      "Use MCQPrep for lawful educational purposes and avoid actions that disrupt the platform, copy content unfairly, or misuse site resources.",
    icon: BadgeCheck,
  },
  {
    title: "Content accuracy",
    description:
      "We work to keep MCQs accurate and useful, but users should still verify critical information before relying on it for exams or decisions.",
    icon: FileText,
  },
  {
    title: "Legal framework",
    description:
      "These terms govern your use of the site and help set clear expectations for acceptable use, intellectual property, and service limitations.",
    icon: Scale,
  },
];

const termsSections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using MCQPrep, you agree to these Terms and Conditions. If you do not agree, please discontinue use of the website.",
  },
  {
    title: "2. Educational Use Only",
    body: "MCQPrep is intended for learning, revision, and practice. Content is provided for informational and educational support and should not be treated as official exam authority.",
  },
  {
    title: "3. User Responsibilities",
    body: "You agree not to misuse the platform, attempt unauthorized access, interfere with site operations, or use automated methods to scrape or reproduce content at scale.",
  },
  {
    title: "4. Intellectual Property",
    body: "Site design, branding, content organization, and original materials on MCQPrep remain protected. You may use the site personally, but not republish or commercialize content without permission.",
  },
  {
    title: "5. External Resources",
    body: "Some MCQs may reference third-party videos, links, or resources. We are not responsible for the content, availability, or policies of those external services.",
  },
  {
    title: "6. No Guarantee",
    body: "We aim to keep the platform useful and available, but we do not guarantee uninterrupted access, complete accuracy, or fitness for a particular purpose.",
  },
  {
    title: "7. Limitation of Liability",
    body: "To the maximum extent permitted by law, MCQPrep will not be liable for indirect, incidental, or consequential losses resulting from use of the platform.",
  },
  {
    title: "8. Changes to Terms",
    body: "We may revise these terms when the platform evolves. Updated terms become effective when posted on this page.",
  },
];

function TermsConditions() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Top Section */}
        <section className="border-b border-border bg-card">
          <div className="container mx-auto grid gap-8 px-4 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-16">

            <div className="space-y-5">
              <span className="inline-flex w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                Terms & Conditions
              </span>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Clear terms for using MCQPrep responsibly and professionally.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  These terms explain acceptable use of the platform, ownership of content, and important limitations related to educational materials.
                </p>
              </div>
            </div>

            {/* Info Card */}
            <div className="rounded-3xl border border-border bg-card shadow-md p-6 space-y-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Effective date
              </p>
              <p className="text-3xl font-bold text-foreground">March 19, 2026</p>
              <p className="text-sm leading-6 text-muted-foreground">
                For questions about these terms, please contact our support team before using the service commercially.
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
            {termsHighlights.map(({ title, description, icon: Icon }) => (
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

        {/* Terms Sections */}
        <section className="container mx-auto px-4 pb-16">
          <div className="rounded-3xl border border-border bg-card shadow p-6 sm:p-8 space-y-8">
            {termsSections.map((section) => (
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

export default TermsConditions;