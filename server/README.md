# CV-InsightAI - Backend

Node.js backend API for resume analysis using Hugging Face AI models.

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **OpenAI SDK** - Hugging Face API integration
- **Multer** - File upload handling
- **pdf-parse-fork** - PDF text extraction
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📁 Project Structure

```
server/
├── uploads/         # Temporary PDF storage
├── server.js        # Main server file
├── .env.example     # Environment variables template
└── package.json     # Dependencies
```

## 🚀 Installation

```bash
npm install
```

## ⚙️ Configuration

### 1. Get Hugging Face Token

1. Create account at [huggingface.co](https://huggingface.co)
2. Go to [Settings > Access Tokens](https://huggingface.co/settings/tokens)
3. Click "New token"
4. Select "Read" type
5. Copy the generated token

### 2. Setup Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
HF_TOKEN=your_huggingface_token_here
```

## 🏃 Running

```bash
npm start
```

Server runs on: http://localhost:3001

## 🔌 API Endpoints

### POST /upload
Upload and extract text from PDF resume.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `resume` (PDF file)

**Response:**
```json
{
  "text": "Extracted resume text..."
}
```

**Errors:**
- `400` - No file uploaded
- `500` - PDF parsing failed

### POST /analyze
Analyze resume text using AI.

**Request:**
- Method: `POST`
- Content-Type: `application/json`
- Body:
```json
{
  "text": "Resume text to analyze..."
}
```

**Response:**
```json
{
  "result": "AI analysis result..."
}
```

**Errors:**
- `500` - Analysis failed

## 🤖 AI Model

Uses **Kimi-K2-Instruct-0905** from Moonshot AI via Hugging Face Inference API.

- Provider: Hugging Face Router
- Endpoint: `https://router.huggingface.co/v1`
- Model: `moonshotai/Kimi-K2-Instruct-0905`

## 🎯 Features

- ✅ PDF file upload
- ✅ Text extraction from PDF
- ✅ AI-powered resume analysis
- ✅ CORS enabled
- ✅ Error handling
- ✅ Automatic file cleanup

## 🔧 Dependencies

| Package | Purpose |
|---------|---------|
| `express` | Web server framework |
| `openai` | Hugging Face API client |
| `multer` | File upload middleware |
| `pdf-parse-fork` | PDF text extraction |
| `cors` | Enable CORS |
| `dotenv` | Environment variables |

## 🛡️ Security Notes

- Never commit `.env` file
- Keep HF_TOKEN private
- Uploaded files are deleted after processing
- Use read-only Hugging Face tokens

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Authentication Error
- Verify HF_TOKEN in `.env`
- Check token has read permissions
- Ensure token is valid

### PDF Upload Error
- Verify `uploads/` directory exists
- Check file is valid PDF
- Ensure sufficient disk space

## 📝 License

MIT
