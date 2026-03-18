import { Link } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      
      <div className="container mx-auto flex items-center justify-between px-4 py-3">

        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <BookOpen size={20} />
          </div>

          <span className="text-xl font-bold tracking-tight text-foreground">
            MCQ<span className="text-primary">Prep</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">

          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/subjects" className="nav-link">
            All Subjects
          </Link>

          <Link to="/contact" className="nav-link">
            Contact
          </Link>

          <Link to="/login" className="ml-1 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Login
          </Link>

        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md p-2 md:hidden hover:bg-secondary"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="border-t border-border bg-card px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">

            <Link to="/" onClick={() => setMobileOpen(false)} className="mobile-link">
              Home
            </Link>

            <Link to="/subjects" onClick={() => setMobileOpen(false)} className="mobile-link">
              All Subjects
            </Link>

            <Link to="/contact" onClick={() => setMobileOpen(false)} className="mobile-link">
              Contact
            </Link>

            <Link to="/login" onClick={() => setMobileOpen(false)} className="mobile-link font-semibold text-primary">
              Login
            </Link>

          </div>
        </nav>
      )}

    </header>
  );
}

export default Header;