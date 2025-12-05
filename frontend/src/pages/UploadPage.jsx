import { useState } from "react";
import FileUpload from "../components/FileUpload";
import ResultsTable from "../components/ResultsTable";

function UploadPage() {
  const [results, setResults] = useState(null);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Upload PDFs</h1>
      <FileUpload setResults={setResults} />
      <ResultsTable results={results} />
    </div>
  );
}

export default UploadPage;
