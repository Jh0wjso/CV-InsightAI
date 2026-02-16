import { useState, useRef } from "react";
import { Upload, FileText, Sparkles, X, ArrowLeft } from "lucide-react";
import { uploadPDF, analyzeResume } from "../services/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createResumeAnalysisPrompt } from "../config/prompts";
import { translations } from "../config/translations";
import { styles } from "../styles/index.styles";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'pt'>('en');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = translations[language];

  const isPdf = file?.type === "application/pdf";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
  };

  const handleAnalyze = async () => {
    if (!isPdf || !file) return;
    setLoading(true);

    try {
      const text = await uploadPDF(file);
      const prompt = createResumeAnalysisPrompt(text, language);
      const result = await analyzeResume(prompt);
      console.log("=== INFERENCE RESULT ===");
      console.log(result);
      console.log("=== END RESULT ===");
      setAnalysis(result);
    } catch (error) {
      setAnalysis(t.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setFile(null);
    setAnalysis("");
  };

  if (analysis) {
    return (
      <div className={styles.container.analysis}>
        <div className={styles.content.analysisWrapper}>
          <button onClick={handleBack} className={styles.button.back}>
            <ArrowLeft className={styles.button.backIcon} />
            {t.newAnalysis}
          </button>
          
          <div className={styles.analysis.card}>
            <div className={styles.analysis.content}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{analysis}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className={styles.header.topBar}>
        <button
          onClick={() => setLanguage('en')}
          className={`${styles.header.langButton} ${language === 'en' ? styles.header.langButtonActive : styles.header.langButtonInactive}`}
        >
          <img src="/US-UK_Flag.png" width={25} /> EN
        </button>
        <button
          onClick={() => setLanguage('pt')}
          className={`${styles.header.langButton} ${language === 'pt' ? styles.header.langButtonActive : styles.header.langButtonInactive}`}
        >
          <img src="/br_pt.png" width={25} /> PT
        </button>
      </header>
      
      <div className={styles.container.main} style={{ paddingTop: '4rem' }}>
      <div className={styles.content.wrapper}>
        <div className={styles.header.wrapper}>
          <div className={styles.header.iconContainer}>
            <Sparkles className={styles.header.icon} style={{ color: "#7c3aed" }} />
          </div>
          <h1 className={styles.header.title}>{t.title}</h1>
          <p className={styles.header.subtitle}>
            {t.subtitle}
          </p>
        </div>

        <div onClick={() => fileInputRef.current?.click()} className={styles.upload.dropzone}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className={styles.upload.fileInput}
          />
          {file ? (
            <div className={styles.upload.fileDisplay}>
              <FileText className={styles.upload.fileIcon} style={{ color: "#7c3aed" }} />
              <div className={styles.upload.fileInfo}>
                <p className={styles.upload.fileName}>{file.name}</p>
                <p className={styles.upload.fileStatus}>
                  {isPdf ? t.validPdf : t.invalidPdf}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className={styles.upload.removeButton}
              >
                <X className={styles.upload.removeIcon} />
              </button>
            </div>
          ) : (
            <div className={styles.upload.emptyState}>
              <Upload className={styles.upload.uploadIcon} />
              <div>
                <p className={styles.upload.uploadText}>{t.uploadText}</p>
                <p className={styles.upload.uploadHint}>{t.uploadHint}</p>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!isPdf || loading}
          className={styles.button.primary}
          style={{
            backgroundColor: isPdf && !loading ? "#29046e" : undefined,
            color: isPdf && !loading ? "#fff" : undefined,
            ...(!isPdf || loading ? { backgroundColor: "hsl(50 4% 25%)", color: "hsl(0 0% 65%)" } : {}),
          }}
        >
          {loading ? t.analyzingButton : t.analyzeButton}
        </button>
      </div>
    </div>
    </>
  );
};

export default Index;
