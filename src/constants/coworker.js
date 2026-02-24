export const roleOptions = [
  { label: "Investing", value: "Investing" },
  { label: "Fund Raising", value: "Fund Raising" },
  { label: "Venturing", value: "Venturing" },
  { label: "Hiring", value: "Hiring" },
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
