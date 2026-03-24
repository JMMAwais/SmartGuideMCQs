import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is MCQPrep completely free to use?",
    answer:
      "Yes! MCQPrep is 100% free. You can access all MCQs, past papers, and practice tests without any registration or payment.",
  },
  {
    question: "How often are new MCQs added?",
    answer:
      "We update our question bank regularly with fresh MCQs across all subjects. New questions are added weekly to keep your preparation up to date.",
  },
  {
    question: "Which competitive exams does MCQPrep cover?",
    answer:
      "MCQPrep covers a wide range of competitive exams including CSS, PMS, NTS, PPSC, FPSC, and other federal and provincial-level tests in Pakistan.",
  },
  {
    question: "Can I submit my own MCQs?",
    answer:
      "Absolutely! We encourage contributions from educators and students. Use the 'Submit MCQ' option to share your questions. Each submission is reviewed before being published.",
  },
  {
    question: "How do I know which answer is correct?",
    answer:
      "The correct answer is highlighted in bold for every MCQ. You can also visit individual subject pages for detailed explanations where available.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account is needed to browse and practice MCQs. Simply visit the site and start practicing right away.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Everything you need to know about MCQPrep
            </p>
          </div>

          <div className="w-full divide-y divide-border">
            {faqs.map((faq, index) => (
              <div key={index} className="py-1">

                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between py-4 text-left text-base font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {faq.question}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="pb-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default FAQ;