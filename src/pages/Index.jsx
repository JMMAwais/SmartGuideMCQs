import { Link } from "react-router-dom";
import { subjects } from "../data/mcqData";
 import Header from "../components/Header";
import Footer from "../components/Footer";
import { ChevronRight, MessageSquare } from "lucide-react";

function Index() {

  // Collect all MCQs with subject info
  const allMcqs = subjects.flatMap((s) =>
    s.mcqs.map((mcq) => ({
      ...mcq,
      subjectName: s.name,
      subjectId: s.id
    }))
  );

  const mainSubs = subjects.filter((s) => s.category === "main");
  const otherSubs = subjects.filter((s) => s.category === "other");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Subject Navigation Bar */}
      <nav className="border-b border-border bg-card overflow-x-auto">
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

      {/* Main Content */}
      <div className="container mx-auto flex gap-6 px-4 py-6">

        {/* MCQ Feed */}
        <main className="min-w-0 flex-1">
          <div className="flex flex-col gap-4">

            {allMcqs.map((mcq) => (
              <article
                key={`${mcq.subjectId}-${mcq.id}`}
                className="rounded-xl border border-border bg-card p-5 shadow transition-shadow"
              >

                {/* Question */}
                <div className="mb-3 flex items-start justify-between gap-3">
                  <Link
                    to={`/subject/${mcq.subjectId}`}
                    className="text-base font-bold leading-snug text-primary hover:underline"
                  >
                    {mcq.question}
                  </Link>

                  <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                    <MessageSquare size={14} /> 0
                  </span>
                </div>

                {/* Options */}
                <div className="mb-3 flex flex-col gap-1.5">
                  {mcq.options.map((opt, oi) => (
                    <div
                      key={oi}
                      className={
                        oi === mcq.correctIndex
                          ? "text-sm font-bold text-foreground"
                          : "text-sm text-muted-foreground"
                      }
                    >
                      {String.fromCharCode(65 + oi)}. {opt}
                    </div>
                  ))}
                </div>

                {/* Footer */}
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

        {/* Right Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">

          {/* Search */}
          <div className="mb-5 rounded-xl border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider">
              Search
            </h3>

            <input
              type="text"
              placeholder="Search MCQs..."
              className="w-full rounded-lg border border-input px-3 py-2 text-sm"
            />
          </div>

          {/* MCQPrep Menu */}
          <div className="mb-5 rounded-xl border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider">
              MCQPrep Menu
            </h3>

            <ul className="flex flex-col gap-1">

              {mainSubs.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/subject/${s.id}`}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-secondary"
                  >
                    <ChevronRight size={14} />
                    {s.name} MCQs
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          {/* Other Subjects */}
          <div className="rounded-xl border border-border bg-card p-4">

            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider">
              Other Subjects
            </h3>

            <ul className="flex flex-col gap-1">

              {otherSubs.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/subject/${s.id}`}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-secondary"
                  >
                    <ChevronRight size={14} />
                    {s.name} MCQs
                  </Link>
                </li>
              ))}

            </ul>

          </div>
        </aside>

      </div>

      <Footer />
    </div>
  );
}

export default Index;