import { useState, useEffect } from "react";
import { getAllSubjects, createSubject, updateSubject, deleteSubject } from "../../services/mcqService";
import { Plus, Edit, Trash2, X, ClipboardList } from "lucide-react";

// Category mapping
const CATEGORY_OPTIONS = [
  { label: "Main", value: 0 },
  { label: "Other", value: 1 },
];

const getCategoryLabel = (val) => {
  return val === 0 ? "Main" : "Other";
};

// ─── Subject Form ───
function SubjectForm({ initial, onSave, onCancel, loading }) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [category, setCategory] = useState(initial?.category ?? 0);

  const handleSave = () => {
    const data = { name, description, category };
    if (initial?.id) data.id = initial.id;
    onSave(data);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Subject name"
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">Category</label>
          <div className="flex gap-2">
            {CATEGORY_OPTIONS.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`rounded-md px-4 py-1.5 text-sm font-medium border transition-colors ${
                  category === c.value
                    ? "bg-primary text-white border-primary"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary min-h-[80px]"
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button
          onClick={onCancel}
          className="rounded-md border border-border px-4 py-1.5 text-sm text-muted-foreground hover:bg-muted"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!name.trim() || loading}
          className="rounded-md bg-primary px-4 py-1.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Saving..." : initial ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───
function SubjectsTab() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(false);
  const [addingSubject, setAddingSubject] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

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
      console.error("Subjects Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleCreate = async (data) => {
    try {
      setFormLoading(true);
      const res = await createSubject(data);
      if (res.success) {
        setAddingSubject(false);
        fetchSubjects();
      }
    } catch (err) {
      console.error("Create Subject Error:", err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setFormLoading(true);
      const res = await updateSubject(data);
      if (res.success) {
        setEditingSubject(null);
        fetchSubjects();
      }
    } catch (err) {
      console.error("Update Subject Error:", err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) return;
    try {
      setDeletingId(id);
      const res = await deleteSubject(id);
      if (res.success) {
        fetchSubjects();
      }
    } catch (err) {
      console.error("Delete Subject Error:", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Add Form */}
      {addingSubject && (
        <div className="mb-4 rounded-xl border border-primary/30 bg-card p-5 shadow">
          <h3 className="mb-4 text-lg font-bold text-foreground">Add New Subject</h3>
          <SubjectForm
            onSave={handleCreate}
            onCancel={() => setAddingSubject(false)}
            loading={formLoading}
          />
        </div>
      )}

      {/* Edit Form */}
      {editingSubject && (
        <div className="mb-4 rounded-xl border border-primary/30 bg-card p-5 shadow">
          <h3 className="mb-4 text-lg font-bold text-foreground">Edit Subject</h3>
          <SubjectForm
            initial={editingSubject}
            onSave={handleUpdate}
            onCancel={() => setEditingSubject(null)}
            loading={formLoading}
          />
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-foreground">All Subjects</h2>
        <button
          onClick={() => { setAddingSubject(true); setEditingSubject(null); }}
          className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Add Subject
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 mb-4">
          Failed to load subjects.
          <button onClick={fetchSubjects} className="ml-2 font-semibold underline">Retry</button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-border bg-card shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50 text-left text-muted-foreground">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 text-center">MCQs</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="px-4 py-3"><div className="h-4 w-6 rounded bg-gray-200 animate-pulse" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-32 rounded bg-gray-200 animate-pulse" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-48 rounded bg-gray-100 animate-pulse" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-16 rounded bg-gray-100 animate-pulse" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-8 rounded bg-gray-100 animate-pulse mx-auto" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-16 rounded bg-gray-100 animate-pulse ml-auto" /></td>
                </tr>
              ))
            ) : subjects.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                  No subjects found.
                </td>
              </tr>
            ) : (
              subjects.map((s, i) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">
                    {s.description || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      s.category === 0
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary text-secondary-foreground"
                    }`}>
                      {getCategoryLabel(s.category)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">{s.mcqCount}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                     onClick={() => { setEditingSubject({ ...s }); setAddingSubject(false); }}
                        className="rounded p-1 hover:bg-muted"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        disabled={deletingId === s.id}
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
      </div>

      {/* Count */}
      {!loading && subjects.length > 0 && (
        <p className="mt-2 text-xs text-muted-foreground text-right">
          {subjects.length} subject(s) total
        </p>
      )}
    </div>
  );
}

export default SubjectsTab;