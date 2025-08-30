import { Link } from "react-router-dom";
import { Shield, Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react";
import logo from "../../public/e-kyc.png";

export default function Footer() {
  const year = new Date().getFullYear();

  // Navigation links
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  // Social links
  const socialLinks = [
    { href: "https://twitter.com", label: "Twitter", Icon: Twitter },
    { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
    { href: "https://github.com", label: "GitHub", Icon: Github },
  ];

  return (
    <footer className="mt-10 bg-white border-t border-gray-100">
      <div className="relative">
        {/* subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* === Brand Section === */}
            <div className="md:col-span-2">
               <Link to="/" className="flex items-center space-x-3 group">
                    <div className="p-2.5 rounded-xl">
                      <img
                        src={logo}
                        alt="e-KYC Logo"
                        className="h-10 object-contain"
                      />
                    </div>
                    {/* <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                      e-KYC
                    </span> */}
                  </Link>

              <p className="mt-2 max-w-md text-gray-600">
                Secure and seamless digital identity verification for modern financial platforms.
              </p>

              <div className="mt-3 flex items-center space-x-3">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="p-2 rounded-lg border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* === Navigation Section === */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 tracking-wide">Navigation</h4>
              <ul className="mt-2 space-y-2">
                {navLinks.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* === Contact Section === */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 tracking-wide">Contact</h4>
              <ul className="mt-2 space-y-2 text-gray-600">
                <li className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 mt-0.5 text-blue-600" />
                  <span>support@ekyc.example</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 mt-0.5 text-blue-600" />
                  <span>91-********</span>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 mt-0.5 text-blue-600" />
                  <span>Kathmandu, Nepal</span>
                </li>
              </ul>
            </div>
          </div>

          {/* === Bottom bar === */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-center text-center gap-2 md:gap-4 text-sm text-gray-500">
            <p>© {year} e-KYC. All rights reserved.</p>
            <div className="flex items-center space-x-5">
              <Link to="/privacy" className="hover:text-blue-600">Privacy</Link>
              <Link to="/terms" className="hover:text-blue-600">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
