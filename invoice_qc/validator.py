from typing import List, Dict, Tuple
from datetime import datetime

ALLOWED_CURRENCIES = {"USD", "EUR", "INR", "GBP", "AUD", "CAD"}
AMOUNT_TOLERANCE_REL = 0.005
AMOUNT_TOLERANCE_ABS = 0.5

class InvoiceValidator:
    def __init__(self):
        pass

    def _is_date_parseable(self, s: str) -> bool:
        if not s:
            return False
        for fmt in ("%Y-%m-%d", "%d/%m/%Y", "%d-%m-%Y", "%m/%d/%Y"):
            try:
                datetime.strptime(s.strip(), fmt)
                return True
            except Exception:
                continue
        return False

    def _safe_float(self, v) -> float:
        try:
            return float(v) if v is not None else 0.0
        except Exception:
            return 0.0

    def validate_invoice(self, invoice: Dict) -> Dict:
        errors = []
        inv_id = invoice.get("invoice_number") or invoice.get("source_file") or "unknown"

        if not invoice.get("invoice_number"):
            errors.append("missing_field: invoice_number")
        if not invoice.get("invoice_date"):
            errors.append("missing_field: invoice_date")
        else:
            if not self._is_date_parseable(invoice.get("invoice_date")):
                errors.append("format_error: invoice_date")

        if not invoice.get("seller_name"):
            errors.append("missing_field: seller_name")
        if not invoice.get("buyer_name"):
            errors.append("missing_field: buyer_name")

        if invoice.get("currency"):
            cur = str(invoice.get("currency")).upper()
            if cur not in ALLOWED_CURRENCIES:
                errors.append(f"format_error: currency_not_allowed ({cur})")

        net = self._safe_float(invoice.get("net_total"))
        tax = self._safe_float(invoice.get("tax_amount"))
        gross = self._safe_float(invoice.get("gross_total"))

        if net < 0 or tax < 0 or gross < 0:
            errors.append("anomaly: negative_total")

        expected = net + tax
        diff = abs(expected - gross)
        tol = max(AMOUNT_TOLERANCE_ABS, AMOUNT_TOLERANCE_REL * max(abs(gross), 1.0))
        if diff > tol:
            errors.append("business_rule_failed: totals_mismatch")

        line_items = invoice.get("line_items") or []
        if line_items and isinstance(line_items, list):
            sum_lines = 0.0
            for li in line_items:
                lt = None
                if isinstance(li, dict):
                    lt = li.get("line_total")
                else:
                    lt = getattr(li, "line_total", None)
                sum_lines += self._safe_float(lt)
            if abs(sum_lines - net) > tol:
                errors.append("business_rule_failed: line_items_mismatch")

        if invoice.get("due_date") and invoice.get("invoice_date"):
            try:
                fmtts = ("%Y-%m-%d", "%d/%m/%Y", "%d-%m-%Y", "%m/%d/%Y")
                def parse(s):
                    for f in fmtts:
                        try:
                            return datetime.strptime(s.strip(), f)
                        except:
                            continue
                    return None
                due = parse(invoice.get("due_date"))
                invd = parse(invoice.get("invoice_date"))
                if due and invd and due < invd:
                    errors.append("business_rule_failed: due_before_invoice")
            except Exception:
                pass

        result = {
            "invoice_id": inv_id,
            "is_valid": len(errors) == 0,
            "errors": errors
        }
        return result

    def validate_all(self, invoices: List[Dict]) -> Tuple[List[Dict], Dict]:
        results = []
        error_counts = {}
        seen = {}
        for inv in invoices:
            key = (inv.get("invoice_number"), (inv.get("seller_name") or "").lower(), inv.get("invoice_date"))
            if key in seen and inv.get("invoice_number"):
                seen[key]["_duplicate_flag"] = True
                inv["_duplicate_flag"] = True
            else:
                seen[key] = inv

        for inv in invoices:
            res = self.validate_invoice(inv)
            if inv.get("_duplicate_flag"):
                res["errors"].append("anomaly: duplicate_invoice")
                res["is_valid"] = len(res["errors"]) == 0
            results.append(res)
            for e in res["errors"]:
                error_counts[e] = error_counts.get(e, 0) + 1

        summary = {
            "total_invoices": len(invoices),
            "valid_invoices": sum(1 for r in results if r["is_valid"]),
            "invalid_invoices": sum(1 for r in results if not r["is_valid"]),
            "error_counts": error_counts
        }
        return results, summary
