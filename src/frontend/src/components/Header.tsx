import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const services = [
  { label: "Overseas Job Placement", hash: "#job-placement" },
  { label: "Study Abroad & University Admission", hash: "#study-abroad" },
  { label: "Short-Term Courses & Certifications", hash: "#short-term" },
  { label: "IELTS & TOEFL Training", hash: "#ielts" },
  { label: "Learn Online Courses", hash: "#online-courses" },
];

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  const routerState = useRouterState();
  const isActive =
    routerState.location.pathname === to ||
    (to !== "/" && routerState.location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors hover:text-brand-blue ${
        isActive
          ? "text-brand-blue border-b-2 border-brand-gold pb-0.5"
          : "text-gray-700"
      }`}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const routerState = useRouterState();
  const navigate = useNavigate();
  const pathname = routerState.location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional - reset on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleServiceClick = (hash: string) => {
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate({ to: "/services" });
    setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const isServicesActive = pathname === "/services";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-brand py-2"
          : "bg-white/95 backdrop-blur-sm py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-brand-blue rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue-light transition-colors">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <span className="block text-brand-blue font-bold text-sm sm:text-base leading-none">
                Grow Edge
              </span>
              <span className="block text-brand-gold font-semibold text-[10px] sm:text-xs tracking-wide leading-none">
                CONSULTANT
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/about">About Us</NavItem>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((v) => !v)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-brand-blue ${
                  isServicesActive
                    ? "text-brand-blue border-b-2 border-brand-gold pb-0.5"
                    : "text-gray-700"
                }`}
              >
                Our Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-xl shadow-brand border border-gray-100 py-2 z-50 dropdown-enter">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45" />
                  {services.map((s) => (
                    <button
                      type="button"
                      key={s.hash}
                      onClick={() => handleServiceClick(s.hash)}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-brand-blue transition-colors"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <NavItem to="/contact">Contact Us</NavItem>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="px-4 py-2 bg-brand-gold text-brand-blue font-semibold text-sm rounded-lg hover:bg-brand-gold-dark transition-colors shadow-gold"
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 border-2 border-brand-blue text-brand-blue font-semibold text-sm rounded-lg hover:bg-brand-blue hover:text-white transition-colors"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg text-brand-blue hover:bg-blue-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-2">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About Us" },
            { to: "/contact", label: "Contact Us" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === to
                  ? "bg-blue-50 text-brand-blue"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Mobile Services */}
          <div>
            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Our Services
              <ChevronDown
                className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileServicesOpen && (
              <div className="ml-3 mt-1 border-l-2 border-brand-gold pl-3 space-y-1">
                {services.map((s) => (
                  <button
                    type="button"
                    key={s.hash}
                    onClick={() => handleServiceClick(s.hash)}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-brand-blue transition-colors"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Link
              to="/contact"
              className="flex-1 text-center py-2.5 bg-brand-gold text-brand-blue font-semibold text-sm rounded-lg"
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="flex-1 text-center py-2.5 border-2 border-brand-blue text-brand-blue font-semibold text-sm rounded-lg"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
