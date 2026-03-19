import { Link } from "react-router-dom";
import { subjects } from "../data/mcqData";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PromoBanner from "../components/PromoBanner";
import ContactSection from "../components/ContactSection";
import { BadgeCheck, ChevronRight, MessageSquare, Search, Sparkles, TrendingUp } from "lucide-react";

function Index() {
  const allMcqs = subjects.flatMap((s) =>
    s.mcqs.map((mcq) => ({ ...mcq, subjectName: s.name, subjectId: s.id }))
  );

  const mainSubs = subjects.filter((s) => s.category === "main");
  const otherSubs = subjects.filter((s) => s.category === "other");
  const featuredSubjects = mainSubs.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Subject Nav */}
      <nav className="overflow-x-auto border-b border-border bg-card">
        <div className="container mx-auto flex items-center gap-1 px-4 py-2">
          {mainSubs.map((s) => (
            <Link
              key={s.id}
              to={`/subject/${s.id}`}
              className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {s.name}
            </Link>
          ))}
          <Link
            to="/subjects"
            className="shrink-0 rounded-md px-3 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            OTHER
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto grid gap-10 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-16">
          
          <div className="space-y-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90">
              <Sparkles className="h-3.5 w-3.5" />
              Smart exam preparation
            </span>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Find high-value MCQs faster and prepare with more confidence.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                Explore subject-wise questions, discover trending categories, and practice from a cleaner exam-prep hub built for daily revision.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-white/85">
              {[
                "Subject-wise practice",
                "Quick revision flow",
                "Competitive exam focus",
              ].map((item) => (
                <div key={item} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2">
                  <BadgeCheck className="h-4 w-4" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Hero Card */}
          <div className="rounded-[2rem] border border-white/15 bg-white p-5 text-foreground shadow-md sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Explore by interest
                </p>
                <h2 className="mt-2 text-2xl font-bold text-foreground">
                  Start from the right category
                </h2>
              </div>
              <div className="hidden rounded-2xl bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground sm:block">
                {allMcqs.length}+ MCQs
              </div>
            </div>

            <div className="relative mb-5">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search exams, subjects or MCQs"
                className="h-12 w-full rounded-2xl border border-input bg-background pl-11 text-sm outline-none focus:border-primary"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {featuredSubjects.map((subject) => (
                <Link
                  key={subject.id}
                  to={`/subject/${subject.id}`}
                  className="group rounded-2xl border border-border bg-background p-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-2xl">{subject.icon}</p>
                      <h3 className="mt-3 text-base font-semibold text-foreground">{subject.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{subject.mcqs.length} practice questions</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-primary" />
                Updated categories for everyday practice
              </div>
              <Link
                to="/subjects"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              >
                Browse all subjects
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Promo Banner */}
      <PromoBanner />

      {/* Main Content */}
      <div className="container mx-auto flex gap-6 px-4 py-6">

        <main className="min-w-0 flex-1">
          <div className="flex flex-col gap-4">
            {allMcqs.map((mcq) => (
              <article
                key={`${mcq.subjectId}-${mcq.id}`}
                className="rounded-xl border border-border bg-card p-5 shadow transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <Link
                    to={`/subject/${mcq.subjectId}`}
                    className="text-base font-bold leading-snug text-primary hover:underline"
                  >
                    {mcq.question}
                  </Link>
                  <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                    <MessageSquare className="h-3.5 w-3.5" /> 0
                  </span>
                </div>

                <div className="mb-3 flex flex-col gap-1.5">
                  {mcq.options.map((opt, oi) => (
                    <div
                      key={oi}
                      className={`text-sm ${
                        oi === mcq.correctIndex
                          ? "font-bold text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {String.fromCharCode(65 + oi)}. {opt}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                    {mcq.subjectName}
                  </span>
                  {mcq.videoUrl && (
                    <a
                      href={mcq.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-red-500 hover:underline flex items-center gap-1"
                    >
                      ▶ Watch Explanation Video
                    </a>
                  )}
                  <Link
                    to={`/subject/${mcq.subjectId}`}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Read More Details about this Mcq:
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="mb-5 rounded-xl border border-border bg-card p-4 shadow">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">
              Search
            </h3>
            <input
              type="text"
              placeholder="Search MCQs..."
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>

          <div className="mb-5 rounded-xl border border-border bg-card p-4 shadow">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">
              MCQPrep Menu
            </h3>
            <ul className="flex flex-col gap-1">
              {mainSubs.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/subject/${s.id}`}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                    {s.name} MCQs
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 shadow">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">
              Other Subjects
            </h3>
            <ul className="flex flex-col gap-1">
              {otherSubs.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/subject/${s.id}`}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                    {s.name} MCQs
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

      </div>

      {/* Contact Section */}
      <ContactSection />

      <Footer />
    </div>
  );
}

export default Index;