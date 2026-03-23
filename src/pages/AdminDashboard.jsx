import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Bell, BookOpen, Check, Edit, LogOut, Plus, Trash2, X, ClipboardList,
} from "lucide-react";
import * as store from "../lib/adminStore";

// ─── Subject Form ───
function SubjectForm({ initial, onSave, onCancel }) {
  const [name, setName] = useState(initial?.name ?? "");
  const [icon, setIcon] = useState(initial?.icon ?? "📚");
  const [desc, setDesc] = useState(initial?.description ?? "");
  const [category, setCategory] = useState(initial?.category ?? "main");

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Subject name"
            className="w-full rounded-lg border border-input px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">Icon (emoji)</label>
          <input
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="📚"
            className="w-full rounded-lg border border-input px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full rounded-lg border border-input px-3 py-2 text-sm outline-none focus:border-primary min-h-[80px]"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Category</label>
        <div className="flex gap-2">
          {["main", "other"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                category === c
                  ? "bg-primary text-white"
                  : "border border-border bg-background text-foreground hover:bg-secondary"
              }`}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          onClick={onCancel}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
        >
          Cancel
        </button>
        <button
          onClick={() =>
            onSave({
              id: initial?.id ?? name.toLowerCase().replace(/\s+/g, "-"),
              name, icon, description: desc, category,
              ...(initial ? {} : { mcqs: [] }),
            })
          }
          disabled={!name.trim()}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {initial ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
}

// ─── MCQ Form ───
function MCQForm({ initial, onSave, onCancel }) {
  const [question, setQuestion] = useState(initial?.question ?? "");
  const [options, setOptions] = useState(initial?.options ?? ["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(initial?.correctIndex ?? 0);
  const [explanation, setExplanation] = useState(initial?.explanation ?? "");
  const [youtubeUrl, setYoutubeUrl] = useState(initial?.youtubeUrl ?? "");

  const updateOption = (i, v) => {
    const newOpts = [...options];
    newOpts[i] = v;
    setOptions(newOpts);
  };

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Question</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full rounded-lg border border-input px-3 py-2 text-sm outline-none focus:border-primary min-h-[80px]"
        />
      </div>

      {options.map((opt, i) => (
        <div key={i} className="space-y-1">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            Option {String.fromCharCode(65 + i)}
            {correctIndex === i && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                Correct
              </span>
            )}
          </label>
          <div className="flex gap-2">
            <input
              value={opt}
              onChange={(e) => updateOption(i, e.target.value)}
              className="flex-1 rounded-lg border border-input px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button
              onClick={() => setCorrectIndex(i)}
              className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                correctIndex === i
                  ? "bg-primary text-white"
                  : "border border-border bg-background hover:bg-secondary"
              }`}
            >
              <Check className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}

      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Explanation</label>
        <textarea
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          className="w-full rounded-lg border border-input px-3 py-2 text-sm outline-none focus:border-primary min-h-[80px]"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">YouTube URL (optional)</label>
        <input
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="https://youtube.com/..."
          className="w-full rounded-lg border border-input px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <button
          onClick={onCancel}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
        >
          Cancel
        </button>
        <button
          disabled={!question.trim() || options.some((o) => !o.trim())}
          onClick={() =>
            onSave({
              id: initial?.id ?? Date.now(),
              question, options, correctIndex,
              explanation,
              youtubeUrl: youtubeUrl || undefined,
            })
          }
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {initial ? "Update" : "Add MCQ"}
        </button>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───
function AdminDashboard() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const [subjects, setSubjects] = useState(store.getSubjects());
  const [pending, setPending] = useState(store.getPendingMCQs());
  const [notifications, setNotifications] = useState(store.getNotifications());
  const [editingSubject, setEditingSubject] = useState(null);
  const [addingSubject, setAddingSubject] = useState(false);
  const [managingMCQs, setManagingMCQs] = useState(null);
  const [editingMCQ, setEditingMCQ] = useState(null);
  const [addingMCQ, setAddingMCQ] = useState(null);
  const [showNotifs, setShowNotifs] = useState(false);
  const [mcqSubjectFilter, setMcqSubjectFilter] = useState("all");
  const [mcqSearch, setMcqSearch] = useState("");
  const [activeTab, setActiveTab] = useState("subjects");
  const [showAddMCQDialog, setShowAddMCQDialog] = useState(false);

  const refresh = () => {
    setSubjects(store.getSubjects());
    setPending(store.getPendingMCQs());
    setNotifications(store.getNotifications());
  };

  useEffect(() => {
    const interval = setInterval(refresh, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!isAdmin) return <Navigate to="/login" replace />;

  const logout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/login";
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const pendingCount = pending.filter((p) => p.status === "pending").length;
  const managedSubject = managingMCQs ? subjects.find((s) => s.id === managingMCQs) : null;

  const tabs = ["subjects", "mcqs", "pending"];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">

        {/* Top bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage subjects, MCQs, and user submissions</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="relative rounded-lg border border-border p-2 hover:bg-secondary"
              onClick={() => { setShowNotifs(!showNotifs); store.markAllNotificationsRead(); refresh(); }}
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>

        {/* Notifications Panel */}
        {showNotifs && (
          <div className="mb-6 rounded-xl border border-border bg-card p-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
              <Bell className="h-5 w-5 text-primary" /> Notifications
            </h3>
            {notifications.length === 0 ? (
              <p className="text-sm text-muted-foreground">No notifications yet.</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.slice(0, 20).map((n) => (
                  <div
                    key={n.id}
                    className={`rounded-lg border p-3 text-sm ${
                      n.read ? "border-border bg-background" : "border-primary bg-blue-50"
                    }`}
                  >
                    <p className="text-foreground">{n.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(n.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          {[
            { label: "Total Subjects", value: subjects.length, icon: BookOpen },
            { label: "Total MCQs", value: subjects.reduce((a, s) => a + s.mcqs.length, 0), icon: ClipboardList },
            { label: "Pending Submissions", value: pendingCount, icon: Bell },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-5 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors relative ${
                activeTab === tab
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
              {tab === "pending" && pendingCount > 0 && (
                <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Subjects Tab ── */}
        {activeTab === "subjects" && (
          <div>
            {(addingSubject || editingSubject) && (
              <div className="mb-4 rounded-xl border border-primary bg-card p-4">
                <h3 className="text-lg font-semibold mb-3">
                  {editingSubject ? "Edit Subject" : "Add New Subject"}
                </h3>
                <SubjectForm
                  initial={editingSubject ?? undefined}
                  onSave={(data) => {
                    if (editingSubject) {
                      store.updateSubject(editingSubject.id, data);
                    } else {
                      store.addSubject({ ...data, mcqs: data.mcqs ?? [] });
                    }
                    setEditingSubject(null);
                    setAddingSubject(false);
                    refresh();
                  }}
                  onCancel={() => { setEditingSubject(null); setAddingSubject(false); }}
                />
              </div>
            )}

            {managedSubject && (
              <div className="mb-4 rounded-xl border border-primary bg-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <span>{managedSubject.icon}</span> {managedSubject.name} — MCQs
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setAddingMCQ(managedSubject.id)}
                      className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                    >
                      <Plus className="h-4 w-4" /> Add MCQ
                    </button>
                    <button
                      onClick={() => { setManagingMCQs(null); setAddingMCQ(null); setEditingMCQ(null); }}
                      className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-secondary"
                    >
                      Close
                    </button>
                  </div>
                </div>

                {addingMCQ && (
                  <div className="mb-4 rounded-lg border border-border p-4 bg-background">
                    <MCQForm
                      onSave={(mcq) => { store.addMCQ(managedSubject.id, mcq); setAddingMCQ(null); refresh(); }}
                      onCancel={() => setAddingMCQ(null)}
                    />
                  </div>
                )}

                {editingMCQ && editingMCQ.subjectId === managedSubject.id && (
                  <div className="mb-4 rounded-lg border border-border p-4 bg-background">
                    <MCQForm
                      initial={editingMCQ.mcq}
                      onSave={(mcq) => { store.updateMCQ(managedSubject.id, editingMCQ.mcq.id, mcq); setEditingMCQ(null); refresh(); }}
                      onCancel={() => setEditingMCQ(null)}
                    />
                  </div>
                )}

                {managedSubject.mcqs.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No MCQs yet. Add your first one above.</p>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-muted-foreground">
                        <th className="pb-2 w-12">#</th>
                        <th className="pb-2">Question</th>
                        <th className="pb-2 text-right w-32">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {managedSubject.mcqs.map((mcq, i) => (
                        <tr key={mcq.id} className="border-b border-border">
                          <td className="py-2 text-muted-foreground">{i + 1}</td>
                          <td className="py-2 font-medium text-foreground max-w-md truncate">{mcq.question}</td>
                          <td className="py-2 text-right">
                            <div className="flex justify-end gap-1">
                              <button onClick={() => setEditingMCQ({ subjectId: managedSubject.id, mcq })}
                                className="rounded p-1.5 hover:bg-secondary">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button onClick={() => { store.deleteMCQ(managedSubject.id, mcq.id); refresh(); }}
                                className="rounded p-1.5 text-red-500 hover:bg-red-50">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-foreground">All Subjects</h2>
              <button
                onClick={() => { setAddingSubject(true); setEditingSubject(null); }}
                className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
              >
                <Plus className="h-4 w-4" /> Add Subject
              </button>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-2 w-12">Icon</th>
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Category</th>
                  <th className="pb-2 text-center">MCQs</th>
                  <th className="pb-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((s) => (
                  <tr key={s.id} className="border-b border-border">
                    <td className="py-2 text-xl">{s.icon}</td>
                    <td className="py-2 font-medium text-foreground">{s.name}</td>
                    <td className="py-2">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        s.category === "main"
                          ? "bg-blue-100 text-primary"
                          : "bg-secondary text-secondary-foreground"
                      }`}>
                        {s.category}
                      </span>
                    </td>
                    <td className="py-2 text-center">{s.mcqs.length}</td>
                    <td className="py-2 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => setManagingMCQs(s.id)}
                          className="rounded p-1.5 hover:bg-secondary">
                          <ClipboardList className="h-4 w-4" />
                        </button>
                        <button onClick={() => { setEditingSubject(s); setAddingSubject(false); }}
                          className="rounded p-1.5 hover:bg-secondary">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => { store.deleteSubject(s.id); refresh(); }}
                          className="rounded p-1.5 text-red-500 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── MCQs Tab ── */}
        {activeTab === "mcqs" && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 className="text-lg font-semibold text-foreground">All MCQs</h2>
              <div className="flex items-center gap-2">
                <input
                  placeholder="Search questions..."
                  value={mcqSearch}
                  onChange={(e) => setMcqSearch(e.target.value)}
                  className="w-48 rounded-lg border border-input px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <select
                  value={mcqSubjectFilter}
                  onChange={(e) => setMcqSubjectFilter(e.target.value)}
                  className="h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
                >
                  <option value="all">All Subjects</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <button
                  onClick={() => setShowAddMCQDialog(true)}
                  className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  <Plus className="h-4 w-4" /> Add MCQ
                </button>
              </div>
            </div>

            {/* Add MCQ Dialog */}
            {showAddMCQDialog && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-xl">
                  <h3 className="text-lg font-semibold mb-3">Add New MCQ</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-foreground">Subject</label>
                      <select
                        id="mcq-add-subject"
                        defaultValue={subjects[0]?.id}
                        className="w-full h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm"
                      >
                        {subjects.map((s) => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <MCQForm
                      onSave={(mcq) => {
                        const selectEl = document.getElementById("mcq-add-subject");
                        const subjectId = selectEl?.value || subjects[0]?.id;
                        store.addMCQ(subjectId, mcq);
                        setShowAddMCQDialog(false);
                        refresh();
                      }}
                      onCancel={() => setShowAddMCQDialog(false)}
                    />
                  </div>
                </div>
              </div>
            )}

            {editingMCQ && (
              <div className="mb-4 rounded-xl border border-primary bg-card p-4">
                <h3 className="text-lg font-semibold mb-3">Edit MCQ</h3>
                <MCQForm
                  initial={editingMCQ.mcq}
                  onSave={(mcq) => {
                    store.updateMCQ(editingMCQ.subjectId, editingMCQ.mcq.id, mcq);
                    setEditingMCQ(null);
                    refresh();
                  }}
                  onCancel={() => setEditingMCQ(null)}
                />
              </div>
            )}

            {(() => {
              const filteredSubjects = mcqSubjectFilter === "all"
                ? subjects
                : subjects.filter((s) => s.id === mcqSubjectFilter);
              const allMcqs = filteredSubjects.flatMap((s) =>
                s.mcqs.map((m) => ({ ...m, subjectId: s.id, subjectName: s.name, subjectIcon: s.icon }))
              ).filter((m) => !mcqSearch || m.question.toLowerCase().includes(mcqSearch.toLowerCase()));

              if (allMcqs.length === 0) {
                return (
                  <div className="rounded-xl border border-border bg-card p-8 text-center">
                    <ClipboardList className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No MCQs found.</p>
                  </div>
                );
              }

              return (
                <div className="space-y-3">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-muted-foreground">
                        <th className="pb-2 w-12">#</th>
                        <th className="pb-2">Question</th>
                        <th className="pb-2">Subject</th>
                        <th className="pb-2 text-center w-24">Correct</th>
                        <th className="pb-2 text-right w-32">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allMcqs.map((mcq, i) => (
                        <tr key={`${mcq.subjectId}-${mcq.id}`} className="border-b border-border">
                          <td className="py-2 text-muted-foreground">{i + 1}</td>
                          <td className="py-2 font-medium text-foreground max-w-xs truncate">{mcq.question}</td>
                          <td className="py-2">
                            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                              {mcq.subjectIcon} {mcq.subjectName}
                            </span>
                          </td>
                          <td className="py-2 text-center text-muted-foreground">
                            {String.fromCharCode(65 + mcq.correctIndex)}
                          </td>
                          <td className="py-2 text-right">
                            <div className="flex justify-end gap-1">
                              <button onClick={() => setEditingMCQ({ subjectId: mcq.subjectId, mcq })}
                                className="rounded p-1.5 hover:bg-secondary">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button onClick={() => { store.deleteMCQ(mcq.subjectId, mcq.id); refresh(); }}
                                className="rounded p-1.5 text-red-500 hover:bg-red-50">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-xs text-muted-foreground text-right">{allMcqs.length} MCQ(s) total</p>
                </div>
              );
            })()}
          </div>
        )}

        {/* ── Submissions Tab ── */}
        {activeTab === "pending" && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">User Submitted MCQs</h2>
            {pending.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <ClipboardList className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No submissions yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pending.map((p) => {
                  const subName = subjects.find((s) => s.id === p.subjectId)?.name ?? p.subjectId;
                  return (
                    <div
                      key={p.id}
                      className={`rounded-xl border border-border bg-card p-4 ${
                        p.status === "pending" ? "border-l-4 border-l-yellow-400" : ""
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <p className="font-semibold text-foreground">{p.question}</p>
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                              {subName}
                            </span>
                            <span>by {p.submitterName}</span>
                            <span>• {new Date(p.submittedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          p.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : p.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {p.status}
                        </span>
                      </div>

                      <div className="grid gap-1 mb-3">
                        {p.options.map((opt, i) => (
                          <div
                            key={i}
                            className={`text-sm rounded px-2 py-1 ${
                              i === p.correctIndex
                                ? "bg-green-50 font-semibold text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {String.fromCharCode(65 + i)}. {opt}
                          </div>
                        ))}
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{p.explanation}</p>

                      {p.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => { store.approvePendingMCQ(p.id); refresh(); }}
                            className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                          >
                            <Check className="h-4 w-4" /> Approve
                          </button>
                          <button
                            onClick={() => { store.rejectPendingMCQ(p.id); refresh(); }}
                            className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                          >
                            <X className="h-4 w-4" /> Reject
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}

export default AdminDashboard;