# CV-InsightAI

Intelligent resume analysis application using AI, with React frontend and Node.js backend integrated with Hugging Face.

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Hugging Face account (free)

## 🔑 Hugging Face Setup

### 1. Create Hugging Face Account

Go to [huggingface.co](https://huggingface.co) and create a free account.

### 2. Generate API Token

1. Log in to Hugging Face
2. Go to [Settings > Access Tokens](https://huggingface.co/settings/tokens)
3. Click "New token"
4. Name your token (e.g., "cv-insight-ai")
5. Select "Read" type (sufficient for using models)
6. Click "Generate token"
7. **Copy the generated token** (you won't be able to see it again)

### 3. Configure Environment Variables

Copy the example files and add your token:

```bash
# In the server directory
cp server/.env.example server/.env
```

Edit `server/.env` and add your Hugging Face token:
```
HF_TOKEN=your_token_here
```

## 🚀 Installation and Running

### Quick Install

```bash
make install
```

### Run the Project

```bash
make start
```

This will start:
- Frontend: http://localhost:8080
- Backend: http://localhost:3001

### Available Commands

```bash
make help           # List all commands
make install        # Install app and server dependencies
make install-app    # Install frontend dependencies only
make install-server # Install backend dependencies only
make start          # Start app and server
make start-app      # Start frontend only
make start-server   # Start backend only
make build          # Build app for production
make clean          # Remove node_modules and build files
```

## 📁 Project Structure

```
CV-InsightAI/
├── app/              # React + Vite Frontend
│   ├── src/
│   └── .env.example
├── server/           # Node.js + Express Backend
│   ├── server.js
│   └── .env.example
├── Makefile
└── README.md
```

## 🛠️ Technologies

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Shadcn/ui
- React Markdown

### Backend
- Node.js
- Express
- OpenAI SDK (for Hugging Face)
- Multer (file upload)
- pdf-parse-fork (text extraction)

## 🤖 AI Model

The project uses the **Kimi-K2-Instruct-0905** model from Moonshot AI through the Hugging Face Inference API.

## 📝 How to Use

1. Access http://localhost:8080
2. Select language (EN/PT)
3. Upload a resume in PDF format
4. Click "Analyze Resume"
5. Wait for the complete analysis with insights and recommendations

## 🔧 Troubleshooting

### Port Already in Use
```bash
make start  # Makefile automatically kills processes on ports
```

### Hugging Face Authentication Error
- Check if the token is correct in `server/.env` file
- Confirm the token has read permissions

### PDF Upload Error
- Make sure the `server/uploads/` directory exists
- Verify the file is a valid PDF

## 📄 License

MIT
