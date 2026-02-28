import { Link } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
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

function Counter({
  target,
  suffix = "",
  prefix = "",
}: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  useScrollAnimations();

  useEffect(() => {
    document.title = "About Us | Grow Edge Consultant";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Learn about Grow Edge Consultant — our mission, vision, team, and decade-long journey helping students and professionals achieve global success.",
    );
    window.scrollTo(0, 0);
  }, []);

  const team = [
    {
      name: "Arjun Mehta",
      role: "Founder & CEO",
      desc: "Visionary leader with 15+ years in international education",
      initials: "AM",
      color: "bg-brand-blue",
    },
    {
      name: "Priya Nair",
      role: "Head of Admissions",
      desc: "Expert in university admissions across 20+ countries",
      initials: "PN",
      color: "bg-purple-700",
    },
    {
      name: "Vikram Singh",
      role: "Overseas Job Specialist",
      desc: "10+ years connecting professionals with global employers",
      initials: "VS",
      color: "bg-teal-700",
    },
    {
      name: "Sneha Patel",
      role: "IELTS/TOEFL Expert",
      desc: "British Council trained with 500+ successful students",
      initials: "SP",
      color: "bg-rose-700",
    },
    {
      name: "Ravi Kumar",
      role: "Visa Consultant",
      desc: "95% visa approval rate across all major destinations",
      initials: "RK",
      color: "bg-amber-700",
    },
    {
      name: "Meera Joshi",
      role: "Student Relations Manager",
      desc: "Dedicated to ensuring every student's success journey",
      initials: "MJ",
      color: "bg-emerald-700",
    },
  ];

  const stats = [
    { target: 5000, suffix: "+", label: "Students Placed" },
    { target: 15, suffix: "+", label: "Countries" },
    { target: 100, suffix: "+", label: "Partner Universities" },
    { target: 10, suffix: "+", label: "Years Experience" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <nav className="flex items-center gap-2 text-blue-300 text-sm mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-brand-gold">About Us</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            About Grow Edge Consultant
          </h1>
          <p className="text-blue-200 text-base max-w-xl">
            A decade of transforming dreams into global realities.
          </p>
        </div>
      </section>

      {/* Company Intro */}
      <section className="section-pad bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-left">
              <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-3">
                Our Story
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-brand-blue mb-5">
                A Decade of Global Opportunities
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Grow Edge Consultant was founded with a singular vision: to make
                international education and employment accessible to every
                aspiring individual in India. Over the past decade, we have
                helped more than 5,000 students and professionals build
                successful careers and academic lives abroad.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We work with a network of 100+ universities and hundreds of
                employers across 15+ countries to ensure every client finds the
                perfect opportunity. Our holistic approach covers everything
                from initial counselling to post-arrival support.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-semibold text-sm rounded-xl hover:bg-brand-blue-light transition-colors"
              >
                Get Started Today <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="fade-in-right">
              <div className="relative">
                <div className="bg-gradient-to-br from-brand-blue to-brand-blue-light rounded-3xl p-8 text-white">
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-3xl font-black text-brand-gold">
                          <Counter target={stat.target} suffix={stat.suffix} />
                        </p>
                        <p className="text-blue-200 text-xs mt-1 font-medium">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-brand-gold rounded-2xl flex items-center justify-center text-3xl shadow-gold">
                  🌍
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="section-pad bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="fade-in-section text-center mb-10">
              <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-2">
                From the Founder
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-brand-blue">
                A Message from Our Founder
              </h2>
            </div>
            <div className="fade-in-section bg-white rounded-3xl p-8 md:p-10 shadow-brand flex flex-col md:flex-row items-start gap-8">
              <div className="flex-shrink-0 flex flex-col items-center gap-3">
                <div className="w-24 h-24 bg-brand-blue rounded-full flex items-center justify-center text-white font-black text-2xl shadow-brand">
                  AM
                </div>
                <div className="text-center">
                  <p className="text-brand-blue font-bold text-sm">
                    Mr. Arjun Mehta
                  </p>
                  <p className="text-gray-500 text-xs">Founder & CEO</p>
                </div>
              </div>
              <div className="flex-1">
                <Quote className="w-10 h-10 text-brand-gold mb-4" />
                <p className="text-gray-700 text-base leading-relaxed italic mb-4">
                  "Our mission has always been to bridge the gap between talent
                  and global opportunity. We don't just guide — we partner with
                  you on your journey. Every student and professional who walks
                  through our doors has a unique story, and we treat each one as
                  our own success."
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  When I started Grow Edge Consultant over a decade ago, I saw
                  countless talented individuals being held back from their
                  global dreams simply due to lack of proper guidance. Today,
                  I'm proud that our team has helped thousands achieve what they
                  once thought impossible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-pad bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-in-section">
            <h2 className="text-3xl md:text-4xl font-black text-brand-blue">
              Mission & Vision
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="fade-in-left bg-brand-blue rounded-2xl p-8 text-white">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-brand-gold font-black text-xl mb-4">
                Our Mission
              </h3>
              <p className="text-blue-200 leading-relaxed">
                To provide transparent, affordable, and expert guidance to
                students and professionals seeking international education and
                employment opportunities. We believe everyone deserves a fair
                shot at global success.
              </p>
            </div>
            <div className="fade-in-right bg-gradient-to-br from-brand-gold to-brand-gold-dark rounded-2xl p-8 text-brand-blue">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-black text-xl mb-4">Our Vision</h3>
              <p className="text-brand-blue/80 leading-relaxed">
                To be India's most trusted global education and career
                consultancy, empowering 50,000+ individuals to thrive
                internationally by 2030.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-in-section">
            <p className="text-brand-gold font-semibold text-sm uppercase tracking-widest mb-2">
              The People Behind
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-brand-blue mb-3">
              Meet Our Expert Team
            </h2>
            <p className="text-gray-500 max-w-md mx-auto text-sm">
              Experienced professionals dedicated to your international success.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div
                key={member.name}
                className={`fade-in-section stagger-${Math.min(i + 1, 5)} bg-white rounded-2xl p-6 text-center card-hover border border-gray-100`}
              >
                <div
                  className={`w-20 h-20 ${member.color} rounded-full flex items-center justify-center text-white font-black text-xl mx-auto mb-4 shadow-lg`}
                >
                  {member.initials}
                </div>
                <h3 className="text-brand-blue font-bold text-base">
                  {member.name}
                </h3>
                <p className="text-brand-gold font-semibold text-xs mb-2">
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 brand-gradient text-center">
        <div className="container mx-auto px-4 fade-in-section">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-blue-200 text-base mb-8 max-w-lg mx-auto">
            Connect with our team today for a free consultation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold text-brand-blue font-bold rounded-xl hover:bg-brand-gold-dark transition-all shadow-gold"
          >
            Contact Us <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
