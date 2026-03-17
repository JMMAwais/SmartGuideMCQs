import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-foreground">
                MCQ<span className="text-primary">Prep</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Prepare for your exams with thousands of MCQs across multiple subjects.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/subjects" className="hover:text-primary transition-colors">All Subjects</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Popular Subjects</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link to="/subject/general-knowledge" className="hover:text-primary transition-colors">General Knowledge</Link></li>
              <li><Link to="/subject/pakistan-studies" className="hover:text-primary transition-colors">Pakistan Studies</Link></li>
              <li><Link to="/subject/mathematics" className="hover:text-primary transition-colors">Mathematics</Link></li>
              <li><Link to="/subject/english" className="hover:text-primary transition-colors">English</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Contact Us</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>info@mcqprep.com</li>
              <li>+92 300 1234567</li>
            </ul>
          </div>

        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MCQPrep. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;