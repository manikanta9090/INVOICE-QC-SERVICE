import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="text-center max-w-2xl px-4">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Invoice QC Console
          </h1>
          <p className="text-xl text-gray-600">
            Professional invoice quality control and validation platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/upload"
            className="group relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="p-8 relative">
              <div className="text-4xl mb-3">📄</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload PDFs</h2>
              <p className="text-gray-600 text-sm mb-4">
                Extract and validate invoices from PDF files automatically
              </p>
              <span className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold group-hover:bg-blue-700 transition-colors">
                Get Started →
              </span>
            </div>
          </Link>

          <Link
            to="/json"
            className="group relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="p-8 relative">
              <div className="text-4xl mb-3">{ }</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Validate JSON</h2>
              <p className="text-gray-600 text-sm mb-4">
                Validate invoice data in JSON format with comprehensive checks
              </p>
              <span className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-semibold group-hover:bg-green-700 transition-colors">
                Get Started →
              </span>
            </div>
          </Link>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
          <h3 className="font-bold text-gray-900 mb-3">✨ Features</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ Extract invoice details from PDF files</li>
            <li>✓ Validate against business rules and data formats</li>
            <li>✓ Detect duplicate and anomalous invoices</li>
            <li>✓ Generate comprehensive validation reports</li>
            <li>✓ Support for multiple currencies and date formats</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
