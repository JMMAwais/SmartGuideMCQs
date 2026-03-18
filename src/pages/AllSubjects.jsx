import { Link } from "react-router-dom";
import { subjects } from "../data/mcqData";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ArrowRight } from "lucide-react";

function SubjectCard({ s }) {
  return (
    <Link
      to={`/subject/${s.id}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow transition-all hover:shadow-md hover:border-primary"
    >
      <span className="text-3xl mb-3">{s.icon}</span>
      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
        {s.name}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
        {s.description}
      </p>
      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-primary">
          {s.mcqs.length} MCQs
        </span>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </div>
    </Link>
  );
}

function AllSubjects() {
  const mainSubs = subjects.filter((s) => s.category === "main");
  const otherSubs = subjects.filter((s) => s.category === "other");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">

        <h1 className="text-3xl font-bold text-foreground mb-2">All Subjects</h1>
        <p className="text-muted-foreground mb-8">
          Choose a subject to start practicing MCQs.
        </p>

        {/* Main Subjects */}
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
          Main Subjects
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
          {mainSubs.map((s) => <SubjectCard key={s.id} s={s} />)}
        </div>

        {/* Other Subjects */}
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
          Other Subjects
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherSubs.map((s) => <SubjectCard key={s.id} s={s} />)}
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default AllSubjects;