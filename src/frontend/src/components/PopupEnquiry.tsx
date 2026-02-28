import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import EnquiryForm from "./EnquiryForm";

export default function PopupEnquiry() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => setOpen(false), 300);
  }, []);

  useEffect(() => {
    const shown = sessionStorage.getItem("popupShown");
    if (shown) return;

    const timer = setTimeout(() => {
      setOpen(true);
      setTimeout(() => setVisible(true), 10);
      sessionStorage.setItem("popupShown", "true");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        visible ? "bg-black/60 backdrop-blur-sm" : "bg-transparent"
      }`}
      aria-hidden="true"
    >
      <dialog
        open
        className={`relative w-full max-w-lg bg-brand-blue rounded-2xl shadow-2xl transition-all duration-300 max-h-[90vh] overflow-y-auto m-0 p-0 border-0 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        aria-label="Enquiry form"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-white/10">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors text-white"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="pr-8">
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-1">
              Free Consultation
            </p>
            <h2 className="text-white text-xl font-bold">
              Get Expert Guidance
            </h2>
            <p className="text-blue-200 text-sm mt-1">
              Fill out the form and our counsellor will reach you within 24
              hours.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 py-5">
          <EnquiryForm dark onSuccess={handleClose} />
        </div>
      </dialog>
    </div>
  );
}
