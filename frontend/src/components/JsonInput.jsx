import { useState } from "react";
import { validateJSON } from "../api/qcService";

function JsonInput({ setResults }) {
  const [jsonText, setJsonText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleValidate() {
    setError(null);
    
    if (!jsonText.trim()) {
      setError("Please enter JSON data");
      return;
    }

    setLoading(true);
    try {
      const data = JSON.parse(jsonText);
      
      if (!Array.isArray(data)) {
        setError("JSON must be an array of invoices");
        setLoading(false);
        return;
      }
      
      const response = await validateJSON(data);
      setResults(response);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError("Invalid JSON format: " + err.message);
      } else {
        setError("Validation failed: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const sampleJSON = [
    {
      "invoice_number": "INV-001",
      "invoice_date": "2024-12-01",
      "due_date": "2024-12-15",
      "seller_name": "ABC Company",
      "buyer_name": "XYZ Corp",
      "currency": "USD",
      "net_total": 1000,
      "tax_amount": 100,
      "gross_total": 1100,
      "line_items": [
        {"description": "Service", "quantity": 1, "unit_price": 1000, "line_total": 1000}
      ]
    }
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto my-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Validate JSON Invoices</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p className="font-semibold">⚠️ {error}</p>
        </div>
      )}

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-gray-700">JSON Data</label>
          <button
            onClick={() => setJsonText(JSON.stringify(sampleJSON, null, 2))}
            className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded transition-colors"
          >
            Load Sample
          </button>
        </div>
        <textarea
          rows="12"
          className="w-full border-2 border-gray-300 p-4 rounded-lg font-mono text-sm focus:border-green-500 focus:outline-none transition-colors"
          placeholder="Paste JSON array of invoices here..."
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          disabled={loading}
        />
        <p className="text-xs text-gray-500 mt-2">
          JSON must be an array of invoice objects. Each invoice should have invoice_number, invoice_date, seller_name, buyer_name, currency, and totals.
        </p>
      </div>

      <button
        onClick={handleValidate}
        disabled={loading || !jsonText.trim()}
        className={`w-full font-semibold px-6 py-3 rounded-lg transition-all ${
          loading || !jsonText.trim()
            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
            : "bg-green-600 text-white hover:bg-green-700 active:scale-95"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Validating...
          </span>
        ) : (
          "Validate JSON"
        )}
      </button>
    </div>
  );
}

export default JsonInput;
