// types/plan.ts (You might create a separate file for this)
export interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  items: string[];
  priceId: string;
  paymentLink: string;
  // Add an optional field for expanded content
  expandedContent?: string[]; // New: Content that appears when expanded
}

// data/plans.ts (You might create a separate file for this)
// data/plans.ts
export const plans: Plan[] = [
  {
    name: "Free",
    price: 0,
    description: "Free plan with limited features",
    items: [
      "50 PDF Summaries Per Month",
      "Standard Processing Speed",
      "Email Support",
    ],
    id: "free", // ✅ Changed from "basic" to "free"
    priceId: "price_12345",
    paymentLink: "/dashboard",
    expandedContent: [
      "Access to basic analytics dashboard",
      "Community forum access",
      "Monthly newsletter with tips",
    ],
  },
  {
    name: "Basic",
    price: 10,
    description: "Basic plan with essential features",
    items: [
      "50 PDF Summaries Per Month",
      "Standard Processing Speed",
      "Email Support",
    ],
    id: "basic", // ✅ Keep this as "basic"
    priceId: "price_12345",
    paymentLink: "https://example.com/checkout/basic",
    expandedContent: [
      "Access to basic analytics dashboard",
      "Community forum access",
      "Monthly newsletter with tips",
    ],
  },
  {
    name: "Pro",
    price: 20,
    description: "Pro plan with advanced features",
    items: [
      "Unlimited Pdf Summaries",
      "Priority Processing",
      "Markdown Export",
    ],
    id: "pro", // ✅ This is already unique
    priceId: "price_67890",
    paymentLink: "https://example.com/checkout/pro",
    expandedContent: [
      "Advanced analytics and reporting",
      "Dedicated priority support",
      "API access for integrations",
      "Early access to new features",
    ],
  },
];
