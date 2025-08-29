import { Link } from "react-router-dom";

export default function BankPortalRoot() {
  return (
    <div className="min-h-screen mt-24 bg-gray-50">
      <main className="container mx-auto px-6 py-12">
        <section className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900">Account Opening Requirements</h1>
          <p className="mt-2 text-gray-600 text-sm">Please prepare these documents and steps to open a new bank account:</p>
          <ul className="mt-4 space-y-2 list-disc pl-6 text-gray-800 text-sm">
            <li>Proof of identity: Citizenship, or National ID</li>
            <li>Recent passport-size photo</li>
            <li>PAN number (if applicable)</li>
            {/* <li>Initial deposit amount (based on chosen account type)</li> */}
            <li>Active mobile number for OTP and alerts</li>
            <li>Active email address for OTP and alerts</li>
          </ul>
          <div className="mt-6 flex justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}


