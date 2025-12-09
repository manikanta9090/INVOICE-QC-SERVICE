from fastapi import FastAPI, UploadFile, File, HTTPException
from typing import List
from .validator import InvoiceValidator
from .extractor import InvoiceExtractor
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import json
import os

app = FastAPI(title="Invoice QC API")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/validate-json")
async def validate_json(invoices: List[dict]):
    """Validate a list of invoices in JSON format."""
    if not isinstance(invoices, list):
        raise HTTPException(status_code=400, detail="Body must be a JSON array (list of invoices)")
    if len(invoices) == 0:
        raise HTTPException(status_code=400, detail="Invoice list cannot be empty")
    
    validator = InvoiceValidator()
    results, summary = validator.validate_all(invoices)
    return {
        "summary": summary,
        "results": results,
        "extracted": invoices  # Return original invoices for reference
    }

@app.post("/extract-and-validate-pdfs")
async def extract_and_validate_pdfs(files: List[UploadFile] = File(...)):
    extractor = InvoiceExtractor()
    temp_dir = tempfile.mkdtemp(prefix="invoice_qc_")
    extracted = []
    try:
        for uf in files:
            fname = uf.filename or "upload.pdf"
            tmp_path = os.path.join(temp_dir, fname)
            with open(tmp_path, "wb") as f:
                f.write(await uf.read())
            try:
                inv = extractor.extract_from_pdf(tmp_path)
            except Exception as e:
                inv = {"invoice_number": None, "source_file": fname, "error": f"extraction_failed: {e}"}
            extracted.append(inv)
        validator = InvoiceValidator()
        results, summary = validator.validate_all(extracted)
        return {"extracted": extracted, "summary": summary, "results": results}
    finally:
        try:
            for f in os.listdir(temp_dir):
                os.remove(os.path.join(temp_dir, f))
            os.rmdir(temp_dir)
        except Exception:
            pass
