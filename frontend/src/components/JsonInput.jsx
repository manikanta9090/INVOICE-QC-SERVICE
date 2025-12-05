import { useState } from "react";
import { validateJSON } from "../api/qcService";

function JsonInput({ setResults }) {
  const [jsonText, setJsonText] = useState("");

  async function handleValidate() {
    try {
      const data = JSON.parse(jsonText);
      const response = await validateJSON(data);
      setResults(response);
    } catch (err) {
      alert("Invalid JSON format.");
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto my-6">
      <h2 className="text-xl font-bold mb-4">Validate JSON</h2>
      <textarea
        rows="10"
        className="w-full border p-3 rounded mb-4 font-mono"
        placeholder="Paste JSON here..."
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
      />
      <button
        onClick={handleValidate}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors w-full"
      >
        Validate JSON
      </button>
    </div>
  );
}

export default JsonInput;
