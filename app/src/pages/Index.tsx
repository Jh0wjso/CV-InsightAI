import { useState, useRef, useEffect } from "react";
import { Upload, FileText, Send, Bot, User, Sparkles, X } from "lucide-react";

const MOCK_ANALYSIS = `## 📋 Análise do Currículo

### ✅ Pontos Fortes
- **Experiência sólida** em desenvolvimento web com mais de 3 anos de atuação
- **Stack moderna**: React, TypeScript, Node.js — tecnologias muito demandadas no mercado
- **Projetos relevantes** que demonstram capacidade de entrega

### ⚠️ Pontos de Melhoria
- **Resumo profissional** ausente — adicione um parágrafo objetivo no topo
- **Métricas de impacto** não mencionadas — quantifique suas conquistas (ex: "reduzi tempo de carregamento em 40%")
- **Soft skills** pouco exploradas — liderança, comunicação e trabalho em equipe são diferenciais

### 🎯 Recomendações
1. Adicione um **objetivo profissional** claro e direcionado à vaga desejada
2. Inclua **certificações** e cursos relevantes
3. Melhore a **formatação** — use bullet points consistentes
4. Adicione links para **portfólio** e **GitHub**

### 📊 Nota Geral: **7.2 / 10**

O currículo tem uma base boa, mas precisa de ajustes para se destacar em processos seletivos competitivos. Quer que eu aprofunde em algum ponto?`;

type Message = {
  role: "user" | "assistant";
  content: string;
};

const MOCK_RESPONSES: Record<string, string> = {
  default:
    "Essa é uma ótima pergunta! Com base na análise do seu currículo, posso dizer que o mais importante agora é focar em quantificar suas conquistas e adicionar um resumo profissional forte no topo. Quer que eu te ajude a escrever um?",
  experiencia:
    "Sua experiência está boa, mas recomendo reorganizar em ordem cronológica inversa e destacar resultados mensuráveis em cada posição. Por exemplo, em vez de 'Desenvolvi features', escreva 'Desenvolvi 15+ features que aumentaram o engajamento em 25%'.",
  formatacao:
    "Para a formatação, sugiro: use uma fonte limpa como Calibri ou Arial, mantenha margens de 2.5cm, use no máximo 2 páginas, e garanta consistência nos bullet points. Posso te dar um template se quiser!",
};

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [screen, setScreen] = useState<"upload" | "chat">("upload");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isPdf = file?.type === "application/pdf";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
  };

  const handleAnalyze = () => {
    if (!isPdf) return;
    setScreen("chat");
    setMessages([]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages([{ role: "assistant", content: MOCK_ANALYSIS }]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const lower = input.toLowerCase();
    let response = MOCK_RESPONSES.default;
    if (lower.includes("experiencia") || lower.includes("experiência"))
      response = MOCK_RESPONSES.experiencia;
    if (lower.includes("formatação") || lower.includes("formato") || lower.includes("formatacao"))
      response = MOCK_RESPONSES.formatacao;

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleBack = () => {
    setScreen("upload");
    setFile(null);
    setMessages([]);
  };

  // --- UPLOAD SCREEN ---
  if (screen === "upload") {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="space-y-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20">
              <Sparkles className="h-8 w-8 text-primary" style={{ color: "#7c3aed" }} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">CV Analyzer</h1>
            <p className="text-muted-foreground text-sm">
              Envie seu currículo e receba uma análise inteligente com IA
            </p>
          </div>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="group cursor-pointer rounded-2xl border-2 border-dashed border-border p-8 transition-all hover:border-primary/50 hover:bg-card"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <FileText className="h-8 w-8 text-primary" style={{ color: "#7c3aed" }} />
                <div className="text-left">
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {isPdf ? "PDF válido ✓" : "⚠ Formato inválido — envie um PDF"}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="ml-2 rounded-full p-1 hover:bg-muted"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="mx-auto h-10 w-10 text-muted-foreground transition-colors group-hover:text-primary" />
                <div>
                  <p className="font-medium text-sm">Upload CV</p>
                  <p className="text-muted-foreground text-xs">Clique para selecionar um PDF</p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!isPdf}
            className="w-full rounded-xl py-3 font-semibold text-sm transition-all disabled:cursor-not-allowed disabled:opacity-30"
            style={{
              backgroundColor: isPdf ? "#29046e" : undefined,
              color: isPdf ? "#fff" : undefined,
              ...(isPdf ? {} : { backgroundColor: "hsl(50 4% 25%)", color: "hsl(0 0% 65%)" }),
            }}
          >
            Analisar Currículo
          </button>
        </div>
      </div>
    );
  }

  // --- CHAT SCREEN ---
  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <button onClick={handleBack} className="text-muted-foreground hover:text-foreground text-sm">
          ← Voltar
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: "#29046e" }}>
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm leading-tight">CV Analyzer AI</p>
            <p className="text-muted-foreground text-xs">Analisando: {file?.name}</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg mt-1"
                style={{ backgroundColor: "#29046e" }}
              >
                <Bot className="h-3.5 w-3.5 text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-card"
              }`}
              style={msg.role === "user" ? { backgroundColor: "#29046e" } : {}}
            >
              {msg.role === "assistant" ? (
                <div
                  className="prose prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: msg.content
                      .replace(/### (.*)/g, '<h4 class="font-semibold mt-3 mb-1 text-sm">$1</h4>')
                      .replace(/## (.*)/g, '<h3 class="font-bold mt-4 mb-2 text-base">$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/^\- (.*)/gm, '<li class="ml-4 list-disc">$1</li>')
                      .replace(/^\d+\. (.*)/gm, '<li class="ml-4 list-decimal">$1</li>')
                      .replace(/\n/g, "<br/>"),
                  }}
                />
              ) : (
                msg.content
              )}
            </div>
            {msg.role === "user" && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted mt-1">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: "#29046e" }}
            >
              <Bot className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="rounded-2xl bg-card px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Faça uma pergunta sobre a análise..."
            className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all disabled:opacity-30"
            style={{ backgroundColor: "#29046e" }}
          >
            <Send className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
