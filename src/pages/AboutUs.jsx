import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, Target, Users, Award, CheckCircle } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

     <section className="border-b border-border bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-14 text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            About MCQPrep
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            Pakistan's trusted free platform for competitive exam preparation — helping thousands of students practice smarter every day.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl space-y-12">

          {/* Mission */}
          <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <Target className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">Our Mission</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                MCQPrep was built with a single goal — to make quality exam preparation accessible to every student in Pakistan, completely free of cost. We believe that financial constraints should never stand between a student and their dream career in civil services, education, or any competitive field.
              </p>
            </div>
          </div>

          {/* What We Offer */}
          <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">What We Offer</h2>
              <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground sm:text-base">
                {[
                  "Subject-wise MCQs covering General Knowledge, Pakistan Studies, English, Mathematics, Computer Science, Islamiat and more",
                  "Correct answers with detailed explanations and YouTube video solutions",
                  "Regular updates with fresh questions for CSS, PMS, NTS, PPSC, FPSC exams",
                  "Community-driven question submissions reviewed by our team",
                  "Mobile-friendly design so you can practice anywhere, anytime",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Who We Are */}
          <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">Who We Are</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                We are a passionate team of educators, developers, and competitive exam enthusiasts from Pakistan. Our contributors include CSS qualifiers, university lecturers, and subject-matter experts who ensure that every question on our platform is accurate, relevant, and exam-ready.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <Award className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">Why Choose MCQPrep?</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  { title: "100% Free", desc: "No hidden fees, no premium plans — everything is free forever." },
                  { title: "Exam-Focused", desc: "Questions curated from past papers and real exam patterns." },
                  { title: "Always Updated", desc: "New MCQs added weekly to keep your preparation current." },
                  { title: "No Sign-Up Needed", desc: "Start practicing instantly without creating an account." },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-xl border border-border bg-card p-4 shadow-[var(--card-shadow)]"
                  >
                    <h3 className="text-sm font-bold text-foreground">{card.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
