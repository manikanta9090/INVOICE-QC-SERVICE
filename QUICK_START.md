# Quick Start Guide - Testing Your Invoice QC Service

## ⚡ Quick Setup (5 minutes)

### **Terminal 1: Backend**
```powershell
cd C:\Users\Mani\Projects\invoice-qc-service
.\venv\Scripts\Activate.ps1
python main.py
```
✅ You should see: `Uvicorn running on http://127.0.0.1:8000`

### **Terminal 2: Frontend**
```powershell
cd C:\Users\Mani\Projects\invoice-qc-service\frontend
npm run dev
```
✅ You should see: `Local:   http://localhost:5173/`

---

## 🧪 Test Scenarios

### **Test 1: JSON Validation (No PDFs needed)**

1. Open `http://localhost:5173/`
2. Click **"Validate JSON"** card
3. Click **"Load Sample"** button
4. Click **"Validate JSON"** button
5. ✅ Should show results with:
   - Summary cards (3 total, 1 valid, 2 invalid)
   - Error breakdown
   - Results table

### **Test 2: Error Handling**

1. On JSON page, click in textarea
2. Delete the sample text
3. Click "Validate JSON"
4. ✅ Should show red error: "Please enter JSON data"

### **Test 3: Invalid JSON**

1. Type random text in textarea
2. Click "Validate JSON"  
3. ✅ Should show error about JSON format

### **Test 4: Backend Connection Test**

```powershell
# In any terminal:
curl -X GET http://localhost:8000/health
```
✅ Should return: `{"status":"ok"}`

### **Test 5: PDF Upload (Optional - if you have PDFs)**

1. Click **"Upload PDFs"** card
2. Select PDF files
3. See file list appear
4. Click **"Upload & Validate"**
5. Watch loading spinner
6. ✅ Should show results

---

## 📊 Sample JSON for Testing

If the sample button doesn't work, use this:

```json
[
  {
    "invoice_number": "INV-2024-001",
    "invoice_date": "2024-12-01",
    "due_date": "2024-12-15",
    "seller_name": "ABC Company Ltd",
    "buyer_name": "XYZ Corporation",
    "currency": "USD",
    "net_total": 1000,
    "tax_amount": 100,
    "gross_total": 1100,
    "line_items": [
      {
        "description": "Professional Services",
        "quantity": 10,
        "unit_price": 100,
        "line_total": 1000
      }
    ]
  },
  {
    "invoice_number": "INV-2024-002",
    "invoice_date": "2024-12-02",
    "due_date": "2024-12-16",
    "seller_name": "ABC Company Ltd",
    "buyer_name": "Different Customer",
    "currency": "EUR",
    "net_total": 500,
    "tax_amount": 50,
    "gross_total": 650,
    "line_items": [
      {
        "description": "Products",
        "quantity": 5,
        "unit_price": 100,
        "line_total": 500
      }
    ]
  }
]
```

---

## 🔍 What to Look For

### **Success Indicators:**

1. **Home Page**
   - [ ] Gradient blue-to-green background
   - [ ] Two cards with rounded corners
   - [ ] Card descriptions visible
   - [ ] Buttons are clickable

2. **Upload Page**
   - [ ] Consistent white card styling
   - [ ] File input with border
   - [ ] Clear upload button
   - [ ] Professional layout

3. **JSON Page**
   - [ ] Large textarea for input
   - [ ] "Load Sample" button visible
   - [ ] Clear error display area
   - [ ] Green validate button

4. **Results Display**
   - [ ] Three summary cards at top
   - [ ] Valid/Invalid count visible
   - [ ] Results table with status badges
   - [ ] Expandable raw JSON viewer

---

## 🚨 Troubleshooting

### **Issue: "Failed to connect to backend"**
- [ ] Verify backend is running on terminal 1
- [ ] Check if `http://localhost:8000/health` works
- [ ] Verify port 8000 is not blocked by firewall

### **Issue: Frontend not loading**
- [ ] Check if `npm run dev` is running
- [ ] Try `http://localhost:5173/` in different browser
- [ ] Check browser console for errors (F12)

### **Issue: JSON validation shows "Invalid JSON format"**
- [ ] Ensure JSON is properly formatted (quotes, commas)
- [ ] Paste the sample JSON exactly as shown above
- [ ] Check for extra commas or missing brackets

### **Issue: Upload button disabled**
- [ ] You must select files first
- [ ] Check that files are PDF format
- [ ] File name should not have special characters

---

## 📋 What Was Improved

### **Before ❌ vs After ✅**

| Feature | Before | After |
|---------|--------|-------|
| **Styling** | Inconsistent | Unified Tailwind |
| **Errors** | Alert boxes | Inline messages |
| **Loading** | No feedback | Animated spinners |
| **UI Appeal** | Basic | Professional |
| **Validation** | Minimal | Comprehensive |
| **Error Messages** | Generic | Contextual |
| **Results Display** | Simple table | Rich visualization |
| **Dependencies** | Duplicates | Clean & verified |

---

## 🎯 Next Steps

After testing:
1. ✅ Verify all scenarios pass
2. ✅ Check browser console (F12) for errors
3. ✅ Note any issues or unexpected behavior
4. ✅ Test with real PDF files (if available)

---

## 📞 Common Questions

**Q: Do I need to restart servers after code changes?**
A: Backend (FastAPI): Yes. Frontend (Vite): No, it hot-reloads.

**Q: Can I access from another computer?**
A: Not with localhost. Use your machine's IP address instead.

**Q: How do I stop the servers?**
A: Press `Ctrl+C` in the terminal.

**Q: Where are errors logged?**
A: Backend errors show in terminal 1, frontend errors in browser console (F12).

---

Generated: 2025-12-08
