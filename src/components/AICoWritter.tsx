import { useState, useRef, useEffect } from "react";

function IconSend(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 2 11 13" />
      <path d="m22 2-7 20-4-9-9-4 20-7Z" />
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

function IconMessageSquare(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconBot(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="8" width="18" height="10" rx="2" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M9 16h6" />
    </svg>
  );
}

function IconUser(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  );
}

function IconTrash2(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

function IconArrowRight(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AICoWriterProps {
  currentSectionTitle: string;
}

const QUICK_PROMPTS = [
  {
    label: "Explain CNN-LSTM layer mechanics",
    prompt: "Can you provide a rigorous academic explanation of how the CNN extracts spatial frames and how the LSTM models them temporally, with mathematical layers?"
  },
  {
    label: "Draft custom Project Evaluation tables",
    prompt: "Could you draft a sample evaluation table and metric results (such as Precision, Recall, F1-Score, and frame rates) that I can include in my final dissertation report?"
  },
  {
    label: "Suggest typical Viva Questions & Answers",
    prompt: "What are the top 5 most likely questions external engineering evaluators will ask me about this MediaPipe & CNN-LSTM sign language project, and how should I answer them professionally?"
  },
  {
    label: "How does the NLP Corrector handle SOV syntax?",
    prompt: "Can you explain how we use NLP to convert the Subject-Object-Verb grammar of Indian Sign Language into grammatically correct English Subject-Verb-Object syntax?"
  }
];

export default function AICoWriter({ currentSectionTitle }: AICoWriterProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hello! I am your AI Dissertation Mentor. I'm here to help you refine, expand, and perfect your **Web-Based Indian Sign Language Recognition System** engineering project.\n\nAsk me to write additional sections, draft code snippets, formulate tables, or conduct a **mock viva defense**!`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setError(null);
    const userMsg: ChatMessage = {
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
          context: currentSectionTitle
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to contact academic server");
      }

      const data = await res.json();
      
      const botMsg: ChatMessage = {
        role: "assistant",
        content: data.text,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: `Chat history cleared. How can I assist you with your project report or PPT slides now?`,
        timestamp: new Date()
      }
    ]);
    setError(null);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-full flex flex-col">
      {/* Advisor Header */}
      <div className="bg-slate-950 text-white p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <IconSparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-sans tracking-wide">Dissertation AI Co-Writer</h3>
            <span className="text-[10px] font-mono text-indigo-300">
              ACTIVE SECT: {currentSectionTitle || "General Overview"}
            </span>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
          title="Clear History"
        >
          <IconTrash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Message Output Container */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50 max-h-[380px]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                msg.role === "user"
                  ? "bg-slate-800 text-white"
                  : "bg-indigo-100 text-indigo-700 border border-indigo-200"
              }`}
            >
              {msg.role === "user" ? <IconUser className="w-4 h-4" /> : <IconBot className="w-4 h-4" />}
            </div>

            <div
              className={`rounded-2xl p-4 max-w-[82%] text-sm font-sans leading-relaxed whitespace-pre-line shadow-2xs ${
                msg.role === "user"
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-700 border border-slate-100"
              }`}
            >
              {msg.content}
              <div
                className={`text-[9px] mt-2 font-mono ${
                  msg.role === "user" ? "text-slate-400" : "text-slate-400"
                }`}
              >
                {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 items-center text-slate-500 text-xs font-mono py-2">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            <span>AI Advisor formulating academic response...</span>
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-3.5 text-xs text-rose-600 font-sans leading-relaxed">
            <strong>Error:</strong> {error}
            <div className="mt-1.5 text-[10px] text-rose-500">
              Please check if your GEMINI_API_KEY is configured correctly in the Secrets panel.
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Academic Prompts Selection */}
      <div className="border-t border-slate-100 bg-white p-4">
        <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider block mb-2">
          Suggested Academic Refinements:
        </span>
        <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto pr-1">
          {QUICK_PROMPTS.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(qp.prompt)}
              disabled={isLoading}
              className="text-[11px] font-sans font-medium text-slate-700 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 rounded-lg px-2.5 py-1.5 text-left cursor-pointer transition-all flex items-center gap-1 shrink-0"
            >
              <span>{qp.label}</span>
              <IconArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Message Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="border-t border-slate-100 p-4 bg-slate-50/50 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder="Ask me to draft chapters, metrics, or test questions..."
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-2xs font-sans placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-3 rounded-xl bg-slate-950 text-white hover:bg-indigo-600 disabled:opacity-40 disabled:hover:bg-slate-950 cursor-pointer transition-colors"
        >
          <IconSend className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
