import { Link, useParams } from "react-router-dom";
import { subjects } from "../data/mcqData";

function SubjectSidebar() {
  const { subjectId } = useParams();
  const mainSubs = subjects.filter((s) => s.category === "main");
  const otherSubs = subjects.filter((s) => s.category === "other");

  const renderLink = (s) => (
    <Link
      key={s.id}
      to={`/subject/${s.id}`}
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        subjectId === s.id
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
      }`}
    >
      <span>{s.icon}</span>
      {s.name}
      <span className="ml-auto text-xs opacity-70">{s.mcqs.length}</span>
    </Link>
  );

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-20 rounded-xl border border-border bg-card p-4 shadow">

        <h3 className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Main Subjects
        </h3>
        <div className="flex flex-col gap-0.5">
          {mainSubs.map(renderLink)}
        </div>

        <h3 className="mb-3 mt-5 px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Other Subjects
        </h3>
        <div className="flex flex-col gap-0.5">
          {otherSubs.map(renderLink)}
        </div>

      </div>
    </aside>
  );
}

export default SubjectSidebar;