from typing import List, Optional
from pydantic import BaseModel, Field, validator
from datetime import datetime

class LineItem(BaseModel):
    description: str
    quantity: Optional[float] = None
    unit_price: Optional[float] = None
    line_total: float

class Invoice(BaseModel):
    invoice_number: Optional[str] = Field(None, description="Unique invoice identifier")
    external_reference: Optional[str] = None
    invoice_date: Optional[str] = None
    due_date: Optional[str] = None

    seller_name: Optional[str] = None
    seller_tax_id: Optional[str] = None
    buyer_name: Optional[str] = None
    buyer_tax_id: Optional[str] = None

    currency: Optional[str] = "EUR"
    net_total: Optional[float] = None
    tax_amount: Optional[float] = None
    gross_total: Optional[float] = None

    payment_terms: Optional[str] = None
    line_items: Optional[List[LineItem]] = None
    source_file: Optional[str] = None

    @validator("invoice_date", "due_date", pre=True, always=True)
    def normalize_dates(cls, v):
        if v is None or v == "":
            return v
        for fmt in ("%Y-%m-%d", "%d/%m/%Y", "%d-%m-%Y", "%m/%d/%Y"):
            try:
                dt = datetime.strptime(v.strip(), fmt)
                return dt.strftime("%Y-%m-%d")
            except Exception:
                continue
        return v
