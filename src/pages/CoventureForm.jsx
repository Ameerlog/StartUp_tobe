import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  X,
  Check,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
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
  ArrowRight,
  Mail,
  Phone,
  Globe,
  IndianRupee,
  Shield,
  FileText,
  Handshake,
  Star,
  Award,
  Lock,
} from 'lucide-react';
import {
  industryCategories,
  equityConsentTerms,
  formSteps,
  initialFormData,
  validationRules,
} from '../constants/coventure';

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

const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
      animate={{
        x: [0, 50, -30, 0],
        y: [0, -60, 30, 0],
        scale: [1, 1.2, 0.8, 1],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
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
        ease: 'easeInOut',
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
        ease: 'easeInOut',
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
          filter: 'blur(0.5px)',
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
          ease: 'easeInOut',
        }}
      />
    ))}
  </>
);

const GlassCard = ({
  children,
  className = '',
  glowColor = 'from-purple-600/30 to-blue-600/30',
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
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
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
      {label}{' '}
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
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3.5 bg-neutral-900/80 border rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 text-sm backdrop-blur-sm ${
            error && touched
              ? 'border-red-500/60 focus:border-red-500/60 focus:ring-red-500/30'
              : 'border-neutral-800/60'
          }`}
        />
      </div>
    </div>
    <AnimatePresence>
      {error && touched && (
        <motion.p
          initial={{ opacity: 0, y: -5, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -5, height: 0 }}
          className="text-red-400 text-xs mt-2 flex items-center gap-1.5"
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0" /> {error}
        </motion.p>
      )}
    </AnimatePresence>
  </motion.div>
);

const CoVentureBrandListingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentStep]);

  const validateField = (name, value) => {
    switch (name) {
      case 'brandName':
        if (!value?.trim()) return 'Brand name is required';
        if (value.length < 2) return 'Must be at least 2 characters';
        if (value.length > 100) return 'Must not exceed 100 characters';
        return '';
      case 'brandLogo':
        if (value) {
          if (value.size > validationRules.brandLogo.maxSize)
            return 'File must be under 5 MB';
          if (!validationRules.brandLogo.acceptedFormats.includes(value.type))
            return 'Only PNG, JPG, SVG allowed';
        }
        return '';
      case 'websiteDomain':
        if (!value?.trim()) return 'Website is required';
        if (!validationRules.websiteDomain.pattern.test(value))
          return 'Enter a valid URL';
        return '';
      case 'industryCategory':
        if (!value) return 'Please select a category';
        return '';
      case 'coVenturePrice':
        if (!value?.trim()) return 'Price is required';
        const numValue = parseFloat(value.replace(/[₹,]/g, ''));
        if (isNaN(numValue) || numValue <= 0) return 'Enter a valid amount';
        return '';
      case 'contactEmail':
        if (!value?.trim()) return 'Email is required';
        if (!validationRules.contactEmail.pattern.test(value))
          return 'Enter a valid email';
        return '';
      case 'contactNumber':
        if (!value?.trim()) return 'Phone number is required';
        if (!validationRules.contactNumber.pattern.test(value))
          return 'Enter valid 10-digit number';
        return '';
      case 'equityConsentAgreed':
        if (!value) return 'You must agree to proceed';
        return '';
      default:
        return '';
    }
  };

  const validateStep = (step) => {
    const stepFields = {
      1: ['brandName', 'websiteDomain', 'industryCategory', 'coVenturePrice'],
      2: ['contactEmail', 'contactNumber'],
      3: ['equityConsentAgreed'],
    };
    const fieldsToValidate = stepFields[step] || [];
    const newErrors = {};
    const newTouched = {};
    fieldsToValidate.forEach((field) => {
      newTouched[field] = true;
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setTouched((prev) => ({ ...prev, ...newTouched }));
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleIndustrySelect = (value) => {
    setFormData((prev) => ({ ...prev, industryCategory: value }));
    setTouched((prev) => ({ ...prev, industryCategory: true }));
    setErrors((prev) => ({ ...prev, industryCategory: '' }));
  };

  const handleFileChange = (file) => {
    if (!file) return;
    const error = validateField('brandLogo', file);
    if (error) {
      setErrors((prev) => ({ ...prev, brandLogo: error }));
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result);
    reader.readAsDataURL(file);
    setFormData((prev) => ({ ...prev, brandLogo: file }));
    setErrors((prev) => ({ ...prev, brandLogo: '' }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveLogo = () => {
    setFormData((prev) => ({ ...prev, brandLogo: null }));
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatPrice = (value) => {
    const numericValue = value.replace(/[^\d.]/g, '');
    if (numericValue) {
      const parts = numericValue.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{2})+(?=\d{3})(?!\d))/g, ',');
      return '₹' + parts.join('.');
    }
    return '';
  };

  const handlePriceChange = (e) => {
    const formattedValue = formatPrice(e.target.value);
    setFormData((prev) => ({ ...prev, coVenturePrice: formattedValue }));
    if (touched.coVenturePrice) {
      const error = validateField('coVenturePrice', formattedValue);
      setErrors((prev) => ({ ...prev, coVenturePrice: error }));
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateStep(3)) return;
  setIsSubmitting(true);
  try {
    let logoBase64 = null;

    if (formData.brandLogo) {
      logoBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(formData.brandLogo);
      });
    }

    const payload = {
      brandDetails: {
        brandName: formData.brandName,
        brandLogo: logoBase64,
        websiteDomain: formData.websiteDomain,
        industryCategory: formData.industryCategory,
        coVenturePrice: formData.coVenturePrice,
      },
      contactInfo: {
        contactEmail: formData.contactEmail,
        contactNumber: formData.contactNumber,
      },
      agreement: {
        equityConsentAgreed: formData.equityConsentAgreed,
      },
    };

    const response = await fetch(
      'http://192.168.29.184:8080/api/createCoBranding',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Submission failed');
    }

    const data = await response.json();
    console.log('Success:', data);
    setSubmitSuccess(true);
  } catch (error) {
    console.error('Submission error:', error);
    alert(error.message || 'Something went wrong');
  } finally {
    setIsSubmitting(false);
  }
};
  const getIcon = (iconName) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  const completionPercentage = ((currentStep - 1) / 3) * 100;

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
        <AnimatedBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="relative z-10 max-w-lg w-full"
        >
          <GlassCard glowColor="from-green-600/40 to-emerald-600/40">
            <div className="p-8 sm:p-12 text-center relative overflow-hidden">
              <FloatingParticles count={6} />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="relative mx-auto mb-6"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/30">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 bg-green-500/20 rounded-2xl blur-xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
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
                  Application
                </span>{' '}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Submitted!
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-neutral-400 text-sm sm:text-base mb-4 max-w-sm mx-auto"
              >
                Thank you for listing{' '}
                <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {formData.brandName}
                </span>
                . We'll contact you within 24-48 hours.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-4 px-5 py-3 bg-neutral-800/40 border border-neutral-700/30 rounded-xl text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-neutral-300">
                      {formData.contactEmail}
                    </span>
                  </div>
                  <div className="w-px h-4 bg-neutral-700" />
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-neutral-300">
                      {formData.contactNumber}
                    </span>
                  </div>
                </div>
              </motion.div>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSubmitSuccess(false);
                  setFormData(initialFormData);
                  setLogoPreview(null);
                  setCurrentStep(1);
                  setTouched({});
                  setErrors({});
                }}
                className="group relative overflow-hidden rounded-full inline-flex items-center gap-2 shadow-2xl shadow-purple-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />
                <span className="relative px-8 py-3.5 font-semibold text-white text-sm flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Submit Another Brand
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
            <Handshake className="w-4 h-4 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Co-Venture Program
            </span>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              List Your
            </span>{' '}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              Brand
            </span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md mx-auto">
            Partner with us through our co-venture program and unlock unlimited
            growth potential
          </p>
          <motion.div
            className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
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
              ease: 'easeInOut',
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
            {formSteps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const StepIcon = stepIcons[step.id] || Building2;
              return (
                <div key={step.id} className="flex items-center flex-1">
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
                            ease: 'easeInOut',
                          }}
                        />
                      )}
                      <div
                        className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-sm font-semibold border-2 transition-all duration-500 ${
                          isCompleted
                            ? 'bg-gradient-to-br from-purple-600 to-pink-600 border-purple-500 text-white shadow-lg shadow-purple-500/30'
                            : isActive
                              ? 'border-purple-500 bg-purple-500/10 text-white shadow-lg shadow-purple-500/20'
                              : 'border-neutral-700 bg-neutral-900/50 text-neutral-500'
                        }`}
                      >
                        {isCompleted ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring' }}
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
                          ? 'text-white'
                          : 'text-neutral-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < formSteps.length - 1 && (
                    <div className="flex-1 mx-2 sm:mx-4 mt-[-20px]">
                      <div className="h-[2px] w-full bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                          initial={{ width: '0%' }}
                          animate={{ width: isCompleted ? '100%' : '0%' }}
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
                initial={{ width: '0%' }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-neutral-500">
                Step {currentStep} of 3
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
              {currentStep === 1 && (
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
                      <Building2 className="w-5 h-5 text-purple-400" />
                    </motion.div>
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        Brand Details
                      </h2>
                      <p className="text-xs text-neutral-500">
                        Tell us about your brand
                      </p>
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
                    delay={0.05}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Brand Logo
                    </label>
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative overflow-hidden border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 group ${
                        dragActive
                          ? 'border-purple-500 bg-purple-500/5'
                          : 'border-neutral-700/60 hover:border-purple-500/50 hover:bg-neutral-800/30'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500" />
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => handleFileChange(e.target.files?.[0])}
                        accept=".png,.jpg,.jpeg,.svg"
                        className="hidden"
                      />
                      {logoPreview ? (
                        <div className="relative inline-block">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative"
                          >
                            <img
                              src={logoPreview}
                              alt="Logo"
                              className="max-w-[120px] max-h-[80px] rounded-lg border border-neutral-700/50 shadow-lg"
                            />
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveLogo();
                              }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-red-500/30"
                            >
                              <X className="w-3 h-3" />
                            </motion.button>
                          </motion.div>
                        </div>
                      ) : (
                        <div className="relative z-10">
                          <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Upload className="w-5 h-5 text-purple-400" />
                          </div>
                          <p className="text-sm text-neutral-400 mb-1">
                            Drop your logo or{' '}
                            <span className="text-purple-400 font-medium">
                              click to upload
                            </span>
                          </p>
                          <p className="text-xs text-neutral-500">
                            PNG, JPG, SVG • Max 5MB
                          </p>
                        </div>
                      )}
                    </div>
                    <AnimatePresence>
                      {errors.brandLogo && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-red-400 text-xs mt-2 flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3 h-3" />{' '}
                          {errors.brandLogo}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <InputField
                    label="Website / Domain"
                    name="websiteDomain"
                    placeholder="www.example.com"
                    value={formData.websiteDomain}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={errors.websiteDomain}
                    touched={touched.websiteDomain}
                    icon={Globe}
                    required
                    delay={0.15}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-neutral-300 mb-3">
                      Industry Category{' '}
                      <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                        *
                      </span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {industryCategories.slice(1).map((cat, catIdx) => {
                        const isSelected =
                          formData.industryCategory === cat.value;
                        return (
                          <motion.button
                            key={cat.value}
                            type="button"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 + catIdx * 0.04 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleIndustrySelect(cat.value)}
                            className={`relative overflow-hidden p-3 border rounded-xl text-xs font-medium transition-all duration-300 ${
                              isSelected
                                ? 'border-purple-500/60 bg-purple-500/10 text-white shadow-lg shadow-purple-500/10'
                                : 'border-neutral-800/60 text-neutral-400 hover:border-purple-500/30 hover:bg-neutral-800/30'
                            }`}
                          >
                            {isSelected && (
                              <motion.div
                                layoutId="industryHighlight"
                                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                                transition={{ duration: 0.3 }}
                              />
                            )}
                            <div className="relative flex items-center justify-center gap-2">
                              <span
                                className={
                                  isSelected
                                    ? 'text-purple-400'
                                    : 'text-neutral-500'
                                }
                              >
                                {getIcon(cat.icon)}
                              </span>
                              <span>{cat.label}</span>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute -top-1 -right-1"
                                >
                                  <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <Check className="w-2.5 h-2.5 text-white" />
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                    <AnimatePresence>
                      {errors.industryCategory &&
                        touched.industryCategory && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-red-400 text-xs mt-2 flex items-center gap-1.5"
                          >
                            <AlertCircle className="w-3 h-3" />{' '}
                            {errors.industryCategory}
                          </motion.p>
                        )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Deal Value{' '}
                      <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                        *
                      </span>
                    </label>
                    <div className="relative group">
                      <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/0 to-pink-500/0 rounded-xl opacity-0 group-focus-within:from-purple-500/30 group-focus-within:to-pink-500/30 group-focus-within:opacity-100 transition-all duration-500 blur-sm" />
                      <div className="relative">
                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-purple-400 transition-colors duration-300" />
                        <input
                          type="text"
                          name="coVenturePrice"
                          value={formData.coVenturePrice}
                          onChange={handlePriceChange}
                          onBlur={handleBlur}
                          placeholder="₹5,00,000"
                          className={`w-full pl-11 pr-4 py-3.5 bg-neutral-900/80 border rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 text-sm backdrop-blur-sm ${
                            errors.coVenturePrice && touched.coVenturePrice
                              ? 'border-red-500/60'
                              : 'border-neutral-800/60'
                          }`}
                        />
                      </div>
                    </div>
                    <AnimatePresence>
                      {errors.coVenturePrice && touched.coVenturePrice && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-red-400 text-xs mt-2 flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3 h-3" />{' '}
                          {errors.coVenturePrice}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )}

              {currentStep === 2 && (
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
                      <User className="w-5 h-5 text-blue-400" />
                    </motion.div>
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        Contact Information
                      </h2>
                      <p className="text-xs text-neutral-500">
                        How can we reach you?
                      </p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="relative overflow-hidden bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 rounded-xl p-4 border border-neutral-700/30">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
                      <div className="relative flex items-center gap-4">
                        {logoPreview ? (
                          <img
                            src={logoPreview}
                            alt="Brand"
                            className="w-12 h-12 rounded-xl object-cover border border-neutral-700/50"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                            <span className="text-white font-bold text-lg">
                              {formData.brandName?.[0]?.toUpperCase() || 'B'}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white text-sm truncate">
                            {formData.brandName}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">
                              {formData.coVenturePrice}
                            </span>
                            <span className="text-neutral-600">•</span>
                            <span className="text-xs text-neutral-500 capitalize">
                              {formData.industryCategory}
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
                    label="Email Address"
                    name="contactEmail"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={errors.contactEmail}
                    touched={touched.contactEmail}
                    icon={Mail}
                    required
                    delay={0.15}
                  />

                  <InputField
                    label="Phone Number"
                    name="contactNumber"
                    placeholder="9876543210"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={errors.contactNumber}
                    touched={touched.contactNumber}
                    icon={Phone}
                    required
                    delay={0.2}
                  />
                </motion.div>
              )}

              {currentStep === 3 && (
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
                        Equity Consent
                      </h2>
                      <p className="text-xs text-neutral-500">
                        Review and agree to terms
                      </p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="relative overflow-hidden bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 rounded-xl p-5 border border-neutral-700/30">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
                      <div className="relative space-y-3">
                        <div className="flex items-center gap-3">
                          {logoPreview ? (
                            <img
                              src={logoPreview}
                              alt="Brand"
                              className="w-10 h-10 rounded-lg object-cover border border-neutral-700/50"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold">
                                {formData.brandName?.[0]?.toUpperCase() || 'B'}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-white text-sm">
                              {formData.brandName}
                            </p>
                            <p className="text-xs bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">
                              {formData.coVenturePrice}
                            </p>
                          </div>
                        </div>
                        <div className="h-px bg-neutral-700/30" />
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-neutral-500 block mb-0.5">
                              Email
                            </span>
                            <p className="text-neutral-300 truncate">
                              {formData.contactEmail}
                            </p>
                          </div>
                          <div>
                            <span className="text-neutral-500 block mb-0.5">
                              Phone
                            </span>
                            <p className="text-neutral-300">
                              {formData.contactNumber}
                            </p>
                          </div>
                          <div>
                            <span className="text-neutral-500 block mb-0.5">
                              Industry
                            </span>
                            <p className="text-neutral-300 capitalize">
                              {formData.industryCategory}
                            </p>
                          </div>
                          <div>
                            <span className="text-neutral-500 block mb-0.5">
                              Website
                            </span>
                            <p className="text-neutral-300 truncate">
                              {formData.websiteDomain}
                            </p>
                          </div>
                        </div>
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
                      Terms & Conditions
                    </p>
                    {equityConsentTerms.map((term, idx) => (
                      <motion.label
                        key={term.id || idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-300 group/check ${
                          formData.equityConsentAgreed
                            ? 'border-purple-500/30 bg-purple-500/5'
                            : 'border-neutral-800/50 hover:border-neutral-700/50 hover:bg-neutral-800/20'
                        }`}
                      >
                        <div className="relative mt-0.5 flex-shrink-0">
                          <input
                            type="checkbox"
                            name="equityConsentAgreed"
                            checked={formData.equityConsentAgreed}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                              formData.equityConsentAgreed
                                ? 'bg-gradient-to-br from-purple-600 to-pink-600 border-purple-500 shadow-lg shadow-purple-500/20'
                                : 'border-neutral-600 bg-neutral-900/50 group-hover/check:border-purple-500/50'
                            }`}
                          >
                            {formData.equityConsentAgreed && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring' }}
                              >
                                <Check className="w-3 h-3 text-white" />
                              </motion.div>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <span className="text-sm text-white font-medium leading-relaxed block">
                            {term.title}
                          </span>
                          {term.description && (
                            <span className="text-xs text-neutral-400 leading-relaxed mt-1 block">
                              {term.description}
                            </span>
                          )}
                        </div>
                      </motion.label>
                    ))}
                  </motion.div>

                  <AnimatePresence>
                    {errors.equityConsentAgreed && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-red-400 text-xs flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-3 h-3" />{' '}
                        {errors.equityConsentAgreed}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between pt-6 mt-6 border-t border-neutral-800/30"
            >
              {currentStep > 1 ? (
                <motion.button
                  type="button"
                  onClick={prevStep}
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

              {currentStep < 3 ? (
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
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                  className="group relative overflow-hidden rounded-xl shadow-xl shadow-purple-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />
                  <span className="relative px-6 py-3 font-semibold text-white text-sm flex items-center gap-2">
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
                  </span>
                </motion.button>
              )}
            </motion.div>
          </form>
        </GlassCard>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:gap-8"
        >
          {[
            { icon: Lock, text: 'Secure & Encrypted', color: 'text-green-500' },
            { icon: FileText, text: 'NDA Protected', color: 'text-blue-500' },
            { icon: Award, text: '500+ Partners', color: 'text-purple-500' },
            { icon: Star, text: '4.9/5 Rating', color: 'text-amber-500' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="flex items-center gap-1.5 text-neutral-500 text-xs"
            >
              <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
              <span>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CoVentureBrandListingForm;