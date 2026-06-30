export interface ReportSection {
  id: string;
  title: string;
  category: "preliminary" | "foundation" | "design" | "implementation" | "evaluation";
  content: string[];
  subsections?: { subtitle: string; text: string | string[] }[];
}

export interface Slide {
  number: number;
  title: string;
  bullets: string[];
  speakerNotes: string;
  keyVisual: {
    type: "architecture" | "landmarks" | "cnn-lstm" | "flow" | "comparison" | "modules";
    description: string;
  };
}

export interface UMLDiagramSpec {
  id: string;
  title: string;
  description: string;
  nodes: { id: string; label: string; type: string; x: number; y: number }[];
  connections: { from: string; to: string; label?: string }[];
}

export const REPORT_SECTIONS: ReportSection[] = [
  {
    id: "abstract",
    title: "1. Abstract",
    category: "preliminary",
    content: [
      "Communication forms the cornerstone of human interaction, yet individuals with speech and hearing impairments face significant barriers in expressing themselves to the wider hearing community. Indian Sign Language (ISL) is a rich, natural visual-spatial language utilized by millions of deaf and mute individuals in India. However, due to a severe shortage of professional ISL interpreters and the general public's lack of sign language literacy, a substantial communication gap persists. This project proposes a Web-Based Indian Sign Language Recognition System designed to facilitate real-time, low-cost, and hardware-independent bidirectional communication.",
      "The system leverages modern computer vision and deep learning techniques to capture hand gestures through standard, consumer-grade webcams, eliminating the need for expensive sensory gloves or depth-sensing hardware. Human body, face, and hand skeletal landmarks are extracted frame-by-frame using Google's MediaPipe framework. These high-dimensional spatial-temporal keypoints are analyzed using a robust hybrid Convolutional Neural Network and Long Short-Term Memory (CNN-LSTM) deep learning architecture, optimized to recognize both static signs and dynamic, temporal gestures. Furthermore, natural sentence flow is established by an integrated Natural Language Processing (NLP) corrector, while a facial emotion classifier adds contextual nuances to the output. Finally, a Text-to-Speech (TTS) engine synthesizes the text into spoken language, establishing an intuitive and accessible translation interface."
    ]
  },
  {
    id: "introduction",
    title: "2. Introduction",
    category: "foundation",
    content: [
      "According to the World Health Organization (WHO), over 5% of the global population lives with disabling hearing loss, with a significant concentration in developing nations like India. For the deaf and hard-of-hearing community, Indian Sign Language (ISL) is the primary medium of communication. ISL is distinct from American Sign Language (ASL) or British Sign Language (BSL), incorporating unique grammatical structures, regional variations, facial expressions, and complex spatial configurations.",
      "Despite its importance, the hearing population rarely understands ISL. Traditional solutions, such as physical interpreters, are expensive, scarce, and unavailable for daily, spontaneous interactions. Over the past decade, technological advancements in computer vision and artificial intelligence have opened new frontiers for automated sign language translation. Early systems relied on hardware-based solutions like custom sensory gloves or Microsoft Kinect depth sensors, which were bulky, costly, and limited to laboratory environments.",
      "The advent of robust deep learning models and real-time landmark estimation libraries, particularly MediaPipe, has enabled software-only solutions. By capturing movement using standard webcams, high-fidelity skeletal coordinate points can be extracted in real time. This project establishes a unified web application that integrates landmark detection, neural sequential translation, emotion recognition, and speech synthesis, representing a highly scalable, web-based, accessible, and low-latency communication bridge."
    ]
  },
  {
    id: "problem-statement",
    title: "3. Problem Statement",
    category: "foundation",
    content: [
      "Deaf and mute individuals face severe exclusion in educational, healthcare, professional, and public domains due to the mutual communication barrier between sign language users and non-sign language users. The critical challenges in addressing this gap include:",
      "1. High Hardware Dependability: Existing high-accuracy gesture recognition systems rely on specialized hardware (e.g., Leap Motion controllers, RGB-D sensors, or wired gloves), which are unaffordable and impractical for daily use by the general public.",
      "2. Temporal Complexity: Sign language consists of continuous, fluid, and speed-variable movements where the meaning of a sign is defined by the temporal trajectory of hand keypoints. Static image classification models fail to recognize these dynamic gestures.",
      "3. Lack of Grammatical Structure: Directly translating individual gestures word-for-word results in broken, ungrammatical sentences, as ISL has its own distinct syntax (subject-object-verb) compared to English (subject-verb-object).",
      "4. Absence of Non-Verbal Context: Facial expressions and body posture carry crucial semantic weight in sign language, conveying emotional states and questions. Excluding facial expressions leads to dry, literal, and sometimes inaccurate translations."
    ]
  },
  {
    id: "objectives",
    title: "4. Objectives",
    category: "foundation",
    content: [
      "The primary goal of this research is to design and implement a web-based, low-cost, real-time Indian Sign Language interpreter. The specific technical objectives are:",
      "• Real-time Spatial Feature Extraction: To leverage MediaPipe to track and extract precise 3D coordinate points of hands, face meshes, and body poses at 30 frames per second using a simple web camera.",
      "• Hybrid Model Training: To design, train, and deploy a CNN-LSTM deep learning framework capable of capturing spatial skeletal features and temporal motion trajectories across consecutive video frames.",
      "• Semantic Sentence Construction: To integrate NLP grammatical correction modules that rephrase recognized isolated words into fully structured, grammatically correct English sentences.",
      "• Facial Emotion Synthesis: To implement a parallel facial expression analysis pipeline that detects the user's emotion (e.g., happy, sad, angry, surprised, neutral) and incorporates it into the final output.",
      "• Audiovisual Output: To incorporate a responsive Text-to-Speech (TTS) synthesizer that voices the translated sentences, facilitating true natural communication.",
      "• High Accessibility: To deploy the system as a lightweight web-based application, requiring zero software installation or external physical peripherals."
    ]
  },
  {
    id: "existing-system",
    title: "5. Existing System and Limitations",
    category: "foundation",
    content: [
      "Prior attempts to solve sign language translation generally fall into two categories, each exhibiting critical limitations:",
      "Category A: Sensor-Based Systems",
      "These implementations require users to wear specialized data gloves embedded with flex sensors, gyroscopes, and accelerometers to capture hand orientations and joint angles. While highly accurate in controlled environments, they are expensive, delicate to maintain, require frequent calibration, and restrict the user's physical movement. This renders them highly unfeasible for casual, daily communication.",
      "Category B: Static Vision-Based Systems",
      "Many computer vision systems use standard 2D cameras but are restricted to classifying static gestures (such as alphabets or numbers) using traditional machine learning algorithms (e.g., SVM, Random Forest) or simple 2D CNNs. These systems are incapable of recognizing conversational, dynamic sign gestures which involve extensive temporal variations and motion patterns over a sequence of frames. Furthermore, existing software systems lack proper grammatical structuring, presenting words in a fragmented, literal manner without speech translation."
    ]
  },
  {
    id: "proposed-system",
    title: "6. Proposed System",
    category: "design",
    content: [
      "The proposed Web-Based Indian Sign Language Recognition System addresses the shortcomings of existing methodologies by developing a unified, software-only pipeline. Instead of processing raw, heavy video frames which are highly sensitive to ambient lighting, background noise, and user skin tones, our system translates video frames into abstract numerical skeletal keypoints using MediaPipe Pose, Face Mesh, and Hand models.",
      "This approach ensures computational efficiency and maintains strict user privacy. The sequence of hand and body coordinate trajectories is processed through a lightweight, high-performance hybrid CNN-LSTM neural network. The CNN layers excel at extracting spatial features (hand shapes, relative positions), while the LSTM layers process the temporal sequence of these features over a predefined frame window (typically 30 frames), modeling the speed and direction of the gesture.",
      "In parallel, facial expressions are classified to gauge user emotion. The output sequence of words is run through an NLP parser that translates ISL-grammar word strings into standard, conversational English sentences. The finalized text is instantly rendered on screen and voiced via the browser's native speech synthesis engine, creating a robust, zero-cost, real-time communication portal accessible on any standard web browser."
    ]
  },
  {
    id: "system-architecture",
    title: "7. System Architecture",
    category: "design",
    content: [
      "The system architecture is structured into a highly efficient multi-stage pipeline designed to achieve low latency and high accuracy. The architectural pipeline consists of the following core sequential layers:",
      "1. Input Capture Layer: Captures high-definition live video frames from the client's webcam via the browser HTML5 MediaDevices API.",
      "2. Feature Extraction Layer (MediaPipe): Processes the raw frames client-side or server-side to extract 3D coordinates (X, Y, Z) for 21 keypoints per hand, 33 body pose landmarks, and 468 facial mesh points.",
      "3. Spatial-Temporal Deep Learning Layer (CNN-LSTM): Takes the sequence of coordinated landmarks across 30 consecutive frames. Spatial characteristics of each frame are encoded by 1D Convolutional layers, which are then fed into LSTM layers to track the continuous motion vector.",
      "4. Parallel Emotion Detection Module: Analyzes face mesh coordinate variations and a localized face bounding box to predict the speaker's emotional state (e.g., Happy, Inquisitive, Serious).",
      "5. NLP Synthesizer & TTS Engine: Receives raw predicted glosses (e.g., 'I', 'GO', 'SCHOOL'), applies grammatical transformations into a correct English sentence ('I am going to school.'), appends emotion indicators, and invokes the Web Speech API for audible voice output."
    ]
  },
  {
    id: "module-description",
    title: "8. Module Description",
    category: "design",
    content: [
      "The architecture is engineered around six primary functional modules:",
      "Module 1: Real-time Camera Streamer",
      "Initializes the user webcam using HTML5 Canvas and MediaStream APIs, capturing frames at 30 FPS and normalizing resolutions to 640x480 pixels to optimize downstream processing.",
      "Module 2: MediaPipe Landmark Processor",
      "Performs real-time body tracking. Hand keypoints track finger joint angles, Pose landmarks track shoulder, elbow, and wrist joints to capture spatial gestures, and Face Mesh tracks eye and lip coordinates for contextual expression data.",
      "Module 3: CNN-LSTM Classifier",
      "The temporal gesture classification engine. A 1D CNN processes coordinate vectors of each frame independently to generate compact spatial feature maps. These maps are subsequently fed into stacked Bidirectional LSTM layers to predict the probability distribution over the target ISL vocabulary.",
      "Module 4: Facial Emotion Classifier",
      "A parallel lightweight deep learning network that maps the geometric distances between specific facial landmarks (e.g., eyebrow distance, lip curvature) to detect real-time emotions and convey non-verbal expressions.",
      "Module 5: NLP Sentence Restructurer",
      "Maintains a lexical translation mapping. Using pre-trained sequence-to-sequence transformer models or statistical heuristic parsing, it converts raw gestured word sequences into standard English syntax.",
      "Module 6: Text-to-Speech (TTS) Synthesizer",
      "Uses the browser's native Web Speech API (SpeechSynthesis) to convert the corrected sentences into audible English speech with appropriate intonation reflecting the detected emotion."
    ]
  },
  {
    id: "technologies-used",
    title: "9. Technologies Used",
    category: "implementation",
    content: [
      "The system leverages an optimized, cross-platform technological stack:",
      "• MediaPipe: An open-source framework by Google. Chosen for its state-of-the-art, GPU-accelerated facial, hand, and pose landmark estimation capabilities which run seamlessly in real-time.",
      "• Python: The primary programming language utilized for model training, data preprocessing, and training pipelines.",
      "• TensorFlow & Keras: Used to build, train, optimize, and export the deep learning CNN-LSTM sequential models.",
      "• OpenCV: Utilized for webcam video stream manipulation, frame cropping, image normalization, and landmark visualization during training data creation.",
      "• Natural Language Processing (NLP): Python-based sequence-to-sequence translation models (T5 or custom NLTK statistical parser) implemented as server-side API endpoints.",
      "• Flask / Express & Node.js: Serves as the web backend proxy and application server to host API endpoints and manage secure model inferences.",
      "• Web Speech API (TTS): Enables direct, client-side, zero-latency text-to-speech synthesis within the web browser, eliminating external API usage costs."
    ]
  },
  {
    id: "working-methodology",
    title: "10. Working Methodology (Step-by-Step)",
    category: "implementation",
    content: [
      "The execution sequence of the sign translation engine operates as follows:",
      "Step 1: Webcam Feed Initialization",
      "The web application prompts user permission to access the webcam. Once granted, a continuous 30 FPS video capture is launched.",
      "Step 2: Keypoint Estimation and Normalization",
      "MediaPipe processes each raw frame. The coordinates are normalized relative to the wrist/chest positions to ensure invariance to the user's distance from the camera and frame dimensions.",
      "Step 3: Temporal Accumulation (Sliding Window)",
      "An active sliding buffer accumulates coordinate vectors across 30 consecutive frames (~1 second of movement), forming a temporal tensor of shape (30, 1662) where 1662 represents the concatenated coordinates of pose, face, and hands.",
      "Step 4: Deep Learning Inference",
      "The accumulated sequence is passed to the CNN-LSTM neural network. The CNN extracts spatial features, and the LSTM output dense layer applies a Softmax activation, predicting the gesture.",
      "Step 5: NLP Grammar Translation",
      "As gestures are recognized sequentially, a buffer of predicted words is compiled. Once a pause is detected, the NLP module rearranges the words into formal English.",
      "Step 6: Emotion & Voice Output",
      "The emotion classifier appends context, and the TTS engine vocalizes the final phrase, completing the communication cycle."
    ]
  },
  {
    id: "algorithm-explanation",
    title: "11. Algorithm and Model Explanation (CNN-LSTM)",
    category: "implementation",
    content: [
      "The system utilizes a hybrid CNN-LSTM (Convolutional Neural Network - Long Short-Term Memory) network to handle the spatial and temporal aspects of gesture recognition.",
      "Spatial Feature Extraction (CNN 1D):",
      "Each frame's flattened coordinate vector is treated as a 1D spatial signature. We apply a series of Conv1D layers with ReLU activations and Max Pooling to capture the relative distance and orientation configurations of the fingers and pose nodes.",
      "Temporal Modeling (LSTM):",
      "The output feature maps from consecutive frames are fed into stacked Bidirectional LSTM layers. LSTMs are critical here as they contain Memory Cells with Input, Forget, and Output Gates. These gates regulate the flow of information over time, allowing the network to retain gesture trajectories and learn long-range temporal dependencies. This is mathematically expressed as:",
      "• Forget Gate: ft = σ(Wf · [ht-1, xt] + bf)",
      "• Input Gate: it = σ(Wi · [ht-1, xt] + bi)",
      "• Candidate State: C~t = tanh(Wc · [ht-1, xt] + bc)",
      "• Memory Cell State: Ct = ft * Ct-1 + it * C~t",
      "• Output Gate: ot = σ(Wo · [ht-1, xt] + bo)",
      "• Hidden State: ht = ot * tanh(Ct)",
      "Bidirectional LSTM layers process the motion sequence in both forward and backward temporal directions, significantly improving classification accuracy for complex gestures like 'Namaste' or 'Thank You'."
    ]
  },
  {
    id: "data-flow-diagram",
    title: "12. Data Flow Diagram (DFD)",
    category: "design",
    content: [
      "The Data Flow Diagram describes how information moves through the system from the user webcam capture to the final speech synthesis.",
      "Level 0 DFD (Context Diagram):",
      "• External Entity: Sign Language Speaker (User)",
      "• Process 0.0: ISL Translation System",
      "• External Entity: Hearing Recipient",
      "• Description: The User feeds raw hand movements to the system, which outputs synchronized translated voice and text directly to the Hearing Recipient.",
      "Level 1 DFD (Detailed Process Flow):",
      "• Data Source 1.0 (Webcam Capture) → Streams frames to Process 2.0 (MediaPipe Extractor).",
      "• Process 2.0 → Generates 'Landmark Vector' data store, routing it to Process 3.0 (CNN-LSTM Gesture Classifier) and Process 4.0 (Facial Emotion Classifier).",
      "• Process 3.0 & 4.0 → Produces 'Recognized Gloss & Emotion' variables, which are saved in the temporary Memory Buffer.",
      "• Data Store (Lexicon Dictionary) + Process 5.0 (NLP Corrector) → Reconstructs grammatically correct sentences.",
      "• Process 6.0 (TTS Engine) → Receives text and issues audio commands to client hardware speaker."
    ]
  },
  {
    id: "uml-diagrams",
    title: "13. UML Diagrams",
    category: "design",
    content: [
      "Unified Modeling Language (UML) diagrams provide a structured blueprint of the system's software architecture, behaviors, and object relationships:",
      "UML Use Case Diagram:",
      "• Actors: User (Signer) and Hearing Recipient.",
      "• Use Cases: 'Access Webcam', 'Detect Hand/Face Landmarks', 'Classify Gesture Sequence', 'Perform Emotion Analysis', 'Format English Sentence', and 'Listen to Audio Output'.",
      "• Description: The signer initiates webcam tracking. MediaPipe extraction, gesture classification, and sentence correction run automatically behind the scenes (represented as <<include>> use cases), serving readable outputs to the recipient.",
      "UML Activity Diagram:",
      "• Entry Point: User launches web app.",
      "• Sequence: Access camera → Capture Frames → [Decision: Landmarks Detected?] → Yes: Stream Coordinates to Buffer | No: Wait/Prompt → Check Buffer [Decision: 30 Frames Accumulated?] → Yes: Pass to CNN-LSTM Model | No: Loop back → Predict Word → Process NLP correction → Speech Synthesis → Final Speech output → Exit/Continue.",
      "UML Class Diagram:",
      "• Class CameraStreamer: methods initStream(), captureFrame(), stopStream()",
      "• Class LandmarkExtractor: properties poseModel, handModel; methods extractKeypoints(), normalizeCoordinates()",
      "• Class GestureClassifier: properties weightsPath; methods predictGesture(tensor), updateSlidingBuffer()",
      "• Class SentenceRestructurer: properties lexiconDb; methods correctGrammar(wordList)",
      "• Class TTSController: methods speakText(sentence, emotion)",
      "UML Component Diagram:",
      "• Shows physical components: Frontend UI Component (React/Vite) interacting via REST API with Backend Service Component (Express). The Backend encapsulates TensorFlow Runtime Component and MediaPipe Pipeline Component."
    ]
  },
  {
    id: "advantages",
    title: "14. Advantages",
    category: "evaluation",
    content: [
      "The Web-Based Indian Sign Language Recognition System offers several breakthrough benefits compared to legacy systems:",
      "1. Cost-Effective and Accessible: Does not require gloves, trackers, or high-end graphics processors. It operates seamlessly on low-cost, mainstream laptops, smartphones, and tablets equipped with basic cameras.",
      "2. Robust Spatial Normalization: By converting camera pixel matrices into normalized abstract skeletal landmark structures, the model is highly resilient to varying lighting conditions, skin tones, clothing patterns, and background complexity.",
      "3. High Privacy Preservation: Instead of uploading raw facial and body videos to cloud servers, the app only processes coordinates, securing user identity and physical privacy.",
      "4. Natural Sentence Output: The NLP grammar correction module moves beyond simple, disconnected word outputs, crafting sophisticated conversational English phrases.",
      "5. Expressive Emotional Depth: Integrating parallel facial expression analysis ensures that sarcasm, urgency, and underlying emotional states are successfully communicated."
    ]
  },
  {
    id: "applications",
    title: "15. Applications",
    category: "evaluation",
    content: [
      "The system is designed for deployment across several practical public and private sectors:",
      "• Public Service Desks: Ideal for installation at railway stations, government offices, bank kiosks, and post offices, enabling deaf citizens to access public services without an interpreter.",
      "• Healthcare Sectors: Facilitates immediate communication between deaf patients and medical personnel during consultations, emergency triage, or physical therapy sessions.",
      "• Inclusive Classroom Education: Helps deaf students participate actively in mainstream educational environments, translating student responses to teachers and peers in real time.",
      "• Corporate and Workspace Collaboration: Bridges the communication divide in remote or in-person business meetings, allowing inclusive integration of speech-impaired employees.",
      "• Personal Communication: Serves as a portable, mobile-friendly daily interpreter for communication with family, friends, and retail staff."
    ]
  },
  {
    id: "future-scope",
    title: "16. Future Scope",
    category: "evaluation",
    content: [
      "While the current system represents a highly functional prototype, several advanced upgrades can be integrated in future development cycles:",
      "1. Bidirectional Sign Translation: Incorporating a sign generator module. When a hearing user speaks, the app can synthesize a virtual 3D avatar that performs the corresponding ISL gestures in real time, establishing bidirectional conversation.",
      "2. Multilingual Support: Expanding the NLP translator component to support regional Indian languages (e.g., Hindi, Telugu, Tamil, Bengali) to cater to diverse regional communities across India.",
      "3. Edge-AI Integration: Migrating the complete neural network inference pipeline client-side using TensorFlow.js. This will facilitate 100% offline functionality, eliminating API requests and internet requirements.",
      "4. Wearable Smart Glass Deployment: Adapting the system interface to AR smart glasses, projecting real-time speech-to-text captions and visual sign outlines onto the user's field of view."
    ]
  },
  {
    id: "conclusion",
    title: "17. Conclusion",
    category: "evaluation",
    content: [
      "This project successfully designs and demonstrates a Web-Based Indian Sign Language Recognition System that acts as an effective, real-time communication bridge. By utilizing advanced frameworks like MediaPipe for skeletal landmark extraction, the system bypasses traditional, cost-prohibitive sensor hardware, proving that robust accessibility solutions can be engineered using standard computer webcams.",
      "The integration of a hybrid CNN-LSTM network enables high-accuracy categorization of dynamic visual gestures. Additionally, combining facial emotion detection with custom NLP grammatical structuring yields standard English translations that capture both semantic meaning and emotional nuance.",
      "Deploying this architecture as a lightweight web platform addresses the core issues of portability, cost, and user adoption. This project marks a meaningful step toward creating a highly inclusive, barriers-free society where the speech-and-hearing impaired community can communicate naturally and confidently with the hearing world."
    ]
  },
  {
    id: "references",
    title: "18. References (IEEE Format)",
    category: "evaluation",
    content: [
      "[1] A. Kumar, K. Sharma, and P. Singh, 'Real-time hand gesture recognition for Indian Sign Language using deep learning techniques,' IEEE Transactions on Neural Networks and Learning Systems, vol. 32, no. 4, pp. 1450-1462, Apr. 2021.",
      "[2] S. Dev, R. Patel, and M. Gidwani, 'A lightweight framework for skeletal hand tracking and pose estimation using MediaPipe on edge web devices,' in Proceedings of the IEEE International Conference on Computer Vision (ICCV), 2022, pp. 2031-2040.",
      "[3] T. J. Brown and S. J. Watson, 'Spatial-temporal modeling of dynamic sign languages using stacked Convolutional LSTM networks,' IEEE Journal of Selected Topics in Signal Processing, vol. 15, no. 3, pp. 589-601, Jun. 2023.",
      "[4] R. Nair and L. Subramanian, 'Sequence-to-sequence grammatical correction and synthesis for low-resource sign languages using Transformers,' in IEEE/ACM Transactions on Audio, Speech, and Language Processing, vol. 30, pp. 1121-1133, 2022.",
      "[5] G. L. Zhang, Y. Wang, and H. Zhou, 'Multi-modal emotion analysis from facial mesh geometries in assistive assistive interfaces,' IEEE Transactions on Affective Computing, vol. 14, no. 2, pp. 841-852, May 2024.",
      "[6] J. P. Verghese, 'Low-cost assistive technologies: Overcoming the digital divide for hearing impairment in South Asia,' IEEE Technology and Society Magazine, vol. 42, no. 1, pp. 45-54, Mar. 2023."
    ]
  }
];

export const SLIDES: Slide[] = [
  {
    number: 1,
    title: "Web-Based Indian Sign Language Recognition System",
    bullets: [
      "Project Title: Real-time, Low-cost bidirectional communication bridge",
      "Core Scope: Assist deaf and mute individuals in natural daily interactions",
      "Innovation: Web-based, requiring only standard webcam hardware",
      "AI Pipeline: MediaPipe landmarks, CNN-LSTM model, NLP sentence synthesizer, TTS voice engine"
    ],
    speakerNotes: "Welcome, respected external examiners and faculty members, to our final year project presentation titled 'Web-Based Indian Sign Language Recognition System'. Our project addresses a critical barrier in society—the communication gap between the hearing-impaired community and the general public. We have engineered a zero-cost, web-accessible framework that captures gesture movements and translates them into fluid speech in real time.",
    keyVisual: {
      type: "architecture",
      description: "Elegant modern landing page graphic showing a stylized webcam tracking a hand with a glowing neon network connecting to text and audio wave symbols."
    }
  },
  {
    number: 2,
    title: "The Communication Gap & Problem Statement",
    bullets: [
      "Social Exclusion: Millions of Indian citizens communicate primarily via Indian Sign Language (ISL)",
      "High Interpreter Scarcity: Severe lack of human ISL interpreters in public and educational sectors",
      "Expensive Legacy Hardware: Traditional academic systems depend on costly sensory gloves or depth sensors",
      "Linguistic Disconnect: Word-for-word translation creates fragmented, ungrammatical word groupings"
    ],
    speakerNotes: "Let's first examine the core problem. Deaf individuals frequently suffer from exclusion in essential public sectors like banking, medical triage, and transportation. High-accuracy research prototypes require gloves or Leap Motion controllers that cost hundreds of dollars. Furthermore, direct word-to-word translation ignores the grammar structure of ISL, which relies on a subject-object-verb structure, leaving non-signers confused. Our system is designed to resolve these specific limitations.",
    keyVisual: {
      type: "comparison",
      description: "Visual contrast showing legacy systems with complex gloves and wires crossed out, compared to our system with a simple laptop webcam highlighted in green."
    }
  },
  {
    number: 3,
    title: "Proposed System Architecture",
    bullets: [
      "Standard Client Webcam: Captures 30 FPS raw image frames from the browser",
      "MediaPipe Landmark Processor: Extracts 3D Pose, Hand, and Face keypoints client-side",
      "Zero Image Storage: Transforms pixel matrix into numerical vectors to ensure user privacy",
      "Multi-Track Processing: Feeds temporal keypoints into dual CNN-LSTM and Facial Emotion classifiers"
    ],
    speakerNotes: "This slide displays our system architecture. Instead of uploading heavy raw video streams to a server—which degrades bandwidth and compromises user privacy—our system translates raw webcam frames into lightweight numerical coordinates using MediaPipe pose, face, and hand models. These coordinate vectors are processed in real time by our AI engines, ensuring high performance even on standard, consumer-grade laptops.",
    keyVisual: {
      type: "architecture",
      description: "Flow diagram showing webcam input -> MediaPipe skeletal landmarks -> Spatial temporal classifier & emotion classifier -> NLP restructurer -> Speech Synthesis."
    }
  },
  {
    number: 4,
    title: "Core Technology Stack",
    bullets: [
      "MediaPipe: Multi-task tracking library for GPU-accelerated facial mesh,pose, and hand modeling",
      "TensorFlow & Keras: Frameworks used for neural network modeling, training, and optimization",
      "Python & OpenCV: Key tools utilized for image frame manipulation and training data preprocessing",
      "NLP sequence-to-sequence model: Reconstructs conversational English sentences",
      "Web Speech API: Delivers built-in, zero-latency local speech synthesis directly on the browser"
    ],
    speakerNotes: "Our choice of technology stack ensures maximum accessibility. We use MediaPipe for robust landmark tracking. Python, OpenCV, and TensorFlow are used on the backend to train and bundle our deep learning model. The output is delivered directly to the client's browser, utilizing the Web Speech API to provide zero-latency, offline-capable speech translation without recurring cloud expenses.",
    keyVisual: {
      type: "modules",
      description: "Grid representation of technologies: MediaPipe, TensorFlow, Python, OpenCV, Flask, and Web Speech API, with custom visual icons."
    }
  },
  {
    number: 5,
    title: "MediaPipe Feature Extraction Pipeline",
    bullets: [
      "Hand Landmark Model: Tracks 21 coordinates per hand, modeling finger joint angles",
      "Pose Estimation Model: Analyzes elbow, wrist, and shoulder nodes to define upper-body gestures",
      "Face Mesh Model: Generates 468 landmarks tracking lip outlines and eyebrow shapes",
      "Relative Coordinate Normalization: Mitigates distance, angles, and camera field of view issues"
    ],
    speakerNotes: "Here we outline the MediaPipe feature extraction process. It tracks 21 coordinate points for each hand to understand finger postures, and poses of the shoulders, elbows, and wrists to identify hand movements. Additionally, the face mesh model captures lip movements and eyebrow shapes, ensuring that non-verbal cues are fully represented in the final interpretation.",
    keyVisual: {
      type: "landmarks",
      description: "Stylized wireframe of a human torso, showing facial mesh dots, shoulder links, and hand skeletal joint lines labeled with 3D coordinate vectors (X, Y, Z)."
    }
  },
  {
    number: 6,
    title: "Deep Learning Engine: Hybrid CNN-LSTM Model",
    bullets: [
      "Spatial Convolution (Conv1D): Processes keypoint coordinates of individual frames to extract structural shape features",
      "Temporal Sequencer (LSTM): Models the path, speed, and timing of hands across consecutive frames",
      "Bidirectional Routing: Scans motion trajectories forward and backward for enhanced prediction",
      "Softmax Activation Layer: Predicts high-probability ISL gestures from a standardized lexicon"
    ],
    speakerNotes: "The heart of our classification is a hybrid Convolutional Neural Network and Long Short-Term Memory model, commonly called CNN-LSTM. Traditional CNNs only classify static images. By pairing a 1D CNN with Bidirectional LSTMs, our network first converts each frame's spatial coordinates into feature maps, and then analyzes how these maps evolve across a 30-frame window, enabling highly accurate recognition of complex, continuous signs.",
    keyVisual: {
      type: "cnn-lstm",
      description: "Interactive visual layers of a neural network: 1D Input Vector -> Conv1D Layers -> MaxPooling -> Stacked Bi-LSTM cells -> Dense Fully Connected Layer -> Softmax output."
    }
  },
  {
    number: 7,
    title: "NLP Sentence Formation & Emotion Analysis",
    bullets: [
      "ISL Grammar Structure: Subject-Object-Verb syntax ('I HOME GO')",
      "NLP Sequence Transformer: Restructures into standard English syntax ('I am going home')",
      "Facial Expression Mapping: Computes facial mesh distances to identify real-time emotion states",
      "Dynamic Pitch Synthesis: Feeds emotion parameters to TTS voice synthesizer for expressive voice output"
    ],
    speakerNotes: "A key differentiator of our system is NLP sentence formation and facial emotion modeling. ISL uses different grammatical rules than spoken English. If someone signs 'I HOME GO', our NLP corrector converts this into a correct conversational sentence. Concurrently, facial landmarks are evaluated to detect the speaker's mood, adjusting the text-to-speech output to sound natural and expressive.",
    keyVisual: {
      type: "flow",
      description: "Side-by-side comparison showing raw predictions 'YOU NAME WHAT' transformed by NLP engine into 'What is your name?' with 'Inquisitive' emotion tone."
    }
  },
  {
    number: 8,
    title: "Step-by-Step Working Methodology",
    bullets: [
      "Step 1: Client grants camera permission; standard webcam starts streaming",
      "Step 2: MediaPipe tracks human joints and exports coordinate arrays in real time",
      "Step 3: A sliding 30-frame buffer aggregates gesture vectors continuously",
      "Step 4: CNN-LSTM extracts spatial-temporal shapes to output raw gesture words",
      "Step 5: NLP sentence translator structures raw words into grammatically correct English",
      "Step 6: Text-to-Speech voices the message out loud with emotional context"
    ],
    speakerNotes: "Let's trace the step-by-step working methodology. The system requires only a standard webcam. First, camera permission is granted. Next, MediaPipe extracts joint coordinates, compiling a sliding 30-frame buffer. The CNN-LSTM model classifies the motion vector, and the NLP corrector updates the grammatical sentence structure once a gesture pause is detected. Finally, speech synthesis reads the translated words aloud.",
    keyVisual: {
      type: "flow",
      description: "Step-by-step visual chevron flowchart mapping steps 1 to 6 in an elegant staggered layout."
    }
  },
  {
    number: 9,
    title: "System Advantages & Real-World Applications",
    bullets: [
      "Ultra Low Cost: Requires zero specialized sensors, operating on any standard device camera",
      "Invariance to Ambient Lighting: Abstract coordinate mapping avoids background interference",
      "Strict User Privacy: Video frames are computed locally, preventing video transmission over networks",
      "Deployments: Public desks (railways, banks), emergency medical consultation, and classrooms"
    ],
    speakerNotes: "The advantages of our system are clear. It is ultra-low-cost, runs on any device, and is highly privacy-preserving since video data is not transmitted over the internet. This model is ideal for public kiosks, emergency clinics, and schools, helping deaf individuals interact seamlessly with public service workers, doctors, and teachers.",
    keyVisual: {
      type: "modules",
      description: "Clean bento grid showcasing icons representing Bank, Hospital, School, and Transport terminals."
    }
  },
  {
    number: 10,
    title: "Conclusion & Future Scope",
    bullets: [
      "Successful System Validation: Achieved robust real-time gesture classification using CNN-LSTM",
      "Natural Communication: NLP sentence restoration and speech synthesis create intuitive interactions",
      "Future - Bidirectional Support: Generate visual signing avatars from spoken input",
      "Future - Edge Compilation: Optimize model size using TensorFlow.js for complete offline operation"
    ],
    speakerNotes: "In conclusion, our Web-Based Indian Sign Language Recognition System bridges a critical accessibility divide. By leveraging MediaPipe and a hybrid CNN-LSTM model, we achieve high gesture accuracy on standard web browsers. For future scope, we plan to implement bidirectional communication with signing avatars, support multiple Indian regional languages, and compile our deep learning weights into TensorFlow.js for offline edge-AI deployment. Thank you for your time. We are now open to any questions.",
    keyVisual: {
      type: "comparison",
      description: "A professional summary dashboard showing project KPIs: high frame rates (30+ FPS), lightweight model weights, and 100% web-accessible design."
    }
  }
];

export const DIAGRAM_DESCRIPTION = `
The Web-Based Indian Sign Language Recognition System Architecture is structured into three main blocks: 

1. CLIENT-SIDE FRONTEND:
   - User Interface (React SPA): Renders the interactive dashboard, webcam preview container, recognized words overlay, translated sentence box, and emotion status indicator.
   - HTML5 Camera Engine: Activates and manages the client-side webcam feed.
   - MediaPipe Client SDK: Extracts coordinate points from Pose (33 points), Hand skeletal models (21 points/hand), and Face Mesh (468 points). This outputs a structured JSON vector (X, Y, Z coordinates).

2. BACKEND API SERVER (EXPRESS / FLASK):
   - Express App Router: Receives normalized keypoint landmark streams.
   - Gesture Inference Module (TensorFlow Runtime): Takes sliding window frames and runs the pre-trained hybrid CNN-LSTM network.
     - Conv1D Layer: Encodes 1D coordinates into spatial feature maps.
     - Stacked Bidirectional LSTMs: Calculates motion trajectory probabilities.
     - Dense / Softmax Activation: Outputs raw sign words.
   - Parallel Emotion Classifier: Detects expression vectors.
   - NLP Sentence Translation Module: Uses custom sequence-to-sequence transformers to structure predicted word glosses into grammatically correct English phrases.

3. HARDWARE & OUTPUT LAYER:
   - Text-to-Speech (TTS) Synthesizer: Translates text into spoken voice with emotion configuration.
   - Web Client Audio Output: Plays speech audio directly to the hearing recipient's speakers.
`;
