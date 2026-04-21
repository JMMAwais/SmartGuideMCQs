import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { forgotPasswordApi } from "@/services/authService"; // apna path check karo

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await forgotPasswordApi(email);
      setSent(true);
    } catch (err) {
      const message = err.response?.data || "Something went wrong!";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md border border-border rounded-xl shadow-md bg-card">

          {/* Card Header */}
          <div className="text-center space-y-3 p-6 pb-0">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Forgot Password</h2>
            <p className="text-sm text-muted-foreground">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          {/* Card Content */}
          <div className="p-6">
            {sent ? (
              <div className="text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-7 w-7 text-primary" />
                </div>
                <p className="text-sm text-foreground font-medium">
                  Password reset link sent!
                </p>
                <p className="text-sm text-muted-foreground">
                  We've sent a password reset link to <strong>{email}</strong>. Please check your inbox.
                </p>
                <Link to="/login">
                  <button className="w-full mt-2 gap-2 flex items-center justify-center border border-border rounded-lg px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Login
                  </button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <Link to="/login" className="block">
                  <button
                    type="button"
                    className="w-full gap-2 flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back to Login
                  </button>
                </Link>
              </form>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;