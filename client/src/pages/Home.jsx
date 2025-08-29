import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="mx-auto mt-24 min-h-screen flex flex-col justify-center items-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-blue-700 mb-6">
          Decentralized Digital e-KYC
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Building a <span className="font-semibold">paperless, secure, and transparent</span> ecosystem for Digital Nepal, powered by <strong>Blockchain Technology</strong>.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/about"
            className="px-6 py-3 bg-blue-700 text-white rounded-lg shadow-lg hover:bg-blue-800 transition"
          >
            Learn More
          </a>
          <a
            href="/contact"
            className="px-6 py-3 bg-white border border-blue-700 text-blue-700 rounded-lg shadow-lg hover:bg-blue-50 transition"
          >
            Get in Touch
          </a>
        </div>
      </motion.div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="mt-16 max-w-5xl grid md:grid-cols-3 gap-8"
      >
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Paperless Governance</h3>
          <p className="text-gray-600">
            Eliminate physical paperwork and create a seamless <strong>digital identity system</strong> for every citizen.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Blockchain Security</h3>
          <p className="text-gray-600">
            Ensuring trust, transparency, and tamper-proof <strong>KYC validation</strong> through decentralized blockchain technology.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Digital Nepal Vision</h3>
          <p className="text-gray-600">
            Supporting Nepal’s mission of <strong>digital transformation</strong> by integrating e-KYC across all sectors.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
