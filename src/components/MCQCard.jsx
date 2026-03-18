import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, XCircle, Youtube, Lightbulb } from "lucide-react";

const optionLabels = ["A", "B", "C", "D"];

function MCQCard({ mcq, index }) {
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const answered = selected !== null;
  const isCorrect = selected === mcq.correctIndex;

  const handleSelect = (optIndex) => {
    if (answered) return;
    setSelected(optIndex);
  };

  const getOptionClasses = (optIndex) => {
    const base =
      "flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all cursor-pointer";

    if (!answered) {
      return `${base} border-border hover:border-primary/50 hover:bg-secondary text-foreground`;
    }

    if (optIndex === mcq.correctIndex) {
      return `${base} border-green-500 bg-green-50 text-green-700`;
    }

    if (optIndex === selected && !isCorrect) {
      return `${base} border-red-500 bg-red-50 text-red-700`;
    }

    return `${base} border-border text-muted-foreground opacity-60`;
  };

  return (
    <div className="rounded-xl border border-border bg-card shadow transition-shadow hover:shadow-md">

      {/* Question */}
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-100 text-xs font-bold text-primary">
            {index + 1}
          </span>
          <h3 className="text-base font-semibold leading-relaxed text-foreground">
            {mcq.question}
          </h3>
        </div>
      </div>

      {/* Options */}
      <div className="grid gap-2.5 p-5 sm:grid-cols-2">
        {mcq.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={answered}
            className={getOptionClasses(i)}
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-bold">
              {optionLabels[i]}
            </span>
            <span className="text-left">{opt}</span>
            {answered && i === mcq.correctIndex && (
              <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-green-600" />
            )}
            {answered && i === selected && !isCorrect && i !== mcq.correctIndex && (
              <XCircle className="ml-auto h-5 w-5 shrink-0 text-red-600" />
            )}
          </button>
        ))}
      </div>

      {/* Result + Explanation toggle */}
      {answered && (
        <div className="border-t border-border px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-green-600">
                  <CheckCircle2 className="h-4 w-4" /> Correct!
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-red-600">
                  <XCircle className="h-4 w-4" /> Incorrect
                </span>
              )}
            </div>

            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-secondary"
            >
              <Lightbulb className="h-4 w-4" />
              {showExplanation ? "Hide" : "Show"} Explanation
              {showExplanation ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>

          {showExplanation && (
            <div className="mt-3 rounded-lg bg-secondary p-4">
              <p className="text-sm leading-relaxed text-secondary-foreground">
                {mcq.explanation}
              </p>
              {mcq.youtubeUrl && (
                <a
                  href={mcq.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-md bg-red-600 px-3.5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <Youtube className="h-4 w-4" />
                  Watch Video Solution
                </a>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default MCQCard;