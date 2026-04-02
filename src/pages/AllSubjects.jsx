import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getAllSubjects } from "../services/mcqService";
import { ArrowRight } from "lucide-react";

function SubjectCard({ s }) {
  return (
    <Link
      to={`/subject/${s.id}`}
      state={{ subjectName: s.name }}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow transition-all hover:shadow-md hover:border-primary"
    >
      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
        {s.name}
      </h3>
      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-primary">
          {s.mcqCount} MCQs
        </span>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </div>
    </Link>
  );
}

function AllSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await getAllSubjects();
        if (res.success) {
          setSubjects(res.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("All Subjects Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  // Loading Skeleton
  const SkeletonCard = () => (
    <div className="flex flex-col rounded-xl border border-border bg-card p-5 shadow animate-pulse">
      <div className="h-5 w-32 rounded bg-gray-200 mb-3" />
      <div className="h-3 w-20 rounded bg-gray-100 mt-auto pt-4" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">

        <h1 className="text-3xl font-bold text-foreground mb-2">All Subjects</h1>
        <p className="text-muted-foreground mb-8">
          Choose a subject to start practicing MCQs.
        </p>

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center mb-6">
            <p className="text-sm font-semibold text-red-500">
              Failed to load subjects. Please try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Retry
            </button>
          </div>
        )}

        {/* Subjects Grid */}
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
          {loading ? "Loading..." : `All Subjects (${subjects.length})`}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            subjects.map((s) => <SubjectCard key={s.id} s={s} />)
          )}
        </div>

        {/* Empty State */}
        {!loading && !error && subjects.length === 0 && (
          <div className="rounded-xl border border-border bg-card p-10 text-center mt-4">
            <p className="text-muted-foreground text-sm">
              No subjects available yet.
            </p>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}

export default AllSubjects;