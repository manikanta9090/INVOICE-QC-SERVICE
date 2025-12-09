📄 Invoice QC Service (AI-powered Invoice Quality Check)

An end-to-end AI-powered Invoice Quality Checking system built using:

FastAPI (Python) — backend API

React + Vite — frontend UI

Pydantic — schema validation

Invoice Parsing + OCR (AI/ML-ready architecture)

CORS enabled

JSON-based QC output

This project allows users to upload invoice details and returns a clear quality check result with validation errors, extracted fields, and overall status.

🚀 Features
✅ Backend Features (FastAPI)

Invoice schema validation using Pydantic

QC rules:

Mandatory fields check

Format validation (Invoice Number, Date, Amount)

Logical checks (Amount > 0, Date not future)

AI Integration Ready (Plug-in architecture)

Clean code with routers & services

CORS enabled for React frontend

JSON structured response

🎨 Frontend Features (React + Vite)

Clean modern UI

Invoice upload form

JSON results displayed neatly

API integration with FastAPI

Loading & error states

Fully responsive

🏗️ Project Structure
invoice-qc-service/
│
├── backend/
│   ├── main.py
│   ├── routers/
│   ├── models/
│   ├── services/
│   └── utils/
│
└── frontend/
    ├── src/
    ├── components/
    ├── pages/
    └── App.jsx

🛠️ Tech Stack
Layer	Technology
Backend	FastAPI, Python 3.10+, Uvicorn, Pydantic
Frontend	React, Vite, Axios
Tools	Git, VS Code, Node.js
AI Ready	OCR/Tesseract/LLM Plugins
⚙️ Backend Setup
1️⃣ Create virtual environment
python -m venv venv


Activate:

Windows:

venv\Scripts\activate


Mac/Linux:

source venv/bin/activate

2️⃣ Install dependencies
pip install fastapi uvicorn python-multipart pydantic

3️⃣ Start FastAPI server
uvicorn main:app --reload --port 8000


Backend runs at:

http://localhost:8000


API docs:

http://localhost:8000/docs

🎨 Frontend Setup (React + Vite)
1️⃣ Install dependencies
npm install

2️⃣ Start the frontend
npm run dev


Frontend runs at:

http://localhost:5173

🔗 Connecting Frontend & Backend

In frontend/src/services/api.js:

export const API_BASE_URL = "http://localhost:8000";

📌 API Endpoint
POST /qc

Validates invoice data.

Request Body
{
  "invoice_number": "INV-1001",
  "date": "2025-01-10",
  "vendor_name": "ABC Pvt Ltd",
  "amount": 1200.50
}

Response
{
  "status": "fail",
  "errors": ["Amount must be greater than 0"],
  "data": {},
  "timestamp": "2025-01-10T13:20:30"
}

🧪 Validation Rules
Mandatory Fields

Invoice Number

Date

Vendor Name

Amount

Format Rules

Invoice number cannot be empty

Date must be valid ISO format

Amount must be numeric and positive

Future Rules You Can Extend

GST Number check

OCR extraction from image

Text similarity check

LLM-based field classification

🧩 Future Enhancements

AI-powered invoice field extraction

PDF/image invoice upload

Dashboard for QC results

MongoDB storage

Role-based authentication

📦 Deployment
Backend (FastAPI)

Render / Railway / EC2 / Azure

Use Docker for production

Add environment variables

Frontend (React)

Netlify

Vercel

GitHub Pages

👨‍💻 Developer Guide
Push updates to existing GitHub repo:
git add .
git commit -m "Updated project UI and backend"
git push

📚 Conclusion
