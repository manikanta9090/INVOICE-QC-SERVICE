import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Invoice QC Console</h1>
      <div className="space-x-4">
        <Link
          to="/upload"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Upload PDFs
        </Link>
        <Link
          to="/json"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Validate JSON
        </Link>
      </div>
    </div>
  );
}

export default Home;
