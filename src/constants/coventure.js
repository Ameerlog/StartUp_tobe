// src/data/coVentureData.js

export const industryCategories = [
  { value: '', label: 'Select Industry / Category', icon: 'Layers' },
  { value: 'saas', label: 'SaaS', icon: 'Cloud' },
  { value: 'ecommerce', label: 'Ecommerce', icon: 'ShoppingCart' },
  { value: 'services', label: 'Services', icon: 'Briefcase' },
  { value: 'ai-automation', label: 'AI / Automation', icon: 'Bot' },
  { value: 'fintech', label: 'Fintech', icon: 'Landmark' },
  { value: 'other', label: 'Other', icon: 'MoreHorizontal' },
];

export const equityConsentTerms = [
  {
    id: 1,
    title: 'Equity Allocation',
    description: 'I am listing my brand as a co-venture opportunity, where equity may be allocated among the buyer/operator, the platform, and Cobrother',
  },
  {
    id: 2,
    title: 'Cobrother Share',
    description: '3% of the total equity will always be allocated to Cobrother as part of the co-venture arrangement',
  },
  {
    id: 3,
    title: 'Flexible Split',
    description: 'The remaining equity may be allocated between the buyer/operator and other parties; the exact split is flexible (for example: 40:60, 50:50, 70:30, or any structure) and will be mutually discussed and finalized on a case-by-case basis',
  },
  {
    id: 4,
    title: 'No Cash Fee',
    description: 'No cash-based success fee or commission is charged',
  },
  {
    id: 5,
    title: 'Documentation',
    description: 'Final equity terms and documentation will be executed separately before closure',
  },
  {
    id: 6,
    title: 'Platform Role',
    description: 'The platform acts as a facilitator and co-venture enabler and does not guarantee outcomes',
  },
];

export const formSteps = [
  {
    id: 1,
    title: 'Brand Details',
    description: 'Tell us about your brand',
    icon: 'Building2',
  },
  {
    id: 2,
    title: 'Contact Info',
    description: 'How can we reach you?',
    icon: 'User',
  },
  {
    id: 3,
    title: 'Agreement',
    description: 'Review and accept terms',
    icon: 'FileCheck',
  },
];

export const initialFormData = {
  brandName: '',
  brandLogo: null,
  websiteDomain: '',
  industryCategory: '',
  coVenturePrice: '',
  contactEmail: '',
  contactNumber: '',
  equityConsentAgreed: false,
};

export const validationRules = {
  brandLogo: {
    maxSize: 5 * 1024 * 1024,
    acceptedFormats: ['image/png', 'image/jpeg', 'image/svg+xml'],
  },
  websiteDomain: {
    pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  },
  contactEmail: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  contactNumber: {
    pattern: /^[0-9]{10}$/,
  },
};