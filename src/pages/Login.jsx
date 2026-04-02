import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const user = await login(email, password);

      if (user?.roles?.includes("Admin")) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card shadow-md">

          {/* Card Header */}
          <div className="text-center space-y-3 px-6 pt-8 pb-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
              <ShieldCheck className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Card Content */}
          <div className="px-6 pb-8">
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-input pl-10 pr-3 py-2 text-sm outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-input pl-10 pr-3 py-2 text-sm outline-none focus:border-primary"
                    required
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm font-medium text-red-500">{error}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
