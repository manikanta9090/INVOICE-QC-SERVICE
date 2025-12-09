import { useState } from "react";
import { extractAndValidate } from "../api/qcService";

function FileUpload({ setResults }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleUpload() {
    if (files.length === 0) {
      setError("Please select at least one PDF file");
      return;
    }
    
    setError(null);
    setLoading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    
    try {
      const response = await extractAndValidate(formData);
      setResults(response);
      setFiles([]);
    } catch (err) {
      setError("Failed to process files: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e) {
    const selectedFiles = Array.from(e.target.files);
    const pdfFiles = selectedFiles.filter(f => f.type === 'application/pdf');
    
    if (pdfFiles.length !== selectedFiles.length) {
      setError(`${selectedFiles.length - pdfFiles.length} non-PDF files were excluded`);
    } else {
      setError(null);
    }
    
    setFiles(pdfFiles);
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto my-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload Invoice PDFs</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p className="font-semibold">⚠️ {error}</p>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Select PDF Files</label>
        <div className="relative">
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
            className="w-full border-2 border-dashed border-blue-300 p-6 rounded-lg cursor-pointer hover:border-blue-500 transition-colors focus:outline-none focus:border-blue-600"
            disabled={loading}
          />
          <p className="text-sm text-gray-500 mt-2">You can select multiple PDF files</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-semibold text-blue-900">Selected Files ({files.length}):</p>
          <ul className="mt-2 space-y-1">
            {files.map((f, i) => (
              <li key={i} className="text-sm text-blue-800 flex items-center">
                <span className="mr-2">📄</span>
                {f.name} ({(f.size / 1024).toFixed(2)} KB)
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading || files.length === 0}
        className={`w-full font-semibold px-6 py-3 rounded-lg transition-all ${
          loading || files.length === 0
            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Upload & Validate"
        )}
      </button>
    </div>
  );
}

export default FileUpload;
