import React, { useState } from "react";
import { XCircle, Upload } from "lucide-react";

export default function AdditionalDocuments() {
  const [documents, setDocuments] = useState([]);
  const [docType, setDocType] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && docType) {
      setDocuments([...documents, { type: docType, file }]);
      setDocType("");
      e.target.value = "";
    } else {
      alert("⚠️ Please select a document type before uploading!");
    }
  };

  const handleRemove = (index) => {
    setDocuments((prevDocs) => prevDocs.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Upload className="w-5 h-5 text-blue-600" /> Upload Additional Documents
      </h2>

      {/* Dropdown for document type */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Document Type
      </label>
      <select
        value={docType}
        onChange={(e) => setDocType(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">-- Choose Document --</option>
        <option value="Citizenship">Citizenship</option>
        <option value="PAN">PAN</option>
        <option value="Driving License">Driving License</option>
        <option value="Certificate">Certificate</option>
      </select>

      {/* File upload */}
      <div className="flex items-center justify-center w-full mb-6">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-6 h-6 text-gray-500 mb-2" />
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-blue-600">Click to upload</span> or drag & drop
            </p>
            <p className="text-xs text-gray-500">PDF, PNG, JPG (max. 5MB)</p>
          </div>
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>
      </div>

      {/* Uploaded list */}
      {documents.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Uploaded Documents</h3>
          <ul className="space-y-3">
            {documents.map((doc, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200 hover:shadow-md transition"
              >
                <span className="text-sm text-gray-800">
                  <strong className="text-gray-900">{doc.type}</strong> — {doc.file.name}
                </span>
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-500 hover:text-red-700 transition flex items-center gap-1"
                >
                  <XCircle className="w-4 h-4" /> Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
