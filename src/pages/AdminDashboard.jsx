import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminSidebar from "../components/AdminSidebar";
import * as store from "../lib/adminStore";
import OverviewTab from "../components/admin/OverviewTab";
import SubjectsTab from "../components/admin/SubjectsTab";
import MCQsTab from "../components/admin/MCQsTab";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from "recharts";
import {
  Bell, BookOpen, Check, Edit, Plus, Trash2, X, ClipboardList, BarChart3, TrendingUp,
} from "lucide-react";

// ─── Chart Colors ───
const CHART_COLORS = [
  "#3b82f6", "#db2029", "#ef4444", "#3b82f6",
  "#22c55e", "#eab308", "#a855f7", "#f97316",
];

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
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">Icon (emoji)</label>
          <input
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="📚"
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary min-h-[80px]"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Category</label>
        <div className="flex gap-2">
          {["main", "other"].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-md px-4 py-1.5 text-sm font-medium border transition-colors ${
                category === c
                  ? "bg-primary text-white border-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
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
          className="rounded-md border border-border px-4 py-1.5 text-sm text-muted-foreground hover:bg-muted"
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
          className="rounded-md bg-primary px-4 py-1.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
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
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary min-h-[80px]"
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
              className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
            />
            <button
              onClick={() => setCorrectIndex(i)}
              className={`rounded-md px-3 py-1.5 text-sm border transition-colors ${
                correctIndex === i
                  ? "bg-primary text-white border-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
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
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary min-h-[80px]"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">YouTube URL (optional)</label>
        <input
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="https://youtube.com/..."
          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
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
          disabled={!question.trim() || options.some((o) => !o.trim())}
          onClick={() =>
            onSave({
              id: initial?.id ?? Date.now(),
              question, options, correctIndex,
              explanation,
              youtubeUrl: youtubeUrl || undefined,
            })
          }
          className="rounded-md bg-primary px-4 py-1.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {initial ? "Update" : "Add MCQ"}
        </button>
      </div>
    </div>
  );
}

// ─── Simple Modal ───
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Main Dashboard ───
function AdminDashboard() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
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
  const [addMcqModalOpen, setAddMcqModalOpen] = useState(false);
  const [addMcqSubjectId, setAddMcqSubjectId] = useState("");

  const refresh = () => {
    setSubjects(store.getSubjects());
    setPending(store.getPendingMCQs());
    setNotifications(store.getNotifications());
  };

  useEffect(() => {
    const interval = setInterval(refresh, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (subjects.length > 0) setAddMcqSubjectId(subjects[0].id);
  }, [subjects]);

  if (!isAdmin) return <Navigate to="/login" replace />;

  const unreadCount = notifications.filter((n) => !n.read).length;
  const pendingCount = pending.filter((p) => p.status === "pending").length;
  const totalMCQs = subjects.reduce((a, s) => a + s.mcqs.length, 0);
  const managedSubject = managingMCQs ? subjects.find((s) => s.id === managingMCQs) : null;

  const mcqsBySubject = subjects.map((s, i) => ({
    name: s.name,
    mcqs: s.mcqs.length,
    fill: CHART_COLORS[i % CHART_COLORS.length],
  }));

  const categoryData = [
    { name: "Main", value: subjects.filter((s) => s.category === "main").length, fill: CHART_COLORS[0] },
    { name: "Other", value: subjects.filter((s) => s.category === "other").length, fill: CHART_COLORS[1] },
  ];

  const submissionStats = [
    { name: "Pending", value: pending.filter((p) => p.status === "pending").length, fill: "#eab308" },
    { name: "Approved", value: pending.filter((p) => p.status === "approved").length, fill: "#22c55e" },
    { name: "Rejected", value: pending.filter((p) => p.status === "rejected").length, fill: "#ef4444" },
  ];

  return (
  <div className="h-screen flex w-full bg-background overflow-hidden">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        pendingCount={pendingCount}
        unreadCount={unreadCount}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 flex items-center justify-between border-b border-border px-4 bg-card shrink-0">
          <h1 className="text-lg font-bold text-foreground">Admin Dashboard</h1>
          <button
            onClick={() => { setShowNotifs(!showNotifs); store.markAllNotificationsRead(); refresh(); }}
            className="relative rounded-lg border border-border p-2 text-muted-foreground hover:bg-muted"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6">

          {/* Notifications Panel */}
          {showNotifs && (
            <div className="mb-6 rounded-xl border border-border bg-card p-4 shadow">
              <h3 className="mb-3 text-base font-bold text-foreground flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" /> Notifications
              </h3>
              {notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground">No notifications yet.</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.slice(0, 20).map((n) => (
                    <div key={n.id} className={`rounded-lg border p-3 text-sm ${n.read ? "border-border bg-background" : "border-primary/30 bg-primary/5"}`}>
                      <p className="text-foreground">{n.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(n.timestamp).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Overview Tab ── */}
        {activeTab === "overview" && <OverviewTab />}

          {/* ── Subjects Tab ── */}
        {activeTab === "subjects" && <SubjectsTab />}

          {/* ── MCQs Tab ── */}
        {activeTab === "mcqs" && <MCQsTab />}

          {/* ── Submissions Tab ── */}
          {activeTab === "submissions" && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">User Submitted MCQs</h2>
              {pending.length === 0 ? (
                <div className="rounded-xl border border-border bg-card p-10 text-center shadow">
                  <ClipboardList className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No submissions yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pending.map((p) => {
                    const subName = subjects.find((s) => s.id === p.subjectId)?.name ?? p.subjectId;
                    return (
                      <div key={p.id} className={`rounded-xl border bg-card p-5 shadow ${p.status === "pending" ? "border-l-4 border-l-yellow-400" : "border-border"}`}>
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <p className="font-semibold text-foreground">{p.question}</p>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">{subName}</span>
                              <span>by {p.submitterName}</span>
                              <span>• {new Date(p.submittedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            p.status === "pending" ? "bg-yellow-100 text-yellow-700"
                            : p.status === "approved" ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                          }`}>
                            {p.status}
                          </span>
                        </div>
                        <div className="grid gap-1 mb-3">
                          {p.options.map((opt, i) => (
                            <div key={i} className={`text-sm rounded px-2 py-1 ${i === p.correctIndex ? "bg-green-50 font-semibold text-green-700" : "text-muted-foreground"}`}>
                              {String.fromCharCode(65 + i)}. {opt}
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{p.explanation}</p>
                        {p.status === "pending" && (
                          <div className="flex gap-2">
                            <button onClick={() => { store.approvePendingMCQ(p.id); refresh(); }} className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-white hover:opacity-90">
                              <Check className="h-4 w-4" /> Approve
                            </button>
                            <button onClick={() => { store.rejectPendingMCQ(p.id); refresh(); }} className="flex items-center gap-1 rounded-lg bg-red-500 px-3 py-1.5 text-sm font-semibold text-white hover:opacity-90">
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

          {/* ── Analytics Tab ── */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-foreground">Analytics Overview</h2>
              <div className="grid gap-6 lg:grid-cols-2">

                <div className="rounded-xl border border-border bg-card p-5 shadow">
                  <h3 className="mb-4 text-base font-bold text-foreground flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" /> MCQs per Subject
                  </h3>
                  {mcqsBySubject.length > 0 ? (
                    <ResponsiveContainer width="100%" height={320}>
                      <BarChart data={mcqsBySubject} margin={{ top: 5, right: 20, bottom: 80, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="mcqs" radius={[6, 6, 0, 0]}>
                          {mcqsBySubject.map((entry, i) => (
                            <Cell key={i} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-10">No data</p>
                  )}
                </div>

                <div className="rounded-xl border border-border bg-card p-5 shadow">
                  <h3 className="mb-4 text-base font-bold text-foreground flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" /> Category Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                      <Tooltip />
                      <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} label={({ name, value }) => `${name}: ${value}`}>
                        {categoryData.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="rounded-xl border border-border bg-card p-5 shadow">
                  <h3 className="mb-4 text-base font-bold text-foreground flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" /> Submission Breakdown
                  </h3>
                  {pending.length > 0 ? (
                    <ResponsiveContainer width="100%" height={320}>
                      <PieChart>
                        <Tooltip />
                        <Pie data={submissionStats} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={110} label={({ name, value }) => `${name}: ${value}`}>
                          {submissionStats.map((entry, i) => (
                            <Cell key={i} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-10">No submissions yet</p>
                  )}
                </div>

                <div className="rounded-xl border border-border bg-card p-5 shadow">
                  <h3 className="mb-4 text-base font-bold text-foreground">Quick Stats</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Total Subjects", value: subjects.length },
                      { label: "Total MCQs", value: totalMCQs },
                      { label: "Avg MCQs/Subject", value: subjects.length > 0 ? (totalMCQs / subjects.length).toFixed(1) : "0" },
                      { label: "Main Subjects", value: subjects.filter((s) => s.category === "main").length },
                      { label: "Other Subjects", value: subjects.filter((s) => s.category === "other").length },
                      { label: "Total Submissions", value: pending.length },
                      { label: "Approval Rate", value: pending.length > 0 ? `${Math.round((pending.filter((p) => p.status === "approved").length / pending.length) * 100)}%` : "N/A" },
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                        <span className="text-sm font-semibold text-foreground">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;


