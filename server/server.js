import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

app.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    const completion = await client.chat.completions.create({
      model: "moonshotai/Kimi-K2-Instruct-0905",
      messages: [{ role: "user", content: text }],
    });

    res.json({
      result: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to analyze" });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
