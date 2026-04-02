import { useState, useEffect } from "react";
import { getAllMcqs, createMCQ, updateMCQ, deleteMCQ, getAllSubjects } from "../../services/mcqService";
import { Plus, Edit, Trash2, Check, X } from "lucide-react";

// ─── MCQ Form ───
function MCQForm({ initial, subjects, onSave, onCancel, loading }) {
  const [question, setQuestion] = useState(initial?.question ?? "");
  const [optionA, setOptionA] = useState(initial?.optionA ?? "");
  const [optionB, setOptionB] = useState(initial?.optionB ?? "");
  const [optionC, setOptionC] = useState(initial?.optionC ?? "");
  const [optionD, setOptionD] = useState(initial?.optionD ?? "");
  const [correctAnswer, setCorrectAnswer] = useState(initial?.correctAnswer ?? 0);
  const [explanation, setExplanation] = useState(initial?.explanation ?? "");
  const [solutionUrl, setSolutionUrl] = useState(initial?.solutionUrl ?? "");
  const [subjectId, setSubjectId] = useState(initial?.subjectId ?? subjects[0]?.id ?? "");

  const options = [
    { label: "A", value: 0, val: optionA, set: setOptionA },
    { label: "B", value: 1, val: optionB, set: setOptionB },
    { label: "C", value: 2, val: optionC, set: setOptionC },
    { label: "D", value: 3, val: optionD, set: setOptionD },
  ];

  const handleSave = () => {
    const data = {
      question, optionA, optionB, optionC, optionD,
      correctAnswer, explanation,
      solutionUrl: solutionUrl || "",
      status: 1,
      subjectId,
    };
    if (initial?.id) data.id = initial.id;
    onSave(data);
  };

  const isValid = question.trim() && optionA.trim() && optionB.trim() && optionC.trim() && optionD.trim() && subjectId;

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">

      {/* Subject */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Subject</label>
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
        >
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Question */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Question</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary min-h-[80px]"
        />
      </div>

      {/* Options */}
      {options.map((opt) => (
        <div key={opt.label} className="space-y-1">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            Option {opt.label}
            {correctAnswer === opt.value && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                Correct
              </span>
            )}
          </label>
          <div className="flex gap-2">
            <input
              value={opt.val}
              onChange={(e) => opt.set(e.target.value)}
              className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
            />
            <button
              onClick={() => setCorrectAnswer(opt.value)}
              className={`rounded-md px-3 py-1.5 text-sm border transition-colors ${
                correctAnswer === opt.value
                  ? "bg-primary text-white border-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              <Check className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}

      {/* Explanation */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Explanation</label>
        <textarea
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary min-h-[80px]"
        />
      </div>

      {/* Solution URL */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Solution URL (optional)</label>
        <input
          value={solutionUrl}
          onChange={(e) => setSolutionUrl(e.target.value)}
          placeholder="https://youtube.com/..."
          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 justify-end pt-2">
        <button
          onClick={onCancel}
          className="rounded-md border border-border px-4 py-1.5 text-sm text-muted-foreground hover:bg-muted"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!isValid || loading}
          className="rounded-md bg-primary px-4 py-1.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Saving..." : initial ? "Update" : "Add MCQ"}
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───
function MCQsTab() {
  const [mcqs, setMcqs] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [addingMCQ, setAddingMCQ] = useState(false);
  const [editingMCQ, setEditingMCQ] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const MCQS_PER_PAGE = 10;

  const fetchMCQs = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getAllMcqs(page, MCQS_PER_PAGE);
      if (res.success) {
        setMcqs(res.data.items);
        setTotalCount(res.data.totalCount);
        setTotalPages(Math.ceil(res.data.totalCount / res.data.pageSize));
      }
    } catch (err) {
      console.error("MCQs Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await getAllSubjects();
      if (res.success) setSubjects(res.data);
    } catch (err) {
      console.error("Subjects Error:", err);
    }
  };

  useEffect(() => {
    fetchMCQs(currentPage);
    fetchSubjects();
  }, [currentPage]);

  const handleCreate = async (data) => {
    try {
      setFormLoading(true);
      const res = await createMCQ(data);
      if (res.success) {
        setAddingMCQ(false);
        fetchMCQs(currentPage);
      }
    } catch (err) {
      console.error("Create MCQ Error:", err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setFormLoading(true);
      const res = await updateMCQ(data);
      if (res.success) {
        setEditingMCQ(null);
        fetchMCQs(currentPage);
      }
    } catch (err) {
      console.error("Update MCQ Error:", err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this MCQ?")) return;
    try {
      setDeletingId(id);
      const res = await deleteMCQ(id);
      if (res.success) fetchMCQs(currentPage);
    } catch (err) {
      console.error("Delete MCQ Error:", err);
    } finally {
      setDeletingId(null);
    }
  };

  // Client-side search + filter
  const filteredMcqs = mcqs.filter((m) => {
    const matchSearch = !search || m.question.toLowerCase().includes(search.toLowerCase());
    const matchSubject = subjectFilter === "all" || m.subjectId === subjectFilter;
    return matchSearch && matchSubject;
  });

  return (
    <div>
      {/* Add Form */}
      {addingMCQ && (
        <div className="mb-4 rounded-xl border border-primary/30 bg-card p-5 shadow">
          <h3 className="mb-4 text-lg font-bold text-foreground">Add New MCQ</h3>
          <MCQForm
            subjects={subjects}
            onSave={handleCreate}
            onCancel={() => setAddingMCQ(false)}
            loading={formLoading}
          />
        </div>
      )}

      {/* Edit Form */}
      {editingMCQ && (
        <div className="mb-4 rounded-xl border border-primary/30 bg-card p-5 shadow">
          <h3 className="mb-4 text-lg font-bold text-foreground">Edit MCQ</h3>
          <MCQForm
            initial={editingMCQ}
            subjects={subjects}
            onSave={handleUpdate}
            onCancel={() => setEditingMCQ(null)}
            loading={formLoading}
          />
        </div>
      )}

      {/* Header */}
      <div className="rounded-xl border border-border bg-card p-5 shadow">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-foreground">All MCQs</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <input
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-48 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
            />
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none"
            >
              <option value="all">All Subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <button
              onClick={() => { setAddingMCQ(true); setEditingMCQ(null); }}
              className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              <Plus className="h-4 w-4" /> Add MCQ
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-left text-muted-foreground">
              <th className="px-4 py-3 w-10">#</th>
              <th className="px-4 py-3">Question</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3 text-center w-20">Correct</th>
              <th className="px-4 py-3 text-right w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="px-4 py-3"><div className="h-4 w-6 rounded bg-gray-200 animate-pulse" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-64 rounded bg-gray-200 animate-pulse" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-24 rounded bg-gray-100 animate-pulse" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-8 rounded bg-gray-100 animate-pulse mx-auto" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-16 rounded bg-gray-100 animate-pulse ml-auto" /></td>
                </tr>
              ))
            ) : filteredMcqs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                  No MCQs found.
                </td>
              </tr>
            ) : (
              filteredMcqs.map((mcq, i) => (
                <tr key={mcq.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-muted-foreground">
                    {(currentPage - 1) * MCQS_PER_PAGE + i + 1}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground max-w-xs truncate">
                    {mcq.question}
                  </td>
                   <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {mcq.createdAt
                        ? new Date(mcq.createdAt).toLocaleDateString("en-PK", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })
                        : "—"}
                    </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                      {mcq.subjectName || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-muted-foreground">
                    {String.fromCharCode(65 + mcq.correctAnswerIndex)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => setEditingMCQ({
                                                    ...mcq,
                                                    optionA: mcq.options?.[0] ?? mcq.optionA ?? "",
                                                    optionB: mcq.options?.[1] ?? mcq.optionB ?? "",
                                                    optionC: mcq.options?.[2] ?? mcq.optionC ?? "",
                                                    optionD: mcq.options?.[3] ?? mcq.optionD ?? "",
                                                    correctAnswer: mcq.correctAnswerIndex ?? mcq.correctAnswer ?? 0,
                                                    })}
                        className="rounded p-1 hover:bg-muted"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => handleDelete(mcq.id)}
                        disabled={deletingId === mcq.id}
                        className="rounded p-1 hover:bg-muted disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  page === currentPage
                    ? "bg-primary text-white"
                    : "border border-border hover:bg-secondary"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {/* Count */}
        {!loading && (
          <p className="mt-2 text-xs text-muted-foreground text-right">
            {totalCount} MCQ(s) total
          </p>
        )}
      </div>
    </div>
  );
}

export default MCQsTab;