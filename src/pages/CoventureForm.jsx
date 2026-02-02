// src/components/CoVentureForm.jsx

import { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Globe,
  Mail,
  Phone,
  IndianRupee,
  Building2,
  X,
  Check,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Shield,
  Cloud,
  ShoppingCart,
  Briefcase,
  Bot,
  Landmark,
  MoreHorizontal,
  Layers,
  User,
  FileCheck,
  Rocket,
} from 'lucide-react';
import {
  industryCategories,
  equityConsentTerms,
  formSteps,
  initialFormData,
  validationRules,
} from '../constants/coventure';


const iconMap = {
  Cloud, ShoppingCart, Briefcase, Bot, Landmark, MoreHorizontal, Layers,
  Building2, User, FileCheck,
};

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
          if (value.size > validationRules.brandLogo.maxSize) return 'File must be under 5 MB';
          if (!validationRules.brandLogo.acceptedFormats.includes(value.type)) {
            return 'Only PNG, JPG, SVG allowed';
          }
        }
        return '';
      case 'websiteDomain':
        if (!value?.trim()) return 'Website is required';
        if (!validationRules.websiteDomain.pattern.test(value)) return 'Enter a valid URL';
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
        if (!validationRules.contactEmail.pattern.test(value)) return 'Enter a valid email';
        return '';
      case 'contactNumber':
        if (!value?.trim()) return 'Phone number is required';
        if (!validationRules.contactNumber.pattern.test(value)) return 'Enter valid 10-digit number';
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
    if (touched.industryCategory) {
      setErrors((prev) => ({ ...prev, industryCategory: '' }));
    }
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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIcon = (iconName) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-black mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for listing <span className="font-medium text-black">{formData.brandName}</span>. 
            We'll contact you within 24-48 hours.
          </p>
          <button
            onClick={() => {
              setSubmitSuccess(false);
              setFormData(initialFormData);
              setLogoPreview(null);
              setCurrentStep(1);
              setTouched({});
              setErrors({});
            }}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Submit Another Brand
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={formRef} className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-black mb-1">List Your Brand</h1>
          <p className="text-gray-600 text-sm">Partner with us through our co-venture program</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {formSteps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${
                    isCompleted ? 'bg-black border-black text-white' :
                    isActive ? 'border-black text-black' :
                    'border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <span className={`text-xs mt-1 ${isActive || isCompleted ? 'text-black' : 'text-gray-400'}`}>
                    {step.title}
                  </span>
                </div>
                {index < formSteps.length - 1 && (
                  <div className={`h-px flex-1 mx-2 ${isCompleted ? 'bg-black' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="border border-gray-200 rounded-lg p-6">

          {currentStep === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-medium text-black pb-3 border-b border-gray-100">Brand Details</h2>

    
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Brand Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Enter brand name"
                  className={`w-full px-3 py-2 border rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.brandName && touched.brandName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.brandName && touched.brandName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.brandName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Brand Logo <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                    dragActive ? 'border-black bg-gray-50' : 'border-gray-300 hover:border-gray-400'
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
                      <img src={logoPreview} alt="Logo" className="max-w-[100px] max-h-[60px] rounded" />
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); handleRemoveLogo(); }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white rounded-full flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">
                      <Upload className="w-5 h-5 mx-auto mb-1" />
                      Drop file or click to upload
                    </div>
                  )}
                </div>
                {errors.brandLogo && (
                  <p className="text-red-500 text-xs mt-1">{errors.brandLogo}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Website <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="websiteDomain"
                  value={formData.websiteDomain}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="www.example.com"
                  className={`w-full px-3 py-2 border rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.websiteDomain && touched.websiteDomain ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.websiteDomain && touched.websiteDomain && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.websiteDomain}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Industry <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {industryCategories.slice(1).map((cat) => {
                    const isSelected = formData.industryCategory === cat.value;
                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => handleIndustrySelect(cat.value)}
                        className={`p-2 border rounded-lg text-xs font-medium transition-colors ${
                          isSelected 
                            ? 'border-black bg-black text-white' 
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-1">
                          {getIcon(cat.icon)}
                          <span>{cat.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.industryCategory && touched.industryCategory && (
                  <p className="text-red-500 text-xs mt-1">{errors.industryCategory}</p>
                )}
              </div>

   
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Deal Value <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="coVenturePrice"
                  value={formData.coVenturePrice}
                  onChange={handlePriceChange}
                  onBlur={handleBlur}
                  placeholder="₹5,00,000"
                  className={`w-full px-3 py-2 border rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.coVenturePrice && touched.coVenturePrice ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.coVenturePrice && touched.coVenturePrice && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.coVenturePrice}
                  </p>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-medium text-black pb-3 border-b border-gray-100">Contact Information</h2>

              <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                {logoPreview ? (
                  <img src={logoPreview} alt="Brand" className="w-10 h-10 rounded object-cover" />
                ) : (
                  <div className="w-10 h-10 bg-black text-white rounded flex items-center justify-center font-medium">
                    {formData.brandName?.[0]?.toUpperCase() || 'B'}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-black text-sm truncate">{formData.brandName}</p>
                  <p className="text-xs text-gray-500">{formData.coVenturePrice}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="your@email.com"
                  className={`w-full px-3 py-2 border rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.contactEmail && touched.contactEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.contactEmail && touched.contactEmail && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.contactEmail}
                  </p>
                )}
              </div>


              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 text-sm">+91</span>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="10-digit number"
                    maxLength={10}
                    className={`flex-1 px-3 py-2 border rounded-r-lg text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black ${
                      errors.contactNumber && touched.contactNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.contactNumber && touched.contactNumber && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.contactNumber}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-medium text-black pb-3 border-b border-gray-100">Review & Submit</h2>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Brand</span>
                  <span className="text-black font-medium">{formData.brandName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Website</span>
                  <span className="text-black">{formData.websiteDomain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="text-black">{industryCategories.find(c => c.value === formData.industryCategory)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Deal Value</span>
                  <span className="text-black font-medium">{formData.coVenturePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email</span>
                  <span className="text-black">{formData.contactEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span className="text-black">+91 {formData.contactNumber}</span>
                </div>
              </div>

              {/* Terms */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-black">Terms & Conditions</h3>
                <div className="text-xs text-gray-600 space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {equityConsentTerms.map((term) => (
                    <div key={term.id} className="flex gap-2">
                      <span className="font-medium">{term.id}.</span>
                      <p><span className="font-medium">{term.title}:</span> {term.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="equityConsentAgreed"
                  checked={formData.equityConsentAgreed}
                  onChange={handleInputChange}
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm text-gray-700">
                  I agree to the Co-Venture Equity terms stated above
                </span>
              </label>
              {errors.equityConsentAgreed && touched.equityConsentAgreed && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.equityConsentAgreed}
                </p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
            {currentStep > 1 ? (
              <button type="button" onClick={prevStep} className="px-4 py-2 text-sm text-gray-600 hover:text-black flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}

            {currentStep < 3 ? (
              <button type="button" onClick={nextStep} className="px-5 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 flex items-center gap-1">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="px-5 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 disabled:bg-gray-400 flex items-center gap-2">
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                ) : (
                  <><Rocket className="w-4 h-4" /> Submit</>
                )}
              </button>
            )}
          </div>
        </form>


        {/* <p className="text-center text-gray-400 text-xs mt-6">
          Need help? <a href="mailto:support@cobrother.com" className="text-black hover:underline">support@cobrother.com</a>
        </p> */}
      </div>
    </div>
  );
};

export default CoVentureBrandListingForm;