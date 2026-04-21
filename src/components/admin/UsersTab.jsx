import { useState, useEffect } from "react";
import { User, Mail, Lock, Shield, Plus, Search, Edit, X, Trash2 } from "lucide-react";
import { createUser, getAllUsers } from "../../services/authService";

const ALL_PERMISSIONS = [
  { key: "019d4aa0-592c-7f0e-99db-910b544b1c73", label: "MCQ Create", group: "Content" },
  { key: "019d4aa0-5990-7602-ac75-55901f6e344a", label: "MCQ Approve", group: "Moderation" },
  { key: "019d4aa0-59e4-7ce9-afe8-adedd4e2deb1", label: "MCQ Delete", group: "Content" },
  { key: "019d4aa0-59e7-7328-af88-6757ecfd5f85", label: "MCQ Update", group: "Content" },
  { key: "019d4aa0-59e8-7368-99bf-0be69e451764", label: "Subject Create", group: "Content" },
  { key: "019d4aa0-59e9-70cf-a08c-3d72b356731a", label: "Subject Delete", group: "Content" },
  { key: "019d4aa0-59ea-7ed8-970a-e3978c76eea0", label: "Subject Update", group: "Content" },
];

const DEFAULT_USER_PERMISSIONS = [];
const DEFAULT_ADMIN_PERMISSIONS = ALL_PERMISSIONS.map((p) => p.key);

function UsersTab() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [permissions, setPermissions] = useState(DEFAULT_USER_PERMISSIONS);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      const res = await getAllUsers();
      if (res.success) setUsers(res.data);
    } catch (err) {
      console.error("Users fetch error:", err);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const resetForm = () => {
    setName(""); setEmail(""); setPassword("");
    setRole("User"); setPermissions(DEFAULT_USER_PERMISSIONS);
    setShowForm(false); setMessage(null);
  };

  const togglePermission = (key) => {
    setPermissions((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  const handleRoleChange = (r) => {
    setRole(r);
    setPermissions(r === "Admin" ? DEFAULT_ADMIN_PERMISSIONS : DEFAULT_USER_PERMISSIONS);
  };

  const handleCreate = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) return;
    try {
      setLoading(true);
      setMessage(null);
      const res = await createUser({
        fullName: name, email, password, role,
        extraPermissions: permissions,
      });
      if (res.success) {
        setMessage({ type: "success", text: "User created successfully!" });
        fetchUsers();
        resetForm();
      } else {
        setMessage({ type: "error", text: res.message || "Failed to create user." });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <User className="h-5 w-5 text-primary" /> User Management
        </h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-48 rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" /> Create User
          </button>
        </div>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="rounded-xl border border-border bg-card p-6 shadow">
          <h3 className="text-base font-bold text-foreground mb-5">Create New User</h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe"
                    className="w-full h-10 rounded-md border border-input bg-background pl-10 pr-3 text-sm outline-none focus:border-primary" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com"
                    className="w-full h-10 rounded-md border border-input bg-background pl-10 pr-3 text-sm outline-none focus:border-primary" />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters"
                    className="w-full h-10 rounded-md border border-input bg-background pl-10 pr-3 text-sm outline-none focus:border-primary" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Role</label>
                <div className="flex gap-2">
                  {["User", "Admin"].map((r) => (
                    <button key={r} onClick={() => handleRoleChange(r)}
                      className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-medium border transition-colors ${
                        role === r ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:bg-muted"
                      }`}>
                      {r === "Admin" ? <Shield className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" /> Permissions
              </label>
              <div className="grid gap-3 sm:grid-cols-3">
                {["Content", "Moderation", "Administration"].map((group) => (
                  <div key={group} className="rounded-lg border border-border p-3 space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{group}</p>
                    {ALL_PERMISSIONS.filter((p) => p.group === group).map((perm) => (
                      <label key={perm.key} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 rounded px-1 py-0.5">
                        <input type="checkbox" checked={permissions.includes(perm.key)}
                          onChange={() => togglePermission(perm.key)}
                          className="h-4 w-4 rounded border-input accent-primary" />
                        <span className="text-foreground">{perm.label}</span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {message && (
              <p className={`text-sm font-medium ${message.type === "success" ? "text-green-600" : "text-red-500"}`}>
                {message.text}
              </p>
            )}

            <div className="flex gap-2 justify-end pt-1">
              <button onClick={resetForm} className="rounded-md border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-muted">
                Cancel
              </button>
              <button onClick={handleCreate} disabled={loading || !name.trim() || !email.trim() || !password.trim()}
                className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">
                {loading ? "Creating..." : "Create User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="rounded-xl border border-border bg-card shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-4 py-3 text-left font-semibold text-foreground">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Role</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Created</th>
              <th className="px-4 py-3 text-right font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersLoading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="border-b border-border">
                  <td colSpan={6} className="px-4 py-3">
                    <div className="h-4 rounded bg-gray-200 animate-pulse" />
                  </td>
                </tr>
              ))
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No users found.</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{user.name || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      user.roles?.includes("Admin")
                        ? "bg-primary text-white"
                        : "bg-secondary text-secondary-foreground"
                    }`}>
                      {user.roles?.[0]?.toLowerCase() || "user"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-700">
                      active
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-sm">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                      <button className="rounded-md p-1.5 text-red-500 hover:bg-red-50 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default UsersTab;