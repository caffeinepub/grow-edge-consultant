import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

const TABS = [
  { id: "job-placement", label: "Job Placement", emoji: "🌍" },
  { id: "study-abroad", label: "Study Abroad", emoji: "🎓" },
  { id: "short-term", label: "Short-Term", emoji: "📜" },
  { id: "ielts", label: "IELTS & TOEFL", emoji: "📚" },
  { id: "online-courses", label: "Online Courses", emoji: "💻" },
];

export default function Services() {
  const routerState = useRouterState();
  const [activeTab, setActiveTab] = useState("job-placement");
  const tabBarRef = useRef<HTMLDivElement>(null);

  useScrollAnimations();

  useEffect(() => {
    document.title = "Our Services | Grow Edge Consultant";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Explore Grow Edge Consultant services: overseas job placement, study abroad admissions, IELTS training, short-term courses, and online learning.",
    );
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const hash = routerState.location.hash.replace("#", "");
    if (hash && TABS.find((t) => t.id === hash)) {
      setActiveTab(hash);
      setTimeout(() => {
        const el = document.getElementById("services-content");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [routerState.location.hash]);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setTimeout(() => {
      const el = document.getElementById("services-content");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

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
            <span className="text-brand-gold">Our Services</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Our Services
          </h1>
          <p className="text-blue-200 text-base max-w-xl">
            Comprehensive solutions for your international education and career
            goals.
          </p>
        </div>
      </section>

      {/* Sticky Tab Bar */}
      <div
        ref={tabBarRef}
        className="sticky top-[60px] z-40 bg-white border-b border-gray-200 shadow-xs"
      >
        <div className="container mx-auto px-4">
          <div
            className="flex overflow-x-auto scrollbar-hide gap-0"
            style={{ scrollbarWidth: "none" }}
          >
            {TABS.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-4 text-sm font-semibold border-b-2 transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-brand-gold text-brand-blue"
                    : "border-transparent text-gray-500 hover:text-brand-blue hover:border-gray-300"
                }`}
              >
                <span>{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div id="services-content" className="bg-gray-50 min-h-screen">
        {activeTab === "job-placement" && <JobPlacement />}
        {activeTab === "study-abroad" && <StudyAbroad />}
        {activeTab === "short-term" && <ShortTermCourses />}
        {activeTab === "ielts" && <IELTSTraining />}
        {activeTab === "online-courses" && <OnlineCourses />}
      </div>
    </>
  );
}

/* ── Job Placement ── */
function JobPlacement() {
  const industries = [
    "IT & Technology",
    "Healthcare & Nursing",
    "Engineering & Construction",
    "Hospitality & Tourism",
    "Finance & Accounting",
    "Retail & Sales",
  ];
  const countries = [
    "USA",
    "Canada",
    "UK",
    "Australia",
    "Germany",
    "Dubai",
    "New Zealand",
    "Singapore",
  ];
  const steps = [
    "Register with Grow Edge",
    "Profile Evaluation",
    "Job Matching",
    "Interview Preparation",
    "Documentation Support",
    "Visa Processing",
    "Departure Support",
  ];
  const docs = [
    "Updated CV/Resume",
    "Valid Passport",
    "Educational Certificates",
    "Experience Letters",
    "Language Test Scores",
    "Passport-size Photographs",
  ];

  return (
    <div id="job-placement" className="section-pad">
      <div className="container mx-auto px-4">
        <SectionHeader
          emoji="🌍"
          title="Overseas Job Placement"
          desc="We connect skilled professionals with top employers across the globe, handling everything from profile evaluation to visa processing."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <InfoCard title="Industries Covered">
            <TagGrid items={industries} />
          </InfoCard>
          <InfoCard title="Countries Available">
            <TagGrid items={countries} color="gold" />
          </InfoCard>
          <InfoCard title="Eligibility Criteria">
            <ul className="space-y-2">
              {[
                "Relevant work experience (2+ years preferred)",
                "Valid passport",
                "Language proficiency (IELTS/TOEFL)",
                "Basic educational qualifications",
              ].map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </InfoCard>
          <InfoCard title="Required Documents">
            <ul className="space-y-2">
              {docs.map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </InfoCard>
        </div>
        <InfoCard title="Our Process" className="mt-8">
          <ProcessSteps steps={steps} />
        </InfoCard>
        <CTABar />
      </div>
    </div>
  );
}

/* ── Study Abroad ── */
function StudyAbroad() {
  const programs = [
    "UG (Bachelor's Degree)",
    "PG (Master's Degree)",
    "Diploma & Certificate",
    "PhD / Research Programs",
  ];
  const universities = [
    "University of Toronto",
    "University of Melbourne",
    "University of Manchester",
    "TU Munich",
    "New York University (NYU)",
    "NUS Singapore",
  ];
  const admissionSteps = [
    "Free Counselling",
    "Course Selection",
    "Document Preparation",
    "Application Submission",
    "Offer Letter",
    "Visa Application",
    "Pre-Departure",
  ];
  const scholarships = [
    "Need-based Scholarships",
    "Merit-based Scholarships",
    "Country-specific Scholarships",
    "University Grants",
  ];

  return (
    <div id="study-abroad" className="section-pad">
      <div className="container mx-auto px-4">
        <SectionHeader
          emoji="🎓"
          title="Study Abroad & University Admission"
          desc="Expert guidance for undergraduate, postgraduate, and research admissions at top universities worldwide."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <InfoCard title="Programs We Support">
            <TagGrid items={programs} />
          </InfoCard>
          <InfoCard title="Top Partner Universities">
            <ul className="space-y-2">
              {universities.map((u) => (
                <li
                  key={u}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <span className="w-2 h-2 bg-brand-blue rounded-full flex-shrink-0" />
                  {u}
                </li>
              ))}
            </ul>
          </InfoCard>
          <InfoCard title="Scholarship Support">
            <ul className="space-y-2">
              {scholarships.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </InfoCard>
          <InfoCard title="Admission Journey">
            <ProcessSteps steps={admissionSteps} compact />
          </InfoCard>
        </div>
        <CTABar />
      </div>
    </div>
  );
}

/* ── Short Term Courses ── */
function ShortTermCourses() {
  const programs = [
    { name: "Project Management (PMP)", duration: "3 months" },
    { name: "Digital Marketing", duration: "2 months" },
    { name: "Data Science & Analytics", duration: "4 months" },
    { name: "Cybersecurity", duration: "3 months" },
    { name: "Healthcare Management", duration: "3 months" },
    { name: "Hospitality Management", duration: "2 months" },
    { name: "Six Sigma", duration: "1 month" },
    { name: "Leadership & Management", duration: "2 months" },
  ];

  return (
    <div id="short-term" className="section-pad">
      <div className="container mx-auto px-4">
        <SectionHeader
          emoji="📜"
          title="Short-Term Courses & Certifications"
          desc="Industry-recognized, employer-valued certifications to supercharge your career in as little as 1–6 months."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {programs.map((p) => (
            <div
              key={p.name}
              className="fade-in-section bg-white rounded-2xl p-5 border border-gray-100 card-hover shadow-xs"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3 text-lg">
                📋
              </div>
              <h3 className="text-brand-blue font-bold text-sm mb-1">
                {p.name}
              </h3>
              <p className="text-gray-400 text-xs mb-3">
                Duration: {p.duration}
              </p>
              <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                Certificate Offered
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            {
              icon: "🌍",
              title: "Globally Recognised",
              desc: "Certifications accepted by employers worldwide.",
            },
            {
              icon: "⚡",
              title: "Fast-Track Learning",
              desc: "Complete in 1–6 months, designed for working professionals.",
            },
            {
              icon: "💼",
              title: "Industry-Oriented",
              desc: "Practical, hands-on training aligned with employer needs.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-brand-blue rounded-2xl p-6 text-white fade-in-section"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-blue-200 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        <CTABar />
      </div>
    </div>
  );
}

/* ── IELTS/TOEFL ── */
function IELTSTraining() {
  return (
    <div id="ielts" className="section-pad">
      <div className="container mx-auto px-4">
        <SectionHeader
          emoji="📚"
          title="IELTS & TOEFL Training"
          desc="Achieve your target band score with certified coaching, intensive practice, and personalized feedback."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[
            {
              icon: "🖥️",
              title: "Online Coaching",
              desc: "Live classes, recorded sessions, and interactive study materials accessible from anywhere.",
            },
            {
              icon: "🏫",
              title: "Offline Classroom",
              desc: "In-person coaching with small batch sizes for personalised attention.",
            },
            {
              icon: "📝",
              title: "Mock Tests",
              desc: "Weekly full-length mock tests with detailed performance feedback and improvement plans.",
            },
            {
              icon: "🏆",
              title: "Band Score Guarantee",
              desc: "Targeted improvement plan. We support you until you achieve your goal score.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="fade-in-section bg-white rounded-2xl p-6 border border-gray-100 card-hover shadow-xs"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-brand-blue font-bold text-sm mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-brand-blue rounded-3xl p-8 text-white fade-in-section">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-black text-brand-gold mb-1">500+</p>
              <p className="text-blue-200 text-sm">Students Trained</p>
            </div>
            <div>
              <p className="text-4xl font-black text-brand-gold mb-1">8.0</p>
              <p className="text-blue-200 text-sm">Avg. Band Score Achieved</p>
            </div>
            <div>
              <p className="text-4xl font-black text-brand-gold mb-1">5+</p>
              <p className="text-blue-200 text-sm">
                Years of Certified Training
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 fade-in-section">
          <h3 className="text-brand-blue font-bold mb-3">
            Our Certified Trainers
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "British Council trained professionals",
              "5+ years of teaching experience",
              "Specialised in Listening, Reading, Writing & Speaking",
              "Regular training updates & assessments",
            ].map((point) => (
              <li
                key={point}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <CTABar />
      </div>
    </div>
  );
}

/* ── Online Courses ── */
function OnlineCourses() {
  const courses = [
    { icon: "🌐", name: "Web Development", duration: "12 weeks" },
    { icon: "📢", name: "Digital Marketing", duration: "8 weeks" },
    { icon: "📊", name: "Data Science", duration: "16 weeks" },
    { icon: "☁️", name: "Cloud Computing", duration: "10 weeks" },
    { icon: "🗣️", name: "English Communication", duration: "6 weeks" },
    { icon: "📋", name: "Project Management", duration: "8 weeks" },
    { icon: "🎨", name: "Graphic Design", duration: "8 weeks" },
    { icon: "📈", name: "Business Analytics", duration: "12 weeks" },
  ];

  return (
    <div id="online-courses" className="section-pad">
      <div className="container mx-auto px-4">
        <SectionHeader
          emoji="💻"
          title="Learn Online Courses"
          desc="Flexible, self-paced online learning with industry-recognized certifications. Learn at your own pace, anytime, anywhere."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {courses.map((course, i) => (
            <div
              key={course.name}
              className={`fade-in-section stagger-${Math.min(i + 1, 5)} bg-white rounded-2xl p-6 border border-gray-100 card-hover shadow-xs flex flex-col`}
            >
              <div className="text-4xl mb-3">{course.icon}</div>
              <h3 className="text-brand-blue font-bold text-sm mb-1">
                {course.name}
              </h3>
              <p className="text-gray-400 text-xs mb-2">
                Duration: {course.duration}
              </p>
              <div className="mt-auto pt-3 space-y-2">
                <span className="block text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full w-fit">
                  Certificate Offered
                </span>
                <Link
                  to="/contact"
                  className="block w-full text-center py-2.5 bg-brand-gold text-brand-blue font-bold text-xs rounded-xl hover:bg-brand-gold-dark transition-colors"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          ))}
        </div>
        <CTABar />
      </div>
    </div>
  );
}

/* ── Shared Sub-Components ── */
function SectionHeader({
  emoji,
  title,
  desc,
}: { emoji: string; title: string; desc: string }) {
  return (
    <div className="fade-in-section text-center mb-2">
      <div className="text-5xl mb-4">{emoji}</div>
      <h2 className="text-3xl md:text-4xl font-black text-brand-blue mb-3">
        {title}
      </h2>
      <p className="text-gray-500 max-w-xl mx-auto text-sm">{desc}</p>
    </div>
  );
}

function InfoCard({
  title,
  children,
  className = "",
}: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`fade-in-section bg-white rounded-2xl p-6 border border-gray-100 shadow-xs ${className}`}
    >
      <h3 className="text-brand-blue font-bold text-base mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-brand-gold rounded-full inline-block" />
        {title}
      </h3>
      {children}
    </div>
  );
}

function TagGrid({
  items,
  color = "blue",
}: { items: string[]; color?: "blue" | "gold" }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            color === "gold"
              ? "bg-amber-100 text-amber-800"
              : "bg-blue-50 text-brand-blue"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ProcessSteps({
  steps,
  compact = false,
}: { steps: string[]; compact?: boolean }) {
  return (
    <ol className={`space-y-${compact ? "2" : "3"}`}>
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-3">
          <span className="w-6 h-6 bg-brand-gold text-brand-blue rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
            {i + 1}
          </span>
          <span className="text-sm text-gray-700">{step}</span>
          {i < steps.length - 1 && (
            <ArrowRight className="w-3 h-3 text-gray-300 ml-auto flex-shrink-0 hidden sm:block" />
          )}
        </li>
      ))}
    </ol>
  );
}

function CTABar() {
  return (
    <div className="mt-10 bg-gradient-to-r from-brand-blue to-brand-blue-light rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 fade-in-section">
      <div>
        <h3 className="text-white font-bold text-lg mb-1">
          Ready to Get Started?
        </h3>
        <p className="text-blue-200 text-sm">
          Book a free consultation with our experts today.
        </p>
      </div>
      <div className="flex gap-3 flex-shrink-0">
        <Link
          to="/contact"
          className="px-6 py-3 bg-brand-gold text-brand-blue font-bold text-sm rounded-xl hover:bg-brand-gold-dark transition-colors shadow-gold"
        >
          Apply Now
        </Link>
        <Link
          to="/contact"
          className="px-6 py-3 border-2 border-white text-white font-bold text-sm rounded-xl hover:bg-white hover:text-brand-blue transition-colors"
        >
          Book Consultation
        </Link>
      </div>
    </div>
  );
}
