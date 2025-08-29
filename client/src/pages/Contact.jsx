import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertTriangle,
  FileText,
  CheckCircle,
} from "lucide-react";

/**
 * Contact page for a government-run Decentralized e-KYC platform.
 * Replace placeholder data (emails, phones, addresses, links) with real government values.
 */

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "general",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const departments = [
    { id: "general", label: "General Support" },
    { id: "technical", label: "Technical / Platform" },
    { id: "privacy", label: "Privacy & Data Protection" },
    { id: "legal", label: "Legal / Compliance" },
    { id: "verification", label: "Verification & Appeals" },
  ];

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic client validation
    if (!form.name || !form.email || !form.subject || !form.message) {
      alert("Please complete all required fields.");
      return;
    }

    setLoading(true);
    try {
      // Example POST - replace endpoint with your backend route
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", department: "general", subject: "", message: "" });
        alert("Your request has been received. A support officer will contact you shortly.");
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.message || "Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-24 min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Left: Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Contact & Support</h2>
            <p className="text-sm text-gray-600">
              For all enquiries related to the Decentralized Digital e-KYC platform,
              please use the channels below. Critical incidents are handled 24/7.
            </p>

            <ul className="mt-4 space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium">National Support Hotline</div>
                  <div className="text-gray-500">Toll-free: <span className="font-semibold">1660-XX-XXXX</span></div>
                  <div className="text-xs text-gray-400">Available 24/7 for critical incidents</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium">General Email</div>
                  <div className="text-gray-500">support@digital-kyc.gov.np</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium">Head Office</div>
                  <div className="text-gray-500">Kathmandu, Nepal — Government Digital Services Building</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium">Office Hours (non-critical)</div>
                  <div className="text-gray-500">Mon–Fri • 09:00 – 17:00 (NPT)</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Escalation / Security */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Security & Incident Reporting</h3>
            <p className="text-sm text-gray-600 mb-3">
              To report fraud, data breach or other security incidents, use the emergency hotline or the dedicated security email below.
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium">Security Hotline (24/7)</div>
                  <div className="text-gray-500">1660-SEC-911</div>
                </div>
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium">Security Email</div>
                  <div className="text-gray-500">security@digital-kyc.gov.np</div>
                </div>
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-400">
              When reporting incidents please include: date/time, affected identity (if known), summary of event, and any supporting evidence.
            </p>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-sm">
            <h3 className="font-semibold text-gray-800 mb-2">Privacy & Data Protection</h3>
            <p className="text-gray-600 mb-2">
              This platform complies with national data protection rules. Requests for data access, rectification, or deletion must be submitted to the Data Protection Office.
            </p>

            <div className="text-sm space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Data Access Requests: dpo@digital-kyc.gov.np</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Privacy Policy: <a href="/policy" className="text-blue-600 underline">View policy</a></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form + FAQs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-1">Submit a Support Request</h2>
            <p className="text-sm text-gray-600 mb-4">Select the department and provide details. Non-critical requests are processed within SLA 48–72 hours.</p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name *"
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address *"
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.label}</option>
                  ))}
                </select>

                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject *"
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="6"
                placeholder="Describe the issue in detail (steps to reproduce, screenshots, affected IDs, dates) *"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <div className="flex items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                  <div>Non-critical SLA: <span className="font-medium">48–72 hours</span></div>
                  <div>Critical incidents: <span className="font-medium">Immediate triage</span></div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow hover:bg-blue-700 disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>

          {/* FAQ / Quick Links */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-3">Quick Links & FAQs</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <a href="/policy" className="block p-3 rounded-lg border hover:shadow-sm">Privacy Policy & Procedures</a>
              <a href="/terms" className="block p-3 rounded-lg border hover:shadow-sm">Terms of Service</a>
              <a href="/appeal" className="block p-3 rounded-lg border hover:shadow-sm">Verification Appeals</a>
              <a href="/dpo-request" className="block p-3 rounded-lg border hover:shadow-sm">Data Access / DPO Requests</a>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <h4 className="font-medium mb-1">Escalation Matrix</h4>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Initial ticket created — routed to department (SLA 48–72h)</li>
                <li>If unresolved, escalate to Department Head (48 hours)</li>
                <li>Final escalation: National e-KYC Office (7 days)</li>
              </ol>
            </div>
          </div>

          {/* Report Security Incident CTA */}
          <div className="bg-gradient-to-r from-red-50 to-white rounded-2xl p-6 border border-red-100 flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-red-700">Report a Security Incident</h4>
              <p className="text-sm text-gray-700">If you suspect a data breach or fraudulent activity, call the security hotline immediately or send secure evidence to the security email.</p>
            </div>
            <div className="flex-shrink-0 space-x-3">
              <a href="tel:1660SEC911" className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Call Hotline</a>
              <a href="mailto:security@digital-kyc.gov.np" className="inline-block border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50">Email</a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="max-w-6xl mx-auto mt-8 text-center text-xs text-gray-400">
        <p>
          © {new Date().getFullYear()} Government Digital Services — Decentralized Digital e-KYC. All official channels listed above are government-managed. Never share OTPs, passwords, or private keys with anyone.
        </p>
      </div>
    </div>
  );
}
