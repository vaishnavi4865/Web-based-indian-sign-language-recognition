import { useState } from "react";
import { SLIDES } from "../data";
import { ChevronLeft, ChevronRight, Copy, Check, MessageSquare, Monitor, Sparkles } from "lucide-react";

export default function SlidesPlayer() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const slide = SLIDES[currentIdx];

  const handleNext = () => {
    if (currentIdx < SLIDES.length - 1) {
      setCurrentIdx((prev: number) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev: number) => prev - 1);
    }
  };

  const handleCopy = () => {
    const text = `Slide ${slide.number}: ${slide.title}\n\nKey Points:\n${slide.bullets
      .map((b) => `• ${b}`)
      .join("\n")}\n\nSpeaker Notes:\n${slide.speakerNotes}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full font-sans">
      {/* Slide Visual Deck Container */}
      <div className="flex-1 flex flex-col justify-between bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-xl relative min-h-[460px]">
        {/* Presentation Slide Content Stage */}
        <div className="p-8 md:p-12 flex-1 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Presentation background pattern */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Slide Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-slate-400 font-medium">
                ISL TRANSLATION SYSTEM • DISSERTATION PPT
              </span>
            </div>
            <span className="text-sm font-mono font-bold text-slate-400 bg-slate-800/60 px-3 py-1 rounded-full border border-slate-700/50">
              Slide {slide.number} of {SLIDES.length}
            </span>
          </div>

          {/* Slide Body */}
          <div className="my-8 z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left side Bullet points */}
            <div className="md:col-span-7 space-y-6">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight font-sans">
                {slide.title}
              </h2>
              <ul className="space-y-3.5">
                {slide.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                    <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed">
                      {bullet}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side Abstract Concept Visualization Frame */}
            <div className="md:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center h-[220px] relative overflow-hidden">
              <div className="absolute top-2 left-2 flex gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                <span className="w-2 h-2 rounded-full bg-slate-700" />
                <span className="w-2 h-2 rounded-full bg-slate-700" />
              </div>

              {renderSlideMockVisual(slide.keyVisual.type)}

              <div className="mt-4 z-10 w-full px-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/50 border border-indigo-900/50 px-2.5 py-1 rounded-full">
                  {slide.keyVisual.type} Diagram Asset
                </span>
                <p className="text-[11px] text-slate-400 mt-2 font-sans line-clamp-3 italic">
                  &quot;{slide.keyVisual.description}&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Slide Footer */}
          <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 z-10 text-slate-500 text-xs font-mono">
            <span>FINAL YEAR ENGINEERING DEFENSE © 2026</span>
            <span>PRESENTER: G. S. KIRAN</span>
          </div>
        </div>

        {/* Slide Controls Footer Panel */}
        <div className="bg-slate-950/90 border-t border-slate-800/60 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 rounded-xl text-white transition-all cursor-pointer"
              title="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 px-2">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIdx === idx ? "bg-indigo-500 scale-125" : "bg-slate-700 hover:bg-slate-500"
                  }`}
                  title={`Go to Slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={currentIdx === SLIDES.length - 1}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 rounded-xl text-white transition-all cursor-pointer"
              title="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowNotes((prev) => !prev)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium border cursor-pointer transition-all ${
                showNotes
                  ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300"
                  : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-slate-200"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              {showNotes ? "Hide Notes" : "Show Speaker Notes"}
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Slide"}
            </button>
          </div>
        </div>
      </div>

      {/* Slide Speaker Notes sidebar panel */}
      {showNotes && (
        <div className="w-full lg:w-80 bg-slate-50 border border-slate-200/80 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <Monitor className="w-4 h-4" />
              <span>PRESENTER SPEAKER NOTES</span>
            </div>
            <h4 className="text-base font-bold text-slate-800 font-sans border-b border-slate-200/80 pb-2 mb-3">
              Slide {slide.number} Speech Guide
            </h4>
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs">
              <p className="text-sm text-slate-600 font-sans leading-relaxed italic">
                &ldquo;{slide.speakerNotes}&rdquo;
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/80">
            <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100/50 flex items-start gap-2.5">
              <Sparkles className="text-indigo-600 w-4.5 h-4.5 shrink-0 mt-0.5" />
              <div className="text-[11px] text-indigo-900 leading-normal font-sans">
                <strong>Viva Defense Pro-Tip:</strong> Use these guide notes to script your presentation speech exactly as external evaluation examiners expect for a final-year engineering review.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function renderSlideMockVisual(type: string) {
  switch (type) {
    case "architecture":
      return (
        <div className="relative w-full h-12 flex items-center justify-around">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-indigo-300 text-[10px] font-mono">Webcam</div>
          <div className="w-4 h-px bg-slate-700" />
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 text-[10px] font-mono">AI</div>
          <div className="w-4 h-px bg-slate-700" />
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 text-[10px] font-mono">Speech</div>
        </div>
      );
    case "landmarks":
      return (
        <div className="relative w-24 h-20 border border-slate-800 rounded-lg bg-slate-900 flex items-center justify-center">
          <div className="absolute top-2 w-8 h-8 rounded-full border border-indigo-500/40" />
          <div className="absolute top-4 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <svg className="w-16 h-16 opacity-70" viewBox="0 0 100 100">
            <circle cx="50" cy="80" r="3" fill="#6366f1" />
            <line x1="50" y1="80" x2="50" y2="50" stroke="#6366f1" strokeWidth="2" />
            <line x1="50" y1="50" x2="30" y2="35" stroke="#6366f1" strokeWidth="1.5" />
            <line x1="50" y1="50" x2="45" y2="25" stroke="#6366f1" strokeWidth="1.5" />
            <line x1="50" y1="50" x2="60" y2="28" stroke="#6366f1" strokeWidth="1.5" />
            <line x1="50" y1="50" x2="75" y2="40" stroke="#6366f1" strokeWidth="1.5" />
            <circle cx="30" cy="35" r="2.5" fill="#10b981" />
            <circle cx="45" cy="25" r="2.5" fill="#10b981" />
            <circle cx="60" cy="28" r="2.5" fill="#10b981" />
            <circle cx="75" cy="40" r="2.5" fill="#10b981" />
          </svg>
        </div>
      );
    case "cnn-lstm":
      return (
        <div className="relative w-full h-12 flex justify-center gap-1">
          <div className="w-1.5 h-10 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
          <div className="w-1.5 h-10 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          <div className="w-1.5 h-10 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
          <div className="w-1.5 h-10 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
          <div className="w-1.5 h-10 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: "0.5s" }} />
        </div>
      );
    case "flow":
      return (
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-indigo-400 px-2 py-1 bg-slate-900 border border-slate-800 rounded">I HOME GO</span>
          <span className="text-xs text-slate-500">→</span>
          <span className="text-xs font-mono text-emerald-400 px-2 py-1 bg-slate-900 border border-slate-800 rounded">I am going home.</span>
        </div>
      );
    case "comparison":
      return (
        <div className="flex gap-4 items-center">
          <div className="text-center">
            <span className="text-xs text-rose-400 line-through">Sensor Glove</span>
            <div className="text-lg font-bold text-rose-500">₹45,000+</div>
          </div>
          <div className="text-slate-700 font-bold">VS</div>
          <div className="text-center">
            <span className="text-xs text-emerald-400 font-bold">Webcam App</span>
            <div className="text-lg font-bold text-emerald-500">₹0 (Free)</div>
          </div>
        </div>
      );
    case "modules":
    default:
      return (
        <div className="grid grid-cols-2 gap-2 w-32">
          <div className="h-6 bg-slate-800 rounded border border-slate-700 flex items-center justify-center text-[8px] text-slate-300 font-mono">VISION</div>
          <div className="h-6 bg-slate-800 rounded border border-slate-700 flex items-center justify-center text-[8px] text-slate-300 font-mono">NLP</div>
          <div className="h-6 bg-slate-800 rounded border border-slate-700 flex items-center justify-center text-[8px] text-slate-300 font-mono">EMOTION</div>
          <div className="h-6 bg-slate-800 rounded border border-slate-700 flex items-center justify-center text-[8px] text-slate-300 font-mono">TTS</div>
        </div>
      );
  }
}
