from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Allow requests from frontend (Vite default port 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----- Models -----
class Invoice(BaseModel):
    invoice_id: str
    is_valid: bool
    errors: List[str]

class ValidationRequest(BaseModel):
    invoices: List[Invoice]

# ----- Routes -----
@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/validate-json")
def validate_json(request: ValidationRequest):
    # Dummy validation: mark invoices valid if no errors
    for inv in request.invoices:
        inv.is_valid = len(inv.errors) == 0
    summary = {
        "total_invoices": len(request.invoices),
        "valid_invoices": sum(inv.is_valid for inv in request.invoices),
        "invalid_invoices": sum(not inv.is_valid for inv in request.invoices)
    }
    return {"summary": summary, "invoices": request.invoices}

@app.post("/extract-and-validate-pdfs")
async def extract_and_validate(files: List[UploadFile] = File(...)):
    # For now, dummy response
    invoices = []
    for file in files:
        invoices.append({
            "invoice_id": file.filename,
            "is_valid": True,
            "errors": []
        })
    summary = {
        "total_invoices": len(invoices),
        "valid_invoices": len(invoices),
        "invalid_invoices": 0
    }
    return {"summary": summary, "invoices": invoices}
