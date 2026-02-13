import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  Check,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Rocket,
  Cloud,
  ShoppingCart,
  Briefcase,
  Bot,
  Landmark,
  MoreHorizontal,
  Layers,
  User,
  FileCheck,
  Building2,
  Sparkles,
  Mail,
  Phone,
  Globe,
  IndianRupee,
  Handshake,
} from "lucide-react";
import {
  industryCategories,
  formSteps,
  initialFormData,
  validationRules,
  equityStructureOptions,
  INDUSTRY_MAP,
} from "../constants/coventure";

// Icon mapping
const iconMap = {
  Cloud,
  ShoppingCart,
  Briefcase,
  Bot,
  Landmark,
  MoreHorizontal,
  Layers,
  Building2,
  User,
  FileCheck,
};

const stepIcons = {
  1: Building2,
  2: User,
  3: FileCheck,
};




// Helper function
const getRatioParts = (equityValue) => {
  const option = equityStructureOptions.find((opt) => opt.value === equityValue);
  if (!option || option.value === "NEGOTIABLE") return null;
  const parts = option.ratio.split(":");
  return {
    yourShare: parseInt(parts[0], 10),
    partnerShare: parseInt(parts[1], 10),
  };
};


const API_BASE_URL = "http://192.168.29.184:8080/api";

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
      transition={{ duration: 8, delay: 2, repeat: Infinity, ease: "easeInOut" }}
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
        }}
        animate={{ y: [0, -40, 0], opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
        transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.5 }}
      />
    ))}
  </>
);


const GlassCard = ({ children, className = "", glowColor = "from-purple-600/30 to-blue-600/30" }) => (
  <div className={`relative group ${className}`}>
    <div className={`absolute -inset-0.5 bg-gradient-to-r ${glowColor} rounded-2xl blur-lg opacity-0 group-hover:opacity-70 transition duration-500`} />
    <div className="relative bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-xl border border-neutral-800/50 rounded-2xl transition-all duration-300 h-full">
      {children}
    </div>
  </div>
);

const InputField = ({ label, name, type = "text", placeholder, value, onChange, onBlur, error, touched, icon: Icon, required = false, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
  >
    <label className="block text-sm font-medium text-neutral-300 mb-2">
      {label} {required && <span className="text-pink-500">*</span>}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full ${Icon ? "pl-11" : "pl-4"} pr-4 py-3.5 bg-neutral-900/80 border rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 transition-all text-sm ${
          error && touched ? "border-red-500/60" : "border-neutral-800/60"
        }`}
      />
    </div>
    {error && touched && (
      <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
        <AlertCircle className="w-3 h-3" /> {error}
      </p>
    )}
  </motion.div>
);


const EquityDropdown = ({ value, onChange, error, options, placeholder, label, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      ref={dropdownRef}
      className="relative"
    >
      {label && (
        <label className="block text-sm font-medium text-neutral-300 mb-2">
          {label} {required && <span className="text-pink-500">*</span>}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3.5 bg-neutral-900/80 border rounded-xl text-left flex items-center justify-between transition-all ${
          isOpen ? "border-purple-500/50 ring-2 ring-purple-500/20" : error ? "border-red-500/60" : "border-neutral-800/60 hover:border-purple-500/30"
        }`}
      >
        <div className="flex items-center gap-3">
          {selectedOption ? (
            <>
              
              <div>
                <span className="text-sm text-white font-medium">{selectedOption.label}</span>
                <span className="text-xs text-neutral-500 ml-2">— {selectedOption.description}</span>
              </div>
            </>
          ) : (
            <span className="text-sm text-neutral-500">{placeholder}</span>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180 text-purple-400" : "text-neutral-500"}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-neutral-900/98 backdrop-blur-xl border border-neutral-700/50 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="max-h-72 overflow-y-auto">
              {options.map((option) => {
                const isSelected = value === option.value;
                const isNegotiable = option.value === "NEGOTIABLE";

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all ${
                      isSelected ? (isNegotiable ? "bg-yellow-500/10" : "bg-purple-500/10") : "hover:bg-neutral-800/50"
                    } ${isNegotiable ? "border-t border-neutral-800/50" : ""}`}
                  >
                    <span className="text-lg">{option.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${isSelected ? (isNegotiable ? "text-yellow-400" : "text-purple-400") : "text-white"}`}>
                          {option.label}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${isNegotiable ? "bg-yellow-500/20 text-yellow-400" : "bg-neutral-800 text-neutral-400"}`}>
                          {option.ratio}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">{option.description}</p>
                    </div>
                    {isSelected && (
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isNegotiable ? "bg-yellow-500" : "bg-purple-500"}`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </motion.div>
  );
};

const CoVentureBrandListingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    ...initialFormData,
    brandDescription: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);


  const [jointVentureChecked, setJointVentureChecked] = useState(false);
  const [verificationChecked, setVerificationChecked] = useState(false);
  const [equityStructure, setEquityStructure] = useState("");

  const [brands, setBrands] = useState([]);

  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentStep]);


  const fetchAllBrands = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/ListAllBrands`);
      if (response.ok) {
        const data = await response.json();
        setBrands(data);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchAllBrands();
  }, []);


  const validateField = (name, value) => {
    switch (name) {
      case "brandName":
        if (!value?.trim()) return "Brand name is required";
        if (value.length < 2) return "Must be at least 2 characters";
        return "";
      case "websiteDomain":
        if (!value?.trim()) return "Website is required";
        if (!validationRules.websiteDomain.pattern.test(value)) return "Enter a valid URL";
        return "";
      case "industryCategory":
        if (!value) return "Please select a category";
        return "";
      case "coVenturePrice":
        if (!value?.trim()) return "Price is required";
        const numValue = parseFloat(value.replace(/[₹,]/g, ""));
        if (isNaN(numValue) || numValue <= 0) return "Enter a valid amount";
        return "";
      case "contactEmail":
        if (!value?.trim()) return "Email is required";
        if (!validationRules.contactEmail.pattern.test(value)) return "Enter a valid email";
        return "";
      case "contactNumber":
        if (!value?.trim()) return "Phone number is required";
        if (!validationRules.contactNumber.pattern.test(value)) return "Enter valid 10-digit number";
        return "";
      case "terms":
        if (!value) return "You must agree to proceed";
        return "";
      case "jointVenture":
        if (!value) return "You must agree to the platform success fee";
        return "";
      case "verification":
        if (!value) return "You must verify ownership rights";
        return "";
      case "equityStructure":
        if (!value) return "Please select an equity structure";
        return "";
      default:
        return "";
    }
  };

  const validateStep = (step) => {
    const stepFields = {
      1: ["brandName", "websiteDomain", "industryCategory", "coVenturePrice"],
      2: ["contactEmail", "contactNumber"],
      3: ["terms", "jointVenture", "verification"],
    };

    const fieldsToValidate = stepFields[step] || [];
    const newErrors = {};
    const newTouched = {};

    fieldsToValidate.forEach((field) => {
      newTouched[field] = true;
      let error = "";

      if (field === "jointVenture") {
        error = validateField(field, jointVentureChecked);
      } else if (field === "verification") {
        error = validateField(field, verificationChecked);
      } else {
        error = validateField(field, formData[field]);
      }

      if (error) newErrors[field] = error;
    });

    if (step === 3 && jointVentureChecked && verificationChecked && !equityStructure) {
      newErrors.equityStructure = "Please select an equity structure";
    }

    setTouched((prev) => ({ ...prev, ...newTouched }));
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, newValue) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleIndustrySelect = (value) => {
    setFormData((prev) => ({ ...prev, industryCategory: value }));
    setTouched((prev) => ({ ...prev, industryCategory: true }));
    setErrors((prev) => ({ ...prev, industryCategory: "" }));
  };

  const handleEquitySelect = (value) => {
    setEquityStructure(value);
    setErrors((prev) => ({ ...prev, equityStructure: "" }));
  };

  const handleFileChange = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, brandLogo: "File must be under 5 MB" }));
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result);
    reader.readAsDataURL(file);
    setFormData((prev) => ({ ...prev, brandLogo: file }));
    setErrors((prev) => ({ ...prev, brandLogo: "" }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFileChange(e.dataTransfer.files[0]);
  };

  const handleRemoveLogo = () => {
    setFormData((prev) => ({ ...prev, brandLogo: null }));
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatPrice = (value) => {
    const numericValue = value.replace(/[^\d.]/g, "");
    if (numericValue) {
      const parts = numericValue.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{2})+(?=\d{3})(?!\d))/g, ",");
      return "₹" + parts.join(".");
    }
    return "";
  };

  const handlePriceChange = (e) => {
    const formattedValue = formatPrice(e.target.value);
    setFormData((prev) => ({ ...prev, coVenturePrice: formattedValue }));
    if (touched.coVenturePrice) {
      setErrors((prev) => ({ ...prev, coVenturePrice: validateField("coVenturePrice", formattedValue) }));
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    setIsSubmitting(true);

    try {
    
      const priceString = formData.coVenturePrice.replace(/[₹,]/g, "");
      const dealValue = parseInt(priceString, 10) || 0;

      const mappedIndustry = INDUSTRY_MAP[formData.industryCategory?.toLowerCase()] || "OTHER";

      const dataPayload = {
  
        brandDetails: {
          brandName: formData.brandName,
          website: formData.websiteDomain,
          industry: mappedIndustry,
          dealValue: dealValue,
          description: formData.brandDescription || "",
          ventureType: equityStructure || null, 
        },

        contactInfo: {
          email: formData.contactEmail,
          phoneNumber: formData.contactNumber,
        },

        agreement: {
          termsAccepted: formData.terms || false,
          jointVentureAccepted: jointVentureChecked,
          platformSuccessFeeAccepted: jointVentureChecked,
          platformSuccessFeePercentage: jointVentureChecked ? 3 : 0,
          verificationAccepted: verificationChecked,
          ownershipCertified: verificationChecked,
          globalGridDisplayAuthorized: verificationChecked,
        },

     
        submittedAt: new Date().toISOString(),
      };

    
      console.log("=== SUBMISSION DATA (NESTED) ===");
      console.log("Payload:", JSON.stringify(dataPayload, null, 2));
      console.log("================================");

 
      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(dataPayload));

   
      if (formData.brandLogo) {
        formDataToSend.append("logo", formData.brandLogo);
        console.log("Logo attached:", formData.brandLogo.name);
      }

 
      const response = await fetch(`${API_BASE_URL}/createCoBranding`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Submission failed");
      }

      const responseData = await response.json();
      console.log("Success Response:", responseData);

    
      setSubmittedData(responseData);
      setSubmitSuccess(true);
      fetchAllBrands();

    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const resetForm = () => {
    setSubmitSuccess(false);
    setSubmittedData(null);
    setFormData({
      ...initialFormData,
      brandDescription: "",
      terms: false,
    });
    setLogoPreview(null);
    setCurrentStep(1);
    setTouched({});
    setErrors({});
    setJointVentureChecked(false);
    setVerificationChecked(false);
    setEquityStructure("");
  };

  const getIcon = (iconName) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  const completionPercentage = ((currentStep - 1) / 3) * 100;


  if (submitSuccess) {
    const selectedEquityOption = equityStructureOptions.find((opt) => opt.value === equityStructure);
    
  
    const brandName = submittedData?.brandDetails?.brandName || formData.brandName;
    const email = submittedData?.contactInfo?.email || formData.contactEmail;
    const phone = submittedData?.contactInfo?.phoneNumber || formData.contactNumber;
    const logoUrl = submittedData?.brandDetails?.logoUrl;
    const ventureType = submittedData?.brandDetails?.ventureType || equityStructure;

    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <AnimatedBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 max-w-lg w-full"
        >
          <GlassCard glowColor="from-green-600/40 to-emerald-600/40">
            <div className="p-8 sm:p-12 text-center">
              <FloatingParticles count={6} />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                <span className="text-white">Application </span>
                <span className="text-green-400">Submitted!</span>
              </h2>

              <p className="text-neutral-400 text-sm mb-4">
                Thank you for listing{" "}
                <span className="text-purple-400 font-semibold">{brandName}</span>.
                We'll contact you within 24-48 hours.
              </p>

              {logoUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-4"
                >
                  <img 
                    src={logoUrl} 
                    alt="Brand Logo" 
                    className="w-20 h-20 mx-auto rounded-xl object-cover border border-neutral-700"
                  />
                </motion.div>
              )}

              {ventureType && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-xs"
                >
                  <span className="text-lg">{selectedEquityOption?.icon || "📊"}</span>
                  <span className="text-neutral-300">
                    Equity: <span className="text-purple-400 font-medium">
                      {selectedEquityOption?.label || ventureType}
                    </span>
                  </span>
                </motion.div>
              )}

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8 inline-flex items-center gap-4 px-5 py-3 bg-neutral-800/40 border border-neutral-700/30 rounded-xl text-xs"
              >
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-neutral-300">{email}</span>
                </div>
                {phone && (
                  <>
                    <div className="w-px h-4 bg-neutral-700" />
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-neutral-300">{phone}</span>
                    </div>
                  </>
                )}
              </motion.div>

              {/* Show ID */}
              {submittedData?.id && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xs text-neutral-500 mb-4"
                >
                  Reference ID: <span className="text-neutral-400 font-mono">{submittedData.id}</span>
                </motion.p>
              )}

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetForm}
                className="relative overflow-hidden rounded-full px-8 py-3.5 font-semibold text-white text-sm bg-gradient-to-r from-purple-600 to-pink-600"
              >
                <Rocket className="w-4 h-4 inline mr-2" />
                Submit Another Brand
              </motion.button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={formRef} className="min-h-screen bg-black pt-24 sm:pt-28 pb-12 sm:pb-16 px-4">
      <AnimatedBackground />

      <div className="relative z-10 max-w-2xl mx-auto">
    
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-10"
        >
          <FloatingParticles count={6} />

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-5">
            <Handshake className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">Co-Venture Program</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            <span className="text-white">List Your </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Brand</span>
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base max-w-md mx-auto">
            Partner with us through our co-venture program
          </p>
        </motion.div>

    
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {formSteps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const StepIcon = stepIcons[step.id] || Building2;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border-2 transition-all ${
                        isCompleted
                          ? "bg-gradient-to-br from-purple-600 to-pink-600 border-purple-500 text-white"
                          : isActive
                          ? "border-purple-500 bg-purple-500/10 text-white"
                          : "border-neutral-700 bg-neutral-900/50 text-neutral-500"
                      }`}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${isActive || isCompleted ? "text-white" : "text-neutral-500"}`}>
                      {step.title}
                    </span>
                  </div>

                  {index < formSteps.length - 1 && (
                    <div className="flex-1 mx-2 sm:mx-4 mt-[-20px]">
                      <div className="h-[2px] w-full bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all ${isCompleted ? "w-full" : "w-0"}`}
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
              <div
                className="h-full bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 rounded-full transition-all"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] text-neutral-500">
              <span>Step {currentStep} of 3</span>
              <span>{Math.round(completionPercentage)}% complete</span>
            </div>
          </div>
        </motion.div>

        <GlassCard glowColor="from-purple-600/30 to-pink-600/30">
          <form onSubmit={handleSubmit} className="p-5 sm:p-8">
            <AnimatePresence mode="wait">
   
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-neutral-800/50">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">Brand Details</h2>
                      <p className="text-xs text-neutral-500">Tell us about your brand</p>
                    </div>
                  </div>

                  <InputField
                    label="Brand Name"
                    name="brandName"
                    placeholder="Enter your brand name"
                    value={formData.brandName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={errors.brandName}
                    touched={touched.brandName}
                    icon={Sparkles}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Brand Logo</label>
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                        dragActive ? "border-purple-500 bg-purple-500/5" : "border-neutral-700/60 hover:border-purple-500/50"
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => handleFileChange(e.target.files?.[0])}
                        accept=".png,.jpg,.jpeg,.svg"
                        className="hidden"
                      />
                      {logoPreview ? (
                        <div className="relative inline-block">
                          <img src={logoPreview} alt="Logo" className="max-w-[120px] max-h-[80px] rounded-lg" />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveLogo();
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                          <p className="text-sm text-neutral-400">
                            Drop your logo or <span className="text-purple-400">click to upload</span>
                          </p>
                          <p className="text-xs text-neutral-500">PNG, JPG, SVG • Max 5MB</p>
                        </div>
                      )}
                    </div>
                    {errors.brandLogo && (
                      <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3" /> {errors.brandLogo}
                      </p>
                    )}
                  </div>

                  <InputField
                    label="Website / Domain"
                    name="websiteDomain"
                    placeholder="https://www.example.com"
                    value={formData.websiteDomain}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={errors.websiteDomain}
                    touched={touched.websiteDomain}
                    icon={Globe}
                    required
                  />

              
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-3">
                      Industry Category <span className="text-pink-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {industryCategories.slice(1).map((cat) => {
                        const isSelected = formData.industryCategory === cat.value;
                        return (
                          <button
                            key={cat.value}
                            type="button"
                            onClick={() => handleIndustrySelect(cat.value)}
                            className={`relative p-3 border rounded-xl text-xs font-medium transition-all ${
                              isSelected
                                ? "border-purple-500/60 bg-purple-500/10 text-white"
                                : "border-neutral-800/60 text-neutral-400 hover:border-purple-500/30"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <span className={isSelected ? "text-purple-400" : "text-neutral-500"}>
                                {getIcon(cat.icon)}
                              </span>
                              <span>{cat.label}</span>
                              {isSelected && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                                  <Check className="w-2.5 h-2.5 text-white" />
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {errors.industryCategory && touched.industryCategory && (
                      <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3" /> {errors.industryCategory}
                      </p>
                    )}
                  </div>

                  {/* Deal Value */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Deal Value <span className="text-pink-500">*</span>
                    </label>
                    <div className="relative">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      <input
                        type="text"
                        name="coVenturePrice"
                        value={formData.coVenturePrice}
                        onChange={handlePriceChange}
                        onBlur={handleBlur}
                        placeholder="₹10,00,000"
                        className={`w-full pl-11 pr-4 py-3.5 bg-neutral-900/80 border rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 ${
                          errors.coVenturePrice && touched.coVenturePrice ? "border-red-500/60" : "border-neutral-800/60"
                        }`}
                      />
                    </div>
                    {errors.coVenturePrice && touched.coVenturePrice && (
                      <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3" /> {errors.coVenturePrice}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Brand Description <span className="text-neutral-500 text-xs">(Optional)</span>
                    </label>
                    <textarea
                      name="brandDescription"
                      value={formData.brandDescription}
                      onChange={handleInputChange}
                      placeholder="Tell us about your brand..."
                      rows={4}
                      className="w-full px-4 py-3.5 bg-neutral-900/80 border border-neutral-800/60 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 resize-none"
                    />
                    <div className="flex justify-end mt-1">
                      <span className="text-xs text-neutral-500">{formData.brandDescription?.length || 0}/500</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-neutral-800/50">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">Contact Information</h2>
                      <p className="text-xs text-neutral-500">How can we reach you?</p>
                    </div>
                  </div>

                  <InputField
                    label="Email Address"
                    name="contactEmail"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={errors.contactEmail}
                    touched={touched.contactEmail}
                    icon={Mail}
                    required
                  />

                  <InputField
                    label="Phone Number"
                    name="contactNumber"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={errors.contactNumber}
                    touched={touched.contactNumber}
                    icon={Phone}
                    required
                  />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-neutral-800/50">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <FileCheck className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">Terms & Agreement</h2>
                      <p className="text-xs text-neutral-500">Review and accept our terms</p>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        checked={jointVentureChecked}
                        onChange={(e) => {
                          setJointVentureChecked(e.target.checked);
                          if (!e.target.checked) setEquityStructure("");
                        }}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 border-2 rounded-md transition-all ${
                          jointVentureChecked
                            ? "bg-gradient-to-br from-purple-600 to-pink-600 border-purple-500"
                            : "border-neutral-700 bg-neutral-900/50"
                        }`}
                      >
                        {jointVentureChecked && <Check className="w-3 h-3 text-white mx-auto mt-0.5" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm text-neutral-300">
                        <span className="font-medium text-purple-400">For Joint Ventures:</span> I agree that for any capital raised
                        or partnership formed, a <span className="font-semibold text-yellow-400">3% Platform Success Fee</span> in
                        Equity or Cash will be assigned to CoBrother.
                      </span>
                      {errors.jointVenture && touched.jointVenture && (
                        <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
                          <AlertCircle className="w-3 h-3" /> {errors.jointVenture}
                        </p>
                      )}
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        checked={verificationChecked}
                        onChange={(e) => setVerificationChecked(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 border-2 rounded-md transition-all ${
                          verificationChecked
                            ? "bg-gradient-to-br from-purple-600 to-pink-600 border-purple-500"
                            : "border-neutral-700 bg-neutral-900/50"
                        }`}
                      >
                        {verificationChecked && <Check className="w-3 h-3 text-white mx-auto mt-0.5" />}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-neutral-300">
                        <span className="font-medium text-purple-400">Verification:</span> I certify that I own the rights to this
                        asset and authorize CoBrother to display this listing in the{" "}
                        <span className="font-semibold text-cyan-400">Global Grid</span>.
                      </span>
                      {errors.verification && touched.verification && (
                        <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
                          <AlertCircle className="w-3 h-3" /> {errors.verification}
                        </p>
                      )}
                    </div>
                  </label>

                  <AnimatePresence>
                    {jointVentureChecked && verificationChecked && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <EquityDropdown
                          label="Select Equity Structure"
                          required
                          value={equityStructure}
                          onChange={handleEquitySelect}
                          error={errors.equityStructure}
                          options={equityStructureOptions}
                          placeholder="Choose your preferred equity split"
                        />

                        {equityStructure && equityStructure !== "NEGOTIABLE" && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl"
                          >
                            {(() => {
                              const ratioParts = getRatioParts(equityStructure);
                              if (!ratioParts) return null;
                              return (
                                <div>
                                  <div className="flex justify-between text-xs text-neutral-400 mb-2">
                                    <span>Your Share ({ratioParts.yourShare}%)</span>
                                    <span>CoBrother ({ratioParts.partnerShare}%)</span>
                                  </div>
                                  <div className="h-3 bg-neutral-800 rounded-full overflow-hidden flex">
                                    <div
                                      className="bg-gradient-to-r from-purple-500 to-purple-600 transition-all"
                                      style={{ width: `${ratioParts.yourShare}%` }}
                                    />
                                    <div
                                      className="bg-gradient-to-r from-pink-500 to-pink-600 transition-all"
                                      style={{ width: `${ratioParts.partnerShare}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })()}
                          </motion.div>
                        )}

                        {equityStructure === "NEGOTIABLE" && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">🤝</span>
                              <div>
                                <p className="text-sm font-medium text-yellow-400">Custom Structure Request</p>
                                <p className="text-xs text-yellow-400/70">
                                  Our team will reach out to discuss a custom equity structure.
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="relative flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 border-2 rounded-md transition-all ${
                          formData.terms
                            ? "bg-gradient-to-br from-purple-600 to-pink-600 border-purple-500"
                            : "border-neutral-700 bg-neutral-900/50"
                        }`}
                      >
                        {formData.terms && <Check className="w-3 h-3 text-white mx-auto mt-0.5" />}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-neutral-300">
                        I agree to the <span className="text-purple-400 font-medium">Co-Venture Terms</span> and understand the
                        equity allocation structure
                      </span>
                      {errors.terms && touched.terms && (
                        <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
                          <AlertCircle className="w-3 h-3" /> {errors.terms}
                        </p>
                      )}
                    </div>
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-800/50">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-neutral-700/60 bg-neutral-900/50 text-neutral-300 text-sm font-medium hover:bg-neutral-800/50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-auto flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4" />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default CoVentureBrandListingForm;