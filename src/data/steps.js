import {
  Target,
  Palette,
  Rocket,
  DollarSign,
  ArrowRight,
} from "lucide-react";

import HR from "../assets/domain/hr.jpeg";
import Operations from "../assets/domain/operations.jpg";
import Sales from "../assets/domain/sales.svg";
import Finance from "../assets/domain/finance.svg";
import Marketing from "../assets/domain/marketing.svg";

export const steps = [
  {
    id: "01",
    title: "Sales",
    description:
      "Set up your sales foundation before the first lead arrives. CRM setup, customer pipelines, lead tracking, follow-ups, quotation and invoicing workflows, and standardized sales processes. No fragmented tools. No rebuilding later.",
    icon: Target,
    image: Sales,
    align: "left",
  },
  {
    id: "02",
    title: "Marketing",
    description:
      "Create a market-ready presence with brand identity, domain setup, website, digital presence, and marketing workflows. Campaigns and attribution stay connected to sales and operations, not isolated.",
    icon: Palette,
    image: Marketing,
    align: "right",
  
  },
  {
    id: "03",
    title: "Operations",
    description:
      "Run operations with clarity through task and project management, vendor coordination, internal process tracking, and automation-ready workflows. Designed to reduce chaos as teams grow.",
    icon: Rocket,
    image: Operations,
    align: "left",
   
  },
  {
    id: "04",
    title: "Finance & Compliance",
    description:
      "Build a financially and legally sound base with accounting setup, bookkeeping, GST and MSME compliance, billing, invoicing, and clear financial visibility.",
    icon: DollarSign,
    image: Finance,
    align: "right",
    
  },
  {
    id: "05",
    title: "HR & Team",
    description:
      "Support your team from day one with onboarding workflows, role clarity, access controls, admin setup, and internal communication structure.",
    icon: ArrowRight,
    image: HR,
    align: "left",
   
  },
];
