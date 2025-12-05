import { useState } from "react";
import JsonInput from "../components/JsonInput.jsx";
import ResultsTable from "../components/ResultsTable.jsx";

function JsonPage() {
  const [results, setResults] = useState(null);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center">Validate JSON</h1>
      <JsonInput setResults={setResults} />
      <ResultsTable results={results} />
    </div>
  );
}

export default JsonPage;
