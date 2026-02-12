import { useState } from "react";
import { analyzeResume } from "../services/api";

export default function TestBackend() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTest = async () => {
    setLoading(true);
    setError("");
    setResult("");
    
    try {
      const response = await analyzeResume(text);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Test Backend API</h1>
        
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite um texto para testar..."
          className="w-full h-32 p-4 bg-card text-foreground border border-border rounded-lg"
        />
        
        <button
          onClick={handleTest}
          disabled={loading || !text}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
        >
          {loading ? "Analisando..." : "Testar"}
        </button>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
            {error}
          </div>
        )}

        {result && (
          <div className="p-4 bg-card text-foreground border border-border rounded-lg whitespace-pre-wrap">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
