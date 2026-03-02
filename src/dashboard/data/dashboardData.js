// Import Domain Assets
import Mbps30 from "../../assets/domain/30mbps.svg";
import Batteryfy from "../../assets/domain/batteryfy.svg";
import Cosister from "../../assets/domain/cosister.svg";
import DryChilli from "../../assets/domain/drychilli.svg";
import DryGrains from "../../assets/domain/drygrains.svg";
import Pregadays from "../../assets/domain/pregadays.png";
import Bedtolet from "../../assets/domain/Bedtolet1.svg";
import nopivot1 from "../../assets/domain/nopivot1.svg";
import Oldmedal from "../../assets/domain/oldmedal.png";
import Reelshost from "../../assets/domain/reelshost1.svg";
import Coastaldew from "../../assets/domain/coastaldew.png";
import Girij from "../../assets/domain/girij.svg";
import Submines from "../../assets/domain/submines.png";
import Gotwellsoon from "../../assets/domain/gotwellsoon.svg";
import Checkdam from "../../assets/domain/checkdam.png";

// User Info - role: 'user' | 'admin' (set by login)
export const userData = {
  name: 'John Smith',
  email: 'john.smith@email.com',
  avatar: 'JS',
  role: 'user', // change to 'admin' to see admin dashboard
  phone: '+91 98765 43210',
  memberSince: 'January 2024',
};

// =====================
// USER'S OWNED DOMAINS
// =====================
export const userDomains = [
  {
    id: "30mbps",
    type: "domain",
    name: "30mbps.com",
    title: "30 Mbps",
    logo: Mbps30,
    description: "Affordable internet service brand focused on speed and reliability.",
    price: 9998780,
    priceFormatted: "₹99,98,780",
    tags: ["Internet", "Technology"],
    status: "active",
    purchaseDate: "2024-01-15",
    expiryDate: "2025-01-15",
    autoRenew: true,
    orderId: "DOM-2024-001",
  },
  {
    id: "batteryfy",
    type: "domain",
    name: "batteryfy.com",
    title: "Batteryfy",
    logo: Batteryfy,
    description: "Smart battery and energy solutions for modern needs.",
    price: 27980550,
    priceFormatted: "₹2,79,80,550",
    tags: ["Energy", "Technology"],
    status: "active",
    purchaseDate: "2024-01-10",
    expiryDate: "2025-01-10",
    autoRenew: true,
    orderId: "DOM-2024-002",
  },
  {
    id: "cosister",
    type: "domain",
    name: "cosister.com",
    title: "Cosister",
    logo: Cosister,
    description: "A community-focused platform built around consistency and care.",
    price: 9999990,
    priceFormatted: "₹99,99,990",
    tags: ["Community"],
    status: "expiring",
    purchaseDate: "2023-02-20",
    expiryDate: "2024-02-20",
    autoRenew: false,
    orderId: "DOM-2023-015",
  },
  {
    id: "drychilli",
    type: "domain",
    name: "drychilli.com",
    title: "Dry Chilli",
    logo: DryChilli,
    description: "Premium quality dried chillies sourced directly from farmers.",
    price: 3998580,
    priceFormatted: "₹39,98,580",
    tags: ["Agriculture", "Food"],
    status: "active",
    purchaseDate: "2024-01-05",
    expiryDate: "2025-01-05",
    autoRenew: true,
    orderId: "DOM-2024-003",
  },
];

// =====================
// USER'S VENTURES
// =====================
export const userVentures = [
  {
    id: "batteryfy-venture",
    type: "venture",
    name: "Batteryfy",
    logo: Batteryfy,
    description: "Diesel-to-EV conversion brand enabling cost-effective electric mobility",
    industry: "Electric Vehicles / Clean Mobility",
    model: "Conversion Services + B2B Contracts",
    status: "active",
    investmentDate: "2024-01-10",
    investmentAmount: 5000000,
    investmentFormatted: "₹50,00,000",
    equity: "15%",
    returns: "+12.5%",
    orderId: "VEN-2024-001",
  },
  {
    id: "pregadays-venture",
    type: "venture",
    name: "Pregadays",
    logo: Pregadays,
    description: "Women's essential products brand focused on comfort, care & everyday wellness",
    industry: "Women's Essentials / Wellness",
    model: "D2C Products + Retail Distribution",
    status: "active",
    investmentDate: "2024-01-15",
    investmentAmount: 2500000,
    investmentFormatted: "₹25,00,000",
    equity: "10%",
    returns: "+8.2%",
    orderId: "VEN-2024-002",
  },
  {
    id: "gotwellsoon-venture",
    type: "venture",
    name: "GotWellSoon",
    logo: Gotwellsoon,
    description: "Healthcare & wellness services platform connecting users to care",
    industry: "Healthcare / Wellness Services",
    model: "D2C + B2B Marketplace & Service Enablement",
    status: "pending",
    investmentDate: "2024-01-25",
    investmentAmount: 3000000,
    investmentFormatted: "₹30,00,000",
    equity: "12%",
    returns: "Pending",
    orderId: "VEN-2024-003",
  },
  {
    id: "bedtolet-venture",
    type: "venture",
    name: "BedToLet",
    logo: Bedtolet,
    description: "PG & shared accommodation discovery platform for students & professionals",
    industry: "Real Estate / Co-living / Student Housing",
    model: "D2C + B2B Marketplace + Property Partnerships",
    status: "active",
    investmentDate: "2023-12-20",
    investmentAmount: 4000000,
    investmentFormatted: "₹40,00,000",
    equity: "18%",
    returns: "+15.3%",
    orderId: "VEN-2023-015",
  },
];

// =====================
// AVAILABLE VENTURES (MARKETPLACE)
// =====================
export const availableVentures = [
  {
    id: "checkdam",
    name: "Checkdam",
    logo: Checkdam,
    description: "Mining & subsurface technology platform for infrastructure and industry",
    industry: "Mining / Industrial Tech / Infrastructure Services",
    model: "B2B Services + Tech Solutions + Long-Term Contracts",
    minInvestment: "₹10,00,000",
  },
  {
    id: "drygrains",
    name: "DryGrains",
    logo: DryGrains,
    description: "Premium dry grains sourcing, processing & export brand",
    industry: "Agri Trade / Food Exports",
    model: "Domestic Supply + Global Distribution",
    minInvestment: "₹5,00,000",
  },
  {
    id: "nopivot",
    name: "NoPivot",
    logo: nopivot1,
    description: "Startup strategy & pivot advisory for early and growth-stage founders",
    industry: "Startup Advisory / Strategy / Growth Consulting",
    model: "D2C Services + Retainers + Advisory Packages",
    minInvestment: "₹8,00,000",
  },
  {
    id: "reelshost",
    name: "ReelsHost",
    logo: Reelshost,
    description: "Short-form video hosting and creator growth platform",
    industry: "Creator Economy / Marketing Tech / SaaS",
    model: "D2C SaaS + B2B for Creators, Brands & Agencies",
    minInvestment: "₹15,00,000",
  },
  {
    id: "coastaldew",
    name: "CoastalDew",
    logo: Coastaldew,
    description: "Coastal resort & hospitality brand offering curated travel experiences",
    industry: "Hospitality / Travel / Resorts",
    model: "D2C Bookings + OTA + B2B Partnerships",
    minInvestment: "₹20,00,000",
  },
  {
    id: "girij",
    name: "Girij",
    logo: Girij,
    description: "Natural wellness and heritage-led brand rooted in traditional practices",
    industry: "Wellness / Natural Products / Heritage Brand",
    model: "D2C Products + Marketplace + Select Retail",
    minInvestment: "₹6,00,000",
  },
  {
    id: "oldmedal",
    name: "OldMedal",
    logo: Oldmedal,
    description: "Heritage & vintage-inspired lifestyle and fashion brand",
    industry: "Lifestyle / Fashion / Heritage Branding",
    model: "D2C Products + Limited Retail + Marketplaces",
    minInvestment: "₹7,00,000",
  },
  {
    id: "submines",
    name: "SubMines",
    logo: Submines,
    description: "Mining & subsurface technology platform for infrastructure and industry",
    industry: "Mining / Industrial Tech / Infrastructure Services",
    model: "B2B Services + Tech Solutions + Long-Term Contracts",
    minInvestment: "₹25,00,000",
  },
];

// =====================
// USER'S COWORKING PROFILE
// =====================
export const userCoworking = {
  id: "coworking-profile",
  type: "coworking",
  fullName: "John Smith",
  primaryRole: "Founder",
  linkedinUrl: "https://linkedin.com/in/johnsmith",
  skill: "Product - Technology - Bangalore",
  industry: "Technology",
  location: "Bangalore",
  profilePhoto: null, // or URL when available
  joinedDate: "2024-01-20",
  status: "active",
  profileId: "CW-2024-001",
};

// =====================
// USER SALES (HISTORY)
// =====================
export const userSales = {
  soldDomains: [
    {
      id: "drychilli-sale",
      type: "domain-sale",
      name: "drychilli.com",
      logo: DryChilli,
      buyer: "AgroFoods Pvt Ltd",
      soldOn: "2024-02-10",
      salePrice: 4598580,
      salePriceFormatted: "₹45,98,580",
      status: "completed",
    },
    {
      id: "cosister-sale",
      type: "domain-sale",
      name: "cosister.com",
      logo: Cosister,
      buyer: "Cosister Community LLP",
      soldOn: "2024-01-28",
      salePrice: 10999990,
      salePriceFormatted: "₹1,09,99,990",
      status: "completed",
    },
  ],
  jvDeals: [
    {
      id: "bedtolet-jv",
      type: "jv",
      name: "BedToLet JV",
      logo: Bedtolet,
      partner: "BedToLet Properties",
      signedOn: "2023-12-22",
      stake: "18%",
      status: "active",
    },
    {
      id: "batteryfy-jv",
      type: "jv",
      name: "Batteryfy JV",
      logo: Batteryfy,
      partner: "Batteryfy Mobility",
      signedOn: "2024-01-18",
      stake: "15%",
      status: "processing",
    },
  ],
};

// =====================
// STATS
// =====================
export const stats = {
  totalDomains: 4,
  activeDomains: 3,
  expiringDomains: 1,
  totalVentures: 4,
  activeVentures: 3,
  totalCoworking: 1,
  totalInvested: 14500000,
  portfolioValue: 16312550,
};