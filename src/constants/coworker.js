export const roleOptions = [
  { label: "I", value: "Industry" },
  { label: "Co-Investor", value: "co-investor" },
];

export const industryOptions = [
  { label: "SaaS", value: "saas" },
  { label: "AI / Automation", value: "ai-automation" },
  { label: "Fintech", value: "fintech" },
  { label: "Ecommerce", value: "ecommerce" },
  { label: "Services", value: "services" },
  { label: "Other", value: "other" },
];

export const initialCoworkingFormData = {
  fullName: "",
  primaryRole: "",
  linkedinUrl: "",
  primarySkill: "",
  industry: "",
  location: "",
};

export const validationRules = {
  linkedinPattern: /^https?:\/\/(www\.)?linkedin\.com\/.*$/i,
};
