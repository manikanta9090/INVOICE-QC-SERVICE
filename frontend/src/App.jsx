import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import JsonPage from "./pages/JsonPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/json" element={<JsonPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
