import pdfplumber
import re
import os
from typing import Dict, List, Optional

class InvoiceExtractor:
    def __init__(self):
        self.patterns = {
            "invoice_number": r"(?:Invoice\s*(?:No\.?|Number|#))\s*[:\-]?\s*([A-Za-z0-9\-/]+)",
            "invoice_date": r"(?:Invoice\s*Date|Date)\s*[:\-]?\s*([0-9]{4}-[0-9]{2}-[0-9]{2}|[0-9]{2}/[0-9]{2}/[0-9]{4})",
            "due_date": r"(?:Due\s*Date|Due)\s*[:\-]?\s*([0-9]{4}-[0-9]{2}-[0-9]{2}|[0-9]{2}/[0-9]{2}/[0-9]{4})",
            "seller_name": r"(?:Seller|From)\s*[:\-]?\s*(.+)",
            "buyer_name": r"(?:Buyer|To)\s*[:\-]?\s*(.+)",
            "currency": r"(?:Currency)\s*[:\-]?\s*([A-Z]{3})",
            "net_total": r"(?:Subtotal|Net\s*Total|Net)\s*[:\-]?\s*([0-9\.,]+)",
            "tax_amount": r"(?:(?:Tax|VAT|GST|Sales Tax))\s*[:\-]?\s*([0-9\.,]+)",
            "gross_total": r"(?:Total|Total\s*Amount|Grand\s*Total|Gross\s*Total)\s*[:\-]?\s*([0-9\.,]+)",
            "seller_tax_id": r"(?:VAT|GSTIN|Tax\s*ID|Tax\s*No\.?)\s*[:\-]?\s*([A-Z0-9\-]+)",
        }
        self.line_item_header_terms = ["description", "qty", "quantity", "unit", "unit price", "price", "amount", "total"]

    def _text_from_pdf(self, pdf_path: str) -> str:
        text_parts = []
        with pdfplumber.open(pdf_path) as pdf:
            for p in pdf.pages:
                t = p.extract_text()
                if t:
                    text_parts.append(t)
        return "\n".join(text_parts)

    def _extract_field(self, text: str, pattern: str) -> Optional[str]:
        m = re.search(pattern, text, re.IGNORECASE)
        if not m:
            return None
        return m.group(1).strip()

    def _parse_amount(self, s: Optional[str]) -> Optional[float]:
        if s is None:
            return None
        s = s.replace(",", "").replace(" ", "").replace("₹", "").replace("$", "")
        try:
            return float(s)
        except Exception:
            return None

    def extract_from_pdf(self, pdf_path: str) -> Dict:
        txt = self._text_from_pdf(pdf_path)
        data: Dict = {}

        for field, patt in self.patterns.items():
            val = self._extract_field(txt, patt)
            if field in ["net_total", "tax_amount", "gross_total"] and val is not None:
                data[field] = self._parse_amount(val)
            else:
                data[field] = val

        if not data.get("invoice_number"):
            m = re.search(r"(?:INV[-\s]?\d{1,6}|Invoice[-\s]?\d{1,6})", txt, re.IGNORECASE)
            if m:
                data["invoice_number"] = m.group(0).strip()

        data["line_items"] = []
        lines = txt.splitlines()
        try:
            header_idx = None
            for i, line in enumerate(lines):
                low = line.lower()
                if any(term in low for term in self.line_item_header_terms):
                    header_idx = i
                    break
            if header_idx is not None:
                for row in lines[header_idx+1:header_idx+11]:
                    cols = re.split(r"\s{2,}|\t", row.strip())
                    if len(cols) >= 2:
                        maybe_amount = cols[-1].replace(",", "")
                        amt = self._parse_amount(maybe_amount)
                        if amt is not None:
                            desc = " ".join(cols[:-1]).strip()
                            item = {
                                "description": desc or "item",
                                "quantity": None,
                                "unit_price": None,
                                "line_total": amt
                            }
                            data["line_items"].append(item)
        except Exception:
            data["line_items"] = data.get("line_items", [])

        data["source_file"] = os.path.basename(pdf_path)

        return data

    def extract_folder(self, folder_path: str) -> List[Dict]:
        invoices = []
        for fname in sorted(os.listdir(folder_path)):
            if fname.lower().endswith(".pdf"):
                path = os.path.join(folder_path, fname)
                try:
                    inv = self.extract_from_pdf(path)
                    invoices.append(inv)
                except Exception as e:
                    invoices.append({
                        "invoice_number": None,
                        "source_file": fname,
                        "error": f"extraction_failed: {e}"
                    })
        return invoices
