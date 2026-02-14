import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Rocket,
  User,
  Briefcase,
  Linkedin,
  Target,
  Building2,
  MapPin,
  Users,
  Sparkles,
  Shield,
  ExternalLink,
  Camera,
  X,
} from "lucide-react";

import {
  roleOptions,
  industryOptions,
  validationRules,
} from "../constants/coworker";

const stepIcons = {
  1: User,
  2: Target,
  3: Shield,
};

const coworkingTerms = [
  "Your profile will be visible to other members in the co-working network.",
  "We may share your LinkedIn profile with potential collaborators.",
  "You agree to maintain professional conduct when interacting with other members.",
  "Your information will be used solely for networking and collaboration purposes.",
  "You can update or delete your profile at any time from your dashboard.",
];

const API_BASE_URL = " https://cobrother-api.onrender.com";

const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
      animate={{
        x: [0, 50, -30, 0],
        y: [0, -60, 30, 0],
        scale: [1, 1.2, 0.8, 1],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
      animate={{
        x: [0, -40, 40, 0],
        y: [0, 50, -30, 0],
        scale: [1, 0.9, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl"
      animate={{
        x: [0, 30, -40, 0],
        y: [0, -40, 40, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration: 8,
        delay: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

const FloatingParticles = ({ count = 8 }) => (
  <>
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-purple-400 rounded-full pointer-events-none"
        style={{
          left: `${15 + i * (70 / count)}%`,
          top: `${25 + (i % 3) * 25}%`,
          filter: "blur(0.5px)",
        }}
        animate={{
          y: [0, -40, 0],
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
        }}
        transition={{
          duration: 3 + i * 0.3,
          repeat: Infinity,
          delay: i * 0.5,
          ease: "easeInOut",
        }}
      />
    ))}
  </>
);

const GlassCard = ({
  children,
  className = "",
  glowColor = "from-purple-600/30 to-blue-600/30",
  hover = true,
}) => (
  <div className={`relative group ${className}`}>
    {hover && (
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${glowColor} rounded-2xl blur-lg opacity-0 group-hover:opacity-70 transition duration-500`}
      />
    )}
    <div className="relative bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-xl border border-neutral-800/50 rounded-2xl hover:border-neutral-700/50 transition-all duration-300 h-full">
      {children}
    </div>
  </div>
);

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  delay = 0,
  helperText,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <label className="block text-sm font-medium text-neutral-300 mb-2">
      {label}{" "}
      {required && (
        <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
          *
        </span>
      )}
    </label>
    <div className="relative group">
      <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/0 to-pink-500/0 rounded-xl opacity-0 group-focus-within:from-purple-500/30 group-focus-within:to-pink-500/30 group-focus-within:opacity-100 transition-all duration-500 blur-sm" />
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-purple-400 transition-colors duration-300" />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${Icon ? "pl-11" : "pl-4"} pr-4 py-3.5 bg-neutral-900/80 border rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 text-sm backdrop-blur-sm ${
            error
              ? "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/30"
              : "border-neutral-800/60"
          }`}
        />
      </div>
    </div>
    {helperText && !error && (
      <p className="text-xs text-neutral-500 mt-1.5">{helperText}</p>
    )}
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -5, height: 0 }}
          className="text-red-400 text-xs mt-2 flex items-center gap-1.5"
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0" /> {error}
        </motion.p>
      )}
    </AnimatePresence>
  </motion.div>
);

const SelectField = ({
  label,
  name,
  value,
  onChange,
  error,
  options,
  placeholder,
  icon: Icon,
  required = false,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <label className="block text-sm font-medium text-neutral-300 mb-2">
      {label}{" "}
      {required && (
        <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
          *
        </span>
      )}
    </label>
    <div className="relative group">
      <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/0 to-pink-500/0 rounded-xl opacity-0 group-focus-within:from-purple-500/30 group-focus-within:to-pink-500/30 group-focus-within:opacity-100 transition-all duration-500 blur-sm" />
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-purple-400 transition-colors duration-300" />
        )}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full ${Icon ? "pl-11" : "pl-4"} pr-4 py-3.5 bg-neutral-900/80 border rounded-xl text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 text-sm backdrop-blur-sm appearance-none cursor-pointer ${
            error
              ? "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/30"
              : "border-neutral-800/60"
          } ${!value ? "text-neutral-500" : "text-white"}`}
        >
          <option value="" className="bg-neutral-900 text-neutral-500">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-neutral-900 text-white"
            >
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 rotate-90 pointer-events-none" />
      </div>
    </div>
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -5, height: 0 }}
          className="text-red-400 text-xs mt-2 flex items-center gap-1.5"
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0" /> {error}
        </motion.p>
      )}
    </AnimatePresence>
  </motion.div>
);

const CoworkingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    primaryRole: "",
    linkedinUrl: "",
    primarySkill: "",
    industry: "",
    location: "",
    termsConsent: false,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const formRef = useRef(null);

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const photoInputRef = useRef(null);

  const formSteps = [
    { id: 1, title: "Basic Info" },
    { id: 2, title: "Skills" },
    { id: 3, title: "Confirm" },
  ];

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const handlePhotoChange = (file) => {
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        profilePhoto: "Photo must be under 2MB",
      }));
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        profilePhoto: "Only JPG, PNG, or WebP allowed",
      }));
      return;
    }


    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);

    setProfilePhoto(file);
    setErrors((prev) => ({ ...prev, profilePhoto: "" }));
  };

  const handlePhotoDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handlePhotoDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handlePhotoChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    setPhotoPreview(null);
    if (photoInputRef.current) photoInputRef.current.value = "";
  };

  const validate = (name, value) => {
    switch (name) {
      case "fullName":
        if (!value || !value.trim()) return "Full name is required";
        if (value.trim().length < 2)
          return "Full name must be at least 2 characters";
        return "";
      case "primaryRole":
        return !value || value === "" ? "Please select a role" : "";
      case "linkedinUrl":
        if (!value || !value.trim()) return "LinkedIn URL is required";
        if (!validationRules.linkedinPattern.test(value))
          return "Enter a valid LinkedIn URL";
        return "";
      case "primarySkill":
        if (!value || !value.trim()) return "Primary skill is required";
        if (value.trim().length < 2)
          return "Primary skill must be at least 2 characters";
        return "";
      case "industry":
        return !value || value === "" ? "Please select an industry" : "";
      case "termsConsent":
        return value ? "" : "You must agree to continue";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (stepNumber) => {
    let fields = [];

    switch (stepNumber) {
      case 1:
        fields = ["fullName", "primaryRole", "linkedinUrl"];
        break;
      case 2:
        fields = ["primarySkill", "industry"];
        break;
      case 3:
        fields = ["termsConsent"];
        break;
      default:
        fields = [];
    }

    const newErrors = {};
    let isValid = true;

    fields.forEach((field) => {
      const error = validate(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };


  const getIndustryLabel = (value) => {
    const industry = industryOptions.find((i) => i.value === value);
    return industry ? industry.label : value;
  };

  
  const getRoleLabel = (value) => {
    const role = roleOptions.find((r) => r.value === value);
    return role ? role.label : value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(3)) return;

    setSubmitting(true);

    try {
     
      const skillString = `${formData.primarySkill} - ${formData.industry} - ${formData.location || "Not specified"}`;

      const payload = {
        fullName: formData.fullName.trim(),
        primaryRole: formData.primaryRole,
        linkedinUrl: formData.linkedinUrl.trim(),
        skill: skillString, 
        agreement: {
          termsAccepted: formData.termsConsent, 
        },
      };

      // console.log("=== SUBMISSION DATA ===");
      // console.log("Payload:", JSON.stringify(payload, null, 2));
      // console.log("Has Photo:", !!profilePhoto);
      // if (profilePhoto) {
      //   console.log("Photo Name:", profilePhoto.name);
      //   console.log("Photo Size:", profilePhoto.size);
      //   console.log("Photo Type:", profilePhoto.type);
      // }
      // console.log("========================");

      let response;

      if (profilePhoto) {
      
        const formDataToSend = new FormData();

        formDataToSend.append("data", JSON.stringify(payload));

      
        formDataToSend.append("logo", profilePhoto); 
     
        console.log("FormData entries:");
        for (let [key, value] of formDataToSend.entries()) {
          console.log(`  ${key}:`, value);
        }

        response = await fetch(`${API_BASE_URL}/api/CreateCoworking`, {
          method: "POST",
     
          body: formDataToSend,
        });
      } else {

        response = await fetch(`${API_BASE_URL}/api/CreateCoworking`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        let errorMessage = "Submission failed";
        try {
          const err = await response.json();
          errorMessage = err.message || err.error || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("=== SUCCESS RESPONSE ===");
      console.log(JSON.stringify(data, null, 2));
      console.log("========================");

      setSubmittedData(data);
      setSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setSubmittedData(null);
    setFormData({
      fullName: "",
      primaryRole: "",
      linkedinUrl: "",
      primarySkill: "",
      industry: "",
      location: "",
      termsConsent: false,
    });
    setProfilePhoto(null);
    setPhotoPreview(null);
    setStep(1);
    setErrors({});
  };

  const parseSkillString = (skillString) => {
    if (!skillString) return { skill: "", industry: "", location: "" };
    const parts = skillString.split(" - ");
    return {
      skill: parts[0] || "",
      industry: parts[1] || "",
      location: parts[2] || "",
    };
  };

  const completionPercentage = ((step - 1) / 3) * 100;

  if (success) {
    const photoUrl = submittedData?.logo || photoPreview;
    const parsedSkill = parseSkillString(submittedData?.skill);

    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
        <AnimatedBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="relative z-10 max-w-lg w-full"
        >
          <GlassCard glowColor="from-green-600/40 to-emerald-600/40">
            <div className="p-8 sm:p-12 text-center relative overflow-hidden">
              <FloatingParticles count={6} />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="relative mx-auto mb-6"
              >
                {photoUrl ? (
                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-2 border-green-500/50 shadow-2xl shadow-green-500/30">
                    <img
                      src={photoUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
           
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                        `;
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/30">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                )}
                <motion.div
                  className="absolute inset-0 bg-green-500/20 rounded-2xl blur-xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl sm:text-3xl font-bold mb-3"
              >
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Profile Created
                </span>{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Successfully!
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-neutral-400 text-sm sm:text-base mb-4 max-w-sm mx-auto"
              >
                Welcome,{" "}
                <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {submittedData?.fullName || formData.fullName}
                </span>
                ! Your co-working profile is now visible to others.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="mb-6"
              >
                <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-3 bg-neutral-800/40 border border-neutral-700/30 rounded-xl text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-neutral-300">
                      {submittedData?.primaryRole || formData.primaryRole}
                    </span>
                  </div>
                  <div className="w-px h-4 bg-neutral-700" />
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-neutral-300">
                      {parsedSkill.skill || formData.primarySkill}
                    </span>
                  </div>
                  <div className="w-px h-4 bg-neutral-700" />
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-neutral-300">
                      {parsedSkill.industry || getIndustryLabel(formData.industry)}
                    </span>
                  </div>
                  {(parsedSkill.location || formData.location) && (
                    <>
                      <div className="w-px h-4 bg-neutral-700" />
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-orange-400" />
                        <span className="text-neutral-300">
                          {parsedSkill.location || formData.location}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>

              {submittedData?.linkedinUrl && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.58 }}
                  className="mb-4"
                >
                  <a
                    href={submittedData.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-colors text-xs"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    View LinkedIn Profile
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </motion.div>
              )}

              {submittedData?.Id && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xs text-neutral-500 mb-6"
                >
                  Profile ID:{" "}
                  <span className="text-neutral-400 font-mono bg-neutral-800/50 px-2 py-0.5 rounded">
                    {submittedData.Id}
                  </span>
                </motion.p>
              )}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetForm}
                className="group relative overflow-hidden rounded-full inline-flex items-center gap-2 shadow-2xl shadow-purple-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
                <span className="relative px-8 py-3.5 font-semibold text-white text-sm flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Create Another Profile
                </span>
              </motion.button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={formRef}
      className="min-h-screen bg-black pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 overflow-hidden"
    >
      <AnimatedBackground />
      <div className="relative z-10 max-w-2xl mx-auto">
      
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 relative"
        >
          <FloatingParticles count={6} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full mb-5 shadow-lg shadow-purple-500/20"
          >
            <Users className="w-4 h-4 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Co-Working Network
            </span>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Join Our
            </span>{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              Community
            </span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md mx-auto">
            Create your co-working profile and connect with like-minded
            professionals.
          </p>
          <motion.div
            className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-10 -right-10 w-28 h-28 bg-pink-500/15 rounded-full blur-3xl pointer-events-none"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.15, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            {formSteps.map((s, index) => {
              const isActive = step === s.id;
              const isCompleted = step > s.id;
              const StepIcon = stepIcons[s.id] || User;
              return (
                <div key={s.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <motion.div
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-purple-500/30 rounded-xl blur-lg"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                      <div
                        className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-sm font-semibold border-2 transition-all duration-500 ${
                          isCompleted
                            ? "bg-gradient-to-br from-purple-600 to-pink-600 border-purple-500 text-white shadow-lg shadow-purple-500/30"
                            : isActive
                              ? "border-purple-500 bg-purple-500/10 text-white shadow-lg shadow-purple-500/20"
                              : "border-neutral-700 bg-neutral-900/50 text-neutral-500"
                        }`}
                      >
                        {isCompleted ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                          >
                            <Check className="w-5 h-5" />
                          </motion.div>
                        ) : (
                          <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </div>
                    </motion.div>
                    <span
                      className={`text-xs mt-2 font-medium transition-colors duration-300 ${
                        isActive || isCompleted
                          ? "text-white"
                          : "text-neutral-500"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                  {index < formSteps.length - 1 && (
                    <div className="flex-1 mx-2 sm:mx-4 mt-[-20px]">
                      <div className="h-[2px] w-full bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                          initial={{ width: "0%" }}
                          animate={{ width: isCompleted ? "100%" : "0%" }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="relative">
            <div className="h-1 bg-neutral-800/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-neutral-500">
                Step {step} of 3
              </span>
              <span className="text-[10px] text-neutral-500">
                {Math.round(completionPercentage)}% complete
              </span>
            </div>
          </div>
        </motion.div>

        <GlassCard glowColor="from-purple-600/30 to-pink-600/30">
          <form onSubmit={handleSubmit} className="p-5 sm:p-8">
            <AnimatePresence mode="wait">
           
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-neutral-800/50">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center"
                    >
                      <User className="w-5 h-5 text-purple-400" />
                    </motion.div>
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        Basic Information
                      </h2>
                      <p className="text-xs text-neutral-500">
                        Tell us about yourself
                      </p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                  >
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Profile Photo
                    </label>
                    <div className="flex items-center gap-4">
                      <div
                        onDragEnter={handlePhotoDrag}
                        onDragLeave={handlePhotoDrag}
                        onDragOver={handlePhotoDrag}
                        onDrop={handlePhotoDrop}
                        onClick={() => photoInputRef.current?.click()}
                        className={`relative w-20 h-20 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 overflow-hidden group ${
                          dragActive
                            ? "border-purple-500 bg-purple-500/10"
                            : "border-neutral-700/60 hover:border-purple-500/50"
                        }`}
                      >
                        <input
                          type="file"
                          ref={photoInputRef}
                          onChange={(e) =>
                            handlePhotoChange(e.target.files?.[0])
                          }
                          accept="image/jpeg,image/png,image/webp"
                          className="hidden"
                        />
                        {photoPreview ? (
                          <>
                            <img
                              src={photoPreview}
                              alt="Profile preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Camera className="w-5 h-5 text-white" />
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemovePhoto();
                              }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg z-10 hover:bg-red-600 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center">
                            <Camera className="w-6 h-6 text-neutral-500 group-hover:text-purple-400 transition-colors" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-neutral-400">
                          Add a professional photo to your profile
                        </p>
                        <p className="text-[10px] text-neutral-500 mt-1">
                          JPG, PNG, or WebP • Max 2MB
                        </p>
                        {profilePhoto && (
                          <p className="text-[10px] text-green-400 mt-1 flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            {profilePhoto.name}
                          </p>
                        )}
                      </div>
                    </div>
                    {errors.profilePhoto && (
                      <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3" />{" "}
                        {errors.profilePhoto}
                      </p>
                    )}
                  </motion.div>

                  <InputField
                    label="Full Name"
                    name="fullName"
                    placeholder="Example: Rahul Sharma"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    icon={User}
                    required
                    delay={0.1}
                  />

                  <SelectField
                    label="Primary Role"
                    name="primaryRole"
                    value={formData.primaryRole}
                    onChange={handleChange}
                    error={errors.primaryRole}
                    options={roleOptions}
                    placeholder="Select role"
                    icon={Briefcase}
                    required
                    delay={0.15}
                  />

                  <InputField
                    label="LinkedIn Profile URL"
                    name="linkedinUrl"
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    error={errors.linkedinUrl}
                    icon={Linkedin}
                    required
                    delay={0.2}
                    helperText="This will be displayed on your profile card so others can review your background."
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-neutral-800/50">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center"
                    >
                      <Target className="w-5 h-5 text-blue-400" />
                    </motion.div>
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        Skills & Interests
                      </h2>
                      <p className="text-xs text-neutral-500">
                        What are you focused on?
                      </p>
                    </div>
                  </div>

                  {/* Profile Preview */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="relative overflow-hidden bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 rounded-xl p-4 border border-neutral-700/30">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
                      <div className="relative flex items-center gap-4">
                        {photoPreview ? (
                          <div className="w-12 h-12 rounded-xl overflow-hidden">
                            <img
                              src={photoPreview}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <User className="w-6 h-6 text-white" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white text-sm truncate">
                            {formData.fullName}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">
                              {getRoleLabel(formData.primaryRole)}
                            </span>
                          </div>
                        </div>
                        <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-400" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <InputField
                    label="Primary Skill / Focus Area"
                    name="primarySkill"
                    placeholder="Product, Growth, Tech, Finance"
                    value={formData.primarySkill}
                    onChange={handleChange}
                    error={errors.primarySkill}
                    icon={Sparkles}
                    required
                    delay={0.15}
                  />

                  <SelectField
                    label="Industry Interest"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    error={errors.industry}
                    options={industryOptions}
                    placeholder="Select industry"
                    icon={Building2}
                    required
                    delay={0.2}
                  />

                  <InputField
                    label="Location"
                    name="location"
                    placeholder="City / Country"
                    value={formData.location}
                    onChange={handleChange}
                    icon={MapPin}
                    delay={0.25}
                  />
                </motion.div>
              )}

              {/* ==================== STEP 3 ==================== */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-neutral-800/50">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center"
                    >
                      <Shield className="w-5 h-5 text-green-400" />
                    </motion.div>
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        Review & Confirm
                      </h2>
                      <p className="text-xs text-neutral-500">
                        Verify your details before submitting
                      </p>
                    </div>
                  </div>

                  {/* Final Profile Preview */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="relative overflow-hidden bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 rounded-xl p-5 border border-neutral-700/30">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
                      <div className="relative space-y-4">
                        <div className="flex items-center gap-4">
                          {photoPreview ? (
                            <div className="w-14 h-14 rounded-xl overflow-hidden">
                              <img
                                src={photoPreview}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                              <User className="w-7 h-7 text-white" />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="font-semibold text-white text-lg">
                              {formData.fullName}
                            </p>
                            <p className="text-sm bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">
                              {getRoleLabel(formData.primaryRole)}
                            </p>
                          </div>
                          <a
                            href={formData.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 text-blue-400" />
                          </a>
                        </div>

                        <div className="h-px bg-neutral-700/30" />

                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-neutral-500 block mb-1 flex items-center gap-1.5">
                              <Linkedin className="w-3 h-3" />
                              LinkedIn
                            </span>
                            <p className="text-neutral-300 truncate">
                              {formData.linkedinUrl}
                            </p>
                          </div>
                          <div>
                            <span className="text-neutral-500 block mb-1 flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3" />
                              Primary Skill
                            </span>
                            <p className="text-neutral-300">
                              {formData.primarySkill}
                            </p>
                          </div>
                          <div>
                            <span className="text-neutral-500 block mb-1 flex items-center gap-1.5">
                              <Building2 className="w-3 h-3" />
                              Industry
                            </span>
                            <p className="text-neutral-300">
                              {getIndustryLabel(formData.industry)}
                            </p>
                          </div>
                          <div>
                            <span className="text-neutral-500 block mb-1 flex items-center gap-1.5">
                              <MapPin className="w-3 h-3" />
                              Location
                            </span>
                            <p className="text-neutral-300">
                              {formData.location || "Not specified"}
                            </p>
                          </div>
                        </div>

                        {profilePhoto && (
                          <>
                            <div className="h-px bg-neutral-700/30" />
                            <div className="flex items-center gap-2 text-xs text-green-400">
                              <Camera className="w-3 h-3" />
                              <span>Photo: {profilePhoto.name}</span>
                              <span className="text-neutral-500">
                                ({(profilePhoto.size / 1024).toFixed(1)} KB)
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-3"
                  >
                    <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
                      Community Guidelines
                    </p>
                    <div className="relative overflow-hidden bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 rounded-xl p-4 border border-neutral-700/30">
                      <div className="space-y-2.5">
                        {coworkingTerms.map((term, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.08 }}
                            className="flex items-start gap-2.5"
                          >
                            <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex-shrink-0" />
                            <span className="text-xs text-neutral-400 leading-relaxed">
                              {term}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Terms Consent Checkbox */}
                  <motion.label
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    htmlFor="termsConsent"
                    className={`flex items-start gap-3 p-4 sm:p-3.5 rounded-xl border cursor-pointer transition-all duration-300 group/check ${
                      formData.termsConsent
                        ? "border-purple-500/30 bg-purple-500/5"
                        : "border-neutral-800/50 hover:border-neutral-700/50 hover:bg-neutral-800/20"
                    }`}
                  >
                    <div className="relative mt-0.5 flex-shrink-0">
                      <input
                        type="checkbox"
                        id="termsConsent"
                        name="termsConsent"
                        checked={formData.termsConsent}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                          formData.termsConsent
                            ? "bg-gradient-to-br from-purple-600 to-pink-600 border-purple-500 shadow-lg shadow-purple-500/20"
                            : "border-neutral-600 bg-neutral-900/50 group-hover/check:border-purple-500/50"
                        }`}
                      >
                        {formData.termsConsent && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                          >
                            <Check className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-neutral-300 leading-relaxed">
                      I agree to the Community Guidelines and understand my
                      profile will be visible to other members.
                    </span>
                  </motion.label>

                  <AnimatePresence>
                    {errors.termsConsent && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-red-400 text-xs flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-3 h-3" />{" "}
                        {errors.termsConsent}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between pt-6 mt-6 border-t border-neutral-800/30"
            >
              {step > 1 ? (
                <motion.button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative overflow-hidden rounded-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative px-5 py-3 border border-neutral-700/50 rounded-xl text-neutral-300 hover:text-white hover:border-purple-500/30 transition-all duration-300 flex items-center gap-2 text-sm font-medium">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
                    Back
                  </div>
                </motion.button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative overflow-hidden rounded-xl shadow-xl shadow-purple-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />
                  <span className="relative px-6 py-3 font-semibold text-white text-sm flex items-center gap-2">
                    Continue
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </span>
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.03 }}
                  whileTap={{ scale: submitting ? 1 : 0.97 }}
                  className="group relative overflow-hidden rounded-xl shadow-xl shadow-purple-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />
                  <span className="relative px-6 py-3 font-semibold text-white text-sm flex items-center gap-2">
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4" />
                        Submit Profile
                      </>
                    )}
                  </span>
                </motion.button>
              )}
            </motion.div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};
export default CoworkingForm;