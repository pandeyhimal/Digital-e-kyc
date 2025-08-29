import { useState } from "react";
import {
  Mail,
  Lock,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  Fingerprint,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Example API call (replace with real API)
      await new Promise((res) => setTimeout(res, 2000));
      console.log("Login Attempt:", formData);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const securityFeatures = [
    { icon: Shield, text: "256-bit Encryption", color: "text-green-600" },
    { icon: Fingerprint, text: "Biometric Security", color: "text-blue-600" },
    { icon: CheckCircle, text: "Zero-Knowledge Proof", color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 relative">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md mt-20">
        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 space-y-6"
        >
          {/* Logo / Title */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent">
              Decentralized e-KYC
            </h1>
            <p className="text-gray-600 text-sm">
              Secure Digital Identity Verification
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                size={20}
              />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-gray-50/50 hover:bg-white"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                size={20}
              />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-12 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-gray-50/50 hover:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition transform disabled:opacity-70"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Authenticating...</span>
              </div>
            ) : (
              "Sign In Securely"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Biometric Auth */}
          <button
            type="button"
            className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition flex items-center justify-center gap-2"
          >
            <Fingerprint size={20} />
            <span className="font-medium">Use Biometric Authentication</span>
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Create an Account
            </Link>
          </p>
        </form>

        {/* Security Features */}
        <div className="mt-6 bg-white/60 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 text-center">
            🔒 Protected by Enterprise Security
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {securityFeatures.map(({ icon: Icon, text, color }, idx) => (
              <div key={idx} className="text-center cursor-pointer">
                <Icon
                  className={`w-5 h-5 mx-auto mb-1 ${color} hover:scale-110 transition-transform`}
                />
                <p className="text-xs text-gray-600 hover:text-gray-800 transition">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-6 text-xs text-gray-500">
          <p>
            By signing in, you agree to our{" "}
            <Link to="/terms" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline">
              Privacy Policy
            </Link>
          </p>
          <p className="mt-1">© 2024 Decentralized e-KYC Platform</p>
        </footer>
      </div>
    </div>
  );
}
