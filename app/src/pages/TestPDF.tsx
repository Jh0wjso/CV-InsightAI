import { useState } from "react";
import { uploadPDF, analyzeResume } from "../services/api";

export default function TestPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    setError("");
    
    try {
      const text = await uploadPDF(file);
      setExtractedText(text);
      
      const result = await analyzeResume(text);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Test PDF Upload</h1>
        
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground"
        />
        
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
        >
          {loading ? "Processando..." : "Upload e Analisar"}
        </button>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
            {error}
          </div>
        )}

        {extractedText && (
          <div className="space-y-2">
            <h2 className="font-semibold text-foreground">Texto Extraído:</h2>
            <div className="p-4 bg-card text-foreground border border-border rounded-lg max-h-40 overflow-y-auto text-sm">
              {extractedText}
            </div>
          </div>
        )}

        {analysis && (
          <div className="space-y-2">
            <h2 className="font-semibold text-foreground">Análise:</h2>
            <div className="p-4 bg-card text-foreground border border-border rounded-lg whitespace-pre-wrap">
              {analysis}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
