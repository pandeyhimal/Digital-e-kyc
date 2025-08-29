import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Shield,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Fingerprint,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

// 🔹 Utility function to check password strength
const calculatePasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

// 🔹 Reusable Input Field
const InputField = ({ icon: Icon, type, placeholder, value, onChange, showToggle, toggleVisibility }) => (
  <div className="relative group">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full pl-10 pr-12 py-3.5 border border-gray-200 rounded-xl 
                 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
                 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white"
    />
    {showToggle && (
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        {type === "password" ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>
    )}
  </div>
);

export default function Registration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    // 🔹 API call simulation
    setTimeout(() => {
      console.log("✅ Registration Data:", formData);
      setIsLoading(false);
    }, 2000);
  };

  // UI helpers
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength === 3) return "bg-yellow-500";
    if (passwordStrength === 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength === 3) return "Fair";
    if (passwordStrength === 4) return "Good";
    return "Strong";
  };

  const securityFeatures = [
    { icon: Shield, text: "End-to-End Encryption", color: "text-green-600" },
    { icon: Fingerprint, text: "Biometric Ready", color: "text-blue-600" },
    { icon: UserCheck, text: "Identity Verified", color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto mt-24 w-full max-w-lg">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-indigo-800 bg-clip-text text-transparent">
              Create Your Account
            </h1>
            <p className="text-gray-600 text-sm">Join the secure e-KYC Network</p>
          </div>

          {/* Registration Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</label>
            <InputField
              icon={User}
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
            />

            {/* Email */}
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
            <InputField
              icon={Mail}
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />

            {/* Phone */}
            <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Phone Number</label>
            <InputField
              icon={Phone}
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />

            {/* Password */}
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <InputField
              icon={Lock}
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              showToggle
              toggleVisibility={() => setShowPassword(!showPassword)}
            />

            {/* Password Strength */}
            {formData.password && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Strength</span>
                  <span className={getPasswordStrengthColor().replace("bg", "text")}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all ${getPasswordStrengthColor()}`}
                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Confirm Password */}
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
            <InputField
              icon={Lock}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              showToggle
              toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            {/* Password Match Check */}
            {formData.confirmPassword &&
              (formData.password === formData.confirmPassword ? (
                <p className="text-xs text-green-500 flex items-center space-x-1">
                  <CheckCircle size={12} /> <span>Passwords match</span>
                </p>
              ) : (
                <p className="text-xs text-red-500 flex items-center space-x-1">
                  <AlertCircle size={12} /> <span>Passwords do not match</span>
                </p>
              ))}

            {/* Terms */}
            <label className="flex items-start space-x-3 pt-2">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded mt-1"
              />
              <span className="text-sm text-gray-600 leading-relaxed">
                I agree to the{" "}
                <span className="text-blue-600 underline">Terms</span> &{" "}
                <span className="text-blue-600 underline">Privacy Policy</span>.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !agreeToTerms}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-700 
                         text-white rounded-xl font-semibold shadow-lg hover:shadow-xl 
                         transition-all duration-300 disabled:opacity-70"
            >
              {isLoading ? "Creating Account..." : "Create Secure Account"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
    
      </div>
    </div>
  );
}
