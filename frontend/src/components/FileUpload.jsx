import { useState } from "react";
import { extractAndValidate } from "../api/qcService";

function FileUpload({ setResults }) {
  const [files, setFiles] = useState([]);

  async function handleUpload() {
    if (files.length === 0) return alert("Select PDF files first!");
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    try {
      const response = await extractAndValidate(formData);
      setResults(response);
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto my-6">
      <h2 className="text-xl font-bold mb-4">Upload Invoice PDFs</h2>
      <input
        type="file"
        accept="application/pdf"
        multiple
        className="border p-2 rounded w-full mb-4"
        onChange={(e) => setFiles([...e.target.files])}
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full"
      >
        Upload & Validate
      </button>
    </div>
  );
}

export default FileUpload;
