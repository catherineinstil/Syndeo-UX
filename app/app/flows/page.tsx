import Link from "next/link";
import {
  ClipboardList,
  Globe,
  HelpCircle,
  Home,
  Languages,
  Mail,
  MessageSquare,
  PlayCircle,
  Settings,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Target,
  WandSparkles,
  Zap,
} from "lucide-react";

const sidebarItems = [
  { label: "Welcome", icon: Home, active: true },
  { label: "Outcomes", icon: Target },
  { label: "Web Events", icon: Globe },
  { label: "FAQ", icon: HelpCircle },
  { label: "Global Segues", icon: Share2 },
  { label: "Languages", icon: Languages },
  { label: "Responses", icon: MessageSquare },
  { label: "Default Messages", icon: Mail },
  { label: "Settings", icon: Settings },
  { label: "Properties", icon: SlidersHorizontal },
  { label: "Events", icon: Zap },
  { label: "Surveys", icon: ClipboardList },
];

const features = [
  {
    title: "Visual Flow Builder",
    description:
      "Design rich, multi-step journeys with branching logic, reusable modules, and clear orchestration across every touchpoint.",
    icon: WandSparkles,
  },
  {
    title: "Outcomes & Goals",
    description:
      "Define measurable conversion points, route users to the right experience, and align journeys to business outcomes.",
    icon: Target,
  },
  {
    title: "Test & Simulate",
    description:
      "Validate happy paths, edge cases, and escalation rules before publishing using built-in simulation and QA tooling.",
    icon: PlayCircle,
  },
];

const steps = [
  "Choose a starting flow and define the welcome experience for each target audience.",
  "Configure outcomes, events, and response rules to guide users toward the right destination.",
  "Test the journey in Simulator, then publish to your live channels when you are ready.",
];

export default function FlowsPage() {
  return (
    <div className="-mx-6 -my-8 flex min-h-[calc(100vh-81px)] bg-[#F6F8FA]">
      <aside className="w-64 shrink-0 border-r border-[#E8F0FB] bg-white px-4 py-6">
        <h1 className="px-3 text-lg font-semibold text-[#3B4760]">Your Flows</h1>
        <nav className="mt-6 space-y-1">
          {sidebarItems.map(({ label, icon: Icon, active }) => (
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

      <div className="flex flex-1 flex-col px-8 py-8">
        <div className="max-w-4xl">
          <p className="text-sm font-medium text-[#2F8FFF]">Conversation design</p>
          <h2 className="mt-2 text-3xl font-semibold text-[#3B4760]">Welcome to Flows</h2>
          <p className="mt-3 text-sm leading-6 text-[#6A738A]">
            Build intelligent conversation flows with our visual editor. Map customer
            journeys, set goals, and launch consistent experiences across your channels.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-lg border border-[#E8F0FB] bg-white p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#E8F0FB] text-[#2F8FFF]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#3B4760]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#6A738A]">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-[#E8F0FB] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F0FB] text-[#2F8FFF]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#3B4760]">Getting Started</h3>
              <p className="text-sm text-[#6A738A]">
                Use these steps to shape and launch your first intelligent conversation flow.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-lg border border-[#E8F0FB] bg-[#F6F8FA] p-4"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2F8FFF] text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-[#3B4760]">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto flex justify-end pt-8">
          <button className="inline-flex items-center gap-2 rounded-lg bg-[#2F8FFF] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1E7FEF]">
            <PlayCircle className="h-4 w-4" />
            Simulator
          </button>
        </div>
      </div>
    </div>
  );
}
