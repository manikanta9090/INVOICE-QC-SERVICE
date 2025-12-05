function ResultsTable({ results }) {
  if (!results) return null;

  return (
    <div className="max-w-5xl mx-auto my-6 p-6 bg-white rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-4">Summary</h3>
      <pre className="bg-gray-100 p-4 rounded mb-6">{JSON.stringify(results.summary, null, 2)}</pre>

      <h3 className="text-xl font-bold mb-4">Invoices</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Invoice ID</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Errors</th>
            </tr>
          </thead>
          <tbody>
            {results.invoices.map((inv, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{inv.invoice_id}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-2 py-1 rounded-full text-white font-bold ${
                      inv.is_valid ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {inv.is_valid ? "Valid" : "Invalid"}
                  </span>
                </td>
                <td className="px-4 py-2 border">{inv.errors.join(", ") || "None"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultsTable;
