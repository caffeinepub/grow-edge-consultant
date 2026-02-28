import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Service } from "../backend.d";
import { useActor } from "../hooks/useActor";

interface EnquiryFormProps {
  onSuccess?: () => void;
  dark?: boolean;
}

const serviceOptions = [
  { value: Service.studyAbroad, label: "Study Abroad & University Admission" },
  { value: Service.jobPlacement, label: "Overseas Job Placement" },
  { value: Service.ieltsTraining, label: "IELTS & TOEFL Training" },
  {
    value: Service.shortTermCourses,
    label: "Short-Term Courses & Certifications",
  },
  { value: Service.onlineCourses, label: "Learn Online Courses" },
];

const countries = [
  "USA",
  "Canada",
  "UK",
  "Australia",
  "Germany",
  "Dubai / UAE",
  "New Zealand",
  "Singapore",
  "Ireland",
  "France",
  "Other",
];

export default function EnquiryForm({
  onSuccess,
  dark = false,
}: EnquiryFormProps) {
  const { actor } = useActor();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: "" as Service | "",
    country: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const inputClass = `w-full px-4 py-3 rounded-lg border text-sm font-medium focus:outline-none focus:ring-2 transition-all ${
    dark
      ? "bg-white/10 border-white/20 text-white placeholder-blue-300 focus:ring-brand-gold focus:border-brand-gold"
      : "bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-brand-blue focus:border-brand-blue"
  }`;

  const labelClass = `block text-sm font-semibold mb-1.5 ${dark ? "text-blue-100" : "text-gray-700"}`;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.service) errs.service = "Please select a service";
    if (!form.country.trim()) errs.country = "Preferred country is required";
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!actor) {
      toast.error("Service unavailable. Please try again.");
      return;
    }
    setLoading(true);
    try {
      await actor.submitEnquiry(
        form.fullName,
        form.phone,
        form.email,
        form.service as Service,
        form.country,
        form.message,
      );
      setSubmitted(true);
      toast.success("Enquiry submitted! We'll contact you within 24 hours.");
      onSuccess?.();
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-9 h-9 text-green-600" />
        </div>
        <h3
          className={`text-xl font-bold ${dark ? "text-white" : "text-brand-blue"}`}
        >
          Thank You!
        </h3>
        <p
          className={`text-sm max-w-xs ${dark ? "text-blue-200" : "text-gray-600"}`}
        >
          Your enquiry has been received. Our counsellor will reach out within
          24 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm({
              fullName: "",
              phone: "",
              email: "",
              service: "",
              country: "",
              message: "",
            });
          }}
          className="text-brand-gold underline text-sm font-medium"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="eq-fullName" className={labelClass}>
            Full Name *
          </label>
          <input
            id="eq-fullName"
            type="text"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder="Rahul Sharma"
            className={inputClass}
          />
          {errors.fullName && (
            <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>
        <div>
          <label htmlFor="eq-phone" className={labelClass}>
            Phone Number *
          </label>
          <input
            id="eq-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91 98765 43210"
            className={inputClass}
          />
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="eq-email" className={labelClass}>
          Email Address *
        </label>
        <input
          id="eq-email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="rahul@example.com"
          className={inputClass}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="eq-service" className={labelClass}>
            Service Interested In *
          </label>
          <select
            id="eq-service"
            value={form.service}
            onChange={(e) =>
              setForm({ ...form, service: e.target.value as Service })
            }
            className={inputClass}
          >
            <option value="">Select a service</option>
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <p className="text-red-400 text-xs mt-1">{errors.service}</p>
          )}
        </div>
        <div>
          <label htmlFor="eq-country" className={labelClass}>
            Preferred Country *
          </label>
          <select
            id="eq-country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className={inputClass}
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="text-red-400 text-xs mt-1">{errors.country}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="eq-message" className={labelClass}>
          Message *
        </label>
        <textarea
          id="eq-message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us about your goals and how we can help..."
          rows={4}
          className={`${inputClass} resize-none`}
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-1">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !actor}
        className="w-full py-3.5 bg-brand-gold text-brand-blue font-bold text-sm rounded-lg hover:bg-brand-gold-dark transition-colors shadow-gold flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? "Submitting..." : "Get Free Counselling"}
      </button>
    </form>
  );
}
