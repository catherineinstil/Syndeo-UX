import Link from "next/link";
import {
  Briefcase,
  Building2,
  HeartPulse,
  House,
  Plane,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Store,
  UserRoundSearch,
  Wallet,
} from "lucide-react";

const verticals = [
  { label: "Retail", icon: Store, active: true },
  { label: "Finance", icon: Wallet },
  { label: "Healthcare", icon: HeartPulse },
  { label: "Housing", icon: House },
  { label: "Insurance", icon: ShieldCheck },
  { label: "Travel & Leisure", icon: Plane },
  { label: "Utilities", icon: ReceiptText },
  { label: "Telecommunications", icon: Smartphone },
];

const agents = [
  {
    title: "Marketing Lead Generation",
    description:
      "Proactively engage website visitors, asking about their shopping preferences and guiding them toward tailored product journeys.",
    icon: Briefcase,
  },
  {
    title: "FAQ",
    description:
      "Enable customers to ask questions and receive responses to common questions.",
    icon: ShoppingBag,
  },
  {
    title: "Discovery",
    description:
      "Enable customers to conversationally search for and pinpoint content on a website.",
    icon: UserRoundSearch,
  },
  {
    title: "Product Search",
    description:
      "Show customer products and services based on their previous browsing or purchase history. Requires access to a customer data platform.",
    icon: ShoppingBag,
  },
  {
    title: "Branch Locator",
    description:
      "The Branch Locator AI Agent allows a caller to locate a branch local to their current address.",
    icon: Building2,
  },
  {
    title: "Sales Product Recommendation",
    description:
      "Recommend products to customers based on previous buying history.",
    icon: Store,
  },
  {
    title: "Cart Abandonment",
    description:
      "Offer help with checkout or provide one-time limited discount based on products.",
    icon: ReceiptText,
  },
  {
    title: "Cross-sell / Up-sell",
    description:
      "Suggest complementary or premium products during the purchasing process.",
    icon: ShoppingBag,
  },
];

export default function AIAgentsPage() {
  return (
    <div className="-mx-6 -my-8 flex min-h-[calc(100vh-81px)] bg-[#F6F8FA]">
      <aside className="w-64 shrink-0 border-r border-[#E8F0FB] bg-white px-4 py-6">
        <h1 className="px-3 text-lg font-semibold text-[#3B4760]">Your Verticals</h1>
        <nav className="mt-6 space-y-1">
          {verticals.map(({ label, icon: Icon, active }) => (
            <Link
              key={label}
              href="#"
              className={`flex items-center gap-3 border-l-4 px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "border-[#2F8FFF] bg-[#E8F0FB] text-[#2F8FFF]"
                  : "border-transparent text-[#6A738A] hover:bg-[#F6F8FA] hover:text-[#3B4760]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 px-8 py-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-[#2F8FFF]">Retail vertical</p>
          <h2 className="mt-2 text-3xl font-semibold text-[#3B4760]">AI Agents</h2>
          <p className="mt-3 text-sm leading-6 text-[#6A738A]">
            Choose from prebuilt Syndeo agents designed to accelerate automation,
            customer support, discovery, and conversion across retail experiences.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {agents.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="flex h-full flex-col rounded-lg border border-[#E8F0FB] bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#E8F0FB] text-[#2F8FFF]">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-[#E8F0FB] px-3 py-1 text-xs font-semibold text-[#2F8FFF]">
                  Published by Syndeo
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#3B4760]">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-[#6A738A]">{description}</p>
              <button className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#2F8FFF] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1E7FEF]">
                Use Agent
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
