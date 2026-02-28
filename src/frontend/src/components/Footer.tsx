import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

export default function Footer() {
  const { actor } = useActor();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!actor) {
      toast.error("Service unavailable. Please try again.");
      return;
    }
    setLoading(true);
    try {
      await actor.addSubscriber(email);
      toast.success("Subscribed successfully! Welcome to Grow Edge.");
      setEmail("");
    } catch {
      toast.error("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue text-white">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-gold rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-brand-blue" />
              </div>
              <div>
                <span className="block text-white font-bold text-base leading-none">
                  Grow Edge
                </span>
                <span className="block text-brand-gold font-semibold text-xs tracking-wide">
                  CONSULTANT
                </span>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Your trusted partner for overseas education and career growth. We
              guide you every step of the way.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Youtube, label: "YouTube" },
                { icon: Twitter, label: "Twitter" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="https://growedge.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-gold hover:text-brand-blue transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-brand-gold font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Contact Us", to: "/contact" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-blue-200 text-sm hover:text-brand-gold transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-brand-gold font-semibold text-sm uppercase tracking-wider mb-5">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Overseas Job Placement", to: "/services" },
                { label: "Study Abroad", to: "/services" },
                { label: "Short-Term Courses", to: "/services" },
                { label: "IELTS & TOEFL", to: "/services" },
                { label: "Online Courses", to: "/services" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-blue-200 text-sm hover:text-brand-gold transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-5">
            <div>
              <h4 className="text-brand-gold font-semibold text-sm uppercase tracking-wider mb-4">
                Contact Info
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5 text-blue-200 text-sm">
                  <MapPin className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
                  <span>
                    E74/2, 1, Mathura Rd, Block E, Mohan Cooperative Industrial
                    Estate, Badarpur, New Delhi, Delhi 110044
                  </span>
                </li>
                <li className="flex items-center gap-2.5 text-blue-200 text-sm">
                  <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>+91 7982481458</span>
                </li>
                <li className="flex items-center gap-2.5 text-blue-200 text-sm">
                  <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>growedgeconsultant@gmail.com</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-brand-gold font-semibold text-sm uppercase tracking-wider mb-3">
                Newsletter
              </h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-blue-300 focus:outline-none focus:border-brand-gold transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-brand-gold text-brand-blue font-semibold text-sm rounded-lg hover:bg-brand-gold-dark transition-colors disabled:opacity-60"
                >
                  {loading ? "..." : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-300">
          <div className="flex items-center gap-3">
            <a
              href="https://growedge.in/privacy"
              className="hover:text-brand-gold transition-colors"
            >
              Privacy Policy
            </a>
            <span>|</span>
            <a
              href="https://growedge.in/terms"
              className="hover:text-brand-gold transition-colors"
            >
              Terms & Conditions
            </a>
          </div>
          <p>
            Copyright © {currentYear} Grow Edge Consultant. All rights reserved.
          </p>
          <p>
            Built with <span className="text-brand-gold">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
