import { useState } from "react";
import { Menu, X, Shield, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [language, setLanguage] = useState("en"); // Local language state
  const location = useLocation();

  const navLinks = [
    { to: "/", label: language === "en" ? "Home" : "गृहपृष्ठ" },
    { to: "/about", label: language === "en" ? "About" : "हाम्रोबारे" },
    { to: "/contact", label: language === "en" ? "Contact" : "सम्पर्क" },
  ];

  const linkClass = (path) =>
    `relative px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 group ${
      location.pathname === path
        ? "text-blue-600 bg-blue-50/80 shadow-sm"
        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50/80"
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100/50">
      <div className="container mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="p-2.5 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
            <Shield className="h-6 w-6 text-white drop-shadow-sm" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            e-KYC
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass(link.to)}>
              {link.label}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full"></div>
            </Link>
          ))}

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-gray-50/80 hover:bg-gray-100/80 border border-gray-200/60 text-gray-700 font-medium text-sm transition-all duration-300 hover:shadow-md group"
            >
              <span className="text-base">{language === "en" ? "🇳🇵" : "🇬🇧"}</span>
              <span>{language === "en" ? "नेपाली" : "English"}</span>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${langDropdownOpen ? "rotate-180" : "group-hover:rotate-12"}`}
              />
            </button>

            {langDropdownOpen && (
              <>
                <div className="absolute right-0 top-full mt-2 w-44 bg-white/95 backdrop-blur-xl rounded-lg shadow-xl border border-gray-200/50 py-2 z-20">
                  <button
                    className={`w-full px-4 py-2.5 text-left flex items-center space-x-3 hover:bg-gray-50/80 ${
                      language === "en" ? "text-blue-600 bg-blue-50/80" : "text-gray-700"
                    }`}
                    onClick={() => {
                      setLanguage("en");
                      setLangDropdownOpen(false);
                    }}
                  >
                    <span>🇬🇧</span>
                    <span>English</span>
                  </button>
                  <button
                    className={`w-full px-4 py-2.5 text-left flex items-center space-x-3 hover:bg-gray-50/80 ${
                      language === "np" ? "text-blue-600 bg-blue-50/80" : "text-gray-700"
                    }`}
                    onClick={() => {
                      setLanguage("np");
                      setLangDropdownOpen(false);
                    }}
                  >
                    <span>🇳🇵</span>
                    <span>नेपाली</span>
                  </button>
                </div>
                <div className="fixed inset-0 z-10" onClick={() => setLangDropdownOpen(false)}></div>
              </>
            )}
          </div>

          {/* CTA */}
          <div className="flex items-center space-x-4 ml-4">
            <Link
              to="/login"
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
            >
              {language === "en" ? "Login" : "लगइन"}
            </Link>
            <Link
              to="/register"
              className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
            >
              {language === "en" ? "Register" : "दर्ता"}
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          className="md:hidden p-2.5 rounded-lg text-gray-700 hover:bg-gray-100/80 hover:text-gray-900 transition-all transform hover:scale-105 active:scale-95"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100/50 px-6 py-6 shadow-lg">
          <div className="space-y-1 mb-6">
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3.5 rounded-lg font-medium transition-all duration-300 ${
                  location.pathname === link.to
                    ? "text-blue-600 bg-blue-50/80 border-l-4 border-blue-600 shadow-sm"
                    : "text-gray-700 hover:bg-gray-50/80 hover:text-blue-600"
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile CTA */}
          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="block text-center px-6 py-3.5 mb-6 rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            {language === "en" ? "Register" : "दर्ता"}
          </Link>

          {/* Mobile Language */}
          <div className="pt-4 border-t border-gray-100/60">
            <p className="text-sm font-semibold text-gray-600 mb-3 flex items-center">
              🌐 Language / भाषा
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { code: "en", flag: "🇬🇧", label: "English" },
                { code: "np", flag: "🇳🇵", label: "नेपाली" },
              ].map(({ code, flag, label }) => (
                <button
                  key={code}
                  className={`px-4 py-3 rounded-lg font-medium text-sm flex items-center justify-center space-x-2 transition-all duration-300 ${
                    language === code
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                      : "bg-gray-100/80 text-gray-700 hover:bg-gray-200/80"
                  }`}
                  onClick={() => setLanguage(code)}
                >
                  <span className="text-base">{flag}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
