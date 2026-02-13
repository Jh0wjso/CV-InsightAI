export async function analyzeResume(text: string): Promise<string> {
  const res = await fetch("http://localhost:3001/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error("Failed to analyze resume");
  }

  const data = await res.json();
  return data.result;
}

export async function uploadPDF(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("resume", file);

  const res = await fetch("http://localhost:3001/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload PDF");
  }

  const data = await res.json();
  return data.text;
}
