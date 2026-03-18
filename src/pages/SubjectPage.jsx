import { useParams, Navigate } from "react-router-dom";
import { getSubjectById } from "../data/mcqData";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MCQCard from "../components/MCQCard";

function SubjectPage() {
  const { subjectId } = useParams();
  const subject = getSubjectById(subjectId || "");

  if (!subject) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto flex gap-6 px-4 py-6">

        <main className="flex-1 min-w-0">

          {/* Subject Header */}
          <div className="mb-6 rounded-xl border border-border bg-card p-6 shadow">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{subject.icon}</span>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {subject.name} MCQs
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {subject.description}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-primary">
                {subject.mcqs.length} Questions
              </span>
            </div>
          </div>

          {/* MCQ List */}
          <div className="flex flex-col gap-4">
            {subject.mcqs.map((mcq, i) => (
              <MCQCard key={mcq.id} mcq={mcq} index={i} />
            ))}
          </div>

        </main>

      </div>

      <Footer />
    </div>
  );
}

export default SubjectPage;