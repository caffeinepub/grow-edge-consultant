import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronRight,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import EnquiryForm from "../components/EnquiryForm";
import PopupEnquiry from "../components/PopupEnquiry";

// Scroll animation hook for this page
function usePageScrollAnimations() {
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

// FAQ Accordion Item
function FAQItem({
  question,
  answer,
  idx,
}: { question: string; answer: string; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${
        open ? "shadow-brand" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-blue-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-sm text-gray-800 pr-4">
          <span className="text-brand-gold font-bold mr-2">Q{idx + 1}.</span>
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-brand-blue flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-48" : "max-h-0"
        }`}
      >
        <p className="px-5 py-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-blue-50/40">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  usePageScrollAnimations();

  useEffect(() => {
    document.title =
      "Grow Edge Consultant | Overseas Education & Job Placement";
    // Meta description
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Grow Edge Consultant — Your trusted partner for overseas education, study abroad, university admissions, IELTS coaching, and job placement in USA, Canada, UK, Australia.",
    );
  }, []);

  const services = [
    {
      icon: "🌍",
      title: "Overseas Job Placement",
      desc: "We connect skilled professionals with top employers across USA, Canada, UK, Dubai, and more.",
      hash: "#job-placement",
    },
    {
      icon: "🎓",
      title: "Study Abroad & University Admission",
      desc: "Expert guidance for UG/PG/Diploma admissions at 100+ top universities worldwide.",
      hash: "#study-abroad",
    },
    {
      icon: "📜",
      title: "Short-Term Courses & Certifications",
      desc: "Industry-recognized short courses to boost your skills and career prospects.",
      hash: "#short-term",
    },
    {
      icon: "📚",
      title: "IELTS & TOEFL Training",
      desc: "Certified coaching with mock tests to achieve your target band score.",
      hash: "#ielts",
    },
    {
      icon: "💻",
      title: "Learn Online Courses",
      desc: "Flexible online courses across IT, business, healthcare, and more with certification.",
      hash: "#online-courses",
    },
  ];

  const whyUs = [
    {
      icon: "👨‍💼",
      title: "Experienced Counsellors",
      desc: "10+ years of expertise in international education and job placement.",
    },
    {
      icon: "✅",
      title: "100% Transparency",
      desc: "No hidden fees, clear process, honest guidance at every step.",
    },
    {
      icon: "🛂",
      title: "Visa Guidance",
      desc: "End-to-end visa application support with a 95% success rate.",
    },
    {
      icon: "🌐",
      title: "Global University Network",
      desc: "Partnerships with 100+ universities across 15+ countries.",
    },
    {
      icon: "💼",
      title: "Placement Assistance",
      desc: "Dedicated job placement support with 5000+ successful placements.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Free Consultation",
      desc: "Meet our expert counsellors for a personalized assessment.",
    },
    {
      step: "02",
      title: "Profile Evaluation",
      desc: "Comprehensive review of your academic & professional profile.",
    },
    {
      step: "03",
      title: "Documentation Support",
      desc: "We help prepare all required documents meticulously.",
    },
    {
      step: "04",
      title: "Application Submission",
      desc: "We handle university or job applications on your behalf.",
    },
    {
      step: "05",
      title: "Visa Processing",
      desc: "Expert guidance through every step of the visa process.",
    },
    {
      step: "06",
      title: "Pre-Departure Guidance",
      desc: "Orientation and support before you start your journey.",
    },
  ];

  const countries = [
    { flag: "🇺🇸", name: "USA" },
    { flag: "🇨🇦", name: "Canada" },
    { flag: "🇬🇧", name: "UK" },
    { flag: "🇦🇺", name: "Australia" },
    { flag: "🇩🇪", name: "Germany" },
    { flag: "🇦🇪", name: "Dubai" },
    { flag: "🇳🇿", name: "New Zealand" },
    { flag: "🇸🇬", name: "Singapore" },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      service: "Study Abroad",
      quote:
        "Grow Edge made my dream of studying in Canada a reality. Their step-by-step guidance was invaluable.",
      initials: "PS",
    },
    {
      name: "Rahul Verma",
      service: "Overseas Job Placement",
      quote:
        "Got placed in a top IT firm in Dubai within 3 months. Highly professional team!",
      initials: "RV",
    },
    {
      name: "Anita Patel",
      service: "IELTS Training",
      quote:
        "Scored 8.0 in IELTS thanks to their certified trainers and intensive mock tests.",
      initials: "AP",
    },
  ];

  const faqs = [
    {
      q: "What documents are required for a student visa?",
      a: "Typically: valid passport, admission letter, financial proof, language test scores, SOP, and photographs. Requirements vary by country.",
    },
    {
      q: "How long does the university admission process take?",
      a: "Usually 3–6 months from application to receiving the offer letter, depending on the university and country.",
    },
    {
      q: "Can I apply for scholarships through Grow Edge?",
      a: "Yes! We assist with identifying and applying for merit and need-based scholarships at our partner universities.",
    },
    {
      q: "What is the minimum IELTS score for studying abroad?",
      a: "Most universities require 6.0–7.0 band score. We help you achieve your target score with our training programs.",
    },
    {
      q: "Do you provide post-landing support?",
      a: "Yes, we offer pre-departure orientation and connect you with our alumni network in your destination country.",
    },
    {
      q: "How does your overseas job placement work?",
      a: "We evaluate your profile, match you with suitable employers, assist with documentation, and guide you through the interview and visa process.",
    },
    {
      q: "Is TOEFL accepted instead of IELTS?",
      a: "Yes, most universities and countries accept both IELTS and TOEFL. We offer training for both.",
    },
    {
      q: "What are the fees for your consultancy services?",
      a: "Our counselling is completely free. Service fees vary depending on the specific program. Contact us for a detailed breakdown.",
    },
  ];

  const blogs = [
    {
      img: "/assets/generated/blog-study-abroad.dim_800x500.jpg",
      title: "Top 10 Universities in Canada for International Students 2025",
      date: "March 15, 2025",
      excerpt:
        "Canada remains one of the top destinations for international students. Discover the best universities...",
    },
    {
      img: "/assets/generated/blog-job-placement.dim_800x500.jpg",
      title: "How to Land a Job Abroad: Complete Guide for 2025",
      date: "March 8, 2025",
      excerpt:
        "Getting a job overseas requires strategic planning. Here's your complete step-by-step guide...",
    },
    {
      img: "/assets/generated/blog-ielts-prep.dim_800x500.jpg",
      title: "IELTS vs TOEFL: Which Test Should You Choose?",
      date: "February 28, 2025",
      excerpt:
        "Both IELTS and TOEFL are accepted worldwide, but choosing the right test can make a difference...",
    },
  ];

  return (
    <>
      <PopupEnquiry />

      {/* ─── HERO ─── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-banner.dim_1600x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container mx-auto px-4 text-center pt-24 pb-16">
          <div className="inline-flex items-center gap-2 bg-brand-gold/20 backdrop-blur-sm border border-brand-gold/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
            <span className="text-brand-gold text-xs font-semibold tracking-wide">
              Trusted by 5,000+ Students & Professionals
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-4 max-w-4xl mx-auto">
            Build Your Global Career &{" "}
            <span className="text-brand-gold">Education Abroad</span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto font-medium">
            Overseas Jobs • University Admissions • IELTS & TOEFL Coaching
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 bg-brand-gold text-brand-blue font-bold text-base rounded-xl hover:bg-brand-gold-dark transition-all shadow-gold hover:shadow-lg hover:-translate-y-0.5"
            >
              Apply Now →
            </Link>
            <a
              href="#enquiry"
              className="px-8 py-4 border-2 border-white text-white font-bold text-base rounded-xl hover:bg-white hover:text-brand-blue transition-all"
            >
              Free Counselling
            </a>
          </div>
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-white/60" />
          </div>
        </div>
      </section>

      {/* ─── ABOUT OVERVIEW ─── */}
      <section className="section-pad bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-left">
              <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">
                About Us
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-brand-blue mb-5 leading-tight">
                About Grow Edge Consultant
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Grow Edge Consultant is a leading overseas education and job
                placement agency with over 10 years of experience helping
                students and professionals achieve their international
                ambitions. We provide end-to-end guidance from counselling to
                visa processing and pre-departure support.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm hover:gap-3 transition-all"
              >
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="fade-in-right grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-brand-blue rounded-2xl p-6 text-white">
                <div className="w-10 h-10 bg-brand-gold rounded-lg flex items-center justify-center mb-4 text-xl">
                  🎯
                </div>
                <h3 className="text-brand-gold font-bold text-lg mb-2">
                  Our Mission
                </h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  To provide transparent, affordable, and expert guidance to
                  students and professionals seeking international education and
                  employment opportunities.
                </p>
              </div>
              <div className="bg-gradient-to-br from-brand-gold to-brand-gold-dark rounded-2xl p-6 text-brand-blue sm:mt-8">
                <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center mb-4 text-xl">
                  🚀
                </div>
                <h3 className="font-bold text-lg mb-2">Our Vision</h3>
                <p className="text-brand-blue/80 text-sm leading-relaxed">
                  To be India's most trusted global education and career
                  consultancy, empowering 50,000+ individuals to thrive
                  internationally by 2030.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ENQUIRY FORM ─── */}
      <section id="enquiry" className="section-pad bg-brand-blue">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 fade-in-section">
              <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-2">
                Free Consultation
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                Get Free Counselling
              </h2>
              <p className="text-blue-200 text-sm">
                Fill in your details and our expert counsellor will reach out
                within 24 hours.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-8 fade-in-section stagger-2">
              <EnquiryForm dark />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="section-pad bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-in-section">
            <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-2">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-brand-blue mb-3">
              Our Core Services
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Comprehensive guidance for every step of your international
              journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={s.title}
                className={`fade-in-section stagger-${Math.min(i + 1, 5)} bg-white rounded-2xl p-6 shadow-xs card-hover border border-gray-100`}
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-brand-blue font-bold text-base mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {s.desc}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 text-brand-blue font-semibold text-xs hover:gap-2 transition-all"
                >
                  Learn More <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="section-pad bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-in-section">
            <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-2">
              Our Strengths
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-brand-blue mb-3">
              Why Choose Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyUs.map((item, i) => (
              <div
                key={item.title}
                className={`fade-in-section stagger-${Math.min(i + 1, 5)} text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 card-hover`}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-brand-blue font-bold text-sm mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6-STEP PROCESS ─── */}
      <section className="section-pad bg-brand-blue overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-in-section">
            <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-2">
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Our Simple 6-Step Process
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div
                key={s.step}
                className={`fade-in-section stagger-${Math.min(i + 1, 5)} relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 group hover:bg-white/20 transition-all`}
              >
                <div className="w-12 h-12 bg-brand-gold rounded-xl flex items-center justify-center text-brand-blue font-black text-lg mb-4 shadow-gold">
                  {s.step}
                </div>
                <h3 className="text-white font-bold text-base mb-2">
                  {s.title}
                </h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COUNTRIES ─── */}
      <section className="section-pad bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-in-section">
            <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-2">
              Our Reach
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-brand-blue mb-3">
              Countries We Serve
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {countries.map((c, i) => (
              <div
                key={c.name}
                className={`fade-in-section stagger-${Math.min(i + 1, 5)} flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 card-hover cursor-pointer`}
              >
                <span className="text-4xl">{c.flag}</span>
                <span className="text-brand-blue font-semibold text-xs text-center">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section-pad bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-in-section">
            <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-2">
              Student Stories
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-brand-blue mb-3">
              What Our Students Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`fade-in-section stagger-${i + 1} bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6 card-hover`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {["s1", "s2", "s3", "s4", "s5"].map((sk) => (
                    <Star
                      key={sk}
                      className="w-4 h-4 fill-brand-gold text-brand-gold"
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-brand-blue font-bold text-sm">
                      {t.name}
                    </p>
                    <p className="text-gray-500 text-xs">{t.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST BADGES ─── */}
      <section className="py-12 bg-brand-blue">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {[
              { icon: "🏆", label: "ISO Certified", sub: "Quality Assured" },
              { icon: "📅", label: "10+ Years", sub: "Experience" },
              { icon: "👥", label: "5000+", sub: "Placements" },
              { icon: "🏛️", label: "100+", sub: "Universities" },
              { icon: "✈️", label: "95%", sub: "Visa Success Rate" },
            ].map((badge, i) => (
              <div
                key={badge.label}
                className={`fade-in-section stagger-${i + 1}`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <p className="text-brand-gold font-black text-xl leading-none">
                  {badge.label}
                </p>
                <p className="text-blue-200 text-xs mt-1">{badge.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section-pad bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12 fade-in-section">
            <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-2">
              Have Questions?
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-brand-blue mb-3">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: FAQ items are static, no reordering
              <FAQItem key={i} question={faq.q} answer={faq.a} idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOG ─── */}
      <section className="section-pad bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-in-section">
            <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-2">
              Resources
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-brand-blue mb-3">
              Latest Insights
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((blog, i) => (
              <article
                key={blog.title}
                className={`fade-in-section stagger-${i + 1} bg-white border border-gray-100 rounded-2xl overflow-hidden card-hover shadow-xs`}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {blog.date}
                  </div>
                  <h3 className="text-brand-blue font-bold text-sm leading-snug mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-brand-gold font-semibold text-xs hover:gap-2 transition-all"
                  >
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="py-20 bg-gradient-to-r from-brand-blue-dark via-brand-blue to-brand-blue-light text-center">
        <div className="container mx-auto px-4 fade-in-section">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            Start Your International Journey{" "}
            <span className="text-brand-gold">Today</span>
          </h2>
          <p className="text-blue-200 text-base max-w-xl mx-auto mb-8">
            Join thousands of students and professionals who have achieved their
            global ambitions with Grow Edge Consultant.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 bg-brand-gold text-brand-blue font-bold rounded-xl hover:bg-brand-gold-dark transition-all shadow-gold"
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-brand-blue transition-all"
            >
              Book a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
