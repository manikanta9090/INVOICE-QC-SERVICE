import { useState } from "react";
import FileUpload from "../components/FileUpload";
import ResultsTable from "../components/ResultsTable";

function UploadPage() {
  const [results, setResults] = useState(null);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center mb-2">Upload Invoice PDFs</h1>
        <p className="text-center text-gray-600">Upload PDF invoices for extraction and validation</p>
      </div>
      <FileUpload setResults={setResults} />
      {results && <ResultsTable results={results} />}
    </div>
  );
}

export default UploadPage;
