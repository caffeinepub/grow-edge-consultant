import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useEffect } from "react";
import EnquiryForm from "../components/EnquiryForm";

function useScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    const elements = document.querySelectorAll(
      ".fade-in-section, .fade-in-left, .fade-in-right",
    );
    for (const el of elements) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

export default function Contact() {
  useScrollAnimations();

  useEffect(() => {
    document.title = "Contact Us | Grow Edge Consultant";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Contact Grow Edge Consultant for overseas education and job placement guidance. Visit our Mumbai office or reach us online.",
    );
    window.scrollTo(0, 0);
  }, []);

  const contactInfo = [
    {
      icon: MapPin,
      label: "Office Address",
      value: "123 Global Tower, Education District, Mumbai - 400001, India",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7982481458",
    },
    {
      icon: Mail,
      label: "Email",
      value: "growedgeconsultant@gmail.com",
    },
    {
      icon: Clock,
      label: "Office Hours",
      value: "Mon–Sat, 9:00 AM – 6:00 PM",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <nav className="flex items-center gap-2 text-blue-300 text-sm mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-gold">Contact Us</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Contact Us
          </h1>
          <p className="text-blue-200 text-base max-w-xl">
            We're here to help you take the next step toward your global dreams.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-pad bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="fade-in-left">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-brand border border-gray-100">
                <h2 className="text-2xl font-black text-brand-blue mb-1">
                  Send Us a Message
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Our team will respond within 24 hours.
                </p>
                <EnquiryForm />
              </div>
            </div>

            {/* Info + Map */}
            <div className="fade-in-right space-y-6">
              {/* Contact Info Cards */}
              <div className="bg-brand-blue rounded-3xl p-6 md:p-8">
                <h2 className="text-xl font-black text-white mb-6">
                  Office Information
                </h2>
                <div className="space-y-5">
                  {contactInfo.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-brand-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-brand-gold" />
                      </div>
                      <div>
                        <p className="text-blue-300 text-xs font-semibold uppercase tracking-wide mb-0.5">
                          {label}
                        </p>
                        <p className="text-white text-sm">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-xs">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160989!2d72.74110084!3d19.0822507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C+Maharashtra!5e0!3m2!1sen!2sin!4v1516776432501"
                  width="100%"
                  height="280"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Grow Edge Consultant Office Location"
                />
              </div>

              {/* WhatsApp Quick Contact */}
              <a
                href="https://wa.me/917982481458"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl px-6 py-4 transition-colors shadow-lg"
              >
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-6 h-6"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <title>WhatsApp</title>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sm">Chat on WhatsApp</p>
                  <p className="text-green-100 text-xs">
                    Quick response guaranteed
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
