import { useState } from "react";
import {
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import {
  domainExtensions,
  domainCategories,
  platformFeeTerms,
  initialDomainFormData,
  validationRules,
} from "../constants/domainListing";

const DomainlistingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialDomainFormData);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ---------------- VALIDATION ---------------- */
  const validate = (name, value) => {
    switch (name) {
      case "domainName":
        return value?.trim() ? "" : "Domain name is required";
      case "domainExtension":
        return value ? "" : "Select domain extension";
      case "askingPrice":
        return value ? "" : "Asking price is required";
      case "domainCategory":
        return value ? "" : "Select a domain category";
      case "contactEmail":
        return validationRules.emailPattern.test(value)
          ? ""
          : "Enter a valid email";
      case "contactNumber":
        return validationRules.phonePattern.test(value)
          ? ""
          : "Enter valid 10-digit number";
      case "platformFeeConsent":
        return value ? "" : "You must agree to continue";
      default:
        return "";
    }
  };

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, newValue) }));
  };

  const nextStep = () => {
    const stepFields =
      step === 1
        ? ["domainName", "domainExtension", "askingPrice", "domainCategory"]
        : ["contactEmail", "contactNumber"];

    const newErrors = {};
    stepFields.forEach((field) => {
      const err = validate(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.platformFeeConsent) {
      setErrors({ platformFeeConsent: "Consent is required" });
      return;
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSuccess(true);
  };

  /* ---------------- SUCCESS ---------------- */
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-black mb-2">
            Domain Listed Successfully
          </h2>
          <p className="text-gray-600">
            We’ll contact you if there’s buyer interest.
          </p>
        </div>
      </div>
    );
  }

  /* ---------------- FORM ---------------- */
  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-black">
            Domain Listing
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            List your domain for sale. No upfront fees.
          </p>
        </div>

        {/* STEPPER */}
        <div className="flex items-center justify-between mb-8">
          {["Domain Details", "Contact Info", "Agreement"].map((label, i) => {
            const active = step === i + 1;
            const completed = step > i + 1;

            return (
              <div key={label} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center border text-xs font-medium
                      ${
                        completed
                          ? "bg-black text-white border-black"
                          : active
                          ? "border-black text-black"
                          : "border-gray-300 text-gray-400"
                      }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-[11px] mt-1 ${
                      active || completed
                        ? "text-black"
                        : "text-gray-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>

                {i < 2 && (
                  <div
                    className={`h-px flex-1 mx-2 ${
                      completed ? "bg-black" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* CARD */}
        <form
          onSubmit={handleSubmit}
          className="border border-gray-300 rounded-md p-6"
        >
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-sm font-semibold border-b border-gray-200 pb-3">
                Domain Details
              </h2>

              <div>
                <label className="block text-sm font-medium mb-1">
                Domain Name <span className="text-red-500">*</span>
                </label>

                <input
                  name="domainName"
                  placeholder="www.example.com"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.domainName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.domainName}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Domain Extension <span className="text-red-500">*</span>
                </label>
                <select
                  name="domainExtension"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select extension</option>
                  {domainExtensions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Asking Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  name="askingPrice"
                  placeholder="₹1,50,000"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Domain Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="domainCategory"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select category</option>
                  {domainCategories.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-sm font-semibold border-b border-gray-200 pb-3">
                Contact Information
              </h2>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  name="contactEmail"
                  placeholder="you@email.com"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  name="contactNumber"
                  maxLength={10}
                  placeholder="10-digit number"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-sm font-semibold border-b border-gray-200 pb-3">
                Platform Fee Consent
              </h2>

              <div className="border border-gray-300 rounded-md p-4 text-xs text-gray-600 space-y-2">
                {platformFeeTerms.map((t, i) => (
                  <p key={i}>• {t}</p>
                ))}
              </div>

              <label className="flex gap-3 text-sm items-start">
                <input
                  type="checkbox"
                  name="platformFeeConsent"
                  onChange={handleChange}
                />
                <span>
                  I agree to the Domain Listing & Platform Fee terms
                </span>
              </label>
            </div>
          )}

          {/* FOOTER */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="text-sm flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-black text-white px-6 py-2 rounded-md text-sm flex items-center gap-1"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="bg-black text-white px-6 py-2 rounded-md text-sm flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting
                  </>
                ) : (
                  "Submit Listing"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DomainlistingForm;
