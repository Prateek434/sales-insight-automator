# Sales Insight Automator

## Project Overview

Sales Insight Automator is a full-stack web application that transforms raw sales data into executive-level narrative summaries powered by AI. Users upload a CSV or Excel file containing sales data, provide a recipient email address, and the application automatically parses the data, generates a professional summary using Groq's LLM (LLaMA 3 70B), and delivers it via email through Resend. The application is built with a Next.js 14 frontend and a Node.js/Express backend, containerized with Docker for consistent deployments.

## Live URLs

| Service      | URL                              |
| ------------ | -------------------------------- |
| Frontend     | `https://your-app.vercel.app`    |
| Backend API  | `https://your-api.onrender.com`  |
| Swagger Docs | `https://your-api.onrender.com/api/docs` |

## Running Locally with Docker

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/sales-insight-automator.git
   cd sales-insight-automator
   ```

2. Create environment files:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

3. Fill in the API keys in `backend/.env`:
   ```
   GROQ_API_KEY=your_groq_api_key
   RESEND_API_KEY=your_resend_api_key
   RESEND_FROM_EMAIL=no-reply@yourdomain.com
   ```

4. Start the application:
   ```bash
   docker-compose up --build
   ```

5. Access the services:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8000](http://localhost:8000)
   - Swagger Docs: [http://localhost:8000/api/docs](http://localhost:8000/api/docs)

## Running Without Docker (Development)

### Backend

```bash
cd backend
cp .env.example .env
# Fill in your API keys in .env
npm install
npm run dev
```

The backend will start on [http://localhost:8000](http://localhost:8000).

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The frontend will start on [http://localhost:3000](http://localhost:3000).

## Security Implementation

| Layer                | Implementation                                                 |
| -------------------- | -------------------------------------------------------------- |
| Security Headers     | Helmet middleware sets strict HTTP security headers             |
| CORS                 | Restricted to the configured frontend origin only              |
| Rate Limiting        | 10 requests per 15 minutes per IP address                      |
| File Validation      | Type checking (CSV/XLSX only) and size enforcement (5MB max)   |
| Email Validation     | Regex-based format validation before processing                |
| Docker Security      | Non-root user in all production containers                     |
| Secrets Management   | All credentials via environment variables, never in source     |

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Browser                            │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 14)                         │
│                    Vercel / Docker :3000                         │
│                                                                  │
│  ┌──────────────┐  ┌────────────────┐  ┌─────────────────────┐  │
│  │  UploadForm  │  │ StatusMessage  │  │     lib/api.js      │  │
│  └──────────────┘  └────────────────┘  └─────────┬───────────┘  │
└──────────────────────────────────────────────────┬───────────────┘
                                                   │ POST /api/upload
                                                   ▼
┌──────────────────────────────────────────────────────────────────┐
│                   Backend (Express.js)                           │
│                   Render / Docker :8000                          │
│                                                                  │
│  ┌────────┐  ┌──────┐  ┌───────────┐                           │
│  │ Helmet │  │ CORS │  │ RateLimit │    Middleware Layer        │
│  └────────┘  └──────┘  └───────────┘                           │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   routes/upload.js                        │   │
│  │     Multer → Validate → Parse → Summarize → Email        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌───────────┐      ┌──────────┐      ┌──────────┐            │
│  │ parser.js │ ───▶ │ groq.js  │ ───▶ │mailer.js │            │
│  │ CSV/XLSX  │      │ LLaMA 3  │      │  Resend  │            │
│  └───────────┘      └──────────┘      └──────────┘            │
└──────────────────────────────────────────────────────────────────┘
                          │                      │
                          ▼                      ▼
                   ┌─────────────┐      ┌──────────────┐
                   │  Groq API   │      │  Resend API  │
                   │ LLaMA 3 70B│      │  Email SMTP  │
                   └─────────────┘      └──────────────┘
```

## Environment Variables Reference

### Backend (`/backend/.env`)

| Variable          | Description                          | Example                     |
| ----------------- | ------------------------------------ | --------------------------- |
| `PORT`            | Server port                          | `8000`                      |
| `GROQ_API_KEY`    | Groq API key for LLM access         | `gsk_...`                   |
| `RESEND_API_KEY`  | Resend API key for email delivery    | `re_...`                    |
| `RESEND_FROM_EMAIL` | Sender email address               | `no-reply@yourdomain.com`  |
| `FRONTEND_ORIGIN` | Allowed CORS origin                 | `http://localhost:3000`     |

### Frontend (`/frontend/.env`)

| Variable                  | Description                | Example                  |
| ------------------------- | -------------------------- | ------------------------ |
| `NEXT_PUBLIC_BACKEND_URL` | Backend API base URL       | `http://localhost:8000`  |
