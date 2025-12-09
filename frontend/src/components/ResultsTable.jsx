function ResultsTable({ results }) {
  if (!results) return null;

  const summary = results.summary || {};
  const invoices = results.results || results.invoices || [];

  return (
    <div className="max-w-6xl mx-auto my-8 space-y-6">
      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <p className="text-sm text-gray-600">Total Invoices</p>
          <p className="text-3xl font-bold text-blue-600">{summary.total_invoices || 0}</p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
          <p className="text-sm text-gray-600">Valid</p>
          <p className="text-3xl font-bold text-green-600">{summary.valid_invoices || 0}</p>
        </div>
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <p className="text-sm text-gray-600">Invalid</p>
          <p className="text-3xl font-bold text-red-600">{summary.invalid_invoices || 0}</p>
        </div>
      </div>

      {/* Error Counts */}
      {summary.error_counts && Object.keys(summary.error_counts).length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Error Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(summary.error_counts).map(([error, count]) => (
              <div key={error} className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                <p className="text-xs text-gray-600">{error}</p>
                <p className="text-lg font-bold text-orange-600">{count}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Table */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Invoice Results</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Invoice ID</th>
                <th className="px-6 py-3 text-center font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Errors</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    No results available
                  </td>
                </tr>
              ) : (
                invoices.map((inv, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {inv.invoice_id || inv.invoice_number || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          inv.is_valid
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {inv.is_valid ? "✓ Valid" : "✗ Invalid"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {inv.errors && inv.errors.length > 0 ? (
                        <ul className="space-y-1">
                          {inv.errors.map((err, j) => (
                            <li key={j} className="text-red-700 bg-red-50 px-2 py-1 rounded text-xs">
                              • {err}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-500">No errors</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Raw JSON Debug */}
      <details className="bg-gray-900 text-gray-100 p-6 rounded-xl border border-gray-700">
        <summary className="cursor-pointer font-semibold hover:text-white">📋 View Raw Response (Debug)</summary>
        <pre className="mt-4 overflow-auto bg-black p-4 rounded text-xs">{JSON.stringify(results, null, 2)}</pre>
      </details>
    </div>
  );
}

export default ResultsTable;
