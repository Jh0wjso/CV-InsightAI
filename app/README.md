# CV-InsightAI - Frontend

React interface for intelligent resume analysis with AI.

## 🛠️ Tech Stack

- **React 18** - UI Library
- **TypeScript** - Static typing
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **Shadcn/ui** - UI Components
- **React Router** - Routing
- **TanStack Query** - Async state management
- **React Markdown** - Analysis rendering
- **Lucide React** - Icons

## 📁 Project Structure

```
app/
├── src/
│   ├── components/
│   │   ├── ui/              # Shadcn/ui components
│   │   └── NavLink.tsx      # Navigation component
│   ├── config/
│   │   ├── prompts.ts       # AI prompts
│   │   └── translations.ts  # EN/PT translations
│   ├── hooks/               # Custom hooks
│   ├── lib/
│   │   ├── endpoints.api.ts # API endpoints
│   │   └── utils.ts         # Utilities
│   ├── pages/
│   │   ├── Index.tsx        # Main page
│   │   └── NotFound.tsx     # 404 page
│   ├── services/
│   │   └── api.ts           # API services
│   ├── styles/
│   │   └── index.styles.ts  # Centralized styles
│   └── test/                # Tests
├── public/                  # Static assets
└── .env.example             # Environment variables
```

## 🚀 Installation

```bash
npm install
```

## ⚙️ Configuration

Copy the example file and configure variables:

```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:3001
VITE_HUGGING_FACE_ACCESS_TOKEN=your_token_here
```

## 🏃 Running

### Development Mode
```bash
npm run dev
```
Access: http://localhost:8080

### Production Build
```bash
npm run build
```

### Build Preview
```bash
npm run preview
```

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch
```

## 🎨 Features

- ✅ PDF upload
- ✅ AI-powered resume analysis
- ✅ Bilingual support (EN/PT)
- ✅ Responsive interface
- ✅ Markdown rendering
- ✅ Loading visual feedback
- ✅ File validation

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run build:dev` | Development mode build |
| `npm run preview` | Build preview |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
| `npm run test:watch` | Tests in watch mode |

## 🌐 Internationalization

The app supports two languages:
- 🇺🇸 English (EN)
- 🇧🇷 Portuguese (PT)

Translations are in `src/config/translations.ts`.

## 🔌 Backend Integration

Communication with backend is done through:
- `uploadPDF()` - PDF file upload
- `analyzeResume()` - Resume analysis

Endpoints configured in `src/lib/endpoints.api.ts`.

## 🎯 Main Components

### Index.tsx
Main page with:
- Language selector
- PDF upload
- Analysis button
- Results display

### api.ts
Communication services:
- File upload
- Analysis requests

### translations.ts
i18n system with multi-language support.

## 🔧 Vite Configuration

- Port: 8080
- HMR overlay: disabled
- Alias: `@` → `./src`

## 📝 License

MIT
