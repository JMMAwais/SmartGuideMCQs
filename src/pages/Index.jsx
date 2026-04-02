import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { subjects } from "../data/mcqData";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import FAQ from "../components/FAQ";
import { getAllMcqs, getTopSubjects,getAllSubjects } from "../services/mcqService";
import {
  BadgeCheck, ChevronRight, ChevronLeft, FileText, MessageSquare,
  PlayCircle, Search, Sparkles, TrendingUp, ClipboardCheck
} from "lucide-react";

const MCQS_PER_PAGE = 10;

function Index() {
  const [currentPage, setCurrentPage] = useState(1);
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedMcq, setExpandedMcq] = useState(null);

  // Dynamic top subjects state
  const [topSubjects, setTopSubjects] = useState([]);
  const [subjectsLoading, setSubjectsLoading] = useState(true);

  const otherSubs = subjects.filter((s) => s.category === "other");

  const [otherSubjects, setOtherSubjects] = useState([]);

  // Fetch Top Subjects from API
  useEffect(() => {
    const fetchTopSubjects = async () => {
      try {
        setSubjectsLoading(true);
        const res = await getTopSubjects();
        if (res.success) {
          setTopSubjects(res.data);
        }
      } catch (err) {
        console.error("Top Subjects Error:", err);
      } finally {
        setSubjectsLoading(false);
      }
    };
    fetchTopSubjects();
  }, []);

  // Fetch MCQs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllMcqs(currentPage, MCQS_PER_PAGE);
        if (res.success) {
          const formattedMcqs = res.data.items.map((q) => ({
            ...q,
            options: q.options ?? [q.optionA, q.optionB, q.optionC, q.optionD]
          }));
          setMcqs(formattedMcqs);
          setTotalPages(Math.ceil(res.data.totalCount / res.data.pageSize));
        }
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);


  useEffect(() => {
  const fetchOtherSubjects = async () => {
    try {
      const res = await getAllSubjects();
      if (res.success) {
        // category 1 = Other
        setOtherSubjects(res.data.filter((s) => s.category === 1));
      }
    } catch (err) {
      console.error("Other Subjects Error:", err);
    }
  };
  fetchOtherSubjects();
}, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Subject Nav - Dynamic */}
      <nav className="overflow-x-auto border-b border-border bg-card">
        <div className="container mx-auto flex items-center gap-1 px-4 py-2">
          {subjectsLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-24 animate-pulse rounded-md bg-gray-200" />
            ))
          ) : (
            topSubjects.map((s) => (
              <Link
                key={s.id}
                to={`/subject/${s.id}`}
                 state={{ subjectName: s.name }}
                className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {s.name}
              </Link>
            ))
          )}
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
              {["Subject-wise practice", "Quick revision flow", "Competitive exam focus"].map((item) => (
                <div key={item} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2">
                  <BadgeCheck className="h-4 w-4" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Hero Card - Dynamic */}
          <div className="rounded-[2rem] border border-white/15 bg-white p-5 text-foreground shadow-md sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">Explore by interest</p>
                <h2 className="mt-2 text-2xl font-bold text-foreground">Start from the right category</h2>
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

            {/* Dynamic Subject Cards */}
            <div className="grid gap-3 sm:grid-cols-2">
              {subjectsLoading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-2xl border border-border bg-background p-4 animate-pulse">
                    <div className="h-4 w-28 rounded bg-gray-200 mb-2" />
                    <div className="h-3 w-20 rounded bg-gray-100" />
                  </div>
                ))
              ) : (
                topSubjects.map((subject) => (
                  <Link
                    key={subject.id}
                    to={`/subject/${subject.id}`}
                    state={{ subjectName: subject.name }}
                    className="group rounded-2xl border border-border bg-background p-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-foreground">{subject.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {subject.mcqCount} practice questions
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))
              )}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-primary" />
                Updated categories for everyday practice
              </div>
              <Link to="/subjects" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity text-center">
                Browse all subjects
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Quick Access Banners */}
      <section className="container mx-auto px-4 py-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <a href="#" className="group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-5 shadow transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Past Papers</p>
              <p className="text-xs text-muted-foreground">Download FREE past papers for all subjects</p>
            </div>
            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#" className="group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-5 shadow transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100">
              <PlayCircle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Video Lectures</p>
              <p className="text-xs text-muted-foreground">Watch FREE video lectures on YouTube</p>
            </div>
            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#" className="group flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-5 shadow transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
              <ClipboardCheck className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Online Tests</p>
              <p className="text-xs text-muted-foreground">Take FREE tests & check your preparation</p>
            </div>
            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <div className="container mx-auto flex gap-6 px-4 py-6">

        {/* MCQ Feed */}
        <main className="min-w-0 flex-1">

          {loading && (
            <div className="text-center py-10 text-muted-foreground">
              Loading MCQs...
            </div>
          )}

          {!loading && (
            <div className="flex flex-col gap-4">
              {mcqs.map((mcq) => (
                <article
                  key={mcq.id}
                  className="rounded-xl border border-border bg-card p-5 shadow transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold leading-snug text-primary">
                      {mcq.question}
                    </h3>
                    <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                      <MessageSquare className="h-3.5 w-3.5" /> 0
                    </span>
                  </div>

                  <div className="mb-3 flex flex-col gap-1.5">
                    {mcq.options?.map((opt, oi) => (
                      <div
                        key={oi}
                        className={`text-sm ${
                          oi === mcq.correctAnswerIndex
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
                      {mcq.subjectName || "General"}
                    </span>
                    {mcq.solutionUrl && (
                      <a
                        href={mcq.solutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-red-500 hover:underline flex items-center gap-1"
                      >
                        ▶ Watch Explanation Video
                      </a>
                    )}
                    <button
                      onClick={() => setExpandedMcq(expandedMcq === mcq.id ? null : mcq.id)}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      {expandedMcq === mcq.id ? "Hide Details ▲" : "Read More Details ▼"}
                    </button>
                  </div>

                  {/* Expanded Explanation */}
                  {expandedMcq === mcq.id && (
                    <div className="mt-3 rounded-lg bg-blue-50 border border-blue-100 p-4">
                      {mcq.explanation ? (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">📖 Explanation:</h4>
                          <p className="text-sm leading-relaxed text-muted-foreground">{mcq.explanation}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No explanation available.</p>
                      )}
                      {mcq.solutionUrl && (
                        <a
                          href={mcq.solutionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
                        >
                          ▶ Watch Video Solution
                        </a>
                      )}
                    </div>
                  )}

                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    page === currentPage
                      ? "bg-primary text-white"
                      : "border border-border hover:bg-secondary"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

        </main>

        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">

          {/* Search */}
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

          {/* MCQPrep Menu - Dynamic */}
          <div className="mb-5 rounded-xl border border-border bg-card p-4 shadow">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">
              MCQPrep Menu
            </h3>
            <ul className="flex flex-col gap-1">
              {subjectsLoading ? (
                [...Array(4)].map((_, i) => (
                  <li key={i} className="h-7 animate-pulse rounded-md bg-gray-100" />
                ))
              ) : (
                topSubjects.map((s) => (
                  <li key={s.id}>
                    <Link
                      to={`/subject/${s.id}`}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                      {s.name} MCQs
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

         {/* Other Subjects */}
        <div className="rounded-xl border border-border bg-card p-4 shadow">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">
            Other Subjects
          </h3>
          <ul className="flex flex-col gap-1">
            {otherSubjects.map((s) => (
              <li key={s.id}>
                <Link
                  to={`/subject/${s.id}`}
                  state={{ subjectName: s.name }}
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

      <hr />
      <ContactSection />
      <FAQ />
      <Footer />
    </div>
  );
}

export default Index;