import { useState, useEffect } from "react";
// import { getDashboardStats } from "../../services/mcqService";
import { getDashboardStats, getMcqsBySubjectStats } from "../../services/mcqService";
import * as store from "../../lib/adminStore";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from "recharts";
import { Bell, BookOpen, Check, ClipboardList, BarChart3, TrendingUp } from "lucide-react";
 
const CHART_COLORS = [
  "#3b82f6", "#f59e0b", "#ef4444", "#22c55e",
  "#eab308", "#a855f7", "#f97316", "#06b6d4",
];
 
function OverviewTab() {
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState(false);
 
  // Static store data (charts + notifications)
  const subjects = store.getSubjects();
  const pending = store.getPendingMCQs();
  const notifications = store.getNotifications();


  const [chartData, setChartData] = useState([]);
const [chartLoading, setChartLoading] = useState(true);
 
  // Fetch dashboard stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        setStatsError(false);
        const res = await getDashboardStats();
        if (res.success) {
          setStats(res.data);
        } else {
          setStatsError(true);
        }
      } catch (err) {
        console.error("Dashboard Stats Error:", err);
        setStatsError(true);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);


  useEffect(() => {
  const fetchChartData = async () => {
    try {
      setChartLoading(true);
      const res = await getMcqsBySubjectStats();
      if (res.success) {
        const formatted = res.data.map((item, i) => ({
          name: item.subjectName,
          mcqs: item.mcqCount,
          fill: CHART_COLORS[i % CHART_COLORS.length],
        }));
        setChartData(formatted);
      }
    } catch (err) {
      console.error("Chart Data Error:", err);
    } finally {
      setChartLoading(false);
    }
  };
  fetchChartData();
}, []);
 
  // Chart data
 // Chart mein
{chartLoading ? (
  <div className="h-[280px] flex items-center justify-center">
    <div className="h-8 w-32 rounded bg-gray-200 animate-pulse" />
  </div>
) : chartData.length > 0 ? (
  <ResponsiveContainer width="100%" height={280}>
    <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 60, left: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-35} textAnchor="end" />
      <YAxis allowDecimals={false} />
      <Tooltip />
      <Bar dataKey="mcqs" radius={[6, 6, 0, 0]}>
        {chartData.map((entry, i) => (
          <Cell key={i} fill={entry.fill} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
) : (
  <p className="text-sm text-muted-foreground text-center py-10">No data available</p>
)}
 
  const submissionStats = [
    { name: "Pending", value: stats?.pendingSubmissions ?? 0, fill: "#eab308" },
    { name: "Approved", value: stats?.approved ?? 0, fill: "#22c55e" },
  ];
 
  const statCards = [
    {
      label: "Total Subjects",
      value: stats?.totalSubjects,
      icon: BookOpen,
    },
    {
      label: "Total MCQs",
      value: stats?.totalMCQs,
      icon: ClipboardList,
    },
    {
      label: "Pending Submissions",
      value: stats?.pendingSubmissions,
      icon: Bell,
    },
    {
      label: "Approved",
      value: stats?.approved,
      icon: Check,
    },
  ];
 
  return (
    <div className="space-y-6">
 
      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-5 shadow flex items-center gap-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              {statsLoading ? (
                <div className="h-7 w-10 rounded bg-gray-200 animate-pulse mb-1" />
              ) : statsError ? (
                <p className="text-2xl font-bold text-red-400">—</p>
              ) : (
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              )}
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
 
      {/* Error Message */}
      {statsError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          Failed to load dashboard stats.
          <button
            onClick={() => window.location.reload()}
            className="ml-2 font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}
 
      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
 
        {/* MCQs by Subject */}
        <div className="rounded-xl border border-border bg-card p-5 shadow">
          <h3 className="mb-4 text-base font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" /> MCQs by Subject
          </h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 60, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-35} textAnchor="end" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="mcqs" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-10">No data available</p>
          )}
        </div>
 
        {/* Submission Status */}
        <div className="rounded-xl border border-border bg-card p-5 shadow">
          <h3 className="mb-4 text-base font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" /> Submission Status
          </h3>
          {!statsLoading && (stats?.pendingSubmissions > 0 || stats?.approved > 0) ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Tooltip />
                <Pie
                  data={submissionStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name}: ${value}`}
                >
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
 
      </div>
 
      {/* Recent Activity */}
      <div className="rounded-xl border border-border bg-card p-5 shadow">
        <h3 className="mb-3 text-base font-bold text-foreground">Recent Activity</h3>
        {notifications.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent activity.</p>
        ) : (
          <div className="space-y-2">
            {notifications.slice(0, 5).map((n) => (
              <div
                key={n.id}
                className="flex items-start gap-3 rounded-lg border border-border p-3 text-sm"
              >
                <Bell className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-foreground">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(n.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
 
    </div>
  );
}
 
export default OverviewTab;