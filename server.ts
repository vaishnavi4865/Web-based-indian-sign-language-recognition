import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Ensure the dev server runs on port 3000
const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini client safely
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // API endpoint for chatbot and report assistance
  app.post("/api/chat", async (req: any, res: any) => {
    try {
      const { message, history, context } = req.body;

      if (!ai) {
        return res.status(500).json({
          error: "Gemini API key is not configured. Please add GEMINI_API_KEY to your Secrets.",
        });
      }

      const systemInstruction = `You are an academic mentor and expert in Deep Learning & Assistive Technologies.
Your goal is to help the user review, understand, expand, and customize their final year engineering project:
Title: "Web-Based Indian Sign Language Recognition System"

Project Details:
- Input: Hand gestures captured via webcam.
- Processing: MediaPipe detects hand, face, and body landmarks.
- Model: CNN-LSTM model on extracted spatial-temporal keypoints.
- NLP Engine: Corrects recognized sequence of words into grammatical English sentences.
- Emotion Engine: Facial expressions analyzed for visual emotion state integration.
- Output: Text-to-Speech (TTS) synthesizer translates text into spoken voice.

When the user asks to "expand", "refine", or "add sections", provide rich, academic-grade paragraphs with technical depth. Keep your tone highly academic, supportive, and precise. Use clear formatting, bullet points, or code snippets if relevant.`;

      const contents: any[] = [];
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          contents.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
          });
        }
      }

      let currentPrompt = message;
      if (context) {
        currentPrompt = `[User is currently viewing Section: "${context}"]\n\n${message}`;
      }

      contents.push({
        role: "user",
        parts: [{ text: currentPrompt }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return res.status(500).json({ error: error?.message || "Internal Server Error" });
    }
  });

  app.use("/assets", express.static(path.join(process.cwd(), "assets")));

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: any, res: any) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
