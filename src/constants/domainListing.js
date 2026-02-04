export const domainExtensions = [
  { label: ".com", value: ".com" },
  { label: ".in", value: ".in" },
  { label: ".ai", value: ".ai" },
  { label: ".io", value: ".io" },
  { label: ".net", value: ".net" },
  { label: "Other", value: "other" },
];

export const domainCategories = [
  { label: "Brandable", value: "brandable" },
  { label: "Tech / Startup", value: "tech" },
  { label: "Business", value: "business" },
  { label: "AI / SaaS", value: "ai-saas" },
  { label: "Premium", value: "premium" },
  { label: "Other", value: "other" },
];

export const platformFeeTerms = [
  "The platform is entitled to a 15% platform fee on the final sale value",
  "The fee is payable only upon successful sale of the domain",
  "No platform fee is charged if the domain is not sold",
];

export const initialDomainFormData = {
  domainName: "",
  domainExtension: "",
  askingPrice: "",
  domainCategory: "",
  contactEmail: "",
  contactNumber: "",
  platformFeeConsent: false,
};

export const validationRules = {
  emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phonePattern: /^[0-9]{10}$/,
};
