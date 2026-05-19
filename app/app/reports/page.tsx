import { BarChart3, Clock3, LayoutDashboard, Lock } from "lucide-react";

const placeholders = [
  "Conversation volume by channel",
  "Outcome completion by flow",
  "Agent performance benchmarking",
  "Sentiment and escalation trends",
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-semibold text-[#3B4760]">Reports</h1>
        <p className="mt-2 text-sm text-[#6A738A]">
          Analytics and insights from your conversations.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {placeholders.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-[#E8F0FB] bg-white p-5 opacity-70 shadow-sm"
          >
            <div className="h-4 w-28 rounded-full bg-[#E8F0FB]" />
            <div className="mt-5 h-8 w-20 rounded-md bg-[#F6F8FA]" />
            <div className="mt-6 space-y-2">
              <div className="h-3 w-full rounded-full bg-[#F6F8FA]" />
              <div className="h-3 w-4/5 rounded-full bg-[#F6F8FA]" />
              <div className="h-3 w-3/5 rounded-full bg-[#F6F8FA]" />
            </div>
            <p className="mt-5 text-sm text-[#94A3B8]">{item}</p>
          </div>
        ))}
      </section>

      <section className="rounded-lg border border-dashed border-[#2F8FFF] bg-white px-8 py-16 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F0FB] text-[#2F8FFF]">
          <BarChart3 className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-[#3B4760]">Advanced analytics are coming soon</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6A738A]">
          We’re building a richer reporting suite with channel analytics, intent trends,
          conversion dashboards, and executive-ready exports so teams can act on every
          conversation insight.
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {[
            { icon: LayoutDashboard, label: "Custom dashboards" },
            { icon: Clock3, label: "Historical trend views" },
            { icon: Lock, label: "Role-based report sharing" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="rounded-lg border border-[#E8F0FB] bg-[#F6F8FA] px-4 py-5"
            >
              <Icon className="mx-auto h-5 w-5 text-[#2F8FFF]" />
              <p className="mt-3 text-sm font-medium text-[#3B4760]">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
