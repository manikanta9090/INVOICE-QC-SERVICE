import argparse
import json
import os
from .extractor import InvoiceExtractor
from .validator import InvoiceValidator

def _print_summary(summary: dict):
    print("=== Validation Summary ===")
    print(f"Total invoices: {summary.get('total_invoices')}")
    print(f"Valid invoices: {summary.get('valid_invoices')}")
    print(f"Invalid invoices: {summary.get('invalid_invoices')}")
    print("Top errors:")
    for err, cnt in summary.get("error_counts", {}).items():
        print(f"  {err}: {cnt}")

def main():
    parser = argparse.ArgumentParser(description="Invoice QC CLI Tool")
    sub = parser.add_subparsers(dest="command")
    ext = sub.add_parser("extract", help="Extract PDFs into JSON")
    ext.add_argument("--pdf-dir", required=True, help="Folder containing PDFs")
    ext.add_argument("--output", required=True, help="Output JSON file")
    val = sub.add_parser("validate", help="Validate extracted JSON")
    val.add_argument("--input", required=True, help="Input JSON file (list of invoices)")
    val.add_argument("--report", required=True, help="Output report JSON file")
    fr = sub.add_parser("full-run", help="Extract from pdfs and validate")
    fr.add_argument("--pdf-dir", required=True, help="Folder containing PDFs")
    fr.add_argument("--report", required=True, help="Output report JSON file")
    args = parser.parse_args()
    if args.command == "extract":
        extractor = InvoiceExtractor()
        invoices = extractor.extract_folder(args.pdf_dir)
        os.makedirs(os.path.dirname(args.output) or ".", exist_ok=True)
        with open(args.output, "w", encoding="utf-8") as f:
            json.dump(invoices, f, indent=2, ensure_ascii=False)
        print(f"Extraction complete: {args.output}")
    elif args.command == "validate":
        with open(args.input, "r", encoding="utf-8") as f:
            invoices = json.load(f)
        validator = InvoiceValidator()
        results, summary = validator.validate_all(invoices)
        out = {"results": results, "summary": summary}
        os.makedirs(os.path.dirname(args.report) or ".", exist_ok=True)
        with open(args.report, "w", encoding="utf-8") as f:
            json.dump(out, f, indent=2, ensure_ascii=False)
        print(f"Validation complete: {args.report}")
        _print_summary(summary)
        if summary["invalid_invoices"] > 0:
            exit(2)
    elif args.command == "full-run":
        extractor = InvoiceExtractor()
        invoices = extractor.extract_folder(args.pdf_dir)
        validator = InvoiceValidator()
        results, summary = validator.validate_all(invoices)
        out = {"results": results, "summary": summary, "invoices": invoices}
        os.makedirs(os.path.dirname(args.report) or ".", exist_ok=True)
        with open(args.report, "w", encoding="utf-8") as f:
            json.dump(out, f, indent=2, ensure_ascii=False)
        print(f"Full run complete: {args.report}")
        _print_summary(summary)
        if summary["invalid_invoices"] > 0:
            exit(2)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
