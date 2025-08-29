import React from "react";

export default function About() {
  return (
    <section className="mx-auto mt-24 min-h-screen bg-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-blue-700 mb-8 text-center">
          About Our Digital e-KYC Project
        </h2>
        
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The <strong>Decentralized Digital e-KYC Project</strong> is an initiative under the 
          <span className="text-blue-700 font-semibold"> Digital Nepal Framework</span>. 
          It focuses on creating a secure, transparent, and fully paperless system for citizen identification and verification.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div className="p-6 bg-blue-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Why Blockchain?</h3>
            <p className="text-gray-600">
              Blockchain ensures data integrity by preventing unauthorized access or tampering. 
              Every KYC record is <strong>immutable and auditable</strong>.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">For Citizens</h3>
            <p className="text-gray-600">
              Citizens can manage their digital identity securely, 
              avoiding repetitive paper-based verification processes for banking, telecom, and government services.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">For Government</h3>
            <p className="text-gray-600">
              A unified digital KYC platform will reduce fraud, save time, 
              and provide <strong>real-time verification</strong> for government services and financial institutions.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Digital Nepal Vision</h3>
            <p className="text-gray-600">
              This project directly contributes to the <strong>Digital Nepal Framework</strong> by promoting 
              innovation, efficiency, and paperless governance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
