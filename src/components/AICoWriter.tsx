interface AICoWriterProps {
  currentSectionTitle: string;
}

export default function AICoWriter({ currentSectionTitle }: AICoWriterProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xs">
      <h2 className="text-lg font-bold text-slate-900 mb-3">AI Project Mentor</h2>
      <p className="text-sm text-slate-600 mb-4">
        Ask the mentor for suggestions, code improvements, or report expansion based on the current section.
      </p>
      <div className="rounded-2xl bg-slate-50 p-4 text-slate-700 text-sm">
        Current section: <span className="font-semibold">{currentSectionTitle}</span>
      </div>
    </div>
  );
}
