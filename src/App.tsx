import { useState } from "react";
import {
  REPORT_SECTIONS,
  DIAGRAM_DESCRIPTION,
  ReportSection
} from "./data";
import SlidesPlayer from "./components/SlidesPlayer";
import UMLDiagrams from "./components/UMLDiagrams";
import AICoWriter from "./components/AICoWriter";

function IconBookOpen(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 6a2 2 0 0 1 2-2h5a3 3 0 0 1 3 3v13H4a2 2 0 0 1-2-2z" />
      <path d="M22 6a2 2 0 0 0-2-2h-5a3 3 0 0 0-3 3v13h8a2 2 0 0 0 2-2z" />
    </svg>
  );
}

function IconPresentation(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M12 16v4" />
      <path d="M8 20h8" />
    </svg>
  );
}

function IconLayers(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  );
}

function IconGraduationCap(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3 1 7l11 4 11-4-11-4Z" />
      <path d="M5 10v4a2 2 0 0 0 1 1.7L12 21l6-5.3A2 2 0 0 0 19 14v-4" />
      <path d="M12 7v14" />
    </svg>
  );
}

function IconCopy(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconCheck(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IconDownload(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function IconInfo(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function IconChevronRight(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function IconBookMarked(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
      <path d="M8 7h8" />
      <path d="M8 11h8" />
    </svg>
  );
}

function IconSparkles(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
      <path d="M5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15z" />
    </svg>
  );
}

function IconHelpCircle(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

type WorkspaceMode = "report" | "presentation" | "blueprints" | "architecture-diagram";

export default function App() {
  const [activeMode, setActiveMode] = useState<WorkspaceMode>("report");
  const [selectedSectionId, setSelectedSectionId] = useState("abstract");
  const [copiedReport, setCopiedReport] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAiAdvisor, setShowAiAdvisor] = useState(true);

  const selectedSection = REPORT_SECTIONS.find((s) => s.id === selectedSectionId) || REPORT_SECTIONS[0];

  const handleCopySectionText = () => {
    const text = `${selectedSection.title}\n\n${selectedSection.content.join("\n\n")}`;
    navigator.clipboard.writeText(text);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    let fullMarkdown = `# Web-Based Indian Sign Language Recognition System\n\n`;
    fullMarkdown += `*A Comprehensive Final-Year Engineering Project Report and Presentation Suite*\n\n---\n\n`;

    REPORT_SECTIONS.forEach((section) => {
      fullMarkdown += `## ${section.title}\n\n`;
      section.content.forEach((para) => {
        fullMarkdown += `${para}\n\n`;
      });
      fullMarkdown += `---\n\n`;
    });

    fullMarkdown += `## System Architecture Diagram Description\n\n${DIAGRAM_DESCRIPTION}`;

    const blob = new Blob([fullMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Indian_Sign_Language_Recognition_Project_Report.md";
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredSections = REPORT_SECTIONS.filter((sec) =>
    sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sec.content.some((para) => para.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col text-slate-800">
      <header className="bg-white border-b border-slate-100 shadow-3xs sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-950 flex items-center justify-center text-white shadow-xs">
              <IconGraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold font-mono tracking-widest text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded-sm">
                  Final-Year Engineering Dissertation Suite
                </span>
                <span className="text-[10px] font-bold font-mono text-slate-400">
                  CLASS OF 2026
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight font-display">
                Indian Sign Language Recognition System
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-2 px-4 py-2 bg-slate-950 hover:bg-slate-850 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-colors"
            >
              <IconDownload className="w-3.5 h-3.5" />
              <span>Export Dossier (.MD)</span>
            </button>
            <div className="h-4 w-px bg-slate-200 hidden md:block" />
            <div className="hidden md:flex flex-col items-end text-right">
              <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">
                Academic Standard
              </span>
              <span className="text-xs text-slate-700 font-semibold font-sans">
                IEEE Formatting Verified
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-slate-200/60 shadow-3xs">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex gap-1.5 overflow-x-auto">
            <button
              onClick={() => setActiveMode("report")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
                activeMode === "report"
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-transparent hover:bg-slate-100 text-slate-600"
              }`}
            >
              <IconBookOpen className="w-4 h-4" />
              <span>Project Report & Chapters</span>
            </button>
            <button
              onClick={() => setActiveMode("presentation")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
                activeMode === "presentation"
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-transparent hover:bg-slate-100 text-slate-600"
              }`}
            >
              <IconPresentation className="w-4 h-4" />
              <span>PowerPoint Slide Deck (10 Slides)</span>
            </button>
            <button
              onClick={() => setActiveMode("blueprints")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
                activeMode === "blueprints"
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-transparent hover:bg-slate-100 text-slate-600"
              }`}
            >
              <IconLayers className="w-4 h-4" />
              <span>Interactive UML & DFD Blueprints</span>
            </button>
            <button
              onClick={() => setActiveMode("architecture-diagram")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
                activeMode === "architecture-diagram"
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-transparent hover:bg-slate-100 text-slate-600"
              }`}
            >
              <IconInfo className="w-4 h-4" />
              <span>Architectural Asset Descriptor</span>
            </button>
          </div>

          <button
            onClick={() => setShowAiAdvisor((prev) => !prev)}
            className={`text-xs font-bold font-sans px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer border ${
              showAiAdvisor
                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <IconSparkles className="w-3.5 h-3.5" />
            <span>AI Advisor</span>
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-6">
          {activeMode === "report" && (
            <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-[550px]">
              <div className="w-full md:w-64 bg-white rounded-3xl border border-slate-100 shadow-2xs p-4 flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search thesis text..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs focus:outline-hidden focus:ring-1 focus:ring-slate-400 font-sans"
                  />
                  <div className="absolute right-2.5 top-2.5 text-slate-400 text-xs">🔍</div>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[420px] pr-1 space-y-1">
                  <div className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest px-2.5 pb-2">
                    Report Chapters
                  </div>
                  {filteredSections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => setSelectedSectionId(sec.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                        selectedSectionId === sec.id
                          ? "bg-slate-100 text-slate-900"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className="truncate">{sec.title}</span>
                      <IconChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                        selectedSectionId === sec.id ? "translate-x-0.5 text-slate-800" : "text-slate-300"
                      }`} />
                    </button>
                  ))}
                  {filteredSections.length === 0 && (
                    <div className="p-4 text-center text-xs text-slate-400 font-sans">
                      No chapters match "{searchQuery}"
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-2xs p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <IconBookMarked className="w-4.5 h-4.5 text-slate-400" />
                      <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-slate-400">
                        {selectedSection.category} Section
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopySectionText}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-[11px] font-semibold border border-slate-200/80 cursor-pointer transition-colors"
                      >
                        {copiedReport ? <IconCheck className="w-3.5 h-3.5 text-emerald-500" /> : <IconCopy className="w-3.5 h-3.5" />}
                        <span>{copiedReport ? "Copied" : "Copy Chapter"}</span>
                      </button>
                    </div>
                  </div>

                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-display mb-6">
                    {selectedSection.title}
                  </h2>

                  <div className="space-y-5 text-slate-600 font-sans text-sm md:text-base leading-relaxed">
                    {selectedSection.content.map((paragraph, i) => (
                      <p key={i} className="font-light">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-12 pt-6 border-t border-slate-100 bg-slate-50/50 -mx-8 -mb-8 p-6 rounded-b-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex gap-2.5 items-start">
                    <IconInfo className="text-indigo-600 w-4.5 h-4.5 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-600 leading-normal font-sans">
                      <strong>IEEE Format Citation Rule:</strong> For referencing this project section, consult the list of references in section 18 of this report.
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedSectionId("references");
                      const el = document.getElementById("references");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs text-indigo-600 font-bold hover:underline cursor-pointer shrink-0"
                  >
                    View References →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeMode === "presentation" && (
            <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-2xs p-6">
              <div className="mb-4">
                <span className="text-[10px] font-bold font-mono tracking-widest text-indigo-600 uppercase">
                  Interactive Slides Suite
                </span>
                <h2 className="text-xl font-bold text-slate-800 font-display">
                  PowerPoint Presentation Slide Deck (10 Slides)
                </h2>
              </div>
              <SlidesPlayer />
            </div>
          )}

          {activeMode === "blueprints" && (
            <div className="flex-1">
              <UMLDiagrams />
            </div>
          )}

          {activeMode === "architecture-diagram" && (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-2xs p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-slate-400">
                    Graphic / Prompt Descriptor
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      Generative Ready
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-display mb-4">
                  Architecture Diagram Description
                </h2>
                <p className="text-sm text-slate-500 font-sans mb-6">
                  Use the following detailed description as a highly optimized prompt to feed into image generators or diagram software (like draw.io or Visio) to recreate the perfect visual architectural schematic.
                </p>

                <div className="bg-slate-950 text-slate-100 p-6 rounded-2xl border border-slate-800 font-mono text-xs leading-relaxed whitespace-pre-line overflow-x-auto">
                  {DIAGRAM_DESCRIPTION}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="bg-indigo-50 border border-indigo-100/50 rounded-2xl p-4 flex gap-3">
                  <IconHelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-indigo-900 font-sans leading-normal">
                    <strong>Architecture Blueprint Highlight:</strong> This detailed setup provides a robust bidirectional sequence mapping. If examiners ask how data security is preserved, emphasize that keypoint normalization removes the requirement to store video files on server clusters, preventing data leakage.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {showAiAdvisor && (
          <div className="w-full lg:w-96 shrink-0 h-[560px]">
            <AICoWriter currentSectionTitle={selectedSection.title} />
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-100 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-sans">
            Web-Based Indian Sign Language Recognition System Project Hub © 2026. Designed for academic and professional presentation defense.
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-slate-400 font-mono">IEEE Formatting</span>
            <span className="text-xs text-slate-400 font-mono">MediaPipe Core</span>
            <span className="text-xs text-slate-400 font-mono">CNN-LSTM DL Network</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
