import { BookOpen, ClipboardList, BarChart3, Bell, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "subjects", label: "Subjects", icon: BookOpen },
  { id: "mcqs", label: "MCQs", icon: ClipboardList },
  { id: "submissions", label: "Submissions", icon: Bell },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

function AdminSidebar({ activeTab, onTabChange, pendingCount }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col border-r border-border bg-card">

      {/* Top Label */}
      <div className="px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Admin Panel
        </p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-2">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  activeTab === item.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="flex flex-1 items-center justify-between">
                  {item.label}
                  {/* Pending badge — sirf Submissions pe */}
                  {item.id === "submissions" && pendingCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white">
                      {pendingCount}
                    </span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default AdminSidebar;