import Link from "next/link";
import {
  Brain,
  Download,
  Frown,
  Hammer,
  MessageSquareText,
  Plus,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const toolbarItems = [
  { label: "Train", icon: Brain },
  { label: "Statement", icon: MessageSquareText },
  { label: "Tools", icon: Hammer },
  { label: "Add Test", icon: Plus },
  { label: "Import", icon: Download },
];

const intents = ["1", "1 Rory", "1 a", "1 a - Tany", "1 llm test with Inte..."];
const entities = ["111name", "123", "123same", "13options", "6212test"];

const statements = [
  ["Am I able to reduce how much I am paying each month", "FAQ - Mortgag..."],
  ["Am I entitled to a bridging loan?", "FAQ - Mortgag..."],
  ["Am I entitled to cheaper fees if I work for the NHS?", "FAQ - Fees - N..."],
  ["Am I entitled to your loyalty bonus?", "FAQ - Existing ..."],
  ["Am looking to remortgage my house", "Re-Mortgage"],
  ["any fish here?", "Not Set"],
  ["application for insurance", "Life Cover"],
  ["apply for insurance", "Life Cover"],
  ["Are mortgage conditions dependent on me?", "FAQ - Mortgag..."],
  ["Are mortgages available after bankruptcy?", "FAQ - Mortgag..."],
  ["Are my fees cheaper if I work for the NHS?", "FAQ - Fees - N..."],
  ["Are my fees cheaper since I work for the NHS?", "FAQ - Fees - N..."],
  ["Are my garden and garage covered by contents insurance", "FAQ - Other Se..."],
  ["Are you based nearby?", "FAQ - About U..."],
  ["Are you hiring currently?", "FAQ - Office - J..."],
];

export default function AIWorkbenchPage() {
  return (
    <div className="-mx-6 -my-8 flex min-h-[calc(100vh-81px)] bg-[#F6F8FA]">
      <aside className="w-64 shrink-0 border-r border-[#E8F0FB] bg-white px-4 py-6">
        <h1 className="px-3 text-lg font-semibold text-[#3B4760]">Welcome to Kelvin</h1>
        <div className="mt-6 grid gap-2">
          {toolbarItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex items-center gap-3 rounded-lg border border-[#E8F0FB] px-3 py-2.5 text-left text-sm font-medium text-[#3B4760] transition hover:bg-[#F6F8FA]"
            >
              <Icon className="h-4 w-4 text-[#2F8FFF]" />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-6">
          <section>
            <div className="flex items-center justify-between px-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[#94A3B8]">Intents</h2>
              <Sparkles className="h-4 w-4 text-[#2F8FFF]" />
            </div>
            <div className="mt-3 space-y-1">
              {intents.map((item, index) => (
                <Link
                  key={item}
                  href="#"
                  className={`block rounded-lg px-3 py-2 text-sm ${
                    index === 0
                      ? "bg-[#E8F0FB] font-medium text-[#2F8FFF]"
                      : "text-[#6A738A] hover:bg-[#F6F8FA] hover:text-[#3B4760]"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="px-3 text-sm font-semibold uppercase tracking-wide text-[#94A3B8]">Entities</h2>
            <div className="mt-3 space-y-1">
              {entities.map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block rounded-lg px-3 py-2 text-sm text-[#6A738A] hover:bg-[#F6F8FA] hover:text-[#3B4760]"
                >
                  {item}
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-[#E8F0FB] bg-[#F6F8FA] p-4">
            <p className="text-sm font-semibold text-[#3B4760]">Sentiment</p>
            <div className="mt-3 flex items-center gap-2 text-sm text-[#6A738A]">
              <Frown className="h-4 w-4" />
              <span>😐 0.50</span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold text-[#3B4760]">Emotions</p>
              <div className="mt-3 h-2 rounded-full bg-[#E8F0FB]">
                <div className="h-2 w-1/2 rounded-full bg-[#2F8FFF]" />
              </div>
              <p className="mt-2 text-xs text-[#94A3B8]">Neutral profile across recent training examples.</p>
            </div>
          </section>
        </div>
      </aside>

      <div className="flex-1 px-8 py-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-[#2F8FFF]">Training workspace</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#3B4760]">AI Workbench</h2>
            <p className="mt-3 text-sm leading-6 text-[#6A738A]">
              Curate statements, align them to intents, and refine the quality of your
              language model with Kelvin’s training workspace.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg border border-[#E8F0FB] bg-white px-4 py-2 text-sm text-[#6A738A] shadow-sm">
            <WandSparkles className="h-4 w-4 text-[#2F8FFF]" />
            15 statements selected for review
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-[#E8F0FB] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#F6F8FA] text-[#6A738A]">
                <tr>
                  <th className="px-5 py-3 font-medium">STATEMENT ▲</th>
                  <th className="px-5 py-3 font-medium">INTENT ▼</th>
                  <th className="px-5 py-3 font-medium">ENTITIES</th>
                  <th className="px-5 py-3 font-medium">SENTIMENT</th>
                </tr>
              </thead>
              <tbody>
                {statements.map(([statement, intent]) => (
                  <tr key={statement} className="border-t border-[#E8F0FB] align-top">
                    <td className="px-5 py-4 text-[#3B4760]">{statement}</td>
                    <td className="px-5 py-4 text-[#6A738A]">{intent}</td>
                    <td className="px-5 py-4 text-[#94A3B8]">Not Set</td>
                    <td className="px-5 py-4 text-[#6A738A]">😐 0.50</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E8F0FB] px-5 py-4 text-sm">
            <button className="rounded-lg border border-[#E8F0FB] px-3 py-2 text-[#6A738A] hover:bg-[#F6F8FA]">
              Previous
            </button>
            <div className="flex items-center gap-2 text-[#6A738A]">
              {[
                "1",
                "2",
                "3",
                "4",
                "...",
                "16",
              ].map((page) => (
                <span
                  key={page}
                  className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-3 ${
                    page === "1" ? "bg-[#2F8FFF] text-white" : "hover:bg-[#F6F8FA]"
                  }`}
                >
                  {page}
                </span>
              ))}
            </div>
            <button className="rounded-lg border border-[#E8F0FB] px-3 py-2 text-[#6A738A] hover:bg-[#F6F8FA]">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
