import { useState } from "react";

interface DiagramTab {
  id: string;
  title: string;
  category: "UML" | "DFD";
  description: string;
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

function IconZoomIn(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function IconZoomOut(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

const TABS: DiagramTab[] = [
  {
    id: "usecase",
    title: "UML Use Case",
    category: "UML",
    description: "Illustrates actors (Signer, Recipient) and system boundaries, showcasing real-time coordinate detection, model categorization, sentence correction, and TTS translation."
  },
  {
    id: "activity",
    title: "UML Activity Flow",
    category: "UML",
    description: "Visualizes the dynamic operational flow from webcam start to frame capture, landmark checks, sliding sequence aggregation, inference, grammar remapping, and speech audio playback."
  },
  {
    id: "class",
    title: "UML Class Schema",
    category: "UML",
    description: "Describes the object-oriented architectural layout, defining class properties, attributes, and key methods for webcam buffers, estimators, classifiers, and output managers."
  },
  {
    id: "component",
    title: "UML Component View",
    category: "UML",
    description: "Deconstructs the system into modular structural components, displaying interfaces between client-side, deep learning server endpoints, and physical output devices."
  },
  {
    id: "dfd0",
    title: "DFD Level-0",
    category: "DFD",
    description: "Context diagram representing the high-level boundary of the translation machine, receiving gestures from the speaker and delivering speech translation to the recipient."
  },
  {
    id: "dfd1",
    title: "DFD Level-1",
    category: "DFD",
    description: "Detailed system data-flow modeling frame capture queues, landmark vectors, temporal classification buffers, NLP lexicons, and TTS audio synthesis commands."
  }
];

export default function UMLDiagrams() {
  const [activeTab, setActiveTab] = useState("usecase");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const activeTabMeta = TABS.find((t) => t.id === activeTab) || TABS[0];

  const handleZoom = (direction: "in" | "out") => {
    if (direction === "in" && zoomLevel < 1.4) setZoomLevel((prev) => prev + 0.1);
    if (direction === "out" && zoomLevel > 0.8) setZoomLevel((prev) => prev - 0.1);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden h-full flex flex-col">
      {/* Tabs Selector Header */}
      <div className="border-b border-slate-100 bg-slate-50/50 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              Interactive Blueprint Board
            </span>
            <h3 className="text-lg font-bold text-slate-800 mt-1.5 font-sans">
              System Blueprints & Diagrams
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleZoom("out")}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 border border-slate-200"
              title="Zoom Out"
            >
              <IconZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-500 w-12 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => handleZoom("in")}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 border border-slate-200"
              title="Zoom In"
            >
              <IconZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedNode(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium font-sans transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Diagram Canvas Area */}
      <div className="flex-1 min-h-[460px] relative bg-slate-50 p-6 flex flex-col justify-between">
        <div className="flex-1 flex items-center justify-center overflow-auto max-h-[500px]">
          <div
            style={{ transform: `scale(${zoomLevel})` }}
            className="transition-transform duration-200 w-full max-w-2xl origin-center flex justify-center"
          >
            {/* USE CASE DIAGRAM */}
            {activeTab === "usecase" && (
              <svg width="600" height="380" viewBox="0 0 600 380" className="drop-shadow-sm">
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                  </marker>
                </defs>
                {/* System Boundary Box */}
                <rect x="160" y="20" width="280" height="340" rx="12" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeDasharray="6,4" />
                <text x="300" y="42" fill="#4f46e5" fontSize="11" fontWeight="bold" textAnchor="middle" className="font-sans tracking-wide">
                  SYSTEM BOUNDARY (ISL INTERPRETER APP)
                </text>

                {/* Actor Left: ISL Speaker */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("signer")}> 
                  <circle cx="70" cy="150" r="16" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2.5" />
                  <line x1="70" y1="166" x2="70" y2="210" stroke="#4f46e5" strokeWidth="2.5" />
                  <line x1="50" y1="185" x2="90" y2="185" stroke="#4f46e5" strokeWidth="2.5" />
                  <line x1="70" y1="210" x2="52" y2="245" stroke="#4f46e5" strokeWidth="2.5" />
                  <line x1="70" y1="210" x2="88" y2="245" stroke="#4f46e5" strokeWidth="2.5" />
                  <text x="70" y="265" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle" className="font-sans">
                    ISL Speaker (Deaf)
                  </text>
                </g>

                {/* Actor Right: Recipient */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("recipient")}> 
                  <circle cx="530" cy="150" r="16" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />
                  <line x1="530" y1="166" x2="530" y2="210" stroke="#d97706" strokeWidth="2.5" />
                  <line x1="510" y1="185" x2="550" y2="185" stroke="#d97706" strokeWidth="2.5" />
                  <line x1="530" y1="210" x2="512" y2="245" stroke="#d97706" strokeWidth="2.5" />
                  <line x1="530" y1="210" x2="548" y2="245" stroke="#d97706" strokeWidth="2.5" />
                  <text x="530" y="265" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle" className="font-sans">
                    Hearing Recipient
                  </text>
                </g>

                {/* Use Case Oval 1 */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("uc_camera")}> 
                  <ellipse cx="300" cy="85" rx="80" ry="22" fill="#f8fafc" stroke="#1e293b" strokeWidth="1.5" />
                  <text x="300" y="89" fill="#334155" fontSize="11" fontWeight="semibold" textAnchor="middle" className="font-sans">
                    Start Web Camera Feed
                  </text>
                </g>

                {/* Use Case Oval 2 */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("uc_detect")}> 
                  <ellipse cx="300" cy="150" rx="85" ry="24" fill="#f8fafc" stroke="#1e293b" strokeWidth="1.5" />
                  <text x="300" y="150" fill="#334155" fontSize="10" textAnchor="middle" className="font-sans">
                    Detect Skeletal Keypoints
                  </text>
                  <text x="300" y="162" fill="#4f46e5" fontSize="9" fontWeight="bold" textAnchor="middle" className="font-sans">
                    &lt;&lt;include MediaPipe&gt;&gt;
                  </text>
                </g>

                {/* Use Case Oval 3 */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("uc_classify")}> 
                  <ellipse cx="300" cy="220" rx="85" ry="22" fill="#f8fafc" stroke="#1e293b" strokeWidth="1.5" />
                  <text x="300" y="224" fill="#334155" fontSize="10.5" fontWeight="semibold" textAnchor="middle" className="font-sans">
                    Classify CNN-LSTM Gestures
                  </text>
                </g>

                {/* Use Case Oval 4 */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("uc_tts")}> 
                  <ellipse cx="300" cy="295" rx="80" ry="22" fill="#f8fafc" stroke="#1e293b" strokeWidth="1.5" />
                  <text x="300" y="299" fill="#334155" fontSize="11" fontWeight="semibold" textAnchor="middle" className="font-sans">
                    Synthesize Speech (TTS)
                  </text>
                </g>

                {/* Connection Lines with markers */}
                <line x1="95" y1="150" x2="215" y2="85" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <line x1="95" y1="170" x2="210" y2="150" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <line x1="95" y1="190" x2="212" y2="220" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <line x1="490" y1="180" x2="385" y2="295" stroke="#94a3b8" strokeWidth="1.5" markerStart="url(#arrow)" />
              </svg>
            )}

            {/* ACTIVITY FLOW DIAGRAM */}
            {activeTab === "activity" && (
              <svg width="600" height="380" viewBox="0 0 600 380" className="drop-shadow-sm">
                <defs>
                  <marker id="arrow-act" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
                  </marker>
                </defs>
                {/* Initial Node */}
                <circle cx="300" cy="25" r="9" fill="#0f172a" />
                <text x="300" y="44" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">START</text>

                {/* Arrow 1 */}
                <line x1="300" y1="34" x2="300" y2="60" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-act)" />

                {/* Box 1: Stream Frames */}
                <rect x="200" y="60" width="200" height="35" rx="6" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
                <text x="300" y="81" fill="#334155" fontSize="10.5" fontWeight="semibold" textAnchor="middle">1. Capture Camera Video Frames</text>

                <line x1="300" y1="95" x2="300" y2="115" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-act)" />

                {/* Box 2: Landmarks */}
                <rect x="180" y="115" width="240" height="35" rx="6" fill="#f1f5f9" stroke="#6366f1" strokeWidth="1.5" />
                <text x="300" y="136" fill="#4f46e5" fontSize="10.5" fontWeight="bold" textAnchor="middle">2. MediaPipe Keypoints Extraction</text>

                <line x1="300" y1="150" x2="300" y2="175" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-act)" />

                {/* Decision Diamond */}
                <polygon points="300,175 345,195 300,215 255,195" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                <text x="300" y="199" fill="#92400e" fontSize="9" fontWeight="bold" textAnchor="middle">Landmarks Check?</text>

                {/* Decision Branch: Yes */}
                <line x1="300" y1="215" x2="300" y2="245" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-act)" />
                <text x="312" y="230" fill="#15803d" fontSize="9" fontWeight="bold">Yes (30-Frame Window)</text>

                {/* Decision Branch: No (loop back) */}
                <path d="M 345,195 L 470,195 L 470,77 L 410,77" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrow-act)" />
                <text x="415" y="185" fill="#b91c1c" fontSize="9" fontWeight="bold">No / Retrack</text>

                {/* Box 3: CNN-LSTM Model */}
                <rect x="180" y="245" width="240" height="35" rx="6" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
                <text x="300" y="266" fill="#334155" fontSize="10.5" fontWeight="semibold" textAnchor="middle">3. CNN-LSTM Frame Sequencing Inference</text>

                <line x1="300" y1="280" x2="300" y2="305" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-act)" />

                {/* Box 4: Grammar & Speech */}
                <rect x="190" y="305" width="220" height="35" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
                <text x="300" y="326" fill="#065f46" fontSize="10.5" fontWeight="bold" textAnchor="middle">4. NLP Correct & Speak out loud</text>

                <line x1="300" y1="340" x2="300" y2="360" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-act)" />

                {/* Final State Ring */}
                <circle cx="300" cy="365" r="7" fill="#0f172a" />
                <circle cx="300" cy="365" r="10" fill="none" stroke="#0f172a" strokeWidth="1.5" />
              </svg>
            )}

            {/* CLASS SCHEMA DIAGRAM */}
            {activeTab === "class" && (
              <svg width="600" height="380" viewBox="0 0 600 380" className="drop-shadow-sm">
                {/* Class 1: CameraStreamer */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("class_camera")}> 
                  <rect x="20" y="25" width="165" height="110" rx="4" fill="#fafafa" stroke="#1e293b" strokeWidth="1.5" />
                  <rect x="20" y="25" width="165" height="25" fill="#f1f5f9" stroke="#1e293b" strokeWidth="1.5" />
                  <text x="102" y="42" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">CameraStreamer</text>
                  <text x="28" y="65" fill="#475569" fontSize="9.5">- fps: number = 30</text>
                  <text x="28" y="78" fill="#475569" fontSize="9.5">- streamObj: MediaStream</text>
                  <line x1="20" y1="88" x2="185" y2="88" stroke="#cbd5e1" />
                  <text x="28" y="103" fill="#1e293b" fontSize="9.5">+ initStream(): void</text>
                  <text x="28" y="116" fill="#1e293b" fontSize="9.5">+ captureFrame(): Image</text>
                </g>

                {/* Class 2: KeypointExtractor */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("class_extractor")}> 
                  <rect x="220" y="25" width="165" height="110" rx="4" fill="#fafafa" stroke="#6366f1" strokeWidth="1.5" />
                  <rect x="220" y="25" width="165" height="25" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="302" y="42" fill="#4f46e5" fontSize="11" fontWeight="bold" textAnchor="middle">KeypointExtractor</text>
                  <text x="228" y="65" fill="#475569" fontSize="9.5">- activeHands: boolean</text>
                  <text x="228" y="78" fill="#475569" fontSize="9.5">- poseModel: mpPose</text>
                  <line x1="220" y1="88" x2="385" y2="88" stroke="#cbd5e1" />
                  <text x="228" y="103" fill="#1e293b" fontSize="9.5">+ extractPoints(frame): array</text>
                  <text x="228" y="116" fill="#1e293b" fontSize="9.5">+ normalizeCoord(coords): void</text>
                </g>

                {/* Class 3: GestureClassifier */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("class_classifier")}> 
                  <rect x="415" y="25" width="165" height="110" rx="4" fill="#fafafa" stroke="#1e293b" strokeWidth="1.5" />
                  <rect x="415" y="25" width="165" height="25" fill="#f1f5f9" stroke="#1e293b" strokeWidth="1.5" />
                  <text x="497" y="42" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">GestureClassifier</text>
                  <text x="423" y="65" fill="#475569" fontSize="9.5">- seqBuffer: array[]</text>
                  <text x="423" y="78" fill="#475569" fontSize="9.5">- cnnLstmModel: tfModel</text>
                  <line x1="415" y1="88" x2="580" y2="88" stroke="#cbd5e1" />
                  <text x="423" y="103" fill="#1e293b" fontSize="9.5">+ predict(sequence): Gloss</text>
                  <text x="423" y="116" fill="#1e293b" fontSize="9.5">+ updateBuffer(vector): void</text>
                </g>

                {/* Class 4: SentenceRestructurer */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("class_restructurer")}> 
                  <rect x="120" y="200" width="175" height="110" rx="4" fill="#fafafa" stroke="#1e293b" strokeWidth="1.5" />
                  <rect x="120" y="200" width="175" height="25" fill="#f1f5f9" stroke="#1e293b" strokeWidth="1.5" />
                  <text x="207" y="217" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">SentenceRestructurer</text>
                  <text x="128" y="240" fill="#475569" fontSize="9.5">- lexiconMappings: Map</text>
                  <text x="128" y="253" fill="#475569" fontSize="9.5">- grammarT5Weight: string</text>
                  <line x1="120" y1="263" x2="295" y2="263" stroke="#cbd5e1" />
                  <text x="128" y="278" fill="#1e293b" fontSize="9.5">+ generateSentence(gloss): str</text>
                  <text x="128" y="291" fill="#1e293b" fontSize="9.5">+ postProcess(rawOutput): str</text>
                </g>

                {/* Class 5: SpeechSynthesisController */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("class_speech")}> 
                  <rect x="330" y="200" width="175" height="110" rx="4" fill="#fafafa" stroke="#10b981" strokeWidth="1.5" />
                  <rect x="330" y="200" width="175" height="25" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
                  <text x="417" y="217" fill="#065f46" fontSize="11" fontWeight="bold" textAnchor="middle">SpeechController</text>
                  <text x="338" y="240" fill="#475569" fontSize="9.5">- ttsVoiceType: string</text>
                  <text x="338" y="253" fill="#475569" fontSize="9.5">- defaultRate: number = 1.0</text>
                  <line x1="330" y1="263" x2="505" y2="263" stroke="#cbd5e1" />
                  <text x="338" y="278" fill="#1e293b" fontSize="9.5">+ speakText(sentence): void</text>
                  <text x="338" y="291" fill="#1e293b" fontSize="9.5">+ adjustSpeed(rate): void</text>
                </g>

                {/* Relational Lines with diamonds for composition or arrowheads for usage */}
                <line x1="185" y1="80" x2="220" y2="80" stroke="#475569" strokeWidth="1" strokeDasharray="4,4" />
                <line x1="385" y1="80" x2="415" y2="80" stroke="#475569" strokeWidth="1" />
                <line x1="207" y1="135" x2="207" y2="200" stroke="#475569" strokeWidth="1" />
                <line x1="417" y1="135" x2="417" y2="200" stroke="#475569" strokeWidth="1" />
              </svg>
            )}

            {/* COMPONENT VIEW */}
            {activeTab === "component" && (
              <svg width="600" height="380" viewBox="0 0 600 380" className="drop-shadow-sm">
                {/* Component A: Frontend Web Client */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("comp_front")}> 
                  <rect x="40" y="40" width="180" height="130" rx="4" fill="#fafafa" stroke="#1e293b" strokeWidth="1.5" />
                  <rect x="25" y="55" width="25" height="15" rx="2" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1" />
                  <rect x="25" y="80" width="25" height="15" rx="2" fill="#e2e8f0" stroke="#1e293b" strokeWidth="1" />
                  <text x="135" y="70" fill="#0f172a" fontSize="11.5" fontWeight="bold" textAnchor="middle">Frontend App (SPA)</text>
                  <text x="135" y="90" fill="#475569" fontSize="10" textAnchor="middle">HTML5 Webcam Feed</text>
                  <text x="135" y="105" fill="#475569" fontSize="10" textAnchor="middle">MediaPipe Client SDK</text>
                  <text x="135" y="125" fill="#10b981" fontSize="9.5" fontWeight="semibold" textAnchor="middle">Web Speech Synth Engine</text>
                </g>

                {/* Interface port */}
                <circle cx="280" cy="105" r="7" fill="none" stroke="#6366f1" strokeWidth="2" />
                <line x1="220" y1="105" x2="273" y2="105" stroke="#475569" strokeWidth="1.5" />

                {/* Component B: Backend Web API Server */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("comp_back")}> 
                  <rect x="370" y="40" width="180" height="130" rx="4" fill="#fafafa" stroke="#6366f1" strokeWidth="1.5" />
                  <rect x="355" y="55" width="25" height="15" rx="2" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1" />
                  <rect x="355" y="80" width="25" height="15" rx="2" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1" />
                  <text x="465" y="70" fill="#4f46e5" fontSize="11.5" fontWeight="bold" textAnchor="middle">Express Backend</text>
                  <text x="465" y="90" fill="#475569" fontSize="10" textAnchor="middle">API Request Router</text>
                  <text x="465" y="105" fill="#475569" fontSize="10" textAnchor="middle">Secure Gemini Gateway</text>
                  <text x="465" y="125" fill="#4f46e5" fontSize="9.5" fontWeight="semibold" textAnchor="middle">CORS / Static Assets</text>
                </g>

                <path d="M 370,105 L 287,105" fill="none" stroke="#475569" strokeWidth="1.5" />

                {/* Component C: TensorFlow Deep Learning Model Core */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("comp_dl")}> 
                  <rect x="200" y="230" width="200" height="100" rx="4" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
                  <rect x="185" y="245" width="25" height="15" rx="2" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
                  <rect x="185" y="270" width="25" height="15" rx="2" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
                  <text x="300" y="260" fill="#334155" fontSize="12" fontWeight="bold" textAnchor="middle">TF Model Sandbox</text>
                  <text x="300" y="280" fill="#4f46e5" fontSize="10" fontWeight="semibold" textAnchor="middle">CNN-LSTM Architecture</text>
                  <text x="300" y="295" fill="#475569" fontSize="10" textAnchor="middle">Tensor shape: (30, 1662)</text>
                </g>

                {/* Connectors */}
                <line x1="130" y1="170" x2="130" y2="280" stroke="#475569" strokeWidth="1.5" strokeDasharray="4,2" />
                <line x1="130" y1="280" x2="200" y2="280" stroke="#475569" strokeWidth="1.5" />
                <line x1="460" y1="170" x2="460" y2="280" stroke="#475569" strokeWidth="1.5" strokeDasharray="4,2" />
                <line x1="460" y1="280" x2="400" y2="280" stroke="#475569" strokeWidth="1.5" />
              </svg>
            )}

            {/* DFD LEVEL-0 */}
            {activeTab === "dfd0" && (
              <svg width="600" height="380" viewBox="0 0 600 380" className="drop-shadow-sm">
                {/* External Entity: Sign Language Speaker */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("dfd0_signer")}> 
                  <rect x="30" y="140" width="130" height="60" rx="6" fill="#f1f5f9" stroke="#1e293b" strokeWidth="2" />
                  <text x="95" y="165" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">Sign Language</text>
                  <text x="95" y="180" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">Speaker (Deaf)</text>
                </g>

                {/* Central Process 0.0 */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("dfd0_process")}> 
                  <circle cx="300" cy="170" r="65" fill="#f8fafc" stroke="#6366f1" strokeWidth="3" />
                  <text x="300" y="152" fill="#4f46e5" fontSize="14" fontWeight="extrabold" textAnchor="middle">0.0</text>
                  <text x="300" y="170" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">ISL Recognition</text>
                  <text x="300" y="185" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">& Translation Sys</text>
                </g>

                {/* External Entity: Recipient */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("dfd0_recipient")}> 
                  <rect x="440" y="140" width="130" height="60" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                  <text x="505" y="165" fill="#92400e" fontSize="11" fontWeight="bold" textAnchor="middle">Hearing Recipient</text>
                  <text x="505" y="180" fill="#475569" fontSize="10" textAnchor="middle">(Colleagues/Public)</text>
                </g>

                {/* Data Flow Lines */}
                <defs>
                  <marker id="arrow-dfd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
                  </marker>
                </defs>
                <line x1="160" y1="170" x2="230" y2="170" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow-dfd)" />
                <text x="195" y="160" fill="#475569" fontSize="9" fontWeight="bold" textAnchor="middle">Webcam Frames</text>

                <line x1="365" y1="170" x2="435" y2="170" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow-dfd)" />
                <text x="400" y="160" fill="#475569" fontSize="9" fontWeight="bold" textAnchor="middle">TTS Synthesized Voice</text>
              </svg>
            )}

            {/* DFD LEVEL-1 */}
            {activeTab === "dfd1" && (
              <svg width="600" height="380" viewBox="0 0 600 380" className="drop-shadow-sm">
                <defs>
                  <marker id="arrow-dfd1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
                  </marker>
                </defs>

                {/* Process 1.0 */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("dfd1_p1")}> 
                  <circle cx="90" cy="90" r="35" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
                  <text x="90" y="85" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="middle">1.0</text>
                  <text x="90" y="98" fill="#334155" fontSize="9" fontWeight="bold" textAnchor="middle">Capture Frame</text>
                </g>

                {/* Line to Process 2.0 */}
                <line x1="125" y1="90" x2="200" y2="90" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-dfd1)" />
                <text x="162" y="82" fill="#475569" fontSize="8" textAnchor="middle">Raw Stream</text>

                {/* Process 2.0 */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("dfd1_p2")}> 
                  <circle cx="235" cy="90" r="35" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="235" y="85" fill="#4f46e5" fontSize="11" fontWeight="bold" textAnchor="middle">2.0</text>
                  <text x="235" y="98" fill="#4f46e5" fontSize="9" fontWeight="bold" textAnchor="middle">Extract Vector</text>
                </g>

                {/* Line to Data Store */}
                <line x1="235" y1="125" x2="235" y2="190" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-dfd1)" />
                <text x="245" y="155" fill="#475569" fontSize="8">Coordinate Vectors</text>

                {/* Data Store: D1 Landmarks Buffer */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("dfd1_ds1")}> 
                  <line x1="180" y1="190" x2="290" y2="190" stroke="#1e293b" strokeWidth="2" />
                  <rect x="180" y="191" width="110" height="28" fill="#f8fafc" opacity="0.9" />
                  <text x="235" y="208" fill="#1e293b" fontSize="10" fontWeight="bold" textAnchor="middle">D1: Landmarks Buffer</text>
                  <line x1="180" y1="219" x2="290" y2="219" stroke="#1e293b" strokeWidth="2" />
                </g>

                {/* Line from D1 to Process 3.0 */}
                <line x1="235" y1="220" x2="235" y2="280" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-dfd1)" />
                <text x="245" y="248" fill="#475569" fontSize="8">30 frames sequence</text>

                {/* Process 3.0 */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("dfd1_p3")}> 
                  <circle cx="235" cy="315" r="35" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
                  <text x="235" y="310" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="middle">3.0</text>
                  <text x="235" y="323" fill="#334155" fontSize="9" fontWeight="bold" textAnchor="middle">CNN-LSTM Infer</text>
                </g>

                {/* Line to Process 4.0 */}
                <line x1="270" y1="315" x2="355" y2="315" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-dfd1)" />
                <text x="312" y="307" fill="#475569" fontSize="8" textAnchor="middle">Sign Glosses</text>

                {/* Process 4.0 */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("dfd1_p4")}> 
                  <circle cx="390" cy="315" r="35" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
                  <text x="390" y="310" fill="#065f46" fontSize="11" fontWeight="bold" textAnchor="middle">4.0</text>
                  <text x="390" y="323" fill="#065f46" fontSize="9" fontWeight="bold" textAnchor="middle">NLP Rephrase</text>
                </g>

                {/* Line to Process 5.0 */}
                <line x1="425" y1="315" x2="495" y2="315" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow-dfd1)" />
                <text x="460" y="307" fill="#475569" fontSize="8" textAnchor="middle">Grammar Text</text>

                {/* Process 5.0 */}
                <g className="cursor-pointer" onClick={() => setSelectedNode("dfd1_p5")}> 
                  <circle cx="530" cy="315" r="35" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                  <text x="530" y="310" fill="#92400e" fontSize="11" fontWeight="bold" textAnchor="middle">5.0</text>
                  <text x="530" y="323" fill="#92400e" fontSize="9" fontWeight="bold" textAnchor="middle">Speech Synth</text>
                </g>
              </svg>
            )}
          </div>
        </div>

        {/* Selected Node Details Box */}
        <div className="bg-slate-950 text-slate-100 rounded-xl p-4 border border-slate-800 transition-all duration-300">
          <div className="flex gap-2 items-start">
            <IconInfo className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">
                Component Explanation & Metadata
              </h4>
              <p className="text-sm mt-1 text-slate-300 font-sans">
                {selectedNode ? (
                  getNodeExplanation(selectedNode)
                ) : (
                  <span>
                    Click on any interactive node, marker, actor, or class block in the active schematic above to inspect its properties, variables, and design significance in the academic pipeline.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getNodeExplanation(id: string): string {
  const dictionary: Record<string, string> = {
    signer: "Actor [ISL Speaker]: Represents the primary system user. Captures dynamic signs using their hands and upper body gestures. Interacts entirely visually through the laptop camera without custom physical sensors.",
    recipient: "Actor [Hearing Recipient]: Represents the target listener who receives English translation on the screen or over high-quality speakers, facilitating immediate bidirectional integration.",
    uc_camera: "Use Case [Start Web Camera Feed]: Instantiates local HTML5 stream protocols. Integrates with React standard handlers, requesting user device authentication securely.",
    uc_detect: "Use Case [Detect Keypoints]: Invokes Google MediaPipe skeleton modules, mapping hands, elbows, shoulders, and lips. Bundles coordinate offsets to maintain resolution invariance.",
    uc_classify: "Use Case [Classify CNN-LSTM Gestures]: Forwards frame buffers to the hybrid classification core on the server, outputting categorical lexicon predictions.",
    uc_tts: "Use Case [Synthesize Speech]: Converts resulting English phrases into a natural synthetic audio voice using browser native synthesizers.",
    class_camera: "Class [CameraStreamer]: Standard interface class managing browser video pipelines. Methods configure initialization streams and frame capture ratios (640x480 at 30 FPS).",
    class_extractor: "Class [KeypointExtractor]: Core class encapsulating MediaPipe models. Processes raw image grids, scales landmark offsets, and generates structured floating-point coordinates.",
    class_classifier: "Class [GestureClassifier]: Keeps track of sequence arrays of keypoints. Uses trained parameters in TensorFlow to output highly accurate predictions over temporal timelines.",
    class_restructurer: "Class [SentenceRestructurer]: Maps isolated translated gloss vectors to correct standard English. Resolves Indian Sign Language Subject-Object-Verb syntactic differences.",
    class_speech: "Class [SpeechController]: Accesses local Web Speech variables. Configures pitch, speed multipliers, and speaks output sentences synchronously matching user's emotion states.",
    comp_front: "Component [Frontend Web Client]: Multi-screen React portal with slides, chapters, interactive playground, and direct user camera modules.",
    comp_back: "Component [Express Server]: Node backend that serves production assets, routes chatbot requests, and acts as a gateway for Gemini API integrations.",
    comp_dl: "Component [TF Model Sandbox]: Holds trained weight binaries and compiles real-time inference sequences safely.",
    dfd0_signer: "Entity [Speaker]: Sends movement coordinates to process 0.0.",
    dfd0_process: "Process 0.0: The unified system boundary containing all subprocesses and models.",
    dfd0_recipient: "Entity [Recipient]: Receives text captions and translated speech signals.",
    dfd1_p1: "Process 1.0 [Capture Frame]: Obtains video bytes from the camera hardware API.",
    dfd1_p2: "Process 2.0 [Extract Vector]: Evaluates human joint skeletons using MediaPipe and normalizes positions.",
    dfd1_ds1: "Data Store D1 [Landmarks Buffer]: Temporary sliding database containing continuous coordinates over 30 frames (~1 second tracking window).",
    dfd1_p3: "Process 3.0 [CNN-LSTM Infer]: Runs classification layers across spatial matrices and temporal sequences.",
    dfd1_p4: "Process 4.0 [NLP Rephrase]: Formulates valid grammatical English representations from sign keywords.",
    dfd1_p5: "Process 5.0 [Speech Synth]: Receives strings and initiates hardware speech audio signals."
  };

  return dictionary[id] || "No detailed specifications registered for this particular node.";
}
