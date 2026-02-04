import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import {
  roleOptions,
  industryOptions,
  initialCoworkingFormData,
  validationRules,
} from "../constants/coworker";

const CoworkingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialCoworkingFormData);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ---------------- VALIDATION ---------------- */
  const validate = (name, value) => {
    switch (name) {
      case "fullName":
        return value?.trim() ? "" : "Full name is required";
      case "primaryRole":
        return value ? "" : "Select a role";
      case "linkedinUrl":
        return validationRules.linkedinPattern.test(value)
          ? ""
          : "Enter a valid LinkedIn URL";
      case "primarySkill":
        return value?.trim() ? "" : "Primary skill is required";
      case "industry":
        return value ? "" : "Select an industry";
      default:
        return "";
    }
  };

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const nextStep = () => {
    const stepFields =
      step === 1
        ? ["fullName", "primaryRole", "linkedinUrl"]
        : ["primarySkill", "industry"];

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
            Profile Created Successfully
          </h2>
          <p className="text-gray-600">
            Your co-working profile is now visible to others.
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
            Co – Working
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create your co-working profile
          </p>
        </div>

        {/* STEPPER */}
        <div className="flex items-center justify-between mb-8">
          {["Basic Info", "Skills", "Finish"].map((label, i) => {
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
                Basic Information
              </h2>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="fullName"
                  placeholder="Example: Rahul Sharma"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Primary Role <span className="text-red-500">*</span>
                </label>
                <select
                  name="primaryRole"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select role</option>
                  {roleOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  LinkedIn Profile URL{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="linkedinUrl"
                  placeholder="https://linkedin.com/in/username"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This will be displayed on your profile card so others can
                  review your background.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-sm font-semibold border-b border-gray-200 pb-3">
                Skills & Interest
              </h2>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Primary Skill / Focus Area{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="primarySkill"
                  placeholder="Product, Growth, Tech, Finance"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Industry Interest <span className="text-red-500">*</span>
                </label>
                <select
                  name="industry"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select industry</option>
                  {industryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Location (Optional)
                </label>
                <input
                  name="location"
                  placeholder="City / Country"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
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

            {step < 2 ? (
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
                  "Submit Profile"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoworkingForm;
