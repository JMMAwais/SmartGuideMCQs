import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getMcqsBySubject } from "../services/mcqService";
import { ChevronLeft, ChevronRight, MessageSquare, CheckCircle, XCircle } from "lucide-react";

const MCQS_PER_PAGE = 10;

function SubjectPage() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const subjectName = location.state?.subjectName || "Subject";

  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [expandedMcq, setExpandedMcq] = useState(null);

  // selectedAnswers: { [mcqId]: selectedOptionIndex }
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    if (!subjectId) {
      navigate("/");
      return;
    }

    const fetchMcqs = async () => {
      try {
        setLoading(true);
        setError(false);
        setSelectedAnswers({}); // Reset answers on page change
        const res = await getMcqsBySubject(subjectId, currentPage, MCQS_PER_PAGE);
        if (res.success) {
          const formatted = res.data.items.map((q, index) => ({
            ...q,
            id: q.id ?? `${subjectId}-${index}`,
            options: [q.optionA, q.optionB, q.optionC, q.optionD],
          }));
          setMcqs(formatted);
          setTotalCount(res.data.totalCount);
          setTotalPages(Math.ceil(res.data.totalCount / res.data.pageSize));
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Subject MCQs Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMcqs();
  }, [subjectId, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOptionClick = (mcqId, optionIndex) => {
    // Agar already answer diya hai to change nahi hoga
    if (selectedAnswers[mcqId] !== undefined) return;
    setSelectedAnswers((prev) => ({ ...prev, [mcqId]: optionIndex }));
  };

  const getOptionClass = (mcq, oi) => {
    const selected = selectedAnswers[mcq.id];
    const isCorrect = oi === mcq.correctAnswer;

    // Agar koi answer select nahi kiya
    if (selected === undefined) {
      return "border border-border bg-background text-muted-foreground hover:border-primary hover:bg-blue-50 cursor-pointer";
    }

    // Correct option hamesha green
    if (isCorrect) {
      return "border border-green-300 bg-green-50 font-bold text-green-700 cursor-default";
    }

    // Jo option select kiya wo wrong hai
    if (selected === oi) {
      return "border border-red-300 bg-red-50 font-bold text-red-600 cursor-default";
    }

    // Baaki options dim
    return "border border-border bg-background text-muted-foreground opacity-50 cursor-default";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto flex gap-6 px-4 py-6">
        <main className="flex-1 min-w-0">

          {/* Subject Header */}
          <div className="mb-6 rounded-xl border border-border bg-card p-6 shadow">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {subjectName} MCQs
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Practice questions for {subjectName}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-primary">
                {totalCount} Questions
              </span>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5 shadow animate-pulse">
                  <div className="h-4 w-3/4 rounded bg-gray-200 mb-4" />
                  <div className="h-3 w-1/2 rounded bg-gray-100 mb-2" />
                  <div className="h-3 w-1/2 rounded bg-gray-100 mb-2" />
                  <div className="h-3 w-1/3 rounded bg-gray-100" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
              <p className="text-sm font-semibold text-red-500">
                Failed to load MCQs. Please try again.
              </p>
              <button
                onClick={() => setCurrentPage(1)}
                className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && mcqs.length === 0 && (
            <div className="rounded-xl border border-border bg-card p-10 text-center">
              <p className="text-muted-foreground text-sm">
                No MCQs available for this subject yet.
              </p>
            </div>
          )}

          {/* MCQ List */}
          {!loading && !error && mcqs.length > 0 && (
            <div className="flex flex-col gap-4">
              {mcqs.map((mcq, i) => {
                const selected = selectedAnswers[mcq.id];
                const isAnswered = selected !== undefined;
                const isCorrect = selected === mcq.correctAnswer;

                return (
                  <article
                    key={mcq.id}
                    className="rounded-xl border border-border bg-card p-5 shadow transition-shadow hover:shadow-md"
                  >
                    {/* Question */}
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h3 className="text-base font-bold leading-snug text-primary">
                        Q{(currentPage - 1) * MCQS_PER_PAGE + i + 1}. {mcq.question}
                      </h3>
                      <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                        <MessageSquare className="h-3.5 w-3.5" /> 0
                      </span>
                    </div>

                    {/* Options */}
                    <div className="mb-3 flex flex-col gap-2">
                      {mcq.options.map((opt, oi) => (
                        <div
                          key={oi}
                          onClick={() => handleOptionClick(mcq.id, oi)}
                          className={`rounded-lg px-3 py-2 text-sm transition-all flex items-center justify-between gap-2 ${getOptionClass(mcq, oi)}`}
                        >
                          <span>{String.fromCharCode(65 + oi)}. {opt}</span>
                          {/* Icons — sirf answer dene ke baad */}
                          {isAnswered && oi === mcq.correctAnswer && (
                            <CheckCircle className="h-4 w-4 shrink-0 text-green-600" />
                          )}
                          {isAnswered && selected === oi && oi !== mcq.correctAnswer && (
                            <XCircle className="h-4 w-4 shrink-0 text-red-500" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Result Badge */}
                    {isAnswered && (
                      <div className={`mb-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${
                        isCorrect
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-600 border border-red-200"
                      }`}>
                        {isCorrect ? (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Correct! 
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4" />
                            Incorrect! Correct answer is {String.fromCharCode(65 + mcq.correctAnswer)}
                          </>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-border pt-3">
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
                        onClick={() =>
                          setExpandedMcq(expandedMcq === mcq.id ? null : mcq.id)
                        }
                        className="ml-auto text-xs font-semibold text-primary hover:underline"
                      >
                        {expandedMcq === mcq.id ? "Hide Details ▲" : "Read More Details ▼"}
                      </button>
                    </div>

                    {/* Expanded Explanation */}
                    {expandedMcq === mcq.id && (
                      <div className="mt-3 rounded-lg bg-blue-50 border border-blue-100 p-4">
                        {mcq.explanation ? (
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">
                              📖 Explanation:
                            </h4>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {mcq.explanation}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">
                            No explanation available.
                          </p>
                        )}
                   
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
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
      </div>

      <Footer />
    </div>
  );
}

export default SubjectPage;