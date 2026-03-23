import { subjects as defaultSubjects } from "../data/mcqData";

const SUBJECTS_KEY = "mcqprep_subjects";
const PENDING_KEY = "mcqprep_pending";
const NOTIFICATIONS_KEY = "mcqprep_notifications";

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// --- Subjects ---
export function getSubjects() {
  return load(SUBJECTS_KEY, defaultSubjects);
}

export function saveSubjects(subjects) {
  save(SUBJECTS_KEY, subjects);
}

export function addSubject(subject) {
  const s = getSubjects();
  s.push(subject);
  saveSubjects(s);
}

export function updateSubject(id, updates) {
  const s = getSubjects().map((sub) =>
    sub.id === id ? { ...sub, ...updates } : sub
  );
  saveSubjects(s);
}

export function deleteSubject(id) {
  saveSubjects(getSubjects().filter((s) => s.id !== id));
}

// --- MCQs ---
export function addMCQ(subjectId, mcq) {
  const s = getSubjects().map((sub) => {
    if (sub.id === subjectId) return { ...sub, mcqs: [...sub.mcqs, mcq] };
    return sub;
  });
  saveSubjects(s);
}

export function updateMCQ(subjectId, mcqId, updates) {
  const s = getSubjects().map((sub) => {
    if (sub.id === subjectId) {
      return {
        ...sub,
        mcqs: sub.mcqs.map((m) =>
          m.id === mcqId ? { ...m, ...updates } : m
        ),
      };
    }
    return sub;
  });
  saveSubjects(s);
}

export function deleteMCQ(subjectId, mcqId) {
  const s = getSubjects().map((sub) => {
    if (sub.id === subjectId) {
      return { ...sub, mcqs: sub.mcqs.filter((m) => m.id !== mcqId) };
    }
    return sub;
  });
  saveSubjects(s);
}

// --- Pending MCQs ---
export function getPendingMCQs() {
  return load(PENDING_KEY, []);
}

export function addPendingMCQ(mcq) {
  const pending = getPendingMCQs();
  const newMcq = {
    ...mcq,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    status: "pending",
  };
  pending.push(newMcq);
  save(PENDING_KEY, pending);

  addNotification({
    message: `New MCQ submitted by ${mcq.submitterName} for "${mcq.question.slice(0, 50)}..."`,
    type: "submission",
    relatedId: newMcq.id,
  });

  return newMcq;
}

export function approvePendingMCQ(id) {
  const pending = getPendingMCQs();
  const mcq = pending.find((m) => m.id === id);
  if (!mcq) return;

  const subjects = getSubjects();
  const sub = subjects.find((s) => s.id === mcq.subjectId);
  if (!sub) return;

  const newId =
    sub.mcqs.length > 0 ? Math.max(...sub.mcqs.map((m) => m.id)) + 1 : 1;

  addMCQ(mcq.subjectId, {
    id: newId,
    question: mcq.question,
    options: mcq.options,
    correctIndex: mcq.correctIndex,
    explanation: mcq.explanation,
    youtubeUrl: mcq.youtubeUrl,
  });

  save(
    PENDING_KEY,
    pending.map((m) => (m.id === id ? { ...m, status: "approved" } : m))
  );
}

export function rejectPendingMCQ(id) {
  const pending = getPendingMCQs();
  save(
    PENDING_KEY,
    pending.map((m) => (m.id === id ? { ...m, status: "rejected" } : m))
  );
}

// --- Notifications ---
export function getNotifications() {
  return load(NOTIFICATIONS_KEY, []);
}

export function addNotification(n) {
  const notifs = getNotifications();
  notifs.unshift({
    ...n,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    read: false,
  });
  save(NOTIFICATIONS_KEY, notifs);
}

export function markNotificationRead(id) {
  const notifs = getNotifications().map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  save(NOTIFICATIONS_KEY, notifs);
}

export function markAllNotificationsRead() {
  save(
    NOTIFICATIONS_KEY,
    getNotifications().map((n) => ({ ...n, read: true }))
  );
}